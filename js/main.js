//Generating slider on the page
let sliderHTML = "";
const slides = slider_items.forEach((item) => {

    let sliderHeight;

    if (window.innerWidth <= 906) {sliderHeight = 480;}
    else {sliderHeight = 640;}

    sliderHTML += `
        <div class="slideshow__slide">
            <img srcset="${item.img_800} 800w, ${item.img} 1200w" sizes="(max-width: 800px) 800px, 1200px"
            src="${item.img}" class="slideshow__slide__img fade" data-product-id="${item.id}" height="${sliderHeight}">
            <div class="slideshow__slide__abs">
                <div class="slideshow__slide__abs__box__cont">
                    <p class="slideshow__slide__abs__box__cont__title">${item.title}</p>
                    <p class="slideshow__slide__abs__box__cont__desc">${item.desc}</p>
                    <a href=${item.path}><button class="slideshow__slide__abs__box__cont__button">Explore</button></a>
                </div>
            </div>
        </div>
    `
});

let lowerButtonsHTML = "";
const lowerButtons = slider_items.forEach((item) => {
    lowerButtonsHTML += `
        <span class="slideshow__dots__cont__dot" data-product-id="${item.id}"></span>
    `
});

const sideButtonsHTML = `
    <a class="slideshow__button--prev">❮</a>
    <a class="slideshow__button--next">❯</a>

    <div class="slideshow__dots">
        <div class="slideshow__dots__cont"></div>
    </div>
`;

document.querySelector('.slideshow').innerHTML = sliderHTML + sideButtonsHTML;
document.querySelector('.slideshow__dots__cont').innerHTML = lowerButtonsHTML;


//Adding event listeners
document.querySelectorAll('.slideshow__dots__cont__dot')

    .forEach((button) => {
        button.addEventListener('pointerdown', () => {
            currentSlide(button.dataset.productId);
        });
});

//Code for side buttons
function plusSlides(n) {
    showSlides(slideIndex += n);
}
  
function currentSlide(n) {
    showSlides(slideIndex = n);
}

const prevSlide = document.querySelector('.slideshow__button--prev');
const nextSlide = document.querySelector('.slideshow__button--next');

prevSlide.addEventListener('pointerdown', () => {
    plusSlides(-1);
    prevSlide.classList.add('slideshow__button--active');
    setTimeout((function () {prevSlide.classList.remove('slideshow__button--active')}), 200)
});

nextSlide.addEventListener('pointerdown', () => {
    plusSlides(1);
    nextSlide.classList.add('slideshow__button--active');
    setTimeout((function () {nextSlide.classList.remove('slideshow__button--active')}), 200)
});

//Code for the slider
let slideIndex = 1;

showSlides(slideIndex);

function showSlides(n) {
  let slides = document.querySelectorAll(".slideshow__slide");
  let dots = document.querySelectorAll(".slideshow__dots__cont__dot");

  if (n > slides.length) {slideIndex = 1}    

  if (n < 1) {slideIndex = slides.length}

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active--button", "");
  }
  
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active--button";
}

//Setting and clearing intervals for the slider
let sliderInterval = function() {
    plusSlides(1);
}

let start;

document.querySelector('.slideshow').addEventListener('mouseenter', () => {clearInterval(start)});
document.querySelector('.slideshow').addEventListener('mouseleave', () => {start = setInterval(sliderInterval, 3000);});


//Adding pulsing animation
const imageBox = document.querySelectorAll('.slideshow__slide');

imageBox.forEach((box) => {
  box.classList.add('slider_blurred');

  const image = box.querySelector('img');
  image.classList.add('img_unloaded');

  image.addEventListener('load', () => {
    image.classList.remove('img_unloaded');
    box.classList.remove('slider_blurred');
  })
})

//Starting slider once the latest slide has been loaded
const mainSlider = document.querySelector('.slideshow');

const allSlides = mainSlider.querySelectorAll('img');

allSlides[allSlides.length - 1].addEventListener('load', () => {
    start = setInterval(sliderInterval, 3000);
})


//Generating categories on the page
showCategories();

function showCategories() {
    categoriesHTML = '';

    for (let i = 0; i < categories.length; i++) {

        categoriesHTML += `
            <div class="categories__box ${categories[i].id}">
                <a href="${categories[i].path}">
                    <img class="categories__box__img cat_img${[i]}" src=${categories[i].img} alt='${categories[i].title}' loading="lazy" width="575" height="260">
                    <div class="categories__box__title">
                        <h2 class="categories__box__title__h2">${categories[i].title}</h2>
                    </div>
                </a>
            </div>
        `;
    }
    document.querySelector('.categories').innerHTML = categoriesHTML;
}

//Adding pulsing animation
document.querySelectorAll('.categories__box').forEach((cont) => {
    cont.classList.add('cont_blurred');

    const image = cont.querySelector('img');

    image.classList.add('img_unloaded');

    image.addEventListener('load', () => {
        image.classList.remove('img_unloaded');
        cont.classList.remove('cont_blurred');
    })
})


//Adding event listeners to enlarge on mouseenter
let changeCategorySize = 'enlarge';
document.querySelectorAll('.categories__box')

    .forEach((category, index) => {
        category.addEventListener('mouseenter', () => {
            document.querySelector('.cat_img' + index).classList.add(changeCategorySize);

        category.addEventListener('mouseleave', () => {
            document.querySelector('.cat_img' + index).classList.remove(changeCategorySize);
        });
        
    });
});

//Generating products on the page

let productsHTML = '';
let indicesOfProducts = [];

products.forEach((product, index) => {

    productsHTML += showProducts (product, index, indicesOfProducts);
});
document.querySelector('.products').innerHTML = productsHTML;

//Adding pulsing image animation on load
addPulsingImageAnimation();

//Adding onmouse image animation
addOnMouseImageAnimation(indicesOfProducts);