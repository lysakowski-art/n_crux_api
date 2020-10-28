const PagesModel = require('../../schema/page')
module.exports = (req,res) => {
    const {pageId} = req.params
    if (pageId){
        PagesModel.Page.findOne({_id: pageId},(err,page)=>{
            if(err) {
                console.log(err)
            } else {
                // console.log(page);
                res.send(page)
            }
        })
    }
}