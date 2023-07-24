cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart);
console.log(typeof(cart));

// localStorage.removeItem('cart');

//GENERATING TITLE AND IMAGES

let root = document.URL.slice(-12, -5);

let productOriginalHTML = '';
let productThumbnailslHTML = '';
let productTitle = '';
let productNumberInProducts;

products.forEach((product, index) => {

  if (product.id === root) {

    productTitle = product.name;
    productNumberInProducts = index;

    product.image_original.forEach((image, index) => {
      productOriginalHTML += `
        <div class="main__window__top__left__cont main_box">
          <img src='${image}' class="main__window__top__left__cont__img fade" onclick="openModal();" alt='${product.name}' loading="lazy">
        </div>
      `;
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
document.querySelector('.main__title').innerHTML = productTitle;


//IMAGE GALLERY

let imageIndex = 1;
showImage(imageIndex);

// Next/previous controls
function plusImage(n) {
  showImage(imageIndex += n);
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

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    document.querySelector(".modal").style.display = "none";
  } 
}

//GENERATING PRICES

let priceCentsM2 = '';
let priceCentsPc = '';

if (products[productNumberInProducts].typeOfPrice === 'm2') {

  let initialPrice = products[productNumberInProducts].priceCentsM2;
  let piecesInM2 = products[productNumberInProducts].specs.piecesInASquareMeter;

  const priceM2 = ((initialPrice / 100).toFixed(2));
  const pricePc = ((initialPrice / 100) / Number(piecesInM2)).toFixed(2);
  const indexOfDotM2 = ((initialPrice / 100).toFixed(2)).toString().indexOf('.');
  const indexofDotPc = ((initialPrice / 100) / Number(piecesInM2)).toFixed(2).toString().indexOf('.');
  
  priceCentsM2 += `
    <div class="main__window__middle__top__price__left">
      <p class="main__window__middle__top__price__left__box">${priceM2.slice(0, indexOfDotM2)}<span class="price-small">${priceM2.slice(indexOfDotM2)} $/m2</span></p>
    </div>
    <div class="main__window__middle__top__price__right">
      <p class="main__window__middle__top__price__right__box">${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)} $/pc</span></p>
    </div>
  `;
  
  document.querySelector('.main__window__middle__top__price').innerHTML = priceCentsM2;
}













//PRICE SELECTOR

let select = 'm2'; //The type of quantity (m2 or pc) of the product

let selectLeft = document.querySelector('.main__window__middle__top__buy__select__left');
let selectMiddle = document.querySelector('.main__window__middle__top__buy__select__middle');
let selectRight = document.querySelector('.main__window__middle__top__buy__select__right');

selectLeft.classList.add('selected');

selectLeft.addEventListener('click', () => {

  if (select === 'pc' || select === 'pack') {
    selectRight.classList.remove('selected');
    selectMiddle.classList.remove('selected');
  }
  selectLeft.classList.add('selected');
  select = 'm2';
  placeholder();
})

selectMiddle.addEventListener('click', () => {

  if (select === 'm2' || select === 'pack') {
    selectLeft.classList.remove('selected');
    selectRight.classList.remove('selected');
  }
  selectMiddle.classList.add('selected');
  select = 'pc';
  placeholder();
})

selectRight.addEventListener('click', () => {

  if (select === 'm2' || select === 'pc') {
    selectLeft.classList.remove('selected');
    selectMiddle.classList.remove('selected');
  }
  selectRight.classList.add('selected');
  select = 'pack';
  placeholder();
})


//SETTING PLACEHOLDER

let piecesInPack = products[productNumberInProducts].piecesInPack;
let piecesInM2 = products[productNumberInProducts].piecesPerM2;

placeholder ();

function placeholder () {

  if (select === 'm2') {
    document.querySelector('.main__window__middle__top__buy__area__input').placeholder = `min ${(piecesInPack/piecesInM2).toFixed(1)} m2`;
  }
  else if (select === 'pc') {
    document.querySelector('.main__window__middle__top__buy__area__input').placeholder = `min ${piecesInPack.toFixed(0)} pieces`;
  }
  else if (select === 'pack') {
    document.querySelector('.main__window__middle__top__buy__area__input').placeholder = `min 1 pack`;
  }

  document.querySelector('.main__window__middle__top__buy__area__input').value = '';
}

//ADDING TO CART
//Add to cart

document.querySelector('.main__window__middle__top__buy__button_add').addEventListener('click', () => {

  let userQuantity = Number(document.querySelector('.main__window__middle__top__buy__area__input').value);

  if (!(typeof(userQuantity) === 'number' && userQuantity >= 1 && userQuantity < 100000)) {
    document.querySelector('.main__window__middle__top__buy__area__input').value = '';
    return;
  }
  //Making sure the quantity can be divided by the number of pieces in the pack
  else if (select === 'pc' && userQuantity < piecesInPack) {
    document.querySelector('.main__window__middle__top__buy__area__input').value = '';
    return;
  }
  else if (select === 'pc' && !Number.isInteger(userQuantity / piecesInPack)) {
    userQuantity = userQuantity - (userQuantity % piecesInPack);
  }
  else if (select === 'm2' && !Number.isInteger(userQuantity / piecesInM2)) {
    userQuantity = userQuantity - (userQuantity % 1);
  }
  else if (select === 'pack' && !Number.isInteger(userQuantity / piecesInM2)) {
    userQuantity = userQuantity - (userQuantity % 1);
  }


  const order = {
    id: root,
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

  document.querySelector('.main__window__middle__top__buy__area__input').value = '';
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log(cart);

})


//window.open('cart.html', '_parent');



//GENERATING SPECS

let specs = products[productNumberInProducts].specs;
let specsHTML = '';

if (specs.piecesInASquareMeter) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Pieces in a square meter</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.piecesInASquareMeter}</span></p>
  `
}
if (specs.piecesInAPack) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Pieces in a pack</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.piecesInAPack}</span></p>
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