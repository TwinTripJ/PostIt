window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const redirectUrl = urlParams.get("redirectUrl");

  console.log(token);

  if (token && redirectUrl) {
    window.localStorage.setItem("token", token);

    // 리다이렉트
    window.location.href = decodeURIComponent(redirectUrl);
  } else {
    alert("로그인 실패");
    window.location.href = "/user/login";
  }
};
