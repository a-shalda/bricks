const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.header-lower--background');


navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav--visible');
})