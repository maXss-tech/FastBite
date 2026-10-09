/* Customize dialog (size, spice, add-ons). Combos skip it. */
FB.ui.startAdd = (id) => {
  const item = FB.menu.find((m) => m.id === id);
  if (item.cat === "Deals") {
    FB.ui.addToCart(item, { size: "Regular", spice: "", cheese: false, sauce: false });
    return;
  }
  const hasSpice = item.cat === "Burgers" || item.cat === "Chicken";
  FB.state.selected = { item, size: "Regular", spice: hasSpice ? "Medium" : "", cheese: false, sauce: false };
  FB.ui.renderItemDialog();
  FB.open("#modal");
};

FB.ui.renderItemDialog = () => {
  const s = FB.state.selected, { item } = s, p = FB.config.prices;
  const pick = (key, values, extra = {}) =>
    values.map((v) => `<button class="opt" aria-pressed="${s[key] === v}" data-opt="${key}" data-value="${v}">${v}${extra[v] || ""}</button>`).join("");
  FB.$("#modalP").innerHTML = `
    <div class="ph"><h2>${item.name}</h2><button class="x" data-close="#modal" aria-label="Close">×</button></div>
    <div class="pb">
      <p style="margin:0;color:var(--mut)">${item.desc}</p>
      <div class="lbl">Size</div><div class="seg">${pick("size", ["Regular", "Large"], { Large: " +" + FB.fmt(p.large) })}</div>
      ${s.spice ? `<div class="lbl">Spice level</div><div class="seg">${pick("spice", ["Mild", "Medium", "Hot"])}</div>` : ""}
      ${item.cat === "Drinks" ? "" : `<div class="lbl">Add-ons</div><div class="seg">
        <button class="opt" aria-pressed="${s.cheese}" data-toggle="cheese">Extra cheese +${FB.fmt(p.cheese)}</button>
        <button class="opt" aria-pressed="${s.sauce}" data-toggle="sauce">Extra sauce +${FB.fmt(p.sauce)}</button></div>`}
    </div>
    <div class="pf"><button class="btn pri block" id="addGo">Add to cart · ${FB.fmt(FB.cart.unitPrice(item, s))}</button></div>`;
};

FB.ui.addToCart = (item, options) => {
  FB.cart.add(item, options);
  FB.ui.refreshCart();
  FB.toast(item.name + " added");
};
