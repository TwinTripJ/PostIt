require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");

const mainRouter = require("./routes/mainRouter");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const postRouter = require("./routes/postRouter");
// const { upload } = require("./controllers/adminController");

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/postit", mainRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/post", postRouter);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("main");
});

app.get("/get-kakao-api-key", (req, res) => {
  res.json({ kakaoApiKey: process.env.KAKAO_API_KEY });
});

// app.post("/upload", upload.single("files"), (req, res) => {
//   res.json({
//     imageUrl: `/uploads/${req.file.filename}`,
//     title: req.body.title,
//   });
// });

// 업로드된 이미지 목록 가져오기 API
app.get("/get-images", (req, res) => {
  const uploadsDir = path.join(__dirname, "img");

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("파일 목록을 읽는 중 오류 발생:", err);
      return res
        .status(500)
        .json({ error: "파일 목록을 불러오지 못했습니다." });
    }

    // 이미지 파일만 필터링 (jpg, png, gif 등)
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    res.json(imageFiles);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
