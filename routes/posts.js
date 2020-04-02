import express from 'express'
import Post from '../models/Post'
import Commentaire from '../models/Commentaire'

const postRouter = express.Router();

// Get tous les posts
postRouter.get('/', (req, res) => {
    Post.find()
        .populate('createur', ['pseudo', 'photo'])
        .populate('numCommentaires')
        .sort({'dateCreation' : -1})
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(400).json([err]))
})
// Get un post avec son id en param
postRouter.get('/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .populate('createur', ['pseudo', 'photo'])
        .populate('numCommentaires')
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(400).json({
            success: false,
            message: err,
            _id:'',
            createur: {
                _id: '',
                pseudo:''
            },
            texte: '',
            reactions: [],
            signaler: []
        }))
})
// Get les posts d'un utilisateur avec son id en param
postRouter.get('/:userId', (req, res) => {
    Post.find({ createur: req.params.userId })
        .populate('createur', ['pseudo', 'photo'])
        .populate('numCommentaires')
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(400).json([err]))
})
// Supprimer un post avec son id en param
postRouter.delete('/:postId', (req, res) => {
    Post.deleteOne({ _id: req.params.postId })
        .exec()
        .then(data => {
            Commentaire.deleteMany({ parentId: req.params.postId }).exec()
            res.json(data)
        })
        .catch(err => res.status(400).send(err))
})
// Modifier un post avec son id en param
postRouter.patch('/:postId', (req, res) => {
    Post.updateOne({ _id: req.params.postId }, { $set: { ...req.body } })
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(400).json({
            success: false,
            message: err,
            _id:'',
            createur: {
                _id: '',
                pseudo: '',
                photo: ''
            },
            texte: '',
            reactions: [],
            signaler: []
        }))
})
// Creer un nouveau post
postRouter.post('/', (req, res) => {
    new Post({ ...req.body })
        .save()
        .then(data => {
            let options = [{ path: 'createur', model: 'Utilisateurs', select: ['pseudo', 'photo'] }, { path: 'numCommentaires' }]
            Post.populate(data, options, (err, data) => {
                if (err) res.status(400).json({
                    success: false,
                    message: err,
                    _id: '',
                    createur: {
                        _id: '',
                        pseudo: '',
                        photo: ''
                    },
                    texte: '',
                    reactions: [],
                    signaler: []
                });
                res.status(201).json(data);
            })
        })
        .catch(err => res.status(400).json({
            success: false,
            message: err,
            _id: '',
            createur: {
                _id: '',
                pseudo: '',
                photo:''
            },
            texte: '',
            reactions: [],
            signaler: []
        }))
})

export default postRouter;