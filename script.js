const categories = SITE.menu.categories;
const menuItems = SITE.menu.items;

const state = {
  category: 'pan',
  cart: [],
  orderType: 'pickup',
  activeItem: null
};


function fillSlots() {
  document.title = SITE.meta.title;
  document.querySelectorAll('[data-slot]').forEach((el) => {
    const path = el.dataset.slot.split('.');
    let value = SITE;
    path.forEach((k) => { value = value ? value[k] : undefined; });
    if (value === undefined) return;
    if (el.tagName === 'IMG') el.src = value;
    else if (el.tagName === 'A' && /^(https?:|tel:)/.test(value)) el.href = value;
    else el.textContent = value;
  });

  const h1 = document.querySelector('#hero-title');
  h1.innerHTML = `${SITE.hero.h1[0]}<br><em></em>`;
  h1.querySelector('em').textContent = SITE.hero.h1[1];

  const facts = document.querySelector('.hero-facts');
  facts.innerHTML = SITE.hero.facts.map(() => '<span></span>').join('');
  [...facts.children].forEach((el, i) => { el.textContent = SITE.hero.facts[i]; });

  const track = document.querySelector('.ticker-track');
  const line = SITE.ticker.concat(SITE.ticker);
  track.innerHTML = line.map(() => '<span></span><i>\u2605</i>').join('');
  track.querySelectorAll('span').forEach((el, i) => { el.textContent = line[i]; });

  const gallery = document.querySelector('.gallery-grid');
  gallery.innerHTML = SITE.gallery.map((g) => `
    <figure class="gallery-card${g.tall ? ' tall' : ''} reveal is-visible"><img loading="lazy"><figcaption></figcaption></figure>
  `).join('');
  [...gallery.querySelectorAll('figure')].forEach((fig, i) => {
    fig.querySelector('img').src = SITE.gallery[i].src;
    fig.querySelector('img').alt = SITE.gallery[i].alt;
    fig.querySelector('figcaption').textContent = SITE.gallery[i].caption;
  });

  const proof = document.querySelector('.proof-grid');
  proof.innerHTML = SITE.proofCards.map(() => `
    <a class="proof-card reveal is-visible" target="_blank" rel="noopener"><span></span><strong></strong></a>
  `).join('');
  [...proof.children].forEach((card, i) => {
    const def = SITE.proofCards[i];
    card.href = SITE.links[def.key];
    card.querySelector('span').textContent = def.label;
    card.querySelector('strong').textContent = def.strong;
  });

  document.querySelectorAll('[data-slot-phone]').forEach((el) => { el.href = SITE.contact.phoneHref; });
  document.querySelector('.brand-mark img').src = SITE.brand.logoRoundel;

  const band = document.querySelector('.visit-band');
  if (band) band.style.backgroundImage = `linear-gradient(90deg, rgba(22,8,5,.93) 0 34%, rgba(22,8,5,.55) 62%, rgba(43,10,6,.35)), url('${SITE.visit.photo}')`;

  const theme = SITE.theme || {};
  const varMap = { char: '--char', char2: '--char-2', maroon: '--maroon', maroonDeep: '--maroon-deep', red: '--red', redHot: '--red-hot', gold: '--gold', yellow: '--yellow', milk: '--milk' };
  Object.keys(theme).forEach((k) => { if (varMap[k]) document.documentElement.style.setProperty(varMap[k], theme[k]); });
}
fillSlots();

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const tabsEl = document.querySelector('[data-category-tabs]');
const gridEl = document.querySelector('[data-menu-grid]');
const dialog = document.querySelector('[data-item-dialog]');
const dialogContent = document.querySelector('[data-dialog-content]');
const cartList = document.querySelector('[data-cart-list]');
const cartEmpty = document.querySelector('[data-cart-empty]');
const cartTotal = document.querySelector('[data-cart-total]');
const toast = document.querySelector('[data-toast]');

function renderTabs() {
  tabsEl.innerHTML = categories.map((category) => `
    <button type="button" class="${category.id === state.category ? 'is-active' : ''}" role="tab" aria-selected="${category.id === state.category}" data-category="${category.id}">
      ${category.label}
    </button>
  `).join('');
}

function renderMenu() {
  const items = menuItems.filter((item) => item.category === state.category);
  gridEl.innerHTML = items.map((item) => `
    <article class="menu-card reveal is-visible">
      ${item.photo
        ? `<div class="food-art" style="background-image:url('${item.photo}')" aria-hidden="true"></div>`
        : `<div class="food-art tile" aria-hidden="true"><img src="assets/logo-roundel.jpg" alt=""></div>`}
      <div class="menu-card-body">
        <p class="eyebrow">${categories.find((category) => category.id === item.category).label}</p>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="menu-card-footer">
          <span class="price">${money.format(item.basePrice)}</span>
          <button class="button customize" type="button" data-customize="${item.id}">Customize ${item.name}</button>
        </div>
      </div>
    </article>
  `).join('');
}

