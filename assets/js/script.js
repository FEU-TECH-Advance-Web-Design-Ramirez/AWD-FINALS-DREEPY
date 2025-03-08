window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {  // Trigger after 50px scroll
      header.classList.add('scrolled');
  } else {
      header.classList.remove('scrolled');
  }
});

const hamburgerButton = document.getElementById('hamburger_icon');
const navLinks = document.getElementById('navlinks');
const icon = hamburgerButton.querySelector('i');
// Getting the <i> inside the button

hamburgerButton.addEventListener('click', () => {
  navLinks.classList.toggle('show');

  if (navLinks.classList.contains('show')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');        
  } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
  }
});

