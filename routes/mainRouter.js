const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/search", mainController.searchTitle);
router.get("/:url", mainController.moveUrl);
router.get("/popup", mainController.popUp);
router.get("/popupClose", mainController.closePopup);

module.exports = router;
