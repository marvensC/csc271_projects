
//Marvens Sainterlien
//11/01/2025
// Dynamically load and render movies cards from movies.json

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
    const card = document.createElement('article');
    card.className = 'media-card';
    card.setAttribute('data-movie-id', movie.id || '');

    // Poster
    const img = document.createElement('img');
    img.src = movie.poster || 'images/placeholder.svg';
    img.alt = movie.alt || `${movie.title} movie poster`;
    card.appendChild(img);

    // Title
    const h3 = document.createElement('h3');
    h3.textContent = movie.title;
    card.appendChild(h3);

    // Info
    const info = document.createElement('div');
    info.className = 'media-info';
    info.innerHTML = `<span>${movie.year || ''}${movie.seasons ? ' • ' + movie.seasons + ' Seasons' : ''}</span>`;

    // Tags
    if (movie.tags && movie.tags.length) {
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'media-tags';
        for (let t = 0; t < movie.tags.length; t++) {
            const tagSpan = document.createElement('span');
            tagSpan.textContent = movie.tags[t];
            tagsDiv.appendChild(tagSpan);
        }
        info.appendChild(tagsDiv);
    }
    card.appendChild(info);

    // Trailer
    if (movie.trailer) {
        const trailerDiv = document.createElement('div');
        trailerDiv.className = 'trailer';
        trailerDiv.innerHTML = `<iframe src="${movie.trailer}" title="${movie.title} Trailer" allowfullscreen></iframe>`;
        card.appendChild(trailerDiv);
    }

    // Actions
    const actions = document.createElement('div');
    actions.className = 'media-actions';
    actions.innerHTML = `
        <button type="button" class="action-btns" title="Add to Library">📗</button>
        <button type="button" class="action-btns" title="Add to Watchlist">📋</button>
        <button type="button" class="action-btns" title="Mark as Complete">✔️</button>
        <button type="button" class="action-btns" aria-pressed="false" title="Add to Favorites">⭐</button>
    `;
    card.appendChild(actions);

    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchJSON('data/movies.json')
        .then(movies => {
            const grid = document.querySelector('.media-grid');
            if (grid && Array.isArray(movies)) {
                renderItems(movies, grid);
            }
            const fallback = document.querySelector('.js-fallback');
            if (fallback) fallback.style.display = 'none';
        })
        .catch(err => {
            showFallbackMessage();
            console.error('Error loading movies:', err);
        });
});