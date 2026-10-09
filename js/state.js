/* App state + cart math. No DOM code here. */
FB.state = {
  category: "All",
  query: "",
  cart: [],
  promoApplied: false,
  branch: FB.config.branches[0].name,
  pickupTime: FB.config.pickupTimes[0],
  payment: FB.config.payments[0],
  selected: null            // item currently being customized
};

FB.cart = {
  unitPrice(item, o) {
    const p = FB.config.prices;
    return item.price + (o.size === "Large" ? p.large : 0) + (o.cheese ? p.cheese : 0) + (o.sauce ? p.sauce : 0);
  },
  add(item, o) {
    const key = [item.id, o.size, o.spice, o.cheese, o.sauce].join("|");
    const found = FB.state.cart.find((c) => c.key === key);
    if (found) found.qty++;
    else FB.state.cart.push({ key, item, options: { ...o }, qty: 1 });
  },
  changeQty(key, delta) {
    const line = FB.state.cart.find((c) => c.key === key);
    if (!line) return;
    line.qty += delta;
    if (line.qty < 1) FB.state.cart = FB.state.cart.filter((c) => c !== line);
  },
  clear() { FB.state.cart = []; FB.state.promoApplied = false; },
  count()    { return FB.state.cart.reduce((s, c) => s + c.qty, 0); },
  subtotal() { return FB.state.cart.reduce((s, c) => s + this.unitPrice(c.item, c.options) * c.qty, 0); },
  discount() { return FB.state.promoApplied ? Math.min(FB.config.promo.amount, this.subtotal()) : 0; },
  total()    { return this.subtotal() - this.discount(); }
};