function openCustomizer(itemId) {
  const item = menuItems.find((entry) => entry.id === itemId);
  state.activeItem = {
    ...item,
    size: item.sizes[0],
    selectedToppings: [],
    quantity: 1,
    notes: ''
  };
  renderCustomizer();
  dialog.showModal();
}

function renderCustomizer() {
  const item = state.activeItem;
  dialogContent.innerHTML = `
    <p class="eyebrow">Customize</p>
    <h2 id="dialog-title">${item.name}</h2>
    <p>${item.description}</p>
    <label>Size
      <select data-size>
        ${item.sizes.map((size) => `<option ${size === item.size ? 'selected' : ''}>${size}</option>`).join('')}
      </select>
    </label>
    <div>
      <p class="eyebrow">Toppings</p>
      <div class="chips">
        ${item.toppings.length ? item.toppings.map((topping) => `<button class="chip ${item.selectedToppings.includes(topping) ? 'is-active' : ''}" type="button" data-topping="${topping}">${topping}</button>`).join('') : '<span>No add-ons for this item.</span>'}
      </div>
    </div>
    <label>Special instructions
      <input data-notes placeholder="Well done, light sauce, extra napkins">
    </label>
    <div class="menu-card-footer">
      <div class="qty" aria-label="Quantity">
        <button type="button" data-qty="-1">−</button>
        <strong>${item.quantity}</strong>
        <button type="button" data-qty="1">+</button>
      </div>
      <button class="button primary" type="button" data-add-active>Add to order</button>
    </div>
  `;
}

function itemUnitPrice(item) {
  return item.basePrice + item.selectedToppings.length * SITE.order.toppingPrice;
}

function addActiveToCart() {
  const item = state.activeItem;
  state.cart.push({
    id: `${item.id}-${Date.now()}`,
    menuItemId: item.id,
    name: item.name,
    size: item.size,
    toppings: [...item.selectedToppings],
    notes: item.notes,
    quantity: item.quantity,
    unitPrice: itemUnitPrice(item)
  });
  dialog.close();
  renderCart();
  showToast(`${item.name} added to order`);
}

function totals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = subtotal * SITE.order.taxRate;
  return { subtotal, tax, total: subtotal + tax };
}

function renderCart() {
  cartEmpty.hidden = state.cart.length > 0;
  cartTotal.hidden = state.cart.length === 0;
  cartList.innerHTML = state.cart.map((item) => `
    <div class="cart-row">
      <div>
        <strong>${item.name}</strong>
        <div>${item.size}${item.toppings.length ? ` · ${item.toppings.join(', ')}` : ''}</div>
      </div>
      <div class="cart-actions">
        <div class="qty">
          <button type="button" data-cart-qty="${item.id}" data-delta="-1">−</button>
          <strong>${item.quantity}</strong>
          <button type="button" data-cart-qty="${item.id}" data-delta="1">+</button>
        </div>
        <span>${money.format(item.unitPrice * item.quantity)}</span>
        <button class="icon-button" type="button" data-remove="${item.id}" aria-label="Remove ${item.name}">×</button>
      </div>
    </div>
  `).join('');
  const currentTotals = totals();
  cartTotal.innerHTML = `
    <div class="total-row"><span>Subtotal</span><strong>${money.format(currentTotals.subtotal)}</strong></div>
    <div class="total-row"><span>NJ sales tax</span><strong>${money.format(currentTotals.tax)}</strong></div>
    <div class="total-row grand"><span>Total</span><strong>${money.format(currentTotals.total)}</strong></div>
  `;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.setTimeout(() => toast.classList.remove('is-visible'), 1800);
}

tabsEl.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  state.category = button.dataset.category;
  renderTabs();
  renderMenu();
});

gridEl.addEventListener('click', (event) => {
  const button = event.target.closest('[data-customize]');
  if (button) openCustomizer(button.dataset.customize);
});

dialog.addEventListener('click', (event) => {
  const topping = event.target.closest('[data-topping]');
  const qty = event.target.closest('[data-qty]');
  const add = event.target.closest('[data-add-active]');
  if (topping) {
    const value = topping.dataset.topping;
    state.activeItem.selectedToppings = state.activeItem.selectedToppings.includes(value)
      ? state.activeItem.selectedToppings.filter((entry) => entry !== value)
      : [...state.activeItem.selectedToppings, value];
    renderCustomizer();
  }
  if (qty) {
    state.activeItem.quantity = Math.max(1, state.activeItem.quantity + Number(qty.dataset.qty));
    renderCustomizer();
  }
  if (add) addActiveToCart();
});

