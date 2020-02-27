import express from 'express'
import Commentaire from '../models/Commentaire'

const commentaireRouter = express.Router();

// Get tous les commentaires d'un post
commentaireRouter.get('/:postId', (req, res) => {
    Commentaire.find({ parentId: req.params.postId })
        .exec()
        .then(data => res.json(data))
        .catch(err => res.message(err))
})
// Get un commentaire avec son id en param
commentaireRouter.get('/:commentId', (req, res) => {
    Commentaire.find({ _id: req.params.commentId })
        .exec()
        .then(data => res.json(data))
        .catch(err => res.message(err))
})
// Supprimer un commentaire avec son id en param
commentaireRouter.delete('/:commentId', (req, res) => {
    Commentaire.remove({ _id: req.params.commentId })
        .exec()
        .then(data => res.json(data))
        .catch(err => res.message(err))
})
// Modifier un commentaire avec son id en param
commentaireRouter.patch('/:commentId', (req, res) => {
    Commentaire.updateOne({ _id: req.params.commentId })
        .exec()
        .then(data => res.json(data))
        .catch(err => res.message(err))
})
// Creer un nouveau commentaire
commentaireRouter.post('/', (req, res) => {
    new Commentaire({ ...req.body })
        .save()
        .then(data => {
            res.status(200);
            res.json(data);
        })
        .catch(err => res.message(err))
})

export default commentaireRouter;