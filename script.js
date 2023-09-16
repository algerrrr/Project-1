// script.js
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjYyNDZiYjdlYzVmYmIxYTgwZDBlNTM4YmZlZTEwYSIsInN1YiI6IjY1MDVhMGYwZmEyN2Y0MDEwYzQ5ZDg4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.thKokVSgsNkuUE5lHe4mmcATo5apThkx08FlvnEZ6NU'
    }
  };

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    const query = document.getElementById('search-input').value;

    // Call a function to fetch and display movie search results from the TMDb API
    searchMovies(query);
});

async function searchMovies(query) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
    const data = await response.json();
    showElement(data.results)

}
function showElement(results) {
    const main = document.getElementById('movie-results');
    const div = document.createElement('div');
    div.classList.add('content')
    results.forEach(({ title, poster_path }) => {
        const apiKey = '726246bb7ec5fbb1a80d0e538bfee10a'
        const li = document.createElement('li');
        
        li.classList.add('movie');
        const link = document.createElement('a');
        link.href = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${title}`;

        
        const image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/w185/${poster_path}`;
        
        // Create a text node for the movie title
        const titleText = document.createElement('p');
        titleText.innerText = title
        link.append(image);
        link.append(titleText);
        li.append(link);
        div.append(li);
    });

    // Append the unordered list to the main element
    main.append(div);
}

async function renderPoster() {


}

// async function searchMovies(query) {
//     fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
//         .then(response => response.json())
//         .then(({results})=>{
            
//             const main = document.getElementById('movie-results')
//             const ul = document.createElement('ul')

//             results.forEach(({title, poster_path})=>{
//                 const apiKey = '726246bb7ec5fbb1a80d0e538bfee10a'
//                 const li = document.createElement('li')
//                 const link = document.createElement('a')
//                 const image = document.createElement('img')
//                 image.href = `https://image.tmdb.org/t/p/w185/${poster_path}`
//                 link.href = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${title}`;
//                 link.innerText = title
                
//                 li.append(link)
//                 ul.append(li)

//             })
//             main.append(ul)

//         })

//         .catch(err => console.error(err));
// }
// async function searchMovies(query) {
//     // Use your TMDb API key here
//     const apiKey = '726246bb7ec5fbb1a80d0e538bfee10a';
//     const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         const movieResults = document.getElementById('movie-results');
//         movieResults.innerHTML = '';

//         if (data.results && data.results.length > 0) {
//             data.results.forEach(movie => {
//                 const movieElement = document.createElement('div');
                
//                 movieElement.classList.add('movie');
//                 movieElement.innerHTML = `
                    
//                     <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" alt="${movie.title} Poster">
//                     <h2>${movie.title}</h2>
//                     <p>Release Date: ${movie.release_date}</p>
                    
//                 `;
//                 movieResults.append(movieElement);
//             });
//         } else {
//             movieResults.innerHTML = 'No results found.';
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }
//document.getElementById('popular-movies').addEventListener('click', getPopularMovies);


function getPopularMovies() {      
      fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        .then(response => response.json())
        .then(({results})=>{
            const main = document.getElementById('movie-results')
            const ul = document.createElement('ul')

            results.forEach(({title})=>{
                const li = document.createElement('li')

                li.innerText = title
                ul.append(li)

            })
            main.append(ul)

        })
        
        .catch(err => console.error(err));
        
}

//document.getElementById('popular-series').addEventListener('click', getPopularSeries);
function getPopularSeries() {
    
      
      fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}



