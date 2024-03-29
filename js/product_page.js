//GENERATING TITLE AND IMAGES

const findSlash = document.URL.lastIndexOf('/');
const findDot = document.URL.indexOf('.html');
let root

if (findDot === -1) {
    root = document.URL.slice((findSlash + 1));
}
else if (findDot >= 0) {
    root = document.URL.slice((findSlash + 1), findDot);
}

let productOriginalHTML = '';
let productThumbnailslHTML = '';
let productTitle = '';
let productDescription = '';
let productName = ''
let productId = ''
let productColor = ''
let metaDescription = ''
let productManufacturer = ''
let productNumberInProducts;
let supplierPriceType = '';
let userQuantity = 0;
let subTotal = 0;
let priceForSnippet = ''
const priceTotalLimit = 9000; //Used to generate options
const packsTotalLimit = 1000;

//Limits 

const m2Limit = 1000;
const pcLimit = 10000;
const packLimit = 1000;

products.forEach((product, index) => {

  if (product.id === root) {

    productTitle = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format;
    productNumberInProducts = index;
    supplierPriceType = product.supplierPriceType;
    (product.description) ? productDescription = product.description : productDescription = '';
    metaDescription = 'Buy ' + productTitle + ' in Moscow';
    productName = product.name
    productManufacturer = product.specs.manufacturer
    productId = product.id
    productColor = product.specs.color

    // srcset="${image} 1000w, ${product.image_large[index]} 2000w" sizes="(max-width: 1900px) 2000px, 1000px"

    product.image_original.forEach((image, index) => {

      if (index === 0) {
        productOriginalHTML += `
        <button class="main__window__top__left__button--prev">❮</button>
        <button class="main__window__top__left__button--next">❯</button>
        <div class="main__window__top__left__cont main_box">
          <img src='${image}' width="1000" height="1000" class="main__window__top__left__cont__img fade" alt="${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}" itemprop="image">
        </div>
      `;
      }
      else {
        productOriginalHTML += `
        <div class="main__window__top__left__cont main_box">
          <img src='${image}' width="1000" height="1000" class="main__window__top__left__cont__img fade" alt="${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}" loading="lazy">
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
      else if (index === 10) gridNumber = 'eleven';
      else if (index === 11) gridNumber = 'twelve';
      else if (index === 12) gridNumber = 'thirteen';
      else if (index === 13) gridNumber = 'fourteen';
      else if (index === 14) gridNumber = 'fifteen';
      else if (index === 15) gridNumber = 'sixteen';
      else if (index === 16) gridNumber = 'seventeen';
      else if (index === 17) gridNumber = 'eighteen';
      else if (index === 18) gridNumber = 'nineteen';
      else if (index === 19) gridNumber = 'twenty';
      else if (index === 20) gridNumber = 'twenty_one';


      productThumbnailslHTML += `
        <div class="main__window__bottom__left__grid__cont active ${gridNumber}">
          <img src="${image}" onclick="currentImage(${index + 1})" class="main__window__bottom__left__grid__cont__img" alt="${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}" width="500" height="500" loading="lazy">
        </div>
      `;
    });
  }
});


document.querySelector('title').innerHTML = productTitle;
document.querySelector('.main__window__top__left').innerHTML = productOriginalHTML;
document.querySelector('.main__window__bottom__left__grid').innerHTML = productThumbnailslHTML;

if (productDescription) {
  document.querySelector('.additional').innerHTML = `
    <div class="additional__window">
      <div class="additional__window__head">
        <h2 class="additional__window__head__h2">About ${productId.toUpperCase().replace(/-/g, " ")}</h2>
      </div>
      <div class="additional__window__body" itemprop="description">
        ${productDescription}
      </div>
    </div>
  `;
}

document.querySelector('.main__cont__title').innerHTML = productTitle;
document.querySelector('meta[name="description"]').setAttribute("content", metaDescription);

//Adding pulsing animation to main images
const imageBox = document.querySelectorAll('.main__window__top__left__cont');

imageBox.forEach((box) => {
  box.classList.add('image_blurred');

  const image = box.querySelector('img');
  image.classList.add('img_unloaded');

  image.addEventListener('load', () => {
    image.classList.remove('img_unloaded');
    box.classList.remove('image_blurred');
  })
})


//Adding pulsing animation to thumbnails
const thumbnailBox = document.querySelectorAll('.main__window__bottom__left__grid__cont');

thumbnailBox.forEach((box) => {
  box.classList.add('thumbnail_blurred');

  const thumbnailImage = box.querySelector('img');
  thumbnailImage.classList.add('img_unloaded');

  thumbnailImage.addEventListener('load', () => {
    thumbnailImage.classList.remove('img_unloaded');
    box.classList.remove('thumbnail_blurred');
  })
})


//Image gallery

const buttonPrev = document.querySelector('.main__window__top__left__button--prev');
const buttonNext = document.querySelector('.main__window__top__left__button--next')

buttonPrev.addEventListener('pointerdown', () => {
  minusImage();
  buttonPrev.classList.add('main__window__top__left__button--active');
  setTimeout((function () {buttonPrev.classList.remove('main__window__top__left__button--active');}), 200)
});

buttonNext.addEventListener('pointerdown', () => {
  plusImage();
  buttonNext.classList.add('main__window__top__left__button--active');
  setTimeout((function () {buttonNext.classList.remove('main__window__top__left__button--active');}), 200)

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

//MODAL image

document.querySelectorAll('.main__window__top__left__cont__img').forEach(image => {

  let modalImage = document.querySelector(".modal__image");

  image.addEventListener('click', () => {

    modalImage.style.visibility = 'visible';
    modalImage.style.opacity = '1';
    document.querySelector(".modal__image__box__content").src = document.querySelector(".main_image").currentSrc;
    document.body.classList.add('stop-scroll');
  
    document.querySelectorAll(".modal__image__box__close")[0].addEventListener('click', () => {

      document.querySelector(".modal__image__box__content").src = '';
      modalImage.style.visibility = 'hidden';
      modalImage.style.opacity = '0';
      document.body.classList.remove('stop-scroll');
    })

    modalImage.addEventListener('click',  () => {

      document.querySelector(".modal__image__box__content").src = '';
      modalImage.style.visibility = 'hidden';
      modalImage.style.opacity = '0';
      document.body.classList.remove('stop-scroll');
    });
  })
})


//GENERATING PRICES
const product = products[productNumberInProducts];
let priceCentsM2 = product.priceCentsM2;
let priceCentsPc = product.priceCentsPc;
const piecesInSquareMeter = Number(product.specs.piecesInSquareMeterCm / 100);
const piecesInPack = product.specs.piecesInPack;
const piecesInLinearMeter = Number(product.specs.piecesInLinearMeterCm / 100);
const isM2 = product.isM2;
const isLinearMeter = product.isLinearMeter;
let pricesHTML = '';

//Calculating the options
let optionsHTML = '';
let baseVolume;
let totalVolume = 0;
let price;
let basePieces = piecesInPack;
let pieces = 0;
let totalPacks = 0;
let weight = Number(product.specs.weightOf1PackGramm / 100);
let weightOf1Piece = Number(product.specs.weightOf1PieceGramm / 100) //For bricks and mortars
let totalWeight = 0;
let piecesInPallet = product.specs.piecesInPallet;
let squareMetersInPallet = product.specs.squareMetersInPallet;
let totalPallets = 0;
let productType = product.type;

if (isM2 === true && supplierPriceType === 'm2' && supplierPriceType !== 'pc') {

  const priceM2 = ((priceCentsM2 / 100).toFixed(2));
  priceForSnippet = priceM2
  const pricePc = (Math.ceil((priceCentsM2 / piecesInSquareMeter).toFixed(4)) / 100).toFixed(2);
  const indexOfDotM2 = priceM2.toString().indexOf('.');
  const indexofDotPc = pricePc.toString().indexOf('.');

  let priceM2HTML = `<sup itemprop="priceCurrency" content="EUR">€</sup>${priceM2.slice(0, indexOfDotM2)}<span itemprop="price" content=${priceM2.slice(0, indexOfDotM2)}${priceM2.slice(indexOfDotM2)} class="price-small">${priceM2.slice(indexOfDotM2)}</span> <span class="price-desc">m<sup>2</sup></span>`;
  let pricePcHTML = `<sup>€</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span>`;
  
  pricesHTML = `
    <div class="main__window__middle__top__price__left">
      <p class="main__window__middle__top__price__left__box">${priceM2HTML}</p>
    </div>
    <div class="main__window__middle__top__price__right">
      <p class="main__window__middle__top__price__right__box">${pricePcHTML}</p>
    </div>
  `;

  //Calculating the options

  if ((piecesInPack % piecesInSquareMeter) === 0) {baseVolume = (piecesInPack / piecesInSquareMeter);}
  else {baseVolume = Number((piecesInPack / piecesInSquareMeter).toFixed(2));}

  optionsHTML += `<option value="0">select quantity...</option>`;

  for (let i = 0; i < 90; i++) {

    if (totalVolume >= 90) {break;}
    totalVolume = totalVolume + baseVolume;

    if (!Number.isInteger((piecesInPack / piecesInSquareMeter))) {totalVolume = Number(totalVolume.toFixed(2));}

    pieces = pieces + basePieces;
    price = (totalVolume * priceM2).toFixed(2);

    if (price >= priceTotalLimit) {break;}

    totalPallets = Number((totalVolume / squareMetersInPallet).toFixed(2));
    if (totalPallets < 2) {totalPallets = totalPallets + ` pallet`;}
    else {totalPallets = totalPallets + ` pallets`;}

    totalPacks++;
    totalWeight = Number((totalWeight + weight).toFixed(2));

    let priceLength = String(price).length;
    let priceModified = String(price);
    if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}

    let piecesModified = '';
    if (pieces === 1) {piecesModified = pieces + ` pc`;}
    else {piecesModified = pieces + ` pcs`;}
  
    let totalPacksModified = '';
    if (totalPacks === 1) {totalPacksModified = totalPacks + ` pack`}
    else {totalPacksModified = totalPacks + ` packs`}

    if (window.innerWidth <= 350) {
      optionsHTML += `
      <option value="${totalPacks}">${totalVolume} m&sup2;&nbsp;= €${priceModified}</option>
    `;
    }
    else if (window.innerWidth <= 600) {
      optionsHTML += `
      <option value="${totalPacks}">${totalVolume} m&sup2;&nbsp;= €${priceModified} (${totalPacksModified})</option>
    `;
    }
    else {
      optionsHTML += `
      <option value="${totalPacks}">${totalVolume} m&sup2;&nbsp; = &nbsp;€${priceModified} &nbsp;(${totalPacksModified}, ${piecesModified}, ${totalWeight} kg, ${totalPallets})</option>
    `;
    }
  }

  if (window.innerWidth <= 600) {optionsHTML += `<option value="${totalPacks}">>${totalVolume} m&sup2; specify in the cart</option>`;}
  else {optionsHTML += `<option value="${totalPacks}">>${totalVolume} m&sup2; select and specify in the cart</option>`;}

  document.querySelector('.main__window__middle__top__stock__subtotal__value__select').innerHTML = optionsHTML;
}
else if (supplierPriceType === 'pc') {

  if (isM2 === true && isLinearMeter === false) {

    const priceM2 = (Math.ceil((priceCentsPc * piecesInSquareMeter).toFixed(4)) / 100).toFixed(2);
    priceForSnippet = priceM2
    const pricePc = (priceCentsPc / 100).toFixed(2).toString();
    const indexOfDotM2 = priceM2.toString().indexOf('.');
    const indexofDotPc = pricePc.toString().indexOf('.');

    let priceM2HTML = `<sup itemprop="priceCurrency" content="EUR">€</sup>${priceM2.slice(0, indexOfDotM2)}<span itemprop="price" content=${priceM2.slice(0, indexOfDotM2)}${priceM2.slice(indexOfDotM2)} class="price-small">${priceM2.slice(indexOfDotM2)}</span> <span class="price-desc">m<sup>2</sup></span>`;
    let pricePcHTML = `<sup>€</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span>`;

    pricesHTML = `
      <div class="main__window__middle__top__price__left">
        <p class="main__window__middle__top__price__left__box">${priceM2HTML}</p>
      </div>
      <div class="main__window__middle__top__price__right">
        <p class="main__window__middle__top__price__right__box">${pricePcHTML}</p>
      </div>
    `;
  
    //Calculating the options

    if (productType !== 'Klinker brick' && productType !== 'Klinker clay paver') {
      if ((piecesInPack % piecesInSquareMeter) === 0) {baseVolume = (piecesInPack / piecesInSquareMeter);}
      else {baseVolume = Number((piecesInPack / piecesInSquareMeter).toFixed(2));}
    
      optionsHTML += `<option value="0">select quantity...</option>`;
    
      for (let i = 0; i < 90; i++) {

        if (price >= priceTotalLimit) {break;}
    
        if (totalVolume >= 90) {break;}
        totalVolume = totalVolume + baseVolume;
    
        if (!Number.isInteger((piecesInPack / piecesInSquareMeter))) {totalVolume = Number(totalVolume.toFixed(2));}
    
        pieces = pieces + basePieces;
        price = (pieces * pricePc).toFixed(2);
  
        totalPallets = Number((pieces / piecesInPallet).toFixed(2));
        if (totalPallets < 2) {totalPallets = totalPallets + ` pallet`;}
        else {totalPallets = totalPallets + ` pallets`;}
  
        totalPacks++;
        totalWeight = Number((totalWeight + weight).toFixed(2));
    
        let priceLength = String(price).length;
        let priceModified = String(price);
        if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
    
        let piecesModified = '';
        if (pieces === 1) {piecesModified = pieces + ` pc`;}
        else {piecesModified = pieces + ` pcs`;}
      
        let totalPacksModified = '';
        if (totalPacks === 1) {totalPacksModified = totalPacks + ` pack`}
        else {totalPacksModified = totalPacks + ` packs`}
    
        if (window.innerWidth <= 350) {
          optionsHTML += `
          <option value="${totalPacks}">${totalVolume} m&sup2;&nbsp;= €${priceModified}</option>
        `;
        }
        else if (window.innerWidth <= 600) {
          optionsHTML += `
          <option value="${totalPacks}">${totalVolume} m&sup2;&nbsp;= €${priceModified} (${totalPacksModified})</option>
        `;
        }
        else {
          optionsHTML += `
          <option value="${totalPacks}">${totalVolume} m&sup2;&nbsp; = &nbsp;€${priceModified} &nbsp;(${totalPacksModified}, ${piecesModified}, ${totalWeight} kg, ${totalPallets})</option>
        `;
        }
      }
    
      if (window.innerWidth <= 600) {optionsHTML += `<option value="${totalPacks}">>${totalVolume} m&sup2; specify in the cart</option>`;}
      else {optionsHTML += `<option value="${totalPacks}">>${totalVolume} m&sup2; select and specify in the cart</option>`;}
    
      document.querySelector('.main__window__middle__top__stock__subtotal__value__select').innerHTML = optionsHTML;
    }
    else {
      baseVolume = Number((piecesInPallet / piecesInSquareMeter).toFixed(2));
      basePieces = piecesInPallet;
  
      optionsHTML += `<option value="0">select quantity...</option>`;
    
      for (let i = 0; i < 9; i++) {

        if (price >= priceTotalLimit) {break;}

        totalVolume = Number((totalVolume + baseVolume).toFixed(2));
        
        pieces = pieces + basePieces;
        price = (pieces * pricePc).toFixed(2);

        totalPallets = Number((pieces / piecesInPallet).toFixed(2));
        totalPacks = totalPallets;
        let totalPalletsNumber = totalPallets;
        if (totalPallets < 2) {totalPallets = totalPallets + ` pallet`;}
        else {totalPallets = totalPallets + ` pallets`;}
    
        totalWeight = Number((totalWeight + (weightOf1Piece * piecesInPallet)).toFixed(2));
    
        let priceLength = String(price).length;
        let priceModified = String(price);
        if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
    
        let piecesModified = pieces + ` pcs`;

        if (window.innerWidth <= 350) {
          optionsHTML += `
          <option value="${totalPacks}">${totalVolume} m&sup2;&nbsp;= €${priceModified}</option>
        `;
        }
        else if (window.innerWidth <= 600) {
          optionsHTML += `
          <option value="${totalPacks}">${totalVolume} m&sup2;&nbsp;= €${priceModified} (${totalPalletsNumber} pal)</option>
        `;
        }
        else {
          optionsHTML += `
          <option value="${totalPacks}">${totalVolume} m&sup2;&nbsp; = &nbsp;€${priceModified} &nbsp;(${piecesModified}, ${totalWeight} kg, ${totalPallets})</option>
        `;
        }
      }
    
      if (window.innerWidth <= 600) {optionsHTML += `<option value="${totalPacks}">>${totalVolume} m&sup2; specify in the cart</option>`;}
      else {optionsHTML += `<option value="${totalPacks}">>${totalVolume} m&sup2; select and specify in the cart</option>`;}
    
      document.querySelector('.main__window__middle__top__stock__subtotal__value__select').innerHTML = optionsHTML;
    }

  }
  else if (isM2 === false && isLinearMeter === true) {

    const priceLM = (Math.ceil((priceCentsPc * piecesInLinearMeter).toFixed(4)) / 100).toFixed(2).toString();
    priceForSnippet = priceLM
    const pricePc = (priceCentsPc / 100).toFixed(2).toString();
    const indexOfDotLM = priceLM.toString().indexOf('.');
    const indexofDotPc = pricePc.toString().indexOf('.');

    let priceLMHTML = `<sup itemprop="priceCurrency" content="EUR">€</sup>${priceLM.slice(0, indexOfDotLM)}<span itemprop="price" content=${priceLM.slice(0, indexOfDotLM)}${priceLM.slice(indexOfDotLM)} class="price-small">${priceLM.slice(indexOfDotLM)}</span> <span class="price-desc">lin.m</span>`;
    let pricePcHTML = `<sup>€</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span>`;

    pricesHTML = `
      <div class="main__window__middle__top__price__left">
        <p class="main__window__middle__top__price__left__box">${priceLMHTML}</p>
      </div>
      <div class="main__window__middle__top__price__right">
        <p class="main__window__middle__top__price__right__box">${pricePcHTML}</p>
      </div>
    `;

    //Calculating the options

    if ((piecesInPack % piecesInLinearMeter) === 0) {baseVolume = (piecesInPack / piecesInLinearMeter);}
    else {baseVolume = Number((piecesInPack / piecesInLinearMeter).toFixed(2));}
  
    optionsHTML += `<option value="0">select quantity...</option>`;
  
    for (let i = 0; i < 90; i++) {
  
      if (price >= priceTotalLimit) {break;}
      
      if (totalVolume >= 90) {break;}
      totalVolume = totalVolume + baseVolume;
  
      if (!Number.isInteger((piecesInPack / piecesInLinearMeter))) {totalVolume = Number(totalVolume.toFixed(2));}
  
      pieces = pieces + basePieces;
      price = (pieces * pricePc).toFixed(2);

      totalPallets = Number((pieces / piecesInPallet).toFixed(2));
      if (totalPallets < 2) {totalPallets = totalPallets + ` pallet`;}
      else {totalPallets = totalPallets + ` pallets`;}

      totalPacks++;
      totalWeight = Number((totalWeight + weight).toFixed(2));
  
      let priceLength = String(price).length;
      let priceModified = String(price);
      if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
  
      let piecesModified = '';
      if (pieces === 1) {piecesModified = pieces + ` pc`;}
      else {piecesModified = pieces + ` pcs`;}
    
      let totalPacksModified = '';
      if (totalPacks === 1) {totalPacksModified = totalPacks + ` pack`}
      else {totalPacksModified = totalPacks + ` packs`}
  
      if (window.innerWidth <= 350) {
        optionsHTML += `
        <option value="${totalPacks}">${totalVolume} lin.m &nbsp;= €${priceModified}</option>
      `;
      }
      else if (window.innerWidth <= 640) {
        optionsHTML += `
        <option value="${totalPacks}">${totalVolume} lin.m &nbsp;= €${priceModified} (${totalPacksModified})</option>
      `;
      }
      else {
        optionsHTML += `
        <option value="${totalPacks}">${totalVolume} lin.m &nbsp; = &nbsp;€${priceModified} &nbsp;(${totalPacksModified}, ${piecesModified}, ${totalWeight} kg, ${totalPallets})</option>
      `;
      }
    }
  
    if (window.innerWidth <= 600) {optionsHTML += `<option value="${totalPacks}">>${totalVolume} lin.m specify in the cart</option>`;}
    else {optionsHTML += `<option value="${totalPacks}">>${totalVolume} lin.m select and specify in the cart</option>`;}
  
    document.querySelector('.main__window__middle__top__stock__subtotal__value__select').innerHTML = optionsHTML;
  }
  else if (isM2 === false && isLinearMeter === false) {

    //This type of product is sold by 1 piece

    const pricePc = (priceCentsPc / 100).toFixed(2).toString();
    priceForSnippet = pricePc
    const indexofDotPc = pricePc.toString().indexOf('.');

    let pricePcHTML = `<sup itemprop="priceCurrency" content="EUR">€</sup>${pricePc.slice(0, indexofDotPc)}<span itemprop="price" content=${pricePc.slice(0, indexofDotPc)}${pricePc.slice(indexofDotPc)} class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span>`;

    pricesHTML = `
      <div class="main__window__middle__top__price__left">
        <p class="main__window__middle__top__price__left__box">${pricePcHTML}</p>
      </div>
    `;
  
    //Calculating the options
    baseVolume = 1;
    basePieces = 1;
  
    optionsHTML += `<option value="0">select quantity...</option>`;
  
    for (let i = 0; i < 90; i++) {
  
      if (totalVolume >= 50) {break;}
      totalVolume = totalVolume + baseVolume;
    
      pieces = pieces + basePieces;
      price = (pieces * pricePc).toFixed(2);

      if (price >= priceTotalLimit) {break;}

      totalPallets = Number((pieces / piecesInPallet).toFixed(2));
      if (totalPallets < 2) {totalPallets = totalPallets + ` pallet`;}
      else {totalPallets = totalPallets + ` pallets`;}

      totalPacks++;
      totalWeight = Number((totalWeight + weight).toFixed(2));
  
      let priceLength = String(price).length;
      let priceModified = String(price);
      if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
  
      let piecesModified = '';
      if (pieces === 1) {piecesModified = pieces + ` pc`;}
      else {piecesModified = pieces + ` pcs`;}
    
      let totalPacksModified = '';
      if (totalPacks === 1) {totalPacksModified = totalPacks + ` pack`}
      else {totalPacksModified = totalPacks + ` packs`}
  
      if (window.innerWidth <= 350) {
        optionsHTML += `
        <option value="${totalPacks}">${piecesModified} &nbsp;= €${priceModified}</option>
      `;
      }
      else if (window.innerWidth <= 600) {
        optionsHTML += `
        <option value="${totalPacks}">${piecesModified} &nbsp;= €${priceModified} (${totalPacksModified})</option>
      `;
      }
      else {
        optionsHTML += `
        <option value="${totalPacks}">${piecesModified} &nbsp; = &nbsp;€${priceModified} &nbsp;(${totalPacksModified}, ${totalWeight} kg, ${totalPallets})</option>
      `;
      }
    }
  
    if (window.innerWidth <= 600) {optionsHTML += `<option value="${totalPacks}">>${totalVolume} pcs specify in the cart</option>`;}
    else {optionsHTML += `<option value="${totalPacks}">>${totalVolume} pcs select and specify in the cart</option>`;}
  
    document.querySelector('.main__window__middle__top__stock__subtotal__value__select').innerHTML = optionsHTML;
  }
}
document.querySelector('.main__window__middle__top__price').innerHTML = pricesHTML;

//Add to wishlist

const buttonWish = document.querySelector('.main__window__middle__top__buy__button_wish');
const buttonWishText = document.querySelector('.main__window__middle__top__buy__button_wish__text')

buttonWish.addEventListener('pointerdown', () => {
  ModifyWishlist();
  AddButtonWishEffect();
})

buttonWish.addEventListener('pointerup', () => {RemoveButtonWishEffect();})
buttonWish.addEventListener('pointerout', () => {RemoveButtonWishEffect();})

//Button effects 
function AddButtonWishEffect () {buttonWish.classList.add('main__window__middle__top__buy__button_wish__active');}
function RemoveButtonWishEffect () {buttonWish.classList.remove('main__window__middle__top__buy__button_wish__active');}

function checkWishlist () {
  wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  if (wishlist.length === 0) {
    return;
  }

  const wish = {
    id: root,
  };

  wishlist.forEach(item => {
    if (item.id === wish.id) {
      buttonWishText.innerHTML = `
        Unsave
      `;    
    }
  })
}

checkWishlist ();

function ModifyWishlist () {

  wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  const wish = {
    id: root,
  };

  let mathingIndex;

  wishlist.forEach((item, index) => {
    if (item.id === wish.id) {
      mathingIndex = index;
    }
  })

  if (mathingIndex === undefined) {
    wishlist.push(wish);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    buttonWishText.innerHTML = `
      Unsave
    `; 
  }
  else {
    wishlist.splice([mathingIndex], 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    buttonWishText.innerHTML = `
      Save
    `; 
  }

  updateCounters();
}

//Adding to cart

let userPacks = document.querySelector('.main__window__middle__top__stock__subtotal__value__select');
const buttonAdd = document.querySelector('.main__window__middle__top__buy__button_add');

buttonAdd.addEventListener('pointerdown', () => {
  addToCart();
})

function addToCart() {

  cart = JSON.parse(localStorage.getItem('cart')) || [];
  userQuantity = Number(userPacks.value);

  if (userQuantity !== 0) {
  
    const order = {
      id: root,
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

      if ((cart[mathingIndex].quantity + userQuantity) <= packsTotalLimit) {
        cart[mathingIndex].quantity += userQuantity;
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    modalToCart();
    userPacks.value = 0;
    
    updateCounters();
  }
  else {
    userPacks.classList.add('main__window__middle__top__stock__subtotal__value__select__focus');

    function removeFocus() {
      userPacks.classList.remove('main__window__middle__top__stock__subtotal__value__select__focus');
    }

    setTimeout(function () {
      removeFocus();
    }, 300);
  }
}

function modalToCart() {

  const modalToCartWindow = document.querySelector('.modal__cart');
  modalToCartWindow.style.visibility = 'visible';
  modalToCartWindow.style.opacity = '1';
  document.body.classList.add('stop-scroll');

  document.querySelector('.modal__cart__box__content__continue').addEventListener('click',  () => {
    modalToCartWindow.style.visibility = 'hidden';
    modalToCartWindow.style.opacity = '0';
    document.body.classList.remove('stop-scroll');
  });

  document.querySelector(".modal__cart__box__content__close").addEventListener('click', () => {
    modalToCartWindow.style.visibility = 'hidden';
    modalToCartWindow.style.opacity = '0';
    document.body.classList.remove('stop-scroll');
  })

  let toCartMessage = `<span class="modal__cart__box__content__message--title">Added to Cart:</span><br> ${userPacks[userPacks.value].text}`;
  document.querySelector('.modal__cart__box__content__message').innerHTML = toCartMessage;
}

//GENERATING SPECS

let specs = products[productNumberInProducts].specs;
let specsHTML = '';

if (specs.piecesInPack) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Pieces in a pack</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.piecesInPack}</span></p>
  `
}
if (specs.piecesInSquareMeterCm) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Pieces in a square meter</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${piecesInSquareMeter}</span></p>
  `
}
if (piecesInLinearMeter) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Pieces in a linear meter</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${piecesInLinearMeter}</span></p>
  `
}
if (specs.squareMetersInPallet) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Square meters in a pallet</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.squareMetersInPallet}</span></p>
  `
}
if (specs.piecesInPallet) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Pieces in a pallet</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.piecesInPallet}</span></p>
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
if (weightOf1Piece) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Weight of 1 piece (kg)</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${weightOf1Piece}</span></p>
  `
}
if (specs.weightOf1SquareMeter) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Weight of 1 square meter (kg)</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.weightOf1SquareMeter}</span></p>
  `
}
if (isLinearMeter) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Weight of 1 linear meter (kg)</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${Number(weightOf1Piece * piecesInLinearMeter).toFixed(2)}</span></p>
  `
}
if (weight) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Weight of 1 pack (kg)</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${weight}</span></p>
  `
}
if (specs.manufacturer) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Manufacturer</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right">${specs.manufacturer}</span></p>
  `
}
if (specs.countryOfOrigin) {
  specsHTML += `
    <p class="main__window__middle__bottom__left"><span class="main__window__middle__bottom__left_left">Country of origin</span><span class="main__window__middle__bottom__left_middle"></span><span class="main__window__middle__bottom__left_right" itemprop="countryOfOrigin">${specs.countryOfOrigin}</span></p>
  `
}
document.querySelector('.main__window__middle__bottom').innerHTML = specsHTML;