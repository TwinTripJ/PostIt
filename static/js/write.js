// 에디터
document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.querySelector(".saveBtn");
  const titleInput = document.querySelector("input[name='title']");
  const categorySelect = document.querySelector("select[name='category']");
  const editor = new toastui.Editor({
    el: document.querySelector("#detailEditor"),
    height: "300px",
    initialEditType: "wysiwyg",
    previewStyle: "vertical",
    initialValue: "상세 정보를 입력해주세요.",
  });

  // 이미지 URL 추출 함수
  const extractImageUrls = (content) => {
    const imgTags = content.match(/!\[.*?\]\((.*?)\)/g);
    if (!imgTags) return [];
    return imgTags
      .map((tag) => {
        const matches = tag.match(/\((.*?)\)/);
        return matches ? matches[1] : null;
      })
      .filter(Boolean);
  };

  // 글 내용 검증 함수
  const checkFormValidity = () => {
    const content = editor.getMarkdown();
    const isTitleValid = titleInput.value.trim().length > 0;
    const isContentValid =
      extractImageUrls(content).length > 0 && content.trim().length >= 10;

    saveButton.disabled = !(isTitleValid && isContentValid);
  };

  titleInput.addEventListener("input", checkFormValidity);
  editor.on("change", checkFormValidity);

  checkFormValidity();
});

const saveButton = document.querySelector(".saveBtn");
// 글 저장
const write = async () => {
  const title = document.querySelector("input[name='title']").value;
  const category = document.querySelector('select[name="category"]').value;

  data = { title, category };

  try {
    const response = await axios.post("/post/create", {});

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "글이 정상적으로 등록되었습니다!",
      }).then((res) => {
        window.location.href = "/";
      });
    }
  } catch (error) {
    alert("글 저장 실패");
    console.error("Error:", error);
  }
};
