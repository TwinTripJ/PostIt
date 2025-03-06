// 에디터
const detailEditor = new toastui.Editor({
  el: document.querySelector("#detailEditor"),
  height: "170px",
  initialEditType: "wysiwyg",
  previewStyle: "vertical",
  initialValue: "상세 정보를 입력해주세요.",
});

const saveButton = document.querySelector(".saveBtn");
// 글 저장
const write = async () => {
  const title = document.querySelector("input[name='title']").value;
  const category = document.querySelector('select[name="category"]').value;

  data = { title, gender };

  try {
    const response = await axios.post("/post/create", {});

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "로그인 성공하였습니다!",
      }).then((res) => {
        window.location.href = "/";
      });
    }
  } catch (error) {
    alert("회원가입 실패");
    console.error("Error:", error);
  }
};
