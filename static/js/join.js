// 회원가입
const join = (event) => {
  event.preventDefault();
  const inputName = document.getElementById("username").value;
  const inputPassword = document.getElementById("password").value;

  try {
    const response = axios.post("/api/addUser", { username, password });

    if (response.status === 200) {
      alert("유저가 추가되었습니다!");
      location.reload();
    }
  } catch (error) {
    alert("추가 실패");
    console.error("Error:", error);
  }
};

// 탈퇴 요청
const secessionUser = (id) => {};
