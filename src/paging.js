import {fetchMovies, moviesContainer} from './app.js';

const SHOWING_PAGE_COUNT = 10; // 보여지는 카운트 개수 설정

const $pageContainer = document.getElementById('pageContainer');

export const makePagination = props => {
  const {page: nowPage, totalPages} = props;

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
    li.innerText = pageNumber;

    // 현재 페이지 번호에 클래스 추가
    checkIsNowPage(nowPage, +pageNumber, li);

    li.addEventListener('click', () => {
      movePage(pageNumber);
    });

    ul.append(li);
  }

  if (nowPage < 5) {
    // 다음 버튼 추가
    makeNextPrevButton(false, ul, ' >> ', nowPage, totalPages);
  } else {
    // 이전 버튼 추가
    makeNextPrevButton(true, ul, ' << ', nowPage);

    // 끝 번호로 가까워지면 다음 버튼 생성할 필요 없음
    if (nowPage < totalPages - SHOWING_PAGE_COUNT / 2) {
      makeNextPrevButton(false, ul, ' >> ', nowPage, totalPages);
    }
  }

  $pageContainer.append(ul);
};

const makeNextPrevButton = (isPrev, ul, text, nowPage, totalPages) => {
  const button = document.createElement('li');
  button.innerText = text;
  button.addEventListener('click', () => {
    if (isPrev) movePage(Math.max(nowPage - SHOWING_PAGE_COUNT / 2, 1));
    else movePage(Math.min(nowPage + SHOWING_PAGE_COUNT / 2, totalPages));
  });
  isPrev ? ul.prepend(button) : ul.append(button);
};

const checkIsNowPage = (pageNumber, index, li) => {
  if (pageNumber === index) {
    li.classList.add('now_page');
  }
};

// 페이지 이동
// movieContainer를 empty시킨 후 => fetchMovies로 다른 페이지의 영화 정보 불러옴
const movePage = pageNumber => {
  moviesContainer.innerHTML = '';
  fetchMovies(pageNumber);
};
