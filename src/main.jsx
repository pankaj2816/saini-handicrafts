import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle,
  Clock,
  CreditCard,
  ExternalLink,
  Eye,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Package,
  Phone,
  Plus,
  Printer,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Truck,
  X
} from 'lucide-react';
import './styles.css';

const assetPath = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`;

const initialProducts = [
  {
    id: 'kalpavriksha-mural',
    name: 'Kalpavriksha Tree of Life Brass Mural',
    category: 'Wall Decor',
    price: 4890,
    originalPrice: 5900,
    badge: 'Bestseller',
    maker: 'Saini Handicrafts',
    stock: 'Ready to ship',
    image: assetPath('products/kalpavriksha-mural.jpg'),
    material: 'Embossed Antique Brass Relief',
    dimensions: '18" x 18" Plaque',
    care: 'Dust gently with dry microfiber cloth. Avoid chemical liquids.',
    story: 'Hand-beaten and embossed with the mythological wish-fulfilling Kalpavriksha banyan tree, showcasing intricate leaf patterns and cascading aerial roots finished in an antique bronze and gold luster.',
    description: 'Antique gold bas-relief wall art plaque celebrating traditional Indian heritage motifs.'
  },
  {
    id: 'live-edge-clock',
    name: 'Rustic Live-Edge Teak Wall Clock',
    category: 'Woodcraft',
    price: 3450,
    originalPrice: 4200,
    badge: 'Masterpiece',
    maker: 'Saini Handicrafts',
    stock: '2 units available',
    image: assetPath('products/live-edge-clock.jpg'),
    material: 'Reclaimed Hardwood & Brass Hands',
    dimensions: '16" x 12" x 1.5"',
    care: 'Wipe with dry cloth. Polish with natural teak wax once a year.',
    story: 'Chiseled out of a seasoned live-edge timber slab preserving the organic natural tree bark edge, sealed with natural oils to highlight golden knots, and fitted with vintage clock hands.',
    description: 'Solid live-edge wooden clock with natural rustic bark perimeter and antique metal movement.'
  },
  {
    id: 'shahi-sawari-mural',
    name: 'Royal Shahi Sawari Heritage Relief Plaque',
    category: 'Wall Decor',
    price: 5600,
    originalPrice: 6800,
    badge: 'Royal Heritage',
    maker: 'Saini Handicrafts',
    stock: 'Limited Edition',
    image: assetPath('products/shahi-sawari-mural.jpg'),
    material: 'Handcrafted Bas-Relief Metallic Panel',
    dimensions: '24" x 11" Panoramic Plaque',
    care: 'Clean with dry cloth. Indoor wall mounting recommended.',
    story: 'Panoramic bas-relief panel depicting a regal Rajasthani procession with a ceremonial royal elephant carrying the king under the royal chhatri, escorted by torchbearers.',
    description: 'Panoramic handcrafted bas-relief plaque capturing the grandeur of historic royal processions.'
  },
  {
    id: 'buddha-bust-wall-art',
    name: 'Serene Dhyana Buddha Wall Sculpture',
    category: 'Sculptural Art',
    price: 3200,
    originalPrice: 3900,
    badge: 'Spiritual Decor',
    maker: 'Saini Handicrafts',
    stock: 'Ready to ship',
    image: assetPath('products/buddha-bust-wall-art.jpg'),
    material: 'Cast Stone with Antique Patina',
    dimensions: '15" x 9" x 4"',
    care: 'Suitable for indoor and covered outdoor areas. Wipe clean.',
    story: 'Sculpted with serene closed-eye meditative expression, classic ushnisha hair curls, and weathered antique bronze patina for meditation and living corners.',
    description: 'Hand-finished Buddha bust relief wall sculpture designed for spiritual and tranquil living spaces.'
  },
  {
    id: 'triptych-tree-panels',
    name: 'Botanical Triptych Wall Panels (Set of 3)',
    category: 'Wall Decor',
    price: 3850,
    originalPrice: 4800,
    badge: 'Set of 3',
    maker: 'Saini Handicrafts',
    stock: 'Ready to ship',
    image: assetPath('products/triptych-tree-panels.jpg'),
    material: 'Embossed Antique Bronze & Frame',
    dimensions: 'Set of three 8" x 12" panels',
    care: 'Hang with attached brackets. Dust with dry cotton.',
    story: 'A symmetrical trio of framed wall plaques featuring hand-embossed tropical palm and central banyan motifs surrounded by ornate beaded borders.',
    description: 'Three-piece antique metallic wall art triptych featuring tropical and indigenous Indian tree silhouettes.'
  },
  {
    id: 'tribal-totem-trio',
    name: 'Tribal Heritage Totem Columns (Set of 3)',
    category: 'Sculptural Art',
    price: 2750,
    originalPrice: 3500,
    badge: 'Artisan Special',
    maker: 'Saini Handicrafts',
    stock: '4 sets available',
    image: assetPath('products/tribal-totem-trio.jpg'),
    material: 'Handcrafted Terracotta & Wood',
    dimensions: '14", 12", 10" Heights',
    care: 'Indoor decor piece. Clean with soft dry brush.',
    story: 'Cylindrical handcrafted pillars celebrating indigenous Indian folk facial iconography with ornate tilak engravings and vintage burnished texture.',
    description: 'Trio of handcrafted tribal face totems with earthy antique metallic accents and textured finish.'
  },
  {
    id: 'carved-leaf-box',
    name: 'Hand-Carved Leaf Motif Keepsake Box',
    category: 'Woodcraft',
    price: 1650,
    originalPrice: 2100,
    badge: 'Gifting Choice',
    maker: 'Saini Handicrafts',
    stock: '6 units left',
    image: assetPath('products/carved-leaf-box.jpg'),
    material: 'Solid Sheesham / Teak Wood',
    dimensions: '6" x 4.5" x 4"',
    care: 'Keep dry. Occasionally apply a drop of almond or mineral oil.',
    story: 'Chiseled from a solid block of seasoned wood featuring a tactile 3D relief leaf on the front facade, perfect for jewelry, heirlooms, and precious trinkets.',
    description: 'Hand-carved wooden storage box with raised botanical leaf carving and natural grain finish.'
  },
  {
    id: 'hex-planter-cart',
    name: 'Hexagonal Trike Wooden Planter Cart',
    category: 'Woodcraft',
    price: 1450,
    originalPrice: 1850,
    badge: 'Botanical Decor',
    maker: 'Saini Handicrafts',
    stock: 'Ready to ship',
    image: assetPath('products/hex-planter-cart.jpg'),
    material: 'Solid Pine & Reclaimed Teak',
    dimensions: '12" x 8" x 7"',
    care: 'Use indoor pot liner to prevent direct water-wood contact.',
    story: 'Handcrafted tricycle cart with geometric hexagonal wooden wheels, built to cradle small bonsai, succulents, or micro-greens for desks and shelves.',
    description: 'Artisan geometric wooden planter tricycle with dual hexagonal front wheels and natural wood finish.'
  }
];

const categories = ['All', 'Wall Decor', 'Woodcraft', 'Sculptural Art'];

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState({ 'kalpavriksha-mural': 1 });
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [navOpen, setNavOpen] = useState(false);

  // Custom Commission Form
  const [customCommission, setCustomCommission] = useState({
    name: '',
    phone: '',
    type: 'Brass Wall Mural',
    details: ''
  });
  const [commissionSubmitted, setCommissionSubmitted] = useState(false);

  // Checkout Form
  const [checkoutData, setCheckoutData] = useState({
    name: 'Pankaj Saini',
    phone: '+91 98765 43210',
    address: 'Artisan Workshop, Civil Lines, Jaipur, Rajasthan - 302006',
    paymentMethod: 'Cash on Delivery (COD)'
  });

  const allProducts = initialProducts;

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((item) => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const q = searchTerm.trim().toLowerCase();
      const matchSearch = !q || [item.name, item.category, item.description, item.material, item.badge]
        .some((val) => String(val || '').toLowerCase().includes(q));
      return matchCat && matchSearch;
    });

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [allProducts, activeCategory, searchTerm, sortBy]);

  const productMap = useMemo(() => Object.fromEntries(allProducts.map((p) => [p.id, p])), [allProducts]);
  const cartItemCount = useMemo(() => Object.values(cart).reduce((sum, qty) => sum + qty, 0), [cart]);
  const subtotal = useMemo(() => Object.entries(cart).reduce((sum, [id, qty]) => sum + (productMap[id]?.price || 0) * qty, 0), [cart, productMap]);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = Math.max(subtotal - discount, 0);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const updateCartQty = (id, delta) => {
    setCart((current) => {
      const next = { ...current };
      const newQty = (next[id] || 0) + delta;
      if (newQty <= 0) {
        delete next[id];
      } else {
        next[id] = newQty;
      }
      return next;
    });
  };

  const applyPromo = () => {
    if (couponCode.trim().toUpperCase() === 'SAINI10') {
      setCouponApplied(true);
      showToast('10% artisan promo code applied!');
    } else {
      showToast('Invalid coupon. Try SAINI10');
    }
  };

  const whatsAppOrderText = encodeURIComponent(
    `Hello Saini Handicrafts! I would like to place an order:\n\n${Object.entries(cart)
      .map(([id, qty]) => `• ${productMap[id]?.name || id} x ${qty} (Rs. ${(productMap[id]?.price || 0) * qty})`)
      .join('\n')}\n\nTotal Amount: Rs. ${finalTotal.toLocaleString('en-IN')}\nDelivery To: ${checkoutData.name}, ${checkoutData.address}`
  );

  return (
    <div className="site-wrapper">
      {/* 1. Top Announcement */}
      <div className="top-strip">
        <span>Authentic Indian Heritage Handicrafts • Direct Workshop Pricing • Free Pan-India Insured Shipping</span>
      </div>

      {/* 2. Header */}
      <header className="header">
        <div className="header-container">
          <a href="#top" className="logo">
            <span className="logo-badge">SH</span>
            <div>
              <span className="logo-title">SAINI HANDICRAFTS</span>
              <span className="logo-sub">Artisan Atelier • Jaipur</span>
            </div>
          </a>

          <nav className={`nav-menu ${navOpen ? 'open' : ''}`}>
            <a href="#collection" onClick={() => setNavOpen(false)}>Collection</a>
            <a href="#heritage" onClick={() => setNavOpen(false)}>Craft Heritage</a>
            <a href="#custom" onClick={() => setNavOpen(false)}>Custom Orders</a>
            <a href="#contact" onClick={() => setNavOpen(false)}>Contact & Visit</a>
          </nav>

          <div className="header-actions">
            <button className="btn-icon" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}>
              <Search size={18} />
            </button>
            <button className="btn-cart" aria-label="Cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={18} />
              <span>{cartItemCount}</span>
            </button>
            <button className="btn-icon mobile-menu-toggle" aria-label="Menu" onClick={() => setNavOpen(!navOpen)}>
              {navOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="header-search-bar">
            <Search size={18} />
            <input
              autoFocus
              type="text"
              placeholder="Search by product name, brass, teak wood, mural, sculpture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setSearchOpen(false)}><X size={16} /></button>
          </div>
        )}
      </header>

      {/* 3. Hero */}
      <section className="hero-section" id="top">
        <div className="hero-grid">
          <div className="hero-text-content">
            <span className="section-eyebrow"><Sparkles size={14} /> Traditional Handcrafting</span>
            <h1 className="hero-headline">Authentic Indian crafts, shaped with soul and patience.</h1>
            <p className="hero-desc">
              Discover genuine hand-beaten brass wall murals, natural live-edge teak clocks, and carved tribal sculptures direct from our artisan workshop in Rajasthan.
            </p>
            <div className="hero-btn-row">
              <a href="#collection" className="btn-primary">
                View Collection ({allProducts.length} Pieces) <ArrowRight size={17} />
              </a>
              <a href="#custom" className="btn-secondary">
                Request Custom Size
              </a>
            </div>
            <div className="hero-guarantee-strip">
              <div><strong>100%</strong> <span>Genuine Craft</span></div>
              <div className="hero-sep" />
              <div><strong>3D Detail</strong> <span>Hand Chiseled</span></div>
              <div className="hero-sep" />
              <div><strong>Safe Transit</strong> <span>Insured Boxing</span></div>
            </div>
          </div>

          <div className="hero-image-wrap">
            <img src={assetPath('products/kalpavriksha-mural.jpg')} alt="Kalpavriksha Brass Mural" />
            <div className="hero-badge-card">
              <strong>Kalpavriksha Brass Mural</strong>
              <span>Hand-Embossed Relief Plaque • Rs. 4,890</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Highlights Bar */}
      <section className="trust-bar">
        <div className="trust-item">
          <ShieldCheck size={24} />
          <div>
            <strong>Authentic Heritage</strong>
            <span>Direct small-batch artisan crafting</span>
          </div>
        </div>
        <div className="trust-item">
          <Truck size={24} />
          <div>
            <strong>Safe Insured Shipping</strong>
            <span>Secure wood-cushioned delivery</span>
          </div>
        </div>
        <div className="trust-item">
          <BadgeCheck size={24} />
          <div>
            <strong>Certificate of Authenticity</strong>
            <span>Sealed with every master commission</span>
          </div>
        </div>
        <div className="trust-item">
          <MessageCircle size={24} />
          <div>
            <strong>Workshop Direct Support</strong>
            <span>WhatsApp assistance & custom sizing</span>
          </div>
        </div>
      </section>

      {/* 5. Product Catalog */}
      <section className="catalog-section" id="collection">
        <div className="section-head">
          <span className="section-eyebrow">curated catalog</span>
          <h2>The Handcrafted Collection</h2>
          <p>Explore our full range of live-edge woodcrafts, antique brass relief art, and sacred sculptures.</p>
        </div>

        <div className="catalog-controls">
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={activeCategory === cat ? 'active' : ''}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sort-control">
            <SlidersHorizontal size={15} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="card" key={product.id}>
              <div className="card-image-box" onClick={() => setSelectedProduct(product)}>
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="card-badge">{product.badge}</span>
                <span className="card-overlay"><Eye size={16} /> Quick View Details</span>
              </div>

              <div className="card-info">
                <span className="card-category">{product.category}</span>
                <h3 onClick={() => setSelectedProduct(product)}>{product.name}</h3>
                <p className="card-material">{product.material} • {product.dimensions}</p>

                <div className="card-price-row">
                  <div className="price-group">
                    <span className="current-price">Rs. {product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="old-price">Rs. {product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  <span className="stock-tag">{product.stock}</span>
                </div>

                <div className="card-action-row">
                  <button className="btn-card-add" onClick={() => { updateCartQty(product.id, 1); showToast(`Added ${product.name} to cart`); }}>
                    <ShoppingBag size={15} /> Add to Cart
                  </button>
                  <button className="btn-card-view" onClick={() => setSelectedProduct(product)}>
                    Details <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-catalog">
            <Package size={40} />
            <p>No products found matching your search. Try resetting filters.</p>
            <button className="btn-secondary" onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}>
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 6. Heritage Craft Story */}
      <section className="heritage-section" id="heritage">
        <div className="heritage-grid">
          <div className="heritage-text">
            <span className="section-eyebrow">authentic lineage</span>
            <h2>Carved by hand. Preserved for generations.</h2>
            <p>
              At <strong>Saini Handicrafts</strong>, every piece originates from a slow, deliberate artisanal process. We specialize in live-edge seasoned hardwood chiseling, traditional repoussé metal embossing, and weathered patina stonework.
            </p>
            <div className="heritage-pillars">
              <div className="pillar-item">
                <span className="pillar-num">01</span>
                <div>
                  <strong>Live-Edge Hardwood Chiseling</strong>
                  <p>Preserving natural wood knots, bark perimeters, and organic tree rings with organic oils.</p>
                </div>
              </div>
              <div className="pillar-item">
                <span className="pillar-num">02</span>
                <div>
                  <strong>Repoussé Brass Relief</strong>
                  <p>Hand-hammered brass sheets yielding 3D depth and antique burnished highlights.</p>
                </div>
              </div>
              <div className="pillar-item">
                <span className="pillar-num">03</span>
                <div>
                  <strong>Patina Finishing & Inspection</strong>
                  <p>Natural lacquers and protective seals ensure enduring beauty without chemical peeling.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="heritage-image-box">
            <img src={assetPath('products/live-edge-clock.jpg')} alt="Live Edge Teak Clock Craftsmanship" />
          </div>
        </div>
      </section>

      {/* 7. Custom Commissions */}
      <section className="custom-section" id="custom">
        <div className="custom-container">
          <div className="section-head">
            <span className="section-eyebrow">bespoke commissions</span>
            <h2>Commission a Custom Artisan Piece</h2>
            <p>Looking for a custom-sized brass mural, live-edge tabletop, temple backdrop, or corporate gifting? Contact our master atelier directly.</p>
          </div>

          {commissionSubmitted ? (
            <div className="commission-success">
              <CheckCircle size={44} />
              <h3>Commission Request Received</h3>
              <p>Our workshop team will review your requirements and connect with you on WhatsApp / Phone within 24 hours.</p>
              <button className="btn-secondary" onClick={() => setCommissionSubmitted(false)}>Submit Another Inquiry</button>
            </div>
          ) : (
            <form className="custom-form-clean" onSubmit={(e) => { e.preventDefault(); setCommissionSubmitted(true); }}>
              <div className="form-two-col">
                <label>
                  Your Name
                  <input
                    required
                    placeholder="e.g. Pankaj Saini"
                    value={customCommission.name}
                    onChange={(e) => setCustomCommission({ ...customCommission, name: e.target.value })}
                  />
                </label>
                <label>
                  WhatsApp / Phone Number
                  <input
                    required
                    placeholder="+91 98765 43210"
                    value={customCommission.phone}
                    onChange={(e) => setCustomCommission({ ...customCommission, phone: e.target.value })}
                  />
                </label>
              </div>

              <div className="form-two-col">
                <label>
                  Commission Category
                  <select
                    value={customCommission.type}
                    onChange={(e) => setCustomCommission({ ...customCommission, type: e.target.value })}
                  >
                    <option>Custom Brass Wall Mural</option>
                    <option>Live-Edge Wood Wall Clock / Slab</option>
                    <option>Sacred Sculptures & Mandir Panels</option>
                    <option>Wedding Return Gifts (50+ units)</option>
                    <option>Corporate Festival Hampers</option>
                  </select>
                </label>
                <label>
                  Preferred Dimension / Material
                  <input placeholder="e.g. 24x24 inches in Antique Brass" />
                </label>
              </div>

              <label>
                Specific Requirements / Inscription Details
                <textarea
                  rows={4}
                  placeholder="Describe your space, required finish, timeframe, or specific inscriptions..."
                  value={customCommission.details}
                  onChange={(e) => setCustomCommission({ ...customCommission, details: e.target.value })}
                  required
                />
              </label>

              <button className="btn-primary" type="submit">
                <Send size={16} /> Send Commission Inquiry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 8. Slide-Out Cart Drawer */}
      {cartOpen && (
        <div className="drawer-overlay" onClick={() => setCartOpen(false)}>
          <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <div>
                <span className="section-eyebrow">shopping basket</span>
                <h3>Your Selections ({cartItemCount})</h3>
              </div>
              <button className="btn-icon" onClick={() => setCartOpen(false)}><X size={18} /></button>
            </div>

            <div className="drawer-body">
              {Object.entries(cart).map(([id, qty]) => {
                const item = productMap[id];
                if (!item) return null;
                return (
                  <div className="cart-item-row" key={id}>
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-meta">
                      <strong>{item.name}</strong>
                      <span className="cart-item-price">Rs. {item.price.toLocaleString('en-IN')}</span>
                      <div className="qty-stepper">
                        <button onClick={() => updateCartQty(id, -1)}><Minus size={13} /></button>
                        <span>{qty}</span>
                        <button onClick={() => updateCartQty(id, 1)}><Plus size={13} /></button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {cartItemCount === 0 && (
                <div className="empty-cart-msg">
                  <ShoppingBag size={36} />
                  <p>Your basket is currently empty.</p>
                </div>
              )}
            </div>

            {cartItemCount > 0 && (
              <div className="drawer-foot">
                <div className="promo-box">
                  <input
                    type="text"
                    placeholder="Coupon: SAINI10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button onClick={applyPromo}>Apply</button>
                </div>

                {couponApplied && (
                  <div className="promo-applied-tag">
                    <CheckCircle size={14} /> 10% discount applied (-Rs. {discount.toLocaleString('en-IN')})
                  </div>
                )}

                <div className="cart-summary-line">
                  <span>Subtotal:</span>
                  <span>Rs. {subtotal.toLocaleString('en-IN')}</span>
                </div>
                {couponApplied && (
                  <div className="cart-summary-line discount">
                    <span>Artisan Promo:</span>
                    <span>-Rs. {discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="cart-summary-line total">
                  <strong>Total Payable:</strong>
                  <strong>Rs. {finalTotal.toLocaleString('en-IN')}</strong>
                </div>

                <a className="btn-whatsapp" href={`https://wa.me/?text=${whatsAppOrderText}`} target="_blank" rel="noreferrer">
                  <MessageCircle size={18} /> Quick Order on WhatsApp
                </a>

                <button
                  className="btn-primary full-width"
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                  }}
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* 9. Product Details Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" onClick={() => setSelectedProduct(null)}><X size={18} /></button>

            <div className="modal-gallery">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>

            <div className="modal-details">
              <span className="section-eyebrow">{selectedProduct.category}</span>
              <h2>{selectedProduct.name}</h2>

              <div className="modal-price-box">
                <span className="modal-price">Rs. {selectedProduct.price.toLocaleString('en-IN')}</span>
                {selectedProduct.originalPrice && (
                  <span className="modal-old-price">Rs. {selectedProduct.originalPrice.toLocaleString('en-IN')}</span>
                )}
                <span className="modal-stock">{selectedProduct.stock}</span>
              </div>

              <div className="modal-specs">
                <div><strong>Material:</strong> <span>{selectedProduct.material}</span></div>
                <div><strong>Dimensions:</strong> <span>{selectedProduct.dimensions}</span></div>
                <div><strong>Care:</strong> <span>{selectedProduct.care}</span></div>
                <div><strong>Origin:</strong> <span>Saini Handicrafts Atelier, Rajasthan</span></div>
              </div>

              <div className="modal-narrative">
                <strong>Artisan Craftsmanship</strong>
                <p>{selectedProduct.story}</p>
              </div>

              <div className="modal-buttons">
                <button
                  className="btn-primary"
                  onClick={() => {
                    updateCartQty(selectedProduct.id, 1);
                    setSelectedProduct(null);
                    setCartOpen(true);
                  }}
                >
                  <ShoppingBag size={17} /> Add to Cart
                </button>
                <a
                  className="btn-whatsapp"
                  href={`https://wa.me/?text=${encodeURIComponent(`Hello Saini Handicrafts, I want to inquire about "${selectedProduct.name}" (Price: Rs. ${selectedProduct.price}).`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={17} /> WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. Checkout & Confirmation Modal */}
      {checkoutOpen && (
        <div className="modal-overlay" onClick={() => setCheckoutOpen(false)}>
          <div className="checkout-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" onClick={() => setCheckoutOpen(false)}><X size={18} /></button>

            {checkoutSuccess ? (
              <div className="order-confirmed-view">
                <CheckCircle size={54} className="confirm-icon" />
                <h2>Order Confirmed!</h2>
                <p>Order ID: <strong>SH-2026-8819</strong>. Your authentic handicraft order is being packaged with utmost care.</p>

                <div className="cert-preview">
                  <div className="cert-badge"><Sparkles size={14} /> Certificate of Authenticity</div>
                  <h4>Saini Handicrafts Original Commission</h4>
                  <p>Certified genuine handmade piece crafted with traditional methods.</p>
                  <small>Serial: SH-CERT-2026-8819</small>
                </div>

                <div className="checkout-btn-group">
                  <button className="btn-secondary" onClick={() => window.print()}>
                    <Printer size={16} /> Print Order Receipt
                  </button>
                  <a className="btn-whatsapp" href={`https://wa.me/?text=${whatsAppOrderText}`} target="_blank" rel="noreferrer">
                    <MessageCircle size={16} /> Send Order Copy to WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form className="checkout-form-view" onSubmit={(e) => { e.preventDefault(); setCheckoutSuccess(true); }}>
                <h2>Finalize Delivery</h2>
                <div className="order-brief">
                  <span>Items: {cartItemCount}</span>
                  <strong>Total: Rs. {finalTotal.toLocaleString('en-IN')}</strong>
                </div>

                <label>
                  Full Name
                  <input
                    required
                    value={checkoutData.name}
                    onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                  />
                </label>
                <label>
                  Contact Number (WhatsApp enabled)
                  <input
                    required
                    value={checkoutData.phone}
                    onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                  />
                </label>
                <label>
                  Delivery Address & Pincode
                  <textarea
                    required
                    rows={3}
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                  />
                </label>
                <label>
                  Payment Preference
                  <select
                    value={checkoutData.paymentMethod}
                    onChange={(e) => setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })}
                  >
                    <option>Cash on Delivery (COD)</option>
                    <option>UPI QR Code (Google Pay / PhonePe)</option>
                    <option>Direct Bank Transfer / NEFT</option>
                  </select>
                </label>

                <button className="btn-primary full-width" type="submit">
                  <CreditCard size={17} /> Confirm Order (Rs. {finalTotal.toLocaleString('en-IN')})
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 11. Floating Toast */}
      {toastMessage && <div className="site-toast">{toastMessage}</div>}

      {/* 12. Clean Luxury Footer */}
      <footer className="footer" id="contact">
        <div className="footer-grid">
          <div className="footer-col-main">
            <div className="logo light">
              <span className="logo-badge">SH</span>
              <div>
                <span className="logo-title">SAINI HANDICRAFTS</span>
                <span className="logo-sub">Artisan Atelier • Rajasthan</span>
              </div>
            </div>
            <p className="footer-about">
              Celebrating authentic Indian craftsmanship. Hand-chiseled live edge woodwork, repoussé brass murals,
              and sculpted heritage treasures crafted by master artisans in Rajasthan.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <a href="#collection">Collection</a>
            <a href="#heritage">Craft Heritage</a>
            <a href="#custom">Custom Commissions</a>
            <a href="#contact">Contact & Workshop</a>
          </div>

          <div className="footer-col">
            <h4>Workshop & Inquiries</h4>
            <p><MapPin size={15} /> Jaipur & Alwar, Rajasthan, India</p>
            <p><Phone size={15} /> WhatsApp / Phone: +91 98765 43210</p>
            <p><Sparkles size={15} /> 100% Genuine Handmade Quality</p>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} Saini Handicrafts. All rights reserved.</p>
          <p>Handmade with pride in Rajasthan • Free GitHub Pages Ready</p>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
