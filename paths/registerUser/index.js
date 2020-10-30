const UserModel = require('../../schema/users')
const bcrypt = require("bcrypt");

module.exports =(req,res) =>{
    const {user_name, email_adress, password, user_type} = req.body;
    const saltRounds = 12;
    let hashedPassword = bcrypt.hashSync(password, saltRounds);
    if(user_name && email_adress && password && user_type){
        UserModel.User.findOne({email_adress},(err, user)=>{
            if(!user){
                UserModel.User.create({
                    user_name,
                    email_adress,
                    password: hashedPassword,
                    user_type,
                })
                res.send(true)
            } else {
                res.send(false)
            }
        })
    } else {
        res.send(false)
    }
}

