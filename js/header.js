const headerHTML = `

  <!--HEADER--start-->
    <div class="header__upper cont">

      <div class="header__upper__left">
        <div class="header__upper__left__hamburger">
          <button class="header__upper__left__hamburger__nav-toggle">
            <i class="fa-solid fa-bars icon-style"></i>
          </button>
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