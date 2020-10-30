const PagesModel = require('../../schema/page')
module.exports = (req,res) => {
    const {id} = req.params
    if (id){
        PagesModel.Page.findById(id)
        .then(page=>{
            if(!page){
                res.status(404).send({
                    message: "Page not found"
                })
            } else res.status(200).send(page)
        })
        .catch(err=>{
            res.status(500).send({
                message: `Somethin went wrong: ${err}`
            })
        })
    }
}