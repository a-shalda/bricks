cart = JSON.parse(localStorage.getItem('cart')) || [];
wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function updateCounters () {
  if (cart.length != 0) {document.querySelector('.header__upper__right').classList.add('header__upper__right__has-counter');}
  else {document.querySelector('.header__upper__right').classList.remove('header__upper__right__has-counter');}

  const savedCounter = document.querySelector('.header__upper__right__saved__counter');
  const cartCounter = document.querySelector('.header__upper__right__cart__counter');

  if (wishlist.length != 0) {
    savedCounter.innerHTML = wishlist.length;

    setTimeout(function () {
      savedCounter.classList.add('header__upper__right__saved__counter__not-blurred');
    }, 100)

  }
  else {
    setTimeout(function () {
      savedCounter.classList.remove('header__upper__right__saved__counter__not-blurred');
    }, 100)
  }

  if (cart.length != 0) {
    cartCounter.innerHTML = cart.length;

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