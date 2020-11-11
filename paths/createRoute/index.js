const RouteModel = require('../../schema/routes')

module.exports =(req,res) =>{
    const {route_title, route_author, route_rank, route_type, region, placemant_and_belay_anchor, route_description, user_name, user_id} = req.body;
    RouteModel.Route.find({route_title, region}, (err, route) => {
        if(route.length === 0){
            if(route_title && route_rank && region){
                RouteModel.Route.create({
                    route_title,
                    route_author,
                    route_rank,
                    route_type,
                    region,
                    placemant_and_belay_anchor,
                    route_description,
                    user_name,
                    user_id,
                    active: true,
                })
                res.status(201).send({
                    message: `Route ${route_title} created succsesfuly!`
                })
            } else {
                res.status(500).send({
                    message: `Something went wrong. Error message: ${err}`
                })
            }
        } else {
            res.status(409).send({
                message: `Route ${route_title} in ${region} exists and cannot be added.`
            })
        }
    })
}



// const {route_title, route_author, route_rank, route_type, region, placemant_and_belay_anchor, route_description} = req.body;
