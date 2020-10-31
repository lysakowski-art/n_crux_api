const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema(
  {
    page_title: String,
    page_content: String,
    language: Boolean
  },
  {
    collection: "pages",
  }
);

module.exports.Page = mongoose.model("Page", PageSchema);