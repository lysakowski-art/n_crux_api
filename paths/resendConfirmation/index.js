const UserModel = require("../../schema/users");
const TokenModel = require("../../schema/tokens");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");

module.exports = (req, res, next) => {
  const { User } = UserModel;
  const { Token } = TokenModel;
  const { emailAdress } = req.body;
  User.findOne({ emailAdress }, (err, user) => {
    if (!user) {
      return res.status(400).send({
        msg:
          "We were unable to find a user with that email. Make sure your Email is correct!",
      });
    } else if (user.active) {
      return res
        .status(200)
        .send("This account has been already verified. Please log in.");
    } else {
      const token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      token.save((err) => {
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
            return res.status(500).send({
              msg:
                "Technical Issue!, Please click on resend for verify your Email.",
            });
          });
        // var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
        // var mailOptions = { from: 'no-reply@example.com', to: user.email, subject: 'Account Verification Link', text: 'Hello '+ user.name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
        // transporter.sendMail(mailOptions, function (err) {
        //    if (err) {
        //     return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
        //  }
        return res
          .status(200)
          .send(
            "A verification email has been sent to " +
              user.emailAdress +
              ". It will be expire after one day. If you not get verification Email click on resend token."
          );
      });
    }
  });
};
