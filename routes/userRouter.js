const userController = require("../controllers/userController.js");

const router = require("express").Router();

router.post("/addUser", userController.registerUser);

router.get(
  "/allUsers",
  userController.authenticateToken,
  userController.getAllUsers
);
router.get(
  "/:id",
  userController.authenticateToken,
  userController.getUserById
);
router.put("/:id", userController.authenticateToken, userController.updateUser);
router.delete(
  "/:id",
  userController.authenticateToken,
  userController.deleteUser
);

module.exports = router;
