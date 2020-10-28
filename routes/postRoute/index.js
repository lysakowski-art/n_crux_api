const RouteModel = require('../../schema/routes')

module.exports =(req,res) =>{
    const {route_title, route_author, route_rank, route_type, region, placemant_and_belay_anchor, route_description} = req.body;
    console.log(route_title, route_author, route_rank, route_type, region, placemant_and_belay_anchor, route_description)
    RouteModel.Route.create({
        route_title
    })
    
    
    // if(route_title){
    //     // console.log(route_title, route_author, route_rank, route_type, region, placemant_and_belay_anchor, route_description)
    //     RouteModel.Route.create({
    //         route_title,
    //         route_author,
    //         route_rank,
    //         route_type,
    //         region,
    //         placemant_and_belay_anchor,
    //         route_description
    //     })
    //     res.send(true)
    // }else{
    //     res.send("some of: Title, Rank, Region, Type or Expansion bolts is missing")
    // }
}

// _id: mongoose.ObjectId,
//         route_title: String,
//         route_author: String,
//         route_rank: Boolean,
//         route_type: Boolean,
//         region: String,
//         placemant_and_belay_anchor: Number,
//         route_description: String