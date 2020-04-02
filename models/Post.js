import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
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
    reactions: [ { type: mongoose.ObjectId, ref: 'Utilisateurs' } ],
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
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } })

PostSchema.virtual('numCommentaires', {
  ref: 'Commentaires',
  localField: '_id', 
  foreignField: 'parentId', 
  count: true
});

export default mongoose.model('Posts', PostSchema);