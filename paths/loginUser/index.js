const UserModel = require('../../schema/users')
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
    const { emailAdress, password } = req.body;
    if (emailAdress && password) {
      // console.log( emailAdress, password )
      UserModel.User.findOne({ emailAdress }, (err, user) => {
        if (err) {  
          res.status(500).send({
            message: `Something went wrong. Error message: ${err}`
          })
        } else if (!user.active) {
          res.status(406).send({
            message: `User ${user.userName} is not activated`
          })
        } else if (!user) {
          res.status(404).send({
            message: `There is no User registered with e-mail: ${emailAdress}.`
          })
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            req.session.sessionData = {
              loggedIn: true,
              userName: user.userName,
              userType: user.userType,
              userId: user.userId
            };
            res.status(201).send({
              message: "User logged in succsesfuly!",
              userName: user.userName,
              userType: user.userType,
              userId: user.userId,
              session: req.session.sessionData
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