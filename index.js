const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const config = require("./config");
const connection = require("./connection");
require('dotenv').config({path: __dirname + '/.env'})
// --------------------------------PATHS--------------------------------
// pages
const getPage = require("./paths/getPage");
// regions
const createRegion = require('./paths/createRegion');
const getRegions = require("./paths/getRegions");
const deleteRegion = require('./paths/deleteRegion');
// routes
const createRoute = require("./paths/createRoute");
const deleteRoute = require("./paths/deleteRoute");
const getRoutes = require("./paths/getRoutes");
const updateRoute = require("./paths/updateRoute")
// users
const checkIsUserLogged = require("./paths/checkIsUserLogged");
const createUser = require("./paths/createUser"); 
const loginUser = require("./paths/loginUser");
const logoutUser = require("./paths/logoutUser");
const confirmAccount = require("./paths/confirmAccount")
// ---------------------------------------------------------------------

const app = express();

const {
  PORT_FRONT,
  PORT_FRONT_LOCALHOST,
  PORT,
  MONGO_DB,
} = process.env;
const whitelist = [PORT_FRONT, MONGO_DB, PORT_FRONT_LOCALHOST];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(config));

//pages
app.get("/pages/:id", getPage);

//routes
app.get("/routes/:rank/:region", getRoutes);
app.post("/routes", createRoute);
app.delete("/routes/:id", deleteRoute);
app.put("/routes/:id", updateRoute)

//regions
app.get("/regions", getRegions);
app.post("/regions", createRegion);
app.delete("/regions/:id/", deleteRegion);

//users
app.post("/create_user", createUser);
app.post("/auth", loginUser);
app.get("/auth", logoutUser);
app.get("/check_session", checkIsUserLogged);
app.get('/confirmation/:emailAdress/:token',confirmAccount)

app.listen(PORT, () => console.log(`server works on PORT:${PORT}`));
