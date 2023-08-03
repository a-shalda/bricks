//SLIDER
//Generating slider on the page

let sliderHTML = "";
const slides = slider_items.forEach((item) => {

sliderHTML += `
    <div class="slideshow__slide">
        <img src="${item.img}" class="slideshow__slide__img fade" loading="lazy" data-product-id="${item.id}">
        <div class="slideshow__slide__abs">
            <div class="slideshow__slide__abs__box__cont">
                <p class="slideshow__slide__abs__box__cont__title">${item.title}</p>
                <p class="slideshow__slide__abs__box__cont__desc">${item.desc}</p>
                <button class="slideshow__slide__abs__box__cont__button">Explore</button>
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
        button.addEventListener('click', () => {
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

document.querySelector('.slideshow__button--prev').addEventListener('click', () => {plusSlides(-1);});
document.querySelector('.slideshow__button--next').addEventListener('click', () => {plusSlides(1);});

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
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

//Setting and clearing intervals for the slider

let sliderInterval = function() {
    plusSlides(1);
}

let start = setInterval(sliderInterval, 3000);
document.querySelector('.slideshow').addEventListener('mouseenter', () => {clearInterval(start)});
document.querySelector('.slideshow').addEventListener('mouseleave', () => {start = setInterval(sliderInterval, 3000);});


//HAMBURGER MENU

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


//CATEGORIES
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


//PRODUCTS
//Generating products on the page

let productsHTML = '';

products.forEach((product, index) => {

    let priceCentsM2 = product.priceCentsM2;
    let priceCentsPc = product.priceCentsPc;
    let supplierPriceType = product.supplierPriceType;
    const piecesInSquareMeter = Number(product.specs?.piecesInSquareMeterCm / 100);
    const piecesInLinearMeter = Number(product.specs?.piecesInLinearMeterCm / 100);
    const isM2 = product.isM2;
    const isLinearMeter = product.isLinearMeter;

    if (isM2 === true && supplierPriceType === 'm2' && supplierPriceType !== 'pc') {

        const priceM2 = ((priceCentsM2 / 100).toFixed(2));
        const pricePc = (Math.ceil((priceCentsM2 / piecesInSquareMeter).toFixed(4)) / 100).toFixed(2);
        const indexOfDotM2 = priceM2.toString().indexOf('.');
        const indexofDotPc = pricePc.toString().indexOf('.');

        let priceM2HTML = `<sup>$</sup>${priceM2.slice(0, indexOfDotM2)}<span class="price-small">${priceM2.slice(indexOfDotM2)}</span> <span class="price-desc">m<sup>2</sup></span>`;
        let pricePcHTML = `<sup>$</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span>`;

        productsHTML +=`
            <div class="product">
                <div class="product__top">
        
                    <a href="${product.filepath}">
                        <div class="product__top__cont">
                            <img class="product__top__cont__img product_img_${index}" src="${product.image}" alt="${product.name}" width="264" height="195" loading="lazy">
                            <img class="product__top__cont__img product_img_second_${index}" src="${product.image_1}" alt="${product.name}" width="264" height="195">
                        </div>
                    </a>
                    
                    <div class="product__top__cont__stock">
                        <i class="fa-solid fa-check stock"></i>
                        <p class="product__top__cont__stock__desc">${product.availability}</p>
                    </div>
                </div>
        
                <div class="product__middle">
                    <div class="product__middle__price--m2">
                        <p class="product__middle__price--m2__p">${priceM2HTML}</p>
                    </div>
                    <div class="product__middle__price--st">
                        <p class="product__middle__price--st__p">${pricePcHTML}</p>
                    </div>
                </div>
            
                <div class="product__bottom">
                    <a href="${product.filepath}">
                        <p class="product__bottom__title">${product.name} <span class="format-nowrap">${product.specs?.format} mm</span></p>
                    </a>
                    <div class="product__bottom__desc">
                        <p class="product__bottom__desc__p">Manufacturer: ${product.specs?.manufacturer}</p>
                        <p class="product__bottom__desc__p">Country: ${product.specs?.countryOfOrigin}</p>
                        <p class="product__bottom__desc__p">Format (mm): ${product.specs?.format}</p>
                    </div>
                </div>
            </div>
        `;
    }
    else if (product.supplierPriceType === 'pc') {

        if (isM2 === true && isLinearMeter === false) {

            const priceM2 = (Math.ceil((priceCentsPc * piecesInSquareMeter).toFixed(4)) / 100).toFixed(2);
            const pricePc = (priceCentsPc / 100).toFixed(2).toString();
            const indexOfDotM2 = priceM2.toString().indexOf('.');
            const indexofDotPc = pricePc.toString().indexOf('.');

            let priceM2HTML = `<sup>$</sup>${priceM2.slice(0, indexOfDotM2)}<span class="price-small">${priceM2.slice(indexOfDotM2)}</span> <span class="price-desc">m<sup>2</sup></span>`;
            let pricePcHTML = `<sup>$</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span>`;

            productsHTML +=`
                <div class="product">
                    <div class="product__top">
            
                        <a href="${product.filepath}">
                            <div class="product__top__cont">
                                <img class="product__top__cont__img product_img_${index}" src="${product.image}" alt="${product.name}" width="264" height="195" loading="lazy">
                                <img class="product__top__cont__img product_img_second_${index}" src="${product.image_1}" alt="${product.name}" width="264" height="195">
                            </div>
                        </a>
                        
                        <div class="product__top__cont__stock">
                            <i class="fa-solid fa-check stock"></i>
                            <p class="product__top__cont__stock__desc">${product.availability}</p>
                        </div>
                    </div>
            
                    <div class="product__middle">
                        <div class="product__middle__price--m2">
                            <p class="product__middle__price--m2__p">${priceM2HTML}</p>
                        </div>
                        <div class="product__middle__price--st">
                            <p class="product__middle__price--st__p">${pricePcHTML}</p>
                        </div>
                    </div>
                
                    <div class="product__bottom">
                        <a href="${product.filepath}">
                            <p class="product__bottom__title">${product.name} <span class="format-nowrap">${product.specs?.format} mm</span></p>
                        </a>
                        <div class="product__bottom__desc">
                            <p class="product__bottom__desc__p">Manufacturer: ${product.specs?.manufacturer}</p>
                            <p class="product__bottom__desc__p">Country: ${product.specs?.countryOfOrigin}</p>
                            <p class="product__bottom__desc__p">Format (mm): ${product.specs?.format}</p>
                        </div>
                    </div>
                </div>
            `;


        }
        else if (isM2 === false && isLinearMeter === true) {

            const priceLM = (Math.ceil((priceCentsPc * piecesInLinearMeter).toFixed(4)) / 100).toFixed(2).toString();
            const pricePc = (priceCentsPc / 100).toFixed(2).toString();
            const indexOfDotLM = priceLM.toString().indexOf('.');
            const indexofDotPc = pricePc.toString().indexOf('.');

            let priceLMHTML = `<sup>$</sup>${priceLM.slice(0, indexOfDotLM)}<span class="price-small">${priceLM.slice(indexOfDotLM)}</span> <span class="price-desc">lm</span>`;
            let pricePcHTML = `<sup>$</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span>`;

            productsHTML +=`
                <div class="product">
                    <div class="product__top">
            
                        <a href="${product.filepath}">
                            <div class="product__top__cont">
                                <img class="product__top__cont__img product_img_${index}" src="${product.image}" alt="${product.name}" width="264" height="195" loading="lazy">
                                <img class="product__top__cont__img product_img_second_${index}" src="${product.image_1}" alt="${product.name}" width="264" height="195">
                            </div>
                        </a>
                        
                        <div class="product__top__cont__stock">
                            <i class="fa-solid fa-check stock"></i>
                            <p class="product__top__cont__stock__desc">${product.availability}</p>
                        </div>
                    </div>
            
                    <div class="product__middle">
                        <div class="product__middle__price--m2">
                            <p class="product__middle__price--m2__p">${priceLMHTML}</p>
                        </div>
                        <div class="product__middle__price--st">
                            <p class="product__middle__price--st__p">${pricePcHTML}</p>
                        </div>
                    </div>
                
                    <div class="product__bottom">
                        <a href="${product.filepath}">
                            <p class="product__bottom__title">${product.name} <span class="format-nowrap">${product.specs?.format} mm</span></p>
                        </a>
                        <div class="product__bottom__desc">
                            <p class="product__bottom__desc__p">Manufacturer: ${product.specs?.manufacturer}</p>
                            <p class="product__bottom__desc__p">Country: ${product.specs?.countryOfOrigin}</p>
                            <p class="product__bottom__desc__p">Format (mm): ${product.specs?.format}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        else if (isM2 === false && isLinearMeter === false) {

            const pricePc = (priceCentsPc / 100).toFixed(2).toString();
            const indexofDotPc = pricePc.toString().indexOf('.');

            let pricePcHTML = `<sup>$</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span>`;

            productsHTML +=`
                <div class="product">
                    <div class="product__top">
            
                        <a href="${product.filepath}">
                            <div class="product__top__cont">
                                <img class="product__top__cont__img product_img_${index}" src="${product.image}" alt="${product.name}" width="264" height="195" loading="lazy">
                                <img class="product__top__cont__img product_img_second_${index}" src="${product.image_1}" alt="${product.name}" width="264" height="195">
                            </div>
                        </a>
                        
                        <div class="product__top__cont__stock">
                            <i class="fa-solid fa-check stock"></i>
                            <p class="product__top__cont__stock__desc">${product.availability}</p>
                        </div>
                    </div>
            
                    <div class="product__middle">
                        <div class="product__middle__price--m2">
                            <p class="product__middle__price--m2__p">${pricePcHTML}</p>
                        </div>
                        <div class="product__middle__price--st">
                            <p class="product__middle__price--st__p"></p>
                        </div>
                    </div>
                
                    <div class="product__bottom">
                        <a href="${product.filepath}">
                            <p class="product__bottom__title">${product.name} <span class="format-nowrap">${product.specs?.format} mm</span></p>
                        </a>
                        <div class="product__bottom__desc">
                            <p class="product__bottom__desc__p">Manufacturer: ${product.specs?.manufacturer}</p>
                            <p class="product__bottom__desc__p">Country: ${product.specs?.countryOfOrigin}</p>
                            <p class="product__bottom__desc__p">Format (mm): ${product.specs?.format}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }
});
document.querySelector('.products').innerHTML = productsHTML;


//Adding onmouse image animation

document.querySelectorAll('.product')

    .forEach((product, index) => {
        product.addEventListener('mouseenter', () => {

            let first = document.querySelector('.product_img_' + index);
            let second = document.querySelector('.product_img_second_' + index);

            first.classList.add('opacity');
            second.classList.add('opacity');

            function moveLeft() {
                first.classList.add('moveLeft');
                second.classList.add('moveLeft');
            }

            function moveRight() {
                first.classList.add('moveRight');
                second.classList.add('moveRight');
            }
            
            let timeOut = setTimeout(moveLeft, 1000);
            let timeOutBack = setTimeout(moveRight, 5000);

        product.addEventListener('mouseleave', () => {

            clearTimeout(timeOut);
            clearTimeout(timeOutBack);
            moveRight();

            first.classList.remove('opacity','moveLeft','moveRight');
            second.classList.remove('opacity','moveLeft','moveRight');
        });
    });
});