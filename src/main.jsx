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
import './refinements.css';
import { STORAGE_KEY, readBasket, hamperPrice, basketTotals } from './commerce.js';

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
  },
  {
    id: 'marwar-heritage-horse-toy',
    name: 'Virasat Hand-Carved Wooden Toy Stallion',
    category: 'Heritage Toys',
    price: 1250,
    originalPrice: 1600,
    badge: 'Heritage Folk Toy',
    batchEdition: 'Monsoon Series • #04 of 20',
    provenance: 'Reclaimed Rajasthan Teak & Turned Hardwood Wheels',
    maker: 'The Rajasthani Forge',
    stock: '8 units ready',
    image: assetPath('products/marwar-heritage-horse-toy.jpg'),
    material: 'Solid Reclaimed Wood & Turned Axles',
    dimensions: '8" x 6.5" x 2.5"',
    care: 'Buff lightly with natural beeswax or linseed oil. Keep away from direct water immersion.',
    story: 'Sculpted from a single seasoned hardwood timber blank, capturing the spirited posture of the desert Marwari horse. Equipped with hand-turned functional rolling wheels and smooth, beveled edges safe for gentle handling.',
    description: 'Hand-carved wooden horse toy on smooth rolling wheels, finished with non-toxic natural beeswax luster.'
  },
  {
    id: 'royal-gaja-elephant-toy',
    name: 'Royal Gaja Hand-Carved Wooden Elephant',
    category: 'Heritage Toys',
    price: 1350,
    originalPrice: 1750,
    badge: 'Auspicious Keepsake',
    batchEdition: 'Monsoon Series • #02 of 20',
    provenance: 'Seasoned Hardwood with Upright Auspicious Trunk',
    maker: 'The Rajasthani Forge',
    stock: '6 units ready',
    image: assetPath('products/royal-gaja-elephant-toy.jpg'),
    material: 'Solid Seasoned Teak & Turned Wooden Wheels',
    dimensions: '8.5" x 6" x 2.5"',
    care: 'Keep away from moisture. Periodically buff with natural timber balm.',
    story: 'Carved with the auspicious upright trunk symbolizing good fortune and abundance in traditional Rajasthani lore. Features smooth tactile curves, hand-turned wooden wheels with brass-accented caps, and rich natural woodgrain.',
    description: 'Traditional Rajasthani wooden elephant figurine on rolling wooden wheels with hand-beveled contours.'
  },
  {
    id: 'marwar-camel-cart-toy',
    name: 'Marwar Caravan Wooden Camel & Hauler Cart',
    category: 'Heritage Toys',
    price: 1850,
    originalPrice: 2350,
    badge: 'Atelier Folk Craft',
    batchEdition: 'Desert Series • #03 of 15',
    provenance: 'Seasoned Rajasthan Hardwood & Joinery Cart',
    maker: 'The Rajasthani Forge',
    stock: '5 sets ready',
    image: assetPath('products/marwar-camel-cart-toy.jpg'),
    material: 'Solid Hardwood & Functional Joinery',
    dimensions: '14" x 7" x 3.5"',
    care: 'Dust with dry microfiber cloth. Avoid exposure to water.',
    story: 'An homage to the desert caravans of Thar. Hand-sculpted Marwari camel hitched to an authentic two-wheeled timber hauler cart, each wheel independently turning on wooden axles.',
    description: 'Artisan wooden camel hitched to an authentic rolling cart, carved in seasoned hardwood.'
  },
  {
    id: 'hansa-heritage-swan-toy',
    name: 'Hansa Handcrafted Wooden Water Bird',
    category: 'Heritage Toys',
    price: 1150,
    originalPrice: 1450,
    badge: 'Workshop Edition',
    batchEdition: 'Atelier Series • #01 of 12',
    provenance: 'Raw seasoned timber slab, chiseled by hand in Rajasthan',
    maker: 'The Rajasthani Forge',
    stock: '4 units ready',
    image: assetPath('products/hansa-heritage-swan-toy.jpg'),
    material: 'Seasoned Natural Hardwood',
    dimensions: '7.5" x 6" x 2.2"',
    care: 'Dust with dry cotton. Polish with natural vegetable oil.',
    story: 'Crafted with graceful arched neck curves and wheel pivots, drawing upon century-old village folk-toy forms representing sacred swans and lake avians.',
    description: 'Hand-carved wooden swan push-toy on functional wheels, celebrating rural folk toy traditions.'
  }
];

