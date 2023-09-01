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
                <a href="brick_slips.html" class="header__upper__left__hamburger__dropdown__content__link"><li>Klinker brick slips</li></a>
                <a href="bricks.html" class="header__upper__left__hamburger__dropdown__content__link"><li>Klinker bricks</li></a>
                <a href="thermopanels.html" class="header__upper__left__hamburger__dropdown__content__link"><li>Brick slip thermo panels</li></a>
                <a href="fence_caps.html" class="header__upper__left__hamburger__dropdown__content__link"><li>Ceramic fence caps</li></a>
                <a href="clay_pavers.html" class="header__upper__left__hamburger__dropdown__content__link"><li>Clay pavers</li></a>
                <a href="stair_and_floor_tile.html" class="header__upper__left__hamburger__dropdown__content__link"><li>Stair and floor tile</li></a>
                <a href="window_sills.html" class="header__upper__left__hamburger__dropdown__content__link"><li>Ceramic window sills</li></a>
                <a href="mortars.html" class="header__upper__left__hamburger__dropdown__content__link"><li>Mortars</li></a>
              </ul>
            </div>
          </div>
        </div>
        <div class="header__upper__left__logo">
          <a href="index.html" class="header__upper__left__logo__link">
            <p class="header__upper__left__logo__bricks">Bricks</p>
          </a>
        </div>
      </div>

      <div class="header__upper__right">

        <div class="header__upper__right__search">
          <a href="search.html">
            <i class="header__upper__right__search__icon fa-solid fa-magnifying-glass icon-style--search"></i>
          </a>
        </div>

        <div class="header__upper__right__saved">
          <a href="saved.html" class="header__upper__right__saved--link">
            <i class="fa-regular fa-heart icon-style--saved">&nbsp;</i>
            <p class="header__upper__right__saved__counter"></p>
          </a>
        </div>

        <!-- <div class="header__upper__right__seen">
          <i class="fa-regular fa-eye icon-style"></i>
        </div> -->

        <div class="header__upper__right__cart">
          <a href="cart.html">
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
  document.body.classList.toggle('body-stop');
})