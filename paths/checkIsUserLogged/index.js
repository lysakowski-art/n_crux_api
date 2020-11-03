module.exports = (req, res) => {
  if (req.session.sessionData) {
    res.status(200).send(req.session.sessionData);
  } else {
    res.status(400).send({
      message: "No session"
    });
  }
};
