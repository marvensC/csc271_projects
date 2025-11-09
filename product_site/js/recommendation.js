
//Marvens Sainterlien
//10/26/2025
//This script adds an interactive recommendations features to the homepage of website.

//  Suggests items based on user preferences
function getRecommendations(userPrefs, items) {
  return items.filter(item =>
    (!userPrefs.type || item.type === userPrefs.type) &&
    (!userPrefs.minRating || item.rating >= userPrefs.minRating)
  );
}

// Sorts items by a specified property (e.g., title, rating)
function sortItems(items, key) {
  return items.slice().sort((a, b) => {
    if (typeof a[key] === 'string') {
      return a[key].localeCompare(b[key]);
    }
    return b[key] - a[key];
  });
}

// Data: genres mapped to media items with IMDb ratings
//these are just what i currently have will add more
const media = {
  Action: [
    { title: "Inception", rating: 8.8, img: "images/inception_poster.webp", type:"movie"},
    { title: "Superman", rating: 7.3, img: "images/superman_poster.webp", type:"movie"},
    { title: "Breaking Bad", rating: 9.5, img: "images/breaking_bad_poster.webp", type:"show" }
  ],
  Drama: [
    { title: "Breaking Bad", rating: 9.5, img: "images/breaking_bad_poster.webp", type: "show" },
    { title: "The Day of the Jackal", rating: 7.7, img: "images/the_day_of_the_jackal_poster.webp", type:"show" },
    { title: "The Mentalist", rating: 8.1, img: "images/the_mentalist_poster.webp", type:"show" } 
  ],
  Comedy: [
    { title: "The Office", rating: 8.9, img: "images/the_office_poster.webp" , type:"show"}
  ],
  Fantasy: [
    { title: "Game of Thrones", rating: 9.2, img: "images/game_of_thrones_poster.webp",  type:"show" },
    { title: "Lucifer", rating: 8.1, img: "images/lucifer_poster.webp",  type:"show" },
    { title: "One Piece", rating: 8.7, img: "images/one_piece_poster.webp",  type:"show" }
  ]
};


const genreDropdown = document.getElementById('genre-select'); 
const recommendBtn = document.querySelector('#recommend-btn'); 
const recommendationsSection = document.getElementsByClassName('recommendations')[0]; 
const allParagraphs = document.getElementsByTagName('p'); 

// Shared card rendering function
function renderMediaCard(item, genre) {
  return `
    <article class="media-card">
      <img src="${item.img}" alt="${item.title} poster">
      <h3>${item.title}</h3>
      <div class="media-info">
        <span>IMDb rating: ${item.rating}</span>
        <div class="media-tags">
          <span>${genre}</span>
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
}

if (genreDropdown && recommendBtn && recommendationsSection) {
  recommendBtn.addEventListener('click', function() {
    try {
      // Get selected genre 
      const selectedGenre = genreDropdown.value;

      // Get media items for selected genre
      const items = media[selectedGenre] || [];

      const userPrefs = {
        type: '', 
        minRating: 0 
      };

      // Use getRecommendations to filter items
      const filteredItems = getRecommendations(userPrefs, items);

      // Use sortItems to sort by rating
      const sortedItems = sortItems(filteredItems, 'rating');

      // Get top recommendations 
      const recommendations = sortedItems.slice(0, 5);

      // Build HTML for recommendations as cards
      let html = "<h3>Top Recommendations:</h3><div class='media-grid'>";
      recommendations.forEach(item => {
        html += renderMediaCard(item, selectedGenre);
      });
      html += "</div>";

      // Update recommendations section using innerHTML
      recommendationsSection.innerHTML = html;

      
      const fallback = recommendationsSection.querySelector('.js-fallback');
      if (fallback) fallback.style.display = 'none';
    } catch (err) {
      
      const fallback = recommendationsSection.querySelector('.js-fallback');
      if (fallback) fallback.style.display = 'block';
      console.error('Error loading recommendations:', err);
    }
  });
}

// --- Decision Tree Logic ---
function getDecisionTreeRecommendation(genre, ratingRange, type) {
  let items = [];
  if (genre === "Action") {
    items = media.Action;
  } else if (genre === "Drama") {
    items = media.Drama;
  } else if (genre === "Comedy") {
    items = media.Comedy;
  } else if (genre === "Fantasy") {
    items = media.Fantasy;
  } else {
    return "No recommendation found. Coming Soon";
  }

  // Filter by type
  let filtered = [];
  if (type === "movie") {
    filtered = items.filter(item => item.type === "movie");
  } else if (type === "show") {
    filtered = items.filter(item => item.type === "show");
  } else {
    return "No recommendation found.";
  }

  // Filter by rating range
  if (ratingRange.trim().toLowerCase() === "high") {
    filtered = filtered.filter(item => item.rating >= 8.5);
  } else if (ratingRange.trim().toLowerCase() === "low") {
    filtered = filtered.filter(item => item.rating < 8.5);
  }
  

  
  filtered = sortItems(filtered, 'rating');

  if (filtered.length > 0) {
    return filtered[0]; // Return the whole item object
  }
  return null;
}

const genreDecision = document.getElementById('genre-decision');
const ratingDecision = document.getElementById('rating-decision');
const typeDecision = document.getElementById('type-decision');
const decisionResult = document.getElementById('smart-recommendations');

if (genreDecision && ratingDecision && typeDecision && decisionResult) {
  document.getElementById('decision-btn').addEventListener('click', function() {
    // Get user choices
    const genre = genreDecision.value;
    const ratingRange = ratingDecision.value;
    const type = typeDecision.value;

    // Use decision tree function
    const recommendedItem = getDecisionTreeRecommendation(genre, ratingRange, type);
    if (recommendedItem) {
      decisionResult.innerHTML = `<h3>Smart Recommendation:</h3><div class='media-grid'>${renderMediaCard(recommendedItem, genre)}</div>`;
    } else {
      decisionResult.innerHTML = `<p>No recommendation found. Coming Soon!</p>`;
    }
   
  });
}