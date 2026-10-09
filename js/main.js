/* Entry point: wires up events and first render. */
document.addEventListener("click", (e) => {
  const t = e.target.closest("button, .ov");
  if (!t) return;
  if (t.classList.contains("ov")) { if (e.target === t) FB.close("#" + t.id); return; }
  const d = t.dataset;

  if (d.category)       { FB.state.category = d.category; FB.ui.renderTabs(); FB.ui.renderGrid(); }
  else if (d.add)       FB.ui.startAdd(+d.add);
  else if (d.close)     FB.close(d.close);
  else if (d.opt)       { FB.state.selected[d.opt] = d.value; FB.ui.renderItemDialog(); }
  else if (d.toggle)    { FB.state.selected[d.toggle] = !FB.state.selected[d.toggle]; FB.ui.renderItemDialog(); }
  else if (t.id === "addGo")      { const s = FB.state.selected; FB.ui.addToCart(s.item, s); FB.close("#modal"); }
  else if (d.qty)       { FB.cart.changeQty(d.key, +d.qty); FB.ui.refreshCart(); }
  else if (t.id === "cartBtn")    { FB.ui.renderCart(); FB.open("#drawer"); }
  else if (t.id === "promoApply") FB.ui.applyPromo();
  else if (t.id === "goCheckout") { FB.close("#drawer"); FB.ui.renderCheckout(); }
  else if (d.pick)      FB.ui.pickCheckoutOption(d.pick, d.value);
  else if (t.id === "placeOrder") FB.ui.placeOrder();
});

FB.$("#q").addEventListener("input", (e) => { FB.state.query = e.target.value; FB.ui.renderGrid(); });

FB.ui.renderTabs();
FB.ui.renderGrid();
FB.ui.renderCart();
