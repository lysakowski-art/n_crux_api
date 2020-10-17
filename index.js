const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const session = require('express-session')
const config = require('./config')

const app = express();

const { PORT_FRONT = "http://127.0.0.1:3000", PORT = 8000, MONGO_DB="mongodb+srv://lysakowski-art:climbing@cluster0.m2d63.mongodb.net/<dbname>?retryWrites=true&w=majority" } = process.env;
const whitelist = [process.env.PORT_FRONT, process.env.MONGO_DB]
const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) callback(null, true)
        else callback(new Error('Not allowed by CORS'))
      }
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(config));

app.get('/',(req,res,next)=>{
    res.json({msg: "go fuck yourself"})
})

app.listen(PORT, ()=>console.log(`server works on ${PORT}`))