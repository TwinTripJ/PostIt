// const products = require("../models/mainModel");

const moveUrl = (req, res) => {
  const url = req.params.url;
  res.render(url);
};

const searchTitle = (req, res) => {
  const name = req.query.name;
  res.render("searchPage", { name });
};

module.exports = { moveUrl, searchTitle };
