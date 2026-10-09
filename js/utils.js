/* Small helpers used everywhere. */
FB.$ = (sel) => document.querySelector(sel);
FB.fmt = (n) => FB.config.currency + n.toLocaleString();

FB.toast = (text) => {
  const el = FB.$("#toast");
  el.textContent = text;
  el.style.display = "block";
  clearTimeout(FB.toast._t);
  FB.toast._t = setTimeout(() => (el.style.display = "none"), 1800);
};

FB.open  = (sel) => FB.$(sel).classList.add("on");
FB.close = (sel) => FB.$(sel).classList.remove("on");
