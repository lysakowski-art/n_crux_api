const RegionModel = require("../../schema/regions");

module.exports = (req, res) => {
  const { Region } = RegionModel;
  const { region_name, group_of_regions } = req.body;
  Region.find({ region_name, group_of_regions }, (err, region) => {
    console.log(region);
    if (region.length === 0) {
      Region.create({
        region_name,
        group_of_regions,
      });
      res.status(201).send({
        message: `Region ${region_name} created succesfuly!`,
      });
    } else if (err) {
      res.status(500).send({
        message: `Something went wrong. Error message: ${err}`,
      });
    } else {
      res.status(409).send({
        message: `Region name ${region_name} already exists!`,
      });
    }
  });
};
