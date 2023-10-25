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
    // Display the movie details on the page
    const movieDetailsContainer = document.getElementById('movieDetails');
    // You can generate HTML to display the movie details here
    // For example:
    movieDetailsContainer.innerHTML = `
                  <div class="movie-card" id="${
                    movieDetails.id
                  }"><img class="posterImg" src="https://image.tmdb.org/t/p/w342/${
      movieDetails.poster_path
    }" alt="poster">
                      <h2 class="movie-title">${movieDetails.title}</h2>
                      <p class="overview">
                      시놉시스 : ${movieDetails.overview}
                      </p>
                      <h3>
                      평점 : ${Math.floor(movieDetails.vote_average)}
                      </h3>
                      <p class="release-date">
                      개봉일 : ${movieDetails.release_date}
                      </p>
                      <p class="status">
                      상태 : ${movieDetails.status}
                      </p>
                      <p class="spoken-languages">
                      언어 : ${movieDetails.spoken_languages.map(language => language.name).join(' & ')}
                      </p>
                      <p class="runtime">
                      런타임 : ${movieDetails.runtime}분
                      </p>
                      <p class="genres">
                      장르 : ${movieDetails.genres.map(genre => genre.name).join(' , ')}
                      </p>
                      <p>
                      
                      </p>
                      <p class="production-countries">
                      제작국가 : ${movieDetails.production_countries.map(countries => countries.name).join(' & ')}
                      </p>
                      <p class="production-companies">
                      제작사 : ${movieDetails.production_companies.map(companies => companies.name).join(' , ')}
                      </p>
                      <p class="budget">
                      제작예산 : ${movieDetails.budget} 달러
                      </p>
                      <p class="revenue">
                      흥행수입 : ${movieDetails.revenue} 달러
                      </p>
                      </div>`;
  })
  .catch(err => console.error(err));

//   // details fetch 를 불러오기 위해서는 movie_id 가 있어야 올바르게 작동하는 것 같음.
//   // 그럼 문제는 이게 작동하는지 어케 확인하냐...이건데.
//   // 콘솔로그를 찍어봐야 할 거 아냐?
//   // 아니 애초에 영화 리스트 불러오듯이 하면 안됐나?
//   // 클릭 이벤트로 movie_id를 담아서 fetch가 실행되게 해야하지 않나..?
//   // movieId를 겟하는 함수.
