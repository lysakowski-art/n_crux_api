const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
    uri: "mongodb+srv://lysakowski-art:climbing@cluster0.m2d63.mongodb.net/crux_api_n?retryWrites=true&w=majority",
    collection: "mySessions",
  });

const {
    SESS_NAME = "sid" /*session ID */,
    SESS_SECRET = "shhhh",
    SESS_LIFETIME = 1000 * 60 * 10,
} = process.env

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