// document.addEventListener("DOMContentLoaded", function () {
//   loadAllPosts();
// });

const token = localStorage.getItem("token");

// 게시글 작성하기로 이동하기
function moveWrite(url) {
  if (token) {
    axios
      .get(`/postit/${url}`)
      .then((res) => {
        window.location.href = `/postit/${url}`;
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    window.location.href = "/postit/login";
  }
}

// 카테고리별 게시글로 이동하기
const moveToCategory = (categoryId) => {
  if (token) {
    window.location.href = `/category/${categoryId}`;
  } else {
    window.location.href = "/postit/login";
  }
};

// 모든 게시글 가져와 화면에 추가
// const loadAllPosts = async () => {
//   try {
//     const response = await axios.get("/post/allPosts");

    if (response.status === 200) {
      const posts = response.data;
      const postContainer = document.querySelector(".postContainer");
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post-item");
        postElement.innerHTML = `
          <div class="post-card" onclick="moveToPost(${post.id})" >
            <img src="${
              post.image_url
            }" alt="Post Image" class="post-image" width="100px" height="100px">
            <div class="post-info">
            
              <h4>${post.title}</h4>
              <p>${post.content.substring(0, 100)}...</p>
              <span>❤️ ${post.like_count || 0}</span>
            </div>
          </div>
        `;
        postContainer.appendChild(postElement);
      });
    }
  } catch (err) {}
};
//     if (response.status === 200) {
//       const posts = response.data;
//       const postContainer = document.querySelector(".mainContainer");
//       posts.forEach((post) => {
//         const postElement = document.querySelector(".postContainer");
//         postElement.innerHTML = `

//           <div class="post-card" onclick="moveToPost(${post.id})">
//             <img src="${
//               post.image_url
//             }" alt="Post Image" class="post-image" width="100px" height="100px">
//             <div class="post-info">
//               <h4>${post.title}</h4>
//               <p>${post.content.substring(0, 100)}...</p>
//               <span>❤️ ${post.like_count || 0}</span>
//             </div>
//           </div>
//         `;
//         postContainer.appendChild(postElement);
//       });
//     }
//   } catch (err) {}
// };

const moveToPost = (postId) => {
  window.location.href = `/post/${postId}`;
};
