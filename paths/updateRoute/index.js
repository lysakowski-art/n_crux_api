const RoutesModel = require("../../schema/routes")

module.exports = (req,res) => {
  const {id,param,value} = req.params;
  if (!param && !value) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  
  if(param ==="route_author") return RoutesModel.Route.findByIdAndUpdate(id, {route_author :value}, { useFindAndModify: false })
  else if (param==="route_title") return RoutesModel.Route.findByIdAndUpdate(id, {route_title :value}, { useFindAndModify: false })
  else if (param==="route_rank") return RoutesModel.Route.findByIdAndUpdate(id, {route_rank :value}, { useFindAndModify: false })
  else if (param==="route_type") return RoutesModel.Route.findByIdAndUpdate(id, {route_type :value}, { useFindAndModify: false })
  else if (param==="region") return RoutesModel.Route.findByIdAndUpdate(id, {region :value}, { useFindAndModify: false })
  else if (param==="placemant_and_belay_anchor") return RoutesModel.Route.findByIdAndUpdate(id, {placemant_and_belay_anchor :value}, { useFindAndModify: false })
  else if (param==="route_description") return RoutesModel.Route.findByIdAndUpdate(id, {route_description :value}, { useFindAndModify: false })
  .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Route with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.status(200).send({ message: "Route was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Route with id=" + id
      });
    });
}