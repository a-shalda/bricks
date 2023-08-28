const searchField = document.querySelector('.header__upper__right__search__form');
searchField.value = '';
const searchResult = document.querySelector('.main__window__middle__bottom');

searchField.addEventListener('keydown', () => {

  let resultArray = [];
  let resultHTML = '';

  for (let i = 0; i < products.length; i++) {
    
    const input = (searchField.value).toLowerCase();

    const id = (products[i].id).toLowerCase();
    const name = (products[i].name).toLowerCase();
    const manufacturer = (products[i].specs?.manufacturer).toLowerCase();
    const format = (products[i].specs?.format).toLowerCase();
    const type = (products[i].type).toLowerCase();


    if (id.includes(`${input}`) || name.includes(`${input}`) || manufacturer.includes(`${input}`) || format.includes(`${input}`) || type.includes(`${input}`)) {
      resultArray.push(`<div><a href='${products[i].filepath}' class="search--link">${products[i].type} ${products[i].specs.manufacturer} ${products[i].name} ${products[i].specs.format}</a></div>`);
    }
    console.log(resultArray);
  }

  if (resultArray.length === 0) {
    searchResult.innerHTML = resultHTML;
    return;
  }

  for (let i = 0; i < 5; i++) {
    resultHTML += resultArray[i];

    if (i === resultArray.length - 1) {
      break;
    }
  }

  searchResult.innerHTML = resultHTML;
})