/* Cart drawer + header badge. */
FB.ui.refreshCart = () => {
  FB.$("#cnt").textContent = FB.cart.count();
  FB.ui.renderCart();
};

FB.ui.renderCart = () => {
  const { cart, promoApplied } = FB.state;
  const lines = cart.map((c) => {
    const o = c.options;
    const detail = [o.size !== "Regular" ? o.size : "", o.spice, o.cheese ? "Extra cheese" : "", o.sauce ? "Extra sauce" : ""].filter(Boolean).join(" · ");
    return `<div class="line"><div class="n"><b>${c.item.name}</b><small>${detail || "Standard"}</small>
      <div class="qty"><button data-qty="-1" data-key="${c.key}" aria-label="Decrease">−</button><span>${c.qty}</span><button data-qty="1" data-key="${c.key}" aria-label="Increase">+</button></div></div>
      <b>${FB.fmt(FB.cart.unitPrice(c.item, o) * c.qty)}</b></div>`;
  }).join("");

  FB.$("#drawerP").innerHTML = `
    <div class="ph"><h2>Your order</h2><button class="x" data-close="#drawer" aria-label="Close">×</button></div>
    <div class="pb">${cart.length
      ? lines + `<div class="promo"><input class="in" id="promoInput" placeholder="Promo code"><button class="btn" id="promoApply">Apply</button></div>
         <div class="msg ${promoApplied ? "ok" : ""}" id="promoMsg">${promoApplied ? FB.fmt(FB.config.promo.amount) + " discount applied" : ""}</div>`
      : '<div class="empty" style="padding:60px 0">Your cart is empty.</div>'}</div>
    ${cart.length ? `<div class="pf">
      <div class="row"><span>Subtotal</span><span>${FB.fmt(FB.cart.subtotal())}</span></div>
      ${promoApplied ? `<div class="row"><span>Discount</span><span>−${FB.fmt(FB.cart.discount())}</span></div>` : ""}
      <div class="row t"><span>Total</span><span>${FB.fmt(FB.cart.total())}</span></div>
      <button class="btn pri block" style="margin-top:12px" id="goCheckout">Continue to pickup details</button></div>` : ""}`;
};

FB.ui.applyPromo = () => {
  const code = FB.$("#promoInput").value.trim().toUpperCase();
  if (code === FB.config.promo.code) { FB.state.promoApplied = true; FB.ui.renderCart(); }
  else { const m = FB.$("#promoMsg"); m.className = "msg err"; m.textContent = "That code isn't valid."; }
};
