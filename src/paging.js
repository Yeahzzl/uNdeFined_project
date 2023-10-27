import {fetchMovies, moviesContainer} from './app.js';

const SHOWING_PAGE_COUNT = 10; // 보여지는 카운트 개수 설정

const $pageContainer = document.getElementById('pageContainer');

export const makePagination = props => {
  const {page: nowPage} = props;

  const totalPages = 500; // 고정!! 500 넘어가면 TMDB에서 조회안됨...

  // page 공간 초기화
  $pageContainer.innerHTML = '';

  // li를 담을 ul 초기화
  const ul = document.createElement('ul');

  // 페이지 번호가 담긴 li 생성 최대 SHOWING_PAGE_COUNT 만큼 화면에 보여짐
  // 현재 페이지가 5보다 작을 경우는 이전 버튼을 보여주지 않음

  for (let i = 1; i < SHOWING_PAGE_COUNT + 1; i++) {
    const li = document.createElement('li');

    // now page가 5보다 클 경우 페이지 숫자가 점차 이동
    // e.g. nowPage가 3일 때  => [1, 2, "3", 4, 5, 6, 7, 8, 9, 10]
    // e.g. nowPage가 5일 때  => [1, 2, 3, 4, "5", 6, 7, 8, 9, 10]
    // e.g. nowPage가 6일 때    => [2, 3, 4, 5, "6", 7, 8, 9, 10, 11]
    const pageNumber = `${i + (nowPage < 5 ? 0 : nowPage - SHOWING_PAGE_COUNT / 2)}`;
    if (pageNumber > totalPages) continue;
    li.innerText = pageNumber;

    // 현재 페이지 번호에 클래스 추가
    checkIsNowPage(nowPage, +pageNumber, li);

    // 버튼에 페이지 이동 이벤트 추가
    li.addEventListener('click', () => {
      movePage(pageNumber);
    });

    ul.append(li);
  }

  if (nowPage < 5) {
    // 다음 버튼 추가
    makeNextPrevButton(false, ul, ' >> ',totalPages, nowPage);
    makeNextPrevButton(false, ul, "끝 페이지로", totalPages);
  } else {
    // 이전 버튼 추가
    makeNextPrevButton(true, ul, ' << ', nowPage);
    makeNextPrevButton(true, ul,"첫 페이지로", totalPages);

    // 끝 번호로 가까워지면 다음 버튼 생성할 필요 없음
    if (nowPage < totalPages - SHOWING_PAGE_COUNT / 2) {
      makeNextPrevButton(false, ul, ' >> ', totalPages, nowPage);
      makeNextPrevButton(false, ul, "끝 페이지로", totalPages);
    }
  }

  $pageContainer.append(ul);
};

const makeNextPrevButton = (isPrev, ul, text, totalPages, nowPage) => {
  const li = document.createElement('li');
  li.innerText = text;

  if (nowPage) {
    // <<, >> 버튼
    // 버튼 클릭시 페이지 이동 이벤트 추가
    li.addEventListener('click', () => {
      if (isPrev) movePage(Math.max(nowPage - SHOWING_PAGE_COUNT / 2, 1));
      else movePage(Math.min(nowPage + SHOWING_PAGE_COUNT / 2, totalPages));
    });
  } else {
    // 첫 페이지로, 끝 페이지로 버튼
    li.classList.add("start_end_button")
    li.addEventListener("click", () => {
      if (isPrev) movePage(1);
      else movePage(totalPages);
    })
  }

  // << 버튼이면 앞에, >> 버튼이면 뒤에
  isPrev ? ul.prepend(li) : ul.append(li);
}

const checkIsNowPage = (pageNumber, index, li) => {
  if (pageNumber === index) {
    li.classList.add('now_page');
  }
};

// 페이지 이동
// movieContainer를 empty시킨 후 => fetchMovies로 다른 페이지의 영화 정보 불러옴
const movePage = pageNumber => {
  moviesContainer.innerHTML = '';

  // pageNumber 변경시 주소창 변경
  history.pushState(null, null, `?pageNum=${pageNumber}`);

  // localStorage에 현재 페이지 번호 저장
  localStorage.setItem("pageNumber", pageNumber);
  fetchMovies(pageNumber);
};