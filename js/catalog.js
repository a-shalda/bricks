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


//PRODUCTS
//Generating products on the page

let productsHTML = '';

products.forEach((product, index) => {
const priceM2 = ((product.priceCentsM2 / 100).toFixed(2));
const pricePc = ((product.priceCentsM2 / 100) / Number(product.piecesPerM2)).toFixed(2);
const indexOfDotM2 = ((product.priceCentsM2 / 100).toFixed(2)).toString().indexOf('.');
const indexofDotPc = ((product.priceCentsM2 / 100) / Number(product.piecesPerM2)).toFixed(2).toString().indexOf('.');
  
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
            <p class="product__middle__price--m2__p">${priceM2.slice(0, indexOfDotM2)}<span class="price-small">${priceM2.slice(indexOfDotM2)} €/m2</span></p>
        </div>
        <div class="product__middle__price--st">
            <p class="product__middle__price--st__p">${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)} €/pc</span></p>
        </div>
    </div>
    <div class="product__bottom">
        <a href="${product.filepath}">
            <p class="product__bottom__title">${product.name} <span class="format-nowrap">${product.format} mm</span></p>
        </a>
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