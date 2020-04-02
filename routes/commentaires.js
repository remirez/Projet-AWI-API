import express from 'express'
import Commentaire from '../models/Commentaire'

const commentaireRouter = express.Router();

// Get tous les commentaires d'un post
commentaireRouter.get('/:postId', (req, res) => {
    Commentaire.find({ parentId: req.params.postId })
        .populate('createur', ['pseudo', 'photo'])
        .sort({'dateCreation' : -1})
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(400).json([err]))
})
// Get un commentaire avec son id en param
commentaireRouter.get('/:commentId', (req, res) => {
    Commentaire.find({ _id: req.params.commentId })
        .populate('createur', ['pseudo', 'photo'])
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(400).json({
            success: false,
            message: err,
            _id:'',
            parentId: '',
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
// Supprimer un commentaire avec son id en param
commentaireRouter.delete('/:commentId', (req, res) => {
    Commentaire.deleteOne({ _id: req.params.commentId })
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err))
})
// Modifier un commentaire avec son id en param
commentaireRouter.patch('/:commentId', (req, res) => {
    Commentaire.updateOne({ _id: req.params.commentId }, { $set: { ...req.body } })
        .populate('createur', ['pseudo', 'photo'])
        .exec()
        .then(data => res.json(data))
        .catch(err => res.status(400).json({
            success: false,
            message: err,
            _id:'',
            parentId: '',
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
// Creer un nouveau commentaire
commentaireRouter.post('/', (req, res) => {
    new Commentaire({ ...req.body })
        .save()
        .then(data => {
            Commentaire.populate(data, { path: 'createur', model: 'Utilisateurs', select: ['pseudo', 'photo'] }, (err, data) => {
                if (err) res.status(400).json({
                    success: false,
                    message: err,
                    _id:'',
                    parentId: '',
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
                _id:'',
                parentId: '',
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

export default commentaireRouter;