// 비밀번호 찾기
const idCheck = async () => {
  const email = document.getElementById("email").value;

  const data = { email };

  try {
    const res = await axios.post("/user/findPw", data);

    if (res.data.email) {
      Swal.fire({
        title: `새 비밀번호를 저장하시겠습니까`,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "해당 정보로 가입된 아이디가 없습니다.",
        icon: "error",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "서버 오류 발생",
      icon: "error",
    });
    console.error("Error:", error);
  }
};

// 페이지 이동
function moveUrl(url) {
  window.location.href = `/postit/${url}`;
}
