const UserModel = require('../../schema/users')
const bcrypt = require("bcrypt");

module.exports =(req,res) =>{
    const {user_name, email_adress, password, user_type} = req.body;
    const saltRounds = 12;
    let hashedPassword = bcrypt.hashSync(password, saltRounds);
    if(user_name && email_adress && password && user_type){
        UserModel.User.findOne({email_adress},(err, user)=>{
            if(!user){
                UserModel.User.createOne({
                    user_name,
                    email_adress,
                    password: hashedPassword,
                    user_type,
                })
                res.status(201).send({
                    message: "User created succesfully!"
                })
            } else {
                res.status(400).send({
                    message: `User with email: ${email_adress} already exists.`
                })
            }
        })
    } else {
        res.status(500).send({
            message: "Something is missing"
        })
    }
}

