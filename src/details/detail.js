let urlSearch = new URLSearchParams(window.location.search);
let movieId = urlSearch.get('id');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjg5NzEzNmQwZGFmYWRjZGI0MDJhYjcyODBiNWJiZSIsInN1YiI6IjY1MmYyNmQwZWE4NGM3MDEwYzFkYzNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LHU-uAz75iuYfxcauUmesT53m3QG4ZKs9xBdSmPsRPs',
  },
};

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, options)
  .then(res => res.json())
  .then(detailData => {
    const movieDetails = detailData;
    const movieDetailsContainer = document.getElementById('movieDetails');
    movieDetailsContainer.innerHTML = `
                  <div class="imgContainer" id="${movieDetails.id}"><img class="posterImg" 
                  src="https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}" alt="poster">
                  </div>
                      <div class="textContainer">
                      <div class=""headTextContainer>
                      <p class="titleIcon" style="font-size: 20px;">
                      🎥
                      </p>
                      <h1 class="movie-title">${movieDetails.title}</h1>
                      <h4 style="font-size: 20px;">
                      ⭐ :  ${Math.floor(movieDetails.vote_average)} 점
                      </h4>
                      <p class="overview" style="color: #777;">
                      ${movieDetails.overview}
                      </p>
                      </div>
                      <div class="footerTextContainer">
                      <div id="detailTextParentId" class="detailTextParent">
                      <div class="detailText1">
                      <p style="font-weight: bold;">
                      📅_개봉예정일
                      </p>
                      <p class="release-date">
                      ${movieDetails.release_date}
                      </p>
                      <p style="font-weight: bold;">
                      📢_개봉상황
                      </p>
                      <p class="status">
                      ${movieDetails.status}
                      </p>
                      <p style="font-weight: bold;">
                      🔊_언어
                      </p>
                      <p class="spoken-languages">
                      ${movieDetails.original_language}
                      </p>
                      <p style="font-weight: bold;">
                      ⏱_상영시간
                      </p>
                      <p class="runtime">
                      ${movieDetails.runtime}분
                      </p>
                      </div>
                      <div class="detailText2">
                      <p style="font-weight: bold;">
                      🎬_장르
                      </p>
                      <p class="genres">
                      ${movieDetails.genres.map(genre => genre.name).join(' , ')}
                      </p>
                      <p style="font-weight: bold;">
                      🌍_제작국가
                      </p>
                      <p class="production-countries">
                      ${movieDetails.production_countries.map(countries => countries.name).join(' & ')}
                      </p>
                      <p style="font-weight: bold;">
                      🦺_제작사
                      </p>
                      <p class="production-companies">
                      ${movieDetails.production_companies.map(companies => companies.name).join(' , ')}
                      </p>
                      <p style="font-weight: bold;">
                      💰_제작비
                      </p>
                      <p class="budget">
                      ${movieDetails.budget} 달러
                      </p>
                      <p style="font-weight: bold;">
                      🎉_흥행수익
                      </p>
                      <p class="revenue">
                      ${movieDetails.revenue} 달러
                      </p>
                      </div>
                      </div>
                      </div>
                      </div>`;
  })
  .catch(err => console.error(err));

// backBtn 클릭 시, index.html 페이지로 돌아가게 하는 코드
document.addEventListener('DOMContentLoaded', function () {
  const backButton = document.getElementById('backBtn');

  backButton.addEventListener('click', function () {
    // 뒤로가기 버튼시 localstorage에서 pageNumber가 있다면 가져와 URL 생성
    window.location.href = `index.html?pageNum=${localStorage.getItem('pageNumber') ?? 1}`;
  });
});

// toTopBtn 클릭 시, 스크롤 즉시 위로 끌어올리는 코드
document.getElementById('toTopBtn').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

//   // details fetch 를 불러오기 위해서는 movie_id 가 있어야 올바르게 작동하는 것 같음.
//   // 그럼 문제는 이게 작동하는지 어케 확인하냐...이건데.
//   // 콘솔로그를 찍어봐야 할 거 아냐?
//   // 아니 애초에 영화 리스트 불러오듯이 하면 안됐나?
//   // 클릭 이벤트로 movie_id를 담아서 fetch가 실행되게 해야하지 않나..?
//   // movieId를 겟하는 함수.
