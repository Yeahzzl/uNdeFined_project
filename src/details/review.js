const inputId = document.getElementById('writer');
const commentText = document.getElementById('comment');
const comSaveBtn = document.getElementById('saveBtn');
// const comeDeleteBtn = document.getElementById('comDelete');

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
                  <div class="cardContent">
                    <div class="editBtns">
                      <span class="comEdit">수정</span>
                      <span class="comDelete">삭제</span>
                    </div>
                    <div>
                      <p class="comInfo">${object.writer}</p>
                      <p class="comText">${object.comment}</p>
                      <p class="comInfo">2023.10.26 00:01</p>
                    </div>
                  </div>
                  <div class="editArea" style="display: none;">
                    <textarea class="editBox" cols="30" rows="10" Autofocus></textarea>
                    <button class="completeEditing " type="button">수정완료</button>
                    <button class="cancelEditing " type="button">취소</button>
                  </div>
                  `;
  commentList.appendChild(card);
  //   console.log(card);
}

//코멘트 삭제 실행 함수
const deleteComment = function () {
  const clickedBtn = event.target;
  const card = clickedBtn.closest('.comCard');
  const id = card.id;
  // console.log(card)

  if (confirm('코멘트를 삭제할까요?')) {
    localStorage.removeItem(id);
    alert('정상적으로 삭제되었습니다.');
    card.remove();
  }
};
//삭제버튼 
const delCommentBtns = document.querySelectorAll('.comDelete');
delCommentBtns.forEach(button => {
  button.addEventListener('click', deleteComment);
});

//카드내용 수정 실행 함수
const EditText = function () {

  activatedTextField.style.display = 'block';
  cardBox.style.display = 'none';

  // const card = document.querySelector('.comCard');
  // // const id = card.id; //이렇게 하면 하나의 카드만 가리킴

  // //해당 카드의 아이디 값을 줘야할 거 ㅅ같은데
};

//수정, 수정완료, 취소 버튼 변수선언
const editCommentBtns = document.querySelectorAll('.comEdit');
const editCompleteBtns = document.querySelectorAll('.completeEditing');
const editCancelBtns = document.querySelectorAll('.cancelEditing');

//수정버튼 클릭시 활성/비활성 영역 
const activatedTextField = document.querySelector('.editArea');
const cardBox = document.querySelector('.cardContent');


editCommentBtns.forEach(button => {
  button.addEventListener('click', EditText);
});
editCompleteBtns.forEach(completeBtn => {
  completeBtn.addEventListener('click', updateData);
});
editCancelBtns.forEach(cancelBtn => {
  cancelBtn.addEventListener('click', );
});