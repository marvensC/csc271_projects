//Marvens Sainterlien
//11/01/2025
// Dynamically load and render movies cards from movies.json


fetch('data/movies.json')
  .then(response => response.json())
  .then(movies => {
    const grid = document.querySelector('.media-grid');
    grid.innerHTML = ''; // Clear any static content

    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      const card = document.createElement('article');
      card.className = 'media-card';
      card.setAttribute('data-movie-id', movie.id);

      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title} movie poster">
        <h3>${movie.title}</h3>
        <div class="media-info">
          <span>${movie.year}${movie.seasons ? ' • ' + movie.seasons + ' Seasons' : ''}</span>
          <div class="media-tags">
            ${movie.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
        </div>
        ${movie.trailer ? `
        <div class="trailer">
          <iframe src="${movie.trailer}" title="${movie.title} Trailer" allowfullscreen></iframe>
        </div>` : ''}
        <div class="media-actions">
          <button type="button" class="action-btns" title="Add to Library">📗</button>
          <button type="button" class="action-btns" title="Add to Watchlist">📋</button>
          <button type="button" class="action-btns" title="Mark as Complete">✔️</button>
          <button type="button" class="action-btns" aria-pressed="false" title="Add to Favorites">⭐</button>
        </div>
      `;
      grid.appendChild(card);
    }

    
    const fallback = document.querySelector('.js-fallback');
    if (fallback) fallback.style.display = 'none';
    
    
    
  }).catch(err => {

    const fallback = document.querySelector('.js-fallback');
    if (fallback) fallback.style.display = 'block';
    
    console.error('Error loading movies:', err);
    
  });


  
