        const apiKey = 'fbc7e05c4f51710524e695b9b608b202';
        let allMovies = [];

        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('search').addEventListener('input', (event) => {
                const query = event.target.value;
                if (query.length > 2) {
                    searchMovies(query);
                } else {
                    document.getElementById('results').innerHTML='';
                }
            });
        });
        

        document.getElementById('results').innerHTML = '';

        async function searchMovies(query) {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
                const data = await response.json();
                allMovies = data.results;
                displayMovies(allMovies);
            } catch (error) {
                console.error('Error searching for movies:', error);
            }
        }

        function displayMovies(movies) {
            const results = document.getElementById('results');
            results.innerHTML = '';
            movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.className = 'movie';
                movieElement.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <p>${movie.title}</p>
                `;
                movieElement.addEventListener('click', () => showMovieDetails(movie.id));
                results.appendChild(movieElement);
            });
        }

        async function showMovieDetails(movieId) {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
                const movie = await response.json();
                displayMovieDetails(movie);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        }

        function displayMovieDetails(movie) {
            const details = document.getElementById('movie-details');
            const stars = Math.round(movie.vote_average);
            const starIcons = '⭐'.repeat(stars);
            const blurbackground = document.getElementById('blurbackground');
            details.innerHTML = ` 
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                <p><b>Release Date:</b> ${movie.release_date}</p>
                <p><b>Rating:</b> ${(movie.vote_average).toFixed(1)} ${starIcons}</p>
                <p>${movie.overview}</p>
                <p>${movie.id}</p>

            `;
            details.style.display = 'block';
            blurbackground.style.display='block';
            document.querySelector('.close-button').style.display = 'block';

        }

        function closeMovieDetails() {
            const details = document.getElementById('movie-details');
            details.style.display = 'none';
            blurbackground.style.display='none';
            document.querySelector('.close-button').style.display = 'none';

        }
        //TOP 10 MOVIES ID, FIFTH ELEMENT 18, PULP FICTION 680, SHUTTER ISLAND 11324