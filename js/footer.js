const footerHTML = `

  <section class="footer cont">

    <div class="footer__upper">

      <div class="footer__upper__column upper--one">
        <ul>
          <li class="footer__upper__column__title">Categories</li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/brick_slips.html">Klinker brick slips</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/bricks.html">Klinker bricks</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/thermopanels.html">Brick slip thermo panels</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/fence_caps.html">Ceramic fence caps</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/clay_pavers.html">Clay pavers</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/stair_and_floor_tile.html">Stair and floor tile</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/window_sills.html">Ceramic window sills</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/mortars.html">Mortars</a></li>
        </ul>
      </div>

      <div class="footer__upper__column upper--two">
        <ul>
          <li class="footer__upper__column__title">Manufacturers</li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/feldhaus.html">Feldhaus Klinker</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/stroeher.html">Stroeher</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/roben.html">Roben</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/abc-klinkergruppe.html">ABC-Klinkergruppe</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/king-klinker.html">King Klinker</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/zg-clinker.html">ZG Clinker</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/quick-mix.html">Quick Mix</a></li>
          <li class="footer__upper__column__item"><a class="footer__upper__column__item__a" href="/categories/perel.html">Perel</a></li>
        </ul>
      </div>

      <div class="footer__upper__column upper--three"></div>
      <div class="footer__upper__column upper--four"></div>

      <div class="footer__upper__column upper--four" itemscope itemtype="https://schema.org/Organization">
        <p class="footer__upper__column__title">Contacts</p>
        <p class="footer__upper__column__contact--name" itemprop="name">Bricks LLC</p>
        <div class="footer__upper__column__title--address" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
          <p class="footer__upper__column__contact" itemprop="addressLocality">Pittsburgh, USA</p>
          <p class="footer__upper__column__contact" itemprop="streetAddress">5th ave, 100</p>
          <p class="footer__upper__column__contact" itemprop="telephone">+1(555)555555</p>
          <p class="footer__upper__column__contact" itemprop="email">info@bricks.com</p>
          <p class="footer__upper__column__contact">Mon-Sun 09:00-18:00</p>

          <a href="https://api.whatsapp.com/send?phone=79776511237" target="_blank" class="footer__upper__column__contact__phone_button">
            <img src="/images/icons/whatsapp.svg" class="icon--footer--call" width="24" height="24" alt="heart"/>
          </a>

          <a href="https://t.me/a_shalda" target="_blank" class="footer__upper__column__contact__phone_button">
            <img src="/images/icons/telegram.svg" class="icon--footer--call" width="24" height="24" alt="heart"/>
          </a>

        </div>
      </div>

    </div>

    <div class="footer__lower">





    

    </div>

  </section>
`;

{/* <div class="footer__lower__left">
<a href="https://www.youtube.com/channel/UCZPDt64PY3l6PkXKIWPiBIw" target="_blank">
  <img src="/images/icons/youtube.svg" class="icon--footer" width="24" height="24" alt="heart"/>
</a>
</div>

<div class="footer__lower__right">
<p class="footer__lower__right__desc">
  Designed and developed by <a href="https://shalda.dev" class="signature">Alex Shalda</a>
</p>
</div> */}

document.querySelector('.footer--background').innerHTML = footerHTML;

//Changing color on click

const footerLink = document.querySelectorAll('.footer__upper__column__item');

footerLink.forEach(link => {

  link.addEventListener('pointerdown', () => {
    link.classList.add('footer__upper__column__item--active');
  })
})