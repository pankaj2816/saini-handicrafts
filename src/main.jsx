import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  CreditCard,
  Edit3,
  FileText,
  Gift,
  Heart,
  ImagePlus,
  LogIn,
  LogOut,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Save,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Truck,
  User,
  X
} from 'lucide-react';
import './styles.css';

const starterProducts = [
  {
    id: 'terracotta-vase',
    name: 'Terracotta Bloom Vase',
    category: 'Ceramic Decor',
    price: 1890,
    tone: 'clay',
    badge: 'Best seller',
    maker: 'Saini Handicrafts',
    stock: 'Ready to ship',
    image: '/assets/product-ceramic.png',
    mood: 'Warm Home',
    material: 'Terracotta clay',
    care: 'Wipe with a soft dry cloth. Keep away from standing water.',
    story: 'Thrown slowly on the wheel, dried in shade, and finished with a soft floral rim for festive corners.',
    description: 'Hand-thrown vase with soft matte glaze and floral rim work.'
  },
  {
    id: 'indigo-runner',
    name: 'Indigo Loom Runner',
    category: 'Textile Art',
    price: 2450,
    tone: 'indigo',
    badge: 'New',
    maker: 'Saini Handicrafts',
    stock: 'Made to order',
    image: '/assets/product-textile.png',
    mood: 'Festive Table',
    material: 'Handwoven cotton',
    care: 'Hand wash separately in cold water. Dry in shade.',
    story: 'Dyed in deep indigo and block-printed in small runs, so every runner carries slight pattern variation.',
    description: 'Natural cotton table runner with hand-blocked resist patterns.'
  },
  {
    id: 'neem-box',
    name: 'Carved Neem Keepsake Box',
    category: 'Woodcraft',
    price: 1650,
    tone: 'wood',
    badge: 'Limited',
    maker: 'Saini Handicrafts',
    stock: '3 left',
    image: '/assets/product-wood.png',
    mood: 'Thoughtful Gift',
    material: 'Neem wood',
    care: 'Wipe dry. Refresh with a tiny amount of natural oil every few months.',
    story: 'Carved from neem wood, hand-sanded, and oil-finished so the grain stays visible under the floral pattern.',
    description: 'Small storage box carved by hand and finished with plant oils.'
  },
  {
    id: 'flower-journal',
    name: 'Pressed Flower Journal',
    category: 'Paper Craft',
    price: 920,
    tone: 'paper',
    badge: 'Gift pick',
    maker: 'Saini Handicrafts',
    stock: 'Ready to ship',
    image: '/assets/product-journal.png',
    mood: 'Personal Keepsake',
    material: 'Handmade paper',
    care: 'Keep away from moisture and direct sunlight.',
    story: 'Pressed botanicals are set into deckled paper covers, making each journal feel like a small preserved memory.',
    description: 'Lay-flat handmade paper journal with pressed botanical cover.'
  }
];

const blankProduct = {
  name: '',
  category: 'Ceramic Decor',
  price: 999,
  badge: 'New',
  stock: 'Ready to ship',
  mood: 'Warm Home',
  material: 'Handmade craft',
  care: 'Handle gently and keep dry.',
  story: '',
  description: '',
  image: ''
};

const processSteps = [
  ['Sketch', 'Idea, size, shape, and use-case are mapped before material work starts.'],
  ['Make', 'Clay, cloth, wood, and paper are shaped slowly with visible maker touch.'],
  ['Finish', 'Each piece is checked, wrapped, and prepared like a gift, not inventory.']
];

const moodFilters = ['All', 'Warm Home', 'Festive Table', 'Thoughtful Gift', 'Personal Keepsake'];
const materialFilters = ['All materials', 'Terracotta clay', 'Handwoven cotton', 'Neem wood', 'Handmade paper'];
const priceFilters = ['All prices', 'Under Rs. 1,000', 'Rs. 1,000 - Rs. 2,000', 'Above Rs. 2,000'];
const wishlistCollections = ['Wedding Gifts', 'Home Decor', 'Festival Picks'];

const giftPrompts = {
  'Home warming': {
    product: 'Terracotta Bloom Vase',
    reason: 'A warm decor piece for entry tables, shelves, and new-home corners.'
  },
  'Festival hosting': {
    product: 'Indigo Loom Runner',
    reason: 'Adds a handmade table setting for dinners, puja setups, and festive meals.'
  },
  'Personal note': {
    product: 'Pressed Flower Journal',
    reason: 'Feels intimate for writers, students, memory keeping, and thoughtful notes.'
  },
  'Premium keepsake': {
    product: 'Carved Neem Keepsake Box',
    reason: 'A lasting handmade object for jewellery, letters, and small treasures.'
  }
};

const roomGuides = {
  'Living room': {
    product: 'Terracotta Bloom Vase',
    tip: 'Place it on a console or open shelf with warm light and neutral books.'
  },
  'Dining table': {
    product: 'Indigo Loom Runner',
    tip: 'Use it as the first layer, then add brass accents or handmade bowls.'
  },
  'Puja corner': {
    product: 'Terracotta Bloom Vase',
    tip: 'Pair clay textures with flowers, diyas, and a small wooden tray.'
  },
  'Writing desk': {
    product: 'Pressed Flower Journal',
    tip: 'Keep it near stationery, dried flowers, and a small keepsake object.'
  },
  'Gift table': {
    product: 'Carved Neem Keepsake Box',
    tip: 'Wrap it with cotton ribbon and a handwritten note for a premium gift.'
  }
};

const packagingStyles = {
  'Natural craft wrap': {
    color: '#d8bf8f',
    detail: 'Kraft paper, cotton cord, dried leaf tag, and a handwritten note.'
  },
  'Festive premium box': {
    color: '#b95e3e',
    detail: 'Terracotta sleeve, gold seal, fabric ribbon, and festive greeting card.'
  },
  'Corporate minimal hamper': {
    color: '#245c62',
    detail: 'Structured box, clean label, neutral wrap, and branded note card.'
  }
};

