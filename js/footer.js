const footerHTML = `

  <section class="footer cont">

    <div class="footer__upper">

      <div class="footer__upper__column upper--one">
        <ul>
          <li class="footer__upper__column__title">Categories</li>
          <li class="footer__upper__column__item"><a href="categories/brick_slips.html">Klinker brick slips</a></li>
          <li class="footer__upper__column__item"><a href="categories/bricks.html">Klinker bricks</a></li>
          <li class="footer__upper__column__item"><a href="categories/thermopanels.html">Brick slip thermo panels</a></li>
          <li class="footer__upper__column__item"><a href="categories/fence_caps.html">Ceramic fence caps</a></li>
          <li class="footer__upper__column__item"><a href="categories/clay_pavers.html">Clay pavers</a></li>
          <li class="footer__upper__column__item"><a href="categories/stair_and_floor_tile.html">Stair and floor tile</a></li>
          <li class="footer__upper__column__item"><a href="categories/window_sills.html">Ceramic window sills</a></li>
          <li class="footer__upper__column__item"><a href="categories/mortars.html">Mortars</a></li>
        </ul>
      </div>

      <div class="footer__upper__column upper--two">
        <ul>
          <li class="footer__upper__column__title">Manufacturers</li>
          <li class="footer__upper__column__item"><a href="categories/feldhaus.html">Feldhaus Klinker
          <li class="footer__upper__column__item"><a href="categories/stroeher.html">Stroeher</a></li>
          <li class="footer__upper__column__item"><a href="categories/roben.html">Roben</a></li>
          <li class="footer__upper__column__item"><a href="categories/abc-klinkergruppe.html">ABC-Klinkergruppe</a></li>
          <li class="footer__upper__column__item"><a href="categories/king-klinker.html">King Klinker</a></li>
          <li class="footer__upper__column__item"><a href="categories/zg-clinker.html">ZG Clinker</a></li>
          <li class="footer__upper__column__item"><a href="categories/quick-mix.html">Quick Mix</a></li>
          <li class="footer__upper__column__item"><a href="categories/perel.html">Perel</a></li>
        </ul>
      </div>

      <div class="footer__upper__column upper--three"></div>
      <div class="footer__upper__column upper--four"></div>
      <div class="footer__upper__column upper--four"></div>

    </div>

    <div class="footer__lower">

      <div class="footer__lower__left">
        <i class="fa-brands fa-instagram footer__lower__left__icon icon-style--footer"></i>
        <i class="fa-brands fa-square-youtube footer__lower__left__icon icon-style--footer"></i>
        <i class="fa-brands fa-square-facebook footer__lower__left__icon icon-style--footer"></i>
      </div>

      <div class="footer__lower__right">
        <p class="footer__lower__right__desc">
          Designed and developed by <a href="https://shalda.dev" class="signature">Alex Shalda</a>
        </p>
      </div>

    </div>

  </section>
`; 

document.querySelector('.footer--background').innerHTML = footerHTML;

//Changing color on click

const footerLink = document.querySelectorAll('.footer__upper__column__item');

footerLink.forEach(link => {

  link.addEventListener('pointerdown', () => {
    link.classList.add('footer__upper__column__item--active');
  })
})