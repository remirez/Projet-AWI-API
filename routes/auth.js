import express from 'express'
import Utilisateur from '../models/Utilisateur'
import jwt from 'jsonwebtoken'

const authRoute = express.Router()

authRoute.get('/', (req, res) => {
    Utilisateur.find({ pseudo: req.body.pseudo })
        .exec()
        .then(data => {
            if (req.body.mdp === data[0].mdp) {
                let token = jwt.sign({ pseudo: req.body.pseudo },
                    process.env.SECRET,
                    {
                        expiresIn: '30d'
                    }
                );
                res.status(200).json({
                    success: true,
                    message: 'Succès d\'autentification',
                    token: token,
                    data: data[0]
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Mot de passe ou pseudo invalide'
                });
            }
        }).catch(err => res.status(500).json({
            success: false,
            message: 'Erreur'
        }))
})

export default authRoute