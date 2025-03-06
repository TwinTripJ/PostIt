const userController = require("../controllers/userController");

const router = require("express").Router();

// 아이디 중복 확인
router.post("/check", userController.checkEmail);

// 유저 추가
router.post("/addUser", userController.registerUser);

// 모든 유저 확인
router.get(
  "/allUsers",
  userController.authenticateToken,
  userController.getAllUsers
);

// 특정 유저 확인 (id)
router.get(
  "/:id",
  userController.authenticateToken,
  userController.getUserById
);

// 유저 정보 수정
router.put("/:id", userController.authenticateToken, userController.updateUser);

// 유저 정보 삭제
router.delete(
  "/:id",
  userController.authenticateToken,
  userController.deleteUser
);

module.exports = router;