const colorStories = {
  Terracotta: {
    color: '#b95e3e',
    mood: 'Warm Home',
    copy: 'Earthy, warm, and perfect for corners that need handmade presence.'
  },
  Indigo: {
    color: '#245c62',
    mood: 'Festive Table',
    copy: 'Deep, calm, and elegant for dining tables and textile-led settings.'
  },
  Neem: {
    color: '#7e5336',
    mood: 'Thoughtful Gift',
    copy: 'Grounded wood tones for keepsakes, memory boxes, and premium gifting.'
  },
  Ivory: {
    color: '#d9c78e',
    mood: 'Personal Keepsake',
    copy: 'Soft handmade-paper mood for journals, notes, and delicate gifts.'
  }
};

const festivalCollections = {
  Diwali: {
    product: 'Terracotta Bloom Vase',
    copy: 'Warm clay textures, flower corners, and festive gifting.'
  },
  Wedding: {
    product: 'Carved Neem Keepsake Box',
    copy: 'Premium keepsakes for couples, family gifts, and trousseau moments.'
  },
  Rakhi: {
    product: 'Pressed Flower Journal',
    copy: 'Personal gifts with handwritten notes and delicate packaging.'
  },
  Corporate: {
    product: 'Indigo Loom Runner',
    copy: 'Useful handcrafted gifts with polished packaging and repeat ordering.'
  }
};

const makerSpots = [
  ['Clay corner', 'Jaipur-inspired pottery', 'Terracotta Bloom Vase'],
  ['Loom table', 'Indigo cotton and block print', 'Indigo Loom Runner'],
  ['Wood bench', 'Carved neem keepsakes', 'Carved Neem Keepsake Box'],
  ['Paper desk', 'Pressed botanicals and journals', 'Pressed Flower Journal']
];

const ADMIN_CODE = 'SAINI-ADMIN';
const ADMIN_EMAIL = 'owner@sainihandicrafts.com';

function loadSavedProducts() {
  try {
    return JSON.parse(localStorage.getItem('saini-products')) || [];
  } catch {
    return [];
  }
}

function loadSavedAccount() {
  try {
    return JSON.parse(localStorage.getItem('saini-account')) || null;
  } catch {
    return null;
  }
}

function loadSavedWishlist() {
  try {
    return JSON.parse(localStorage.getItem('saini-wishlist')) || {};
  } catch {
    return {};
  }
}

