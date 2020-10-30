const RouteModel = require('../../schema/routes');

module.exports = (req,res)=>{
    const {id} = req.params;
    RouteModel.Route.findByIdAndRemove(id)
    .then(route => {
        if(!route){
            res.status(404).send({
                message:"Route not found"
            })
        } else {
            res.status(200).send({
                message: "Route deleted succesfully!"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: `Something went wrong. Error message: ${err}`
        })
    })
}