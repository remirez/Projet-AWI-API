import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv/config'
import posts from './routes/posts'
import commentaires from './routes/commentaires'
import utilisateurs from './routes/utilisateurs'
import auth from './routes/auth'
import { tokenCheck } from './middleware'

const app = express();

let PORT = process.env.PORT || 3000;

//Middleware - Util
app.use(cors())
app.use(bodyParser.json())
app.use(tokenCheck)

//Middleware - Routes
app.use('/posts', posts)
app.use('/commentaires', commentaires)
app.use('/utilisateurs', utilisateurs)
app.use('/auth', auth)

//Home
app.get('/', (req, res) => {
    res.send("Home")
})

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true }, () => console.log('connected to db'));

app.listen(PORT);