//Marvens Sainterlien
//11/01/2025
// Dynamically load and render user lists (watchlist, favorites) 
import { renderMediaCard } from './cards.js';


//  Fetch JSON from a URL 
async function fetchJSON(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error('Failed to load ' + url);
	return await res.json();
}

//  Render items to a container 
function renderItems(items, container) {
	container.innerHTML = '';
	for (let i = 0; i < items.length; i++) {
		container.appendChild(createCard(items[i]));
	}
}

//shows both fallback messages (no parameters, no return value)
function showFallbackMessages() {
	const watchlistGrid = document.querySelector('section.media-section:nth-of-type(1) .media-grid');
	const watchlistFallback = watchlistGrid ? watchlistGrid.querySelector('.js-fallback') : null;
	if (watchlistFallback) watchlistFallback.style.display = 'block';
	const favoritesGrid = document.querySelector('section.media-section:nth-of-type(2) .media-grid');
	const favoritesFallback = favoritesGrid ? favoritesGrid.querySelector('.js-fallback') : null;
	if (favoritesFallback) favoritesFallback.style.display = 'block';
}

// Fetch both shows and movies, then filter for watchlist/favorites
async function fetchAllMedia() {
	const [shows, movies] = await Promise.all([
		fetchJSON('data/shows.json'),
		fetchJSON('data/movies.json')
	]);
	return [...shows, ...movies];
}

document.addEventListener('DOMContentLoaded', () => {
       fetchJSON('data/lists.json')
	       .then(lists => {
		       // Watchlist
		       const watchlist = lists.watchlist || [];
		       const watchlistGrid = document.querySelector('section.media-section:nth-of-type(1) .media-grid');
		       const watchlistFallback = watchlistGrid ? watchlistGrid.querySelector('.js-fallback') : null;
		       if (watchlistGrid) {
			       renderItems(watchlist, watchlistGrid);
			       if (watchlistFallback) watchlistFallback.style.display = watchlist.length ? 'none' : 'block';
		       }
		       // Favorites
		       const favorites = lists.favorites || [];
		       const favoritesGrid = document.querySelector('section.media-section:nth-of-type(2) .media-grid');
		       const favoritesFallback = favoritesGrid ? favoritesGrid.querySelector('.js-fallback') : null;
		       if (favoritesGrid) {
			       renderItems(favorites, favoritesGrid);
			       if (favoritesFallback) favoritesFallback.style.display = favorites.length ? 'none' : 'block';
		       }
	       })
	       .catch(err => {
		       showFallbackMessages();
		       console.error('Error loading lists:', err);
	       });
});


function createCard(item) {
	// Use shared renderMediaCard to create the card HTML
	const temp = document.createElement('div');
	temp.innerHTML = renderMediaCard(item);
	const card = temp.firstElementChild;
	card.setAttribute('data-id', item.id || '');
	return card;
}
