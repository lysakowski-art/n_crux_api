const RegionsModel = require('../../schema/regions')
module.exports = (req,res) => {
    const {Region} = RegionsModel
    
    Region.find({},(err,regions)=>{
        if(err) {
            res.status(500).send({
                message: `Something went wrong. Error message: ${err}`
            })
        } else if (!regions){
            res.status(404).send({
                message: `There is no regions in DB`
            })
        } else {
            res.status(200).send(regions)
        }
    })
}
    