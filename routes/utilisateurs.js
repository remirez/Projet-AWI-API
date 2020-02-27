import express from 'express'
import Utilisateur from '../models/Utilisateur'

const utilisateurRouter = express.Router();

// Get tous les utilisateurs
utilisateurRouter.get('/', (req, res) => {
    Utilisateur.find()
        .exec()
        .then(data => res.json(data))
        .catch(err => res.message(err))
})
// Get un utilisateur avec son id en param
utilisateurRouter.get('/:userId', (req, res) => {
    Utilisateur.find({ _id: req.params.userId })
        .exec()
        .then(data => res.json(data))
        .catch(err => res.message(err))
})
// Supprimer un commentaire avec son id en param
utilisateurRouter.delete('/:userId', (req, res) => {
    Commentaire.remove({ _id: req.params.userId })
        .exec()
        .then(data => res.json(data))
        .catch(err => res.message(err))
})
// Modifier un commentaire avec son id en param
utilisateurRouter.patch('/:userId', (req, res) => {
    Commentaire.updateOne({ _id: req.params.userId })
        .exec()
        .then(data => res.json(data))
        .catch(err => res.message(err))
})
// Creer un nouveau commentaire
utilisateurRouter.post('/', (req, res) => {
    new Utilisateur({ ...req.body })
        .save()
        .then(data => {
            res.status(200);
            res.json(data);
        })
        .catch(err => res.message(err))
})

export default utilisateurRouter;