const categories = ['All', 'Wall Decor', 'Woodcraft', 'Heritage Toys', 'Sculptural Art'];

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
  const [savedBasket] = useState(() => readBasket(initialProducts));
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState(savedBasket.cart);
  const [bundles, setBundles] = useState(savedBasket.bundles);
  const [favorites, setFavorites] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem('forge-favorites')); return Array.isArray(saved) ? saved.filter(id => initialProducts.some(p => p.id === id)) : []; } catch { return []; }
  });
  const [savedOnly, setSavedOnly] = useState(false);
  const [tradeReady, setTradeReady] = useState(false);
  const toastTimer = useRef(null);
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
  const [customEngravingActive, setCustomEngravingActive] = useState(savedBasket.engraving);
  const [customEngravingText, setCustomEngravingText] = useState(savedBasket.inscription);
  const [giftPackagingStyle, setGiftPackagingStyle] = useState(savedBasket.packaging);

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
        setNavOpen(false);
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
    name: '',
    phone: '',
    pincode: '',
    address: '',
    paymentMethod: 'Discuss payment with the atelier'
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, bundles, engraving: customEngravingActive, inscription: customEngravingText, packaging: giftPackagingStyle })); } catch { /* Basket remains usable when storage is unavailable. */ }
  }, [cart, bundles, customEngravingActive, customEngravingText, giftPackagingStyle]);
  useEffect(() => { try { localStorage.setItem('forge-favorites', JSON.stringify(favorites)); } catch { /* Optional persistence. */ } }, [favorites]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const modalOpen = !!(selectedProduct || cartOpen || checkoutOpen || lookbookOpen || certModalOpen || careModalOpen || tradeModalOpen);
  useEffect(() => {
    if (!modalOpen) return;
    const previous = document.activeElement;
    const dialog = document.querySelector('[role="dialog"]');
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const background = [...document.querySelector('.site-wrapper').children].filter(el => !el.contains(dialog) && !el.classList.contains('site-toast'));
    background.forEach(el => { el.inert = true; });
    const focusables = () => [...dialog.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
    (focusables()[0] || dialog).focus();
    const trap = (event) => {
      if (event.key !== 'Tab') return;
      const items = focusables();
      const first = items[0], last = items.at(-1);
      if (!first) { event.preventDefault(); dialog.focus(); }
      else if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', trap);
    return () => {
      document.body.style.overflow = oldOverflow;
      background.forEach(el => { el.inert = false; });
      document.removeEventListener('keydown', trap);
      if (previous?.isConnected) previous.focus();
    };
  }, [modalOpen, selectedProduct, cartOpen, checkoutOpen, lookbookOpen, certModalOpen, careModalOpen, tradeModalOpen]);

  const allProducts = initialProducts;

  // Currency Converter Formatter
  const formatPrice = (inrPrice) => {
    const { rate, symbol, code } = currencies[currentCurrency];
    const converted = Math.round(inrPrice * rate);
    if (code === 'INR') {
      return `₹${converted.toLocaleString('en-IN')}`;
    }
    return `${symbol}${converted.toLocaleString('en-US')}`;
  };

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((item) => {
      const matchCat =
        activeCategory === 'All' ||
        item.category === activeCategory ||
        (activeCategory === 'Woodcraft' && item.category === 'Heritage Toys');
      const q = searchTerm.trim().toLowerCase();
      const matchSearch = !q || [item.name, item.category, item.description, item.material, item.badge]
        .some((val) => String(val || '').toLowerCase().includes(q));
      return matchCat && matchSearch && (!savedOnly || favorites.includes(item.id));
    });

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [allProducts, activeCategory, searchTerm, sortBy, savedOnly, favorites]);

  const productMap = useMemo(() => Object.fromEntries(allProducts.map((p) => [p.id, p])), [allProducts]);
  const productItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartItemCount = productItemCount + bundles.reduce((sum, bundle) => sum + bundle.quantity, 0);

  // Pricing calculations with Engraving & Gift wrap extras
  const engravingExtraINR = productItemCount && customEngravingActive ? 350 : 0;
  const giftWrapExtraINR = productItemCount && giftPackagingStyle === 'silk' ? 250 : 0;
  const productSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => sum + (productMap[id]?.price || 0) * qty, 0);
  const bundleSubtotal = bundles.reduce((sum, bundle) => sum + hamperPrice(bundle.items, bundle.boxStyle, bundle.quantity, productMap), 0);
  const { subtotal: subtotalINR, discount: discountINR, total: finalTotalINR } = basketTotals(productSubtotal, bundleSubtotal, customEngravingActive, giftPackagingStyle === 'silk', couponApplied);

  // Hamper Builder Pricing Calculations
  const hamperBasePriceINR = hamperPrice(hamperItems, hamperBoxStyle, hamperQuantityTier, productMap);

  // Commission Estimator Calculation
  const estimatedCostINR = useMemo(() => {
    const base = calcSize.base;
    const matRate = calcMaterial.rate;
    const frameAdd = calcFraming.add;
    return Math.round((base * matRate) + frameAdd);
  }, [calcSize, calcMaterial, calcFraming]);

  const showToast = (msg) => {
    clearTimeout(toastTimer.current);
    setToastMessage(msg);
    toastTimer.current = setTimeout(() => setToastMessage(''), 3500);
  };

  const updateCartQty = (id, delta) => {
    setCart((current) => {
      const next = { ...current };
      const newQty = (next[id] || 0) + delta;
      if (newQty <= 0) {
        delete next[id];
      } else {
        next[id] = Math.min(99, newQty);
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
    setBundles(current => [...current, { id: `hamper-${crypto.randomUUID()}`, items: [...hamperItems], boxStyle: hamperBoxStyle, quantity: hamperQuantityTier, inscription: hamperBrassInscription }]);
    setCartOpen(true);
    showToast(`Added ${hamperQuantityTier} Hamper collection to basket!`);
  };

  const applyPromo = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'FORGE10' || code === 'SAINI10') {
      setCouponApplied(true);
      showToast('10% artisan promo code applied!');
    } else {
      setCouponApplied(false);
      showToast('Invalid coupon. Try FORGE10');
    }
  };

  // Craft provenance samples Lookup Handler
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
    if (/^[1-9]\d{5}$/.test(cleaned)) {
      const prefix = cleaned.substring(0, 2);
      if (['30', '31', '32', '33', '34', '11', '12', '13'].includes(prefix)) {
        setPincodeResult({
          type: 'express',
          text: '⚡ Estimated 2–3 working days; confirm with atelier',
          cost: 'Serviceability subject to confirmation'
        });
      } else if (['40', '56', '50', '60', '70', '38', '41'].includes(prefix)) {
        setPincodeResult({
          type: 'metro',
          text: '🚚 Estimated 3–4 working days; confirm with atelier',
          cost: 'Serviceability subject to confirmation'
        });
      } else {
        setPincodeResult({
          type: 'standard',
          text: '📦 Estimated 4–7 working days; confirm with atelier',
          cost: 'Serviceability subject to confirmation'
        });
      }
    } else {
      setPincodeResult(null);
    }
  };

  // Preformatted WhatsApp Order Link
  const orderLines = [
    ...Object.entries(cart).map(([id, qty]) => ({ name: productMap[id].name, quantity: qty, total: productMap[id].price * qty })),
    ...bundles.map(bundle => ({ name: `Gift hamper: ${bundle.items.map(id => productMap[id].name).join(', ')}. ${bundle.boxStyle === 'silk' ? 'Raw-silk' : 'Kraft'} box + brass plaque: "${bundle.inscription}"`, quantity: bundle.quantity, total: hamperPrice(bundle.items, bundle.boxStyle, bundle.quantity, productMap) }))
  ];
  const inr = amount => `₹${amount.toLocaleString('en-IN')}`;
  const whatsAppOrderText = encodeURIComponent([
    'Hello The Rajasthani Forge! Please confirm availability and delivery for this order request:',
    ...orderLines.map(line => `• ${line.name} × ${line.quantity}: ${inr(line.total)}`),
    engravingExtraINR ? `Order nameplate: "${customEngravingText}" (+${inr(engravingExtraINR)})` : '',
    giftWrapExtraINR ? `Gift wrapping for individual pieces: ${inr(giftWrapExtraINR)}` : '',
    discountINR ? `Product discount: −${inr(discountINR)}` : '',
    `Estimated total: ${inr(finalTotalINR)} INR`,
    `Name: ${checkoutData.name || 'To be provided'}`,
    `Phone: ${checkoutData.phone || 'To be provided'}`,
    `Address: ${checkoutData.address || 'To be provided'}; PIN: ${checkoutData.pincode || 'To be provided'}`,
    `Payment preference: ${checkoutData.paymentMethod}`,
    'Please confirm final charges and payment details before processing.'
  ].filter(Boolean).join('\n'));
  const tradeMessage = encodeURIComponent(`Hello The Rajasthani Forge! Trade consultation request:\nName: ${tradeFormData.name}\nStudio: ${tradeFormData.firm}\nPhone: ${tradeFormData.phone}\nProject: ${tradeFormData.projectType}\nRequirements: ${tradeFormData.notes || 'Please discuss options.'}`);

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
      <a className="skip-link" href="#collection">Skip to collection</a>
      {/* 1. Top Announcement with Currency Switcher & Certificate Link */}
      <div className="top-strip">
        <div className="top-strip-inner">
          <div className="top-strip-left">
            <span>From the hands of Rajasthan, to a home like yours.</span>
            <button className="top-strip-btn" onClick={() => setCertModalOpen(true)}>
              <ShieldCheck size={13} /> Craft & provenance
            </button>
          </div>
          <div className="currency-selector-wrap">
            <Globe size={13} />
            <select
              title="Approximate display conversion; orders are settled in INR" value={currentCurrency}
              onChange={(e) => {
                setCurrentCurrency(e.target.value);
                showToast(e.target.value === 'INR' ? 'Prices shown in Indian rupees' : 'Approximate conversion only. Final orders are settled in INR.');
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
              <span className="logo-title">The Rajasthani Forge</span>
              <span className="logo-sub">Artisan Atelier • Rajasthan</span>
            </div>
          </a>

          <nav id="primary-navigation" aria-label="Main navigation" className={`nav-menu ${navOpen ? 'open' : ''}`}>
            <a href="#collection" onClick={() => setNavOpen(false)}>Collection</a>
            <a href="#folk-toys" onClick={() => setNavOpen(false)}>Heritage Toys</a>
            <a href="#hampers" onClick={() => setNavOpen(false)}>Gift Hampers</a>
            <a href="#patron-spaces" onClick={() => setNavOpen(false)}>Styling ideas</a>
            <a href="#heritage" onClick={() => setNavOpen(false)}>Heritage</a>
            <a href="#calculator" onClick={() => setNavOpen(false)}>Bespoke</a>
            <button className="nav-lookbook-link" onClick={() => { setLookbookOpen(true); setNavOpen(false); }}>
              <BookOpen size={14} /> Lookbook
            </button>
          </nav>

          <div className="header-actions">
            <button className="btn-icon" aria-label="Search" aria-expanded={searchOpen} onClick={() => setSearchOpen(!searchOpen)}>
              <Search size={18} />
            </button>
            <button className="btn-cart" aria-label={`Cart, ${cartItemCount} items`} onClick={() => setCartOpen(true)}>
              <ShoppingBag size={18} />
              <span>{cartItemCount}</span>
            </button>
            <button className="btn-icon mobile-menu-toggle" aria-label="Menu" aria-expanded={navOpen} aria-controls="primary-navigation" onClick={() => setNavOpen(!navOpen)}>
              {navOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form className="header-search-bar" onSubmit={e => { e.preventDefault(); setSearchOpen(false); document.getElementById("collection").scrollIntoView({ behavior: "smooth" }); }}>
            <Search size={18} />
            <input
              autoFocus
              type="text"
              aria-label="Search all pieces" placeholder="Find something you’ll love…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn-primary btn-sm">Search <ArrowRight size={16} /></button><button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}><X size={16} /></button>
          </form>
        )}
      </header>

      <main id="main-content">
      <section className="hero-section" id="top">
        <div className="hero-grid">
          <div className="hero-text-content">
            <span className="section-eyebrow"><span className="eyebrow-line" /> MADE BY HAND. HELD BY HEART.</span>
            <h1 className="hero-headline">Objects with a story.<br /><em>A home with soul.</em></h1>
            <p className="hero-desc">The warmth of seasoned wood. The quiet glow of brass. Discover thoughtful pieces, patiently crafted by the hands of Rajasthan.</p>
            <div className="hero-btn-row">
              <a href="#collection" className="btn-primary">Explore the collection <ArrowRight size={17} /></a>
              <a className="hero-story-link" href="#heritage">Meet the craft <ArrowRight size={16} /></a>
            </div>
            <div className="hero-maker-note"><span className="maker-monogram">RF</span><div><strong>Small batches. Lasting character.</strong><span>Wood, metal & earth — thoughtfully made.</span></div></div>
          </div>
          <div className="hero-artwork">
            <span className="hero-edition">THE ATELIER EDIT · 2026</span>
            <button className="hero-image-wrap" aria-label="Discover the Kalpavriksha brass mural" onClick={() => openProductModal(allProducts[0])}>
              <img src={assetPath('products/kalpavriksha-mural.jpg')} alt="Hand-embossed golden brass Tree of Life mural" fetchPriority="high" />
              <span className="hero-image-label">THE TREE OF LIFE <ArrowRight size={20} /></span>
            </button>
            <div className="hero-art-caption"><span>01 / The Kalpavriksha mural</span><span>Brass, brought to life.</span></div>
            <span className="hero-art-stamp">Made slowly.<br /><em>Kept forever.</em></span>
          </div>
        </div>
      </section>

      {/* 4. Trust Highlights Bar */}
      <section className="trust-bar">
        <button className="trust-item" onClick={() => setCertModalOpen(true)} >
          <ShieldCheck size={24} />
          <div>
            <strong>Craft with character</strong>
            <span>Explore our sample craft records</span>
          </div>
        </button>
        <div className="trust-item">
          <Truck size={24} />
          <div>
            <strong>Safe Insured Shipping</strong>
            <span>Secure wood-cushioned delivery</span>
          </div>
        </div>
        <button className="trust-item" onClick={() => setTradeModalOpen(true)} >
          <Briefcase size={24} />
          <div>
            <strong>Trade & Architect Portal</strong>
            <span>B2B & custom hospitality projects</span>
          </div>
        </button>
        <button className="trust-item" onClick={() => setCareModalOpen(true)} >
          <Wrench size={24} />
          <div>
            <strong>Artisan Care Guide</strong>
            <span>Maintenance & natural polish tips</span>
          </div>
        </button>
      </section>

      {/* 5. Product Catalog with Small-Batch Atelier Edition Badges */}
      <section className="catalog-section" id="collection" tabIndex={-1}>
        <div className="section-head">
          <span className="section-eyebrow">THE COLLECTION / 01</span>
          <h2>Made to be treasured.</h2>
          <p>Distinctive pieces for everyday spaces. Find the one that feels like you.</p>
        </div>

        <div className="collection-search-row">
          <label className="collection-search"><Search size={18} /><input aria-label="Search collection" type="search" placeholder="Search brass, wood, sculptures…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></label>
          <button className={`saved-filter ${savedOnly ? 'active' : ''}`} aria-pressed={savedOnly} onClick={() => setSavedOnly(!savedOnly)}><Heart size={17} /> Saved pieces ({favorites.length})</button>
        </div>
        <div className="catalog-controls">
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={activeCategory === cat ? 'active' : ''} aria-pressed={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sort-control">
            <SlidersHorizontal size={15} />
            <select aria-label="Sort collection" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="collection-meta"><span role="status">{filteredProducts.length} considered pieces{searchTerm ? ` matching “${searchTerm}”` : ''}</span>{(searchTerm || activeCategory !== 'All' || savedOnly) && <button onClick={() => { setSearchTerm(''); setActiveCategory('All'); setSavedOnly(false); }}>Clear filters <X size={12} /></button>}<span>Crafted in Rajasthan, India</span></div>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <article className="card" key={product.id}>
              <button
                aria-label={`View ${product.name}`}
                className="card-image-box"
                onClick={() => openProductModal(product, 'details')}
              >
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="card-badge">{product.badge}</span>
                <span className="card-overlay"><Eye size={16} /> Discover this piece</span>
              </button>
              <button className={`favorite-button ${favorites.includes(product.id) ? 'is-saved' : ''}`} aria-label={`${favorites.includes(product.id) ? 'Unsave' : 'Save'} ${product.name}`} aria-pressed={favorites.includes(product.id)} onClick={() => setFavorites(current => current.includes(product.id) ? current.filter(id => id !== product.id) : [...current, product.id])}><Heart size={17} /></button>

              <div className="card-info">
                <span className="card-category">{product.category}</span>
                <h3><button onClick={() => openProductModal(product, 'details')}>{product.name}</button></h3>
                <p className="card-material">{product.material}</p>

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
                    <Plus size={16} /> Add to bag
                  </button>
                  <button className="btn-card-view" onClick={() => openProductModal(product, 'texture-zoom')}>
                    <ZoomIn size={15} /> Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-catalog">
            <Package size={40} />
            <p>No products found matching your search. Try resetting filters.</p>
            <button className="btn-secondary" onClick={() => { setActiveCategory('All'); setSearchTerm(''); setSavedOnly(false); }}>
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 5B. Virasat Heirloom Wooden Folk Toys Showcase */}
      <section className="folk-toys-section" id="folk-toys">
        <div className="folk-toys-container">
          <div className="section-head">
            <span className="section-eyebrow"><Sparkles size={14} /> HEIRLOOM WOODCRAFT • VIRASAT COLLECTION</span>
            <h2>Hand-Carved Folk Toys on Wheels.</h2>
            <p>
              Born from reclaimed timber blocks in our Rajasthan workshop. Hand-chiseled animal silhouettes with rolling wheels and organic beeswax sheen, crafted as timeless keepsakes for curious hands and modern decor shelves.
            </p>
          </div>

          <div className="folk-toys-showcase-grid">
            <div className="folk-toy-hero-card">
              <div className="folk-toy-hero-image">
                <img
                  loading="lazy"
                  src={assetPath('products/marwar-heritage-horse-toy.jpg')}
                  alt="Virasat Hand-Carved Wooden Toy Stallion"
                />
                <span className="folk-toy-badge">Signature Atelier Piece</span>
              </div>
              <div className="folk-toy-hero-body">
                <span className="folk-toy-tag">Desert Marwari Stallion</span>
                <h3>Virasat Hand-Carved Wooden Toy Stallion</h3>
                <p>
                  Sculpted from seasoned timber with traditional chisels, contoured with arched crest curves and mounted on smooth wooden wheels with solid brass axle caps. Sealed with warm organic oils to honor natural knots and timber grains.
                </p>
                <div className="folk-toy-specs-pills">
                  <span><ShieldCheck size={13} /> 100% Non-Toxic Finish</span>
                  <span><Clock size={13} /> Functional Rolling Wheels</span>
                  <span><Award size={13} /> Solid Reclaimed Teak</span>
                </div>
                <div className="folk-toy-action-row">
                  <div className="folk-toy-price">
                    <strong>{formatPrice(1250)}</strong>
                    <span className="old-price">{formatPrice(1600)}</span>
                  </div>
                  <div className="folk-toy-btn-group">
                    <button
                      className="btn-primary"
                      onClick={() => {
                        const horse = productMap['marwar-heritage-horse-toy'];
                        if (horse) addToCart(horse);
                      }}
                    >
                      <ShoppingBag size={16} /> Add to Basket
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => {
                        const horse = productMap['marwar-heritage-horse-toy'];
                        if (horse) openProductModal(horse, 'details');
                      }}
                    >
                      <Eye size={16} /> Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="folk-toys-cards-list">
              {[
                {
                  id: 'royal-gaja-elephant-toy',
                  name: 'Royal Gaja Wooden Elephant',
                  subtitle: 'Auspicious Upright Trunk',
                  price: 1350,
                  oldPrice: 1750,
                  image: assetPath('products/royal-gaja-elephant-toy.jpg'),
                  desc: 'Symbolizing strength and abundance, hand-carved with smooth rolling wheels and soft tactile contours.'
                },
                {
                  id: 'marwar-camel-cart-toy',
                  name: 'Marwar Caravan Camel & Cart',
                  subtitle: 'Traditional 2-Piece Joinery Set',
                  price: 1850,
                  oldPrice: 2350,
                  image: assetPath('products/marwar-camel-cart-toy.jpg'),
                  desc: 'Hand-sculpted desert camel hitched to an authentic rolling wooden hauler cart with turning axles.'
                },
                {
                  id: 'hansa-heritage-swan-toy',
                  name: 'Hansa Wooden Water Bird',
                  subtitle: 'Graceful Arched Silhouette',
                  price: 1150,
                  oldPrice: 1450,
                  image: assetPath('products/hansa-heritage-swan-toy.jpg'),
                  desc: 'Arched neck profile on rolling wheels, celebrating indigenous folk bird motifs of Mewar.'
                }
              ].map((toy) => (
                <div className="folk-toy-mini-card" key={toy.id}>
                  <div className="folk-toy-mini-thumb">
                    <img loading="lazy" src={toy.image} alt={toy.name} />
                  </div>
                  <div className="folk-toy-mini-info">
                    <span className="mini-toy-tag">{toy.subtitle}</span>
                    <h4>{toy.name}</h4>
                    <p>{toy.desc}</p>
                    <div className="mini-toy-foot">
                      <div className="mini-toy-price">
                        <strong>{formatPrice(toy.price)}</strong>
                        <span className="old-price">{formatPrice(toy.oldPrice)}</span>
                      </div>
                      <div className="mini-toy-buttons">
                        <button
                          className="btn-icon-subtle"
                          title="View Details"
                          aria-label={`View ${toy.name}`}
                          onClick={() => {
                            const p = productMap[toy.id];
                            if (p) openProductModal(p, 'details');
                          }}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          className="btn-mini-add"
                          onClick={() => {
                            const p = productMap[toy.id];
                            if (p) addToCart(p);
                          }}
                        >
                          <ShoppingBag size={14} /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="folk-toys-provenance-banner">
            <div className="provenance-banner-item">
              <Award size={20} />
              <div>
                <strong>Heritage Woodcraft Lineage</strong>
                <span>Direct from Rajasthan artisans using generational chiseling methods</span>
              </div>
            </div>
            <div className="provenance-banner-item">
              <ShieldCheck size={20} />
              <div>
                <strong>Safe & Organic</strong>
                <span>Pure beeswax and cold-pressed plant oil finish, free of synthetic chemical paints</span>
              </div>
            </div>
            <div className="provenance-banner-item">
              <Gift size={20} />
              <div>
                <strong>Heirloom Gifting Ready</strong>
                <span>Available individually or packaged inside our brass-inscribed gift hampers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bespoke Gift Hamper & Wedding Favor Builder */}
      <section className="hamper-builder-section" id="hampers">
        <div className="hamper-container">
          <div className="section-head">
            <span className="section-eyebrow"><Gift size={15} /> Bespoke Gifting Atelier</span>
            <h2>A little thought. A lasting gift.</h2>
            <p>Perfect for luxury weddings, corporate festival gifting, and housewarming celebrations. Hand-packaged with custom engraved brass plaque and wax seal.</p>
          </div>

          <div className="hamper-grid">
            <div className="hamper-selection-col">
              <label className="hamper-step-label">1. Choose 1 to 3 Artisan Pieces to Bundle:</label>
              <div className="hamper-product-picker">
                {allProducts.map((p) => {
                  const isSelected = hamperItems.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      aria-pressed={isSelected}
                      className={`hamper-pick-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleHamperItem(p.id)}
                    >
                      <img loading="lazy" src={p.image} alt={p.name} />
                      <div className="hamper-pick-meta">
                        <strong>{p.name}</strong>
                        <span>{formatPrice(p.price)}</span>
                      </div>
                      <div className="hamper-check-indicator">
                        {isSelected ? <CheckCircle size={16} /> : <Plus size={16} />}
                      </div>
                    </button>
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
                      50 Hampers (20% Off)
                    </button>
                  </div>
                </div>

                <div className="hamper-option-group">
                  <label className="hamper-step-label">4. Brass Plaque Inscription (+₹350 per hamper):</label>
                  <input
                    type="text"
                    maxLength={45}
                    aria-label="Hamper inscription" value={hamperBrassInscription}
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

              <div className="hamper-cost-note">Per hamper: pieces + {formatPrice(hamperBoxStyle === 'silk' ? 450 : 200)} packaging + {formatPrice(350)} engraved plaque. Volume discount applies to the whole bundle.</div>
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
          <span className="section-eyebrow"><Sparkles size={14} /> A PLACE FOR EVERY PIECE</span>
          <h2>Find your everyday extraordinary.</h2>
          <p>Styling ideas from the atelier. A few ways to make these pieces part of your own story.</p>
        </div>

        <div className="patron-spaces-grid">
          {patronSpaces.map((space) => {
            const product = productMap[space.productId];
            return (
              <div className="patron-space-card" key={space.id}>
                <div className="patron-space-image">
                  <img loading="lazy" src={space.image} alt={space.tag} />
                  <span className="patron-location-tag"><MapPin size={12} /> {['Living spaces', 'Entryways', 'Quiet corners', 'Dining rooms'][patronSpaces.indexOf(space)]}</span>
                </div>
                <div className="patron-space-content">
                  <h4>{['A warmer living room', 'An entrance with character', 'A moment of quiet', 'Gathered around the table'][patronSpaces.indexOf(space)]}</h4>
                  <p className="patron-quote">{['Pair antique brass with natural linen and warm, neutral walls.', 'Let organic wood grain set the tone in a welcoming hallway.', 'Create a peaceful corner with soft light and sculptural details.', 'Bring balance above a sideboard with a trio of botanical panels.'][patronSpaces.indexOf(space)]}</p>
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
            <img loading="lazy" src={assetPath('products/live-edge-clock.jpg')} alt="Live Edge Teak Clock Craftsmanship" />
          </div>
        </div>
      </section>

      {/* 9. Live Custom Commission Cost Estimator */}
      <section className="calculator-section" id="calculator">
        <div className="calculator-container">
          <div className="section-head">
            <span className="section-eyebrow"><Calculator size={15} /> Instant Commission Estimator</span>
            <h2>Imagined by you. Made by us.</h2>
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
                  aria-label="Commission notes" value={customInquiryNote}
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

      </main>

      {/* 10. Slide-Out Cart Drawer */}
      {cartOpen && (
        <div className="drawer-overlay" onClick={() => setCartOpen(false)}>
          <aside className="drawer-panel" role="dialog" aria-modal="true" aria-label="Shopping bag" tabIndex={-1} onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <div>
                <span className="section-eyebrow">shopping basket</span>
                <h3>Your Selections ({cartItemCount})</h3>
              </div>
              <button className="btn-icon" aria-label="Close bag" onClick={() => setCartOpen(false)}><X size={18} /></button>
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
                        <button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateCartQty(id, -1)}><Minus size={13} /></button>
                        <span>{qty}</span>
                        <button disabled={qty >= 99} aria-label={`Increase ${item.name} quantity`} onClick={() => updateCartQty(id, 1)}><Plus size={13} /></button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {bundles.map(bundle => <div className="cart-bundle" key={bundle.id}><div className="bundle-heading"><Gift size={20} /><strong>{bundle.quantity} × Bespoke gift hamper</strong><button className="btn-icon" aria-label="Remove gift hamper" onClick={() => setBundles(current => current.filter(item => item.id !== bundle.id))}><X size={15} /></button></div><p>{bundle.items.map(id => productMap[id].name).join(' + ')}</p><small>{bundle.boxStyle === 'silk' ? 'Raw-silk box' : 'Eco-kraft box'} · Plaque: {bundle.inscription || 'No inscription'}</small><strong>{formatPrice(hamperPrice(bundle.items, bundle.boxStyle, bundle.quantity, productMap))}</strong><small>Packaging, plaque & volume discount included.</small></div>)}
              {/* Personalized Engraving in Cart */}
              {productItemCount > 0 && (
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
                        aria-label="Engraving text" value={customEngravingText}
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
                  <p>Your next treasured piece is waiting.</p><button className="btn-primary" onClick={() => { setCartOpen(false); document.getElementById("collection").scrollIntoView(); }}>Explore the collection <ArrowRight size={16} /></button>
                </div>
              )}
            </div>

            {cartItemCount > 0 && (
              <div className="drawer-foot">
                <div className="promo-box">
                  <input
                    type="text"
                    aria-label="Discount code" placeholder="Discount code: FORGE10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button onClick={applyPromo}>Apply</button>
                </div>

                <small className="form-hint">FORGE10 saves 10% on individual pieces. Hampers already include their volume discount.</small>
                {couponApplied && (
                  <div className="promo-applied-tag">
                    <CheckCircle size={14} /> 10% product discount (-{formatPrice(discountINR)}) <button className="text-button" onClick={() => { setCouponApplied(false); setCouponCode(''); }}>Remove</button>
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
                  <strong>Estimated total:</strong>
                  <strong>{formatPrice(finalTotalINR)}</strong>
                </div>

                <a className="btn-whatsapp" href={`https://wa.me/918955887074?text=${whatsAppOrderText}`} target="_blank" rel="noreferrer">
                  <MessageCircle size={18} /> Quick Order on WhatsApp
                </a>

                <button
                  className="btn-primary full-width"
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutSuccess(false);
                    setCheckoutOpen(true);
                  }}
                >
                  Review delivery details <ArrowRight size={16} />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* 11. Clean Luxury Product Details & High-Def Texture Zoom Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" role="dialog" aria-modal="true" aria-label="Product details" tabIndex={-1} onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" aria-label="Close dialog" onClick={() => setSelectedProduct(null)}><X size={18} /></button>

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
                <ZoomIn size={15} /> Explore the details
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
                    <ZoomIn size={13} /> Inspect the craftsmanship
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
                      aria-label="Engraving text" value={customEngravingText}
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
                      aria-label="Delivery PIN estimate" inputMode="numeric" value={pincodeInput}
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
          <div className="cert-modal-dialog" role="dialog" aria-modal="true" aria-label="Sample craft records" tabIndex={-1} onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" aria-label="Close dialog" onClick={() => setCertModalOpen(false)}><X size={18} /></button>

            <div className="section-head">
              <span className="section-eyebrow"><ShieldCheck size={16} /> SAMPLE CRAFT RECORDS</span>
              <h2>The story behind a piece.</h2>
              <p>Explore sample provenance records. For authentication of a purchased piece, contact the atelier with your certificate and photographs.</p>
            </div>

            <div className="cert-search-bar">
              <input
                type="text"
                aria-label="Sample certificate serial" placeholder="e.g. TRF-RAJ-2026-8819"
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
                  <span>SAMPLE RECORD</span>
                </div>

                <div className="cert-body-details">
                  <span className="cert-status-badge"><CheckCircle size={13} /> Sample catalogue record</span>
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
                    <Printer size={14} /> Print Sample Record
                  </button>
                </div>
              </div>
            ) : (
              <div className="cert-not-found">
                <p>No sample record found matching "{certSearchQuery}". Please check your certificate code.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 13. Interactive Artisan Care Advisor Modal */}
      {careModalOpen && (
        <div className="modal-overlay" onClick={() => setCareModalOpen(false)}>
          <div className="care-modal-dialog" role="dialog" aria-modal="true" aria-label="Artisan care guide" tabIndex={-1} onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" aria-label="Close dialog" onClick={() => setCareModalOpen(false)}><X size={18} /></button>

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
          <div className="trade-modal-dialog" role="dialog" aria-modal="true" aria-label="Trade consultation" tabIndex={-1} onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" aria-label="Close dialog" onClick={() => setTradeModalOpen(false)}><X size={18} /></button>

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
              className="trade-inquiry-form" onChange={() => setTradeReady(false)}
              onSubmit={(e) => {
                e.preventDefault();
                setTradeReady(true);
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

              {tradeReady && <div className="trade-ready" role="status"><strong>Your inquiry is ready.</strong><p>Send it to the atelier on WhatsApp to start your consultation. Nothing has been submitted yet.</p><a className="btn-whatsapp" href={`https://wa.me/918955887074?text=${tradeMessage}`} target="_blank" rel="noreferrer">Continue to WhatsApp <ArrowRight size={16} /></a></div>}
              <div className="trade-action-row">
                <button className="btn-primary" type="submit">
                  <Send size={16} /> Prepare consultation request
                </button>
                <a
                  className="btn-whatsapp"
                  href={`https://wa.me/918955887074?text=${tradeMessage}`}
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
          <div className="lookbook-modal-dialog" role="dialog" aria-modal="true" aria-label="Collection lookbook" tabIndex={-1} onClick={(e) => e.stopPropagation()}>
            <div className="lookbook-toolbar no-print">
              <div>
                <span className="section-eyebrow">Atelier Publication</span>
                <h3>2026 Artisan Collection Lookbook</h3>
              </div>
              <div className="lookbook-actions">
                <button className="btn-primary btn-sm" onClick={() => window.print()}>
                  <Printer size={15} /> Print / Save as PDF
                </button>
                <button className="btn-icon" aria-label="Close lookbook" onClick={() => setLookbookOpen(false)}><X size={18} /></button>
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
                      <img loading="lazy" src={prod.image} alt={prod.name} />
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
          <div className="checkout-dialog" role="dialog" aria-modal="true" aria-label="Order review" tabIndex={-1} onClick={(e) => e.stopPropagation()}>
            <button className="btn-icon modal-close" aria-label="Close dialog" onClick={() => setCheckoutOpen(false)}><X size={18} /></button>

            {checkoutSuccess ? (
              <div className="order-confirmed-view">
                <CheckCircle size={42} className="confirm-icon" />
                <span className="section-eyebrow">ONE LAST LOOK</span>
                <h2>Your order request is ready.</h2>
                <p>Send your selection to the atelier on WhatsApp. We’ll confirm availability, delivery charges and payment details before your order is placed.</p>
                <div className="order-review-lines">{orderLines.map((line, i) => <div key={i}><span>{line.name} × {line.quantity}</span><strong>{inr(line.total)}</strong></div>)}
                {engravingExtraINR > 0 && <div><span>Nameplate: {customEngravingText || 'Inscription to be confirmed'}</span><strong>{inr(engravingExtraINR)}</strong></div>}
                {giftWrapExtraINR > 0 && <div><span>Gift wrap</span><strong>{inr(giftWrapExtraINR)}</strong></div>}
                {discountINR > 0 && <div><span>Product discount</span><strong>−{inr(discountINR)}</strong></div>}
                <div className="review-total"><strong>Estimated total (INR)</strong><strong>{inr(finalTotalINR)}</strong></div></div>
                <div className="delivery-review"><strong>{checkoutData.name}</strong><p>{checkoutData.address} · {checkoutData.pincode}</p><p>{checkoutData.phone}</p><p>{checkoutData.paymentMethod}</p></div>
                <div className="checkout-btn-group no-print">
                  <a className="btn-whatsapp" href={`https://wa.me/918955887074?text=${whatsAppOrderText}`} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Send request on WhatsApp</a>
                  <button className="btn-secondary" onClick={() => setCheckoutSuccess(false)}>Edit details</button>
                  <button className="text-button" onClick={() => window.print()}><Printer size={16} /> Print order request</button>
                </div>
                <small className="form-hint">This is an order request, not a payment receipt or confirmation.</small>
              </div>
            ) : (
              <form className="checkout-form-view" onSubmit={(e) => { e.preventDefault(); setCheckoutSuccess(true); }}>
                <span className="section-eyebrow">DELIVERY DETAILS</span><h2>Make it yours.</h2><p className="form-hint">Prepare your order for the atelier. Payment and availability are confirmed personally on WhatsApp.</p>
                <div className="order-brief">
                  <span>Items: {cartItemCount}</span>
                  <strong>Estimated total: {formatPrice(finalTotalINR)}</strong>
                </div>

                <div className="form-two-col">
                  <label>
                    Full Name
                    <input
                      required
                      autoComplete="name" minLength={2} maxLength={100} value={checkoutData.name}
                      onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                    />
                  </label>
                  <label>
                    WhatsApp / Phone
                    <input
                      required
                      type="tel" autoComplete="tel" pattern="[+0-9() -]{10,20}" title="Enter a valid phone number (10–20 characters)." value={checkoutData.phone}
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
                      inputMode="numeric" autoComplete="postal-code" pattern="[1-9][0-9]{5}" title="Enter a six-digit Indian PIN code." value={checkoutData.pincode}
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
                      <option>Discuss payment with the atelier</option><option>UPI (details after confirmation)</option>
                      <option>Cash on Delivery (subject to availability)</option>
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
                    autoComplete="street-address" minLength={10} maxLength={500} value={checkoutData.address}
                    onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                  />
                </label>

                {/* Packaging Upgrade Option */}
                {productItemCount > 0 && <div className="packaging-upgrade-box">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={giftPackagingStyle === 'silk'}
                      onChange={(e) => setGiftPackagingStyle(e.target.checked ? 'silk' : 'standard')}
                    />
                    <span><Gift size={15} /> Upgrade to <strong>Royal Raw-Silk Ribbon & Wax-Sealed Gift Box</strong> (+{formatPrice(250)})</span>
                  </label>
                </div>}

                <button className="btn-primary full-width" type="submit">
                  <ArrowRight size={17} /> Review order request ({inr(finalTotalINR)})
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
                <span><CheckCircle size={12} /> Speak directly with the atelier</span>
              </div>
              <button aria-label="Close artisan support" onClick={() => setConciergeOpen(false)}><X size={15} /></button>
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
      <div role="status" aria-live="polite" aria-atomic="true" className={toastMessage ? "site-toast" : "sr-only"}>{toastMessage}</div>

      {/* 19. Clean Luxury Footer */}
      <footer className="footer" id="contact">
        <div className="footer-grid">
          <div className="footer-col-main">
            <div className="logo light">
              <span className="logo-badge">RF</span>
              <div>
                <span className="logo-title">The Rajasthani Forge</span>
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
              <ShieldCheck size={14} /> Craft provenance samples
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
            <a href="tel:+918955887074"><Phone size={15} /> +91 89558 87074</a><a href="#calculator">Create a bespoke piece <ArrowRight size={14} /></a>
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
