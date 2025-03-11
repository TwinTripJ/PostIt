function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// 토큰을 쿠키에서 가져오기
const token = getCookie("token");

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

// 모든 게시글 가져와 화면에 추가
// const loadAllPosts = async () => {
//   try {
//     const response = await axios.get("/post/allPosts");
//     if (response.status === 200) {
//       const posts = response.data;
//       const postContainer = document.querySelector(".mainContainer");
//       posts.forEach((post) => {
//         const postElement = document.querySelector(".postContainer");
//         postElement.innerHTML = `

//           <div class="post-card" onclick="moveToPost(${post.id})">
//             <img src="${
//               post.image_url
//             }" alt="Post Image" class="post-image" width="100px" height="100px">
//             <div class="post-info">
//               <h4>${post.title}</h4>
//               <p>${post.content.substring(0, 100)}...</p>
//               <span>❤️ ${post.like_count || 0}</span>
//             </div>
//           </div>
//         `;
//         postContainer.appendChild(postElement);
//       });
//     }
//   } catch (err) {}
// };

async function getUserId() {
  try {
    const response = await axios("/user/getUserId", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userId = response.data.id;
    return userId;
  } catch (error) {
    console.error("유저 ID를 가져오는 데 실패했습니다.", error);
  }
}

// async function heart(event) {
//   const iconImg = event.target;
//   const icon = iconImg.parentElement;
//   const att = icon.getAttribute("data-fav");
//   const productId = iconImg
//     .closest(".post-card")
//     .querySelector("img")
//     .getAttribute("data-id");
//   const userId = await getUserId();

//   const isLiked = att === "0";

//   iconImg.src = isLiked
//     ? "../static/images/favoriteFillIcon.png"
//     : "../static/images/favoriteIcon.png";
//   icon.setAttribute("data-fav", isLiked ? "1" : "0");

//   try {
//     await Promise.all([
//       // 유저 테이블 요청
//       axios.post("user/like", {
//         id: userId,
//         liked: isLiked,
//       }),
//       // 게시글 테이블 요청
//       axios.post("post/like", {
//         id: productId,
//         userId: userId,
//         liked: isLiked,
//       }),
//     ]);

//     const likeCountElement = icon.nextElementSibling;
//     let likeCount = parseInt(likeCountElement.textContent.split(" ")[0]);
//     likeCountElement.textContent = `${
//       isLiked ? likeCount + 1 : likeCount - 1
//     } 좋아요`;
//   } catch (error) {
//     console.error("좋아요 처리 중 오류 발생:", error);
//   }
// }

async function heart(event) {
  const iconImg = event.target;
  const icon = iconImg.parentElement;
  const postId = icon.getAttribute("data-post-id"); // 직관적인 속성 사용
  const token = localStorage.getItem("token");

  if (!token) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    // 서버에 좋아요 요청 (토글 기능)
    const response = await axios.post(
      `/post/${postId}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // 서버 응답에서 좋아요 상태 가져오기
    const isLiked = response.data.liked;

    // UI 업데이트
    iconImg.src = isLiked
      ? "../static/images/favoriteFillIcon.png"
      : "../static/images/favoriteIcon.png";
    icon.setAttribute("data-fav", isLiked ? "1" : "0");

    // 좋아요 개수 업데이트
    const likeCountElement = icon.nextElementSibling;
    let likeCount = parseInt(likeCountElement.textContent.split(" ")[0]);
    likeCountElement.textContent = `${
      isLiked ? likeCount + 1 : likeCount - 1
    } 좋아요`;
  } catch (error) {
    console.error("좋아요 처리 중 오류 발생:", error);
  }
}

// 좋아요 유지
async function getUserLikes() {
  const userId = await getUserId();

  try {
    const response = await axios.get(`/user/likes?userId=${userId}`);
    return response.data.likedPosts;
  } catch (err) {
    console.error("🚨 유저 좋아요 목록 조회 실패:", error);
    return [];
  }
}

async function setLikeStatus() {
  const likedPosts = await getUserLikes();
  document.querySelectorAll(".favoriteIcon").forEach((icon) => {
    const postId = icon.getAttribute("data-post-id");
    if (likedPosts.includes(postId)) {
      icon.setAttribute("data-fav", "1");
      icon.querySelector("img").src = "../static/images/favoriteFillIcon.png";
    }
  });
}

document.addEventListener("DOMContentLoaded", setLikeStatus);

const moveToPost = (postId) => {
  if (token) {
    axios
      .get(`/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
