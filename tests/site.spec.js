const { test, expect } = require('@playwright/test');
const SITE = require('../site.config.js');

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('renders hero and required proof links from config', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: new RegExp(esc(SITE.hero.h1[0]), 'i') })).toBeVisible();
  await expect(page.locator('#hero-scene')).toBeVisible();
  for (const card of SITE.proofCards) {
    await expect(page.locator('.proof-grid').getByRole('link', { name: new RegExp(card.label, 'i') }))
      .toHaveAttribute('href', SITE.links[card.key]);
  }
});

test('menu category switching and cart add flow work', async ({ page }) => {
  const secondCat = SITE.menu.categories[1];
  const item = SITE.menu.items.find((i) => i.category === secondCat.id);
  await page.goto('/');
  await page.getByRole('tab', { name: new RegExp(esc(secondCat.label), 'i') }).click();
  await expect(page.getByRole('heading', { name: new RegExp('^' + esc(item.name) + '$', 'i') })).toBeVisible();
  await page.getByRole('button', { name: new RegExp('Customize ' + esc(item.name), 'i') }).click();
  await page.getByRole('button', { name: /Add to order/i }).click();
  await expect(page.getByText(new RegExp(esc(item.name), 'i')).last()).toBeVisible();
  await expect(page.getByText(money.format(item.basePrice)).last()).toBeVisible();
});

test('checkout validates required fields and creates confirmation', async ({ page }) => {
  const first = SITE.menu.items.find((i) => i.category === SITE.menu.categories[0].id);
  await page.goto('/');
  await page.getByRole('button', { name: new RegExp('Customize ' + esc(first.name), 'i') }).click();
  await page.getByRole('button', { name: /Add to order/i }).click();
  await page.getByRole('button', { name: /Checkout/i }).click();
  await page.getByRole('button', { name: /Place order/i }).click();
  await expect(page.getByText(/Add your name and phone/i)).toBeVisible();
  await page.getByLabel(/Name/i).fill('Jason');
  await page.getByLabel(/Phone/i).fill('7325550100');
  await page.getByRole('button', { name: /Place order/i }).click();
  await expect(page.getByRole('heading', { name: /Order received/i })).toBeVisible();
  await expect(page.getByText(new RegExp(SITE.order.orderPrefix + '-')).first()).toBeVisible();
});
