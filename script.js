// Get references to the form, input, and movie results container
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieResults = document.getElementById('movie-results');

// Add a submit event listener to the form
searchForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the user's search query from the input field
    const query = searchInput.value;

    // Clear previous search results
    movieResults.innerHTML = '';

    // Perform the movie search using the TMDb API
    const results = await searchMovies(query);

    // Display the search results
    if (results && results.length > 0) {
        results.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <h2>${movie.title}</h2>
                <p>Release Date: ${movie.release_date}</p>
                <p>Overview: ${movie.overview}</p>
            `;
            movieResults.appendChild(movieElement);
        });
    } else {
        movieResults.innerHTML = 'No results found.';
    }
});
