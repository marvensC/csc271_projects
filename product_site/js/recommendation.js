
//Marvens Sainterlien
//10/26/2025
//This script adds an interactive recommendations features to the homepage of website.

import { renderMediaCard } from './cards.js';
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


// Dynamically load movies and shows, build a genre map
let genreMedia = {};
let allMediaLoaded = false;

async function loadMediaData() {
  const [movies, shows] = await Promise.all([
    fetch('data/movies.json').then(res => res.json()),
    fetch('data/shows.json').then(res => res.json())
  ]);
  // Add type and img property for each
  movies.forEach(m => { m.type = 'movie'; m.img = m.poster; });
  shows.forEach(s => { s.type = 'show'; s.img = s.poster; });
  const all = [...movies, ...shows];
  // Build genre map
  const genreMap = {};
  all.forEach(item => {
    if (item.genres && Array.isArray(item.genres)) {
      item.genres.forEach(genre => {
        if (!genreMap[genre]) genreMap[genre] = [];
        genreMap[genre].push(item);
      });
    }
  });
  genreMedia = genreMap;
  allMediaLoaded = true;
}

// Start loading as soon as possible
loadMediaData();


const genreDropdown = document.getElementById('genre-select'); 
const recommendBtn = document.querySelector('#recommend-btn'); 
const recommendationsSection = document.getElementsByClassName('recommendations')[0]; 
const allParagraphs = document.getElementsByTagName('p'); 



if (genreDropdown && recommendBtn && recommendationsSection) {
  recommendBtn.addEventListener('click', async function() {
    try {
      // Wait for media to be loaded
      if (!allMediaLoaded) await loadMediaData();
      // Get selected genre 
      const selectedGenre = genreDropdown.value;
      // Get media items for selected genre
      const items = genreMedia[selectedGenre] || [];
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
  if (!genreMedia[genre]) return null;
  let items = genreMedia[genre];
  // Filter by type
  let filtered = [];
  if (type === "movie") {
    filtered = items.filter(item => item.type === "movie");
  } else if (type === "show") {
    filtered = items.filter(item => item.type === "show");
  } else {
    return null;
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