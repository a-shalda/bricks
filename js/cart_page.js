cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart);

let supplierPriceType = '';
const priceTotalLimit = 30000; //Used to set a celing on the order subtotal
const packsTotalLimit = 1000; //Used to set a celing on the order packs
let quantityPacks = 0;
let productTitle = '';
let productHTML = '';

let totalCostCart = 0;
let totalSquareMetersCart = 0;
let totalLinearMetersCart = 0;
let totalPacksCart = 0;
let totalPiecesCart = 0;
let totalWeightCart = 0;
let totalPalletsCart = 0;


function updateTotal () {

  let total = document.querySelector('.cart__checkout__subtotal');

  if (totalSquareMetersCart != 0 && totalLinearMetersCart != 0) {
    total.innerHTML = `<span class="cart__checkout__subtotal__bold">Total: €${totalCostCart}<br></span> ${totalSquareMetersCart} m<sup>2</sup>, ${totalLinearMetersCart} lin.m, ${totalPiecesCart} pcs, <br>${totalPacksCart} packs, ${totalWeightCart} kg, ${totalPalletsCart} pal`;
  }
  else if (totalSquareMetersCart != 0) {
    if (totalPacksCart === 0) {
      total.innerHTML = `<span class="cart__checkout__subtotal__bold">Total: €${totalCostCart}<br></span> ${totalSquareMetersCart} m<sup>2</sup>, ${totalPiecesCart} pcs, <br>${totalWeightCart} kg, ${totalPalletsCart} pal`;
    }
    else {
      total.innerHTML = `<span class="cart__checkout__subtotal__bold">Total: €${totalCostCart}<br></span> ${totalSquareMetersCart} m<sup>2</sup>, ${totalPiecesCart} pcs, <br>${totalPacksCart} packs, ${totalWeightCart} kg, ${totalPalletsCart} pal`;
    }
  }
  else if (totalLinearMetersCart != 0) {
    total.innerHTML = `<span class="cart__checkout__subtotal__bold">Total: €${totalCostCart}<br></span> ${totalLinearMetersCart} lin.m, ${totalPiecesCart} pcs, <br>${totalPacksCart} packs, ${totalWeightCart} kg, ${totalPalletsCart} pal`;
  }
  else if (totalPacksCart != 0) {
    total.innerHTML = `<span class="cart__checkout__subtotal__bold">Total: €${totalCostCart}<br></span> ${totalPiecesCart} pcs, <br>${totalPacksCart} packs, ${totalWeightCart} kg, ${totalPalletsCart} pal`;
  }
}

