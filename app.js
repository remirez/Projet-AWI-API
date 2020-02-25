import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv/config'

const app = express();

//Middleware - Util
app.use(cors())
app.use(bodyParser.json())

//Middleware - Routes


//Home
app.get('/', (req, res) => {
    res.send("Home");
})

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true });

app.listen(100);