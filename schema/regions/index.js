const mongoose = require("mongoose");

const RegionSchema = new mongoose.Schema(
  {
    _id: mongoose.ObjectId,
    region_name: String,
    group_of_regions: String,
  },
  {
    collection: "regions",
  }
);

module.exports.Region = mongoose.model("Region", RegionSchema);