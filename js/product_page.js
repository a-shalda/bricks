cart = JSON.parse(localStorage.getItem('cart')) || [];

// localStorage.removeItem('cart');

//GENERATING TITLE AND IMAGES

let root = document.URL.slice(-12, -5);

let productOriginalHTML = '';
let productThumbnailslHTML = '';
let productTitle = '';
let productNumberInProducts;
let originalTypeOfPrice = '';
let userQuantity = 0;

//Limits 

const m2Limit = 1000;
const pcLimit = 10000;
const packLimit = 1000;

products.forEach((product, index) => {

  if (product.id === root) {

    productTitle = product.name;
    productNumberInProducts = index;
    originalTypeOfPrice = product.typeOfPrice;

    product.image_original.forEach((image, index) => {

      if (index === 0) {
        productOriginalHTML += `
        <a class="main__window__top__left__button--prev">❮</a>
        <a class="main__window__top__left__button--next">❯</a>
        <div class="main__window__top__left__cont main_box">
          <img src='${image}' class="main__window__top__left__cont__img fade" onclick="openModal();" alt='${product.name}' loading="lazy">
        </div>
      `;
      }
      else {
        productOriginalHTML += `
        <div class="main__window__top__left__cont main_box">
          <img src='${image}' class="main__window__top__left__cont__img fade" onclick="openModal();" alt='${product.name}' loading="lazy">
        </div>
      `;
      }
    });

    product.image_original.forEach((image, index) => {

      let gridNumber;

      if (index === 0) gridNumber = 'one';
      else if (index === 1) gridNumber = 'two';
      else if (index === 2) gridNumber = 'three';
      else if (index === 3) gridNumber = 'four';
      else if (index === 4) gridNumber = 'five';
      else if (index === 5) gridNumber = 'six';
      else if (index === 6) gridNumber = 'seven';
      else if (index === 7) gridNumber = 'eight';
      else if (index === 8) gridNumber = 'nine';
      else if (index === 9) gridNumber = 'ten';


      productThumbnailslHTML += `
        <div class="main__window__bottom__left__grid__cont active ${gridNumber}">
          <img src="${image}" onclick="currentImage(${index + 1})" class="main__window__bottom__left__grid__cont__img" alt='${product.name}' loading="lazy">
        </div>
      `;
    });
  }
});

document.querySelector('.main__window__top__left').innerHTML = productOriginalHTML;
document.querySelector('.main__window__bottom__left__grid').innerHTML = productThumbnailslHTML;
document.querySelector('.main__cont__title').innerHTML = productTitle;

//Image gallery

document.querySelector('.main__window__top__left__button--prev').addEventListener('click', () => {
  minusImage();
});

document.querySelector('.main__window__top__left__button--next').addEventListener('click', () => {
  plusImage();
});

let imageIndex = 1;
showImage(imageIndex);

// Next/previous controls
function minusImage() {
  showImage(imageIndex -= 1);
}

function plusImage() {
  showImage(imageIndex += 1);
}

// Thumbnail image controls
function currentImage(n) {
  showImage(imageIndex = n);
}

function showImage(n) {
  let i;
  let images = document.getElementsByClassName("main__window__top__left__cont");
  let main_image = document.getElementsByClassName("main__window__top__left__cont__img");
  let thumbnails = document.getElementsByClassName("main__window__bottom__left__grid__cont");
  let main_thumbnail = document.getElementsByClassName("main__window__bottom__left__grid__cont__img");

  if (n > images.length) {imageIndex = 1}
  else if (n < 1) {imageIndex = images.length}

  for (i = 0; i < images.length; i++) {
    images[i].classList.remove('main_box');
    thumbnails[i].classList.remove('active');
    main_image[i].classList.remove('main_image');
    main_thumbnail[i].classList.remove('main_thumbnail', 'clear');
  }

  images[imageIndex-1].classList.add('main_box');
  thumbnails[imageIndex-1].classList.add('active');
  main_image[imageIndex-1].classList.add('main_image');
  main_thumbnail[imageIndex-1].classList.add('main_thumbnail', 'clear');
} 

//MODAL