cart.forEach(item => {

  products.forEach(product => {

    if (product.id === item.id) {

      quantityPacks = item.quantity;
      supplierPriceType = product.supplierPriceType;
      productTitle = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format;

      //GENERATING PRICES
      let priceCentsM2 = product.priceCentsM2;
      let priceCentsPc = product.priceCentsPc;
      const piecesInSquareMeter = Number(product.specs.piecesInSquareMeterCm / 100);
      const piecesInPack = product.specs.piecesInPack;
      const piecesInLinearMeter = Number(product.specs.piecesInLinearMeterCm / 100);
      const isM2 = product.isM2;
      const isLinearMeter = product.isLinearMeter;
      let pricesHTML = '';

      //Calculating the options
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
        const pricePc = (Math.ceil((priceCentsM2 / piecesInSquareMeter).toFixed(4)) / 100).toFixed(2);
        const indexOfDotM2 = priceM2.toString().indexOf('.');
        const indexofDotPc = pricePc.toString().indexOf('.');

        let priceM2HTML = `<sup>€</sup>${priceM2.slice(0, indexOfDotM2)}<span class="price-small">${priceM2.slice(indexOfDotM2)}</span> <span class="price-desc">m<sup>2</sup></span>`;
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

        for (let i = 0; i < 1000; i++) {

          totalVolume = totalVolume + baseVolume;

          if (!Number.isInteger((piecesInPack / piecesInSquareMeter))) {totalVolume = Number(totalVolume.toFixed(2));}

          pieces = pieces + basePieces;
          price = (totalVolume * priceM2).toFixed(2);

          if (price >= priceTotalLimit) {break;}

          totalPallets = Number((totalVolume / squareMetersInPallet).toFixed(2));

          totalPacks++;
          totalWeight = Number((totalWeight + weight).toFixed(2));

          let priceLength = String(price).length;
          let priceModified = String(price);
          if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}

          if (totalPacks === quantityPacks) {

            totalCostCart = (Number(totalCostCart) + Number(price)).toFixed(2);
            totalSquareMetersCart = (Number(totalSquareMetersCart) + Number(totalVolume)).toFixed(2);
            totalPacksCart = (Number(totalPacksCart) + Number(totalPacks));
            totalPiecesCart = (Number(totalPiecesCart) + Number(pieces));
            totalWeightCart = (Number(totalWeightCart) + Number(totalWeight)).toFixed(2);
            totalPalletsCart = (Number(totalPalletsCart) + Number(totalPallets)).toFixed(2);
            updateTotal();

            productHTML += `
              <div class="cart__cont__product">
                <div class="cart__cont__product__image">
                  <a href="${product.filepath}">
                    <img class="cart__cont__product__image__img" src=${product.image_thumbnail[0]} alt='${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}' loading="lazy">
                  </a>
                </div>
                <div class="cart__cont__product__price">${pricesHTML}</div>
                <div class="cart__cont__product__vendor">
                  <p class="cart__cont__product__vendor__code">Code:&nbsp;</p>
                  <p class="cart__cont__product__vendor__id">${product.id}</p>
                </div>
                <div class="cart__cont__product__title">
                  <a href="${product.filepath}">
                    <p class="cart__cont__product__title__name">${productTitle}</p>
                  </a>
                </div>
                <div class="cart__cont__product__quantity">
                  <div class="cart__cont__product__quantity__modify">
                    <p class="cart__cont__product__quantity__packs">Packs: ${totalPacks}</p>

                    <div class="cart__cont__product__quantity__buttons">
                      <button class="cart__cont__product__quantity__buttons__minus">-</button>
                      <button class="cart__cont__product__quantity__buttons__plus">+</button>
                    </div>
                  </div>
                  <p class="cart__cont__product__quantity__qty">Quantity: ${totalVolume} m&sup2;</p>
                  <p class="cart__cont__product__quantity__pieces">Pieces: ${pieces}</p>
                  <p class="cart__cont__product__quantity__weight">Weight (kg): ${totalWeight}</p>
                  <p class="cart__cont__product__quantity__pallets">Pallets: ${totalPallets}</p>

                  <div class="cart__cont__product__quantity__sub-del">
                    <p class="cart__cont__product__quantity__subtotal">Subtotal: €${priceModified}</p>
                    <button class="cart__cont__product__quantity__delete">Delete</button>
                  </div>

                </div>
                <div class="cart__cont__product__save"></div>
                <div class="cart__cont__product__remove"></div>
              </div>
            `;
            break;
          }
        }
      }
      else if (supplierPriceType === 'pc') {

        if (isM2 === true && isLinearMeter === false) {

          const priceM2 = (Math.ceil((priceCentsPc * piecesInSquareMeter).toFixed(4)) / 100).toFixed(2);
          const pricePc = (priceCentsPc / 100).toFixed(2).toString();
          const indexOfDotM2 = priceM2.toString().indexOf('.');
          const indexofDotPc = pricePc.toString().indexOf('.');

          let priceM2HTML = `<sup>€</sup>${priceM2.slice(0, indexOfDotM2)}<span class="price-small">${priceM2.slice(indexOfDotM2)}</span> <span class="price-desc">m<sup>2</sup></span>`;
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
              
            for (let i = 0; i < 1000; i++) {
          
              totalVolume = totalVolume + baseVolume;
          
              if (!Number.isInteger((piecesInPack / piecesInSquareMeter))) {totalVolume = Number(totalVolume.toFixed(2));}
          
              pieces = pieces + basePieces;
              price = (pieces * pricePc).toFixed(2);
        
              totalPallets = Number((pieces / piecesInPallet).toFixed(2));
        
              totalPacks++;
              totalWeight = Number((totalWeight + weight).toFixed(2));
          
              let priceLength = String(price).length;
              let priceModified = String(price);
              if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
          
              if (totalPacks === quantityPacks) {

                totalCostCart = (Number(totalCostCart) + Number(price)).toFixed(2);
                totalSquareMetersCart = (Number(totalSquareMetersCart) + Number(totalVolume)).toFixed(2);
                totalPacksCart = (Number(totalPacksCart) + Number(totalPacks));
                totalPiecesCart = (Number(totalPiecesCart) + Number(pieces));
                totalWeightCart = (Number(totalWeightCart) + Number(totalWeight)).toFixed(2);
                totalPalletsCart = (Number(totalPalletsCart) + Number(totalPallets)).toFixed(2);
                updateTotal();

                productHTML += `
                  <div class="cart__cont__product">
                    <div class="cart__cont__product__image">
                      <a href="${product.filepath}">
                        <img class="cart__cont__product__image__img" src=${product.image_thumbnail[0]} alt='${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}' loading="lazy">
                      </a>
                    </div>
                    <div class="cart__cont__product__price">${pricesHTML}</div>
                    <div class="cart__cont__product__vendor">
                      <p class="cart__cont__product__vendor__code">Code:&nbsp;</p>
                      <p class="cart__cont__product__vendor__id">${product.id}</p>
                    </div>
                    <div class="cart__cont__product__title">
                      <a href="${product.filepath}">
                        <p class="cart__cont__product__title__name">${productTitle}</p>
                      </a>
                    </div>
                    <div class="cart__cont__product__quantity">
                      <div class="cart__cont__product__quantity__modify">
                        <p class="cart__cont__product__quantity__packs">Packs: ${totalPacks}</p>

                        <div class="cart__cont__product__quantity__buttons">
                          <button class="cart__cont__product__quantity__buttons__minus">-</button>
                          <button class="cart__cont__product__quantity__buttons__plus">+</button>
                        </div>
                      </div>
            
                      <p class="cart__cont__product__quantity__qty">Quantity: ${totalVolume} m&sup2;</p>
                      <p class="cart__cont__product__quantity__pieces">Pieces: ${pieces}</p>
                      <p class="cart__cont__product__quantity__weight">Weight (kg): ${totalWeight}</p>
                      <p class="cart__cont__product__quantity__pallets">Pallets: ${totalPallets}</p>

                      <div class="cart__cont__product__quantity__sub-del">
                        <p class="cart__cont__product__quantity__subtotal">Subtotal: €${priceModified}</p>
                        <button class="cart__cont__product__quantity__delete">Delete</button>
                      </div>
            
                    </div>
                    <div class="cart__cont__product__save"></div>
                    <div class="cart__cont__product__remove"></div>
                  </div>
                `;
                break;
              }
            }
          }
          else {
            baseVolume = Number((piecesInPallet / piecesInSquareMeter).toFixed(2));
            basePieces = piecesInPallet;
            
            for (let i = 0; i < 1000; i++) {

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
          
              if (totalPacks === quantityPacks) {

                totalCostCart = (Number(totalCostCart) + Number(price)).toFixed(2);
                totalSquareMetersCart = (Number(totalSquareMetersCart) + Number(totalVolume)).toFixed(2);
                totalPiecesCart = (Number(totalPiecesCart) + Number(pieces));
                totalWeightCart = (Number(totalWeightCart) + Number(totalWeight)).toFixed(2);
                totalPalletsCart = (Number(totalPalletsCart) + Number(totalPalletsNumber)).toFixed(2);
                updateTotal();

                productHTML += `
                  <div class="cart__cont__product">
                    <div class="cart__cont__product__image">
                      <a href="${product.filepath}">
                        <img class="cart__cont__product__image__img" src=${product.image_thumbnail[0]} alt='${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}' loading="lazy">
                      </a>
                    </div>
                    <div class="cart__cont__product__price">${pricesHTML}</div>
                    <div class="cart__cont__product__vendor">
                      <p class="cart__cont__product__vendor__code">Code:&nbsp;</p>
                      <p class="cart__cont__product__vendor__id">${product.id}</p>
                    </div>
                    <div class="cart__cont__product__title">
                      <a href="${product.filepath}">
                        <p class="cart__cont__product__title__name">${productTitle}</p>
                      </a>
                    </div>
                    <div class="cart__cont__product__quantity">
                      
                      <div class="cart__cont__product__quantity__modify">
                        <p class="cart__cont__product__quantity__pallets">Pallets: ${totalPalletsNumber}</p>

                        <div class="cart__cont__product__quantity__buttons">
                          <button class="cart__cont__product__quantity__buttons__minus">-</button>
                          <button class="cart__cont__product__quantity__buttons__plus">+</button>
                        </div>
                      </div>
      
                      <p class="cart__cont__product__quantity__qty">Quantity: ${totalVolume} m&sup2;</p>
                      <p class="cart__cont__product__quantity__pieces">Pieces: ${pieces}</p>
                      <p class="cart__cont__product__quantity__weight">Weight (kg): ${totalWeight}</p>
                      <div class="cart__cont__product__quantity__sub-del">
                        <p class="cart__cont__product__quantity__subtotal">Subtotal: €${priceModified}</p>
                        <button class="cart__cont__product__quantity__delete">Delete</button>
                      </div>
            
                    </div>
                    <div class="cart__cont__product__save"></div>
                    <div class="cart__cont__product__remove"></div>
                  </div>
                `;
                break;
              }
            }
          }
        }
        else if (isM2 === false && isLinearMeter === true) {

          const priceLM = (Math.ceil((priceCentsPc * piecesInLinearMeter).toFixed(4)) / 100).toFixed(2).toString();
          const pricePc = (priceCentsPc / 100).toFixed(2).toString();
          const indexOfDotLM = priceLM.toString().indexOf('.');
          const indexofDotPc = pricePc.toString().indexOf('.');

          let priceLMHTML = `<sup>€</sup>${priceLM.slice(0, indexOfDotLM)}<span class="price-small">${priceLM.slice(indexOfDotLM)}</span> <span class="price-desc">lin.m</span>`;
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
          
          for (let i = 0; i < 1000; i++) {
        
            totalVolume = totalVolume + baseVolume;
        
            if (!Number.isInteger((piecesInPack / piecesInLinearMeter))) {totalVolume = Number(totalVolume.toFixed(2));}
        
            pieces = pieces + basePieces;
            price = (pieces * pricePc).toFixed(2);

            totalPallets = Number((pieces / piecesInPallet).toFixed(2));

            totalPacks++;
            totalWeight = Number((totalWeight + weight).toFixed(2));
        
            let priceLength = String(price).length;
            let priceModified = String(price);
            if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}

            if (totalPacks === quantityPacks) {

              totalCostCart = (Number(totalCostCart) + Number(price)).toFixed(2);
              totalLinearMetersCart = (Number(totalLinearMetersCart) + Number(totalVolume)).toFixed(2);
              totalPacksCart = (Number(totalPacksCart) + Number(totalPacks));
              totalPiecesCart = (Number(totalPiecesCart) + Number(pieces));
              totalWeightCart = (Number(totalWeightCart) + Number(totalWeight)).toFixed(2);
              totalPalletsCart = (Number(totalPalletsCart) + Number(totalPallets)).toFixed(2);
              updateTotal();

              productHTML += `
                <div class="cart__cont__product">
                  <div class="cart__cont__product__image">
                    <a href="${product.filepath}">
                      <img class="cart__cont__product__image__img" src=${product.image_thumbnail[0]} alt='${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}' loading="lazy">
                    </a>
                  </div>
                  <div class="cart__cont__product__price">${pricesHTML}</div>
                  <div class="cart__cont__product__vendor">
                    <p class="cart__cont__product__vendor__code">Code:&nbsp;</p>
                    <p class="cart__cont__product__vendor__id">${product.id}</p>
                  </div>
                  <div class="cart__cont__product__title">
                    <a href="${product.filepath}">
                      <p class="cart__cont__product__title__name">${productTitle}</p>
                    </a>
                  </div>
                  <div class="cart__cont__product__quantity">

                    <div class="cart__cont__product__quantity__modify">
                      <p class="cart__cont__product__quantity__packs">Packs: ${totalPacks}</p>

                      <div class="cart__cont__product__quantity__buttons">
                        <button class="cart__cont__product__quantity__buttons__minus">-</button>
                        <button class="cart__cont__product__quantity__buttons__plus">+</button>
                      </div>
                    </div>
          
                    <p class="cart__cont__product__quantity__qty">Quantity: ${totalVolume} lin.m</p>
                    <p class="cart__cont__product__quantity__pieces">Pieces: ${pieces}</p>
                    <p class="cart__cont__product__quantity__weight">Weight (kg): ${totalWeight}</p>
                    <p class="cart__cont__product__quantity__pallets">Pallets: ${totalPallets}</p>
              
                    <div class="cart__cont__product__quantity__sub-del">
                      <p class="cart__cont__product__quantity__subtotal">Subtotal: €${priceModified}</p>
                      <button class="cart__cont__product__quantity__delete">Delete</button>
                    </div>
          
                  </div>
                  <div class="cart__cont__product__save"></div>
                  <div class="cart__cont__product__remove"></div>
                </div>
              `;
              break;
            }
          }
        }
        else if (isM2 === false && isLinearMeter === false) {

          //This type of product is sold by 1 piece

          const pricePc = (priceCentsPc / 100).toFixed(2).toString();
          const indexofDotPc = pricePc.toString().indexOf('.');

          let pricePcHTML = `<sup>€</sup>${pricePc.slice(0, indexofDotPc)}<span class="price-small">${pricePc.slice(indexofDotPc)}</span> <span class="price-desc">pc</span>`;

          pricesHTML = `
            <div class="main__window__middle__top__price__left">
              <p class="main__window__middle__top__price__left__box">${pricePcHTML}</p>
            </div>
          `;
        
          //Calculating the options
          baseVolume = 1;
          basePieces = 1;
          
          for (let i = 0; i < 1000; i++) {
        
            totalVolume = totalVolume + baseVolume;
          
            pieces = pieces + basePieces;
            price = (pieces * pricePc).toFixed(2);

            totalPallets = Number((pieces / piecesInPallet).toFixed(2));

            totalPacks++;
            totalWeight = Number((totalWeight + weight).toFixed(2));
        
            let priceLength = String(price).length;
            let priceModified = String(price);
            if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
        
            let piecesModified = '';
            if (pieces === 1) {piecesModified = pieces + ` pc`;}
            else {piecesModified = pieces + ` pcs`;}
          
            if (totalPacks === quantityPacks) {

              totalCostCart = (Number(totalCostCart) + Number(price)).toFixed(2);
              totalPacksCart = (Number(totalPacksCart) + Number(totalPacks));
              totalPiecesCart = (Number(totalPiecesCart) + Number(pieces));
              totalWeightCart = (Number(totalWeightCart) + Number(totalWeight)).toFixed(2);
              totalPalletsCart = (Number(totalPalletsCart) + Number(totalPallets)).toFixed(2);
              updateTotal();

              productHTML += `
                <div class="cart__cont__product">
                  <div class="cart__cont__product__image">
                    <a href="${product.filepath}">
                      <img class="cart__cont__product__image__img" src=${product.image_thumbnail[0]} alt='${product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format}' loading="lazy">
                    </a>
                  </div>
                  <div class="cart__cont__product__price">${pricesHTML}</div>
                    <div class="cart__cont__product__vendor">
                    <p class="cart__cont__product__vendor__code">Code:&nbsp;</p>
                  <p class="cart__cont__product__vendor__id">${product.id}</p>
                  </div>
                  <div class="cart__cont__product__title">
                    <a href="${product.filepath}">
                      <p class="cart__cont__product__title__name">${productTitle}</p>
                    </a>
                  </div>
                  <div class="cart__cont__product__quantity">

                    <div class="cart__cont__product__quantity__modify">
                      <p class="cart__cont__product__quantity__qty">Quantity: ${piecesModified}</p>

                      <div class="cart__cont__product__quantity__buttons">
                        <button class="cart__cont__product__quantity__buttons__minus">-</button>
                        <button class="cart__cont__product__quantity__buttons__plus">+</button>
                      </div>
                    </div>

                    <p class="cart__cont__product__quantity__packs">Packs: ${totalPacks}</p>
                    <p class="cart__cont__product__quantity__weight">Weight (kg): ${totalWeight}</p>
                    <p class="cart__cont__product__quantity__pallets">Pallets: ${totalPallets}</p>
              
                    <div class="cart__cont__product__quantity__sub-del">
                      <p class="cart__cont__product__quantity__subtotal">Subtotal: €${priceModified}</p>
                      <button class="cart__cont__product__quantity__delete">Delete</button>
                    </div>
          
                  </div>
                  <div class="cart__cont__product__save"></div>
                  <div class="cart__cont__product__remove"></div>
                </div>
              `;
              break;
            }
          }
        }
      }          
    }
  })
});

