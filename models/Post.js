import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
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
})

export default mongoose.model('Posts', PostSchema);