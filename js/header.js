// localStorage.removeItem('cart');
// localStorage.removeItem('wishlist');

const headerHTML = `

  <!--HEADER--start-->
    <div class="header__upper cont">

      <div class="header__upper__left">
        <div class="header__upper__left__hamburger">
          <button class="header__upper__left__hamburger__nav-toggle">
            <i class="fa-solid fa-bars icon-style header__upper__left__hamburger__nav-toggle__icon"></i>
          </button>
          <div class="header__upper__left__hamburger__dropdown">
            <div class="header__upper__left__hamburger__dropdown__content">
              <ul class="header__upper__left__hamburger__dropdown__ul">
                <li class="header__upper__left__hamburger__dropdown__content__link"><a href="/bricks/categories/catalog.html">All products</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a href="/bricks/categories/brick_slips.html">Klinker brick slips</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a href="/bricks/categories/bricks.html">Klinker bricks</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a href="/bricks/categories/thermopanels.html">Brick slip thermo panels</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a href="/bricks/categories/fence_caps.html">Ceramic fence caps</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a href="/bricks/categories/clay_pavers.html">Clay pavers</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a href="/bricks/categories/stair_and_floor_tile.html">Stair and floor tile</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a href="/bricks/categories/window_sills.html">Ceramic window sills</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a href="/bricks/categories/mortars.html">Mortars</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header__upper__left__logo">
          <a href="/bricks/index.html" class="header__upper__left__logo__link">
            <p class="header__upper__left__logo__bricks">Bricks</p>
          </a>
        </div>
      </div>

      <div class="header__upper__right">

        <div class="header__upper__right__search">
          <a href="/bricks/search.html">
            <i class="header__upper__right__search__icon fa-solid fa-magnifying-glass icon-style--search"></i>
          </a>
        </div>

        <div class="header__upper__right__saved">
          <a href="/bricks/saved.html" class="header__upper__right__saved--link">
            <i class="fa-regular fa-heart icon-style--saved">&nbsp;</i>
            <p class="header__upper__right__saved__counter"></p>
          </a>
        </div>

        <div class="header__upper__right__cart">
          <a href="/bricks/cart.html">
            <i class="fa-solid fa-basket-shopping icon-style">&nbsp;</i>
            <p class="header__upper__right__cart__counter"></p>
          </a>
        </div>
        
      </div>
    
    </div>
  <!--HEADER--end-->
`;

document.querySelector('.header').innerHTML = headerHTML;


function updateCounters () {

  cart = JSON.parse(localStorage.getItem('cart')) || [];
  wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  if (cart.length != 0) {
    document.querySelector('.header__upper__right').classList.add('header__upper__right__has-counter');
    document.querySelector('.header__upper__right__saved').classList.add('header__upper__right__saved__has-counter');
  }
  else {
    document.querySelector('.header__upper__right').classList.remove('header__upper__right__has-counter');
    document.querySelector('.header__upper__right__saved').classList.remove('header__upper__right__saved__has-counter');
  }

  const savedCounter = document.querySelector('.header__upper__right__saved__counter');
  const cartCounter = document.querySelector('.header__upper__right__cart__counter');
  let savedCounterNumber = wishlist.length;
  let cartCounterNumber = cart.length;

  if (savedCounterNumber > 99) {
    savedCounterNumber = 99;
  }

  if (cartCounterNumber > 99) {
    cartCounterNumber = 99;
  }

  if (savedCounterNumber != 0) {
    savedCounter.innerHTML = savedCounterNumber;

    setTimeout(function () {
      savedCounter.classList.add('header__upper__right__saved__counter__not-blurred');
    }, 100)

  }
  else {
    setTimeout(function () {
      savedCounter.classList.remove('header__upper__right__saved__counter__not-blurred');
    }, 100)
  }

  if (cartCounterNumber != 0) {
    cartCounter.innerHTML = cartCounterNumber;

    setTimeout(function () {
      cartCounter.classList.add('header__upper__right__cart__counter__not-blurred');
    }, 100)
  }
  else {
    setTimeout(function () {
      cartCounter.classList.remove('header__upper__right__cart__counter__not-blurred');
    }, 100)
  }
}

updateCounters();


//HAMBURGER MENU
document.querySelector('.header__upper__left__hamburger__nav-toggle').addEventListener('click', () => {

  document.querySelector('.header__upper__left__hamburger__dropdown').classList.toggle('header__upper__left__hamburger__dropdown__visible');
  document.querySelector('.header__upper__left__hamburger__nav-toggle__icon').classList.toggle('header__upper__left__hamburger__nav-toggle__icon--active');
})


//Disabling doubletap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  let now = (new Date()).getTime();
  if (now - lastTouchEnd <= 500) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

//Changing color on click

const searchIcon = document.querySelector('.header__upper__right__search');
const savedIcon = document.querySelector('.header__upper__right__saved');
const cartIcon = document.querySelector('.header__upper__right__cart');
const logoIcon = document.querySelector('.header__upper__left__logo__bricks');
const dropdownLink = document.querySelectorAll('.header__upper__left__hamburger__dropdown__content__link');

searchIcon.addEventListener('pointerdown', () => {
  document.querySelector('.header__upper__right__search__icon').classList.add('header__upper__right__clicked');
})

savedIcon.addEventListener('pointerdown', () => {
  document.querySelector('.icon-style--saved').classList.add('header__upper__right__clicked');
})

cartIcon.addEventListener('pointerdown', () => {
  document.querySelector('.fa-basket-shopping').classList.add('header__upper__right__clicked');
})

logoIcon.addEventListener('pointerdown', () => {
  logoIcon.classList.add('header__upper__left__logo__bricks--active');
})

dropdownLink.forEach(link => {
  link.addEventListener('pointerdown', () => {
    link.classList.add('header__upper__left__hamburger__dropdown__content__link--active');
  })
})