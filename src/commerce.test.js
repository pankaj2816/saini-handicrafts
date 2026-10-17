import test from 'node:test';
import assert from 'node:assert/strict';
import { hamperPrice, basketTotals, sanitizeBasket, readBasket } from './commerce.js';

const products = [{ id: 'box', price: 1650 }, { id: 'planter', price: 1450 }];
const map = Object.fromEntries(products.map(p => [p.id, p]));

test('hamper prices include packaging and a plaque for every box at every quantity tier', () => {
  assert.equal(hamperPrice(['box', 'planter'], 'silk', 1, map), 3900);
  assert.equal(hamperPrice(['box', 'planter'], 'kraft', 1, map), 3650);
  assert.equal(hamperPrice(['box', 'planter'], 'silk', 10, map), 35100);
  assert.equal(hamperPrice(['box', 'planter'], 'silk', 25, map), 82875);
  assert.equal(hamperPrice(['box', 'planter'], 'silk', 50, map), 156000);
});

test('mixed basket coupons discount individual products without double-discounting hampers', () => {
  assert.deepEqual(basketTotals(4890, 35100, true, true, true), {
    extras: 600, discount: 489, subtotal: 40590, total: 40101
  });
});

test('empty and bundle-only baskets never retain individual-product extras', () => {
  assert.equal(basketTotals(0, 0, true, true, true).total, 0);
  assert.equal(basketTotals(0, 3900, true, true, true).total, 3900);
});

test('stored basket rejects missing products and invalid quantities', () => {
  const restored = sanitizeBasket({ cart: { box: 2, planter: -1, removed: 4 } }, products);
  assert.deepEqual(restored.cart, { box: 2 });
  assert.deepEqual(sanitizeBasket({ cart: { box: '2', planter: 1.5 } }, products).cart, {});
  assert.deepEqual(sanitizeBasket(null, products).cart, {});
});

test('stored bundles retain configuration while rejecting malformed and duplicate bundles', () => {
  const bundle = { id: 'hamper-example', items: ['box', 'planter'], boxStyle: 'kraft', quantity: 10, inscription: 'With love' };
  const restored = sanitizeBasket({ bundles: [bundle, bundle, { ...bundle, id: 'hamper-bad', items: ['removed'] }, null] }, products);
  assert.deepEqual(restored.bundles, [bundle]);
  assert.equal(hamperPrice(restored.bundles[0].items, 'kraft', 10, map), 32850);
});

test('unavailable storage falls back to an empty usable basket', () => {
  assert.deepEqual(readBasket(products).cart, {});
});
