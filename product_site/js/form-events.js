document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('favoriteForm');
  const textarea = document.getElementById('movieTitles');
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
    feedback.textContent = 'Your response was successfully recorded!';
    feedback.style.color = 'green';
  });
});