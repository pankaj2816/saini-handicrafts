import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building,
  Calculator,
  CheckCircle,
  Clock,
  Compass,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Gift,
  Globe,
  Heart,
  HelpCircle,
  Home,
  Image as ImageIcon,
  Layers,
  MapPin,
  Maximize2,
  Menu,
  MessageCircle,
  Minus,
  Move,
  Package,
  Phone,
  Plus,
  Printer,
  QrCode,
  RotateCcw,
  Search,
  Send,
  Shield,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  Truck,
  Wrench,
  X,
  Zap,
  ZoomIn,
  ZoomOut
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
    batchEdition: 'Monsoon Batch • #03 of 08',
    provenance: 'Recycled brass alloy, hand-hammered in Rajasthan',
    maker: 'The Rajasthani Forge',
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
    batchEdition: 'Seasoned Batch • #02 of 05',
    provenance: '25+ year aged reclaimed hardwood slab',
    maker: 'The Rajasthani Forge',
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
    batchEdition: 'Limited Commission • #01 of 04',
    provenance: 'Multi-layer bas-relief brass & burnished metallic panel',
    maker: 'The Rajasthani Forge',
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
    batchEdition: 'Atelier Run • #04 of 10',
    provenance: 'Sculpted composite stone with hand-applied verdigris patina',
    maker: 'The Rajasthani Forge',
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
    batchEdition: 'Trio Set • #05 of 12',
    provenance: 'Embossed sheet metal & solid wood border',
    maker: 'The Rajasthani Forge',
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
    batchEdition: 'Folk Series • #02 of 06',
    provenance: 'Rajasthan riverbed terracotta & hardwood base',
    maker: 'The Rajasthani Forge',
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
    batchEdition: 'Carving Batch • #07 of 15',
    provenance: 'Single-block seasoned Sheesham hardwood',
    maker: 'The Rajasthani Forge',
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
    batchEdition: 'Joinery Series • #05 of 15',
    provenance: 'Hand-turned pine & reclaimed teak dowels',
    maker: 'The Rajasthani Forge',
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

// Currency Multipliers
const currencies = {
  INR: { code: 'INR', symbol: 'Rs. ', rate: 1, label: '₹ INR (India)' },
  USD: { code: 'USD', symbol: '$', rate: 0.012, label: '$ USD (United States)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.011, label: '€ EUR (Europe)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0095, label: '£ GBP (United Kingdom)' },
  AED: { code: 'AED', symbol: 'AED ', rate: 0.044, label: 'د.إ AED (UAE)' }
};

// Commission Calculator Presets
const commissionSizes = [
  { label: 'Medium (18" x 18")', base: 4500, multiplier: 1 },
  { label: 'Large (24" x 24")', base: 7200, multiplier: 1.6 },
  { label: 'Panoramic (36" x 18")', base: 10500, multiplier: 2.3 },
  { label: 'Grand Temple Panel (48" x 36")', base: 18500, multiplier: 4.1 }
];

const commissionMaterials = [
  { label: 'Embossed Antique Brass Relief', rate: 1.2 },
  { label: 'Live-Edge Seasoned Teak Wood', rate: 1.0 },
  { label: 'Sculpted Terracotta & Bronze', rate: 0.9 },
  { label: 'Weathered Patina Cast Stone', rate: 1.1 }
];

const commissionFraming = [
  { label: 'Frameless Organic Edge', add: 0 },
  { label: 'Hand-Carved Wooden Beaded Frame', add: 1400 },
  { label: 'Recessed Brass Border Inlay', add: 2200 }
];

// Patron Spaces Curated Gallery
const patronSpaces = [
  {
    id: 'space-1',
    title: 'Penthouse Living Wall, Mumbai',
    location: 'Worli Sea Face • Mumbai',
    productId: 'kalpavriksha-mural',
    image: assetPath('products/kalpavriksha-mural.jpg'),
    quote: '"The antique brass reflection brings an ethereal evening warmth to our limestone living wall."',
    tag: 'Kalpavriksha Brass Mural'
  },
  {
    id: 'space-2',
    title: 'Heritage Villa Foyer, Udaipur',
    location: 'Fateh Sagar • Udaipur',
    productId: 'live-edge-clock',
    image: assetPath('products/live-edge-clock.jpg'),
    quote: '"The organic live bark edge and natural wood grain knots are the first things guests compliment upon entering."',
    tag: 'Rustic Live-Edge Clock'
  },
  {
    id: 'space-3',
    title: 'Mindful Puja Sanctuary, Bengaluru',
    location: 'Indiranagar • Bengaluru',
    productId: 'buddha-bust-wall-art',
    image: assetPath('products/buddha-bust-wall-art.jpg'),
    quote: '"Paired with brass diyas and fresh marigolds, the stone Buddha creates a tranquil meditation aura."',
    tag: 'Serene Buddha Sculpture'
  },
  {
    id: 'space-4',
    title: 'Architectural Dining Gallery, New Delhi',
    location: 'Chanakyapuri • New Delhi',
    productId: 'triptych-tree-panels',
    image: assetPath('products/triptych-tree-panels.jpg'),
    quote: '"The 3-piece botanical panels added balanced vertical symmetry over our buffet sideboard."',
    tag: 'Botanical Triptych Panels'
  }
];

// Verified Certificate Database Sample Registry
const verifiedCertificates = {
  'TRF-RAJ-2026-8819': {
    serial: 'TRF-RAJ-2026-8819',
    pieceName: 'Kalpavriksha Tree of Life Brass Mural',
    masterCraftsman: 'Ramswaroop Saini (Master Artisan)',
    origin: 'The Rajasthani Forge Atelier, Rajasthan, India',
    materialProvenance: 'Hand-beaten brass relief sheet with antique bronze gold patina',
    chiselDate: 'July 2026',
    status: 'Verified Original Atelier Piece',
    inspectedBy: 'Quality Guild Rajasthan • Grade A+'
  },
  'TRF-RAJ-2026-4402': {
    serial: 'TRF-RAJ-2026-4402',
    pieceName: 'Rustic Live-Edge Teak Wall Clock',
    masterCraftsman: 'Mukesh Saini (Woodcraft Specialist)',
    origin: 'The Rajasthani Forge Atelier, Rajasthan, India',
    materialProvenance: '25+ Year Seasoned Organic Hardwood Slab with Raw Bark Perimeter',
    chiselDate: 'June 2026',
    status: 'Verified Original Atelier Piece',
    inspectedBy: 'Quality Guild Rajasthan • Grade A+'
  },
  'TRF-RAJ-2026-1193': {
    serial: 'TRF-RAJ-2026-1193',
    pieceName: 'Royal Shahi Sawari Heritage Relief Plaque',
    masterCraftsman: 'Ramswaroop Saini & Team',
    origin: 'The Rajasthani Forge Atelier, Rajasthan, India',
    materialProvenance: 'Handcrafted Bas-Relief Metallic Panel with Historic Procession Motifs',
    chiselDate: 'May 2026',
    status: 'Verified Original Atelier Piece',
    inspectedBy: 'Quality Guild Rajasthan • Grade A+'
  },
  'SH-RAJ-2026-8819': {
    serial: 'TRF-RAJ-2026-8819',
    pieceName: 'Kalpavriksha Tree of Life Brass Mural',
    masterCraftsman: 'Ramswaroop Saini (Master Artisan)',
    origin: 'The Rajasthani Forge Atelier, Rajasthan, India',
    materialProvenance: 'Hand-beaten brass relief sheet with antique bronze gold patina',
    chiselDate: 'July 2026',
    status: 'Verified Original Atelier Piece',
    inspectedBy: 'Quality Guild Rajasthan • Grade A+'
  }
};

