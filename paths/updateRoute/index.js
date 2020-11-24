const RoutesModel = require("../../schema/routes");

module.exports = (req, res) => {
  const { id } = req.params;
  const { Route } = RouteModel;
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  Route.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Route with id=${id}. Maybe Tutorial was not found!`,
        });
      } else
        res.status(200).send({ message: "Route was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Route with id=" + id,
      });
    });
};