function App() {
  const [customProducts, setCustomProducts] = useState(loadSavedProducts);
  const [account, setAccount] = useState(loadSavedAccount);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('saini-admin') === 'true');
  const [cart, setCart] = useState({ 'terracotta-vase': 1, 'indigo-runner': 1 });
  const [cartOpen, setCartOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [moodFilter, setMoodFilter] = useState('All');
  const [materialFilter, setMaterialFilter] = useState('All materials');
  const [priceFilter, setPriceFilter] = useState('All prices');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState('');
  const [wishlistNote, setWishlistNote] = useState('');
  const [wishlist, setWishlist] = useState(loadSavedWishlist);
  const [giftMood, setGiftMood] = useState('Home warming');
  const [quiz, setQuiz] = useState({ person: 'Family', budget: 'Rs. 1,000 - Rs. 2,000', style: 'Warm Home' });
  const [giftBox, setGiftBox] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('Living room');
  const [packagingStyle, setPackagingStyle] = useState('Natural craft wrap');
  const [selectedColor, setSelectedColor] = useState('Terracotta');
  const [selectedFestival, setSelectedFestival] = useState('Diwali');
  const [stylingAfter, setStylingAfter] = useState(false);
  const [selectedMaker, setSelectedMaker] = useState(makerSpots[0][0]);
  const [styleBoard, setStyleBoard] = useState(['terracotta-vase', 'indigo-runner']);
  const [budgetLimit, setBudgetLimit] = useState(2500);
  const [giftNote, setGiftNote] = useState('For a home filled with warmth and handmade stories.');
  const [dropReminder, setDropReminder] = useState(false);
  const [compareIds, setCompareIds] = useState(['terracotta-vase', 'neem-box']);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [productForm, setProductForm] = useState(blankProduct);
  const [editingProductId, setEditingProductId] = useState('');
  const [customReference, setCustomReference] = useState('');
  const [adminForm, setAdminForm] = useState({ email: '', code: '' });
  const [adminError, setAdminError] = useState('');
  const [accountForm, setAccountForm] = useState({
    name: account?.name || '',
    email: account?.email || '',
    phone: account?.phone || ''
  });

  const products = useMemo(() => [...starterProducts, ...customProducts], [customProducts]);
  const visibleProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesMood = moodFilter === 'All' || product.mood === moodFilter;
      const matchesMaterial = materialFilter === 'All materials' || product.material === materialFilter;
      const matchesPrice =
        priceFilter === 'All prices' ||
        (priceFilter === 'Under Rs. 1,000' && product.price < 1000) ||
        (priceFilter === 'Rs. 1,000 - Rs. 2,000' && product.price >= 1000 && product.price <= 2000) ||
        (priceFilter === 'Above Rs. 2,000' && product.price > 2000);
      const matchesSearch = !query || [product.name, product.category, product.description, product.stock, product.mood, product.material]
        .some((value) => String(value || '').toLowerCase().includes(query));
      return matchesMood && matchesMaterial && matchesPrice && matchesSearch;
    });
  }, [products, searchTerm, moodFilter, materialFilter, priceFilter]);
  const productById = useMemo(() => Object.fromEntries(products.map((product) => [product.id, product])), [products]);
  const cartCount = useMemo(() => Object.values(cart).reduce((sum, qty) => sum + qty, 0), [cart]);
  const total = useMemo(
    () => Object.entries(cart).reduce((sum, [id, qty]) => sum + (productById[id]?.price || 0) * qty, 0),
    [cart, productById]
  );
  const discount = couponApplied ? Math.round(total * 0.1) : 0;
  const payableTotal = Math.max(total - discount, 0);
  const quizRecommendation = useMemo(() => (
    products.find((product) => product.mood === quiz.style && (
      quiz.budget === 'Above Rs. 2,000' ? product.price > 2000 :
      quiz.budget === 'Under Rs. 1,000' ? product.price < 1000 :
      product.price >= 1000 && product.price <= 2000
    )) || products[0]
  ), [products, quiz]);
  const roomProduct = useMemo(() => (
    products.find((product) => product.name === roomGuides[selectedRoom].product) || products[0]
  ), [products, selectedRoom]);
  const certificateProduct = useMemo(() => (
    productById[Object.keys(cart)[0]] || products[0]
  ), [cart, productById, products]);
  const festivalProduct = useMemo(() => (
    products.find((product) => product.name === festivalCollections[selectedFestival].product) || products[0]
  ), [products, selectedFestival]);
  const colorProduct = useMemo(() => (
    products.find((product) => product.mood === colorStories[selectedColor].mood) || products[0]
  ), [products, selectedColor]);
  const makerProduct = useMemo(() => {
    const spot = makerSpots.find(([name]) => name === selectedMaker) || makerSpots[0];
    return products.find((product) => product.name === spot[2]) || products[0];
  }, [products, selectedMaker]);
  const budgetPicks = useMemo(() => (
    products.filter((product) => product.price <= budgetLimit).slice(0, 3)
  ), [products, budgetLimit]);
  const comparedProducts = useMemo(() => (
    compareIds.map((id) => productById[id]).filter(Boolean)
  ), [compareIds, productById]);
  const styleBoardProducts = useMemo(() => (
    styleBoard.map((id) => productById[id]).filter(Boolean)
  ), [styleBoard, productById]);

  useEffect(() => {
    localStorage.setItem('saini-products', JSON.stringify(customProducts));
  }, [customProducts]);

  useEffect(() => {
    if (account) {
      localStorage.setItem('saini-account', JSON.stringify(account));
    }
  }, [account]);

  useEffect(() => {
    localStorage.setItem('saini-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const updateCart = (id, delta) => {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) + delta;
      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }
      return next;
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProductForm((current) => ({ ...current, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const addProduct = (event) => {
    event.preventDefault();
    if (!isAdmin) return;
    if (!productForm.name.trim()) return;

    const product = {
      ...productForm,
      id: editingProductId || `${productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
      maker: 'Saini Handicrafts',
      price: Number(productForm.price) || 0,
      tone: ['clay', 'indigo', 'wood', 'paper'][customProducts.length % 4]
    };

    setCustomProducts((current) => editingProductId
      ? current.map((item) => item.id === editingProductId ? product : item)
      : [product, ...current]
    );
    setProductForm(blankProduct);
    setEditingProductId('');
  };

  const saveAccount = (event) => {
    event.preventDefault();
    if (!accountForm.name.trim() || !accountForm.email.trim()) return;
    setAccount(accountForm);
  };

  const loginAdmin = (event) => {
    event.preventDefault();
    if (adminForm.email.trim().toLowerCase() === ADMIN_EMAIL && adminForm.code.trim() === ADMIN_CODE) {
      setIsAdmin(true);
      setAdminError('');
      localStorage.setItem('saini-admin', 'true');
      return;
    }
    setAdminError('Incorrect owner ID or password. Use the demo credentials shown below.');
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('saini-admin');
    setProductForm(blankProduct);
  };

  const submitCheckout = (event) => {
    event.preventDefault();
    setCheckoutDone(true);
  };

  const applyCoupon = () => {
    setCouponApplied(coupon.trim().toUpperCase() === 'SAINI10');
  };

  const sendCustomRequest = (event) => {
    event.preventDefault();
    setRequestSent(true);
  };

  const saveWishlist = (product) => {
    setWishlist((current) => {
      const collection = product.mood === 'Festive Table' ? 'Festival Picks' : product.mood === 'Thoughtful Gift' ? 'Wedding Gifts' : 'Home Decor';
      return {
        ...current,
        [collection]: [...new Set([...(current[collection] || []), product.id])]
      };
    });
    setWishlistNote(`${product.name} saved to your craft wishlist`);
    setTimeout(() => setWishlistNote(''), 2200);
  };

  const handleReferenceUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCustomReference(reader.result);
    reader.readAsDataURL(file);
  };

  const editProduct = (product) => {
    setEditingProductId(product.id);
    setProductForm({ ...blankProduct, ...product });
    document.getElementById('admin')?.scrollIntoView({ behavior: 'smooth' });
  };

  const deleteProduct = (id) => {
    setCustomProducts((current) => current.filter((product) => product.id !== id));
  };

  const addToGiftBox = (product) => {
    setGiftBox((current) => current.includes(product.id) ? current : [...current, product.id]);
  };

  const toggleStyleBoard = (product) => {
    setStyleBoard((current) => current.includes(product.id)
      ? current.filter((id) => id !== product.id)
      : [...current, product.id].slice(-4)
    );
  };

  const toggleCompare = (product) => {
    setCompareIds((current) => current.includes(product.id)
      ? current.filter((id) => id !== product.id)
      : [...current, product.id].slice(-3)
    );
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setActiveGalleryImage(product.image);
  };

  const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(`Hello Saini Handicrafts, I want to order: ${Object.entries(cart).map(([id, qty]) => `${productById[id]?.name} x ${qty}`).join(', ')}. Total: Rs. ${payableTotal.toLocaleString('en-IN')}`)}`;

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top" aria-label="Saini Handicrafts home">
          <span className="brand-mark">SH</span>
          <span>Saini Handicrafts</span>
        </a>
        <nav className={navOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#rooms">Rooms</a>
          <a href="#colors">Colors</a>
          <a href="#quiz">Guide</a>
          <a href="#lab">Lab</a>
          <a href="#giftbox">Gifts</a>
          <a href="#custom">Custom</a>
          <a href="#admin">Owner</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-button" aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}>
            <Search size={19} />
          </button>
          <button className="cart-button" aria-label={`${cartCount} items in cart`} onClick={() => setCartOpen(true)}>
            <ShoppingBag size={19} />
            <span>{cartCount}</span>
          </button>
          <a className="icon-button account-link" href="#account" aria-label="Customer account">
            <User size={19} />
          </a>
          <button className="icon-button mobile-toggle" aria-label="Toggle menu" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {searchOpen ? (
        <section className="search-panel" aria-label="Product search">
          <Search size={20} />
          <input
            autoFocus
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search ceramics, textiles, woodcraft..."
          />
          <button className="icon-button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
            <X size={18} />
          </button>
        </section>
      ) : null}

      <section className="hero" id="top">
        <img src="/assets/artisan-hero.png" alt="Curated handmade ceramics, textiles, woodcraft, and paper goods" />
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={16} /> Saini Handicrafts
          </span>
          <h1>Handmade pieces with a personal story.</h1>
          <p>
            Sell ceramics, textiles, woodwork, decor, gifts, and custom creative work through a warm modern storefront.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#shop">
              Shop collection <ArrowRight size={18} />
            </a>
            <a className="ghost-button" href="#custom">Request custom work</a>
          </div>
        </div>
        <div className="floating-ticket" aria-hidden="true">
          <span>New drop</span>
          <strong>34 handmade pieces</strong>
          <small>crafted in small batches</small>
        </div>
      </section>

      <section className="trust-strip" aria-label="Store promises">
        <div>
          <PackageCheck size={21} />
          <span>Customer-friendly shopping</span>
        </div>
        <div>
          <Truck size={21} />
          <span>Owner-only product control</span>
        </div>
        <div>
          <BadgeCheck size={21} />
          <span>Customer account demo</span>
        </div>
      </section>

      <section className="section" id="shop">
        <div className="section-heading">
          <span className="eyebrow">shop collection</span>
          <h2>Fresh from Saini Handicrafts</h2>
          <p>Each product card shows the material, mood, availability, and a quick quantity control for a smooth buyer experience.</p>
        </div>
        <div className="mood-rail" aria-label="Shop by mood">
          {moodFilters.map((mood) => (
            <button
              className={moodFilter === mood ? 'active' : ''}
              key={mood}
              onClick={() => setMoodFilter(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
        <div className="advanced-filters" aria-label="Advanced product filters">
          <span><SlidersHorizontal size={17} /> Fine tune</span>
          <select value={materialFilter} onChange={(event) => setMaterialFilter(event.target.value)}>
            {materialFilters.map((filter) => <option key={filter}>{filter}</option>)}
          </select>
          <select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}>
            {priceFilters.map((filter) => <option key={filter}>{filter}</option>)}
          </select>
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <button className="heart-button" aria-label={`Save ${product.name}`} onClick={() => saveWishlist(product)}>
                <Heart size={18} />
              </button>
              <div className={`product-art ${product.tone}`}>
                {product.image ? <img src={product.image} alt={product.name} /> : null}
                <span>{product.category}</span>
              </div>
              <div className="product-body">
                <div className="product-meta">
                  <span>{product.badge}</span>
                  <span>{product.stock}</span>
                </div>
                <h3>{product.name}</h3>
                <div className="craft-tags">
                <span>{product.mood || 'Handmade'}</span>
                <span>{product.material || 'Craft material'}</span>
                </div>
                <p>{product.description}</p>
                <div className="buy-row">
                  <strong>Rs. {product.price.toLocaleString('en-IN')}</strong>
                  <div className="stepper" aria-label={`Quantity for ${product.name}`}>
                    <button onClick={() => updateCart(product.id, -1)} aria-label={`Remove ${product.name}`}>
                      <Minus size={15} />
                    </button>
                    <span>{cart[product.id] || 0}</span>
                    <button onClick={() => updateCart(product.id, 1)} aria-label={`Add ${product.name}`}>
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
                <button className="story-button" onClick={() => openProduct(product)}>
                  View craft story <ArrowRight size={16} />
                </button>
                <button className="story-button secondary-story" onClick={() => addToGiftBox(product)}>
                  Add to gift box <Gift size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
        {visibleProducts.length === 0 ? (
          <p className="empty-state">No products matched your search. Try decor, ceramic, textile, or gift.</p>
        ) : null}
      </section>

      <section className="craft-process">
        <div className="section-heading compact">
          <span className="eyebrow">how it feels</span>
          <h2>A shop experience built around making, not just selling</h2>
        </div>
        <div className="process-grid">
          {processSteps.map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="room-styler" id="rooms">
        <div>
          <span className="eyebrow">craft your room</span>
          <h2>Choose a space and get a clear product suggestion</h2>
          <p>Pick where the item will be used. The site recommends one handmade piece, shows why it fits, and opens the product story.</p>
          <div className="room-tabs">
            {Object.keys(roomGuides).map((room) => (
              <button className={selectedRoom === room ? 'active' : ''} key={room} onClick={() => setSelectedRoom(room)}>
                {room}
              </button>
            ))}
          </div>
        </div>
        <div className="room-preview">
          <img className="room-product-image" src={roomProduct?.image} alt={roomProduct?.name} />
          <div className="room-recommendation">
            <span>Best for {selectedRoom}</span>
            <strong>{roomProduct?.name}</strong>
            <p>{roomGuides[selectedRoom].tip}</p>
            <button className="primary-button" onClick={() => roomProduct && openProduct(roomProduct)}>
              View in detail <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="color-shopper" id="colors">
        <div>
          <span className="eyebrow">color mood shopping</span>
          <h2>Let users shop by the feeling of a color</h2>
          <p>Colors are easier to choose than product categories. This creates a more visual route into the collection.</p>
          <div className="swatch-row">
            {Object.entries(colorStories).map(([name, story]) => (
              <button
                className={selectedColor === name ? 'active' : ''}
                key={name}
                onClick={() => setSelectedColor(name)}
                style={{ '--swatch': story.color }}
              >
                <span />
                {name}
              </button>
            ))}
          </div>
        </div>
        <div className="color-result">
          <div className="color-poster" style={{ '--poster': colorStories[selectedColor].color }}>
            <span>{selectedColor}</span>
          </div>
          <div>
            <strong>{colorProduct?.name}</strong>
            <p>{colorStories[selectedColor].copy}</p>
            <button className="primary-button" onClick={() => colorProduct && openProduct(colorProduct)}>
              Explore this color <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="festival-mode">
        <div className="section-heading compact">
          <span className="eyebrow">festival mode</span>
          <h2>Collections shaped around Indian gifting moments</h2>
        </div>
        <div className="festival-grid">
          {Object.entries(festivalCollections).map(([festival, collection]) => (
            <button
              className={selectedFestival === festival ? 'active' : ''}
              key={festival}
              onClick={() => setSelectedFestival(festival)}
            >
              <span>{festival}</span>
              <small>{collection.copy}</small>
            </button>
          ))}
        </div>
        <div className="festival-feature">
          <img src={festivalProduct?.image} alt="" />
          <div>
            <span className="eyebrow">{selectedFestival} pick</span>
            <h3>{festivalProduct?.name}</h3>
            <p>{festivalCollections[selectedFestival].copy}</p>
            <button className="primary-button" onClick={() => festivalProduct && openProduct(festivalProduct)}>
              View collection piece <Sparkles size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="before-after">
        <div>
          <span className="eyebrow">styling preview</span>
          <h2>Show a simple styling transformation</h2>
          <p>This preview makes the value clear: a plain corner becomes warmer when handmade texture is added.</p>
          <button className="primary-button" onClick={() => setStylingAfter(!stylingAfter)}>
            {stylingAfter ? 'Show before' : 'Show after'} <ArrowRight size={18} />
          </button>
        </div>
        <div className="style-comparison">
          <article>
            <span>Before</span>
            <div className="plain-corner">
              <div />
            </div>
            <p>Plain shelf with no material story.</p>
          </article>
          <article className={stylingAfter ? 'active' : ''}>
            <span>After</span>
            <div className="styled-corner">
              <img src="/assets/product-ceramic.png" alt="" />
              <img src="/assets/product-textile.png" alt="" />
              <img src="/assets/product-wood.png" alt="" />
            </div>
            <p>Layered with clay, textile, and wood pieces from Saini Handicrafts.</p>
          </article>
        </div>
      </section>

      <section className="maker-map">
        <div>
          <span className="eyebrow">workshop map</span>
          <h2>Make the maker process visible</h2>
          <p>Users can tap each workshop zone to understand where a material story begins.</p>
        </div>
        <div className="map-board">
          {makerSpots.map(([name, copy]) => (
            <button className={selectedMaker === name ? 'active' : ''} key={name} onClick={() => setSelectedMaker(name)}>
              <span>{name}</span>
              <small>{copy}</small>
            </button>
          ))}
        </div>
        <div className="maker-feature">
          <img src={makerProduct?.image} alt="" />
          <div>
            <strong>{makerProduct?.name}</strong>
            <p>{makerProduct?.story}</p>
            <button className="ghost-button" onClick={() => makerProduct && openProduct(makerProduct)}>
              Open maker story
            </button>
          </div>
        </div>
      </section>

      <section className="quiz-panel" id="quiz">
        <div>
          <span className="eyebrow">personalized discovery</span>
          <h2>Help shoppers find the right handmade piece faster</h2>
          <p>A short guided quiz turns open-ended browsing into a friendly recommendation experience.</p>
        </div>
        <form className="quiz-card">
          <label>
            Who is it for?
            <select value={quiz.person} onChange={(event) => setQuiz({ ...quiz, person: event.target.value })}>
              <option>Family</option>
              <option>Friend</option>
              <option>Client</option>
              <option>Self</option>
            </select>
          </label>
          <label>
            Budget
            <select value={quiz.budget} onChange={(event) => setQuiz({ ...quiz, budget: event.target.value })}>
              <option>Under Rs. 1,000</option>
              <option>Rs. 1,000 - Rs. 2,000</option>
              <option>Above Rs. 2,000</option>
            </select>
          </label>
          <label>
            Preferred mood
            <select value={quiz.style} onChange={(event) => setQuiz({ ...quiz, style: event.target.value })}>
              {moodFilters.filter((mood) => mood !== 'All').map((mood) => <option key={mood}>{mood}</option>)}
            </select>
          </label>
          <div className="quiz-result">
            <span>Best match for {quiz.person}</span>
            <strong>{quizRecommendation.name}</strong>
            <p>{quizRecommendation.description}</p>
            <button className="primary-button" type="button" onClick={() => openProduct(quizRecommendation)}>
              Open recommendation <Sparkles size={18} />
            </button>
          </div>
        </form>
      </section>

      <section className="gift-finder">
        <div>
          <span className="eyebrow">gift finder</span>
          <h2>Let the shopper choose a feeling first</h2>
          <p>
            Instead of asking users to know the product category, this helps them start with the occasion and discover a
            matching handmade piece.
          </p>
        </div>
        <div className="finder-card">
          <div className="finder-preview" aria-hidden="true">
            <span className="preview-label">Gift journey</span>
            <div>
              <strong>Occasion</strong>
              <ArrowRight size={17} />
              <strong>Suggested craft</strong>
            </div>
          </div>
          <label>
            What is the gift for?
            <select value={giftMood} onChange={(event) => setGiftMood(event.target.value)}>
              {Object.keys(giftPrompts).map((prompt) => (
                <option key={prompt}>{prompt}</option>
              ))}
            </select>
          </label>
          <div className="finder-result">
            <span>Recommended piece</span>
            <strong>{giftPrompts[giftMood].product}</strong>
            <p>{giftPrompts[giftMood].reason}</p>
            <button className="primary-button" onClick={() => {
              const match = products.find((product) => product.name === giftPrompts[giftMood].product);
              if (match) openProduct(match);
            }}>
              See why it fits <Sparkles size={18} />
            </button>
            <button className="ghost-button" onClick={() => {
              const pick = products[Math.floor(Math.random() * products.length)];
              if (pick) openProduct(pick);
            }}>
              Surprise me
            </button>
          </div>
        </div>
      </section>

      <section className="creative-lab" id="lab">
        <div className="section-heading compact">
          <span className="eyebrow">creative shopping lab</span>
          <h2>More playful ways to choose handmade products</h2>
        </div>

        <div className="lab-grid">
          <article className="style-board">
            <span className="eyebrow">style board</span>
            <h3>Build a mini moodboard</h3>
            <div className="board-canvas">
              {styleBoardProducts.map((product) => (
                <button key={product.id} onClick={() => openProduct(product)}>
                  <img src={product.image} alt="" />
                  <span>{product.name}</span>
                </button>
              ))}
            </div>
            <div className="mini-product-row">
              {products.map((product) => (
                <button key={product.id} onClick={() => toggleStyleBoard(product)}>
                  {styleBoard.includes(product.id) ? 'Remove' : 'Pin'} {product.name}
                </button>
              ))}
            </div>
          </article>

          <article className="drop-card">
            <span className="eyebrow">craft drop</span>
            <h3>Next small-batch release</h3>
            <div className="countdown-row">
              <strong>02</strong><span>days</span>
              <strong>14</strong><span>hours</span>
              <strong>35</strong><span>mins</span>
            </div>
            <p>Preview: festive clay decor, indigo table layers, and limited gift boxes.</p>
            <button className="primary-button" onClick={() => setDropReminder(true)}>
              Remind me <Sparkles size={18} />
            </button>
            {dropReminder ? <p className="success-note"><CheckCircle size={18} /> Drop reminder saved for demo.</p> : null}
          </article>

          <article className="budget-curator">
            <span className="eyebrow">budget curator</span>
            <h3>Find pieces under Rs. {budgetLimit.toLocaleString('en-IN')}</h3>
            <input
              type="range"
              min="800"
              max="3000"
              step="100"
              value={budgetLimit}
              onChange={(event) => setBudgetLimit(Number(event.target.value))}
            />
            <div className="budget-picks">
              {budgetPicks.map((product) => (
                <button key={product.id} onClick={() => openProduct(product)}>
                  <img src={product.image} alt="" />
                  <span>{product.name}</span>
                  <strong>Rs. {product.price.toLocaleString('en-IN')}</strong>
                </button>
              ))}
            </div>
          </article>

          <article className="note-preview">
            <span className="eyebrow">gift note preview</span>
            <h3>Make gifting feel personal</h3>
            <textarea value={giftNote} onChange={(event) => setGiftNote(event.target.value)} />
            <div className="handwritten-card">
              <span>Saini Handicrafts</span>
              <p>{giftNote}</p>
            </div>
          </article>

          <article className="compare-card">
            <span className="eyebrow">compare pieces</span>
            <h3>Choose with confidence</h3>
            <div className="mini-product-row">
              {products.map((product) => (
                <button key={product.id} onClick={() => toggleCompare(product)}>
                  {compareIds.includes(product.id) ? 'Selected' : 'Compare'} {product.name}
                </button>
              ))}
            </div>
            <div className="compare-table">
              {comparedProducts.map((product) => (
                <div key={product.id}>
                  <img src={product.image} alt="" />
                  <strong>{product.name}</strong>
                  <span>{product.material}</span>
                  <span>{product.stock}</span>
                  <span>Rs. {product.price.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="gift-box-builder" id="giftbox">
        <div>
          <span className="eyebrow">gift box builder</span>
          <h2>Create a curated handmade box</h2>
          <p>Customers can combine products, choose packaging, and prepare a personalized gifting request.</p>
        </div>
        <div className="gift-box-grid">
          <div className="gift-products">
            {products.map((product) => (
              <button key={product.id} onClick={() => addToGiftBox(product)} className={giftBox.includes(product.id) ? 'selected' : ''}>
                <img src={product.image} alt="" />
                <span>{product.name}</span>
              </button>
            ))}
          </div>
          <form className="gift-summary">
            <label>
              Packaging style
              <select value={packagingStyle} onChange={(event) => setPackagingStyle(event.target.value)}>
                {Object.keys(packagingStyles).map((style) => <option key={style}>{style}</option>)}
              </select>
            </label>
            <div className="packaging-preview" style={{ '--pack-color': packagingStyles[packagingStyle].color }}>
              <div className="package-box">
                <span>Saini</span>
              </div>
              <div>
                <strong>{packagingStyle}</strong>
                <p>{packagingStyles[packagingStyle].detail}</p>
              </div>
            </div>
            <label>
              Greeting card text
              <textarea placeholder="Write a short message for the receiver." />
            </label>
            <div className="gift-list">
              <span>{giftBox.length} selected items</span>
              {giftBox.map((id) => productById[id] ? <strong key={id}>{productById[id].name}</strong> : null)}
            </div>
            <button className="primary-button" type="button" onClick={() => setCart((current) => {
              const next = { ...current };
              giftBox.forEach((id) => { next[id] = (next[id] || 0) + 1; });
              setCartOpen(true);
              return next;
            })}>
              Add box to cart <ShoppingBag size={18} />
            </button>
          </form>
        </div>
      </section>

      <section className="studio-panel" id="admin">
        <div className="studio-copy">
          <span className="eyebrow">owner dashboard</span>
          <h2>{isAdmin ? 'Manage products privately' : 'Admin access required'}</h2>
          <p>
            Customers cannot add product details, prices, categories, stock status, or descriptions. Only the owner can
            unlock this dashboard and manage the catalog.
          </p>
          <div className="mini-steps">
            <span>Private product upload</span>
            <span>Price and stock control</span>
            <span>Catalog saved locally</span>
          </div>
        </div>

        {!isAdmin ? (
          <form className="studio-form admin-login" onSubmit={loginAdmin}>
            <div className="admin-lock">
              <LogIn size={28} />
              <span>Owner login</span>
            </div>
            <label>
              Owner email
              <input
                type="email"
                value={adminForm.email}
                onChange={(event) => setAdminForm({ ...adminForm, email: event.target.value })}
                placeholder="owner@sainihandicrafts.com"
              />
            </label>
            <label>
              Owner passcode
              <input
                type="password"
                value={adminForm.code}
                onChange={(event) => setAdminForm({ ...adminForm, code: event.target.value })}
                placeholder="Enter owner passcode"
              />
            </label>
            <p className="helper-text">Demo owner ID: {ADMIN_EMAIL}<br />Demo password: {ADMIN_CODE}</p>
            {adminError ? <p className="form-error">{adminError}</p> : null}
            <button className="primary-button" type="submit">
              <LogIn size={18} /> Unlock dashboard
            </button>
          </form>
        ) : (
          <form className="studio-form" onSubmit={addProduct}>
            <div className="dashboard-topline">
              <span>Owner mode is active</span>
              <button className="ghost-pill" type="button" onClick={logoutAdmin}>
                <LogOut size={16} /> Logout
              </button>
            </div>
            <label className="upload-box">
              <ImagePlus size={26} />
              <span>{productForm.image ? 'Image selected' : 'Upload product image'}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </label>
            {productForm.image ? <img className="image-preview" src={productForm.image} alt="Product preview" /> : null}
            <div className="form-grid">
              <label>
                Product name
                <input
                  value={productForm.name}
                  onChange={(event) => setProductForm({ ...productForm, name: event.target.value })}
                  placeholder="Blue pottery diya set"
                />
              </label>
              <label>
                Price
                <input
                  min="0"
                  type="number"
                  value={productForm.price}
                  onChange={(event) => setProductForm({ ...productForm, price: event.target.value })}
                />
              </label>
            </div>
            <div className="form-grid">
              <label>
                Category
                <select
                  value={productForm.category}
                  onChange={(event) => setProductForm({ ...productForm, category: event.target.value })}
                >
                  <option>Ceramic Decor</option>
                  <option>Textile Art</option>
                  <option>Woodcraft</option>
                  <option>Paper Craft</option>
                  <option>Gift Hamper</option>
                  <option>Wall Art</option>
                </select>
              </label>
              <label>
                Stock status
                <select
                  value={productForm.stock}
                  onChange={(event) => setProductForm({ ...productForm, stock: event.target.value })}
                >
                  <option>Ready to ship</option>
                  <option>Made to order</option>
                  <option>Limited stock</option>
                  <option>Sold out</option>
                </select>
              </label>
            </div>
            <div className="form-grid">
              <label>
                Customer mood
                <select
                  value={productForm.mood}
                  onChange={(event) => setProductForm({ ...productForm, mood: event.target.value })}
                >
                  {moodFilters.filter((mood) => mood !== 'All').map((mood) => <option key={mood}>{mood}</option>)}
                </select>
              </label>
              <label>
                Material
                <input
                  value={productForm.material}
                  onChange={(event) => setProductForm({ ...productForm, material: event.target.value })}
                  placeholder="Terracotta clay"
                />
              </label>
            </div>
            <label>
              Short description
              <textarea
                value={productForm.description}
                onChange={(event) => setProductForm({ ...productForm, description: event.target.value })}
                placeholder="Explain material, size, color, and what makes it special."
              />
            </label>
            <label>
              Craft story
              <textarea
                value={productForm.story}
                onChange={(event) => setProductForm({ ...productForm, story: event.target.value })}
                placeholder="Tell the user how this piece is made and why it is special."
              />
            </label>
            <label>
              Care instructions
              <input
                value={productForm.care}
                onChange={(event) => setProductForm({ ...productForm, care: event.target.value })}
                placeholder="Keep dry, wipe gently, avoid direct sunlight."
              />
            </label>
            <button className="primary-button" type="submit">
              <Save size={18} /> {editingProductId ? 'Update product' : 'Save product'}
            </button>
            <div className="admin-products">
              <span>Added products</span>
              {customProducts.length === 0 ? <p>No owner-added products yet.</p> : null}
              {customProducts.map((product) => (
                <div className="admin-product-line" key={product.id}>
                  <span>{product.name}</span>
                  <div>
                    <button type="button" onClick={() => editProduct(product)} aria-label={`Edit ${product.name}`}>
                      <Edit3 size={15} />
                    </button>
                    <button type="button" onClick={() => deleteProduct(product.id)} aria-label={`Delete ${product.name}`}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </form>
        )}
      </section>

      <section className="account-panel" id="account">
        <div>
          <span className="eyebrow">user account</span>
          <h2>{account ? `Welcome, ${account.name}` : 'Create a simple account'}</h2>
          <p>
            Customers can save their details, view basket items, and later this can become login, wishlist, order
            history, address management, and delivery updates.
          </p>
        </div>
        <form className="account-form" onSubmit={saveAccount}>
          <div className="account-avatar">
            <User size={36} />
          </div>
          <label>
            Full name
            <input
              value={accountForm.name}
              onChange={(event) => setAccountForm({ ...accountForm, name: event.target.value })}
              placeholder="Customer name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={accountForm.email}
              onChange={(event) => setAccountForm({ ...accountForm, email: event.target.value })}
              placeholder="name@example.com"
            />
          </label>
          <label>
            Phone
            <input
              value={accountForm.phone}
              onChange={(event) => setAccountForm({ ...accountForm, phone: event.target.value })}
              placeholder="+91 98765 43210"
            />
          </label>
          <button className="primary-button" type="submit">
            <LogIn size={18} /> Save account
          </button>
          <div className="wishlist-panel">
            <span>Saved collections</span>
            {wishlistCollections.map((collection) => (
              <div key={collection}>
                <strong>{collection}</strong>
                <small>{(wishlist[collection] || []).length} saved</small>
              </div>
            ))}
          </div>
        </form>
      </section>

      <section className="custom-order" id="custom">
        <div>
          <span className="eyebrow">custom orders</span>
          <h2>Build a gift box, decor set, or branded artisan hamper.</h2>
        </div>
        <form onSubmit={sendCustomRequest}>
          <label>
            Project type
            <select>
              <option>Home decor bundle</option>
              <option>Wedding gifting</option>
              <option>Corporate hamper</option>
              <option>One-of-a-kind commission</option>
            </select>
          </label>
          <label>
            Budget range
            <input type="text" placeholder="Rs. 5,000 - Rs. 25,000" />
          </label>
          <div className="form-grid">
            <label>
              Material preference
              <select>
                <option>Open to suggestions</option>
                <option>Clay / ceramic</option>
                <option>Textile</option>
                <option>Wood</option>
                <option>Paper craft</option>
              </select>
            </label>
            <label>
              Size
              <select>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                <option>Mixed hamper</option>
              </select>
            </label>
          </div>
          <label className="upload-box">
            <ImagePlus size={22} />
            <span>{customReference ? 'Reference image selected' : 'Upload reference image'}</span>
            <input type="file" accept="image/*" onChange={handleReferenceUpload} />
          </label>
          {customReference ? <img className="image-preview" src={customReference} alt="Custom order reference" /> : null}
          <label>
            Your idea
            <textarea placeholder="Tell us the mood, quantity, timeline, and materials you love." />
          </label>
          {requestSent ? (
            <p className="success-note"><CheckCircle size={18} /> Request saved. We will contact the customer soon.</p>
          ) : null}
          <button className="primary-button" type="submit">
            Send request <ArrowRight size={18} />
          </button>
        </form>
      </section>

      {cartOpen ? (
        <div className="drawer-backdrop" role="dialog" aria-modal="true" aria-label="Shopping cart">
          <aside className="cart-drawer">
            <div className="modal-heading">
              <div>
                <span className="eyebrow">cart drawer</span>
                <h2>Your basket</h2>
              </div>
              <button className="icon-button" aria-label="Close cart" onClick={() => setCartOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="drawer-items">
              {Object.entries(cart).map(([id, qty]) => (
                productById[id] ? (
                  <div className="drawer-item" key={id}>
                    <img src={productById[id].image} alt="" />
                    <div>
                      <strong>{productById[id].name}</strong>
                      <span>Rs. {productById[id].price.toLocaleString('en-IN')}</span>
                      <div className="stepper">
                        <button onClick={() => updateCart(id, -1)}><Minus size={15} /></button>
                        <span>{qty}</span>
                        <button onClick={() => updateCart(id, 1)}><Plus size={15} /></button>
                      </div>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
            <div className="coupon-row">
              <input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Coupon code SAINI10" />
              <button className="ghost-pill" onClick={applyCoupon}>Apply</button>
            </div>
            {couponApplied ? <p className="success-note"><CheckCircle size={18} /> 10% coupon applied</p> : null}
            <div className="cart-total">
              <span>Total</span>
              <strong>Rs. {payableTotal.toLocaleString('en-IN')}</strong>
            </div>
            <a className="ghost-button whatsapp-button" href={whatsAppUrl} target="_blank" rel="noreferrer">
              WhatsApp order
            </a>
            <button className="primary-button" onClick={() => {
              setCartOpen(false);
              setCheckoutOpen(true);
            }}>
              Checkout <ArrowRight size={18} />
            </button>
          </aside>
        </div>
      ) : null}

      {checkoutOpen ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Checkout">
          <section className="checkout-modal">
            <div className="modal-heading">
              <div>
                <span className="eyebrow">checkout</span>
                <h2>{checkoutDone ? 'Order request received' : 'Complete your order'}</h2>
              </div>
              <button className="icon-button" aria-label="Close checkout" onClick={() => setCheckoutOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {checkoutDone ? (
              <div className="checkout-success">
                <CheckCircle size={46} />
                <p>
                  This demo has saved the checkout request. Your order ID is SH-2026-1042 and tracking is now visible.
                </p>
                <div className="tracking-strip">
                  <span className="done">Placed</span>
                  <span>Craft check</span>
                  <span>Packed</span>
                  <span>Shipped</span>
                </div>
                <div className="order-journey">
                  <div className="journey-step active">
                    <strong>Order placed</strong>
                    <span>Request received with customer details.</span>
                  </div>
                  <div className="journey-step">
                    <strong>Maker check</strong>
                    <span>Owner confirms stock, finish, and packaging.</span>
                  </div>
                  <div className="journey-step">
                    <strong>Careful packing</strong>
                    <span>Gift wrap, care card, and invoice are prepared.</span>
                  </div>
                  <div className="journey-step">
                    <strong>Delivery</strong>
                    <span>Tracking link and WhatsApp update are sent.</span>
                  </div>
                </div>
                <div className="certificate-card">
                  <span>Authenticity certificate</span>
                  <h3>{certificateProduct?.name}</h3>
                  <p>Material: {certificateProduct?.material || 'Handmade craft'}</p>
                  <p>Maker note: Made or curated by Saini Handicrafts in a small-batch craft process.</p>
                  <small>Certificate ID: SH-CERT-1042</small>
                </div>
                <button className="ghost-button" onClick={() => window.print()}>
                  <FileText size={18} /> Print invoice
                </button>
                <button className="primary-button" onClick={() => setCheckoutOpen(false)}>
                  Continue shopping
                </button>
              </div>
            ) : (
              <form onSubmit={submitCheckout}>
                <div className="cart-list">
                  {Object.entries(cart).map(([id, qty]) => (
                    productById[id] ? (
                      <div className="cart-line" key={id}>
                        <span>{productById[id].name}</span>
                        <strong>{qty} x Rs. {productById[id].price.toLocaleString('en-IN')}</strong>
                      </div>
                    ) : null
                  ))}
                </div>
                <div className="cart-total">
                  <span>Total</span>
                  <strong>Rs. {payableTotal.toLocaleString('en-IN')}</strong>
                </div>
                <label>
                  Delivery address
                  <textarea placeholder="House number, street, city, pincode" />
                </label>
                <label>
                  Payment method
                  <select>
                    <option>Cash on delivery</option>
                    <option>UPI payment request</option>
                    <option>Card payment later</option>
                  </select>
                </label>
                <button className="primary-button" type="submit">
                  <CreditCard size={18} /> Place demo order
                </button>
              </form>
            )}
          </section>
        </div>
      ) : null}

      {selectedProduct ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${selectedProduct.name} story`}>
          <section className="story-drawer">
            <button className="icon-button drawer-close" aria-label="Close product story" onClick={() => setSelectedProduct(null)}>
              <X size={18} />
            </button>
            <div className="story-gallery">
              <img src={activeGalleryImage || selectedProduct.image} alt={selectedProduct.name} />
              <div>
                {[selectedProduct.image, '/assets/artisan-hero.png'].map((image) => (
                  <button key={image} onClick={() => setActiveGalleryImage(image)}>
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="eyebrow">{selectedProduct.mood || 'handmade piece'}</span>
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.story}</p>
              <div className="story-facts">
                <span>Material: {selectedProduct.material || 'Handmade craft'}</span>
                <span>Status: {selectedProduct.stock}</span>
                <span>Price: Rs. {selectedProduct.price.toLocaleString('en-IN')}</span>
                <span>Care: {selectedProduct.care || 'Handle gently and keep dry.'}</span>
                <span>Rating: 4.8/5 from handmade buyers</span>
              </div>
              <button className="primary-button" onClick={() => updateCart(selectedProduct.id, 1)}>
                Add one to basket <Plus size={18} />
              </button>
              <button className="ghost-button" onClick={() => saveWishlist(selectedProduct)}>
                Save to wishlist <Heart size={18} />
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {wishlistNote ? <div className="toast">{wishlistNote}</div> : null}

      <footer>
        <button className="icon-button" aria-label="Previous collection">
          <ChevronLeft size={19} />
        </button>
        <p>Saini Handicrafts - Handmade marketplace concept</p>
        <button className="icon-button" aria-label="Next collection">
          <ChevronRight size={19} />
        </button>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
