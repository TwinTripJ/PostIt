const db = require("../models");
const Like = db.Like;

// 좋아요 추가/취소
const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;

    const user_id = req.user.id;

    console.log("sdfsdf", postId, user_id);

    const existingLike = await Like.findOne({
      where: { user_id: user_id, post_id: postId },
    });

    if (existingLike) {
      await existingLike.destroy();
      return res.status(200).json({ message: "좋아요 취소", liked: false });
    } else {
      await Like.create({ user_id, postId });
      return res.status(200).json({ message: "좋아요 추가", liked: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "좋아요 처리 실패", error: err.message });
  }
};

// 게시글의 좋아요 개수 조회
const getLikeCount = async (req, res) => {
  try {
    const { post_id } = req.params;

    // 개수
    const likeCount = await Like.count({ where: { post_id } });

    res.status(200).json({ post_id, like_count: likeCount });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "좋아요 개수 조회 실패", error: err.message });
  }
};

// 사용자가 좋아요한 게시글 목록 조회
const getUserLikePost = async (req, res) => {
  try {
    const user_Id = req.user.id;

    const likePosts = await Like.findAll({
      where: { user_Id },
      attributes: ["post_id"],
    });
    const likedPostIds = likePosts.map((like) => like.post_id);
    res.status(200).json({ likePosts: likedPostIds });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "좋아요 개수 조회 실패", error: err.message });
  }
};

module.exports = {
  toggleLike,
  getLikeCount,
  getUserLikePost,
};
