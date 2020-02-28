import express from 'express'
import Post from '../models/Post'

const postRouter = express.Router();

// Get tous les posts
postRouter.get('/', (req, res) => {
    Post.find()
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err))
})
// Get un post avec son id en param
postRouter.get('/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err))
})
// Get les posts d'un utilisateur avec son id en param
postRouter.get('/:userId', (req, res) => {
    Post.find({ createur: req.params.userId })
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err))
})
// Supprimer un post avec son id en param
postRouter.delete('/:postId', (req, res) => {
    Post.remove({ _id: req.params.postId })
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err))
})
// Modifier un post avec son id en param
postRouter.patch('/:postId', (req, res) => {
    Post.updateOne({ _id: req.params.postId }, { $set: { ...req.body } })
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err))
})
// Creer un nouveau post
postRouter.post('/', (req, res) => {
    new Post({ ...req.body })
        .save()
        .then(data => {
            res.status(200);
            res.json(data);
        })
        .catch(err => res.status(500).send(err))
})

export default postRouter;