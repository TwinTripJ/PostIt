const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/:url", mainController.moveUrl);
router.get("/search", mainController.searchTitle);

module.exports = router;
