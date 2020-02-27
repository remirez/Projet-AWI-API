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
    }
});

export default mongoose.model('Utilisateurs', UtilisateurSchema);