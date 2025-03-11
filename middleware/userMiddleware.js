const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  console.log("요청된 쿠키:", req.cookies);
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "유효한 토큰이 필요합니다" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log("[서버] 인증된 사용자:", req.user);
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "토큰이 유효하지 않음", error: err.message });
  }
};

module.exports = { authenticateToken };