function openModal () {

  document.querySelector(".modal").style.display = "block";
  document.querySelector(".modal__content").src = document.querySelector(".main_image").src;
  document.body.style.overflow = 'hidden';

  // Get the <span> element that closes the modal
  let span = document.querySelectorAll(".close")[0];
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    document.querySelector(".modal").style.display = "none";
  } 

  document.querySelector('.modal').addEventListener('click',  () => {
    span.onclick();
    document.body.style.overflow = 'visible';
  });
}


//GENERATING STOCK INFO

let stockInfo = '';

if (products[productNumberInProducts].availability === 'In stock') {
  stockInfo += `
    <i class="fa-solid fa-check stock"></i>
    <p class="main__window__middle__top__stock__desc">In stock (delivery 1-2 business days)</p>
  `
}
document.querySelector('.main__window__middle__top__stock').innerHTML = stockInfo;


//GENERATING PRICES

let pricesM2 = '';
let pricesPc = '';

if (products[productNumberInProducts].typeOfPrice === 'm2') {

  let initialPrice = products[productNumberInProducts].priceCentsM2;
  let piecesInM2 = products[productNumberInProducts].specs.piecesInASquareMeter;

  const priceM2 = ((initialPrice / 100).toFixed(2));
  const pricePc = (Math.ceil((initialPrice / piecesInM2).toFixed(4)) / 100).toFixed(2);
  const indexOfDotM2 = priceM2.toString().indexOf('.');
  const indexofDotPc = pricePc.toString().indexOf('.');
  
  pricesM2 += `
    <div class="main__window__middle__top__price__left">
      <p class="main__window__middle__top__price__left__box"><sup>$</sup>${priceM2.slice(0, indexOfDotM2)}<span class="price-small">${priceM2.slice(indexOfDotM2)}</span> <span class="price-desc">m<sup>2</sup></span></p>
    </div>
    <div class="main__window__middle__top__price__right">
      <p class="main__window__middle__top__price__right__box"><sup>$</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span></p>
    </div>
  `;
  
  document.querySelector('.main__window__middle__top__price').innerHTML = pricesM2;
}
else if (products[productNumberInProducts].typeOfPrice === 'pc') {

  let initialPrice = products[productNumberInProducts].priceCentsPC;

  const pricePc = (initialPrice / 100).toFixed(2);
  const indexofDotPc = pricePc.toString().indexOf('.');
  
  pricesPc += `
    <div class="main__window__middle__top__price__left">
      <p class="main__window__middle__top__price__left__box"><sup>$</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span></p>
    </div>
    <div class="main__window__middle__top__price__right">
      <p class="main__window__middle__top__price__right__box">&nbsp;</p>
    </div>
  `;
  
  document.querySelector('.main__window__middle__top__price').innerHTML = pricesPc;

}

//QUANTITY TYPE SELECTOR (m2 or pc) of the product

let selectLeft = document.querySelector('.main__window__middle__top__buy__select__left');
let selectMiddle = document.querySelector('.main__window__middle__top__buy__select__middle');
let selectRight = document.querySelector('.main__window__middle__top__buy__select__right');

let select; 

if (products[productNumberInProducts].typeOfPrice === 'm2') {
  select = 'm2';
  selectLeft.classList.add('selected');
}
else if (products[productNumberInProducts].typeOfPrice === 'pc') {
  select = 'pc';
  selectMiddle.classList.add('selected');
  selectLeft.style.display = 'none';
  selectMiddle.classList.add('main__window__middle__top__buy__select__left');
}

selectLeft.addEventListener('click', () => {

  if (select === 'pc') {
    selectMiddle.classList.remove('selected');
  }
  else if (select === 'pack') {
    selectRight.classList.remove('selected');
  }
  selectLeft.classList.add('selected');
  select = 'm2';
  placeholder();
})

selectMiddle.addEventListener('click', () => {

  if (select === 'm2') {
    selectLeft.classList.remove('selected');
  }
  else if (select === 'pack') {
    selectRight.classList.remove('selected');
  }
  selectMiddle.classList.add('selected');
  select = 'pc';
  placeholder();
})

selectRight.addEventListener('click', () => {

  if (select === 'm2') {
    selectLeft.classList.remove('selected');
  }
  else if (select === 'pc') {
    selectMiddle.classList.remove('selected');
  }
  selectRight.classList.add('selected');
  select = 'pack';
  placeholder();
})


//SETTING PLACEHOLDER

