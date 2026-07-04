import React, { useState, useMemo } from "react";
import {
  ShoppingCart, Heart, Search, User, Star, X, Menu, ChevronLeft,
  Check, Package, Truck, MapPin, Mail, Phone, Plus, Minus, Trash2,
  Gift, Home as HomeIcon, Baby, Sparkles, Watch, Flower2, Coffee,
  BookOpen, PawPrint, Palette as PaletteIcon, ChevronRight, ArrowRight
} from "lucide-react";

/* ---------------------------------------------------------
   DESIGN TOKENS
   bg ivory #FBF3ED · berry #7A2048 · berry-dark #591733
   gold #C9962E · sage #6E8F72 · ink #2B1F24
--------------------------------------------------------- */

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600;700&display=swap');";

const CATEGORIES = [
  { id: "birthday", name: "Birthday", icon: Gift, tint: "#7A2048" },
  { id: "anniversary", name: "Anniversary", icon: Heart, tint: "#C9962E" },
  { id: "home", name: "Home Decor", icon: HomeIcon, tint: "#6E8F72" },
  { id: "personalized", name: "Personalized", icon: PaletteIcon, tint: "#7A2048" },
  { id: "kids", name: "Kids", icon: Baby, tint: "#C9962E" },
  { id: "festive", name: "Festive", icon: Sparkles, tint: "#6E8F72" },
];

const PRODUCTS = [
  { id: 1, name: "Engraved Wooden Photo Frame", category: "personalized", price: 899, mrp: 1199, rating: 4.6, reviews: [
      { name: "Priya S.", rating: 5, text: "Beautiful finish, engraving was crisp. Loved it!" },
      { name: "Arun K.", rating: 4, text: "Good quality wood, delivery took a bit long." },
    ], desc: "A warm walnut-finish frame with your chosen name or date engraved along the base. Fits any 5x7 photo." , grad:["#7A2048","#9c3a63"]},
  { id: 2, name: "Rose Gold Charm Bracelet", category: "anniversary", price: 1499, mrp: 1899, rating: 4.8, reviews: [
      { name: "Meena R.", rating: 5, text: "Elegant and the box presentation is lovely." },
    ], desc: "Delicate rose gold-plated bracelet with three charms symbolizing love, luck and journey.", grad:["#C9962E","#e0b866"]},
  { id: 3, name: "Ceramic Sunrise Planter Set", category: "home", price: 649, mrp: 799, rating: 4.4, reviews: [
      { name: "Divya M.", rating: 4, text: "Cute set, perfect for succulents on my desk." },
    ], desc: "Set of two hand-glazed ceramic planters in warm sunrise tones. Drainage hole included.", grad:["#6E8F72","#93b598"]},
  { id: 4, name: "Personalized Name Necklace", category: "personalized", price: 1099, mrp: 1399, rating: 4.7, reviews: [
      { name: "Kavya T.", rating: 5, text: "Exactly as shown, great gift for my sister." },
    ], desc: "Sterling silver-plated necklace with any name or word custom cut, up to 10 characters.", grad:["#7A2048","#a84a71"]},
  { id: 5, name: "Wooden Building Blocks Set", category: "kids", price: 799, mrp: 999, rating: 4.9, reviews: [
      { name: "Ramesh V.", rating: 5, text: "My 4 year old hasn't put it down since." },
    ], desc: "60-piece natural wood block set, non-toxic paint, encourages open-ended play.", grad:["#C9962E","#d9ac4f"]},
  { id: 6, name: "Diwali Brass Diya Set of 5", category: "festive", price: 549, mrp: 699, rating: 4.5, reviews: [
      { name: "Lakshmi N.", rating: 4, text: "Good weight and finish, looked lovely lit up." },
    ], desc: "Hand-cast brass diyas with etched floral pattern, set of five in a gift box.", grad:["#6E8F72","#7fa384"]},
  { id: 7, name: "Surprise Birthday Hamper", category: "birthday", price: 1299, mrp: 1699, rating: 4.6, reviews: [
      { name: "Sanjay P.", rating: 5, text: "Ordered for my wife, she loved the little notes inside." },
    ], desc: "Curated box of chocolates, a scented candle, a handwritten card slot and confetti.", grad:["#7A2048","#8f2e57"]},
  { id: 8, name: "Couple Coffee Mug Duo", category: "anniversary", price: 699, mrp: 899, rating: 4.3, reviews: [
      { name: "Nithya A.", rating: 4, text: "Nice print quality, mugs feel sturdy." },
    ], desc: "Matching ceramic mug pair with a custom couple illustration printed on both sides.", grad:["#C9962E","#cf9f45"]},
  { id: 9, name: "Macrame Wall Hanging", category: "home", price: 949, mrp: 1199, rating: 4.7, reviews: [
      { name: "Swathi B.", rating: 5, text: "Handmade quality is obvious, looks great in my hall." },
    ], desc: "Hand-knotted cotton macrame piece, 60cm drop, natural wood dowel included.", grad:["#6E8F72","#5c7a60"]},
  { id: 10, name: "Storytime Puzzle Board", category: "kids", price: 499, mrp: 649, rating: 4.5, reviews: [
      { name: "Vikram J.", rating: 4, text: "Good thickness, survives toddler handling well." },
    ], desc: "Chunky wooden puzzle board with an illustrated jungle story, 12 pieces.", grad:["#C9962E","#b98a2a"]},
  { id: 11, name: "Rakhi Gift Combo Box", category: "festive", price: 799, mrp: 999, rating: 4.6, reviews: [
      { name: "Anjali D.", rating: 5, text: "Sent this to my brother, he said it felt premium." },
    ], desc: "Silk thread rakhi, roasted dry fruits, and a small sweets box in festive packaging.", grad:["#7A2048","#6e1f3f"]},
  { id: 12, name: "Custom Star Map Print", category: "personalized", price: 1199, mrp: 1499, rating: 4.8, reviews: [
      { name: "Harini S.", rating: 5, text: "Got the sky from our wedding date, absolutely beautiful." },
    ], desc: "A4 matte print of the night sky from any date, time and location you choose.", grad:["#6E8F72","#4f6b53"]},
];

