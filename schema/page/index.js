const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    language: Boolean
  },
  {
    collection: "pages",
  }
);

module.exports.Page = mongoose.model("Page", PageSchema);