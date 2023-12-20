//Generating products on the page
let productsHTML = '';

wishlist.forEach(wish => {

    products.forEach((product, index) => {

        if (wish.id === product.id) {
            
            productsHTML += showProducts(product, index, indicesOfProducts);
        }
    });
})
document.querySelector('.products').innerHTML = productsHTML;

//Adding pulsing image animation on load
addPulsingImageAnimation();

//Adding onmouse image animation
addOnMouseImageAnimation (indicesOfProducts);