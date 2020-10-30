const UserModel = require('../../schema/routes')

module.exports =(req,res) =>{
    const {user_name, email_adress, password, user_type} = req.body;
    if(user_name && email_adress && password && user_type){
        UserModel.User.create({
            user_name,
            email_adress,
            password,
            user_type,
        })
        res.send(true)
    } else {
        res.send(false)
    }
}