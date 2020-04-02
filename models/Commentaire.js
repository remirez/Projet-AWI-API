import mongoose from 'mongoose'

const CommentaireSchema = mongoose.Schema({
    parentId: {
        type: mongoose.ObjectId,
        ref: 'Posts',
        required: true
    },
    createur: {
        type: mongoose.ObjectId,
        ref: 'Utilisateurs',
        required: true
    },
    texte: {
        type: String,
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now()
    },
    reactions: [ { type: mongoose.ObjectId, ref: 'Utilisateurs' }],
    signaler: [ {
        _id: {
            type: mongoose.ObjectId,
            required: true
        },
        texte: {
            type: String,
            required: true
        }
    } ]
});

export default mongoose.model('Commentaires', CommentaireSchema);