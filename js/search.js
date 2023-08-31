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

    //Generating products on the page
    generateProducts();

    //Adding pulsing image animation on load
    addPulsingImageAnimation();

    //Adding onmouse image animation
    addOnMouseImageAnimation (indicesOfProducts);       

  }, 300);

})


let indicesOfProducts = [];

function generateProducts () {

  indicesOfProducts = [];

  resultArray.forEach(result => {

    products.forEach((product, index) => {

        if (result === product.id) {

            productsHTML += showProducts(product, index, indicesOfProducts);
        }
    });
  })

  searchResult.innerHTML = productsHTML;
  searchResult.classList.add('search--not-blurred');
}

//Adding or removing focus on input

searchField.addEventListener('focus', () => {
  document.querySelector('.search').classList.add('search__focus');
})

searchField.addEventListener('focusout', () => {
  document.querySelector('.search').classList.remove('search__focus');
})