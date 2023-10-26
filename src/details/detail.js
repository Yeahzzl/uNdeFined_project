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
                  src="https://image.tmdb.org/t/p/w780/${movieDetails.backdrop_path}" alt="poster">
                  </div>
                      <div class="textContainer">
                      <p class="titleIcon">
                      🎥
                      </p>
                      <h2 class="movie-title">${movieDetails.title}</h2>
                      <p class="overview" style="color: #777">
                      ${movieDetails.overview}
                      </p>
                      <h4>
                      ⭐ :  ${Math.floor(movieDetails.vote_average)} 점
                      </h4>
                      <div class="detailTextContainer">
                      <h3>
                      상세정보
                      </h3>
                      <p class="release-date">
                      📅 _ ${movieDetails.release_date}
                      </p>
                      <p class="status">
                      📢 _ ${movieDetails.status}
                      </p>
                      <p class="spoken-languages">
                      🔊 _ ${movieDetails.original_language}
                      </p>
                      <p class="runtime">
                      ⏱ _ ${movieDetails.runtime}분
                      </p>
                      <p class="genres">
                      🎬 _ ${movieDetails.genres.map(genre => genre.name).join(' , ')}
                      </p>
                      <p class="production-countries">
                      🌍 _ ${movieDetails.production_countries.map(countries => countries.name).join(' & ')}
                      </p>
                      <p class="production-companies">
                      🦺 _ ${movieDetails.production_companies.map(companies => companies.name).join(' , ')}
                      </p>
                      <p class="budget">
                      💰 _ ${movieDetails.budget} 달러
                      </p>
                      <p class="revenue">
                      🎉 _ ${movieDetails.revenue} 달러
                      </p>
                      </div>
                      </div>`;
  })
  .catch(err => console.error(err));

// backBtn 클릭 시, index.html 페이지로 돌아가게 하는 코드
document.addEventListener('DOMContentLoaded', function () {
  const backButton = document.getElementById('backBtn');

  backButton.addEventListener('click', function () {
    window.location.href = 'index.html';
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
