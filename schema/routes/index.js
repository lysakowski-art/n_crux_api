const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema(
  {
      route_title: String,
      route_author: String,
      route_rank: Number,
      route_type: Boolean,
      region: String,
      placemant_and_belay_anchor: String,
      route_description: String
  },
  {
    collection: "routes",
  }
  );
  
  module.exports.Route = mongoose.model("Route", RouteSchema);