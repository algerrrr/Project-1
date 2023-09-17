const main = document.getElementById("movie-results");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjYyNDZiYjdlYzVmYmIxYTgwZDBlNTM4YmZlZTEwYSIsInN1YiI6IjY1MDVhMGYwZmEyN2Y0MDEwYzQ5ZDg4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.thKokVSgsNkuUE5lHe4mmcATo5apThkx08FlvnEZ6NU",
  },
};



//Search bar
document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  const query = document.getElementById("search-input").value;

  searchMovies(query);
});

async function searchMovies(query) {
main.innerHTML = ""
    for(let page = 1; page < 5; page++) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,options);
    const data = await response.json();
    showElement(data.results);
    }
}

//Movie button
document.getElementById('popular-movies').addEventListener('click', function (e){
    searchLatestMovies()
})

async function searchLatestMovies(){
    main.innerHTML = ""
    for(let page = 1; page < 5; page++) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,options);
    const data = await response.json();
    showElement(data.results);
    }
}

//TV Shows button
document.getElementById('popular-tvShows').addEventListener('click', function (e){
    searchLatestTvShows()
})

async function searchLatestTvShows(){
    main.innerHTML = ""
    for(let page = 1; page<5; page++){
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`,options);
    const data = await response.json();
    showElement(data.results);
    }
}
//Search by genre
document.getElementById('genre').addEventListener('change', function (e){
    
    const genreValue = e.target.value;
    console.log(genreValue)
    const genres = {
        "genres": [
          {
            "id": 28,
            "name": "Action"
          },
    
          {
            "id": 35,
            "name": "Comedy"
          },
    
          {
            "id": 18,
            "name": "Drama"
          },
    
          {
            "id": 878,
            "name": "Science Fiction"
          },
        ]
    };
        
    const genre = genres.genres.find(g => g.name == genreValue);
        console.log(genre.id)
        searchByGenre(genre.id)
        

})

async function searchByGenre(genreId) {
    main.innerHTML = "";
    for(let page = 1; page <10; page++){
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`,
      options
    );
    const data = await response.json();

  

    const filteredResult = data.results.filter((video) =>
      video.genre_ids.includes(genreId)
    );
    showElement(filteredResult);
  }
}

//Show cards
function showElement(results) {
  const div = document.createElement("div");
  div.classList.add("content");
  results.forEach(({ title, poster_path, name }) => {
    const apiKey = "726246bb7ec5fbb1a80d0e538bfee10a";
    const li = document.createElement("li");

    li.classList.add("movie");
    const link = document.createElement("a");
    const image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w185/${poster_path}`;

    // Create a text node for the movie title
    const titleText = document.createElement("p");
    titleText.innerText = title? title: name;
    link.append(image);
    link.append(titleText);
    li.append(link);
    div.append(li);
  });

  //
  div.addEventListener("click", function (e) {
    let chosenItemFilter = results.filter((element) => {
      return (
        "https://image.tmdb.org/t/p/w185/" + element.poster_path ===
        e.target.src
      );
    });
    getMovieDetails(chosenItemFilter[0].id);
  });
  //
  
  // Append the unordered list to the main element
  main.append(div);
  
}



async function getMovieDetails(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjYyNDZiYjdlYzVmYmIxYTgwZDBlNTM4YmZlZTEwYSIsInN1YiI6IjY1MDVhMGYwZmEyN2Y0MDEwYzQ5ZDg4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.thKokVSgsNkuUE5lHe4mmcATo5apThkx08FlvnEZ6NU",
    },
  };

  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );
 
  let chosenItem = await response.json();
  let outerModal = document.createElement("div");
  outerModal.classList.add("outer-modal");
  let detailsDiv = document.createElement("div");
  detailsDiv.classList.add("movie-details-div");
  let closebtnP = document.createElement("p");
  closebtnP.classList.add("closebtnP");
  let closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", function () {
    outerModal.style.display = "none";
  });
  closebtnP.append(closeBtn);
  let movieInfoDiv = document.createElement("div");
  movieInfoDiv.classList.add("movie-info-div");

  // create elements inside the details div'
  let detailsImg = document.createElement("img");
  detailsImg.src = "https://image.tmdb.org/t/p/w185/" + chosenItem.poster_path;

  // create title
  const title = document.createElement("h2");
  title.innerText = chosenItem.original_title;

  // create tagline
  const taglineDiv = document.createElement("div");
  const taglineH3 = document.createElement("h3");
  const taglineP = document.createElement("p");
  taglineH3.innerText = "TAGLINE";
  taglineP.innerText = chosenItem.tagline;
  taglineDiv.append(taglineH3, taglineP);

  // create overview
  const overviewDiv = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  h3.innerText = "OVERVIEW:";
  p.innerText = chosenItem.overview;
  overviewDiv.append(h3, p);

//   create runtime
const runtimeDiv = document.createElement("div");
const runtimeh3 = document.createElement("h3");
const runtimep = document.createElement("p");
runtimeh3.innerText = "RUNTIME:";
runtimep.innerText = chosenItem.runtime + ' minutes';
runtimeDiv.append(runtimeh3, runtimep);

  //create original language
  const originalLanguageDiv = document.createElement("div");
  const originalLanguageTitle = document.createElement("h3");
  const originalLanguage = document.createElement("p");
  originalLanguageTitle.innerText = "ORIGINAL LANGUAGE:";
  originalLanguage.innerText = chosenItem.original_language;
  originalLanguageDiv.append(originalLanguageTitle, originalLanguage);

  // create release date
  const releaseDateDiv = document.createElement("div");
  const releaseDateTitle = document.createElement("h3");
  releaseDateTitle.innerText = "RELEASE DATE:";
  const releaseDate = document.createElement("p");
  releaseDate.innerText = chosenItem.release_date;
  releaseDateDiv.append(releaseDateTitle, releaseDate);

  // create homepage
  const homepageDiv = document.createElement("div");
  const homepageTitle = document.createElement("h3");
  homepageTitle.innerText = "HOMEPAGE: ";
  const homepageA = document.createElement("a");
  homepageA.href = chosenItem.homepage ? chosenItem.homepage : '#';
  homepageA.target = "_blank"
  homepageA.innerText = chosenItem.homepage ?  chosenItem.homepage : "Sorry, no homepage available.."
  homepageDiv.append(homepageTitle, homepageA);

  // add to movie info div
  movieInfoDiv.append(
    closebtnP,
    title,
    taglineDiv,
    overviewDiv,
    runtimeDiv,
    originalLanguageDiv,
    releaseDateDiv,
    homepageDiv
  );

  // add to the detials div

  detailsDiv.append(detailsImg, movieInfoDiv);
  outerModal.append(detailsDiv);
  main.append(outerModal);
}





  

  
