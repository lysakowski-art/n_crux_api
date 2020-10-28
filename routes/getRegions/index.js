const RegionsModel = require('../../schema/regions')
module.exports = (req,res) => {
    // console.log("tu dochodzie")
    RegionsModel.Region.find({},(err,regions)=>{
        if(err) {
            console.log(err)
        } else {
            // console.log(regions)
            res.send(regions)
        }
    })
}
    