const CATEGORY_ICON = Object.fromEntries(CATEGORIES.map(c => [c.id, c.icon]));
const CATEGORY_TINT = Object.fromEntries(CATEGORIES.map(c => [c.id, c.tint]));
const CATEGORY_NAME = Object.fromEntries(CATEGORIES.map(c => [c.id, c.name]));

const TESTIMONIALS = [
  { name: "Priya S.", text: "AnuVi Gifts saved my sister's birthday. Fast delivery and the packaging felt so personal.", rating: 5 },
  { name: "Ramesh V.", text: "Ordered the puzzle board for my nephew — quality was way above what I expected for the price.", rating: 5 },
  { name: "Meena R.", text: "The bracelet arrived exactly as pictured, in a gorgeous little box. Will order again.", rating: 4 },
];

function currency(n) {
  return "₹" + n.toLocaleString("en-IN");
}

/* ---------------------------------------------------------
   SMALL UI PIECES
--------------------------------------------------------- */

function Stars({ value, size = 14 }) {
  const full = Math.round(value);
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= full ? "#C9962E" : "none"}
          stroke={i <= full ? "#C9962E" : "#C9962E88"}
        />
      ))}
    </span>
  );
}

function SectionLabel({ index, children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span
        className="text-xs tracking-widest font-semibold"
        style={{ color: "#C9962E", fontFamily: "'Work Sans',sans-serif" }}
      >
        {index}
      </span>
      <span className="h-px flex-1 max-w-[40px]" style={{ background: "#C9962E88" }} />
      <span className="text-xs tracking-widest font-semibold uppercase" style={{ color: "#7A2048", fontFamily: "'Work Sans',sans-serif" }}>
        {children}
      </span>
    </div>
  );
}

function GiftTagCard({ product, onOpen, wishlist, onToggleWish, onAddCart }) {
  const Icon = CATEGORY_ICON[product.category] || Gift;
  const tint = CATEGORY_TINT[product.category];
  const isWished = wishlist.includes(product.id);
  return (
    <div
      className="relative rounded-2xl overflow-visible group cursor-pointer"
      style={{ background: "#fff", border: "1px solid #7A20481f" }}
      onClick={() => onOpen(product.id)}
    >
      {/* die-cut hole + dashed thread */}
      <div className="absolute -top-3 left-6 w-5 h-5 rounded-full z-10" style={{ background: "#FBF3ED", border: "2px solid " + tint }} />
      <svg className="absolute -top-3 left-8 z-0" width="70" height="24" viewBox="0 0 70 24" fill="none">
        <path d="M2 20 Q 30 -6 68 18" stroke={tint} strokeWidth="1.4" strokeDasharray="3 4" fill="none" opacity="0.6" />
      </svg>

      <div
        className="h-44 rounded-t-2xl flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${product.grad[0]}, ${product.grad[1]})` }}
      >
        <Icon size={54} color="#FBF3ED" strokeWidth={1.4} opacity={0.9} />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWish(product.id); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition"
          style={{ background: "#FBF3EDcc" }}
          aria-label="Toggle wishlist"
        >
          <Heart size={16} fill={isWished ? "#7A2048" : "none"} color="#7A2048" />
        </button>
      </div>

      <div className="p-4">
        <span
          className="inline-block text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full mb-2"
          style={{ background: tint + "1a", color: tint }}
        >
          {CATEGORY_NAME[product.category]}
        </span>
        <h3 className="font-semibold text-[15px] leading-snug mb-1" style={{ color: "#2B1F24", fontFamily: "'Fraunces',serif" }}>
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-2">
          <Stars value={product.rating} />
          <span className="text-xs" style={{ color: "#2B1F2499" }}>({product.reviews.length})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold" style={{ color: "#7A2048", fontFamily: "'Fraunces',serif" }}>{currency(product.price)}</span>
            <span className="text-xs line-through" style={{ color: "#2B1F2466" }}>{currency(product.mrp)}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onAddCart(product.id); }}
            className="w-9 h-9 rounded-full flex items-center justify-center transition hover:scale-105"
            style={{ background: "#7A2048" }}
            aria-label="Add to cart"
          >
            <ShoppingCart size={15} color="#FBF3ED" />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, subtitle, ctaLabel, onCta }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "#7A20481a" }}>
        <Icon size={26} color="#7A2048" />
      </div>
      <h3 className="font-semibold text-lg mb-1" style={{ color: "#2B1F24", fontFamily: "'Fraunces',serif" }}>{title}</h3>
      <p className="text-sm mb-5" style={{ color: "#2B1F2499" }}>{subtitle}</p>
      {ctaLabel && (
        <button onClick={onCta} className="px-5 py-2.5 rounded-full text-sm font-semibold" style={{ background: "#7A2048", color: "#FBF3ED" }}>
          {ctaLabel}
        </button>
      )}
    </div>
  );
}

