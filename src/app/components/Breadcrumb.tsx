import { Link, useLocation } from "react-router";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNames: Record<string, string> = {
    shop: "Mağaza",
    product: "Ürün",
    guide: "Kahve Rehberi",
    about: "Hakkımızda",
    contact: "İletişim",
    "brew-calculator": "Demleme Hesaplayıcısı",
    "coffee-quiz": "Kahve Quiz",
    faq: "SSS",
    "privacy-policy": "Gizlilik Politikası",
    "terms-of-service": "Kullanım Koşulları",
    blog: "Blog",
    cart: "Sepet",
  };

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Sayfa konumu"
      className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-6"
    >
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-[var(--espresso)] transition-colors"
      >
        <Home className="w-4 h-4" strokeWidth={1.5} />
        <span>Ana Sayfa</span>
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbNames[name] || name;

        return (
          <div key={name} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            {isLast ? (
              <span className="text-[var(--espresso)] font-medium">{displayName}</span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-[var(--espresso)] transition-colors"
              >
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
