//GENERATING HTML

let root = document.URL.slice(-12, -5);

let productOriginalHTML = '';
let productThumbnailslHTML = '';

products.forEach((product) => {

  if (product.id === root) {

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
