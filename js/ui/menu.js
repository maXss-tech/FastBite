/* Category tabs + menu grid. */
FB.ui = FB.ui || {};

FB.ui.renderTabs = () => {
  FB.$("#tabs").innerHTML = FB.config.categories
    .map((c) => `<button class="tab" aria-pressed="${c === FB.state.category}" data-category="${c}">${c}</button>`)
    .join("");
};

FB.ui.renderGrid = () => {
  const { category, query } = FB.state;
  const items = FB.menu.filter(
    (m) => (category === "All" || m.cat === category) && m.name.toLowerCase().includes(query.toLowerCase())
  );
  FB.$("#grid").innerHTML = items.length
    ? items.map((m) => `
      <article class="card">
        <div class="top"><span class="cat">${m.cat}</span>${m.popular ? '<span class="tag">Popular</span>' : ""}</div>
        <h3>${m.name}</h3>
        <p>${m.desc}</p>
        <div class="meta">${m.time} · ${m.kcal} kcal</div>
        <div class="foot"><span class="price">${FB.fmt(m.price)}</span><button class="btn pri" data-add="${m.id}">Add</button></div>
      </article>`).join("")
    : '<div class="empty">No items match your search.</div>';
};
