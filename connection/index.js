const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://lysakowski-art:climbing@cluster0.m2d63.mongodb.net/crux_api_n?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
      if (!error) {
        console.log("db is connected");
      } else {
        console.log("sth went wrong");
      }
    }
  );
  
  const Products = require("./db");