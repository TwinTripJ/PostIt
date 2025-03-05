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

// 중복 확인
function check() {
  const id = document.getElementById("id").value;
  let userDataAll = JSON.parse(localStorage.getItem("userData")) || [];

  const isExist = userDataAll.some((user) => user.id === id);

  if (id === "") {
    Swal.fire({
      icon: "error",
      text: "아이디가 비어있습니다.",
    });
  } else {
    if (isExist) {
      Swal.fire({
        icon: "error",
        text: "이미 사용 중인 아이디입니다.",
      });
    } else {
      Swal.fire({
        icon: "success",
        text: "사용 가능한 아이디입니다.",
      });
    }
  }
}

function passCheck() {
  const pass = document.getElementById("pass").value;
  const passCheck = document.getElementById("passCheck").value;
  const alret = document.getElementById("alret");

  if (pass === "" || passCheck === "") {
    Swal.fire({
      icon: "error",
      text: "비밀번호가 비어있습니다.",
    });
  } else {
    if (pass === passCheck) {
      alret.innerText = "동일한 비밀번호입니다.";
    } else {
      alret.innerText = "비밀번호가 다릅니다.";
    }
  }
}

// 출생 연도
const year = document.querySelector("#birth-year");
// option 목록 생성 여부 확인
isYearOptionExisted = false;
year.addEventListener("focus", function () {
  // year 목록 생성되지 않았을 때
  if (!isYearOptionExisted) {
    isYearOptionExisted = true;
    for (var i = 1940; i <= 2022; i++) {
      // option element 생성
      const YearOption = document.createElement("option");
      YearOption.setAttribute("value", i);
      YearOption.innerText = i;
      // year의 자식 요소로 추가
      this.appendChild(YearOption);
    }
  }
});

// 출생 달
const month = document.querySelector("#birth-month");

monthOption = false;
month.addEventListener("focus", function () {
  if (!monthOption) {
    monthOption = true;
    for (var i = 1; i <= 12; i++) {
      const monthOption = document.createElement("option");
      monthOption.setAttribute("value", i);
      monthOption.innerText = i;

      this.appendChild(monthOption);
    }
  }
});

// 출생 일
const day = document.querySelector("#birth-day");

dayOption = false;
day.addEventListener("focus", function () {
  if (!dayOption) {
    dayOption = true;
    for (var i = 1; i <= 31; i++) {
      const dayOption = document.createElement("option");
      dayOption.setAttribute("value", i);
      dayOption.innerText = i;

      this.appendChild(dayOption);
    }
  }
});

// 생년월일 기본값일 경우
document.querySelector("form").addEventListener("submit", function (event) {
  let year = document.getElementById("birth-year").value;
  let month = document.getElementById("birth-month").value;
  let day = document.getElementById("birth-day").value;

  if (year === "출생 연도" || month === "월" || day === "일") {
    // 경고창 꾸미기
    alert("출생 연도, 월, 일을 선택해주세요.");
    event.preventDefault();
  }
});
