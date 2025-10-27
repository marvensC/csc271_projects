//Marvens Sainterlien
//10/26/2025
//This script adds an interactive recommendations feature to the homepage of website.


// Data: genres mapped to media items with IMDb ratings
//these are just what i currently have will add more
const media = {
  Action: [
    { title: "Inception", rating: 8.8, img: "images/inception_poster.webp" },
    { title: "Superman", rating: 7.3, img: "images/superman_poster.webp" }
  ],
  Drama: [
    { title: "Breaking Bad", rating: 9.5, img: "images/breaking_bad_poster.webp" },
    { title: "The Day of the Jackal", rating: 7.7, img: "images/the_day_of_the_jackal_poster.webp" },
    { title: "The Mentalist", rating: 8.1, img: "images/the_mentalist_poster.webp" }
  ],
  Comedy: [
    { title: "The Office", rating: 8.9, img: "images/the_office_poster.webp" }
  ],
  Fantasy: [
    { title: "Game of Thrones", rating: 9.2, img: "images/game_of_thrones_poster.webp" },
    { title: "Lucifer", rating: 8.1, img: "images/lucifer_poster.webp" },
    { title: "One Piece", rating: 8.7, img: "images/one_piece_poster.webp" }
  ]
};


const genreDropdown = document.getElementById('genre-select'); 
const recommendBtn = document.querySelector('#recommend-btn'); 
const recommendationsSection = document.getElementsByClassName('recommendations')[0]; 
const allParagraphs = document.getElementsByTagName('p'); 

if (genreDropdown && recommendBtn && recommendationsSection) {
  recommendBtn.addEventListener('click', function() {
    // Get selected genre 
    const selectedGenre = genreDropdown.value;

    // Get media items for selected genre
    const items = media[selectedGenre] || [];

    // Sort items by rating 
    const sortedItems = items.slice().sort((a, b) => b.rating - a.rating);

    // Get top recommendations 
    const recommendations = sortedItems.slice(0, 5);


// Build HTML for recommendations as cards
let html = "<h3>Top Recommendations:</h3><div class='media-grid'>";
recommendations.forEach(item => {
  html += `
    <article class="media-card">
      <img src="${item.img}" alt="${item.title} poster">
      <h3>${item.title}</h3>
      <div class="media-info">
        <span>IMDb rating: ${item.rating}</span>
        <div class="media-tags">
          <span>${selectedGenre}</span>
        </div>
      </div>
      <div class="media-actions">
        <button type="button" class="action-btns" title="Add to Library">📗</button>
        <button type="button" class="action-btns" title="Add to Watchlist">📋</button>
        <button type="button" class="action-btns" title="Mark as Complete">✔️</button>
        <button type="button" class="action-btns" aria-pressed="false" title="Add to Favorites">⭐</button>
      </div>
    </article>
  `;
});
html += "</div>";

    // Update recommendations section using innerHTML
    recommendationsSection.innerHTML = html;

    // Also update the paragraph using textContent
    if (allParagraphs.length > 0) {
      allParagraphs[1].textContent = `Showing top ${recommendations.length} recommendations for ${selectedGenre}.`;
    }
  });
}



