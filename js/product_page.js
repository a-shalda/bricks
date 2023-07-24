cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart);
console.log(typeof(cart));

// localStorage.removeItem('cart');

//GENERATING HTML

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



