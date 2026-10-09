/* Pickup details + confirmation screens. */
FB.ui.renderCheckout = () => {
  const s = FB.state, c = FB.config;
  const seg = (list, cur, key) => list.map((v) => `<button class="opt" aria-pressed="${cur === v}" data-pick="${key}" data-value="${v}">${v}</button>`).join("");
  FB.$("#modalP").innerHTML = `
    <div class="ph"><h2>Pickup details</h2><button class="x" data-close="#modal" aria-label="Close">×</button></div>
    <div class="pb">
      <div class="lbl">Branch</div>
      <div class="seg" style="grid-template-columns:1fr">${c.branches.map((b) => `
        <button class="opt" style="height:auto;padding:10px;text-align:left" aria-pressed="${s.branch === b.name}" data-pick="branch" data-value="${b.name}">${b.name}<br><small style="font-weight:400;color:var(--mut)">${b.address}</small></button>`).join("")}</div>
      <div class="lbl">Pickup time</div><div class="seg">${seg(c.pickupTimes, s.pickupTime, "pickupTime")}</div>
      <div class="lbl">Name for the order</div><input class="in" id="nm" placeholder="e.g. Juan">
      <div class="lbl">Notes (optional)</div><textarea class="in" id="nt" rows="2" placeholder="No onions, extra ketchup…"></textarea>
      <div class="lbl">Payment</div><div class="seg">${seg(c.payments, s.payment, "payment")}</div>
    </div>
    <div class="pf"><button class="btn pri block" id="placeOrder">Place order · ${FB.fmt(FB.cart.total())}</button></div>`;
  FB.open("#modal");
};

/* Re-render checkout after a choice, without losing typed text. */
FB.ui.pickCheckoutOption = (key, value) => {
  const name = FB.$("#nm").value, note = FB.$("#nt").value;
  FB.state[key] = value;
  FB.ui.renderCheckout();
  FB.$("#nm").value = name; FB.$("#nt").value = note;
};

FB.ui.placeOrder = () => {
  const s = FB.state;
  const orderId = "FB-" + Math.floor(1000 + Math.random() * 9000);
  const name = FB.$("#nm").value.trim() || "Guest";
  const items = FB.cart.count(), total = FB.cart.total();
  FB.$("#modalP").innerHTML = `
    <div class="ph"><h2>Order confirmed</h2><button class="x" data-close="#modal" aria-label="Close">×</button></div>
    <div class="pb">
      <div class="lbl">Order number</div><div class="big">${orderId}</div>
      <p style="margin:0;color:var(--mut)" id="who"></p>
      <div class="steps"><div class="st d"><i></i>Order received</div><div class="st a"><i></i>Being prepared</div><div class="st"><i></i>Ready at counter</div></div>
      <div class="row"><span>Pickup</span><span>${s.branch}</span></div>
      <div class="row"><span>Time</span><span>${s.pickupTime}</span></div>
      <div class="row"><span>Items</span><span>${items}</span></div>
      <div class="row"><span>Payment</span><span>${s.payment}</span></div>
      <div class="row t"><span>Total</span><span>${FB.fmt(total)}</span></div>
    </div>
    <div class="pf"><button class="btn pri block" data-close="#modal">Done</button></div>`;
  FB.$("#who").textContent = `Thanks, ${name}. Give this number at the counter when you arrive.`;
  FB.cart.clear();
  FB.ui.refreshCart();
  FB.close("#drawer");
};
