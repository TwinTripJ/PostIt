const viewPost = (postId) => {
  if (token) {
    window.location.href = `/post/${postId}`;
  } else {
    window.location.href = "/postit/login";
  }
};
