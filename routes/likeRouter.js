const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/userMiddleware");
const likeController = require("../controllers/likeController");

router.post(
  "/:postId/like",
  authMiddleware.authenticateToken,
  likeController.toggleLike
);

router.get("/:postId/likes", likeController.getLikeCount);

router.get(
  "/:postId/liked",
  authMiddleware.authenticateToken,
  likeController.getUserLikePost
);

module.exports = router;
