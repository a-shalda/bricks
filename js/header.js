// localStorage.removeItem('cart');
// localStorage.removeItem('wishlist');

const headerHTML = `

  <!--HEADER-start-->
    <div class="header__upper cont">

      <div class="header__upper__left">
        <div class="header__upper__left__hamburger">
          <button class="header__upper__left__hamburger__nav-toggle">
            <img src="/images/icons/menu.svg" class="icon-style header__upper__left__hamburger__nav-toggle__icon" width="24" height="24" alt="menu"/>
          </button>
          <div class="header__upper__left__hamburger__dropdown">
            <div class="header__upper__left__hamburger__dropdown__content">
              <ul class="header__upper__left__hamburger__dropdown__ul">
                <li class="header__upper__left__hamburger__dropdown__content__link"><a class="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/catalog.html">All products</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a class="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/brick_slips.html">Klinker brick slips</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a class="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/bricks.html">Klinker bricks</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a class="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/thermopanels.html">Brick slip thermo panels</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a class="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/fence_caps.html">Ceramic fence caps</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a class="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/clay_pavers.html">Clay pavers</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a class="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/stair_and_floor_tile.html">Stair and floor tile</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a class="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/window_sills.html">Ceramic window sills</a></li>
                <li class="header__upper__left__hamburger__dropdown__content__link"><a class="header__upper__left__hamburger__dropdown__content__link__a" href="/categories/mortars.html">Mortars</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header__upper__left__logo">
          <a href="/index.html" class="header__upper__left__logo__link">
            <p class="header__upper__left__logo__bricks">Bricks</p>
          </a>
        </div>
      </div>

      <div class="header__upper__right">

        <div class="header__upper__right__search">
          <a href="/search.html">
            <img src="/images/icons/search.svg" class="icon-style--search--header" width="22" height="16" alt="search"/>
          </a>
        </div>

        <div class="header__upper__right__saved">
          <a href="/saved.html" class="header__upper__right__saved--link">
            <img src="/images/icons/heart.svg" class="icon-style" width="24" height="24" alt="heart"/>
            <p class="header__upper__right__saved__counter"></p>
          </a>
        </div>

        <div class="header__upper__right__cart">
          <a href="/cart.html"> 
            <img src="/images/icons/cart.svg" class="icon-style fa-basket-shopping" width="24" height="24" alt="cart"/>
            <p class="header__upper__right__cart__counter"></p>
          </a>
        </div>
        
      </div>
    
    </div>
  <!--HEADER-end-->
`;

document.querySelector('.header').innerHTML = headerHTML;


function updateCounters() {

  cart = JSON.parse(localStorage.getItem('cart')) || [];
  wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  if (cart.length !== 0) {
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

  if (savedCounterNumber !== 0) {
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

  if (cartCounterNumber !== 0) {
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

const menuIcon = document.querySelector('.icon-style header__upper__left__hamburger__nav-toggle__icon');

const searchIcon = document.querySelector('.header__upper__right__search');
const savedIcon = document.querySelector('.header__upper__right__saved');
const cartIcon = document.querySelector('.header__upper__right__cart');
const logoIcon = document.querySelector('.header__upper__left__logo__bricks');
const dropdownLink = document.querySelectorAll('.header__upper__left__hamburger__dropdown__content__link');

// menuIcon.addEventListener('pointerdown', () => {
//   document.querySelector('.icon-style header__upper__left__hamburger__nav-toggle__icon').classList.add('header__upper__right__clicked');
// })

searchIcon.addEventListener('pointerdown', () => {
  document.querySelector('.icon-style--search--header').classList.add('header__upper__right__clicked');
})

savedIcon.addEventListener('pointerdown', () => {
  document.querySelector('.icon-style').classList.add('header__upper__right__clicked');
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