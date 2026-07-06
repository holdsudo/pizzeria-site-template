// ============================================================
// SITE CONFIG — everything client-specific lives in this file.
// Copy this file per client, fill in their real data, done.
// ============================================================
const SITE = {
  meta: {
    title: "G's Famous Pizza | Guallpa's — Iselin, NJ",
    description: "G's Famous Pizza (Guallpa's) — Iselin, NJ. Family-owned since 1999. 10-inch personal pan pizzas, halal chicken pies, wings & fries. Buy 2 pizzas with any toppings, get 1 plain free."
  },
  brand: {
    name: "G's Famous Pizza",
    sub: "Guallpa's · Family-owned since 1999",
    logoRoundel: "assets/logo-roundel.jpg",
    logoLockup: "assets/logo-lockup.jpg"
  },
  // Optional CSS variable overrides — sample these from the client's sign/posters.
  theme: {
    // char: "#160b08", maroon: "#4a0e09", red: "#d8291b",
    // gold: "#e0a33b", yellow: "#f5c433", milk: "#fff4e6"
  },
  hero: {
    eyebrow: "Oak Tree Road · Iselin, NJ · Since 1999",
    h1: ["You've tried the rest.", "Now try the best."],
    copy: "Ten-inch personal pan pies out of the deck oven, halal chicken options, and every match live on the big screens. Family-run by the Guallpa brothers for 27 years.",
    facts: ["4.2\u2605 on Grubhub", "Top 3 Pizza Spot \u00b7 BusinessRate 2026"],
    poster: "assets/promo-worldcup.jpg",
    posterCaption: "On now at the shop \u2014 World Cup 26, every match live"
  },
  ticker: [
    "Buy 2 pizzas w/ toppings \u2014 get a plain pizza free",
    "7 days a week \u00b7 all day \u00b7 every day",
    "Call ahead (732) 321-5005",
    "Now serving falafel",
    "Watch every match live"
  ],
  contact: {
    address: "1522 Oak Tree Road, Iselin, NJ 08830",
    phone: "(732) 321-5005",
    phoneHref: "tel:+17323215005",
    hoursLine: "Open 7 days a week",
    orderLine: "Pickup, delivery via Grubhub, and catering"
  },
  links: {
    grubhub: "https://www.grubhub.com/restaurant/guallpas-famous-pizza-1522-oak-tree-road-iselin/1754804",
    facebook: "https://www.facebook.com/guallpafamouspizza/",
    instagram: "https://www.instagram.com/guallpasfamouspizza/",
    yelp: "https://www.yelp.com/biz/guallpas-famous-pizza-iselin",
    tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g46526-d5099150-Reviews-Guallpa_s_Famous_Pizza-Iselin_New_Jersey.html"
  },
  proofCards: [
    { key: "facebook", label: "Facebook", strong: "Local updates" },
    { key: "instagram", label: "Instagram", strong: "Food gallery" },
    { key: "yelp", label: "Yelp", strong: "Review discovery" },
    { key: "tripadvisor", label: "Tripadvisor", strong: "Traveler proof" }
  ],
  order: {
    inbox: "https://formsubmit.co/ajax/johntaco11@gmail.com",
    liveHosts: ["github.io", "joe-miz.com"],
    taxRate: 0.06625,
    toppingPrice: 1.00,
    orderPrefix: "GFP"
  },
  headings: {
    menu: { eyebrow: "The real menu", title: "The pans.", copy: "Forty pies and sides, exactly as they sell them \u2014 10\" personal pans, specialty pies, 16\" large pans, wings, and fries. Buy 2 with any toppings, get 1 plain free." },
    gallery: { eyebrow: "Straight from the shop", title: "Inside the famous.", copy: "The counter, the deck ovens, the booths, and the watch-party wall \u2014 this is the real Oak Tree Road original." },
    proof: { eyebrow: "Find us everywhere", title: "Follow the shop. Read the reviews.", copy: "Rated 4.2\u2605 on Grubhub \u2014 and the watch parties, deals, and fresh pies land on Facebook and Instagram first." }
  },
  gallery: [
    { src: "assets/storefront-day.jpg", alt: "Guallpa's Famous Pizza storefront on Oak Tree Road", caption: "The shop, Oak Tree Road", tall: true },
    { src: "assets/kitchen.jpg", alt: "The kitchen with deck ovens and pizza boxes", caption: "Deck ovens, box stacks, checkered tile" },
    { src: "assets/interior-guests.jpg", alt: "Regulars at a booth under the Famous Pizza mural", caption: "Regulars under the mural" },
    { src: "assets/food-olive.jpg", alt: "Black olive and jalape\u00f1o pies on the table", caption: "Table pies, extra jalape\u00f1o" },
    { src: "assets/poster-round32.jpg", alt: "World Cup Round of 32 watch party poster", caption: "Watch-party wall, World Cup 26" }
  ],
  visit: {
    eyebrow: "Visit the shop",
    title: "Pull up to Oak Tree Road.",
    photo: "assets/storefront-wide.jpg",
    note: "Open 7 days a week. Call ahead for faster service."
  },
  menu: {
    categories: [
  { id: 'pan', label: 'Personal Pan' },
  { id: 'specialty', label: 'Specialty Pies' },
  { id: 'large', label: '16\" Large Pan' },
  { id: 'apps', label: 'Appetizers' },
  { id: 'drinks', label: 'Beverages' }
],
    items: [
  { id: '10-plain-pan-pizza', photo: 'assets/food-cheese.jpg', category: 'pan', name: '10\" Plain Pan Pizza', description: 'Shredded cheese. Add toppings for an additional charge.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'], popular: true },
  { id: 'green-pepper-pizza', photo: '', category: 'pan', name: 'Green Pepper Pizza', description: 'Freshly sliced green peppers.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'], popular: true },
  { id: 'hot-pepper-pineapple-pizza', photo: '', category: 'pan', name: 'Hot Pepper & Pineapple Pizza', description: 'Freshly sliced hot peppers & pineapple.', basePrice: 11.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'], popular: true },
  { id: 'mushroom-pizza', photo: '', category: 'pan', name: 'Mushroom Pizza', description: 'Freshly sliced mushrooms.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'cauliflower-pizza', photo: '', category: 'pan', name: 'Cauliflower Pizza', description: 'Freshly chopped cauliflower.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'pepperoni-pizza', photo: '', category: 'pan', name: 'Pepperoni Pizza', description: 'Sliced pepperoni.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'bacon-pizza', photo: '', category: 'pan', name: 'Bacon Pizza', description: 'Strips of smoked bacon.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'grilled-chicken-pizza', photo: '', category: 'pan', name: 'Grilled Chicken Pizza', description: 'Fresh-grilled chicken made with 100% Halal chicken', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'hot-pepper-pizza', photo: '', category: 'pan', name: 'Hot Pepper Pizza', description: 'Fresh jalapenos.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'], popular: true },
  { id: 'hot-pepper-onion-pizza', photo: 'assets/food-onion.jpg', category: 'pan', name: 'Hot Pepper & Onion Pizza', description: 'Freshly sliced hot peppers & onions.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'], popular: true },
  { id: 'broccoli-pizza', photo: '', category: 'pan', name: 'Broccoli Pizza', description: 'Freshly chopped broccoli.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'pineapple-pizza', photo: '', category: 'pan', name: 'Pineapple Pizza', description: 'Freshly diced pineapple.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'black-olive-pizza', photo: 'assets/food-blackolive.jpg', category: 'pan', name: 'Black Olive Pizza', description: 'Freshly sliced black olive.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'sausage-pizza', photo: '', category: 'pan', name: 'Sausage Pizza', description: 'Sweet Italian sausage.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'white-pizza', photo: '', category: 'pan', name: 'White Pizza', description: 'Ricotta & shredded cheese.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'hamburger-pizza', photo: '', category: 'pan', name: 'Hamburger Pizza', description: 'Freshly chopped hamburger.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'onion-pizza', photo: '', category: 'pan', name: 'Onion Pizza', description: 'Freshly sliced onions.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'onion-pepper-pizza', photo: 'assets/food-greenpepper.jpg', category: 'pan', name: 'Onion & Pepper Pizza', description: 'Freshly sliced onions & green peppers.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'spinach-pizza', photo: '', category: 'pan', name: 'Spinach Pizza', description: 'Freshly chopped spinach.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'garlic-pizza', photo: '', category: 'pan', name: 'Garlic Pizza', description: 'Freshly chopped garlic.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'tomato-pizza', photo: 'assets/food-tomato.jpg', category: 'pan', name: 'Tomato Pizza', description: 'Freshly sliced tomato.', basePrice: 9.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'ham-pizza', photo: '', category: 'pan', name: 'Ham Pizza', description: 'Freshly sliced ham.', basePrice: 10.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'hawaiian-pizza', photo: 'assets/food-hawaiian.jpg', category: 'pan', name: 'Hawaiian Pizza', description: 'Freshly sliced ham & pineapple.', basePrice: 11.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'chicken-tikka-masala-pizza', photo: '', category: 'pan', name: 'Chicken Tikka Masala Pizza', description: 'Topped with our masala seasoning made with 100% Halal Chicken.', basePrice: 12.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'paneer-tikka-masala-pizza', photo: '', category: 'pan', name: 'Paneer Tikka Masala Pizza', description: 'Topped with our masala seasoning, cubes of paneer, and shredded cheese. (Vegetarian)', basePrice: 12.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'buffalo-chicken-bacon-ranch-pizza', photo: '', category: 'pan', name: 'Buffalo Chicken Bacon Ranch Pizza', description: 'Topped with spicy buffalo chicken, chopped smoky bacon, shredded cheese and finished with ranch dressing.', basePrice: 13.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: '10-plain-cauliflower-crust', photo: '', category: 'pan', name: '10\'\' Plain Cauliflower Crust', description: 'Gluten free option.', basePrice: 16.00, sizes: ['One size'], toppings: [] },
  { id: 'guallpa-s-veggie-special-pizza', photo: '', category: 'specialty', name: 'Guallpa\'s Veggie Special Pizza', description: 'Fresh spinach, broccoli, black olives, onions, mushrooms, green peppers & shredded cheese.', basePrice: 12.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'], popular: true },
  { id: 'guallpa-s-famous-special-pizza', photo: '', category: 'specialty', name: 'Guallpa\'s Famous Special Pizza', description: 'pepperoni, sausage, mushrooms, black olives, onions, green peppers & shredded cheese.', basePrice: 13.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'guallpa-s-meat-lovers-special-pizza', photo: '', category: 'specialty', name: 'Guallpa\'s Meat Lovers Special Pizza', description: 'Pepperoni, sausage, bacon, ham & shredded cheese.', basePrice: 14.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'buffalo-chicken-pizza', photo: '', category: 'specialty', name: 'Buffalo Chicken Pizza', description: 'Grilled chicken & Buffalo sauce made 100% halal chicken.', basePrice: 12.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'bbq-chicken-pizza', photo: '', category: 'specialty', name: 'BBQ Chicken Pizza', description: 'Grilled chicken & BBQ sauce made with 100% halal chicken.', basePrice: 12.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: '16-plain-pan-pizza', photo: 'assets/food-cheese.jpg', category: 'large', name: '16\" Plain Pan Pizza', description: 'Shredded cheese.', basePrice: 21.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: '16-guallpa-s-famous-special-pizza', photo: '', category: 'large', name: '16\" Guallpa\'s Famous Special Pizza', description: 'Beef, pepperoni, sausage, mushrooms, black olives, onions, green peppers & shredded cheese.', basePrice: 26.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: '16-guallpa-s-veggie-special', photo: '', category: 'large', name: '16\" Guallpa\'s Veggie Special', description: 'Fresh spinach, broccoli, black olives, onions, mushrooms, green peppers & shredded cheese.', basePrice: 25.75, sizes: ['One size'], toppings: ['Pepperoni', 'Sausage', 'Bacon', 'Ham', 'Grilled chicken', 'Mushrooms', 'Green peppers', 'Hot peppers', 'Onions', 'Black olives', 'Broccoli', 'Spinach', 'Pineapple', 'Garlic', 'Tomato', 'Extra cheese'] },
  { id: 'buffalo-wings', photo: '', category: 'apps', name: 'Buffalo Wings', description: 'Cooked wing of a chicken coated in sauce or seasoning.', basePrice: 10.75, sizes: ['One size'], toppings: [] },
  { id: 'bbq-wings', photo: '', category: 'apps', name: 'BBQ Wings', description: 'Cooked wing of a chicken coated in sauce or seasoning.', basePrice: 10.75, sizes: ['One size'], toppings: [] },
  { id: 'french-fries', photo: '', category: 'apps', name: 'French Fries', description: 'Cooked in oil.', basePrice: 5.75, sizes: ['One size'], toppings: [] },
  { id: 'soda-cans', photo: '', category: 'drinks', name: 'Soda Cans', description: 'Ice cold.', basePrice: 2.50, sizes: ['One size'], toppings: [] },
  { id: '2-liter-soda', photo: '', category: 'drinks', name: '2 Liter Soda', description: 'Ice cold.', basePrice: 6.50, sizes: ['One size'], toppings: [] }
]
  }
};

if (typeof module !== "undefined") module.exports = SITE;
if (typeof window !== "undefined") window.SITE = SITE;
