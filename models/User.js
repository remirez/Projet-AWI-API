import mongoose from 'mongoose'

const schema = mongoose.Schema({
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
    reactions: Array,
    commentaires: Array,
})