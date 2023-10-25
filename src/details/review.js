let inputId = document.getElementById('writer');
let commentText = document.getElementById('comment');
const comSaveBtn = document.getElementById('saveBtn');
const saveComment = () => {
  let writer = JSON.stringify(inputId.value);
  let comment = JSON.stringify(commentText.value);
  window.localStorage.setItem(writer, comment);
};
comSaveBtn.addEventListener('click', saveComment);
