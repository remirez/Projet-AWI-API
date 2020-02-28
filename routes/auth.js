import express from 'express'
import Utilisateur from '../models/Utilisateur'

const authRoute = express.Router()

authRoute.get('/:pseudo/:mdp', (req, res) => {
    Utilisateur.find({pseudo:req.params.pseudo})
    .exec()
    .then(data => {
        //let jsonData = JSON.parse(data)
        if(req.params.mdp === data[0].mdp){
            res.status(200)
            res.json(data)
        }
        
    })
})

export default authRoute