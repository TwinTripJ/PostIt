const token = localStorage.getItem("token");

const viewPost = (postId) => {
  axios
    .get(`/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      window.location.href = `/post/${postId}`;
    })
    .catch((error) => {
      console.error("게시글 조회 실패:", error);
    });
};

async function getUserId() {
  try {
    const response = await axios.get("/user/getUserId", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("유저 아이디", response.data.id);
    const userId = response.data.id;

    return userId;
  } catch (error) {
    console.error("유저 ID를 가져오는 데 실패했습니다.", error);
  }
}
