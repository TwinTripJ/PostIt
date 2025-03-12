let page = 1; // 현재 페이지 번호
let isFetching = false; // 중복 요청 방지
const postContainer = document.querySelector(".postsBox");

// 스크롤 이벤트 감지
window.addEventListener("scroll", async function () {
  if (isFetching) return;

  // 스크롤이 페이지 하단에 도달했는지 확인
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    isFetching = true; // 중복 요청 방지

    try {
      page++; // 페이지 증가
      const response = await axios.get(`/?page=${page}`, {
        withCredentials: true,
      });

      const newPosts = response.data.posts;

      if (newPosts.length === 0) {
        window.removeEventListener("scroll", arguments.callee); // 데이터가 없으면 이벤트 제거
        return;
      }

      newPosts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("postContainer");
        postElement.innerHTML = `
          <div class="post-card">
            <img 
              src="${post.image_url || "/static/images/default-image.png"}"
              alt="Post Image"
              class="post-image"
              onclick="moveToPost('${post.id}')"
              data-id="${post.id}"
            />

            <div class="post-info">
              <div 
                class="favoriteIcon"
                onclick="heart(event)"
                data-fav="${post.favorite ? "1" : "0"}"
                data-id="${post.id}"
              >
                <img 
                  src="${
                    post.favorite
                      ? "../static/images/favoriteFillIcon.png"
                      : "../static/images/favoriteIcon.png"
                  }"
                />
              </div>
              <span class="like-count">${post.like_count || 0}</span>
            </div>
          </div>

          <div class="contentBox" onclick="moveToPost('${post.id}')">
            <h5>${post.title.substring(0, 10)}</h5>
            <hr />
            <p>${post.content ? post.content.substring(0, 30) : "내용 없음"}</p>
          </div>
        `;
        postContainer.appendChild(postElement);
      });
    } catch (error) {
      console.error("게시글을 불러오는 중 오류 발생:", error);
    } finally {
      isFetching = false; // 데이터 로드 후 다시 요청 가능하도록 변경
    }
  }
});

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

// 유저 아이디 불러오기
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

// 게시물 바로가기
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
