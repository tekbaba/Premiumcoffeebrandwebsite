import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { PageTransition } from "../components/PageTransition";
import beanoLogo from "../../imports/beano-removebg-preview.png";
import { ShopSkeleton } from "../components/SkeletonLoader";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Breadcrumb } from "../components/Breadcrumb";
import { Price } from "../components/Price";

export function Shop() {
  // Load filters from localStorage
  const loadFiltersFromStorage = () => {
    const savedFilters = localStorage.getItem("kaven-shop-filters");
    if (savedFilters) {
      try {
        return JSON.parse(savedFilters);
      } catch {
        return null;
      }
    }
    return null;
  };

  const savedFilters = loadFiltersFromStorage();

  const [selectedCategory, setSelectedCategory] = useState<string>(savedFilters?.category || "Tümü");
  const [selectedRoast, setSelectedRoast] = useState<string>(savedFilters?.roast || "Tümü");
  const [selectedOrigin, setSelectedOrigin] = useState<string>(savedFilters?.origin || "Tümü");
  const [priceRange, setPriceRange] = useState<[number, number]>(savedFilters?.priceRange || [0, 1500]);
  const [sortBy, setSortBy] = useState<string>(savedFilters?.sortBy || "default");
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["Tümü", "Tek Köken", "Karışım"];
  const roastLevels = ["Tümü", "Açık", "Açık-Orta", "Orta", "Orta-Koyu", "Koyu"];
  const origins = ["Tümü", ...Array.from(new Set(products.map(p => p.origin)))];

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "Tümü" || product.category === selectedCategory;
    const roastMatch = selectedRoast === "Tümü" || product.roastLevel === selectedRoast;
    const originMatch = selectedOrigin === "Tümü" || product.origin === selectedOrigin;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && roastMatch && originMatch && priceMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Save filters to localStorage
  useEffect(() => {
    const filters = {
      category: selectedCategory,
      roast: selectedRoast,
      origin: selectedOrigin,
      priceRange,
      sortBy
    };
    localStorage.setItem("kaven-shop-filters", JSON.stringify(filters));
  }, [selectedCategory, selectedRoast, selectedOrigin, priceRange, sortBy]);

  if (isLoading) {
    return (
      <PageTransition>
        <ShopSkeleton />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
    <div className="min-h-screen px-5 md:px-20 relative overflow-hidden" style={{ paddingTop: "calc(var(--navbar-height) + var(--spacing-12))", paddingBottom: "var(--spacing-12)", position: "relative" }}>
      {/* Background Beano - decorative */}
      <motion.div
        className="absolute right-[5%] top-[10%] w-32 h-32 opacity-[0.02]"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img src={beanoLogo} alt="" className="w-full h-full object-contain" />
      </motion.div>

      <div className="max-w-[var(--container-max)] mx-auto relative z-10">
        {/* Breadcrumb */}
        <Breadcrumb />
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="mb-4">
            Koleksiyonumuz
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto" style={{ fontSize: "18px" }}>
            Özenle seçilmiş özel kahve koleksiyonumuzu keşfedin
          </p>
        </motion.div>

        {/* Filters & Sort Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
            <h3 className="text-[var(--espresso)]" style={{ fontSize: "var(--text-h3)" }}>
              Filtreler
            </h3>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <ArrowUpDown className="w-4 h-4 text-[var(--muted-foreground)]" strokeWidth={1.5} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-[var(--border)] rounded-full text-sm text-[var(--espresso)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] cursor-pointer"
            >
              <option value="default">Varsayılan Sıralama</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="name-asc">İsim: A-Z</option>
              <option value="name-desc">İsim: Z-A</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 bg-white rounded-[var(--radius-2xl)] p-6 border border-[var(--border)]" style={{ boxShadow: "var(--shadow-sm)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category Filter */}
            <div>
              <label className="block mb-3 text-sm font-medium text-[var(--espresso)]">
                Kategori
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 rounded-full border transition-all ${
                      selectedCategory === category
                        ? "bg-[var(--espresso)] text-white border-[var(--espresso)]"
                        : "bg-white text-[var(--espresso)] border-[var(--border)] hover:border-[var(--espresso)]/30"
                    }`}
                    style={{
                      fontSize: "var(--text-small)",
                      transition: "all var(--transition-base) var(--ease-out)"
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Roast Level Filter */}
            <div>
              <label className="block mb-3 text-sm font-medium text-[var(--espresso)]">
                Kavurma Seviyesi
              </label>
              <div className="flex flex-wrap gap-2">
                {roastLevels.map((roast) => (
                  <button
                    key={roast}
                    onClick={() => setSelectedRoast(roast)}
                    className={`px-5 py-2 rounded-full border transition-all ${
                      selectedRoast === roast
                        ? "bg-[var(--espresso)] text-white border-[var(--espresso)]"
                        : "bg-white text-[var(--espresso)] border-[var(--border)] hover:border-[var(--espresso)]/30"
                    }`}
                    style={{
                      fontSize: "var(--text-small)",
                      transition: "all var(--transition-base) var(--ease-out)"
                    }}
                  >
                    {roast}
                  </button>
                ))}
              </div>
            </div>

            {/* Origin Filter */}
            <div>
              <label className="block mb-3 text-sm font-medium text-[var(--espresso)]">
                Köken
              </label>
              <div className="flex flex-wrap gap-2">
                {origins.map((origin) => (
                  <button
                    key={origin}
                    onClick={() => setSelectedOrigin(origin)}
                    className={`px-5 py-2 rounded-full border transition-all ${
                      selectedOrigin === origin
                        ? "bg-[var(--espresso)] text-white border-[var(--espresso)]"
                        : "bg-white text-[var(--espresso)] border-[var(--border)] hover:border-[var(--espresso)]/30"
                    }`}
                    style={{
                      fontSize: "var(--text-small)",
                      transition: "all var(--transition-base) var(--ease-out)"
                    }}
                  >
                    {origin}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="mb-3 block text-sm font-medium text-[var(--espresso)]">
                Fiyat Aralığı:{" "}
                <span className="inline-flex items-center gap-1.5 align-middle">
                  <Price amount={priceRange[0]} style={{ fontSize: "14px" }} />
                  <span className="text-[var(--muted-foreground)]">—</span>
                  <Price amount={priceRange[1]} style={{ fontSize: "14px" }} />
                </span>
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full h-2 bg-[var(--cream)] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--gold)] [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                  <Price amount={0} style={{ fontSize: "12px" }} className="text-[var(--muted-foreground)]" />
                  <span className="inline-flex items-center gap-px">
                    <Price amount={1500} style={{ fontSize: "12px" }} className="text-[var(--muted-foreground)]" />
                    <span>+</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <p className="text-[var(--muted-foreground)]" style={{ fontSize: "var(--text-small)" }}>
              <strong className="text-[var(--espresso)]">{sortedProducts.length}</strong> kahve gösteriliyor
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="w-24 h-24 bg-[var(--cream)] rounded-full flex items-center justify-center mx-auto mb-6">
                <SlidersHorizontal className="w-12 h-12 text-[var(--muted-foreground)]" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-[var(--espresso)]">Kahve Bulunamadı</h3>
              <p className="text-[var(--muted-foreground)]" style={{ fontSize: "18px" }}>
                Filtrelerinizle eşleşen kahve bulunamadı. Lütfen farklı filtreler deneyin.
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
    </PageTransition>
  );
}
