// 에디터
const ed = document.querySelector("#editor");
const comment = ed.dataset.inputComment;

const editor = new toastui.Editor({
  el: document.querySelector("#content"), // 에디터를 적용할 요소 (컨테이너)
  height: "300px", // 에디터 영역의 높이 값 (OOOpx || auto)
  initialEditType: "markdown", // 최초로 보여줄 에디터 타입 (markdown || wysiwyg)
  initialValue: comment, // 내용의 초기 값으로, 반드시 마크다운 문자열 형태여야 함
  previewStyle: "vertical", // 마크다운 프리뷰 스타일 (tab || vertical)
});

// 글 저장
const write = async () => {
  const title = document.querySelector("input[name='title']").value;
  const gender = document.querySelector("input[name='gender']:checked").value;

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
