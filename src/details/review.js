//==================코멘트 저장=================

const inputId = document.querySelector('.writer');
const inputPw = document.querySelector('.password');
const commentText = document.getElementById('comment');
const comSaveBtn = document.getElementById('saveBtn');
// const comeDeleteBtn = document.getElementById('comDelete');

//저장버튼 - 로컬스토리지로 데이터 저장(아이디, 작성자, 코멘트내용, 작성시간)
const saveComment = () => {
  const randomId = Math.round(Math.random() * 10000000);
  const writer = inputId.value;
  const password = inputPw.value;
  const comment = commentText.value;
  const time = new Date().getTime();

  //유효성 검사
  if (writer === '' || comment === '') {
    alert('내용이 입력되지 않았습니다.');
  } else if (password === '') {
    alert('비밀번호를 입력해주세요.');
  } else {
    localStorage.setItem(randomId, JSON.stringify({writer, password, comment, time}));
    alert('저장이 완료되었습니다.');
    window.location.reload();
  }
};
comSaveBtn.addEventListener('click', saveComment);

// 저장된 전체 데이터 배열에 넣어서 정렬하기
const commentList = document.querySelector('.comList');
const allData = [];
//id, 작성자, 코멘트내용, 작성시간 데이터
for (let i = 0; i < localStorage.length; i++) {
  const id = localStorage.key(i);
  const object = JSON.parse(localStorage.getItem(id));
  allData.push({id: id, ...object});
}
//시간순으로 정렬하기(내림차순으로 정렬- 가장 최근 카드가 가장 위에 오도록)
allData.sort((a, b) => b.time - a.time);

//=====================작성 코멘트 화면에 표시 =======================
allData.forEach(data => {
  //시간 2023.10.29.22:00 형식으로 표현하기
  const dateObject = new Date(data.time); //정수값으로 저장된 데이터를 날짜/시간정보로 변환한 객체 생성
  const year = dateObject.getFullYear(); // 연도
  const month = dateObject.getMonth() + 1; // 월 (월이 0부터 시작하므로 +1 해주기. 0 = 1월)
  const day = dateObject.getDate(); // 일
  const hours = dateObject.getHours(); // 시
  let minutes = dateObject.getMinutes(); // 분
  minutes = minutes < 10 ? `0${minutes}` : minutes; //조건이 한 개일때 삼항연산자 사용할 수 있음
  const formattedDate = `${year}.${month}.${day}. ${hours}:${minutes}`;

  //form 아래에 카드 생성
  const card = document.createElement('li');
  card.className = 'comCard';
  card.id = data.id;
  card.innerHTML = `
                 <div class="cardContent">
                   <div class="editBtns">
                     <span class="comEdit">수정</span>
                     <span class="comDelete">삭제</span>
                   </div>
                   <div>
                     <p class="comInfo">${data.writer}</p>
                     <p class="comText">${data.comment}</p>
                     <p class="comInfo">${formattedDate}</p>
                   </div>
                 </div>
                 <div class="editArea" style="display: none;">
                   <textarea class="editBox" cols="30" rows="10" Autofocus></textarea>
                   <button class="completeEditing " type="button">수정완료</button>
                   <button class="cancelEditing " type="button">취소</button>
                 </div>
                 `;
  commentList.appendChild(card);
});

//====================삭제===================
//삭제버튼 클릭시 호출되는 함수
const deleteComment = function (event) {
  const clickedBtn = event.target;
  const card = clickedBtn.closest('.comCard');
  const id = card.id;
  const pw = JSON.parse(localStorage.getItem(id)).password;
  const checkPasswordMatch = prompt('비밀번호를 입력해주세요.');

  // while(checkPasswordMatch !== pw){

  // }
  if (checkPasswordMatch === pw) {
    localStorage.removeItem(id);
    alert('정상적으로 삭제되었습니다.');
    card.remove();
  } else {
    prompt('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
  }
};
//모든 삭제 버튼 요소 선택
const delCommentBtns = document.querySelectorAll('.comDelete');

//각 삭제버튼에 클릭 이벤트 리스너 등록
delCommentBtns.forEach(button => {
  button.addEventListener('click', deleteComment);
});

//=====================수정======================
//수정 버튼 클릭시 호출되는 함수
const EditText = function () {
  activatedTextField.style.display = 'block';
  cardBox.style.display = 'none';
};

// 수정 완료 버튼 클릭 시 호출되는 함수
const updateData = function () {
  activatedTextField.style.display = 'none';
  cardBox.style.display = 'block';
};

//취소버튼 클릭 시 호출되는 함수
const cancelEditing = function () {
  activatedTextField.style.display = 'none';
  cardBox.style.display = 'block';
};

//수정, 수정완료, 취소 버튼 요소 선택
const editCommentBtns = document.querySelectorAll('.comEdit');
const editCompleteBtns = document.querySelectorAll('.completeEditing');
const editCancelBtns = document.querySelectorAll('.cancelEditing');

//수정버튼 클릭시 활성화 되는 영역 선택
const activatedTextField = document.querySelector('.editArea');
const cardBox = document.querySelector('.cardContent');

// 버튼 클릭 이벤트 처리
editCommentBtns.forEach(button => {
  button.addEventListener('click', EditText);
});

editCompleteBtns.forEach(completeBtn => {
  completeBtn.addEventListener('click', updateData);
});
editCancelBtns.forEach(cancelBtn => {
  cancelBtn.addEventListener('click', cancelEditing);
});
