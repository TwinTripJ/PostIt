// 게시글 보기

const token = localStorage.getItem("token");

const viewPost = (postId) => {
  axios
    .get(`/post/${postId}`, { withCredentials: true })
    .then((response) => {
      console.log(response);
      window.location.href = `/post/${postId}`;
    })
    .catch((error) => {
      console.error("게시글 조회 실패:", error);
    });
};
