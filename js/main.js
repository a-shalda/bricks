let productsHTML = '';

products.forEach((product) => {
const priceM2 = ((product.priceCentsM2 / 100).toFixed(2));
const pricePc = ((product.priceCentsM2 / 100) / Number(product.piecesPerM2)).toFixed(2);
const indexOfDotM2 = ((product.priceCentsM2 / 100).toFixed(2)).toString().indexOf('.');
const indexofDotPc = ((product.priceCentsM2 / 100) / Number(product.piecesPerM2)).toFixed(2).toString().indexOf('.');
  
productsHTML +=`
<div class="product">
    <div class="product__top">
        <img class="product__top__img" src="${product.image}" alt="${product.name}" width="264" height="195" loading="lazy">
        <div class="product__top__stock">
            <i class="fa-solid fa-check stock"></i>
            <p class="product__top__stock__desc">${product.availability}</p>
        </div>
    </div>
    <div class="product__middle">
        <div class="product__middle__price--m2">
            <p class="product__middle__price--m2__p">${priceM2.slice(0, indexOfDotM2)}<span class="price-small">${priceM2.slice(indexOfDotM2)} €/m2</span></p>
        </div>
        <div class="product__middle__price--st">
            <p class="product__middle__price--st__p">${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)} €/pc</span></p>
        </div>
    </div>
    <div class="product__bottom">
        <p class="product__bottom__title">${product.name} <span class="format-nowrap">${product.format} mm</span></p>
        <div class="product__bottom__desc">
            <p class="product__bottom__desc__p">Manufacturer: ${product.manufacturer}</p>
            <p class="product__bottom__desc__p">Country: ${product.country}</p>
            <p class="product__bottom__desc__p">Format (mm): ${product.format}</p>
        </div>
    </div>
</div>
`
});
document.querySelector('.products').innerHTML = productsHTML;



const navToggle = document.querySelector('.header__upper__left__hamburger__nav-toggle');
const nav = document.querySelector('.header__lower--background');

navToggle.addEventListener('click', () => {
    nav.classList.toggle('header__lower--background--visible');
})

const bodyToggle = document.querySelector('.header__upper__left__hamburger__nav-toggle');
const body = document.querySelector('.body');

bodyToggle.addEventListener('click', () => {
    body.classList.toggle('body-stop');
})


//Slider-js

let slideIndex = 1;
showSlides(slideIndex);

function showSlides(n) {
  let slides = document.querySelectorAll(".slideshow__slide");
  let dots = document.querySelectorAll(".dot");

  if (n > slides.length) {slideIndex = 1}    

  if (n < 1) {slideIndex = slides.length}

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
function currentSlide(n) {
    showSlides(slideIndex = n);
  }