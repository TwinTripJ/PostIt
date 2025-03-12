// 게시글 작성하기로 이동하기
function moveWrite(url) {
  if (token) {
    axios
      .get(`/postit/${url}`)
      .then((res) => {
        window.location.href = `/postit/${url}`;
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    window.location.href = "/postit/login";
  }
}

const getUserId = async () => {
  if (token) {
    try {
      const response = await axios.get(`/user/getUserId`, {
        withCredentials: true,
      });

      const userId = response.data.id;

      return userId;
    } catch (error) {
      console.error("유저 ID를 가져오는 데 실패했습니다.", error);
    }
  }
};

// 좋아요 토글
async function heart(event) {
  const iconImg = event.target;
  const icon = iconImg.parentElement;
  const postId = icon.getAttribute("data-id");

  if (!token) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    // 서버에 좋아요 요청 (토글 기능)
    const response = await axios.post(
      `/like/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );

    console.log(response.data.like_count);

    // 서버 응답에서 좋아요 상태 가져오기
    const isLiked = response.data.liked;

    // UI 업데이트
    iconImg.src = isLiked
      ? "../static/images/favoriteFillIcon.png"
      : "../static/images/favoriteIcon.png";
    icon.setAttribute("data-fav", isLiked ? "1" : "0");

    // 좋아요 개수 업데이트
    const likeCountElement = icon
      .closest(".post-info")
      .querySelector(".like-count");

    if (!likeCountElement) {
      console.warn("좋아요 개수를 표시할 요소가 없습니다!");
      return;
    }

    likeCountElement.textContent = response.data.like_count;
  } catch (error) {
    console.error("좋아요 처리 중 오류 발생:", error);
  }
}

// 좋아요
async function getUserLikes() {
  try {
    const response = await axios.get(`/like/count/${postId}}`);
    const likeCountElement = icon
      .closest(".post-info")
      .querySelector(".like-count");

    if (!likeCountElement) {
      console.warn("좋아요 개수를 표시할 요소가 없습니다!");
      return;
    }
    likeCountElement.textContent = response.data.like_count;
    window.location.reload();
  } catch (err) {
    console.error("유저 좋아요 목록 조회 실패:", error);
    return [];
  }
}

// 좋아요한 상태 유지
async function setLikeStatus() {
  try {
    const response = await axios.get("/like/likedPosts", {
      withCredentials: true,
    });

    const likedPosts = response.data.likedPostIds || [];

    document.querySelectorAll(".favoriteIcon").forEach((icon) => {
      const postId = icon.getAttribute("data-id");

      if (likedPosts.includes(Number(postId))) {
        icon.setAttribute("data-fav", "1");
        icon.querySelector("img").src = "../static/images/favoriteFillIcon.png";
      } else {
        icon.setAttribute("data-fav", "0");
        icon.querySelector("img").src = "../static/images/favoriteIcon.png";
      }
    });
  } catch (err) {}
}

// 좋아요 상태
window.onload = function () {
  setLikeStatus();
};

const moveToPost = (postId) => {
  if (token) {
    axios
      .get(`/post/${postId}`, {
        withCredentials: true,
      })
      .then((response) => {
        window.location.href = `/post/${postId}`;
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
      });
  } else {
    window.location.href = "/postit/login";
  }
};
