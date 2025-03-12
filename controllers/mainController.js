// const products = require("../models/mainModel");

const moveUrl = (req, res) => {
  const url = req.params.url;
  res.render(url);
};

module.exports = { moveUrl };