let piecesInPack = products[productNumberInProducts].specs?.piecesInAPack;
let piecesInM2 = products[productNumberInProducts].specs.piecesInASquareMeter;
let inputArea = document.querySelector('.main__window__middle__top__buy__area__input');
let timeOutSuccess;
let timeOutError;
let inputAreaFocus = false;

placeholder ();

function placeholder () {

  inputArea.value = '';

  if (select === 'm2') {
    inputArea.placeholder = `min 1 square meter`;
  }
  else if (select === 'pc' && piecesInPack === 1) {
    inputArea.placeholder = `multiple of ${piecesInPack.toFixed(0)} piece`;
  }
  else if (select === 'pc' && piecesInPack > 1) {
    inputArea.placeholder = `multiple of ${piecesInPack.toFixed(0)} pieces`;
  }
  else if (select === 'pack') {
    inputArea.placeholder = `min 1 pack`;
  }

  if (inputAreaFocus) {
    inputArea.classList.remove('inputAreaFocus');
  }

  if (timeOutSuccess >= 0) {
    clearTimeout(timeOutSuccess);
    timeOutSuccess = undefined;
    inputArea.classList.remove('inputAreaFocus');
  }
  if (timeOutError >= 0) {
    clearTimeout(timeOutError);
    timeOutError = undefined;
    inputArea.classList.remove('inputAreaError');
  }
}


//ADDING TO CART
//Add to cart

document.querySelector('.main__window__middle__top__buy__button_add').addEventListener('click', () => {
  addToCart ();
})

function error (arg, quantity, type) {
  inputArea.value = '';
  inputArea.placeholder = `${arg}${quantity}${type}`;
  inputArea.classList.add('inputAreaError');

  timeOutError = setTimeout(function () {
    placeholder();
    inputArea.classList.remove('inputAreaError');

  }, 5000);
}

