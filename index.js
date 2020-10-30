const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const session = require('express-session')
const config = require('./config')
const connection = require('./connection')

// routes
const getPage = require('./routes/getPage')
const getRegions = require('./routes/getRegions')
// const getRoutes = require('./routes/getRoutes')
const postRoute = require('./routes/postRoute')

const registerUser = require('./routes/registerUser')
const loginUser =require('./routes/loginUser')



const app = express();

const { PORT_FRONT = "http://127.0.0.1:3000", PORT = 8000, MONGO_DB="mongodb+srv://lysakowski-art:climbing@cluster0.m2d63.mongodb.net/crux_api_n?retryWrites=true&w=majority" } = process.env;
const whitelist = [PORT_FRONT, MONGO_DB]

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



//page
app.get('/pages/:pageId', getPage);
//routes
// app.get('/routes/:rank/:region', getRoutes);
app.post('/routes', postRoute);
//regions
app.get('/regions', getRegions)
//users
app.post('/register', registerUser)
app.post('/auth', loginUser)
app.listen(PORT, ()=>console.log(`server works on ${PORT}`));