document.querySelector('.cart__cont').innerHTML = productHTML;



//MODIFYING THE QUANTITY

let modifyQuantity = document.querySelectorAll('.cart__cont__product');

modifyQuantity.forEach((item, index) => {

  const id = item.querySelector('.cart__cont__product__vendor__id').innerHTML;

  item.querySelector('.cart__cont__product__quantity__delete').addEventListener('click', () => {
    cart.splice(index, 1);
    item.classList.add('hide_product');
    localStorage.setItem('cart', JSON.stringify(cart));
  });

  item.querySelector('.cart__cont__product__quantity__buttons__minus').addEventListener('click', () => {

    if (cart[index].quantity >= 1) {
      cart[index].quantity--;

      let updatedQuantity = cart[index].quantity;
      
      if (updatedQuantity === 0) {
        cart.splice(index, 1);
        item.classList.add('hide_product');
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      products.forEach(product => {
    
        if (product.id === id) {
    
          quantityPacks = updatedQuantity;
          supplierPriceType = product.supplierPriceType;
          productTitle = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format;
    
          //GENERATING PRICES
          let priceCentsM2 = product.priceCentsM2;
          let priceCentsPc = product.priceCentsPc;
          const piecesInSquareMeter = Number(product.specs.piecesInSquareMeterCm / 100);
          const piecesInPack = product.specs.piecesInPack;
          const piecesInLinearMeter = Number(product.specs.piecesInLinearMeterCm / 100);
          const isM2 = product.isM2;
          const isLinearMeter = product.isLinearMeter;
    
          //Calculating the options
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
    
            //Calculating the options
    
            if ((piecesInPack % piecesInSquareMeter) === 0) {baseVolume = (piecesInPack / piecesInSquareMeter);}
            else {baseVolume = Number((piecesInPack / piecesInSquareMeter).toFixed(2));}
    
            for (let i = 0; i < 1000; i++) {
    
              totalVolume = totalVolume + baseVolume;
    
              if (!Number.isInteger((piecesInPack / piecesInSquareMeter))) {totalVolume = Number(totalVolume.toFixed(2));}
    
              pieces = pieces + basePieces;
              price = (totalVolume * priceM2).toFixed(2);
    
              if (price >= priceTotalLimit) {break;}
    
              totalPallets = Number((totalVolume / squareMetersInPallet).toFixed(2));
    
              totalPacks++;
              totalWeight = Number((totalWeight + weight).toFixed(2));
    
              let priceLength = String(price).length;
              let priceModified = String(price);
              if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
    
              if (totalPacks === quantityPacks) {
                item.querySelector('.cart__cont__product__quantity__qty').innerHTML = `Quantity: ${totalVolume} m&sup2;`;
                item.querySelector('.cart__cont__product__quantity__packs').innerHTML = `Packs: ${totalPacks}`;
                item.querySelector('.cart__cont__product__quantity__pieces').innerHTML = `Pieces: ${pieces}`;
                item.querySelector('.cart__cont__product__quantity__pallets').innerHTML = `Pallets: ${totalPallets}`;
                item.querySelector('.cart__cont__product__quantity__weight').innerHTML = `Weight (kg): ${totalWeight}`;
                item.querySelector('.cart__cont__product__quantity__subtotal').innerHTML = `Subtotal: €${priceModified}`;
                break;
              }
            }
          }
          else if (supplierPriceType === 'pc') {
    
            if (isM2 === true && isLinearMeter === false) {
    
              const pricePc = (priceCentsPc / 100).toFixed(2).toString();
            
              //Calculating the options
    
              if (productType !== 'Klinker brick' && productType !== 'Klinker clay paver') {
                if ((piecesInPack % piecesInSquareMeter) === 0) {baseVolume = (piecesInPack / piecesInSquareMeter);}
                else {baseVolume = Number((piecesInPack / piecesInSquareMeter).toFixed(2));}
                  
                for (let i = 0; i < 1000; i++) {
    
                  if (price >= priceTotalLimit) {break;}
              
                  totalVolume = totalVolume + baseVolume;
              
                  if (!Number.isInteger((piecesInPack / piecesInSquareMeter))) {totalVolume = Number(totalVolume.toFixed(2));}
              
                  pieces = pieces + basePieces;
                  price = (pieces * pricePc).toFixed(2);
            
                  totalPallets = Number((pieces / piecesInPallet).toFixed(2));
            
                  totalPacks++;
                  totalWeight = Number((totalWeight + weight).toFixed(2));
              
                  let priceLength = String(price).length;
                  let priceModified = String(price);
                  if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
              
                  if (totalPacks === quantityPacks) {
                    item.querySelector('.cart__cont__product__quantity__qty').innerHTML = `Quantity: ${totalVolume} m&sup2;`;
                    item.querySelector('.cart__cont__product__quantity__packs').innerHTML = `Packs: ${totalPacks}`;
                    item.querySelector('.cart__cont__product__quantity__pieces').innerHTML = `Pieces: ${pieces}`;
                    item.querySelector('.cart__cont__product__quantity__pallets').innerHTML = `Pallets: ${totalPallets}`;
                    item.querySelector('.cart__cont__product__quantity__weight').innerHTML = `Weight (kg): ${totalWeight}`;
                    item.querySelector('.cart__cont__product__quantity__subtotal').innerHTML = `Subtotal: €${priceModified}`;
                    break;
                  }
                }
              }
              else {
                baseVolume = Number((piecesInPallet / piecesInSquareMeter).toFixed(2));
                basePieces = piecesInPallet;
                
                for (let i = 0; i < 1000; i++) {
    
                  if (price >= priceTotalLimit) {break;}
    
                  totalVolume = Number((totalVolume + baseVolume).toFixed(2));
                  
                  pieces = pieces + basePieces;
                  price = (pieces * pricePc).toFixed(2);
    
                  totalPallets = Number((pieces / piecesInPallet).toFixed(2));
                  totalPacks = totalPallets;
              
                  totalWeight = Number((totalWeight + (weightOf1Piece * piecesInPallet)).toFixed(2));
              
                  let priceLength = String(price).length;
                  let priceModified = String(price);
                  if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
              
                  if (totalPacks === quantityPacks) {
                    item.querySelector('.cart__cont__product__quantity__qty').innerHTML = `Quantity: ${totalVolume} m&sup2;`;
                    item.querySelector('.cart__cont__product__quantity__pieces').innerHTML = `Pieces: ${pieces}`;
                    item.querySelector('.cart__cont__product__quantity__pallets').innerHTML = `Pallets: ${totalPallets}`;
                    item.querySelector('.cart__cont__product__quantity__weight').innerHTML = `Weight (kg): ${totalWeight}`;
                    item.querySelector('.cart__cont__product__quantity__subtotal').innerHTML = `Subtotal: €${priceModified}`;
                    break;
                  }
                }
              }
            }
            else if (isM2 === false && isLinearMeter === true) {
    
              const pricePc = (priceCentsPc / 100).toFixed(2).toString();
    
              //Calculating the options
    
              if ((piecesInPack % piecesInLinearMeter) === 0) {baseVolume = (piecesInPack / piecesInLinearMeter);}
              else {baseVolume = Number((piecesInPack / piecesInLinearMeter).toFixed(2));}
              
              for (let i = 0; i < 1000; i++) {

                totalPacks++;

                totalVolume = totalVolume + baseVolume;

                if (price >= priceTotalLimit) {break;}
            
                if (!Number.isInteger((piecesInPack / piecesInLinearMeter))) {totalVolume = Number(totalVolume.toFixed(2));}
            
                pieces = pieces + basePieces;
                price = (pieces * pricePc).toFixed(2);
    
                totalPallets = Number((pieces / piecesInPallet).toFixed(2));
    
                totalWeight = Number((totalWeight + weight).toFixed(2));
            
                let priceLength = String(price).length;
                let priceModified = String(price);
                if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
    
                if (totalPacks === quantityPacks) {
                  item.querySelector('.cart__cont__product__quantity__qty').innerHTML = `Quantity: ${totalVolume} lin.m`;
                  item.querySelector('.cart__cont__product__quantity__packs').innerHTML = `Packs: ${totalPacks}`;
                  item.querySelector('.cart__cont__product__quantity__pieces').innerHTML = `Pieces: ${pieces}`;
                  item.querySelector('.cart__cont__product__quantity__pallets').innerHTML = `Pallets: ${totalPallets}`;
                  item.querySelector('.cart__cont__product__quantity__weight').innerHTML = `Weight (kg): ${totalWeight}`;
                  item.querySelector('.cart__cont__product__quantity__subtotal').innerHTML = `Subtotal: €${priceModified}`;
                  break;
                }
              }
            }
            else if (isM2 === false && isLinearMeter === false) {
    
              //This type of product is sold by 1 piece
    
              const pricePc = (priceCentsPc / 100).toFixed(2).toString();

              //Calculating the options
              baseVolume = 1;
              basePieces = 1;
              
              for (let i = 0; i < 1000; i++) {
            
                totalVolume = totalVolume + baseVolume;
              
                pieces = pieces + basePieces;
                price = (pieces * pricePc).toFixed(2);
    
                if (price >= priceTotalLimit) {break;}
    
                totalPallets = Number((pieces / piecesInPallet).toFixed(2));
    
                totalPacks++;
                totalWeight = Number((totalWeight + weight).toFixed(2));
            
                let priceLength = String(price).length;
                let priceModified = String(price);
                if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
            
                let piecesModified = '';
                if (pieces === 1) {piecesModified = pieces + ` pc`;}
                else {piecesModified = pieces + ` pcs`;}
            
                if (totalPacks === quantityPacks) {
                  item.querySelector('.cart__cont__product__quantity__qty').innerHTML = `Quantity: ${piecesModified}`;
                  item.querySelector('.cart__cont__product__quantity__packs').innerHTML = `Packs: ${pieces}`;
                  item.querySelector('.cart__cont__product__quantity__pallets').innerHTML = `Pallets: ${totalPallets}`;
                  item.querySelector('.cart__cont__product__quantity__weight').innerHTML = `Weight (kg): ${totalWeight}`;
                  item.querySelector('.cart__cont__product__quantity__subtotal').innerHTML = `Subtotal: €${priceModified}`;
                  break;
                }
              }
            }
          }          
        }
      })
    }
  })

  item.querySelector('.cart__cont__product__quantity__buttons__plus').addEventListener('click', () => {

    if (cart[index].quantity < packsTotalLimit) {
      cart[index].quantity++;

      let updatedQuantity = cart[index].quantity;

      localStorage.setItem('cart', JSON.stringify(cart));

      products.forEach(product => {
    
        if (product.id === id) {
    
          quantityPacks = updatedQuantity;
          supplierPriceType = product.supplierPriceType;
          productTitle = product.type + ' ' + product.specs.manufacturer + ' ' + product.name + ' ' + product.specs.format;
    
          //GENERATING PRICES
          let priceCentsM2 = product.priceCentsM2;
          let priceCentsPc = product.priceCentsPc;
          const piecesInSquareMeter = Number(product.specs.piecesInSquareMeterCm / 100);
          const piecesInPack = product.specs.piecesInPack;
          const piecesInLinearMeter = Number(product.specs.piecesInLinearMeterCm / 100);
          const isM2 = product.isM2;
          const isLinearMeter = product.isLinearMeter;
    
          //Calculating the options
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
    
            //Calculating the options
    
            if ((piecesInPack % piecesInSquareMeter) === 0) {baseVolume = (piecesInPack / piecesInSquareMeter);}
            else {baseVolume = Number((piecesInPack / piecesInSquareMeter).toFixed(2));}
    
            for (let i = 0; i < 1000; i++) {
              
              totalVolume = totalVolume + baseVolume;
    
              if (!Number.isInteger((piecesInPack / piecesInSquareMeter))) {totalVolume = Number(totalVolume.toFixed(2));}
    
              pieces = pieces + basePieces;
              price = (totalVolume * priceM2).toFixed(2);
    
              if (price >= priceTotalLimit) {break;}
    
              totalPallets = Number((totalVolume / squareMetersInPallet).toFixed(2));
    
              totalPacks++;
              totalWeight = Number((totalWeight + weight).toFixed(2));
    
              let priceLength = String(price).length;
              let priceModified = String(price);
              if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
    
              if (totalPacks >= packsTotalLimit) {break;}

              if (totalPacks === quantityPacks) {
                item.querySelector('.cart__cont__product__quantity__qty').innerHTML = `Quantity: ${totalVolume} m&sup2;`;
                item.querySelector('.cart__cont__product__quantity__packs').innerHTML = `Packs: ${totalPacks}`;
                item.querySelector('.cart__cont__product__quantity__pieces').innerHTML = `Pieces: ${pieces}`;
                item.querySelector('.cart__cont__product__quantity__pallets').innerHTML = `Pallets: ${totalPallets}`;
                item.querySelector('.cart__cont__product__quantity__weight').innerHTML = `Weight (kg): ${totalWeight}`;
                item.querySelector('.cart__cont__product__quantity__subtotal').innerHTML = `Subtotal: €${priceModified}`;
                break;
              }
            }
          }
          else if (supplierPriceType === 'pc') {
    
            if (isM2 === true && isLinearMeter === false) {
    
              const pricePc = (priceCentsPc / 100).toFixed(2).toString();
            
              //Calculating the options
    
              if (productType !== 'Klinker brick' && productType !== 'Klinker clay paver') {
                if ((piecesInPack % piecesInSquareMeter) === 0) {baseVolume = (piecesInPack / piecesInSquareMeter);}
                else {baseVolume = Number((piecesInPack / piecesInSquareMeter).toFixed(2));}
                  
                for (let i = 0; i < 1000; i++) {
    
                  if (price >= priceTotalLimit) {break;}
              
                  totalVolume = totalVolume + baseVolume;
              
                  if (!Number.isInteger((piecesInPack / piecesInSquareMeter))) {totalVolume = Number(totalVolume.toFixed(2));}
              
                  pieces = pieces + basePieces;
                  price = (pieces * pricePc).toFixed(2);
            
                  totalPallets = Number((pieces / piecesInPallet).toFixed(2));
            
                  totalPacks++;
                  totalWeight = Number((totalWeight + weight).toFixed(2));
              
                  let priceLength = String(price).length;
                  let priceModified = String(price);
                  if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
              
                  if (totalPacks >= packsTotalLimit) {break;}

                  if (totalPacks === quantityPacks) {
                    item.querySelector('.cart__cont__product__quantity__qty').innerHTML = `Quantity: ${totalVolume} m&sup2;`;
                    item.querySelector('.cart__cont__product__quantity__packs').innerHTML = `Packs: ${totalPacks}`;
                    item.querySelector('.cart__cont__product__quantity__pieces').innerHTML = `Pieces: ${pieces}`;
                    item.querySelector('.cart__cont__product__quantity__pallets').innerHTML = `Pallets: ${totalPallets}`;
                    item.querySelector('.cart__cont__product__quantity__weight').innerHTML = `Weight (kg): ${totalWeight}`;
                    item.querySelector('.cart__cont__product__quantity__subtotal').innerHTML = `Subtotal: €${priceModified}`;
                    break;
                  }
                }
              }
              else {
                baseVolume = Number((piecesInPallet / piecesInSquareMeter).toFixed(2));
                basePieces = piecesInPallet;
                
                for (let i = 0; i < 1000; i++) {
    
                  if (price >= priceTotalLimit) {break;}
    
                  totalVolume = Number((totalVolume + baseVolume).toFixed(2));
                  
                  pieces = pieces + basePieces;
                  price = (pieces * pricePc).toFixed(2);
    
                  totalPallets = Number((pieces / piecesInPallet).toFixed(2));
                  totalPacks = totalPallets;
              
                  totalWeight = Number((totalWeight + (weightOf1Piece * piecesInPallet)).toFixed(2));
              
                  let priceLength = String(price).length;
                  let priceModified = String(price);
                  if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
              
                  if (totalPacks >= packsTotalLimit) {break;}

                  if (totalPacks === quantityPacks) {
                    item.querySelector('.cart__cont__product__quantity__qty').innerHTML = `Quantity: ${totalVolume} m&sup2;`;
                    item.querySelector('.cart__cont__product__quantity__pieces').innerHTML = `Pieces: ${pieces}`;
                    item.querySelector('.cart__cont__product__quantity__pallets').innerHTML = `Pallets: ${totalPallets}`;
                    item.querySelector('.cart__cont__product__quantity__weight').innerHTML = `Weight (kg): ${totalWeight}`;
                    item.querySelector('.cart__cont__product__quantity__subtotal').innerHTML = `Subtotal: €${priceModified}`;
                    break;
                  }
                }
              }
            }
            else if (isM2 === false && isLinearMeter === true) {
    
              const pricePc = (priceCentsPc / 100).toFixed(2).toString();
    
              //Calculating the options
    
              if ((piecesInPack % piecesInLinearMeter) === 0) {baseVolume = (piecesInPack / piecesInLinearMeter);}
              else {baseVolume = Number((piecesInPack / piecesInLinearMeter).toFixed(2));}
              
              for (let i = 0; i < 1000; i++) {

                totalPacks++;

                totalVolume = totalVolume + baseVolume;

                if (price >= priceTotalLimit) {break;}
            
                if (!Number.isInteger((piecesInPack / piecesInLinearMeter))) {totalVolume = Number(totalVolume.toFixed(2));}
            
                pieces = pieces + basePieces;
                price = (pieces * pricePc).toFixed(2);
    
                totalPallets = Number((pieces / piecesInPallet).toFixed(2));
    
                totalWeight = Number((totalWeight + weight).toFixed(2));
            
                let priceLength = String(price).length;
                let priceModified = String(price);
                if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
    
                if (totalPacks >= packsTotalLimit) {break;}

                if (totalPacks === quantityPacks) {
                  item.querySelector('.cart__cont__product__quantity__qty').innerHTML = `Quantity: ${totalVolume} lin.m`;
                  item.querySelector('.cart__cont__product__quantity__packs').innerHTML = `Packs: ${totalPacks}`;
                  item.querySelector('.cart__cont__product__quantity__pieces').innerHTML = `Pieces: ${pieces}`;
                  item.querySelector('.cart__cont__product__quantity__pallets').innerHTML = `Pallets: ${totalPallets}`;
                  item.querySelector('.cart__cont__product__quantity__weight').innerHTML = `Weight (kg): ${totalWeight}`;
                  item.querySelector('.cart__cont__product__quantity__subtotal').innerHTML = `Subtotal: €${priceModified}`;
                  break;
                }
              }
            }
            else if (isM2 === false && isLinearMeter === false) {
    
              //This type of product is sold by 1 piece
    
              const pricePc = (priceCentsPc / 100).toFixed(2).toString();

              //Calculating the options
              baseVolume = 1;
              basePieces = 1;
              
              for (let i = 0; i < 1000; i++) {
            
                totalVolume = totalVolume + baseVolume;
              
                pieces = pieces + basePieces;
                price = (pieces * pricePc).toFixed(2);
    
                if (price >= priceTotalLimit) {break;}
    
                totalPallets = Number((pieces / piecesInPallet).toFixed(2));
    
                totalPacks++;
                totalWeight = Number((totalWeight + weight).toFixed(2));
            
                let priceLength = String(price).length;
                let priceModified = String(price);
                if (priceLength > 6) {priceModified = priceModified.replace(priceModified.slice(-6), ',' + priceModified.slice(-6));}
            
                let piecesModified = '';
                if (pieces === 1) {piecesModified = pieces + ` pc`;}
                else {piecesModified = pieces + ` pcs`;}
            
                if (totalPacks >= packsTotalLimit) {break;}

                if (totalPacks === quantityPacks) {
                  item.querySelector('.cart__cont__product__quantity__qty').innerHTML = `Quantity: ${piecesModified}`;
                  item.querySelector('.cart__cont__product__quantity__packs').innerHTML = `Packs: ${pieces}`;
                  item.querySelector('.cart__cont__product__quantity__pallets').innerHTML = `Pallets: ${totalPallets}`;
                  item.querySelector('.cart__cont__product__quantity__weight').innerHTML = `Weight (kg): ${totalWeight}`;
                  item.querySelector('.cart__cont__product__quantity__subtotal').innerHTML = `Subtotal: €${priceModified}`;
                  break;
                }
              }
            }
          }          
        }
      })
    }
  })
})