//Generating products on the page


let indicesOfProducts = [];

//For eight major categories and brand pages
const showCategoryProducts = () => {

    const findSlash = document.URL.lastIndexOf('/');
    const findDot = document.URL.indexOf('.html');
    const root = document.URL.slice((findSlash + 1), findDot);
    
    let productsHTML = '';

    let categoryOne = '';
    let categoryTwo = '';
    let catalogPage = '';

    if (root === 'brick_slips') {
        categoryOne = 'Klinker brick slip';
        categoryTwo = 'Klinker corner brick slip';
    }
    else if (root === 'bricks') {
        categoryOne = 'Klinker brick';
    }
    else if (root === 'clay_pavers') {
        categoryOne = 'Klinker clay paver';
    }
    else if (root === 'fence_caps') {
        categoryOne = 'Ceramic fence cap';
    }
    else if (root === 'mortars') {
        categoryOne = 'Mortar';
    }
    else if (root === 'stair_and_floor_tile') {
        categoryOne = 'Klinker stair tile';
        categoryTwo = 'Klinker floor tile';
    }
    else if (root === 'thermopanels') {
        categoryOne = 'Thermopanel';
    }
    else if (root === 'window_sills') {
        categoryOne = 'Ceramic window sill';
    }
    else if (root === 'catalog') {
        catalogPage = 'Catalog'
    }

    if (categoryOne != '') {
        products.forEach((product, index) => {

            if (product.type === categoryOne || product.type === categoryTwo) {
    
                productsHTML += showProducts (product, index, indicesOfProducts);
            }
        });
    }
    else if (catalogPage != '') {
        products.forEach((product, index) => {

            productsHTML += showProducts (product, index, indicesOfProducts);
        });
    }
    else {

        if (root === 'feldhaus') {
            categoryOne = 'Feldhaus Klinker';
        }
        else if (root === 'stroeher') {
            categoryOne = 'Stroeher';
        }
        else if (root === 'roben') {
            categoryOne = 'Roben';
        }
        else if (root === 'abc-klinkergruppe') {
            categoryOne = 'ABC-Klinkergruppe';
        }
        else if (root === 'king-klinker') {
            categoryOne = 'King Klinker';
        }
        else if (root === 'zg-klinker') {
            categoryOne = 'ZG Clinker';
        }
        else if (root === 'quick-mix') {
            categoryOne = 'Quick-Mix';
        }
        else if (root === 'perel') {
            categoryOne = 'Perel';
        }

        products.forEach((product, index) => {

            if (product.specs.manufacturer === categoryOne) {
                productsHTML += showProducts (product, index, indicesOfProducts);
            }
        });
    }

    document.querySelector('.products').innerHTML = productsHTML;
    
    //Adding pulsing image animation on load
    addPulsingImageAnimation();
    
    //Adding onmouse image animation
    addOnMouseImageAnimation(indicesOfProducts);
}

function showProducts (product, index) {

    let productsHTML = '';
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
                        <img src="/bricks/images/icons/check.svg" class="stock"/>
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
                            <img src="/bricks/images/icons/check.svg" class="stock"/>
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
                            <img src="/bricks/images/icons/check.svg" class="stock"/>
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
                            <img src="/bricks/images/icons/check.svg" class="stock"/>
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
    return productsHTML;
}

function addOnMouseImageAnimation (indicesOfProducts) {
    
    document.querySelectorAll('.product')
    
        .forEach((product, index) => {

            const first = product.querySelector('.product_img_' + indicesOfProducts[index]);
            const second = product.querySelector('.product_img_second_' + indicesOfProducts[index]);

            second.addEventListener('load', () => {
                
                first.addEventListener('load', () => {

                    function moveLeft() {
                        first.classList.add('moveLeft');
                        second.classList.add('moveLeft');
                    }
        
                    function moveRight() {
                        first.classList.add('moveRight');
                        second.classList.add('moveRight');
                    }
        
                    product.addEventListener('mouseenter', () => {
            
                        first.classList.add('opacity');
                        second.classList.add('opacity');
                        let timeOut = setTimeout(moveLeft, 1000);
                        let timeOutBack = setTimeout(moveRight, 5000);
                    
                    product.addEventListener('mouseleave', () => {
            
                        clearTimeout(timeOut);
                        clearTimeout(timeOutBack);
                        moveRight();
            
                        first.classList.remove('opacity','moveLeft','moveRight');
                        second.classList.remove('opacity','moveLeft','moveRight');
                    });
                })
            })
        });
    });
}

function addPulsingImageAnimation () {

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