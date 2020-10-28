// !inserting pages!
const PageModel = require('../../schema/page')
const Page = require('./schema/page')
module.exports = (req, res)=>{
    const {page_title, page_content, language} = req.body
    if(page_title && language && page_content) {
        PageModel.Page.create({
            page_title,
            page_content,
            language,
        })
        res.send(true)
    } else res.send(false)
}