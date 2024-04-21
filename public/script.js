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
  


