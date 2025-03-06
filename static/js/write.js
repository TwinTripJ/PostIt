// 에디터
const ed = document.querySelector("#editor");

const editor = new toastui.Editor({
  el: document.querySelector("#content"),
  height: "300px",
  initialEditType: "markdown",
  initialValue: "글 작성",
  previewStyle: "vertical",
});

// 글 저장
const write = async () => {
  const title = document.querySelector("input[name='title']").value;
  const content = editor.getMarkdown();

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
