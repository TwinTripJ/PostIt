if (success) {
  Swal.fire({
    icon: "success",
    title: "<%= message %>",
    showConfirmButton: false,
    timer: 500,
  }).then(() => {
    window.location.href = "/";
  });
} else {
  Swal.fire({
    icon: "error",
    title: "로그인 실패",
    text: "로그인 과정에서 문제가 발생했습니다. 다시 시도해주세요.",
    showConfirmButton: true,
  });
}
