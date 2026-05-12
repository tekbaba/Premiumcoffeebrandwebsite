import { SITE_NAME, SITE_URL } from "./site";

export type SeoMeta = {
  title: string;
  description: string;
  canonical: string;
};

const homeDescription =
  "KAVEN ile taze kavrulmuş çekirdek kahve, demleme rehberi, blog ve güvenilir alışveriş deneyimi.";

const EXACT: Record<string, { title: string; description: string }> = {
  "/": {
    title: `${SITE_NAME} | Özel Kavurma Kahve`,
    description: homeDescription,
  },
  "/shop": {
    title: `Mağaza | ${SITE_NAME}`,
    description:
      "Tek kökenli ve harman kahve çekirdekleri. Öğütme seçenekleri ve hızlı kargo ile sipariş verin.",
  },
  "/about": {
    title: `Hakkımızda | ${SITE_NAME}`,
    description: "KAVEN’in hikayesi, kavurma felsefemiz ve kahveye yaklaşımımızı keşfedin.",
  },
  "/guide": {
    title: `Kahve Rehberi | ${SITE_NAME}`,
    description: "Demleme yöntemleri, öğütme dereceleri ve bardakta mükemmel kahve için ipuçları.",
  },
  "/contact": {
    title: `İletişim | ${SITE_NAME}`,
    description: "Sorularınız ve sipariş desteği için KAVEN ile iletişime geçin.",
  },
  "/brew-calculator": {
    title: `Demleme Hesaplayıcısı | ${SITE_NAME}`,
    description: "Kahve ve su oranınızı hesaplayın; demlemenizi kolaylaştırın.",
  },
  "/coffee-quiz": {
    title: `Kahve Quiz | ${SITE_NAME}`,
    description: "Tadınıza uygun kahveyi birkaç soruyla bulun.",
  },
  "/faq": {
    title: `Sıkça Sorulan Sorular | ${SITE_NAME}`,
    description: "Kargo, ödeme, iade ve ürünler hakkında sık sorulan soruların yanıtları.",
  },
  "/privacy-policy": {
    title: `Gizlilik Politikası | ${SITE_NAME}`,
    description: "Kişisel verilerin korunması ve gizlilik uygulamalarımız.",
  },
  "/terms-of-service": {
    title: `Kullanım Koşulları | ${SITE_NAME}`,
    description: "Web sitesi ve hizmet kullanımına ilişkin koşullar.",
  },
  "/blog": {
    title: `Blog | ${SITE_NAME}`,
    description: "Kahve kültürü, demleme ve ürün haberleri.",
  },
  "/checkout": {
    title: `Ödeme (Demo) | ${SITE_NAME}`,
    description: "Demo ödeme akışı; gerçek ödeme alınmaz.",
  },
  "/kargo-takip": {
    title: `Kargo Takip | ${SITE_NAME}`,
    description: "Sipariş ve kargo takibi hakkında bilgi.",
  },
  "/teslimat-ve-iade": {
    title: `Teslimat ve İade | ${SITE_NAME}`,
    description: "Teslimat süreleri ve iade koşulları.",
  },
  "/mesafeli-satis-sozlesmesi": {
    title: `Mesafeli Satış Sözleşmesi | ${SITE_NAME}`,
    description: "Mesafeli satış sözleşmesi metni.",
  },
};

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return trimmed || "/";
}

export function getSeoForPath(pathname: string): SeoMeta {
  const path = normalizePath(pathname);
  const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;

  const exact = EXACT[path];
  if (exact) {
    return { title: exact.title, description: exact.description, canonical };
  }
  if (path.startsWith("/product/")) {
    return { ...getSeoForProduct(path, null), canonical };
  }
  if (path.startsWith("/blog/") && path !== "/blog") {
    return { ...getSeoForBlogPost(path, null), canonical };
  }

  return {
    title: `Sayfa bulunamadı | ${SITE_NAME}`,
    description: "Aradığınız sayfa bulunamadı veya taşınmış olabilir.",
    canonical,
  };
}

export function getSeoForProduct(pathname: string, productName?: string | null): SeoMeta {
  const path = normalizePath(pathname);
  const title = productName
    ? `${productName} | ${SITE_NAME}`
    : `Ürün | ${SITE_NAME}`;
  const description = productName
    ? `${productName} — çekirdek kahve ve öğütme seçenekleri. ${SITE_NAME} mağazasında inceleyin.`
    : "Ürün detayı, notlar ve sipariş seçenekleri.";
  return {
    title,
    description,
    canonical: `${SITE_URL}${path}`,
  };
}

export function getSeoForBlogPost(pathname: string, postTitle?: string | null): SeoMeta {
  const path = normalizePath(pathname);
  const title = postTitle ? `${postTitle} | ${SITE_NAME} Blog` : `Blog Yazısı | ${SITE_NAME}`;
  const description = postTitle
    ? `${postTitle} — KAVEN kahve blogu.`
    : "Kahve ve demleme üzerine blog yazısı.";
  return {
    title,
    description,
    canonical: `${SITE_URL}${path}`,
  };
}
