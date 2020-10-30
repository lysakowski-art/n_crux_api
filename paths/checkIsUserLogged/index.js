module.exports = (req, res) => {
  if (req.session.loggedIn) {
    res.status(200).send(req.session.loggedIn);
  } else {
    res.status(400).send(false);
  }
};
