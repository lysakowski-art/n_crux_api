const RouteModel = require('../../schema/routes')

module.exports = (req,res) => {
    const {rank, region} = req.params
    let route_rank = parseInt(rank)
    const {Route} = RouteModel
    if(route_rank !== 0 && region !== "random") {
        Route.find({route_rank, region},(err, routes)=>{
            if (err){
                res.status(500).send({
                    message: `Something wen wrong. Error message: ${err}`
                })
            } else if (routes.length === 0) {
                res.status(404).send({
                    message: `There is no routes suits to conditions such as route rank: ${route_rank} and region: ${region}.`
                })
            } else {
                res.status(200).send(routes)
            }
        })
    }else if(route_rank === 0 && region === "random"){
        Route.find({},(err, routes)=>{
            if (err){
                res.status(500).send({
                    message: `Something wen wrong. Error message: ${err}`
                })
            } else if (routes.length === 0) {
                res.status(404).send({
                    message: `There is no routes store in database.`
                })
            } else {
                res.status(200).send(routes)
            }
        })
    } else if (route_rank !== 0 && region ==="random") {
        Route.find({route_rank},(err, routes)=>{
            if (err){
                res.status(500).send({
                    message: `Something wen wrong. Error message: ${err}`
                })
            } else if (routes.length === 0) {
                res.status(404).send({
                    message: `There is no routes suits to condition such as route rank: ${route_rank}.`
                })
            } else {
                res.status(200).send(routes)
            }
        })
    }  else if (region !== "random" && route_rank === 0) {
        Route.find({region},(err, routes)=>{
            if (err){
                res.status(500).send({
                    message: `Something wen wrong. Error message: ${err}`
                })
            } else if (routes.length === 0) {
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
