// 아이디 중복 확인
const idCheck = () => {
  const email = document.getElementById("email").value;
  const data = { email };
  if (!email) {
    Swal.fire("아이디를 입력해 주세요.");
    return;
  }
  axios({
    method: "post",
    url: `/user/check`,
    data: data,
  })
    .then((response) => {
      Swal.fire(response.data.message);
    })
    .catch((error) => {
      console.error("중복 확인 오류:", error);
      Swal.fire("서버 오류가 발생했습니다.");
    });
};

// 회원가입 함수
const join = async () => {
  const email = document.getElementById("email").value;
  const username = document.querySelector("input[name='name']").value;
  const password = document.getElementById("pass").value;
  const passwordCheck = document.getElementById("passCheck").value;
  const gender = document.querySelector("input[name='gender']:checked").value;

  const areaCode = document.querySelector("input[name='areaCode']").value;
  const middleNumber = document.querySelector(
    "input[name='middleNumber']"
  ).value;
  const lastNumber = document.querySelector("input[name='lastNumber']").value;
  const phone = `${areaCode}-${middleNumber}-${lastNumber}`;

  const birthYear = document.getElementById("birth-year").value;
  const birthMonth = document.getElementById("birth-month").value;
  const birthDay = document.getElementById("birth-day").value;
  const birthDate = `${birthYear}${birthMonth}${birthDay}`;

  if (password !== passwordCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    const response = await axios.post("/user/addUser", {
      email,
      username,
      password,
      gender,
      phone,
      birthDate,
    });

    if (response.status === 200) {
      alert("회원가입이 완료되었습니다!");
      location.reload();
    }
  } catch (error) {
    alert("회원가입 실패");
    console.error("Error:", error);
  }
};

// 탈퇴 요청
const secessionUser = (id) => {};
