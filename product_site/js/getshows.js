//Marvens Sainterlien
//11/01/2025
// Dynamically load and render show cards from shows.json

document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.media-grid');
	if (!grid) return;

	fetch('data/shows.json')
		.then(res => {
			if (!res.ok) throw new Error('Failed to load shows.json');
			return res.json();
		})
		.then(shows => {
			grid.innerHTML = '';
			let i = 0;
			while (i < shows.length) {
				const show = shows[i];
				const card = document.createElement('article');
				card.className = 'media-card';
				card.setAttribute('data-show-id', show.id || '');

				// Poster
				const img = document.createElement('img');
				img.src = show.poster || 'images/placeholder.svg';
				img.alt = show.alt || `${show.title} TV show poster`;
				card.appendChild(img);

				// Title
				const h3 = document.createElement('h3');
				h3.textContent = show.title;
				card.appendChild(h3);

				// Info
				const info = document.createElement('div');
				info.className = 'media-info';
				info.innerHTML = `<span>${show.year || ''} • ${show.seasons || ''} Seasons</span>`;

				// Tags
				if (show.tags && show.tags.length) {
					const tagsDiv = document.createElement('div');
					tagsDiv.className = 'media-tags';
					let t = 0;
					while (t < show.tags.length) {
						const tagSpan = document.createElement('span');
						tagSpan.textContent = show.tags[t];
						tagsDiv.appendChild(tagSpan);
						t++;
					}
					info.appendChild(tagsDiv);
				}
				card.appendChild(info);

				// Trailer
				if (show.trailer) {
					const trailerDiv = document.createElement('div');
					trailerDiv.className = 'trailer';
					trailerDiv.innerHTML = `<iframe src="${show.trailer}" title="${show.title} Trailer" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`;
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

				grid.appendChild(card);
				i++;
			}

      const fallback = document.querySelector('.js-fallback');
      if (fallback) fallback.style.display = 'none';


		})
		.catch(err => {

			const fallback = document.querySelector('.js-fallback');
      if (fallback) fallback.style.display = 'block';

			console.error('Error loading shows:', err);
		});
});


