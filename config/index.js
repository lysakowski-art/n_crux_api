const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
// require('dotenv')

const {
  MONGO_DB = "mongodb+srv://lysakowski-art:climbing@cluster0.m2d63.mongodb.net/crux_api_n?retryWrites=true&w=majority",
  SESS_NAME = "sid" /*session ID */,
  SESS_SECRET = "shhhh",
  SESS_LIFETIME = 1000 * 60 * 200,
} = process.env

const store = new MongoDBStore({
    uri: MONGO_DB,
    collection: "userSessions",
  });

module.exports = {
    name: SESS_NAME,
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    store,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: false,
      secure: false,
    }
}