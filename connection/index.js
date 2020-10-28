const mongoose = require("mongoose");
const password = 'climbing';
const dbname = 'crux_api_n'
mongoose.connect(
    `mongodb+srv://lysakowski-art:${password}@cluster0.m2d63.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
      if (!error) {
        console.log("db is connected");
      } else {
        console.log("sth went wrong");
      }
    }
  );                                                                                                                                                                                                 