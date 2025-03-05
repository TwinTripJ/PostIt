const loginCheck = () => {
  const id = document.getElementById("id").value;
  const pass = document.getElementById("pass").value;
  const data = { id, pass };
  axios({
    method: "post",
    url: `/login/check`,
    data: data,
  })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        axios
          .get("/login/main_jwt")
          .then((response) => {
            if (response.status === 200) {
              window.location.href = "/login/main_jwt";
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
};
