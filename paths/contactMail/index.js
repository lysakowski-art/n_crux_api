const sgMail = require("@sendgrid/mail")

module.exports = (req,res) => {
    const {mailContent, senderMail} = req.body
    if(mailContent && senderMail) {
        const mailOptions = {
            from: 'no-reply@cruxofpoland.pl',
            to: 'admin@cruxofpoland.pl',
            subject: `Question from: ${senderMail}`,
            // text: 'Hello '+ user.userName +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.emailAdress + '\/' + token.token + '\n\nThank You!\n'
            text: mailContent
        };
        sgMail.setApiKey(process.env.SENDGRID_KEY)
        sgMail.send(mailOptions).then((res)=>{
            console.log(res)
        }).catch(err=>{
            res.status(400).send({
                message: err
            })
        })
    } else {
        res.status(406).status({
            message: `Content or email adress is missing`
        })
    }
}