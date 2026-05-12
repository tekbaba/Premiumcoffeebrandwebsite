import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { products } from "../data/products";
import { Link, useNavigate } from "react-router";

interface SearchResult {
  id: string;
  name: string;
  category: string;
  origin: string;
  image: string;
  type: "product";
}

const RECENT_SEARCHES_KEY = "kaven_recent_searches";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load recent searches
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Search logic
  useEffect(() => {
    if (query.trim().length > 1) {
      const searchResults = products
        .filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.origin.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.tastingNotes.some(note => note.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5)
        .map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          origin: product.origin,
          image: product.image,
          type: "product" as const
        }));

      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectResult(results[selectedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    saveToRecent(result.name);
    setIsOpen(false);
    setQuery("");
    navigate(`/product/${result.id}`);
  };

  const handleRecentSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    inputRef.current?.focus();
  };

  const saveToRecent = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={index} className="bg-[var(--gold)]/20 text-[var(--espresso)] font-medium">{part}</mark>
        : part
    );
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      {/* Search Input */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)] pointer-events-none"
          strokeWidth={1.5}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Kahve ara..."
          className="w-full pl-12 pr-12 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[var(--espresso)]/5 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-[var(--muted-foreground)]" strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full bg-white rounded-[var(--radius-2xl)] border border-[var(--border)] overflow-hidden"
            style={{ boxShadow: "var(--shadow-xl)", maxHeight: "500px" }}
          >
            {query.trim().length > 1 ? (
              /* Search Results */
              <div className="overflow-y-auto max-h-96">
                {results.length > 0 ? (
                  <>
                    <div className="px-4 py-3 border-b border-[var(--border)]">
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {results.length} sonuç bulundu
                      </p>
                    </div>
                    {results.map((result, index) => (
                      <motion.button
                        key={result.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelectResult(result)}
                        className={`w-full px-4 py-3 flex items-center gap-4 hover:bg-[var(--cream)] transition-colors text-left ${
                          selectedIndex === index ? "bg-[var(--cream)]" : ""
                        }`}
                      >
                        <img
                          src={result.image}
                          alt={result.name}
                          className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-[var(--espresso)] truncate text-sm">
                            {highlightMatch(result.name, query)}
                          </h4>
                          <p className="text-xs text-[var(--muted-foreground)] truncate">
                            {result.category} • {result.origin}
                          </p>
                        </div>
                        <Search className="w-4 h-4 text-[var(--muted-foreground)] flex-shrink-0" strokeWidth={1.5} />
                      </motion.button>
                    ))}
                  </>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <p className="text-[var(--muted-foreground)]">Sonuç bulunamadı</p>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">
                      Farklı bir arama terimi deneyin
                    </p>
                  </div>
                )}

                {/* View All Results Link */}
                {results.length > 0 && (
                  <Link
                    to="/shop"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-center text-sm text-[var(--gold)] hover:bg-[var(--cream)] transition-colors border-t border-[var(--border)] font-medium"
                  >
                    Tüm sonuçları görüntüle
                  </Link>
                )}
              </div>
            ) : (
              /* Recent & Popular Searches */
              <div className="p-4">
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[var(--muted-foreground)]" strokeWidth={1.5} />
                        <h4 className="text-sm font-medium text-[var(--espresso)]">Son Aramalar</h4>
                      </div>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-[var(--muted-foreground)] hover:text-[var(--espresso)] transition-colors"
                      >
                        Temizle
                      </button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentSearch(search)}
                          className="w-full px-3 py-2 text-left text-sm text-[var(--espresso)] hover:bg-[var(--cream)] rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Clock className="w-3 h-3 text-[var(--muted-foreground)]" strokeWidth={1.5} />
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-[var(--muted-foreground)]" strokeWidth={1.5} />
                    <h4 className="text-sm font-medium text-[var(--espresso)]">Popüler Aramalar</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Etiyopya", "Espresso", "French Press", "Tek Köken", "Orta Kavurma"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleRecentSearch(tag)}
                        className="px-3 py-1.5 bg-[var(--cream)] border border-[var(--border)] text-xs text-[var(--espresso)] rounded-full hover:bg-[var(--espresso)] hover:text-white transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
