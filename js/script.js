function getPostById(id) {
  const url = "https://jsonplaceholder.typicode.com/posts/";
  fetch(`${url}${id}`)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((data) => renderPost(data))
    .catch((error) => showError(error));
}

function getCommentByPostId(id) {
  const url = "https://jsonplaceholder.typicode.com/posts/";
  fetch(`${url}${id}/comments`)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((data) => data.forEach((d) => renderComment(d)))
    .catch((error) => showError(error));
}

function clear() {
  document.querySelector("#postContainer").innerHTML = "";
}

function renderPost(data) {
  if (!data.title) return;
  const postContainer = createContainer();
  const btnShowComment = document.createElement("button");
  btnShowComment.textContent = "Show Comment";
  appendContent(postContainer, `<p>${data.title}</p><p>${data.body}</p>`);
  postContainer.append(btnShowComment);
  document.querySelector("#postContainer").append(postContainer);

  btnShowComment.addEventListener("click", function () {
    clear();
    getCommentByPostId(data.id);
  });
}

document.querySelector("#searchBtn").addEventListener("click", function () {
  clear();
  const id = document.querySelector("#postIdInput").value;
  if (id <= 100 && id >= 1) {
    getPostById(id);
  } else {
    showError();
  }
});

function showError(error) {
  console.error("Error:", error);
  const errorElement = document.createElement("p");
  errorElement.textContent = "Something went wrong. Please try again.";
  errorElement.classList.add("error-message");
  document.querySelector("#postContainer").append(errorElement);
}

function renderComment(data) {
  const postContainer = createContainer();
  appendContent(
    postContainer,
    `<p>Comment</p><p>Name: ${data.name}</p><p>Email: ${data.email}</p><p>${data.body}</p>`
  );
  document.querySelector("#postContainer").appendChild(postContainer);
}

function createContainer() {
  const postContainer = document.createElement("div");
  postContainer.classList.add("main__container");
  return postContainer;
}

function appendContent(container, content) {
  container.innerHTML = content;
}
