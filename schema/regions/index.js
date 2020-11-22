const mongoose = require("mongoose");

const RegionSchema = new mongoose.Schema(
  {
    regionName: String,
    groupOfRegions: String,
  },
  {
    collection: "regions",
  }
);

module.exports.Region = mongoose.model("Region", RegionSchema);