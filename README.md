# FastBite

Open `index.html` in a browser. No build step, no server needed.

## Where to change things

| I want to change…                     | Edit this file            |
|---------------------------------------|---------------------------|
| Brand color, light/dark colors        | `css/tokens.css`          |
| Header, hero, tabs, menu grid layout  | `css/layout.css`          |
| Buttons, cards, inputs, rows          | `css/components.css`      |
| Modal and cart drawer                 | `css/overlays.css`        |
| Mobile tweaks                         | `css/responsive.css`      |
| Menu items and prices                 | `js/menu-data.js`         |
| Branches, pickup times, promo code    | `js/config.js`            |
| Cart math (totals, discount)          | `js/state.js`             |
| Menu cards and tabs                   | `js/ui/menu.js`           |
| Size / spice / add-on dialog          | `js/ui/item-dialog.js`    |
| Cart drawer                           | `js/ui/cart.js`           |
| Checkout and confirmation             | `js/ui/checkout.js`       |
| Click handling                        | `js/main.js`              |
| Page text (headline, facts)           | `index.html`              |

All JS shares one global object, `FB`. Scripts load in the order listed in `index.html`.
