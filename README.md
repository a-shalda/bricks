# HTML, CSS (SCSS), JavaScript eCommerce website (only frontend).

https://a-shalda.github.io/bricks/

## A fully responsive website where customers can shop for building materials.

When shopping for fasade materials, customers usually have a volume in square meters (m2). E.g. I have a fasade of 50 m2 that I want to clad with brick slips. But companies do not sell by m2, they sell by packs. There can be 0.59 m2 in a pack, or 1.23 m2, and this makes the shopping experience confusing, since for every product the customer needs to calculate the number of packs themselves. 

On this website, products are presented as follows: 

* Price per square meter, and a piece. For bricks, brick slips, thermopanels, floor tile, clay pavers.
* Price per linear (running) meter, and a piece. For stair tile, corner brick slips, window sills.
* Price per piece. For fence caps, mortar.

Volumes in a pack like 0.59 m2, or 1.23 m2 make it very tricky to process customer's input on the website. So I decided to generate for each product a dropdown menu with pre-calculated subtotal, number of packs, pieces and pallets. Shipping plays an important role, since the order can be a thousand kilos and consist of a few pallets, and it is crucial for the customer to know this info before making the order.

## Folders

* data - all the data to generate products, as well as slider and categories on the main page.
* js - all the scripts to generate header and footer, and individual pages, such as main, product, cart, search, saved, category and brand pages.
* scss - styles.