// const { default: axios } = require("axios");

document.addEventListener("DOMContentLoaded", function () {
  const postActions = document.querySelector(".post-actions");
  const currentUserId = postActions.dataset.currentUserId;
  const postId = postActions.dataset.postId;

  if (currentUserId === postId) {
    postActions.style.display = "block";
  } else {
    postActions.style.display = "none";
  }
});

function moveToModify(postId) {
  window.location.href = `/modify/${postId}`;
}

function moveUrl(url) {
  window.location.href = `/postit/${url}`;
}

async function deletePost(id) {
  const result = await Swal.fire({
    title: "삭제하시겠습니까?",
    text: "게시글 삭제 후 복구가 불가능합니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "확인",
    cancelButtonText: "취소",
  });

  if (result.isConfirmed) {
    try {
      const response = await axios.delete(`/post/delete/${id}`);

      Swal.fire({
        title: "게시글 삭제 완료되었습니다.",
        text: "메인으로 이동됩니다.",
        icon: "success",
        confirmButtonText: "확인",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.error("삭제 오류", error);
      Swal.fire({
        title: "삭제 실패",
        text: "문제가 발생했습니다. 다시 시도해 주세요.",
        icon: "error",
      });
    }
  } else {
    Swal.fire({
      title: "게시글 삭제가 취소되었습니다.",
      icon: "info",
    });
  }
}

const moveAuthor = (id) => {
  window.location.href = `/post/authorInfo/${id}`;
};

// 좋아요 토글
async function heart(event) {
  const iconImg = event.target;
  const icon = iconImg.parentElement;
  const postId = icon.getAttribute("data-id");
  if (!token) {
    window.location.href = "/user/login";
    return;
  }
  try {
    const response = await axios.post(
      `/like/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );
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

// 메인 페이지 모든 글의 좋아요 상태
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
  if (token) {
    try {
      const response = await axios.get("/like/likedPosts", {
        withCredentials: true,
      });
      const likedPosts = response.data.likedPostIds || [];
      document.querySelectorAll(".favoriteIcon").forEach((icon) => {
        const postId = icon.getAttribute("data-id");
        if (likedPosts.includes(Number(postId))) {
          icon.setAttribute("data-fav", "1");
          icon.querySelector("img").src =
            "../static/images/favoriteFillIcon.png";
        } else {
          icon.setAttribute("data-fav", "0");
          icon.querySelector("img").src = "../static/images/favoriteIcon.png";
        }
      });
    } catch (err) {}
  }
}

// 좋아요 상태
window.onload = function () {
  setLikeStatus();
};

document
  .getElementById("exampleModal")
  .addEventListener("hidden.bs.modal", function () {
    document.body.focus();
  });
