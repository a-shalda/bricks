cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart);
console.log(typeof(cart));


let productHTML = '';

cart.forEach(item => {


  products.forEach(product => {

    if (product.id === item.id) {

      let price;
      let subTotal;
      let type;

      if (item.originalTypeOfPrice === 'm2') {

        if (item.type === 'm2') {
          price = product.priceCentsM2 / 100;
          subTotal = (price * item.quantity).toFixed(2);

          if (item.quantity === 1) {
            type = ' square meter';
          }
          else {
            type = ' square meters';
          }
        }
        else if (item.type === 'pc') {
          price = (Math.ceil((product.priceCentsM2 / product.specs.piecesInASquareMeter ).toFixed(4)) / 100).toFixed(2);
          subTotal = (Math.ceil((product.priceCentsM2 / product.specs.piecesInASquareMeter * item.quantity).toFixed(4)) / 100).toFixed(2);
          
          if (item.quantity === 1) {
            type = ' piece';
          }
          else {
            type = ' pieces';
          }
        }
        else if (item.type === 'pack') {
          price = (Math.ceil((product.priceCentsM2 / product.specs.piecesInASquareMeter * product.specs.piecesInAPack)).toFixed(4) / 100).toFixed(2);
          subTotal = ((Math.ceil(product.priceCentsM2 / product.specs.piecesInASquareMeter * product.specs.piecesInAPack * item.quantity).toFixed(4)) / 100).toFixed(2);
          
          if (item.quantity === 1) {
            type = ' pack';
          }
          else {
            type = ' packs';
          }
        }
      }
      else if (item.originalTypeOfPrice === 'pc') {

        if (item.type === 'pc') {
          price = product.priceCentsPC / 100;
          subTotal = (price * item.quantity).toFixed(2);

          if (item.quantity === 1) {
            type = ' piece';
          }
          else {
            type = ' pieces';
          }
        }
        else if (item.type === 'pack') {
          price = (product.priceCentsPC * product.specs.piecesInAPack / 100).toFixed(2);
          subTotal = (price * item.quantity).toFixed(2);

          if (item.quantity === 1) {
            type = ' pack';
          }
          else {
            type = ' packs';
          }
        }
      }

      productHTML += `
        <div class="cart__cont__product">
          <div class="cart__cont__product__image">
            <img class="cart__cont__product__image__img" src=${product.image} alt='${product.name}' loading="lazy">
          </div>
          <div class="cart__cont__product__title">
            <p class="cart__cont__product__title__name">${product.name}</p>
          </div>
          <div class="cart__cont__product__quantity">
            <p class="cart__cont__product__quantity__qty">${item.quantity + type}</p>
          </div>
          <div class="cart__cont__product__price">
            <p class="cart__cont__product__price__per">${price}</p>
          </div>
          <div class="cart__cont__product__price">
            <p class="cart__cont__product__price__subtotal">${subTotal}</p>
          </div>
          <div class="cart__cont__product__save"></div>
          <div class="cart__cont__product__remove"></div>
        </div>
      `
    }
  })
});

document.querySelector('.cart__cont').innerHTML = productHTML;