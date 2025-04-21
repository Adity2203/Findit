let indianUniversities = [];

const searchInput = document.getElementById('universityInput');
const suggestionsList = document.getElementById('autocompleteList');
const authButtons = document.getElementById('authButtons');

// Load university names from JSON file
fetch('universities.json')
  .then(response => response.json())
  .then(data => {
    indianUniversities = data;
  })
  .catch(error => {
    console.error('Error loading universities:', error);
  });

// Filter university names
function searchUniversities(query) {
  return indianUniversities.filter(univ =>
    univ.toLowerCase().includes(query.toLowerCase())
  );
}

// Display autocomplete suggestions
function showSuggestions(query) {
  suggestionsList.innerHTML = '';

  if (query.length < 2) {
    suggestionsList.style.display = 'none';
    return;
  }

  const results = searchUniversities(query);
  if (results.length === 0) {
    suggestionsList.innerHTML = '<div class="no-results">No universities found</div>';
    suggestionsList.style.display = 'block';
    return;
  }

  results.slice(0, 10).forEach(univ => {
    const item = document.createElement('div');
    item.textContent = univ;
    item.addEventListener('click', () => {
      searchInput.value = univ;
      suggestionsList.style.display = 'none';
      authButtons.style.display = 'flex';
    });
    suggestionsList.appendChild(item);
  });

  suggestionsList.style.display = 'block';
}

// Input event
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  showSuggestions(query);
  authButtons.style.display = query ? 'flex' : 'none';
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-wrapper')) {
    suggestionsList.style.display = 'none';
  }
});

// Keyboard navigation
searchInput.addEventListener('keydown', (e) => {
  const items = suggestionsList.querySelectorAll('div');
  if (!items.length) return;

  let currentItem = document.querySelector('.autocomplete-active');

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (!currentItem) {
      items[0].classList.add('autocomplete-active');
    } else {
      currentItem.classList.remove('autocomplete-active');
      const next = currentItem.nextElementSibling || items[0];
      next.classList.add('autocomplete-active');
      next.scrollIntoView({ block: 'nearest' });
    }
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (currentItem) {
      currentItem.classList.remove('autocomplete-active');
      const prev = currentItem.previousElementSibling || items[items.length - 1];
      prev.classList.add('autocomplete-active');
      prev.scrollIntoView({ block: 'nearest' });
    }
  }

  if (e.key === 'Enter' && currentItem) {
    e.preventDefault();
    searchInput.value = currentItem.textContent;
    suggestionsList.style.display = 'none';
    authButtons.style.display = 'flex';
  }
});
