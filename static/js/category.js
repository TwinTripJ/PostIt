// 게시글 보기
const viewPost = (categoryName, postId) => {
  axios
    .get(`/post/${categoryName}/${postId}`, { withCredentials: true })
    .then((response) => {
      console.log(response);
      window.location.href = `/post/${categoryName}/${postId}`;
    })
    .catch((error) => {
      console.error("게시글 조회 실패:", error);
    });
};