dialog.addEventListener('change', (event) => {
  if (event.target.matches('[data-size]')) state.activeItem.size = event.target.value;
});

dialog.addEventListener('input', (event) => {
  if (event.target.matches('[data-notes]')) state.activeItem.notes = event.target.value;
});

cartList.addEventListener('click', (event) => {
  const remove = event.target.closest('[data-remove]');
  const qty = event.target.closest('[data-cart-qty]');
  if (remove) state.cart = state.cart.filter((item) => item.id !== remove.dataset.remove);
  if (qty) {
    const item = state.cart.find((entry) => entry.id === qty.dataset.cartQty);
    item.quantity = Math.max(1, item.quantity + Number(qty.dataset.delta));
  }
  renderCart();
});

renderTabs();
renderMenu();
renderCart();

const checkoutForm = document.querySelector('[data-checkout-form]');
const formError = document.querySelector('[data-form-error]');
const deliveryField = document.querySelector('.delivery-field');

function scrollToOrder() {
  document.querySelector('#menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('[data-scroll-order]').forEach((button) => {
  button.addEventListener('click', scrollToOrder);
});

document.querySelector('[data-open-checkout]').addEventListener('click', () => {
  document.querySelector('#checkout').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.querySelectorAll('[data-order-type]').forEach((button) => {
  button.addEventListener('click', () => {
    state.orderType = button.dataset.orderType;
    document.querySelectorAll('[data-order-type]').forEach((entry) => entry.classList.toggle('is-active', entry === button));
    deliveryField.hidden = state.orderType !== 'delivery';
  });
});

const ORDER_INBOX = SITE.order.inbox;
const LIVE_HOSTS = SITE.order.liveHosts;

function orderSummaryText() {
  const t = totals();
  const lines = state.cart.map((item) => {
    const extras = item.toppings.length ? ` + ${item.toppings.join(', ')}` : '';
    const notes = item.notes ? ` (${item.notes})` : '';
    return `${item.quantity}x ${item.name}${extras}${notes} — ${money.format(item.unitPrice * item.quantity)}`;
  });
  lines.push(`Subtotal ${money.format(t.subtotal)} | Tax ${money.format(t.tax)} | Total ${money.format(t.total)}`);
  return lines.join('\n');
}

async function submitOrder(payload) {
  const isLive = LIVE_HOSTS.some((h) => window.location.hostname.endsWith(h));
  if (!isLive) return { delivered: false };
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 4000);
  try {
    const resp = await fetch(ORDER_INBOX, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    return { delivered: resp.ok };
  } catch (err) {
    return { delivered: false };
  } finally {
    window.clearTimeout(timer);
  }
}

checkoutForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(checkoutForm);
  const name = String(data.get('customerName') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const address = String(data.get('address') || '').trim();
  if (!state.cart.length) {
    formError.textContent = 'Add an item before placing your order.';
    return;
  }
  if (!name || !phone) {
    formError.textContent = 'Add your name and phone to place the order.';
    return;
  }
  if (state.orderType === 'delivery' && !address) {
    formError.textContent = 'Add a delivery address so we know where the pies go.';
    return;
  }
  formError.textContent = '';
  const placeButton = checkoutForm.querySelector('[data-place-order]');
  if (placeButton) {
    placeButton.disabled = true;
    placeButton.textContent = 'Placing order…';
  }
  const confirmation = `${SITE.order.orderPrefix}-${Math.floor(1000 + Math.random() * 9000)}`;
  const scheduledTime = data.get('scheduledTime');
  await submitOrder({
    _subject: `New order ${confirmation} — ${SITE.brand.name} site`,
    order: confirmation,
    type: state.orderType,
    name,
    phone,
    address: state.orderType === 'delivery' ? address : 'pickup',
    time: scheduledTime,
    items: orderSummaryText()
  });
  checkoutForm.innerHTML = `
    <div class="confirmation">
      <p class="eyebrow">Order confirmed</p>
      <h2>Order received</h2>
      <p>Thanks ${name.split(' ')[0]} — your order number is <strong>${confirmation}</strong>. Estimated ${state.orderType === 'pickup' ? 'pickup' : 'delivery'} time: ${scheduledTime}.</p>
      <p>Questions about your order? Call the shop at <a href="${SITE.contact.phoneHref}"><strong>${SITE.contact.phone}</strong></a>.</p>
      <a class="button primary" href="${SITE.links.instagram}" target="_blank" rel="noopener">Follow on Instagram</a>
    </div>
  `;
  showToast(`Order ${confirmation} received`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
