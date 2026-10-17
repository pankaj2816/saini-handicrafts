export const STORAGE_KEY = 'rajasthani-forge-basket-v2';

export function hamperPrice(items, boxStyle, quantity, productMap) {
  const pieces = items.reduce((sum, id) => sum + (productMap[id]?.price || 0), 0);
  const packaging = boxStyle === 'silk' ? 450 : 200;
  const discount = quantity >= 50 ? 0.2 : quantity >= 25 ? 0.15 : quantity >= 10 ? 0.1 : 0;
  return Math.round((pieces + packaging + 350) * quantity * (1 - discount));
}

export function sanitizeBasket(value, products) {
  const validIds = new Set(products.map((product) => product.id));
  const source = value && typeof value === 'object' ? value : {};
  const cart = Object.fromEntries(Object.entries(source.cart || {}).filter(([id, quantity]) =>
    validIds.has(id) && Number.isInteger(quantity) && quantity > 0 && quantity <= 99));
  const bundles = Array.isArray(source.bundles) ? source.bundles.filter((bundle) =>
    bundle && typeof bundle.id === 'string' && bundle.id.startsWith('hamper-') &&
    Array.isArray(bundle.items) && bundle.items.length > 0 && bundle.items.length <= 3 &&
    new Set(bundle.items).size === bundle.items.length && bundle.items.every((id) => validIds.has(id)) &&
    ['silk', 'kraft'].includes(bundle.boxStyle) && [1, 10, 25, 50].includes(bundle.quantity) &&
    typeof bundle.inscription === 'string' && bundle.inscription.length <= 45
  ).filter((bundle, index, all) => all.findIndex((other) => other.id === bundle.id) === index).slice(0, 30) : [];
  return { cart, bundles, engraving: source.engraving === true,
    inscription: typeof source.inscription === 'string' ? source.inscription.slice(0, 40) : '',
    packaging: source.packaging === 'silk' ? 'silk' : 'standard' };
}

export function basketTotals(productSubtotal, bundleSubtotal, engraving, silk, coupon) {
  const extras = productSubtotal > 0 ? (engraving ? 350 : 0) + (silk ? 250 : 0) : 0;
  const discount = coupon ? Math.round(productSubtotal * 0.1) : 0;
  return { extras, discount, subtotal: productSubtotal + bundleSubtotal + extras,
    total: Math.max(0, productSubtotal + bundleSubtotal + extras - discount) };
}

export function readBasket(products) {
  try { return sanitizeBasket(JSON.parse(localStorage.getItem(STORAGE_KEY)), products); }
  catch { return sanitizeBasket(null, products); }
}
