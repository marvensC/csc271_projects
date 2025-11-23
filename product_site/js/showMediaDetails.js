// Shared modal for displaying show or movie details
// showMediaDetails({ title, year, seasons, genres, poster, trailer, rating, description })

export function showMediaDetails(media) {
    let modal = document.getElementById('media-details-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'media-details-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.7)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div class="media-details-content media-details-wide">
            <button id="close-media-details-modal" class="media-details-close">&times;</button>
            <div class="media-details-flex">
                <div class="media-details-poster">
                    <img src="${media.poster || 'images/placeholder.svg'}" alt="${media.title} poster">
                </div>
                <div class="media-details-info">
                    <h2>${media.title} ${media.year ? `<span class='media-details-year'>(${media.year})</span>` : ''}</h2>
                    <div class="media-details-meta" style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
                        ${media.seasons ? `<span><strong>Seasons:</strong> ${media.seasons}</span>` : ''}
                        <span><strong>Genres:</strong> ${media.genres ? media.genres.join(', ') : ''}</span>
                        <span><strong>Rating (IMDB):</strong> ${media.rating ?? ''}</span>
                        <div class="media-details-description">
                            <strong>Description:</strong><br>${media.description ?? ''}
                        </div>
                    </div>
                </div>
            </div>
            ${media.trailer ? `<div class='media-details-trailer'><iframe src='${media.trailer}' title='${media.title} Trailer' frameborder='0' allowfullscreen allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'></iframe></div>` : ''}
        </div>
    `;
    modal.style.display = 'flex';
    document.getElementById('close-media-details-modal').onclick = () => {
        modal.style.display = 'none';
    };
}
