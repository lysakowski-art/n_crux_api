const RouteModel = require('../../schema/routes')

module.exports = (req,res) => {
    const {route_rank, region} = req.body
    if(route_rank && region) {
        RouteModel.Route.findMany({route_rank, region},(err, routes)=>{
            if (err){
                console.log(err)
            } else {
                res.send(routes)
            }
        })
    }else if(route_rank === 0 && region === "random"){
        RouteModel.Route.findMany({},(err, routes)=>{
            if (err){
                console.log(err)
            } else {
                res.send(routes)
            }
        })
    } else if (route_rank && region === "random") {
        RouteModel.Route.findMany({route_rank},(err, routes)=>{
            if (err){
                console.log(err)
            } else {
                res.send(routes)
            }
        })
    }  else if (route_rank === 0 && region) {
        RouteModel.Route.findMany({region},(err, routes)=>{
            if (err){
                console.log(err)
            } else {
                res.send(routes)
            }
        })
    } else res.send(false)
}