function addToCart () {

  cart = JSON.parse(localStorage.getItem('cart')) || [];

  userQuantity = Number(inputArea.value);
  let typeAdded;

  if (!(typeof(userQuantity) === 'number' && userQuantity >= 1)) {
    inputArea.value = '';
    return;
  }

  //Selected 'm2'
  if (select === 'm2') {

    if (select === 'm2' && userQuantity === 1) {typeAdded = ' square meter';}
    else if (select === 'm2' && userQuantity > 1) {typeAdded = ' square meters';}

    if (userQuantity > m2Limit) {
      return error('max ', m2Limit, typeAdded);
    }
  }
  //Selected 'pc'
  else if (select === 'pc') {

    if (select === 'pc' && userQuantity === 1) {typeAdded = ' piece';}
    else if (select === 'pc' && userQuantity > 1) {typeAdded = ' pieces';}

    if (userQuantity > pcLimit) {
      return error('max ', pcLimit, typeAdded);
    }

    if (userQuantity < piecesInPack) {
      if (piecesInPack === 1) {typeAdded = ' piece';}
      else if (piecesInPack > 1) {typeAdded = ' pieces';}

      return error('min ', piecesInPack, typeAdded);
    }

    if (!Number.isInteger(userQuantity / piecesInPack)) {
      userQuantity = userQuantity - (userQuantity % piecesInPack);
    }
  }
  //Selected 'pack'
  else if (select === 'pack') {

    if (select === 'pack' && userQuantity === 1) {typeAdded = ' pack';}
    else if (select === 'pack' && userQuantity > 1) {typeAdded = ' packs';}

    if (userQuantity > packLimit) {
      return error('max ', packLimit, typeAdded);
    }
  }

  const order = {
    id: root,
    originalTypeOfPrice: originalTypeOfPrice,
    type: select,
    quantity: userQuantity
  };

  let mathingIndex;

  cart.forEach((item, index) => {
    if (item.id === order.id && item.type === order.type) {
      mathingIndex = index;
    }
  })

  if (mathingIndex === undefined) {
    cart.push(order);
  }
  else {
    cart[mathingIndex].quantity += userQuantity;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  
  let sucessHTML = `Added ${userQuantity + typeAdded}`;

  inputArea.value = '';

  inputArea.placeholder = sucessHTML;

  inputArea.classList.add('inputAreaFocus');

  timeOutSuccess = setTimeout(function () {
    placeholder();
  }, 5000);

  console.log(cart);
}

//When input field is empty and not focused, remove inputAreaFocus
inputArea.addEventListener('blur', () => {

  if (inputArea.value.length === 0) {
    inputArea.classList.remove('inputAreaFocus');
    inputAreaFocus = false;
  }
})

inputArea.addEventListener('keydown', (event) => {

  //Checking if the previous operation was adding to cart or an error, stop animations
  if (timeOutSuccess >= 0) {
    clearTimeout(timeOutSuccess);
    placeholder();
    timeOutSuccess = undefined;
  }
  if (timeOutError >= 0) {
    clearTimeout(timeOutError);
    timeOutError = undefined;
    inputArea.classList.remove('inputAreaError');
  }

  //Add focus
  inputArea.classList.add('inputAreaFocus');
  inputAreaFocus = true;

  //Adding to cart on Enter
  if (event.key === 'Enter') {
    addToCart();
    document.activeElement.blur();
    inputArea.classList.add('inputAreaFocus');
  }

  //Input validation - First digit is not 0
  if (inputArea.value.length === 0 && event.key === '0') {
    event.preventDefault();
  }

  //Input validation - Preventing characters other than numbers from typing
  if (event.key !== '0' &&  event.key !== '1' && event.key !== '2' &&  event.key !== '3' && event.key !== '4' &&  event.key !== '5' &&event.key !== '6' &&  event.key !== '7' &&event.key !== '8' &&  event.key !== '9' && event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Delete' && event.key !== 'Insert' && event.key !== 'NumLock') {
    event.preventDefault();
  }

  //Input validation - Max length of the quantity
  if (select === 'm2' && inputArea.value.length >= 3) {
    limitInputAreaLength(event);
  }
  else if (select === 'pc' && inputArea.value.length >= 4) {
    limitInputAreaLength(event);
  }
  else if (select === 'pack' && inputArea.value.length >= 3) {
    limitInputAreaLength(event);
  }
})

function limitInputAreaLength (event) {
  if (event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Delete' && event.key !== 'Insert' && event.key !== 'NumLock') {
    event.preventDefault();
  }
}

document.querySelector('.main__window__middle__top__buy__area__left').addEventListener('click', () => {
  
  userQuantity = Number(inputArea.value);

  if (userQuantity >= 1) {
    userQuantity--;

    if (userQuantity === 0) {
      inputArea.value = '';
      return;
    }
    inputArea.value = userQuantity;
  }



})

document.querySelector('.main__window__middle__top__buy__area__right').addEventListener('click', () => {
  
  userQuantity = Number(inputArea.value) || 0;

  if (select === 'm2' && userQuantity === (m2Limit - 1)) {return;}
  else if (select === 'pc' && userQuantity === (pcLimit - 1)) {return;}
  else if (select === 'pack' && userQuantity === (packLimit - 1)) {return;}

  if (inputArea.value === '') {
    inputArea.value = 1;
  }
  userQuantity++;
  inputArea.value = userQuantity;
})



//window.open('cart.html', '_parent');



//GENERATING SPECS

let specs = products[productNumberInProducts].specs;
let specsHTML = '';

if (specs.piecesInAPack) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Pieces in a pack</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.piecesInAPack}</span></p>
  `
}
if (specs.piecesInASquareMeter) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Pieces in a square meter</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.piecesInASquareMeter}</span></p>
  `
}
if (specs.recommendedJointSpacing) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Recommended joint spacing (mm)</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.recommendedJointSpacing}</span></p>
  `
}
if (specs.thickness) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Thickness (mm)</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.thickness}</span></p>
  `
}
if (specs.format) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Format (mm)</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.format}</span></p>
  `
}
if (specs.recommendedDryMortarVolume) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Recommended dry mortar volume (kg)</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.recommendedDryMortarVolume}</span></p>
  `
}
if (specs.weightOf1Piece) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Weight of 1 piece (kg)</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.weightOf1Piece}</span></p>
  `
}
if (specs.weightOf1SquareMeter) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Weight of 1 square meter (kg)</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.weightOf1SquareMeter}</span></p>
  `
}
if (specs.weightOf1Pack) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Weight of 1 pack (kg)</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.weightOf1Pack}</span></p>
  `
}
if (specs.manufacturer) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Manufacturer</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.manufacturer}</span></p>
  `
}
if (specs.countryOfOrigin) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Country of origin</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.countryOfOrigin}</span></p>
  `
}
document.querySelector('.main__window__middle__bottom').innerHTML = specsHTML;