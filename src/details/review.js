const inputId = document.getElementById('writer');
const commentText = document.getElementById('comment');
const comSaveBtn = document.getElementById('saveBtn');
const comeDeleteBtn = document.getElementById('comDelete');

//writer,comment가 밖에 나와있으면(이 위치) 실행이 안되는 이유는?

//저장버튼 - 로컬스토리지로 데이터 저장
const saveComment = () => {
  const randomId = Math.round(Math.random() * 10000000);
  const writer = JSON.stringify(inputId.value);
  const comment = JSON.stringify(commentText.value);
  localStorage.setItem(randomId, JSON.stringify({writer, comment}));
  alert('저장되었습니다.');
  window.location.reload();
};
comSaveBtn.addEventListener('click', saveComment);

// for문으로 저장된 데이터 전체 가져오기
const commentList = document.querySelector('.comList');
for (let i = 0; i < localStorage.length; i++) {
  const id = localStorage.key(i);
  const object = JSON.parse(localStorage.getItem(id));
  //   console.log(object);
  //전체 코멘트 데이터 가져와서 form 아래에 카드 붙이기
  const card = document.createElement('li');
  card.className = 'comCard';
  card.id = id;
  card.innerHTML = `
                  <div class="editBtns">
                      <span class="comEdit">수정</span>
                      <span class="comDelete">삭제</span>
                  </div>
                  <div>
                      <p class="comInfo">${object.writer}</p>
                      <p>${object.comment}</p>
                      <p class="comInfo">2023.10.26 00:01</p>
                  </div>`;
  commentList.appendChild(card);
//   console.log(card);
}

//코멘트 삭제
const deleteComment = function () {
  const card = document.querySelector('.comCard')
  const id = card.id;
  if (confirm('코멘트를 삭제할까요?')) {
    localStorage.removeItem(id);
    alert('코멘트가 정상적으로 삭제되었습니다.');
    card.remove();
  }
};
const delCommentBtns = document.querySelectorAll('.comDelete');
delCommentBtns.forEach(button => {
    button.addEventListener('click', deleteComment);
})

//카드내용 수정
// const editCommentBtn = document.querySelectorAll('.comEdit');
