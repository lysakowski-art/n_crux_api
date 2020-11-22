const RegionModel = require('../../schema/regions');

module.exports = (req,res)=>{
    const {id} = req.params;
    const {Region} = RegionModel
    Region.findByIdAndRemove(id)
    .then(region => {
        if(!region){
            res.status(404).send({
                message:"Region not found"
            })
        } else {
            res.status(200).send({
                message: "Region deleted succesfully!"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: `Something went wrong. Error message: ${err}`
        })
    })
}