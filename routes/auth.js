import express from 'express'
import Utilisateur from '../models/Utilisateur'
import jwt from 'jsonwebtoken'
import { cipher } from '../middleware'

const authRoute = express.Router()

authRoute.post('/login', (req, res) => {
    Utilisateur.find({ pseudo: req.body.pseudo })
        .exec()
        .then(data => {
            if (cipher(req.body.mdp) === data[0].mdp) {
                let token = jwt.sign({ pseudo: req.body.pseudo }, process.env.SECRET, { expiresIn: '30d' });
                res.status(200).json({
                    success: true,
                    message: 'Succès d\'autentification',
                    token: token,
                    data: {
                        _id: data[0]._id,
                        pseudo: data[0].pseudo,
                        email: data[0].email,
                        isAdmin: data[0].isAdmin,
                        photo: data[0].photo
                    }
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Mot de passe ou pseudo invalide',
                    token: '',
                    data: {
                        _id: '',
                        pseudo:'',
                        email: '',
                        isAdmin: '',
                        photo: ''
                    }
                });
            }
        }).catch(err => res.status(500).json({
                success: false,
                message: err,
                token: '',
                data: {
                    _id: '',
                    pseudo:'',
                    email:'',
                    isAdmin: '',
                    photo: ''
                }
            }))
})

authRoute.post('/createaccount', (req, res) => {
    Utilisateur.find({ pseudo: req.body.pseudo })
        .then(result => {
            if (result.length) 
                res.status(400).json({
                        success: false,
                        message: 'Ce pseudo existe déjà',
                        token: '',
                        data: {
                            _id: '',
                            pseudo:'',
                            email:'',
                            isAdmin: '',
                            photo: ''
                        }}) 
            else
                new Utilisateur({ ...req.body, mdp: cipher(req.body.mdp) })
                    .save()
                    .then(data => {
                        let token = jwt.sign({ pseudo: req.body.pseudo }, process.env.SECRET, { expiresIn: '30d' });
                        res.status(201).json({
                            success: true,
                            message: 'Succès de creation de compte',
                            token: token,
                            data: {
                                _id: data._id,
                                pseudo: data.pseudo,
                                email: data.email,
                                isAdmin: data.isAdmin,
                                photo: data.photo
                            }
                        });
                    })
                    .catch(err => res.status(400).json({
                        success: false,
                        message: err,
                        token: '',
                        data: {
                            _id: '',
                            pseudo:'',
                            email:'',
                            isAdmin: '',
                            photo: ''
                        }
                    }))
        })
        .catch(err => res.status(400).json({
            success: false,
            message: err,
            token: '',
            data: {
                _id: '',
                pseudo:'',
                email:'',
                isAdmin: '',
                photo: ''
            }
        }))
})

export default authRoute