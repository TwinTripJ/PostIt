// const products = require("../models/mainModel");
const db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Category = db.Category;
const Post = db.Post;
const cookieConfig = { maxAge: 30000, httpOnly: true };

const moveUrl = (req, res) => {
  const url = req.params.url;
  res.render(url);
};

// 팝업창
const popUp = (req, res) => {
  try {
    let showPopUp = req.cookies.popupClosed !== "N";

    if (!req.cookies.popupClosed) {
      res.cookie("popupClosed", "Y", cookieConfig);
    }

    res.render("index", { showPopUp });
  } catch (err) {
    console.error("팝업 오류:", err);
    res.status(500).send("서버 오류 발생");
  }
};

// 팝업창 닫기
const closePopup = (req, res) => {
  res.cookie("popupClosed", "N", { maxAge: 30000, httpOnly: true });
  res.send("팝업이 닫혔습니다. 30초 동안 다시 표시되지 않습니다.");
};

// 제목으로 검색
const searchTitle = async (req, res) => {
  const name = req.query.name;
  try {
    // 게시글 데이터 가져오기
    const post = await Post.findAll({
      where: {
        title: {
          [Op.like]: "%" + name + "%",
        },
      },
      attributes: [
        "id",
        "user_id",
        "title",
        "content",
        "image_url",
        "createdAt",
        "category_id",
        [
          db.sequelize.literal(
            "(SELECT COUNT(*) FROM Likes WHERE Likes.post_id = Post.id)"
          ),
          "like_count",
        ],
      ],
      include: [
        {
          model: Category,
          as: "Category",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다" });
    }

    const posts = post.map((p) => ({
      ...p.toJSON(),
      content: p.content.replace(/<[^>]*>/g, ""),
    }));

    res.render("searchPage", { name, posts });
  } catch (err) {
    console.error(err);
    res.status(500).render("error", {
      message: "서버 오류가 발생했습니다.",
      error: err.message,
    });
  }
};

module.exports = {
  moveUrl,
  popUp,
  closePopup,
  searchTitle,
};
