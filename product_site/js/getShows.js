//Marvens Sainterlien
//11/01/2025
// Dynamically load and render show cards from shows.json
import { Show } from './objectShows.js';
import { renderMediaCard } from './cards.js';
import { showMediaDetails } from './showMediaDetails.js';

Show.showMediaDetails = showMediaDetails;




// Fetch JSON from a URL (returns a value)
async function fetchJSON(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error('Failed to load ' + url);
	return await res.json();
}

// Render items to a container (two parameters)
function renderItems(items, container) {
	container.innerHTML = '';
	for (let i = 0; i < items.length; i++) {
		container.appendChild(createShowCard(items[i]));
	} 
} 

//shows the fallback message (no parameters, no return value)
function showFallbackMessage() {
	const fallback = document.querySelector('.js-fallback');
	if (fallback) fallback.style.display = 'block';
}

function createShowCard(show) {
	// Use shared renderMediaCard to create the card HTML
	const temp = document.createElement('div');
	temp.innerHTML = renderMediaCard(show);
	const card = temp.firstElementChild;
	card.setAttribute('data-show-id', show.id || '');
	card.addEventListener('click', function(e) {
		if (e.target.closest('.action-btns')) return;
		if (typeof show.showDetails === 'function') show.showDetails();
	});
	return card;
}

document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.media-grid');
	if (!grid) return;

	fetchJSON('data/shows.json')
		.then(shows => {
			if (Array.isArray(shows)) {
				// Convert each plain object to a Show instance
				const showObjects = shows.map(show => new Show(show));
				renderItems(showObjects, grid);
			}
			const fallback = document.querySelector('.js-fallback');
			if (fallback) fallback.style.display = 'none';
		})
		.catch(err => {
			showFallbackMessage();
			console.error('Error loading shows:', err);
		});
});