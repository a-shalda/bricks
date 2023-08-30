cart = JSON.parse(localStorage.getItem('cart')) || [];
wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

const searchField = document.querySelector('.search__form');
searchField.value = '';
const searchResult = document.querySelector('.products');
let resultArray = [];
let productsHTML = '';

const searchLimit = 30;

searchField.addEventListener('keydown', () => {

  searchResult.classList.remove('search--not-blurred');

  setTimeout(function () {

    productsHTML = '';
    resultArray = [];

    for (let i = 0; i < products.length; i++) {
      
      const input = (searchField.value).toLowerCase();
      const id = (products[i].id).toLowerCase();
      const name = (products[i].name).toLowerCase();
      const manufacturer = (products[i].specs?.manufacturer).toLowerCase();
      const format = (products[i].specs?.format).toLowerCase();
      const type = (products[i].type).toLowerCase();
  
  
      if (id.includes(`${input}`) || name.includes(`${input}`) || manufacturer.includes(`${input}`) || format.includes(`${input}`) || type.includes(`${input}`)) {
        resultArray.push(`${products[i].id}`);
      }
    }

    if (resultArray.length > searchLimit) {
      resultArray = resultArray.slice(0, searchLimit);
    }
    
    if (searchField.value.length === 0) {
      searchResult.innerHTML = '';
      return;
    }

    generateProducts();
    blurredLoading();
    onMouseAnimation();

  }, 300);

})


//Generating products on the page

let indicesOfProducts = [];

function generateProducts () {

  indicesOfProducts = [];

  resultArray.forEach(result => {

    products.forEach((product, index) => {

        if (result === product.id) {
    
            indicesOfProducts.push(index);
    
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
        
                let priceM2HTML = `<sup>€</sup>${priceM2.slice(0, indexOfDotM2)}<span class="price-small">${priceM2.slice(indexOfDotM2)}</span> <span class="price-desc">m<sup>2</sup></span>`;
                let pricePcHTML = `<sup>€</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span>`;
        
                productsHTML +=`
                    <div class="product">
                        <div class="product__top">
                
                            <a href="${product.filepath}">
                                <div class="product__top__cont">
                                    <img class="product__top__cont__img product_img_${index}" src="${product.image_thumbnail[0]}" alt="${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}" width="350" height="229" loading="lazy">
                                    <img class="product__top__cont__img product_img_second_${index}" src="${product.image_thumbnail[1]}" alt="${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}" width="350" height="229">
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
                                <p class="product__bottom__title">${product.type + ' ' + product.name}</p>
                            </a>
                            <div class="product__bottom__desc">
                                <p class="product__bottom__desc__p">Manufacturer: ${product.specs?.manufacturer}</p>
                                <p class="product__bottom__desc__p">Country: ${product.specs?.countryOfOrigin}</p>
                                <p class="product__bottom__desc__p">Size (mm): ${product.specs?.format}</p>
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
        
                    let priceM2HTML = `<sup>€</sup>${priceM2.slice(0, indexOfDotM2)}<span class="price-small">${priceM2.slice(indexOfDotM2)}</span> <span class="price-desc">m<sup>2</sup></span>`;
                    let pricePcHTML = `<sup>€</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span>`;
        
                    productsHTML +=`
                        <div class="product">
                            <div class="product__top">
                    
                                <a href="${product.filepath}">
                                    <div class="product__top__cont">
                                        <img class="product__top__cont__img product_img_${index}" src="${product.image_thumbnail[0]}" alt="${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}" width="350" height="229" loading="lazy">
                                        <img class="product__top__cont__img product_img_second_${index}" src="${product.image_thumbnail[1]}" alt="${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}" width="350" height="229">
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
                                    <p class="product__bottom__title">${product.type + ' ' + product.name}</p>
                                </a>
                                <div class="product__bottom__desc">
                                    <p class="product__bottom__desc__p">Manufacturer: ${product.specs?.manufacturer}</p>
                                    <p class="product__bottom__desc__p">Country: ${product.specs?.countryOfOrigin}</p>
                                    <p class="product__bottom__desc__p">Size (mm): ${product.specs?.format}</p>
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
        
                    let priceLMHTML = `<sup>€</sup>${priceLM.slice(0, indexOfDotLM)}<span class="price-small">${priceLM.slice(indexOfDotLM)}</span> <span class="price-desc">lm</span>`;
                    let pricePcHTML = `<sup>€</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span>`;
        
                    productsHTML +=`
                        <div class="product">
                            <div class="product__top">
                    
                                <a href="${product.filepath}">
                                    <div class="product__top__cont">
                                        <img class="product__top__cont__img product_img_${index}" src="${product.image_thumbnail[0]}" alt="${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}" width="350" height="229" loading="lazy">
                                        <img class="product__top__cont__img product_img_second_${index}" src="${product.image_thumbnail[1]}" alt="${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}" width="350" height="229">
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
                                    <p class="product__bottom__title">${product.type + ' ' + product.name}</p>
                                </a>
                                <div class="product__bottom__desc">
                                    <p class="product__bottom__desc__p">Manufacturer: ${product.specs?.manufacturer}</p>
                                    <p class="product__bottom__desc__p">Country: ${product.specs?.countryOfOrigin}</p>
                                    <p class="product__bottom__desc__p">Size (mm): ${product.specs?.format}</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
        
                else if (isM2 === false && isLinearMeter === false) {
        
                    const pricePc = (priceCentsPc / 100).toFixed(2).toString();
                    const indexofDotPc = pricePc.toString().indexOf('.');
        
                    let pricePcHTML = `<sup>€</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span>`;
        
                    productsHTML +=`
                        <div class="product">
                            <div class="product__top">
                    
                                <a href="${product.filepath}">
                                    <div class="product__top__cont">
                                        <img class="product__top__cont__img product_img_${index}" src="${product.image_thumbnail[0]}" alt="${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}" width="350" height="229" loading="lazy">
                                        <img class="product__top__cont__img product_img_second_${index}" src="${product.image_thumbnail[1]}" alt="${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}" width="350" height="229">
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
                                    <p class="product__bottom__title">${product.type + ' ' + product.name}</p>
                                </a>
                                <div class="product__bottom__desc">
                                    <p class="product__bottom__desc__p">Manufacturer: ${product.specs?.manufacturer}</p>
                                    <p class="product__bottom__desc__p">Country: ${product.specs?.countryOfOrigin}</p>
                                    <p class="product__bottom__desc__p">Size (mm): ${product.specs?.format}</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
        }
    });
  })

  searchResult.innerHTML = productsHTML;
  searchResult.classList.add('search--not-blurred');
}


function blurredLoading () {

  document.querySelectorAll('.product__top__cont').forEach((cont) => {
    cont.classList.add('cont_blurred');

    const image = cont.querySelector('img');

    image.classList.add('img_unloaded');

    image.addEventListener('load', () => {
        image.classList.remove('img_unloaded');
        cont.classList.remove('cont_blurred');
    })
  })
}


function onMouseAnimation () {

  document.querySelectorAll('.product')
  
      .forEach((product, index) => {
  
          product.addEventListener('mouseenter', () => {
  
              let first = document.querySelector('.product_img_' + indicesOfProducts[index]);
              let second = document.querySelector('.product_img_second_' + indicesOfProducts[index]);
  
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
  
}


searchField.addEventListener('focus', () => {
  document.querySelector('.search').classList.add('search__focus');
})

searchField.addEventListener('focusout', () => {
  document.querySelector('.search').classList.remove('search__focus');
})