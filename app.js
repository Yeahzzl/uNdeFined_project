const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjg5NzEzNmQwZGFmYWRjZGI0MDJhYjcyODBiNWJiZSIsInN1YiI6IjY1MmYyNmQwZWE4NGM3MDEwYzFkYzNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LHU-uAz75iuYfxcauUmesT53m3QG4ZKs9xBdSmPsRPs',
  },
};
const movieUrl =
  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc';
const baseUrl = 'https://image.tmdb.org/t/p/';

//Rated movie
let movies = null;
const moviesContainer = document.getElementById('movieList');

fetch(movieUrl, options)
  .then(res => res.json())
  .then(data => {
    movies = data['results'];
    //함수를 밖에 선언해보고 시
    displayMovies();
    alertId();
  })
  .catch(err => console.error(err));

const displayMovies = () => {
  movies.forEach(movie => {
    let title = movie.title;
    let voteAverage = movie.vote_average;
    let overview = movie.overview;
    let releaseDate = movie.release_date;
    let posterPath = movie.poster_path;
    // 메인화면 temp_html을 복사 붙여넣기하면 자꾸 검색결과 오류가 생김
    //여기에 id변수 선언이 안되어있어서 그랬음. 그냥 id="${id}" 적어놓기만 해도 문제가 없는 줄 알았음.
    //변수 선언하고나니 잘 되네..... 그것도 모르고 엉뚱한거 다 갈아 엎었네
    let id = movie.id;

    const getImageUrl = posterPath => {
      return `https://image.tmdb.org/t/p/original${posterPath}`;
    };
    //받아온 영화 데이터 카드 만들어서 html에 붙이기
    const tempHtml = `
                            <div class="img_container">
                                <div class="movie_poster">
                                    <img id="${id}" class="poster_img"
                                        src="${getImageUrl(posterPath)}"
                                        alt="${title}">
                                </div>
                                <span class="overview">${overview}</span>
                                <div class="movie_cont">
                                    <strong>${title}</strong>
                                        <span class="cont_text">평점 ${voteAverage}</span>
                                        <span class="cont_text">개봉 ${releaseDate}</span>
                                </div>
                            </div>
                            `;

    moviesContainer.insertAdjacentHTML('beforeend', tempHtml);
  });
};

//카드 클릭시 id 얼럿띄우기
let alertId = function () {
  movies.forEach(movie => {
    let id = movie.id;
    //이거 안돼서 돌하버리는 줄 알았음....
    // document.querySelector로 처음에 하다가 id 값을 넣어야 하구나 알게됨 ->
    //근데 카드를 넣을때 마다 모든 카드의 아이디가 다 출력되어버림... 각각의 카드 아이디가 받아와져야 되는데 그걸 못 함.
    let eachMovie = document.getElementById(id);
    eachMovie.addEventListener('click', function () {
      console.log(id);
      alert(id);
    });
  });
};

//영화 검색
let allMovies = null;
const searchInput = document.querySelector('#search_input');
const searchButton = document.querySelector('#search_button');
const searchMovies = () => {
  let searchWord = searchInput.value;
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchWord}&include_adult=false&language=ko-KR&page=1&region=KR`,
    options,
  )
    .then(res => res.json())
    .then(data => {
      allMovies = data['results'];
      //받아온 영화 데이터 카드 만들어서 html에 붙이기
      //1. 그 전에 원래 페이지 내용을 지운다.
      clearPage();
      function clearPage() {
        while (moviesContainer.firstChild) {
          moviesContainer.removeChild(moviesContainer.firstChild);
        }
        // while 루프: 특적 조건이 참일 때 실행하기 -> moviesContainer안에 자식 요소가 존재하면 실행.
        // removeChid 메서드->  while 루프를 돌면서 firstChid를 지움 -> 모든 자식 요소 지우기
        // 자식 요소가 다 지워지면 멈춤.
      }
      //1. 빈 검색창 검색시 페이지 reload
      //2.  검색결과 있으면 카드 붙이기
      //3. 없으면 검색 결과가 없다고 표시하기
      if (searchWord === '') {
        window.location.reload();
      } else if (searchWord !== null && allMovies.length > 0) {
        allMovies.forEach(movie => {
          let title = movie.title;
          let voteAverage = movie.vote_average;
          let overview = movie.overview;
          let releaseDate = movie.release_date;
          let posterPath = movie.poster_path;
          let id = movie.id;

          const getImageUrl = posterPath => {
            return `https://image.tmdb.org/t/p/original${posterPath}`;
          };

          const tempHtml = `
                                    <div class="img_container">
                                        <div class="movie_poster">
                                            <img id="${id}" class="poster_img"
                                                src="${getImageUrl(posterPath)}"
                                                alt="${title}">
                                        </div>
                                        <span class="overview">${overview}</span>       
                                        <div class="movie_cont">
                                            <strong>${title}</strong>
                                            <span class="cont_text">평점: ${voteAverage}</span>
                                            <span class="cont_text">개봉일: ${releaseDate}</span>

                                        </div>
                                    </div>
                                     `;
          console.log(tempHtml);
          moviesContainer.insertAdjacentHTML('beforeend', tempHtml);
          // moviesContainer.innerHTML = tempHtml;
          //insertAdjacentHTML은 삽입할 HTML의 위치를 설정할 수 있고
          //innerHTML은 기존 내용을 지우고 새로운 내용으로 완전히 대체됨.
          //위 카드 내용을 innerHTML로 사용시 검색 결과가 다르게 나옴.
        });
      } else {
        moviesContainer.innerHTML = `<p>'${searchWord}'에 일치하는 결과가 없습니다.</p>`;
      }
    })
    .catch(err => console.error(err));
};
searchButton.addEventListener('click', searchMovies);

//키보드 enter 검색 실행시키기
searchInput.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    document.getElementById('search_button').click();
  }
});
