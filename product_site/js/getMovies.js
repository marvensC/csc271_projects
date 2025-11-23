
//Marvens Sainterlien
//11/01/2025
// Dynamically load and render movies cards from movies.json



import { renderMediaCard } from './cards.js';
import { Movie } from './objectMovies.js';
import { showMediaDetails } from './showMediaDetails.js';
Movie.showMediaDetails = showMediaDetails;

// Fetch JSON from a URL 
async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load ' + url);
    return await res.json();
}

//  Render items to a container 
function renderItems(items, container) {
    container.innerHTML = '';
    for (let i = 0; i < items.length; i++) {
        container.appendChild(createMovieCard(items[i]));
    }
}

//  shows the fallback message (no parameters, no return value)
function showFallbackMessage() {
    const fallback = document.querySelector('.js-fallback');
    if (fallback) fallback.style.display = 'block';
}

function createMovieCard(movie) {
    // Use shared renderMediaCard to create the card HTML
    const temp = document.createElement('div');
    temp.innerHTML = renderMediaCard(movie);
    const card = temp.firstElementChild;
    card.setAttribute('data-movie-id', movie.id || '');
    card.addEventListener('click', function(e) {
        if (e.target.closest('.action-btns')) return;
        if (typeof movie.showDetails === 'function') movie.showDetails();
    });
    return card;
}


document.addEventListener('DOMContentLoaded', () => {
    fetchJSON('data/movies.json')
        .then(movies => {
            const grid = document.querySelector('.media-grid');
            if (grid && Array.isArray(movies)) {
                const movieObjects = movies.map(movie => new Movie(movie));
                renderItems(movieObjects, grid);
            }
            const fallback = document.querySelector('.js-fallback');
            if (fallback) fallback.style.display = 'none';
        })
        .catch(err => {
            showFallbackMessage();
            console.error('Error loading movies:', err);
        });
});
