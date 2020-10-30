const RouteModel = require('../../schema/routes')

module.exports =(req,res) =>{
    const {route_title, route_author, route_rank, route_type, region, placemant_and_belay_anchor, route_description} = req.body;
    console.log(route_title, route_author, route_rank, route_type, region, placemant_and_belay_anchor, route_description)
    if(route_title && route_rank && region){
        RouteModel.Route.create({
            route_title,
            route_author,
            route_rank,
            route_type,
            region,
            placemant_and_belay_anchor,
            route_description
        })
        res.send(true)
    } else {
        res.send(false)
    }
}
