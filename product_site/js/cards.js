// utils.js - Shared utilities for product_site
// Marvens Sainterlien
// Contains shared card rendering and utility functions

export function renderMediaCard(item) {
  // Info section
  let infoHtml = `<span>${item.year || ''}${item.seasons ? ' • ' + item.seasons + ' Seasons' : ''}</span>`;
  // Genres
  if (item.genres && item.genres.length) {
    infoHtml += '<div class="media-genres">' +
      item.genres.map(g => `<span>${g}</span>`).join('') +
      '</div>';
  }
  return `
    <article class="media-card">
      <img src="${item.poster || item.img || 'images/placeholder.svg'}" alt="${item.alt || item.title + ' movie poster'}">
      <h3>${item.title}</h3>
      <div class="media-info">${infoHtml}</div>
      
        
     <!--
      // <div class="media-actions">
      //   <button type="button" class="action-btns" title="Add to Library">📗</button>
      //   <button type="button" class="action-btns" title="Add to Watchlist">📋</button>
      //   <button type="button" class="action-btns" title="Mark as Complete">✔️</button>
      //   <button type="button" class="action-btns" aria-pressed="false" title="Add to Favorites">⭐</button>
      // </div>
       -->
    </article>
  `;
}


