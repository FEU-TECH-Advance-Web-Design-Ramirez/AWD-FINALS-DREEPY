window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {  // Trigger after 50px scroll
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});