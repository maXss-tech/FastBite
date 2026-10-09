/* Settings you are most likely to edit: branches, times, promo, add-on prices. */
window.FB = window.FB || {};

FB.config = {
  categories: ["All", "Burgers", "Chicken", "Fries & Sides", "Drinks", "Deals"],
  branches: [
    { name: "Quezon City Main", address: "12th St, New Manila" },
    { name: "Cubao Expo",       address: "General Araneta" }
  ],
  pickupTimes: ["ASAP (15–20 min)", "30 min", "45 min", "1 hour"],
  payments: ["GCash", "Card", "At counter"],
  promo: { code: "HUNGRY50", amount: 50 },
  prices: { large: 20, cheese: 25, sauce: 15 },
  currency: "₱"
};
