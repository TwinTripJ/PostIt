const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/userMiddleware");
const likeController = require("../controllers/likeController");

router.post(
  "/:postId",
  authMiddleware.authenticateToken,
  likeController.toggleLike
);

router.get("/count/:postId", likeController.getLikeCount);

router.get(
  "/likePost/:postId",
  authMiddleware.authenticateToken,
  likeController.getUserLikePost
);

module.exports = router;
