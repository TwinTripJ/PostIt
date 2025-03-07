const loginCheck = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  if (email === "" || pass === "") {
    Swal.fire({
      text: "아이디, 비밀번호 모두 작성하여 주세요.",
      icon: "error",
    });
  } else {
    const data = { email, pass };
    // 라우터 연결
    axios({
      method: "post",
      url: `/user/loginUser`,
      data: data,
    })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          axios
            .get("/")
            .then((response) => {
              if (response.status === 200) {
                window.location.href = "/";
              }
            })
            .catch((error) => {
              Swal.fire({
                title: "페이지 로드 오류",
                icon: "error",
              });
            });
        } else {
          Swal.fire({
            title: res.data,
            icon: "error",
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          title: "서버 오류 발생",
          icon: "error",
        });
      });
  }
};

// 페이지 이동
function moveUrl(url) {
  window.location.href = `/postit/${url}`;
}

// 네이버 로그인
var naver_id_login = new naver_id_login("YOUR_CLIENT_ID", "YOUR_CALLBACK_URL");
var state = naver_id_login.getUniqState();
naver_id_login.setButton("white", 2, 40);
naver_id_login.setDomain("YOUR_SERVICE_URL");
naver_id_login.setState(state);
naver_id_login.setPopup();
naver_id_login.init_naver_id_login();
