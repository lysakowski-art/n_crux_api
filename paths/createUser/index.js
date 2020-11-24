const UserModel = require("../../schema/users");
const TokenModel = require("../../schema/tokens");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");

module.exports = (req, res) => {
  const { User } = UserModel;
  const { Token } = TokenModel;
  const { userName, emailAdress, password, userType } = req.body;
  const saltRounds = 12;
  let hashedPassword = bcrypt.hashSync(password, saltRounds);
  if (userName && emailAdress && password && userType) {
    User.findOne({ emailAdress }, (err, user) => {
      if (!user) {
        user = new User({
          userName,
          emailAdress,
          password: hashedPassword,
          userType,
        });
        user.save(function (err) {
          if (err) return res.status(500).send({ message: err.message });
        });
        const token = Token({
          _userId: user._id,
          token: crypto.randomBytes(16).toString("hex"),
        });
        token.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          const mailOptions = {
            from: "no-reply@cruxofpoland.pl",
            to: emailAdress,
            subject: "Account veriffication Crux of Poland",
            // text: 'Hello '+ user.userName +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.emailAdress + '\/' + token.token + '\n\nThank You!\n'
            text: `Hello ${user.userName} ,\n\n Please verify your account by clicking the link: \nhttp:\/\/${process.env.HOST}:${process.env.PORT}\/confirmation\/${user.emailAdress}\/${token.token}\n\nThank You!\n`,
          };
          sgMail.setApiKey(process.env.SENDGRID_KEY);
          sgMail
            .send(mailOptions)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        });
        res.status(201).send({
          message: "User created succesfully!",
        });
      } else {
        res.status(400).send({
          message: `User with email: ${emailAdress} already exists.`,
        });
      }
    });
  } else {
    res.status(500).send({
      message: "Something is missing",
    });
  }
};
