import express from 'express'
import Utilisateur from '../models/Utilisateur'
import Post from '../models/Post'
import Commentaire from '../models/Commentaire'
import { cipher } from '../middleware'

const utilisateurRouter = express.Router();

// Get tous les utilisateurs
utilisateurRouter.get('/', (req, res) => {
    Utilisateur.find()
        .select({ mdp: 0, __v: 0 })
        .populate('numSignaler')
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(400).json([err]))
})
// Get un utilisateur avec son id en param
utilisateurRouter.get('/:userId', (req, res) => {
    Utilisateur.find({ _id: req.params.userId })
        .select({mdp:0, __v:0})
        .populate('numSignaler')
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(400).json({
            success: false,
            message: err,
            _id:'',
            pseudo:'',
            email: '',
            isAdmin: '',
            photo: ''
        }))
})
// Verification du pseudo
utilisateurRouter.post('/verification', (req, res) => {
    Utilisateur.find({ pseudo: req.body.pseudo })
        .exec()
        .then(data => { 
            if (data.length)
                res.status(400).json({
                    success: false,
                    message: "Ce pseudo existe déjà"
                })
            else 
                res.status(200).json({
                    success: true,
                    message: "Ce pseudo n'est pas dans la base de données"
                })
            
        })
        .catch(err => res.status(400).json({
            success: false,
            message: err
        }))
})
// Supprimer un utilisateur avec son id en param
utilisateurRouter.delete('/:userId', (req, res) => {
    Utilisateur.deleteOne({ _id: req.params.userId })
        .exec()
        .then(data => {
            Post.deleteMany({createur: req.params.userId}).exec()
            Commentaire.deleteMany({createur: req.params.userId}).exec()
            res.json(data)
        })
        .catch(err => res.status(400).send(err))
})
// Modifier un utilisateur avec son id en param
utilisateurRouter.patch('/:userId', (req, res) => {
    if (req.body.mdp) {
        req.body.mdp = cipher(req.body.mdp)
    }
    Utilisateur.updateOne({ _id: req.params.userId }, {$set: {...req.body}})
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(400).json({
            success: false,
            message: err,
            _id:'',
            pseudo:'',
            email: '',
            isAdmin: '',
            photo: ''
        }))
})

export default utilisateurRouter;