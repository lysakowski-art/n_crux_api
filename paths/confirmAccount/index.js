const TokenModel = require("../../schema/tokens");
const UserModel = require("../../schema/users");

module.exports = (req, res) => {
  const { Token } = TokenModel;
  const { User } = UserModel;
  const { emailAdress, token } = req.params;
  Token.findOne({ token }, (err, token) => {
    if (!token) {
      return res
        .status(400)
        .send({
          msg:
            "Your verification link may have expired. Please click on resend for verify your Email.",
        });
    } else {
      User.findOne({ _id: token._userId, emailAdress }, (err, user) => {
        if (!user) {
          return res
            .status(401)
            .send({
              msg:
                "We were unable to find a user for this verification. Please SignUp!",
            });
        } else if (user.active) {
          return res
            .status(200)
            .send("User has been already verified. Please Login");
        } else {
          user.active = true;
          user.save((err) => {
            if (err) {
              return res.status(500).send({ msg: err.message });
            } else {
              return res
                .status(200)
                .send("Your account has been successfully verified");
            }
          });
        }
      });
    }
  });
};
