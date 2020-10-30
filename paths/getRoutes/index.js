const RouteModel = require('../../schema/routes')

module.exports = (req,res) => {
    const {route_rank, region} = req.body
    if(route_rank && region) {
        RouteModel.Route.findMany({route_rank, region},(err, routes)=>{
            if (err){
                res.status(500).send({
                    message: `Something wen wrong. Error message: ${err}`
                })
            } else if (!routes) {
                res.status(404).send({
                    message: `There is no routes suits to conditions such as route rank: ${route_rank} and region: ${region}.`
                })
            } else {
                res.status(200).send(routes)
            }
        })
    }else if(route_rank === 0 && region === "random"){
        RouteModel.Route.findMany({},(err, routes)=>{
            if (err){
                res.status(500).send({
                    message: `Something wen wrong. Error message: ${err}`
                })
            } else if (!routes) {
                res.status(404).send({
                    message: `There is no routes store in database.`
                })
            } else {
                res.status(200).send(routes)
            }
        })
    } else if (route_rank && region === "random") {
        RouteModel.Route.findMany({route_rank},(err, routes)=>{
            if (err){
                res.status(500).send({
                    message: `Something wen wrong. Error message: ${err}`
                })
            } else if (!routes) {
                res.status(404).send({
                    message: `There is no routes suits to condition such as route rank: ${route_rank}.`
                })
            } else {
                res.status(200).send(routes)
            }
        })
    }  else if (route_rank === 0 && region) {
        RouteModel.Route.findMany({region},(err, routes)=>{
            if (err){
                res.status(500).send({
                    message: `Something wen wrong. Error message: ${err}`
                })
            } else if (!routes) {
                res.status(404).send({
                    message: `There is no routes suits to condition such as region: ${region}.`
                })
            } else {
                res.status(200).send(routes)
            }
        })
    } else res.status(404).send({
        message: "Something went wrong."
    })
}
