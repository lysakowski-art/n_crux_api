module.exports = (req, res) => {
  if (req.session.sessionData) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).send(true);
  } else {
    res.status(400).send(false);
  }
};