// Artisan Care Guide Protocols
const careProtocols = {
  brass: {
    title: 'Embossed Antique Brass Care',
    material: 'Antique Brass & Bronze Murals',
    cleaning: 'Use dry microfiber cloth or soft camel hair brush to dust recesses. Never use acidic brass polishes (like Brasso) as they strip the protective antique patina.',
    humidity: 'Display indoors away from direct shower steam or outdoor monsoon drizzle.',
    nourishment: 'Apply a micro-thin layer of natural mineral oil with a soft cotton bud once a year to deepen antique gold luster.'
  },
  wood: {
    title: 'Live-Edge Seasoned Hardwood Care',
    material: 'Live-Edge Clocks & Keepsake Boxes',
    cleaning: 'Wipe with dry microfiber cloth along the wood grain. For bark perimeter, use a dry soft bristle brush.',
    humidity: 'Avoid placing right next to continuous heating air vents or damp walls.',
    nourishment: 'Rub 2-3 drops of organic linseed oil or natural beeswax polish once every 6 months to preserve golden knots.'
  },
  sculpture: {
    title: 'Cast Stone & Terracotta Care',
    material: 'Buddha Sculptures & Tribal Totems',
    cleaning: 'Dust gently with dry cotton. Safe for indoor living areas and covered verandas.',
    humidity: 'Resistant to dry climates. Keep away from standing water pools.',
    nourishment: 'Wipe with slightly damp cloth followed immediately by dry towel.'
  }
};

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

  // 1. Currency State
  const [currentCurrency, setCurrentCurrency] = useState('INR');

  // 2. Modal View Tab
  const [activeModalTab, setActiveModalTab] = useState('details'); // 'details' | 'texture-zoom'

  // 3. High-Definition Texture Zoom State (Default 100% Magnification)
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // 4. Custom Brass Plaque Engraving & Gift Personalizer
  const [customEngravingActive, setCustomEngravingActive] = useState(false);
  const [customEngravingText, setCustomEngravingText] = useState('Sharma Residence • Est. 2026');
  const [giftPackagingStyle, setGiftPackagingStyle] = useState('standard'); // 'standard' | 'silk'

  // 5. Downloadable Luxury PDF Lookbook State
  const [lookbookOpen, setLookbookOpen] = useState(false);

  // 6. Official Certificate Registry State
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certSearchQuery, setCertSearchQuery] = useState('TRF-RAJ-2026-8819');
  const [certLookupResult, setCertLookupResult] = useState(verifiedCertificates['TRF-RAJ-2026-8819']);

  // 7. Bespoke Gift Hamper Builder State
  const [hamperItems, setHamperItems] = useState(['carved-leaf-box', 'hex-planter-cart']);
  const [hamperBoxStyle, setHamperBoxStyle] = useState('silk'); // 'silk' | 'kraft'
  const [hamperQuantityTier, setHamperQuantityTier] = useState(1); // 1, 10 (10% off), 25 (15% off), 50 (20% off)
  const [hamperBrassInscription, setHamperBrassInscription] = useState('With Best Compliments • 2026');

  // 8. Artisan Care Advisor State
  const [careModalOpen, setCareModalOpen] = useState(false);
  const [activeCareTab, setActiveCareTab] = useState('brass'); // 'brass' | 'wood' | 'sculpture'

  // 9. Architect & Trade Portal State
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [tradeFormData, setTradeFormData] = useState({
    name: '',
    firm: '',
    email: '',
    phone: '',
    projectType: 'Residential Villa / Penthouse',
    notes: ''
  });

  // Pincode Estimator State
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);

  // Keyboard Escape Handler for All Modals & Drawers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
        setCartOpen(false);
        setCheckoutOpen(false);
        setLookbookOpen(false);
        setCertModalOpen(false);
        setCareModalOpen(false);
        setTradeModalOpen(false);
        setConciergeOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openProductModal = (product, tab = 'details') => {
    setSelectedProduct(product);
    setActiveModalTab(tab);
    setZoomLevel(1.0);
    setPanOffset({ x: 0, y: 0 });
  };

  // Custom Commission Calculator States
  const [calcSize, setCalcSize] = useState(commissionSizes[0]);
  const [calcMaterial, setCalcMaterial] = useState(commissionMaterials[0]);
  const [calcFraming, setCalcFraming] = useState(commissionFraming[0]);
  const [customInquiryNote, setCustomInquiryNote] = useState('');

  // WhatsApp Concierge Floating State
  const [conciergeOpen, setConciergeOpen] = useState(false);

  // Checkout Data
  const [checkoutData, setCheckoutData] = useState({
    name: 'Pankaj Saini',
    phone: '+91 89558 87074',
    pincode: '302006',
    address: 'The Rajasthani Forge Atelier, Rajasthan, India - 302006',
    paymentMethod: 'UPI QR Code (Instant Scan)'
  });

  const allProducts = initialProducts;

  // Currency Converter Formatter
  const formatPrice = (inrPrice) => {
    const { rate, symbol, code } = currencies[currentCurrency];
    const converted = Math.round(inrPrice * rate);
    if (code === 'INR') {
      return `Rs. ${converted.toLocaleString('en-IN')}`;
    }
    return `${symbol}${converted.toLocaleString('en-US')}`;
  };

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

  // Pricing calculations with Engraving & Gift wrap extras
  const engravingExtraINR = customEngravingActive ? 350 : 0;
  const giftWrapExtraINR = giftPackagingStyle === 'silk' ? 250 : 0;
  const subtotalINR = useMemo(() => {
    const base = Object.entries(cart).reduce((sum, [id, qty]) => sum + (productMap[id]?.price || 0) * qty, 0);
    return base + engravingExtraINR + giftWrapExtraINR;
  }, [cart, productMap, engravingExtraINR, giftWrapExtraINR]);

  const discountINR = couponApplied ? Math.round(subtotalINR * 0.1) : 0;
  const finalTotalINR = Math.max(subtotalINR - discountINR, 0);

  // Hamper Builder Pricing Calculations
  const hamperBasePriceINR = useMemo(() => {
    const itemsTotal = hamperItems.reduce((sum, id) => sum + (productMap[id]?.price || 0), 0);
    const boxFee = hamperBoxStyle === 'silk' ? 450 : 200;
    const tagFee = 350; // brass plaque
    const singleHamperCost = itemsTotal + boxFee + tagFee;

    let discountMultiplier = 1.0;
    if (hamperQuantityTier === 10) discountMultiplier = 0.90; // 10% discount
    if (hamperQuantityTier === 25) discountMultiplier = 0.85; // 15% discount
    if (hamperQuantityTier >= 50) discountMultiplier = 0.80; // 20% discount

    return Math.round(singleHamperCost * hamperQuantityTier * discountMultiplier);
  }, [hamperItems, hamperBoxStyle, hamperQuantityTier, productMap]);

  // Commission Estimator Calculation
  const estimatedCostINR = useMemo(() => {
    const base = calcSize.base;
    const matRate = calcMaterial.rate;
    const frameAdd = calcFraming.add;
    return Math.round((base * matRate) + frameAdd);
  }, [calcSize, calcMaterial, calcFraming]);

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

  const toggleHamperItem = (id) => {
    setHamperItems((current) => {
      if (current.includes(id)) {
        if (current.length === 1) {
          showToast('Keep at least 1 item in the hamper');
          return current;
        }
        return current.filter((x) => x !== id);
      }
      if (current.length >= 3) {
        showToast('Maximum 3 items per bespoke hamper box');
        return current;
      }
      return [...current, id];
    });
  };

  // Add Entire Hamper to Cart
  const addHamperToCart = () => {
    hamperItems.forEach((id) => {
      updateCartQty(id, hamperQuantityTier);
    });
    setCustomEngravingActive(true);
    setCustomEngravingText(hamperBrassInscription);
    setGiftPackagingStyle(hamperBoxStyle === 'silk' ? 'silk' : 'standard');
    setCartOpen(true);
    showToast(`Added ${hamperQuantityTier} Hamper collection to basket!`);
  };

  const applyPromo = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'FORGE10' || code === 'SAINI10') {
      setCouponApplied(true);
      showToast('10% artisan promo code applied!');
    } else {
      showToast('Invalid coupon. Try FORGE10');
    }
  };

  // Certificate Verification Lookup Handler
  const handleVerifyCertificate = (serial) => {
    const cleaned = serial.trim().toUpperCase();
    setCertSearchQuery(cleaned);
    if (verifiedCertificates[cleaned]) {
      setCertLookupResult(verifiedCertificates[cleaned]);
    } else {
      setCertLookupResult(null);
    }
  };

  // Texture Zoom Drag & Touch Handlers (Desktop + Mobile)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - panOffset.x, y: e.touches[0].clientY - panOffset.y });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPanOffset({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Pincode Lookup Handler
  const checkPincode = (code) => {
    setPincodeInput(code);
    const cleaned = code.trim();
    if (cleaned.length === 6 && /^\d+$/.test(cleaned)) {
      const prefix = cleaned.substring(0, 2);
      if (['30', '31', '32', '33', '34', '11', '12', '13'].includes(prefix)) {
        setPincodeResult({
          type: 'express',
          text: '⚡ Express Delivery in 2–3 Days (Rajasthan & North Corridor)',
          cost: 'Free Insured Courier'
        });
      } else if (['40', '56', '50', '60', '70', '38', '41'].includes(prefix)) {
        setPincodeResult({
          type: 'metro',
          text: '🚚 Fast Metro Delivery in 3–4 Days (Direct Flight Transit)',
          cost: 'Free Damage-Proof Packaging'
        });
      } else {
        setPincodeResult({
          type: 'standard',
          text: '📦 Standard Insured Transit in 4–5 Days',
          cost: 'Free Pan-India Delivery'
        });
      }
    } else {
      setPincodeResult(null);
    }
  };

  // Preformatted WhatsApp Order Link
  const whatsAppOrderText = encodeURIComponent(
    `Hello The Rajasthani Forge! I would like to place an order:\n\n${Object.entries(cart)
      .map(([id, qty]) => `• ${productMap[id]?.name || id} x ${qty} (${formatPrice((productMap[id]?.price || 0) * qty)})`)
      .join('\n')}${customEngravingActive ? `\n• Custom Brass Plaque: "${customEngravingText}" (+${formatPrice(engravingExtraINR)})` : ''}${giftPackagingStyle === 'silk' ? `\n• Royal Raw-Silk Gift Box Wrap (+${formatPrice(giftWrapExtraINR)})` : ''}\n\nTotal Amount: ${formatPrice(finalTotalINR)}\nDelivery Address: ${checkoutData.name}, ${checkoutData.address}\nPayment: ${checkoutData.paymentMethod}`
  );

  // Preformatted Custom Commission WhatsApp Link
  const customCommissionWhatsApp = encodeURIComponent(
    `Hello The Rajasthani Forge! I am requesting a custom commission estimate:\n\n• Size: ${calcSize.label}\n• Material: ${calcMaterial.label}\n• Framing: ${calcFraming.label}\n• Estimated Quote: ${formatPrice(estimatedCostINR)}\n• Notes: ${customInquiryNote || 'Please share timeline and customization options.'}`
  );

  // Preformatted Hamper WhatsApp Link
  const hamperWhatsAppText = encodeURIComponent(
    `Hello The Rajasthani Forge! I would like to inquire about a Bespoke Hamper Order:\n\n• Quantity: ${hamperQuantityTier} Hamper(s)\n• Included Pieces: ${hamperItems.map((id) => productMap[id]?.name).join(', ')}\n• Packaging: ${hamperBoxStyle === 'silk' ? 'Royal Raw-Silk with Saffron Ribbons' : 'Handmade Eco-Kraft Box'}\n• Brass Plaque Inscription: "${hamperBrassInscription}"\n• Estimated Total: ${formatPrice(hamperBasePriceINR)}\n\nPlease share delivery timeline and corporate/wedding bulk rates.`
  );

  return (
    <div className="site-wrapper">
      {/* 1. Top Announcement with Currency Switcher & Certificate Link */}
      <div className="top-strip">
        <div className="top-strip-inner">
          <div className="top-strip-left">
            <span>Authentic Indian Heritage Handicrafts • Direct Workshop Pricing</span>
            <button className="top-strip-btn" onClick={() => setCertModalOpen(true)}>
              <ShieldCheck size={13} /> Verify Authenticity Serial
            </button>
          </div>
          <div className="currency-selector-wrap">
            <Globe size={13} />
            <select
              value={currentCurrency}
              onChange={(e) => {
                setCurrentCurrency(e.target.value);
                showToast(`Switched currency to ${e.target.value}`);
              }}
              aria-label="Currency Selector"
            >
              {Object.values(currencies).map((curr) => (
                <option key={curr.code} value={curr.code}>{curr.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Header with Lookbook Button & Trade Portal */}
      <header className="header">
        <div className="header-container">
          <a href="#top" className="logo">
            <span className="logo-badge">RF</span>
            <div>
              <span className="logo-title">THE RAJASTHANI FORGE</span>
              <span className="logo-sub">Artisan Atelier • Rajasthan</span>
            </div>
          </a>

          <nav className={`nav-menu ${navOpen ? 'open' : ''}`}>
            <a href="#collection" onClick={() => setNavOpen(false)}>Collection</a>
            <a href="#hampers" onClick={() => setNavOpen(false)}>Gift Hampers</a>
            <a href="#patron-spaces" onClick={() => setNavOpen(false)}>Patron Spaces</a>
            <a href="#heritage" onClick={() => setNavOpen(false)}>Heritage</a>
            <button className="nav-text-btn" onClick={() => { setCareModalOpen(true); setNavOpen(false); }}>
              <Wrench size={14} /> Care Guide
            </button>
            <button className="nav-text-btn" onClick={() => { setTradeModalOpen(true); setNavOpen(false); }}>
              <Briefcase size={14} /> Trade Portal
            </button>
            <button className="nav-lookbook-link" onClick={() => { setLookbookOpen(true); setNavOpen(false); }}>
              <BookOpen size={14} /> 2026 Lookbook
            </button>
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

      {/* 3. Hero Section */}
      <section className="hero-section" id="top">
        <div className="hero-grid">
          <div className="hero-text-content">
            <span className="section-eyebrow"><Sparkles size={14} /> Traditional Handcrafting</span>
            <h1 className="hero-headline">Authentic Indian crafts, shaped with soul and patience.</h1>
            <p className="hero-desc">
              Discover genuine hand-beaten brass wall murals, natural live-edge teak clocks, and carved tribal sculptures direct from our master atelier in Rajasthan.
            </p>
            <div className="hero-btn-row">
              <a href="#collection" className="btn-primary">
                View Collection ({allProducts.length} Pieces) <ArrowRight size={17} />
              </a>
              <button className="btn-secondary" onClick={() => setLookbookOpen(true)}>
                <BookOpen size={16} /> View 2026 Lookbook (PDF)
              </button>
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
              <span>Hand-Embossed Relief Plaque • {formatPrice(4890)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Highlights Bar */}
      <section className="trust-bar">
        <div className="trust-item" onClick={() => setCertModalOpen(true)} style={{ cursor: 'pointer' }}>
          <ShieldCheck size={24} />
          <div>
            <strong>Verified Authenticity</strong>
            <span>Click to verify serial certificates</span>
          </div>
        </div>
        <div className="trust-item">
          <Truck size={24} />
          <div>
            <strong>Safe Insured Shipping</strong>
            <span>Secure wood-cushioned delivery</span>
          </div>
        </div>
        <div className="trust-item" onClick={() => setTradeModalOpen(true)} style={{ cursor: 'pointer' }}>
          <Briefcase size={24} />
          <div>
            <strong>Trade & Architect Portal</strong>
            <span>B2B & custom hospitality projects</span>
          </div>
        </div>
        <div className="trust-item" onClick={() => setCareModalOpen(true)} style={{ cursor: 'pointer' }}>
          <Wrench size={24} />
          <div>
            <strong>Artisan Care Guide</strong>
            <span>Maintenance & natural polish tips</span>
          </div>
        </div>
      </section>

      {/* 5. Product Catalog with Small-Batch Atelier Edition Badges */}
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
              <div
                className="card-image-box"
                onClick={() => openProductModal(product, 'details')}
              >
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="card-badge">{product.badge}</span>
                <span className="card-overlay"><Eye size={16} /> View Details & Texture Zoom</span>
              </div>

              <div className="card-info">
                <div className="card-batch-strip">
                  <span className="batch-edition-tag"><Award size={12} /> {product.batchEdition}</span>
                </div>
                <span className="card-category">{product.category}</span>
                <h3 onClick={() => openProductModal(product, 'details')}>
                  {product.name}
                </h3>
                <p className="card-material">{product.material} • {product.dimensions}</p>

                <div className="card-price-row">
                  <div className="price-group">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="old-price">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <span className="stock-tag">{product.stock}</span>
                </div>

                <div className="card-action-row">
                  <button className="btn-card-add" onClick={() => { updateCartQty(product.id, 1); showToast(`Added ${product.name} to cart`); }}>
                    <ShoppingBag size={15} /> Add to Cart
                  </button>
                  <button className="btn-card-view" onClick={() => openProductModal(product, 'texture-zoom')}>
                    <ZoomIn size={14} /> Inspect Texture
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

      {/* 6. Bespoke Gift Hamper & Wedding Favor Builder */}
      <section className="hamper-builder-section" id="hampers">
        <div className="hamper-container">
          <div className="section-head">
            <span className="section-eyebrow"><Gift size={15} /> Bespoke Gifting Atelier</span>
            <h2>Curate a Custom Gift Hamper</h2>
            <p>Perfect for luxury weddings, corporate festival gifting, and housewarming celebrations. Hand-packaged with custom engraved brass plaque and wax seal.</p>
          </div>

          <div className="hamper-grid">
            <div className="hamper-selection-col">
              <label className="hamper-step-label">1. Choose 1 to 3 Artisan Pieces to Bundle:</label>
              <div className="hamper-product-picker">
                {allProducts.map((p) => {
                  const isSelected = hamperItems.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      className={`hamper-pick-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleHamperItem(p.id)}
                    >
                      <img src={p.image} alt={p.name} />
                      <div className="hamper-pick-meta">
                        <strong>{p.name}</strong>
                        <span>{formatPrice(p.price)}</span>
                      </div>
                      <div className="hamper-check-indicator">
                        {isSelected ? <CheckCircle size={16} /> : <Plus size={16} />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="hamper-options-row">
                <div className="hamper-option-group">
                  <label className="hamper-step-label">2. Luxury Presentation Box:</label>
                  <div className="calc-chips">
                    <button
                      className={hamperBoxStyle === 'silk' ? 'active' : ''}
                      onClick={() => setHamperBoxStyle('silk')}
                    >
                      Royal Raw-Silk Box with Saffron Ribbon (+{formatPrice(450)})
                    </button>
                    <button
                      className={hamperBoxStyle === 'kraft' ? 'active' : ''}
                      onClick={() => setHamperBoxStyle('kraft')}
                    >
                      Handmade Eco-Kraft Box (+{formatPrice(200)})
                    </button>
                  </div>
                </div>

                <div className="hamper-option-group">
                  <label className="hamper-step-label">3. Quantity & Tier Discount:</label>
                  <div className="calc-chips">
                    <button className={hamperQuantityTier === 1 ? 'active' : ''} onClick={() => setHamperQuantityTier(1)}>
                      Single Hamper (1 unit)
                    </button>
                    <button className={hamperQuantityTier === 10 ? 'active' : ''} onClick={() => setHamperQuantityTier(10)}>
                      10 Hampers (10% Off)
                    </button>
                    <button className={hamperQuantityTier === 25 ? 'active' : ''} onClick={() => setHamperQuantityTier(25)}>
                      25 Hampers (15% Off)
                    </button>
                    <button className={hamperQuantityTier === 50 ? 'active' : ''} onClick={() => setHamperQuantityTier(50)}>
                      50+ Hampers (20% Off)
                    </button>
                  </div>
                </div>

                <div className="hamper-option-group">
                  <label className="hamper-step-label">4. Brass Plaque Inscription (Included):</label>
                  <input
                    type="text"
                    maxLength={45}
                    value={hamperBrassInscription}
                    onChange={(e) => setHamperBrassInscription(e.target.value)}
                    placeholder="e.g. In Celebration of Rohit & Ananya • 2026"
                  />
                </div>
              </div>
            </div>

            {/* Hamper Live Summary Card */}
            <div className="hamper-summary-card">
              <span className="section-eyebrow">Curated Hamper Preview</span>
              <h3>Atelier Gift Collection</h3>
              <div className="hamper-items-list">
                {hamperItems.map((id) => (
                  <div className="hamper-summary-item" key={id}>
                    <span>• {productMap[id]?.name}</span>
                    <strong>{formatPrice(productMap[id]?.price || 0)}</strong>
                  </div>
                ))}
              </div>

              {/* Engraved Plaque Simulation */}
              <div className="brass-plaque-preview mini">
                <span className="plaque-corner top-left" />
                <span className="plaque-corner top-right" />
                <p>{hamperBrassInscription || 'Your Gift Inscription'}</p>
                <span className="plaque-corner bottom-left" />
                <span className="plaque-corner bottom-right" />
              </div>

              <div className="hamper-price-box">
                <div>
                  <span>Total for {hamperQuantityTier} Hamper{hamperQuantityTier > 1 ? 's' : ''}:</span>
                  <strong className="hamper-grand-total">{formatPrice(hamperBasePriceINR)}</strong>
                </div>
                {hamperQuantityTier >= 10 && (
                  <small className="discount-tag">Includes Tiered Volume Discount</small>
                )}
              </div>

              <div className="hamper-btn-row">
                <button className="btn-primary full-width" onClick={addHamperToCart}>
                  <ShoppingBag size={17} /> Add Hamper to Basket ({formatPrice(hamperBasePriceINR)})
                </button>
                <a
                  className="btn-whatsapp full-width"
                  href={`https://wa.me/918955887074?text=${hamperWhatsAppText}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={17} /> Inquire Bulk on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. "Patron Spaces" — Real Home Styling Gallery Section */}
      <section className="patron-spaces-section" id="patron-spaces">
        <div className="section-head">
          <span className="section-eyebrow"><Sparkles size={14} /> Real Interior Showcase</span>
          <h2>Patron Spaces & Styled Homes</h2>
          <p>See how our handcrafted brass murals, live-edge woodwork, and sculptures transform residences across India.</p>
        </div>

        <div className="patron-spaces-grid">
          {patronSpaces.map((space) => {
            const product = productMap[space.productId];
            return (
              <div className="patron-space-card" key={space.id}>
                <div className="patron-space-image">
                  <img src={space.image} alt={space.title} />
                  <span className="patron-location-tag"><MapPin size={12} /> {space.location}</span>
                </div>
                <div className="patron-space-content">
                  <h4>{space.title}</h4>
                  <p className="patron-quote">{space.quote}</p>
                  <div className="patron-card-foot">
                    <button
                      className="btn-patron-view"
                      onClick={() => {
                        if (product) openProductModal(product, 'details');
                      }}
                    >
                      <span>Piece: <strong>{space.tag}</strong></span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Heritage Craft Story */}
      <section className="heritage-section" id="heritage">
        <div className="heritage-grid">
          <div className="heritage-text">
            <span className="section-eyebrow">authentic lineage</span>
            <h2>Carved by hand. Preserved for generations.</h2>
            <p>
              At <strong>The Rajasthani Forge</strong>, every piece originates from a slow, deliberate artisanal process. We specialize in live-edge seasoned hardwood chiseling, traditional repoussé metal embossing, and weathered patina stonework.
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

      {/* 9. Live Custom Commission Cost Estimator */}
      <section className="calculator-section" id="calculator">
        <div className="calculator-container">
          <div className="section-head">
            <span className="section-eyebrow"><Calculator size={15} /> Instant Commission Estimator</span>
            <h2>Custom Sizing & Craft Quote Builder</h2>
            <p>Select your desired dimensions, metal or wood finish, and framing to receive an instant workshop estimate.</p>
          </div>

          <div className="calculator-grid">
            <div className="calculator-controls-box">
              <div className="calc-group">
                <label>1. Select Canvas / Wall Dimensions</label>
                <div className="calc-chips">
                  {commissionSizes.map((size) => (
                    <button
                      key={size.label}
                      className={calcSize.label === size.label ? 'active' : ''}
                      onClick={() => setCalcSize(size)}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc-group">
                <label>2. Primary Material & Technique</label>
                <div className="calc-chips">
                  {commissionMaterials.map((mat) => (
                    <button
                      key={mat.label}
                      className={calcMaterial.label === mat.label ? 'active' : ''}
                      onClick={() => setCalcMaterial(mat)}
                    >
                      {mat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc-group">
                <label>3. Border & Framing Style</label>
                <div className="calc-chips">
                  {commissionFraming.map((frame) => (
                    <button
                      key={frame.label}
                      className={calcFraming.label === frame.label ? 'active' : ''}
                      onClick={() => setCalcFraming(frame)}
                    >
                      {frame.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc-group">
                <label>4. Space Details / Inscriptions (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Mandir backdrop, couple initials, corporate logo..."
                  value={customInquiryNote}
                  onChange={(e) => setCustomInquiryNote(e.target.value)}
                />
              </div>
            </div>

            {/* Estimated Quote Summary Card */}
            <div className="calculator-result-card">
              <span className="section-eyebrow">Estimated Workshop Quote</span>
              <div className="estimate-price-big">
                {formatPrice(estimatedCostINR)}
              </div>
              <small className="estimate-subtext">Estimated pricing includes insured damage-proof packaging & artisan certification.</small>

              <div className="estimate-breakdown">
                <div><span>Dimension:</span> <strong>{calcSize.label}</strong></div>
                <div><span>Finish:</span> <strong>{calcMaterial.label}</strong></div>
                <div><span>Framing:</span> <strong>{calcFraming.label}</strong></div>
                <div><span>Crafting Time:</span> <strong>10–14 Days</strong></div>
              </div>

              <a
                className="btn-whatsapp full-width"
                href={`https://wa.me/918955887074?text=${customCommissionWhatsApp}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} /> Request This Commission on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Slide-Out Cart Drawer */}
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
                      <span className="cart-item-price">{formatPrice(item.price)}</span>
                      <div className="qty-stepper">
                        <button onClick={() => updateCartQty(id, -1)}><Minus size={13} /></button>
                        <span>{qty}</span>
                        <button onClick={() => updateCartQty(id, 1)}><Plus size={13} /></button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Personalized Engraving in Cart */}
              {cartItemCount > 0 && (
                <div className="cart-personalize-box">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={customEngravingActive}
                      onChange={(e) => setCustomEngravingActive(e.target.checked)}
                    />
                    <span>Add Hand-Engraved Brass Plaque (+{formatPrice(350)})</span>
                  </label>
                  {customEngravingActive && (
                    <div className="engraving-input-wrap">
                      <input
                        type="text"
                        maxLength={40}
                        placeholder="e.g. Sharma Residence • Est. 2026"
                        value={customEngravingText}
                        onChange={(e) => setCustomEngravingText(e.target.value)}
                      />
                      {/* Live Brass Plaque Miniature Preview */}
                      <div className="brass-plaque-preview mini">
                        <span className="plaque-corner top-left" />
                        <span className="plaque-corner top-right" />
                        <p>{customEngravingText || 'Your Inscription Here'}</p>
                        <span className="plaque-corner bottom-left" />
                        <span className="plaque-corner bottom-right" />
                      </div>
                    </div>
                  )}
                </div>
              )}

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
                    placeholder="Coupon: FORGE10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button onClick={applyPromo}>Apply</button>
                </div>

                {couponApplied && (
                  <div className="promo-applied-tag">
                    <CheckCircle size={14} /> 10% discount applied (-{formatPrice(discountINR)})
                  </div>
                )}

                <div className="cart-summary-line">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotalINR)}</span>
                </div>
                {couponApplied && (
                  <div className="cart-summary-line discount">
                    <span>Artisan Promo:</span>
                    <span>-{formatPrice(discountINR)}</span>
                  </div>
                )}
                <div className="cart-summary-line total">
                  <strong>Total Payable:</strong>
                  <strong>{formatPrice(finalTotalINR)}</strong>
                </div>

                <a className="btn-whatsapp" href={`https://wa.me/918955887074?text=${whatsAppOrderText}`} target="_blank" rel="noreferrer">
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

      {/* 11. Clean Luxury Product Details & High-Def Texture Zoom Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" onClick={() => setSelectedProduct(null)}><X size={18} /></button>

            {/* Modal Navigation Tabs */}
            <div className="modal-tab-header">
              <button
                className={activeModalTab === 'details' ? 'active' : ''}
                onClick={() => setActiveModalTab('details')}
              >
                <Layers size={15} /> Specifications & Story
              </button>
              <button
                className={activeModalTab === 'texture-zoom' ? 'active' : ''}
                onClick={() => setActiveModalTab('texture-zoom')}
              >
                <ZoomIn size={15} /> High-Def Texture Inspector (Pan & Zoom)
              </button>
            </div>

            <div className="modal-inner-grid">
              {/* LEFT SIDE: CLEAN ARTWORK DISPLAY OR INTERACTIVE TEXTURE ZOOM */}
              {activeModalTab === 'details' ? (
                <div className="clean-artwork-display-frame">
                  <img src={selectedProduct.image} alt={selectedProduct.name} />

                  {/* Live Brass Plaque Preview on Art if Enabled */}
                  {customEngravingActive && (
                    <div className="brass-plaque-on-art">
                      <span className="plaque-corner top-left" />
                      <span className="plaque-corner top-right" />
                      <p>{customEngravingText}</p>
                      <span className="plaque-corner bottom-left" />
                      <span className="plaque-corner bottom-right" />
                    </div>
                  )}

                  <button
                    className="btn-open-zoom-chip"
                    onClick={() => setActiveModalTab('texture-zoom')}
                  >
                    <ZoomIn size={13} /> Click to Inspect 3D Texture (Pan & Zoom)
                  </button>
                </div>
              ) : (
                /* HIGH-DEFINITION TEXTURE INSPECTOR CANVAS (PAN & ZOOM with Touch Support) */
                <div className="hd-texture-inspector-wrap">
                  <div
                    className={`texture-zoom-viewport ${isDragging ? 'dragging' : ''}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleMouseUp}
                  >
                    <div
                      className="texture-zoom-layer"
                      style={{
                        transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                        backgroundImage: `url(${selectedProduct.image})`
                      }}
                    />
                    <div className="zoom-drag-hint">
                      <Move size={14} /> Click/Touch & Drag to inspect hand-carved wood grain and hammered brass relief
                    </div>
                  </div>

                  {/* Zoom Controls Bar */}
                  <div className="texture-zoom-controls">
                    <button
                      onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.4))}
                      disabled={zoomLevel <= 1}
                      title="Zoom Out"
                    >
                      <ZoomOut size={16} />
                    </button>
                    <span className="zoom-level-badge">{Math.round(zoomLevel * 100)}% Magnification</span>
                    <button
                      onClick={() => setZoomLevel(Math.min(3.5, zoomLevel + 0.4))}
                      disabled={zoomLevel >= 3.5}
                      title="Zoom In"
                    >
                      <ZoomIn size={16} />
                    </button>
                    <button
                      className="btn-reset-zoom"
                      onClick={() => { setZoomLevel(1.0); setPanOffset({ x: 0, y: 0 }); }}
                    >
                      <RotateCcw size={14} /> Reset
                    </button>
                  </div>
                </div>
              )}

              {/* RIGHT SIDE: DETAILS / ENGRAVING / PINCODE / CHECKOUT */}
              <div className="modal-details">
                <span className="section-eyebrow">{selectedProduct.category}</span>
                <h2>{selectedProduct.name}</h2>

                <div className="modal-batch-info">
                  <Award size={14} />
                  <span>{selectedProduct.batchEdition} • <strong>{selectedProduct.provenance}</strong></span>
                </div>

                <div className="modal-price-box">
                  <span className="modal-price">{formatPrice(selectedProduct.price)}</span>
                  {selectedProduct.originalPrice && (
                    <span className="modal-old-price">{formatPrice(selectedProduct.originalPrice)}</span>
                  )}
                  <span className="modal-stock">{selectedProduct.stock}</span>
                </div>

                {/* Custom Brass Plaque Engraving Option */}
                <div className="product-engraving-customizer">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={customEngravingActive}
                      onChange={(e) => setCustomEngravingActive(e.target.checked)}
                    />
                    <span><strong>Add Custom Engraved Brass Nameplate</strong> (+{formatPrice(350)})</span>
                  </label>
                  {customEngravingActive && (
                    <input
                      type="text"
                      maxLength={40}
                      className="engraving-text-input"
                      placeholder="e.g. Dedicated to Rajesh & Sunita • 2026"
                      value={customEngravingText}
                      onChange={(e) => setCustomEngravingText(e.target.value)}
                    />
                  )}
                </div>

                {/* Pincode Estimator Widget */}
                <div className="pincode-estimator-widget">
                  <label><Truck size={15} /> Check Delivery to Pincode</label>
                  <div className="pincode-input-row">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit Pincode (e.g. 302006)"
                      value={pincodeInput}
                      onChange={(e) => checkPincode(e.target.value)}
                    />
                  </div>
                  {pincodeResult && (
                    <div className="pincode-result-tag">
                      <CheckCircle size={14} /> {pincodeResult.text} • <strong>{pincodeResult.cost}</strong>
                    </div>
                  )}
                </div>

                <div className="modal-specs">
                  <div><strong>Material:</strong> <span>{selectedProduct.material}</span></div>
                  <div><strong>Dimensions:</strong> <span>{selectedProduct.dimensions}</span></div>
                  <div><strong>Care:</strong> <span>{selectedProduct.care}</span></div>
                  <div><strong>Origin:</strong> <span>The Rajasthani Forge Atelier, Rajasthan</span></div>
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
                    href={`https://wa.me/918955887074?text=${encodeURIComponent(`Hello The Rajasthani Forge, I want to inquire about "${selectedProduct.name}" (Price: ${formatPrice(selectedProduct.price)}).`)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle size={17} /> WhatsApp Inquiry
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 12. Official Authenticity Certificate Lookup Modal */}
      {certModalOpen && (
        <div className="modal-overlay" onClick={() => setCertModalOpen(false)}>
          <div className="cert-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" onClick={() => setCertModalOpen(false)}><X size={18} /></button>

            <div className="section-head">
              <span className="section-eyebrow"><ShieldCheck size={16} /> Official Provenance Registry</span>
              <h2>Verify Authenticity Certificate</h2>
              <p>Enter the serial code inscribed on your physical certificate seal or back of your piece.</p>
            </div>

            <div className="cert-search-bar">
              <input
                type="text"
                placeholder="e.g. SH-RAJ-2026-8819"
                value={certSearchQuery}
                onChange={(e) => handleVerifyCertificate(e.target.value)}
              />
              <button onClick={() => handleVerifyCertificate(certSearchQuery)}>
                <Search size={16} /> Verify
              </button>
            </div>

            <div className="cert-samples-row">
              <span>Sample Serials:</span>
              {Object.keys(verifiedCertificates).map((serial) => (
                <button key={serial} onClick={() => handleVerifyCertificate(serial)}>
                  {serial}
                </button>
              ))}
            </div>

            {certLookupResult ? (
              <div className="cert-official-certificate-card">
                <div className="cert-gold-seal">
                  <Award size={36} />
                  <span>SEAL OF AUTHENTICITY</span>
                </div>

                <div className="cert-body-details">
                  <span className="cert-status-badge"><CheckCircle size={13} /> {certLookupResult.status}</span>
                  <h3>{certLookupResult.pieceName}</h3>
                  <div className="cert-meta-grid">
                    <div><span>Serial Number:</span> <strong>{certLookupResult.serial}</strong></div>
                    <div><span>Master Craftsman:</span> <strong>{certLookupResult.masterCraftsman}</strong></div>
                    <div><span>Provenance:</span> <strong>{certLookupResult.materialProvenance}</strong></div>
                    <div><span>Chisel / Casting:</span> <strong>{certLookupResult.chiselDate}</strong></div>
                    <div><span>Location:</span> <strong>{certLookupResult.origin}</strong></div>
                    <div><span>Guild Audit:</span> <strong>{certLookupResult.inspectedBy}</strong></div>
                  </div>
                </div>

                <div className="cert-footer-actions">
                  <button className="btn-secondary btn-sm" onClick={() => window.print()}>
                    <Printer size={14} /> Print Authenticity Proof
                  </button>
                </div>
              </div>
            ) : (
              <div className="cert-not-found">
                <p>No official record found matching "{certSearchQuery}". Please check your certificate code.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 13. Interactive Artisan Care Advisor Modal */}
      {careModalOpen && (
        <div className="modal-overlay" onClick={() => setCareModalOpen(false)}>
          <div className="care-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" onClick={() => setCareModalOpen(false)}><X size={18} /></button>

            <div className="section-head">
              <span className="section-eyebrow"><Wrench size={16} /> Longevity & Preservation</span>
              <h2>Artisan Care & Maintenance Guide</h2>
              <p>Handcrafted heirlooms thrive with gentle, natural care. Select your craft material below.</p>
            </div>

            <div className="care-tab-buttons">
              <button className={activeCareTab === 'brass' ? 'active' : ''} onClick={() => setActiveCareTab('brass')}>
                ✨ Brass Murals & Relief
              </button>
              <button className={activeCareTab === 'wood' ? 'active' : ''} onClick={() => setActiveCareTab('wood')}>
                🪵 Live-Edge & Teak Wood
              </button>
              <button className={activeCareTab === 'sculpture' ? 'active' : ''} onClick={() => setActiveCareTab('sculpture')}>
                🗿 Cast Stone & Terracotta
              </button>
            </div>

            <div className="care-guide-content-card">
              <h3>{careProtocols[activeCareTab].title}</h3>
              <span className="care-material-sub">{careProtocols[activeCareTab].material}</span>

              <div className="care-pillars-grid">
                <div className="care-pillar-box">
                  <strong>🧹 Routine Cleaning</strong>
                  <p>{careProtocols[activeCareTab].cleaning}</p>
                </div>
                <div className="care-pillar-box">
                  <strong>⛅ Climate & Sunlight</strong>
                  <p>{careProtocols[activeCareTab].humidity}</p>
                </div>
                <div className="care-pillar-box">
                  <strong>🧴 Oil & Nourishment</strong>
                  <p>{careProtocols[activeCareTab].nourishment}</p>
                </div>
              </div>

              <div className="care-footer-box">
                <p>Have questions regarding aged patina or bespoke restoration? Contact our master atelier:</p>
                <a
                  className="btn-whatsapp btn-sm"
                  href="https://wa.me/918955887074?text=Hello%20The%20Rajasthani%20Forge,%20I%20need%20care%20and%20maintenance%20guidance%20for%20my%20handicraft%20piece."
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={14} /> Ask Artisan on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 14. Architect, Interior Designer & Trade Partnership Modal */}
      {tradeModalOpen && (
        <div className="modal-overlay" onClick={() => setTradeModalOpen(false)}>
          <div className="trade-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" onClick={() => setTradeModalOpen(false)}><X size={18} /></button>

            <div className="section-head">
              <span className="section-eyebrow"><Building size={16} /> B2B & Trade Program</span>
              <h2>Architects, Designers & Hospitality</h2>
              <p>Collaborate directly with our master craftsmen for bespoke dimensions, custom villa installations, and luxury hotel decor.</p>
            </div>

            <div className="trade-benefits-strip">
              <div>
                <strong>📐 Custom Sizing</strong>
                <span>Direct custom dimensions up to 8 feet</span>
              </div>
              <div>
                <strong>🏷️ Trade Pricing</strong>
                <span>15% to 25% margin on trade orders</span>
              </div>
              <div>
                <strong>🚚 Site-Delivered</strong>
                <span>White-glove insured crate delivery</span>
              </div>
            </div>

            <form
              className="trade-inquiry-form"
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Trade inquiry submitted! We will respond on WhatsApp shortly.');
                setTradeModalOpen(false);
              }}
            >
              <div className="form-two-col">
                <label>
                  Contact Person
                  <input
                    required
                    placeholder="e.g. Ar. Ananya Roy"
                    value={tradeFormData.name}
                    onChange={(e) => setTradeFormData({ ...tradeFormData, name: e.target.value })}
                  />
                </label>
                <label>
                  Design Studio / Firm Name
                  <input
                    required
                    placeholder="e.g. Studio Vista Architecture"
                    value={tradeFormData.firm}
                    onChange={(e) => setTradeFormData({ ...tradeFormData, firm: e.target.value })}
                  />
                </label>
              </div>

              <div className="form-two-col">
                <label>
                  WhatsApp / Phone
                  <input
                    required
                    placeholder="+91 89558 87074"
                    value={tradeFormData.phone}
                    onChange={(e) => setTradeFormData({ ...tradeFormData, phone: e.target.value })}
                  />
                </label>
                <label>
                  Project Category
                  <select
                    value={tradeFormData.projectType}
                    onChange={(e) => setTradeFormData({ ...tradeFormData, projectType: e.target.value })}
                  >
                    <option>Residential Villa / Penthouse</option>
                    <option>Luxury Boutique Hotel / Resort</option>
                    <option>Corporate Headquarters / Lobby</option>
                    <option>High-End Dining / Restaurant</option>
                  </select>
                </label>
              </div>

              <label>
                Project Requirements / Sizing Notes
                <textarea
                  rows={3}
                  placeholder="Describe your wall dimensions, required brass/wood finishes, quantity, and site location..."
                  value={tradeFormData.notes}
                  onChange={(e) => setTradeFormData({ ...tradeFormData, notes: e.target.value })}
                />
              </label>

              <div className="trade-action-row">
                <button className="btn-primary" type="submit">
                  <Send size={16} /> Submit Trade Consultation Request
                </button>
                <a
                  className="btn-whatsapp"
                  href={`https://wa.me/918955887074?text=${encodeURIComponent(`Hello The Rajasthani Forge! I am an Interior Designer / Architect (${tradeFormData.name || 'Designer'} from ${tradeFormData.firm || 'Design Studio'}) interested in trade commissions for a ${tradeFormData.projectType}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={16} /> Direct WhatsApp with Crafter
                </a>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 15. Downloadable Luxury PDF Lookbook Modal */}
      {lookbookOpen && (
        <div className="modal-overlay" onClick={() => setLookbookOpen(false)}>
          <div className="lookbook-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="lookbook-toolbar no-print">
              <div>
                <span className="section-eyebrow">Atelier Publication</span>
                <h3>2026 Artisan Collection Lookbook</h3>
              </div>
              <div className="lookbook-actions">
                <button className="btn-primary btn-sm" onClick={() => window.print()}>
                  <Printer size={15} /> Print / Save as PDF
                </button>
                <button className="btn-icon" onClick={() => setLookbookOpen(false)}><X size={18} /></button>
              </div>
            </div>

            {/* Printable Catalogue Pages */}
            <div className="lookbook-document">
              {/* Cover Page */}
              <div className="lookbook-cover">
                <span className="logo-badge big">RF</span>
                <h1>THE RAJASTHANI FORGE</h1>
                <p className="lookbook-subtitle">Authentic Handcrafted Masterpieces • Rajasthan Atelier</p>
                <div className="lookbook-meta-strip">
                  <span>2026 Official Catalogue</span>
                  <span>Direct Workshop Commissions</span>
                  <span>Jaipur & Alwar, Rajasthan</span>
                </div>
              </div>

              {/* Product Grid Layout */}
              <div className="lookbook-pages-grid">
                {allProducts.map((prod, idx) => (
                  <div className="lookbook-item-card" key={prod.id}>
                    <div className="lookbook-item-image">
                      <img src={prod.image} alt={prod.name} />
                      <span className="lookbook-item-num">0{idx + 1}</span>
                    </div>
                    <div className="lookbook-item-details">
                      <span className="lookbook-item-cat">{prod.category}</span>
                      <h4>{prod.name}</h4>
                      <p className="lookbook-item-desc">{prod.description}</p>
                      <div className="lookbook-item-specs">
                        <div><strong>Batch:</strong> {prod.batchEdition}</div>
                        <div><strong>Material:</strong> {prod.material}</div>
                        <div><strong>Dimensions:</strong> {prod.dimensions}</div>
                        <div><strong>Direct Price:</strong> {formatPrice(prod.price)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lookbook-footer-strip">
                <p>For bespoke sizing, architect inquiries, or bulk wedding commissions, contact:</p>
                <strong>WhatsApp / Phone: +91 89558 87074 • Rajasthan, India</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 16. Checkout & Confirmation Modal with Dynamic UPI QR Code */}
      {checkoutOpen && (
        <div className="modal-overlay" onClick={() => setCheckoutOpen(false)}>
          <div className="checkout-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" onClick={() => setCheckoutOpen(false)}><X size={18} /></button>

            {checkoutSuccess ? (
              <div className="order-confirmed-view">
                <CheckCircle size={54} className="confirm-icon" />
                <h2>Order Confirmed!</h2>
                <p>Order ID: <strong>TRF-2026-8819</strong>. Your authentic handicraft order is being packaged with utmost care.</p>

                {customEngravingActive && (
                  <div className="brass-plaque-preview">
                    <span className="plaque-corner top-left" />
                    <span className="plaque-corner top-right" />
                    <strong>Engraved Brass Plaque Attached:</strong>
                    <p>"{customEngravingText}"</p>
                    <span className="plaque-corner bottom-left" />
                    <span className="plaque-corner bottom-right" />
                  </div>
                )}

                <div className="cert-preview">
                  <div className="cert-badge"><Sparkles size={14} /> Certificate of Authenticity</div>
                  <h4>The Rajasthani Forge Original Commission</h4>
                  <p>Certified genuine handmade piece crafted with traditional methods in Rajasthan.</p>
                  <div className="cert-serial-row">
                    <small>Serial: <strong>TRF-RAJ-2026-8819</strong></small>
                    <button
                      className="btn-cert-check"
                      onClick={() => {
                        handleVerifyCertificate('TRF-RAJ-2026-8819');
                        setCheckoutOpen(false);
                        setCertModalOpen(true);
                      }}
                    >
                      <ShieldCheck size={13} /> View Verified Seal
                    </button>
                  </div>
                </div>

                <div className="checkout-btn-group">
                  <button className="btn-secondary" onClick={() => window.print()}>
                    <Printer size={16} /> Print Order Receipt
                  </button>
                  <a className="btn-whatsapp" href={`https://wa.me/918955887074?text=${whatsAppOrderText}`} target="_blank" rel="noreferrer">
                    <MessageCircle size={16} /> Send Order Copy to WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form className="checkout-form-view" onSubmit={(e) => { e.preventDefault(); setCheckoutSuccess(true); }}>
                <h2>Finalize Delivery & Payment</h2>
                <div className="order-brief">
                  <span>Items: {cartItemCount}</span>
                  <strong>Total Payable: {formatPrice(finalTotalINR)}</strong>
                </div>

                <div className="form-two-col">
                  <label>
                    Full Name
                    <input
                      required
                      value={checkoutData.name}
                      onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                    />
                  </label>
                  <label>
                    WhatsApp / Phone
                    <input
                      required
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                    />
                  </label>
                </div>

                <div className="form-two-col">
                  <label>
                    Delivery Pincode
                    <input
                      required
                      maxLength={6}
                      value={checkoutData.pincode}
                      onChange={(e) => {
                        setCheckoutData({ ...checkoutData, pincode: e.target.value });
                        checkPincode(e.target.value);
                      }}
                    />
                  </label>
                  <label>
                    Payment Mode
                    <select
                      value={checkoutData.paymentMethod}
                      onChange={(e) => setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })}
                    >
                      <option>UPI QR Code (Instant Scan)</option>
                      <option>Cash on Delivery (COD)</option>
                      <option>Direct Bank Transfer / NEFT</option>
                    </select>
                  </label>
                </div>

                {/* Live Pincode Estimator inside checkout */}
                {pincodeResult && (
                  <div className="checkout-pincode-badge">
                    <Truck size={14} /> {pincodeResult.text}
                  </div>
                )}

                <label>
                  Complete Delivery Address
                  <textarea
                    required
                    rows={2}
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                  />
                </label>

                {/* Packaging Upgrade Option */}
                <div className="packaging-upgrade-box">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={giftPackagingStyle === 'silk'}
                      onChange={(e) => setGiftPackagingStyle(e.target.checked ? 'silk' : 'standard')}
                    />
                    <span><Gift size={15} /> Upgrade to <strong>Royal Raw-Silk Ribbon & Wax-Sealed Gift Box</strong> (+{formatPrice(250)})</span>
                  </label>
                </div>

                {/* Dynamic UPI QR Code Box */}
                {checkoutData.paymentMethod.includes('UPI') && (
                  <div className="dynamic-upi-box">
                    <div className="upi-qr-frame">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`upi://pay?pa=8955887074@upi&pn=TheRajasthaniForge&am=${finalTotalINR}&cu=INR`)}`}
                        alt="UPI Payment QR Code"
                      />
                    </div>
                    <div className="upi-instructions">
                      <strong><QrCode size={16} /> Scan to Pay via GPay / PhonePe / Paytm</strong>
                      <p>Amount: <strong>{formatPrice(finalTotalINR)}</strong></p>
                      <small>UPI ID: 8955887074@upi</small>
                    </div>
                  </div>
                )}

                <button className="btn-primary full-width" type="submit">
                  <CreditCard size={17} /> Confirm Order ({formatPrice(finalTotalINR)})
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 17. Floating WhatsApp Concierge Widget */}
      <div className="whatsapp-concierge-float">
        {conciergeOpen ? (
          <div className="concierge-card">
            <div className="concierge-head">
              <div>
                <strong>Artisan Concierge</strong>
                <span><CheckCircle size={12} /> Workshop Online</span>
              </div>
              <button onClick={() => setConciergeOpen(false)}><X size={15} /></button>
            </div>
            <p className="concierge-intro">Namaste! How can our master artisan assist your space today?</p>
            <div className="concierge-chips">
              <a
                href={`https://wa.me/918955887074?text=${encodeURIComponent('Hello The Rajasthani Forge! I want to request custom sizing for a wall mural / clock.')}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => setConciergeOpen(false)}
              >
                📐 Request custom dimensions
              </a>
              <a
                href={`https://wa.me/918955887074?text=${encodeURIComponent('Hello The Rajasthani Forge! Can you share a live workshop video of the Kalpavriksha Brass Mural / Teak Clock?')}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => setConciergeOpen(false)}
              >
                🎥 Video of raw carving & brass work
              </a>
              <a
                href={`https://wa.me/918955887074?text=${encodeURIComponent('Hello The Rajasthani Forge! I am planning wedding favors / corporate festival hampers (50+ units).')}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => setConciergeOpen(false)}
              >
                🎁 Wedding / Corporate bulk quote
              </a>
            </div>
          </div>
        ) : (
          <button className="concierge-trigger-btn" onClick={() => setConciergeOpen(true)} aria-label="Open Artisan Support">
            <MessageCircle size={22} />
            <span>Chat with Artisan</span>
          </button>
        )}
      </div>

      {/* 18. Floating Toast */}
      {toastMessage && <div className="site-toast">{toastMessage}</div>}

      {/* 19. Clean Luxury Footer */}
      <footer className="footer" id="contact">
        <div className="footer-grid">
          <div className="footer-col-main">
            <div className="logo light">
              <span className="logo-badge">RF</span>
              <div>
                <span className="logo-title">THE RAJASTHANI FORGE</span>
                <span className="logo-sub">Artisan Atelier • Rajasthan</span>
              </div>
            </div>
            <p className="footer-about">
              Celebrating authentic Indian craftsmanship. Hand-chiseled live edge woodwork, repoussé brass murals,
              and sculpted heritage treasures crafted by master artisans in Rajasthan.
            </p>
          </div>

          <div className="footer-col">
            <h4>Atelier Services</h4>
            <a href="#collection">Collection</a>
            <a href="#hampers">Bespoke Gift Hampers</a>
            <button className="link-button" onClick={() => setCertModalOpen(true)}>
              <ShieldCheck size={14} /> Certificate Verification
            </button>
            <button className="link-button" onClick={() => setCareModalOpen(true)}>
              <Wrench size={14} /> Artisan Care Guide
            </button>
            <button className="link-button" onClick={() => setTradeModalOpen(true)}>
              <Briefcase size={14} /> Architect & Trade Portal
            </button>
            <button className="link-button" onClick={() => setLookbookOpen(true)}>
              <BookOpen size={14} /> Download Lookbook (PDF)
            </button>
          </div>

          <div className="footer-col">
            <h4>Workshop & Inquiries</h4>
            <p><MapPin size={15} /> Rajasthan, India</p>
            <p><Phone size={15} /> WhatsApp / Phone: +91 89558 87074</p>
            <p><Sparkles size={15} /> 100% Genuine Handmade Quality</p>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} The Rajasthani Forge. All rights reserved.</p>
          <p>Handmade with pride in Rajasthan</p>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
