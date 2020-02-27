import mongoose from 'mongoose'

const CommentaireSchema = mongoose.Schema({
    parentId: {
        type: mongoose.ObjectId,
        required: true
    },
    createur: {
        type: mongoose.ObjectId,
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
    reactions: Array
});

export default mongoose.model('Commentaires', CommentaireSchema);