document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function (event) {
      if (!contactForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      contactForm.classList.add('was-validated');
    }, false);
  });
  
  // dark-mode toggle
  document.getElementById('dark-mode-toggle').addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});


// local storage user preference
const toggleSwitch = document.getElementById('dark-mode-toggle');

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
}

toggleSwitch.addEventListener('change', switchTheme);

// Check local storage for dark mode
const currentMode = localStorage.getItem('darkMode');
if (currentMode === 'enabled') {
    document.body.classList.add('dark-mode');
    toggleSwitch.checked = true;
} else {
    document.body.classList.remove('dark-mode');
}
