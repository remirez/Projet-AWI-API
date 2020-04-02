import mongoose from 'mongoose'

const UtilisateurSchema = mongoose.Schema({
    pseudo: {
        type: String,
        required: true
    },
    mdp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    photo: {
        type: String,
        required: true
    }
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

UtilisateurSchema.virtual('numSignaler', {
    ref: 'Posts',
    localField: '_id', 
    foreignField: 'createur', 
    match: { $nor: [ { signaler: { $size: 0 } } ] },
    count: true
});

export default mongoose.model('Utilisateurs', UtilisateurSchema);