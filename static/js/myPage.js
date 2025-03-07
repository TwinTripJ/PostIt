// 카카오 앱 키
axios
  .get("/get-kakao-api-key")
  .then((response) => {
    const kakaoApiKey = response.data.kakaoApiKey;

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services`;
    document.head.appendChild(script);
  })
  .catch((error) => {
    console.error("카카오 API 키 로드 오류:", error);
  });

function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      var addr = "";
      var extraAddr = "";

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        document.getElementById("sample6_extraAddress").value = extraAddr;
      } else {
        document.getElementById("sample6_extraAddress").value = "";
      }

      document.getElementById("sample6_postcode").value = data.zonecode;
      document.getElementById("address").value = addr;
      document.getElementById("detailAddress").focus();
    },
  }).open();
}

// 프로필 이미지 선택
const changeProfile = () => {
  const fileInput = document.getElementById("fileInput");
  fileInput.click();
};

// 프로필 이미지 보기
const preview = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("profileImage").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 프로필 이미지 삭제 > 기본 이미지로 변경
const deleteProfile = () => {
  const fileInput = document.getElementById("fileInput");
  const profileImage = document.getElementById("profileImage");
  const defaultImage = "/static/images/profile.png";

  profileImage.src = defaultImage;
  fileInput.value = "";
};

// 비밀번호 일치
const pwCheck = () => {
  const password = document.getElementById("pass").value;
  const passwordCheck = document.getElementById("passCheck").value;
  const check = document.getElementById("alret");

  if (password === passwordCheck) {
    check.innerText = "비밀번호 일치";
  } else {
    check.innerText = "비밀번호 불일치";
  }
};

// 정보 수정 함수
const changeInfo = async () => {
  const token = localStorage.getItem("token");

  const fileInput = document.getElementById("fileInput");
  const password = document.getElementById("pass").value;
  const address_main = document.getElementById("address").value;
  const address_detail = document.getElementById("detailAddress").value;

  const formData = new FormData();

  if (fileInput.files.length > 0) {
    formData.append("image", fileInput.files[0]);
  }

  if (password) {
    formData.append("password", password);
  }

  if (address_main) {
    formData.append("address_main", address_main);
  }
  if (address_detail) {
    formData.append("address_detail", address_detail);
  }

  try {
    const response = await axios.put("/user/changeInfo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "수정되었습니다!",
      }).then(() => {
        window.location.href = "/";
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "수정 실패",
      text: "오류가 발생했습니다.",
    });
    console.error("Error:", error);
  }
};
