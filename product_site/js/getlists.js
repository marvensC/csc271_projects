
//Marvens Sainterlien
//11/01/2025
// Dynamically load and render user lists (watchlist, favorites) from lists.json


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

document.addEventListener('DOMContentLoaded', () => {
	fetchJSON('data/lists.json')
		.then(lists => {
			// Watchlist
			const watchlistGrid = document.querySelector('section.media-section:nth-of-type(1) .media-grid');
			const watchlistFallback = watchlistGrid ? watchlistGrid.querySelector('.js-fallback') : null;
			if (watchlistGrid && lists.watchlist) {
				renderItems(lists.watchlist, watchlistGrid);
				if (watchlistFallback) watchlistFallback.style.display = 'none';
			}
			// Favorites
			const favoritesGrid = document.querySelector('section.media-section:nth-of-type(2) .media-grid');
			const favoritesFallback = favoritesGrid ? favoritesGrid.querySelector('.js-fallback') : null;
			if (favoritesGrid && lists.favorites) {
				renderItems(lists.favorites, favoritesGrid);
				if (favoritesFallback) favoritesFallback.style.display = 'none';
			}
		})
		.catch(err => {
			showFallbackMessages();
			console.error('Error loading lists:', err);
		});
});

function createCard(item) {
	const card = document.createElement('article');
	card.className = 'media-card';
	card.setAttribute('data-id', item.id || '');

	// Poster
	const img = document.createElement('img');
	img.src = item.poster || 'images/placeholder.svg';
	img.alt = item.alt || `${item.title} poster`;
	card.appendChild(img);

	// Title
	const h3 = document.createElement('h3');
	h3.textContent = item.title;
	card.appendChild(h3);

	// Info
	const info = document.createElement('div');
	info.className = 'media-info';
	let infoText = '';
	if (item.year) infoText += item.year;
	if (item.seasons) infoText += ` • ${item.seasons} Seasons`;
	info.innerHTML = `<span>${infoText}</span>`;

	// Tags
	if (item.tags && item.tags.length) {
		const tagsDiv = document.createElement('div');
		tagsDiv.className = 'media-tags';
		item.tags.forEach(tag => {
			const tagSpan = document.createElement('span');
			tagSpan.textContent = tag;
			tagsDiv.appendChild(tagSpan);
		});
		info.appendChild(tagsDiv);
	}
	card.appendChild(info);

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
