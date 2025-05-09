'use strict';

const restaurantsContainer = document.getElementById('restaurants');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let restaurantsData = [];
function fetchRestaurants() {
  return new Promise((resolve) => {
    const data = [
      {
        id: 1,
        name: 'The Spice House',
        cuisine: 'Indian, North Indian',
        rating: 4.5,
        image: 'indian food.jpg',
      },
      {
        id: 2,
        name: 'Pasta Paradise',
        cuisine: 'Italian',
        rating: 4.7,
        image: 'pastapic.png',
      },
      {
        id: 3,
        name: 'Sushi World',
        cuisine: 'Japanese, Sushi',
        rating: 4.6,
        image: 'sushi.jpeg',
      },
      {
        id: 4,
        name: 'Burger Barn',
        cuisine: 'American, Burgers',
        rating: 4.2,
        image: 'burger.jpg',
      },
      {
        id: 5,
        name: 'Taco Town',
        cuisine: 'Mexican',
        rating: 4.3,
        image: 'taco.jpg',
      },
      {
        id: 6,
        name: 'Green Garden',
        cuisine: 'Vegetarian, Vegan',
        rating: 4.8,
        image: 'salad.jpeg',
      },
      {
        id: 7,
        name: 'Ocean’s Catch',
        cuisine: 'Seafood',
        rating: 4.4,
        image: 'seafood.jpeg',
      },
      {
        id: 8,
        name: 'Sweet Tooth',
        cuisine: 'Desserts, Bakery',
        rating: 4.9,
        image: 'dessert.jpeg',
      },
    ];
    setTimeout(() => resolve(data), 1000);
  });
}
function renderRestaurants(restaurants) {
  if (!restaurants.length) {
    restaurantsContainer.innerHTML = '<p class="no-results">No restaurants found matching your search.</p>';
    return;
  }

  restaurantsContainer.innerHTML = restaurants
    .map(
      (r) => `
    <article tabindex="0" class="restaurant-card" aria-label="${r.name}, ${r.cuisine}, Rating ${r.rating}">
        <img src="${r.image}" alt="${r.name} image" class="restaurant-img" loading="lazy" />
        <div class="restaurant-info">
            <h2 class="restaurant-name">${r.name}</h2>
            <p class="restaurant-cuisine">${r.cuisine}</p>
            <div class="restaurant-rating" aria-label="Rating ${r.rating}">${r.rating.toFixed(1)} ★</div>
        </div>
    </article>
  `
    )
    .join('');
}

// Handle search - filter restaurants by name or cuisine
function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderRestaurants(restaurantsData);
    return;
  }
  const filtered = restaurantsData.filter(
    (r) => r.name.toLowerCase().includes(query) || r.cuisine.toLowerCase().includes(query)
  );
  renderRestaurants(filtered);
}
async function init() {
  restaurantsContainer.innerHTML = '<p class="loading">Loading restaurants...</p>';
  try {
    restaurantsData = await fetchRestaurants();
    renderRestaurants(restaurantsData);
  } catch (error) {
    restaurantsContainer.innerHTML = '<p class="error">Failed to load restaurants. Please try again later.</p>';
    console.error('Error fetching restaurants:', error);
  }
}
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});
window.addEventListener('DOMContentLoaded', init);
