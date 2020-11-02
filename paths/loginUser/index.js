const UserModel = require('../../schema/users')
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const { email_adress, password } = req.body;
    if (email_adress && password) {
      UserModel.User.findOne({ email_adress }, (err, user) => {
        if (err) {  
          res.status(500).send({
            message: `Something went wrong. Error message: ${err}`
          })
        } else if (!user) {
          res.status(404).send({
            message: `There is no User registered with e-mail: ${email_adress}.`
          })
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            req.session.loggedIn = {
              loggedIn: true,
              user_name: user.user_name,
              typeOfUser: user.user_type,
              
            };
            res.status(201).send({
              message: "User logged in succsesfuly!",
              user_name: user.user_name,
              session: req.session.loggedIn
            });
          } else {
              res.status(409).send({
                message: "Wrong password"
              });
          }
        }
      });
    } else {
      res.status(400).send({
        message: `Missing email or password`
      });
    }
  };