const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const config = require("./config");
const connection = require("./connection");

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
// users
const checkIsUserLogged = require("./paths/checkIsUserLogged");
const createUser = require("./paths/createUser"); 
const loginUser = require("./paths/loginUser");
const logoutUser = require("./paths/logoutUser");
// ---------------------------------------------------------------------

const app = express();

const {
  PORT_FRONT = "http://127.0.0.1:3000",
  PORT_FRONT_LOCALHOST = "http://localhost:3000",
  PORT = 8000,
  MONGO_DB = "mongodb+srv://lysakowski-art:climbing@cluster0.m2d63.mongodb.net/crux_api_n?retryWrites=true&w=majority",
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

//regions
app.get("/regions", getRegions);
app.post("/regions", createRegion);
app.delete("/regions/:id", deleteRegion);

//users
app.post("/create_user", createUser);
app.post("/auth", loginUser);
app.get("/auth", logoutUser);
app.get("/check_session", checkIsUserLogged);

app.listen(PORT, () => console.log(`server works on PORT:${PORT}`));
