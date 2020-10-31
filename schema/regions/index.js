const mongoose = require("mongoose");

const RegionSchema = new mongoose.Schema(
  {
    region_name: String,
    group_of_regions: String,
  },
  {
    collection: "regions",
  }
);

module.exports.Region = mongoose.model("Region", RegionSchema);