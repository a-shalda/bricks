cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart);
console.log(typeof(cart));

let jsonPurchase;

for (const [key, value] of Object.entries(cart)) {
  console.log(`${key}: ${value}`);
}


let productHTML = '';


cart.forEach(item => {


  products.forEach(product => {

    if (product.id === item.id) {



      // const priceM2 = ((initialPrice / 100).toFixed(2));
      // const pricePc = ((initialPrice / 100) / Number(piecesInM2)).toFixed(2);
      // const indexOfDotM2 = ((initialPrice / 100).toFixed(2)).toString().indexOf('.');
      // const indexofDotPc = ((initialPrice / 100) / Number(piecesInM2)).toFixed(2).toString().indexOf('.');

      let price;

      if (item.originalTypeOfPrice === 'm2') {

        if (item.type === 'm2') {
          price = product.priceCentsM2;
        }
        else if (item.type === 'pc') {
          price = (product.priceCentsM2 / product.specs.piecesInASquareMeter / 100).toFixed(2);
        }
        else if (item.type === 'pack') {
          price = ((product.priceCentsM2 / product.specs.piecesInASquareMeter * product.specs.piecesInAPack) / 100).toFixed(2);
        }
      }
      else if (item.originalTypeOfPrice === 'pc') {

        if (item.type === 'pc') {

        }
        else if (item.type === 'pack') {

        }
      }




      productHTML += `
        <div class="cart__main__product">
          <div class="cart__main__product__image">
            <img class="cart__main__product__image__img" src=${product.image} alt='${product.name}' loading="lazy">
          </div>
          <div class="cart__main__product__title">
            <p class="cart__main__product__title__name">${product.name}</p>
          </div>
          <div class="cart__main__product__quantity">
            <p class="cart__main__product__quantity__qty">${item.quantity}</p>
          </div>
          <div class="cart__main__product__price">
          <p class="cart__main__product__price">${price}</p>
          </div>
          <div class="cart__main__product__save"></div>
          <div class="cart__main__product__remove"></div>
        </div>
      `
    }
  })
});

document.querySelector('.cart').innerHTML = productHTML;


