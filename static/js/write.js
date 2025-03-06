// 에디터
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

document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.querySelector(".saveBtn");
  const titleInput = document.querySelector("input[name='title']");

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

const getUserId = async (token) => {
  if (!token) return null;
  try {
    const response = await axios.get("/user/getUserId", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.id;
    } else {
      console.error("사용자 ID 가져오기 실패");
      return null;
    }
  } catch (error) {
    console.error("토큰 검증 실패:", error);
    return null;
  }
};

// 글 저장
const addWrite = async () => {
  const title = document.querySelector("input[name='title']").value.trim();
  const category = document.querySelector("select[name='category']").value;
  const content = editor.getMarkdown();
  const images = extractImageUrls(content);
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "/post/create",
      {
        userId: getUserId(token),
        title,
        category,
        content,
        images,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "글이 정상적으로 등록되었습니다!",
      }).then(() => {
        window.location.href = "/";
      });
    }
  } catch (error) {
    alert("글 저장 실패");
    console.error("Error:", error);
  }
};
