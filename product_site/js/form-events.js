document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('favoriteForm');
  const textarea = document.getElementById('movieTitles');
  const nameInput = document.getElementById('userName');
  let feedback = document.createElement('div');
  feedback.id = 'form-feedback';
  textarea.parentNode.insertBefore(feedback, textarea.nextSibling);

  textarea.addEventListener('focus', function() {
    feedback.textContent = 'Please enter at least 3 characters. Max 200.';
    feedback.style.color = 'blue';
  });

  textarea.addEventListener('blur', function() {
    if (textarea.value.trim().length < 3) {
      feedback.textContent = 'Error: Must be at least 3 characters.';
      feedback.style.color = 'red';
    } else {
      feedback.textContent = '';
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Get name
    const name = nameInput.value.trim();
    // Get favorite movies/shows
    const favorites = textarea.value.trim();

    // Validation
    if (name.length === 0) {
      feedback.textContent = 'Error: Name is required.';
      feedback.style.color = 'red';
      return;
    }
    if (favorites.length < 3) {
      feedback.textContent = 'Error: Must be at least 3 characters.';
      feedback.style.color = 'red';
      return;
    }

    // Get selected genres
    const genres = Array.from(form.querySelectorAll('input[name="genre"]:checked')).map(cb => cb.value).join(', ');

    // Add to table
    const table = document.getElementById('responsesTable');
    if (table) {
      const row = table.insertRow(-1);
      const nameCell = row.insertCell(0);
      const genreCell = row.insertCell(1);
      const favCell = row.insertCell(2);
      nameCell.textContent = name;
      genreCell.textContent = genres || 'None';
      favCell.textContent = favorites;
      feedback.textContent = 'Your response was successfully recorded!';
      feedback.style.color = 'green';
    }
  });
});