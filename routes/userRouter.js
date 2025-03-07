const userController = require("../controllers/userController");

const router = require("express").Router();

router.get(
  "/allUsers",
  userController.authenticateToken,
  userController.getAllUsers
);

router.get(
  "/getUserId",
  userController.authenticateToken,
  userController.getUserByIdWrite
);

// 특정 유저 확인 (id)
router.get(
  "/getUser",
  userController.authenticateToken,
  userController.getUserByIdNav
);

// 아이디 중복 확인
router.post("/check", userController.checkEmail);

// 전화번호 중복 확인
router.post("/phoneCheck", userController.checkPhone);

// 유저 추가
router.post("/addUser", userController.registerUser);

router.post("/loginUser", userController.loginUser);

router.post("/upload", userController.imgUpload);

router.post("/findId", userController.findId);

router.post("/findPw", userController.findPw);

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