function GiftButton({ children, onClick, variant = "primary", full, disabled, type = "button" }) {
  const styles = {
    primary: { background: "#7A2048", color: "#FBF3ED", border: "1px solid #7A2048" },
    ghost: { background: "transparent", color: "#7A2048", border: "1px solid #7A204866" },
    gold: { background: "#C9962E", color: "#2B1F24", border: "1px solid #C9962E" },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-3 rounded-full text-sm font-semibold transition hover:opacity-90 disabled:opacity-50 ${full ? "w-full" : ""}`}
      style={{ ...styles[variant], fontFamily: "'Work Sans',sans-serif" }}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------
   HEADER
--------------------------------------------------------- */

function Header({ page, navigate, cartCount, wishCount, user, onLoginClick, onLogout, query, setQuery, mobileOpen, setMobileOpen }) {
  const NAV = [
    { id: "home", label: "Home" },
    { id: "catalog", label: "Shop" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Us" },
  ];
  return (
    <header className="sticky top-0 z-40" style={{ background: "#FBF3ED" }}>
      <div className="text-center text-xs py-1.5 tracking-wide" style={{ background: "#7A2048", color: "#FBF3ED", fontFamily: "'Work Sans',sans-serif" }}>
        Free shipping across India on orders above ₹999
      </div>
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-4" style={{ borderBottom: "1px solid #7A204822" }}>
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}><Menu size={22} color="#7A2048" /></button>
        <div className="flex items-baseline gap-1 cursor-pointer" onClick={() => navigate("home")}>
          <span className="text-2xl font-bold" style={{ fontFamily: "'Fraunces',serif", color: "#7A2048" }}>AnuVi</span>
          <span className="text-sm" style={{ fontFamily: "'Fraunces',serif", color: "#C9962E" }}>Gifts</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 ml-6">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => navigate(n.id)}
              className="text-sm font-medium pb-0.5"
              style={{
                color: page === n.id ? "#7A2048" : "#2B1F24cc",
                borderBottom: page === n.id ? "2px solid #C9962E" : "2px solid transparent",
                fontFamily: "'Work Sans',sans-serif",
              }}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 hidden sm:flex items-center gap-2 ml-4 px-3 py-2 rounded-full" style={{ background: "#7A20480d" }}>
          <Search size={15} color="#7A204899" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); navigate("catalog"); }}
            placeholder="Search for gifts..."
            className="bg-transparent outline-none text-sm flex-1"
            style={{ color: "#2B1F24", fontFamily: "'Work Sans',sans-serif" }}
          />
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <button className="relative" onClick={() => navigate("wishlist")} aria-label="Wishlist">
            <Heart size={20} color="#7A2048" />
            {wishCount > 0 && <Badge n={wishCount} />}
          </button>
          <button className="relative" onClick={() => navigate("cart")} aria-label="Cart">
            <ShoppingCart size={20} color="#7A2048" />
            {cartCount > 0 && <Badge n={cartCount} />}
          </button>
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={() => navigate("orders")} className="text-sm font-medium" style={{ color: "#2B1F24", fontFamily: "'Work Sans',sans-serif" }}>
                Hi, {user.name.split(" ")[0]}
              </button>
              <button onClick={onLogout} className="text-xs underline" style={{ color: "#7A204899" }}>Log out</button>
            </div>
          ) : (
            <button onClick={onLoginClick} aria-label="Login"><User size={20} color="#7A2048" /></button>
          )}
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden flex flex-col px-5 py-3 gap-3" style={{ borderBottom: "1px solid #7A204822" }}>
          {NAV.map((n) => (
            <button key={n.id} onClick={() => { navigate(n.id); setMobileOpen(false); }} className="text-left text-sm font-medium" style={{ color: "#2B1F24", fontFamily: "'Work Sans',sans-serif" }}>
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function Badge({ n }) {
  return (
    <span
      className="absolute -top-2 -right-2 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
      style={{ background: "#C9962E", color: "#2B1F24" }}
    >
      {n}
    </span>
  );
}

/* ---------------------------------------------------------
   HOME PAGE
--------------------------------------------------------- */

function HomePage({ navigate, wishlist, onToggleWish, onAddCart, onOpenProduct }) {
  const featured = PRODUCTS.slice(0, 4);
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 pt-12 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full mb-5" style={{ background: "#C9962E33", color: "#8a6a1f" }}>
            Handpicked, thoughtfully wrapped
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: "'Fraunces',serif", color: "#2B1F24" }}>
            Gifts for every story <span style={{ color: "#7A2048" }}>worth telling.</span>
          </h1>
          <p className="text-base mb-8 max-w-md" style={{ color: "#2B1F24aa", fontFamily: "'Work Sans',sans-serif" }}>
            From first birthdays to fiftieth anniversaries — AnuVi Gifts curates pieces that feel personal, not generic.
          </p>
          <div className="flex gap-3 flex-wrap">
            <GiftButton onClick={() => navigate("catalog")}>Shop the collection <ArrowRight size={14} style={{ display: "inline", marginLeft: 6 }} /></GiftButton>
            <GiftButton variant="ghost" onClick={() => navigate("about")}>Our story</GiftButton>
          </div>
        </div>
        <div className="relative h-72 hidden md:block">
          {[0, 1, 2].map((i) => {
            const p = PRODUCTS[i];
            const Icon = CATEGORY_ICON[p.category];
            return (
              <div
                key={i}
                className="absolute rounded-2xl shadow-lg flex items-center justify-center"
                style={{
                  width: 180, height: 180,
                  background: `linear-gradient(135deg, ${p.grad[0]}, ${p.grad[1]})`,
                  top: i * 40, left: i * 70, transform: `rotate(${(i - 1) * 6}deg)`,
                  border: "6px solid #FBF3ED",
                }}
              >
                <Icon size={48} color="#FBF3ED" strokeWidth={1.3} />
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate("catalog", { category: c.id })}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap flex-shrink-0"
              style={{ background: c.tint + "14", color: c.tint, fontFamily: "'Work Sans',sans-serif" }}
            >
              <c.icon size={15} /> <span className="text-sm font-medium">{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-16">
        <SectionLabel index="01">Featured picks</SectionLabel>
        <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Fraunces',serif", color: "#2B1F24" }}>Loved this week</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-3">
          {featured.map((p) => (
            <GiftTagCard key={p.id} product={p} onOpen={onOpenProduct} wishlist={wishlist} onToggleWish={onToggleWish} onAddCart={onAddCart} />
          ))}
        </div>
      </section>

      <section className="px-5 pb-20" style={{ background: "#7A20480d" }}>
        <div className="max-w-6xl mx-auto pt-14">
          <SectionLabel index="02">What people say</SectionLabel>
          <div className="grid md:grid-cols-3 gap-6 pt-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 relative" style={{ border: "1px solid #7A20481a" }}>
                <div className="absolute -top-3 left-6 w-5 h-5 rounded-full" style={{ background: "#FBF3ED", border: "2px solid #C9962E" }} />
                <Stars value={t.rating} />
                <p className="text-sm mt-3 mb-4" style={{ color: "#2B1F24cc", fontFamily: "'Work Sans',sans-serif" }}>"{t.text}"</p>
                <span className="text-sm font-semibold" style={{ color: "#7A2048", fontFamily: "'Fraunces',serif" }}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------
   CATALOG PAGE
--------------------------------------------------------- */

function CatalogPage({ query, setQuery, navigate, filterCategory, setFilterCategory, wishlist, onToggleWish, onAddCart, onOpenProduct }) {
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesCat = !filterCategory || p.category === filterCategory;
      const matchesPrice = p.price <= maxPrice;
      const matchesRating = p.rating >= minRating;
      return matchesQuery && matchesCat && matchesPrice && matchesRating;
    });
    if (sortBy === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, filterCategory, maxPrice, minRating, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-[220px_1fr] gap-8">
      <aside className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "#7A2048", fontFamily: "'Work Sans',sans-serif" }}>Category</h4>
          <div className="space-y-2">
            <button onClick={() => setFilterCategory(null)} className="block text-sm" style={{ color: !filterCategory ? "#7A2048" : "#2B1F24aa", fontWeight: !filterCategory ? 700 : 400 }}>All gifts</button>
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => setFilterCategory(c.id)} className="block text-sm" style={{ color: filterCategory === c.id ? "#7A2048" : "#2B1F24aa", fontWeight: filterCategory === c.id ? 700 : 400 }}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "#7A2048", fontFamily: "'Work Sans',sans-serif" }}>Max price: {currency(maxPrice)}</h4>
          <input type="range" min="400" max="2000" step="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#7A2048]" />
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "#7A2048", fontFamily: "'Work Sans',sans-serif" }}>Min rating</h4>
          <div className="flex gap-2">
            {[0, 4, 4.5].map((r) => (
              <button key={r} onClick={() => setMinRating(r)} className="text-xs px-2.5 py-1.5 rounded-full" style={{ background: minRating === r ? "#7A2048" : "#7A20481a", color: minRating === r ? "#FBF3ED" : "#7A2048" }}>
                {r === 0 ? "Any" : r + "+"}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <SectionLabel index="Shop">All gifts</SectionLabel>
            <p className="text-sm" style={{ color: "#2B1F2499" }}>{filtered.length} products{query ? ` for "${query}"` : ""}</p>
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm px-3 py-2 rounded-full outline-none" style={{ border: "1px solid #7A204833", color: "#2B1F24" }}>
            <option value="popular">Sort: Popular</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        {filtered.length === 0 ? (
          <EmptyState icon={Search} title="No gifts found" subtitle="Try adjusting your filters or search term." ctaLabel="Clear filters" onCta={() => { setQuery(""); setFilterCategory(null); setMaxPrice(2000); setMinRating(0); }} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <GiftTagCard key={p.id} product={p} onOpen={onOpenProduct} wishlist={wishlist} onToggleWish={onToggleWish} onAddCart={onAddCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   PRODUCT DETAIL PAGE
--------------------------------------------------------- */

function ProductPage({ product, navigate, wishlist, onToggleWish, onAddCart, reviewsState, addReview, onOpenProduct }) {
  const [qty, setQty] = useState(1);
  const [revRating, setRevRating] = useState(5);
  const [revText, setRevText] = useState("");
  const [revName, setRevName] = useState("");
  if (!product) return null;
  const Icon = CATEGORY_ICON[product.category];
  const isWished = wishlist.includes(product.id);
  const reviews = reviewsState[product.id] || [];
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <button onClick={() => navigate("catalog")} className="flex items-center gap-1 text-sm mb-6" style={{ color: "#7A204899" }}>
        <ChevronLeft size={15} /> Back to shop
      </button>
      <div className="grid md:grid-cols-2 gap-10">
        <div
          className="h-96 rounded-2xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${product.grad[0]}, ${product.grad[1]})` }}
        >
          <Icon size={100} color="#FBF3ED" strokeWidth={1.2} />
        </div>
        <div>
          <span className="inline-block text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full mb-3" style={{ background: CATEGORY_TINT[product.category] + "1a", color: CATEGORY_TINT[product.category] }}>
            {CATEGORY_NAME[product.category]}
          </span>
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Fraunces',serif", color: "#2B1F24" }}>{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Stars value={product.rating} size={16} />
            <span className="text-sm" style={{ color: "#2B1F2499" }}>{product.rating} · {reviews.length} reviews</span>
          </div>
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-2xl font-bold" style={{ color: "#7A2048", fontFamily: "'Fraunces',serif" }}>{currency(product.price)}</span>
            <span className="text-sm line-through" style={{ color: "#2B1F2466" }}>{currency(product.mrp)}</span>
            <span className="text-xs font-semibold" style={{ color: "#6E8F72" }}>{Math.round((1 - product.price / product.mrp) * 100)}% off</span>
          </div>
          <p className="text-sm mb-7 max-w-md" style={{ color: "#2B1F24bb", fontFamily: "'Work Sans',sans-serif" }}>{product.desc}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center rounded-full overflow-hidden" style={{ border: "1px solid #7A204833" }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 flex items-center justify-center"><Minus size={14} color="#7A2048" /></button>
              <span className="w-8 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-9 h-9 flex items-center justify-center"><Plus size={14} color="#7A2048" /></button>
            </div>
            <button onClick={() => onToggleWish(product.id)} className="flex items-center gap-2 text-sm font-medium" style={{ color: "#7A2048" }}>
              <Heart size={17} fill={isWished ? "#7A2048" : "none"} /> {isWished ? "Wishlisted" : "Add to wishlist"}
            </button>
          </div>
          <div className="flex gap-3">
            <GiftButton onClick={() => onAddCart(product.id, qty)}>Add to cart</GiftButton>
            <GiftButton variant="gold" onClick={() => { onAddCart(product.id, qty); navigate("checkout"); }}>Buy now</GiftButton>
          </div>
        </div>
      </div>

      {/* reviews */}
      <div className="mt-16 max-w-3xl">
        <SectionLabel index="Reviews">Customer reviews</SectionLabel>
        <div className="space-y-4 mb-8">
          {reviews.map((r, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: "#7A20480a" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold" style={{ color: "#2B1F24" }}>{r.name}</span>
                <Stars value={r.rating} size={13} />
              </div>
              <p className="text-sm" style={{ color: "#2B1F24aa" }}>{r.text}</p>
            </div>
          ))}
        </div>
        <div className="p-5 rounded-xl" style={{ border: "1px dashed #7A204855" }}>
          <h4 className="text-sm font-semibold mb-3" style={{ color: "#7A2048" }}>Write a review</h4>
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <button key={i} onClick={() => setRevRating(i)}>
                <Star size={20} fill={i <= revRating ? "#C9962E" : "none"} stroke="#C9962E" />
              </button>
            ))}
          </div>
          <input value={revName} onChange={(e) => setRevName(e.target.value)} placeholder="Your name" className="w-full mb-2 px-3 py-2 rounded-lg text-sm outline-none" style={{ border: "1px solid #7A204833" }} />
          <textarea value={revText} onChange={(e) => setRevText(e.target.value)} placeholder="Share your experience..." className="w-full mb-3 px-3 py-2 rounded-lg text-sm outline-none min-h-[70px]" style={{ border: "1px solid #7A204833" }} />
          <GiftButton onClick={() => {
            if (!revText.trim()) return;
            addReview(product.id, { name: revName.trim() || "Anonymous", rating: revRating, text: revText.trim() });
            setRevText(""); setRevName("");
          }}>Submit review</GiftButton>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <SectionLabel index="More">You might also like</SectionLabel>
          <div className="grid sm:grid-cols-3 gap-6 pt-3">
            {related.map((p) => (
              <GiftTagCard key={p.id} product={p} onOpen={onOpenProduct} wishlist={wishlist} onToggleWish={onToggleWish} onAddCart={onAddCart} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   CART PAGE
--------------------------------------------------------- */

function CartPage({ cart, updateQty, removeFromCart, navigate }) {
  const items = cart.map((c) => ({ ...c, product: PRODUCTS.find((p) => p.id === c.id) }));
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;

  if (items.length === 0) {
    return <EmptyState icon={ShoppingCart} title="Your cart is empty" subtitle="Looks like you haven't added any gifts yet." ctaLabel="Browse gifts" onCta={() => navigate("catalog")} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <SectionLabel index="Cart">Your gifts</SectionLabel>
      <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Fraunces',serif", color: "#2B1F24" }}>Shopping cart</h1>
      <div className="space-y-4 mb-8">
        {items.map((i) => {
          const Icon = CATEGORY_ICON[i.product.category];
          return (
            <div key={i.id} className="flex items-center gap-4 p-4 rounded-2xl" style={{ border: "1px solid #7A20481f" }}>
              <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${i.product.grad[0]}, ${i.product.grad[1]})` }}>
                <Icon size={28} color="#FBF3ED" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm mb-1" style={{ color: "#2B1F24", fontFamily: "'Fraunces',serif" }}>{i.product.name}</h3>
                <span className="text-sm font-bold" style={{ color: "#7A2048" }}>{currency(i.product.price)}</span>
              </div>
              <div className="flex items-center rounded-full overflow-hidden" style={{ border: "1px solid #7A204833" }}>
                <button onClick={() => updateQty(i.id, Math.max(1, i.qty - 1))} className="w-8 h-8 flex items-center justify-center"><Minus size={12} color="#7A2048" /></button>
                <span className="w-7 text-center text-sm">{i.qty}</span>
                <button onClick={() => updateQty(i.id, i.qty + 1)} className="w-8 h-8 flex items-center justify-center"><Plus size={12} color="#7A2048" /></button>
              </div>
              <button onClick={() => removeFromCart(i.id)} aria-label="Remove"><Trash2 size={17} color="#7A204899" /></button>
            </div>
          );
        })}
      </div>
      <div className="max-w-sm ml-auto p-5 rounded-2xl" style={{ background: "#7A20480d" }}>
        <div className="flex justify-between text-sm mb-2" style={{ color: "#2B1F24aa" }}><span>Subtotal</span><span>{currency(subtotal)}</span></div>
        <div className="flex justify-between text-sm mb-3" style={{ color: "#2B1F24aa" }}><span>Shipping</span><span>{shipping === 0 ? "Free" : currency(shipping)}</span></div>
        <div className="flex justify-between font-bold mb-5" style={{ color: "#2B1F24" }}><span>Total</span><span>{currency(subtotal + shipping)}</span></div>
        <GiftButton full onClick={() => navigate("checkout")}>Proceed to checkout</GiftButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   CHECKOUT PAGE
--------------------------------------------------------- */

function CheckoutPage({ cart, navigate, placeOrder }) {
  const items = cart.map((c) => ({ ...c, product: PRODUCTS.find((p) => p.id === c.id) }));
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const [form, setForm] = useState({ name: "", address: "", city: "", pincode: "", phone: "", email: "" });
  const [paying, setPaying] = useState(false);
  const formValid = Object.values(form).every((v) => v.trim().length > 0);

  if (items.length === 0) {
    return <EmptyState icon={Package} title="Nothing to checkout" subtitle="Add a few gifts to your cart first." ctaLabel="Browse gifts" onCta={() => navigate("catalog")} />;
  }

  const handlePay = () => {
    if (!formValid) return;
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      placeOrder(form);
    }, 1400);
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-10 grid md:grid-cols-[1fr_340px] gap-10">
      <div>
        <SectionLabel index="Checkout">Shipping details</SectionLabel>
        <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Fraunces',serif", color: "#2B1F24" }}>Where should we send it?</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            ["name", "Full name"], ["phone", "Phone number"],
            ["email", "Email address"], ["pincode", "Pincode"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: "#7A2048" }}>{label}</label>
              <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #7A204833" }} />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: "#7A2048" }}>Address</label>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #7A204833" }} />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide mb-1 block" style={{ color: "#7A2048" }}>City</label>
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #7A204833" }} />
          </div>
        </div>

        <div className="mt-8">
          <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: "#7A2048" }}>Payment method</label>
          <div className="p-4 rounded-xl flex items-center justify-between" style={{ border: "1px solid #7A204833" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 rounded flex items-center justify-center text-[10px] font-black italic" style={{ background: "#003087", color: "#FBF3ED" }}>PayPal</div>
              <span className="text-sm" style={{ color: "#2B1F24aa" }}>Pay securely via PayPal</span>
            </div>
            {!formValid && <span className="text-xs" style={{ color: "#7A204899" }}>Fill details to continue</span>}
          </div>
          <button
            onClick={handlePay}
            disabled={!formValid || paying}
            className="w-full mt-4 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ background: "#0070BA", color: "#fff", fontFamily: "'Work Sans',sans-serif" }}
          >
            {paying ? "Redirecting to PayPal..." : `Pay ${currency(subtotal + shipping)} with PayPal`}
          </button>
          <p className="text-[11px] mt-2 text-center" style={{ color: "#2B1F2477" }}>Demo checkout — no real payment is processed.</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl h-fit" style={{ background: "#7A20480d" }}>
        <h3 className="font-semibold mb-4" style={{ color: "#2B1F24", fontFamily: "'Fraunces',serif" }}>Order summary</h3>
        <div className="space-y-3 mb-4">
          {items.map((i) => (
            <div key={i.id} className="flex justify-between text-sm">
              <span style={{ color: "#2B1F24aa" }}>{i.product.name} × {i.qty}</span>
              <span style={{ color: "#2B1F24" }}>{currency(i.product.price * i.qty)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm mb-2" style={{ color: "#2B1F24aa" }}><span>Subtotal</span><span>{currency(subtotal)}</span></div>
        <div className="flex justify-between text-sm mb-3" style={{ color: "#2B1F24aa" }}><span>Shipping</span><span>{shipping === 0 ? "Free" : currency(shipping)}</span></div>
        <div className="flex justify-between font-bold pt-3" style={{ color: "#2B1F24", borderTop: "1px solid #7A204822" }}><span>Total</span><span>{currency(subtotal + shipping)}</span></div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   ORDER CONFIRMATION + TRACKING
--------------------------------------------------------- */

function OrdersPage({ orders, navigate }) {
  if (orders.length === 0) {
    return <EmptyState icon={Package} title="No orders yet" subtitle="Your placed orders will show up here for tracking." ctaLabel="Start shopping" onCta={() => navigate("catalog")} />;
  }
  const STEPS = ["Placed", "Packed", "Shipped", "Delivered"];
  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <SectionLabel index="Orders">Order tracking</SectionLabel>
      <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Fraunces',serif", color: "#2B1F24" }}>Your orders</h1>
      <div className="space-y-6">
        {orders.map((o) => {
          const stepIndex = STEPS.indexOf(o.status);
          return (
            <div key={o.id} className="p-5 rounded-2xl" style={{ border: "1px solid #7A20481f" }}>
              <div className="flex justify-between items-start mb-5 flex-wrap gap-2">
                <div>
                  <span className="text-sm font-bold" style={{ color: "#7A2048" }}>Order #{o.id}</span>
                  <p className="text-xs" style={{ color: "#2B1F2499" }}>{o.date} · {o.items.length} item(s) · {currency(o.total)}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#6E8F721a", color: "#4d6650" }}>{o.status}</span>
              </div>
              <div className="flex items-center">
                {STEPS.map((s, i) => (
                  <React.Fragment key={s}>
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: i <= stepIndex ? "#7A2048" : "#7A20481a" }}>
                        {i <= stepIndex ? <Check size={13} color="#FBF3ED" /> : <span className="text-[10px]" style={{ color: "#7A204899" }}>{i + 1}</span>}
                      </div>
                      <span className="text-[10px] mt-1.5" style={{ color: i <= stepIndex ? "#7A2048" : "#2B1F2477" }}>{s}</span>
                    </div>
                    {i < STEPS.length - 1 && <div className="flex-1 h-[2px] mx-1" style={{ background: i < stepIndex ? "#7A2048" : "#7A20481a" }} />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   WISHLIST PAGE
--------------------------------------------------------- */

function WishlistPage({ wishlist, onToggleWish, onAddCart, navigate, onOpenProduct }) {
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
  if (items.length === 0) {
    return <EmptyState icon={Heart} title="Your wishlist is empty" subtitle="Tap the heart on any gift to save it for later." ctaLabel="Browse gifts" onCta={() => navigate("catalog")} />;
  }
  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <SectionLabel index="Wishlist">Saved for later</SectionLabel>
      <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Fraunces',serif", color: "#2B1F24" }}>Your wishlist</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <GiftTagCard key={p.id} product={p} onOpen={onOpenProduct} wishlist={wishlist} onToggleWish={onToggleWish} onAddCart={onAddCart} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   CONTACT / ABOUT
--------------------------------------------------------- */

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-5xl mx-auto px-5 py-10 grid md:grid-cols-2 gap-12">
      <div>
        <SectionLabel index="Contact">Get in touch</SectionLabel>
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Fraunces',serif", color: "#2B1F24" }}>We'd love to hear from you</h1>
        <p className="text-sm mb-8" style={{ color: "#2B1F24aa" }}>Questions about an order, a bulk gifting request, or just want to say hello — reach out any way that suits you.</p>
        <div className="space-y-4">
          <div className="flex items-center gap-3"><MapPin size={17} color="#7A2048" /><span className="text-sm" style={{ color: "#2B1F24aa" }}>14 Ribbon Street, T. Nagar, Chennai 600017</span></div>
          <div className="flex items-center gap-3"><Phone size={17} color="#7A2048" /><span className="text-sm" style={{ color: "#2B1F24aa" }}>+91 98765 43210</span></div>
          <div className="flex items-center gap-3"><Mail size={17} color="#7A2048" /><span className="text-sm" style={{ color: "#2B1F24aa" }}>hello@anuvigifts.example</span></div>
        </div>
      </div>
      <div className="p-6 rounded-2xl" style={{ background: "#7A20480d" }}>
        {sent ? (
          <EmptyState icon={Check} title="Message sent" subtitle="Thanks for reaching out — we'll get back to you within a day." />
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <input required placeholder="Your name" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #7A204833", background: "#fff" }} />
            <input required type="email" placeholder="Email address" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #7A204833", background: "#fff" }} />
            <input required placeholder="Subject" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #7A204833", background: "#fff" }} />
            <textarea required placeholder="Your message" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none min-h-[110px]" style={{ border: "1px solid #7A204833", background: "#fff" }} />
            <GiftButton type="submit" full>Send message</GiftButton>
          </form>
        )}
      </div>
    </div>
  );
}

function AboutPage({ navigate }) {
  return (
    <div className="max-w-4xl mx-auto px-5 py-14">
      <SectionLabel index="About">Our story</SectionLabel>
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Fraunces',serif", color: "#2B1F24" }}>Gifting, the way it used to feel.</h1>
      <p className="text-base mb-5 max-w-2xl" style={{ color: "#2B1F24bb" }}>
        AnuVi Gifts started in 2021 in a small Chennai apartment, born from a frustration: most "gift shops" online sold the same mass-produced items with a bow slapped on. We wanted something that felt like it came from a person who knew you.
      </p>
      <p className="text-base mb-10 max-w-2xl" style={{ color: "#2B1F24bb" }}>
        Today every product on this site is chosen or made by small makers across India — potters, woodworkers, jewellers, and illustrators — and every order still gets packed by hand with a note.
      </p>
      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {[
          { n: "120+", l: "Independent makers supported" },
          { n: "18,000+", l: "Gifts delivered" },
          { n: "4.7★", l: "Average customer rating" },
        ].map((s) => (
          <div key={s.l} className="p-5 rounded-2xl text-center" style={{ background: "#7A20480d" }}>
            <div className="text-2xl font-bold mb-1" style={{ color: "#7A2048", fontFamily: "'Fraunces',serif" }}>{s.n}</div>
            <div className="text-xs" style={{ color: "#2B1F2499" }}>{s.l}</div>
          </div>
        ))}
      </div>
      <GiftButton onClick={() => navigate("catalog")}>Explore our gifts</GiftButton>
    </div>
  );
}

/* ---------------------------------------------------------
   LOGIN MODAL
--------------------------------------------------------- */

function LoginModal({ onClose, onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5" style={{ background: "#2B1F2499" }} onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4"><X size={18} color="#2B1F2499" /></button>
        <div className="flex gap-4 mb-6">
          {["login", "register"].map((m) => (
            <button key={m} onClick={() => setMode(m)} className="text-sm font-semibold pb-1 capitalize" style={{ color: mode === m ? "#7A2048" : "#2B1F2477", borderBottom: mode === m ? "2px solid #C9962E" : "2px solid transparent" }}>
              {m === "login" ? "Log in" : "Register"}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onLogin({ name: name || "Guest User", email: email || "guest@example.com" }); }} className="space-y-3">
          {mode === "register" && (
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #7A204833" }} />
          )}
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #7A204833" }} />
          <input type="password" placeholder="Password" className="w-full px-3 py-2.5 rounded-lg text-sm outline-none" style={{ border: "1px solid #7A204833" }} />
          <GiftButton type="submit" full>{mode === "login" ? "Log in" : "Create account"}</GiftButton>
        </form>
        <p className="text-[11px] mt-4 text-center" style={{ color: "#2B1F2477" }}>Demo only — no real account is created.</p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   APP ROOT
--------------------------------------------------------- */

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [query, setQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState(null);
  const [orders, setOrders] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reviewsState, setReviewsState] = useState(() =>
    Object.fromEntries(PRODUCTS.map((p) => [p.id, p.reviews]))
  );

  const navigate = (p, opts = {}) => {
    if (opts.category !== undefined) setFilterCategory(opts.category);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProduct = (id) => { setSelectedId(id); navigate("product"); };

  const addToCart = (id, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + qty } : c));
      return [...prev, { id, qty }];
    });
  };
  const updateQty = (id, qty) => setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty } : c)));
  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id));
  const toggleWishlist = (id) => setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));
  const addReview = (productId, review) => setReviewsState((prev) => ({ ...prev, [productId]: [review, ...(prev[productId] || [])] }));

  const placeOrder = (form) => {
    const items = cart.map((c) => ({ ...c, product: PRODUCTS.find((p) => p.id === c.id) }));
    const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    const order = {
      id: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      items, total, status: "Placed", shipTo: form,
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    navigate("orders");
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedId);

  return (
    <div style={{ background: "#FBF3ED", minHeight: "100vh", fontFamily: "'Work Sans',sans-serif" }}>
      <style>{FONT_IMPORT}</style>

      <Header
        page={page} navigate={navigate} cartCount={cartCount} wishCount={wishlist.length}
        user={user} onLoginClick={() => setShowLogin(true)} onLogout={() => setUser(null)}
        query={query} setQuery={setQuery} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
      />

      {page === "home" && <HomePage navigate={navigate} wishlist={wishlist} onToggleWish={toggleWishlist} onAddCart={addToCart} onOpenProduct={openProduct} />}
      {page === "catalog" && <CatalogPage query={query} setQuery={setQuery} navigate={navigate} filterCategory={filterCategory} setFilterCategory={setFilterCategory} wishlist={wishlist} onToggleWish={toggleWishlist} onAddCart={addToCart} onOpenProduct={openProduct} />}
      {page === "product" && <ProductPage product={selectedProduct} navigate={navigate} wishlist={wishlist} onToggleWish={toggleWishlist} onAddCart={addToCart} reviewsState={reviewsState} addReview={addReview} onOpenProduct={openProduct} />}
      {page === "cart" && <CartPage cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} navigate={navigate} />}
      {page === "checkout" && <CheckoutPage cart={cart} navigate={navigate} placeOrder={placeOrder} />}
      {page === "wishlist" && <WishlistPage wishlist={wishlist} onToggleWish={toggleWishlist} onAddCart={addToCart} navigate={navigate} onOpenProduct={openProduct} />}
      {page === "orders" && <OrdersPage orders={orders} navigate={navigate} />}
      {page === "contact" && <ContactPage />}
      {page === "about" && <AboutPage navigate={navigate} />}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={(u) => { setUser(u); setShowLogin(false); }} />}

      <footer className="mt-10 px-5 py-10" style={{ background: "#2B1F24" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold" style={{ fontFamily: "'Fraunces',serif", color: "#FBF3ED" }}>AnuVi</span>
            <span className="text-sm" style={{ fontFamily: "'Fraunces',serif", color: "#C9962E" }}>Gifts</span>
          </div>
          <p className="text-xs" style={{ color: "#FBF3ED88" }}>© 2026 AnuVi Gifts. Wrapped with care in Chennai.</p>
        </div>
      </footer>
    </div>
  );
}
