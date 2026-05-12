import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import { getSeoForPath } from "../config/seo";
import { SITE_NAME } from "../config/site";

/**
 * Rota bazlı başlık, açıklama, kanonik ve sosyal önizleme etiketleri.
 * Ürün ve blog yazıları sayfa içinde ek `Helmet` ile özelleştirilebilir.
 */
export function SeoHead() {
  const { pathname } = useLocation();
  const { title, description, canonical } = getSeoForPath(pathname);

  return (
    <Helmet prioritizeSeoTags htmlAttributes={{ lang: "tr" }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
