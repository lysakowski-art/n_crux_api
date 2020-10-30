const UserModel = require('../../schema/users')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
    const { email_adress, password } = req.body;
    if (email_adress && password) {
      UserModel.User.findOne({ email_adress }, (err, user) => {
        if (err) {  
            console.log(err);
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                req.session.loggedIn = {
                  loggedIn: true,
                  user_name: user.user_name,
                  typeOfUser: user.user_type,
                };
                res.send(true);
            } else {
                res.send(false);
            }
        }
      });
    } else {
      res.send(false);
    }
  };