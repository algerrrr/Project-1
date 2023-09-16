// script.js

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    const query = document.getElementById('search-input').value;

    // Call a function to fetch and display movie search results from the TMDb API
    searchMovies(query);
});

async function searchMovies(query) {
    // Use your TMDb API key here
    const apiKey = '726246bb7ec5fbb1a80d0e538bfee10a';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const movieResults = document.getElementById('movie-results');
        movieResults.innerHTML = '';

        if (data.results && data.results.length > 0) {
            
            data.results.forEach(movie => {
                const movieElement = document.createElement('div');
                
                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    
                    <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="${movie.title} Poster">
                    <h2>${movie.title}</h2>
                    <p>Release Date: ${movie.release_date}</p>
                    
                `;
                movieResults.appendChild(movieElement);
            });
        } else {
            movieResults.innerHTML = 'No results found.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function showMovies() {
    
}
function getPopularMovies() {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjYyNDZiYjdlYzVmYmIxYTgwZDBlNTM4YmZlZTEwYSIsInN1YiI6IjY1MDVhMGYwZmEyN2Y0MDEwYzQ5ZDg4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.thKokVSgsNkuUE5lHe4mmcATo5apThkx08FlvnEZ6NU'
        }
      };
      
      fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}
getPopularMovies()

function getPopularSeries() {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjYyNDZiYjdlYzVmYmIxYTgwZDBlNTM4YmZlZTEwYSIsInN1YiI6IjY1MDVhMGYwZmEyN2Y0MDEwYzQ5ZDg4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.thKokVSgsNkuUE5lHe4mmcATo5apThkx08FlvnEZ6NU'
        }
      };
      
      fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}
getPopularSeries()