Bu proje “KAVEN” premium specialty coffee markası için çok sayfalı bir web sitesi. Tasarımı mevcut canlı yapıyla birebir hizala ve eksik ekranları tamamla.
GENEL MARKA & TON
- Marka: KAVEN — sıcak, zarif, modern, hafif oyunbaz; Apple / Blue Bottle / Oatly hissi.
- Slogan / mikro metin: “Beano ile Güçlendirilmiştir” (footer ve küçük rozetlerde kullanılıyor).
- Ana mesaj: “Kahve severler için bir sığınak” benzeri yumuşak, premium ton.
- Renkler (CSS token’larıyla uyumlu): espresso (#3B2F2F veya var(--espresso)), cream (#F5EDE6), accent gold (var(--gold)), muted metin, ince border (var(--border)).
TİPOGRAFİ
- Başlıklar: serif (Playfair benzeri), gövde ve nav: temiz sans.
- Net hiyerarşi: H1 hero’da çok baskın; bölüm başlıkları H2/H3; kart içi metin küçük ama okunaklı.
NAVBAR (fixed, scroll’da blur + border)
- Sol: KAVEN logo (koyu ve açık varyant: light footer için inverted).
- Orta/sağ desktop: linkler sırasıyla — Ana Sayfa | Mağaza | Kahve Rehberi | Hakkımızda | İletişim.
- Aktif sayfa: alt çizgi veya layout animasyonlu ince çizgi.
- Sağ: geniş arama alanı (SearchBar), sepet ikonu + badge (ürün sayısı).
- Mobil: hamburger menü, arama overlay/drawer, sepet erişimi.
GLOBAL BILEŞENLER (component library olarak tasarla)
- Primary / Secondary / Ghost butonlar; rounded-full veya 2xl tutarlılığı.
- Ürün kartı: görsel, köken, isim, tadım notaları chip’leri, fiyat (₺), stok durumu, “Sepete Ekle”, hover’da hafif lift + gölge.
- Chip / badge: roast (Açık/Orta/Koyu), kategori (Tek Köken / Karışım), “Beano seçimi” tarzı küçük rozet.
- Skeleton yükleme: Mağaza grid için placeholder kartlar.
- Cart Drawer (sağdan sheet): boş sepet, dolu sepet, satır silme, ara toplam, “Ödemeye Git” CTA (placeholder), kapatma.
- Live chat widget / küçük FAB (kodda varsa) — minimal, premium.
SAYFALAR — HER BİRİ İÇİN DESKTOP + MOBİL FRAME
1) Ana Sayfa (/)
- Full-viewport hero: cream gradient zemin, çok hafif doku veya grain; merkezde güçlü H1 + alt başlık + birincil CTA (Mağaza / Koleksiyon).
- Beano: hero’da dekoratif ama düşük opaklıkta 3–5 küçük Beano illüstrasyonu (aşırı kalabalık değil); bir “Beano ile tanış” kartı veya bölüm.
- Öne çıkan 3 ürün kartı (gerçek ürün isimleriyle uyumlu: Etiyopya Yirgacheffe, Kolombiya Supremo, Sumatra Mandheling, Kenya AA, Guatemala Antigua vb. veri setine göre).
- Marka hikayesi / değer önerisi bölümü (kısa paragraflar, bol whitespace).
- Alt bölüm: güven / kalite satırları (ör. “Premium Roast”, “Single Origin” gibi 4 sütunlu minimal strip — kodda benzer vurgu varsa).
2) Mağaza (/shop)
- Üst başlık: “Koleksiyonumuz” + kısa açıklama.
- Filtre barı: Kategori (Tümü / Tek Köken / Karışım), Kavurma (Tümü + tüm roast seviyeleri), Köken dropdown, fiyat aralığı slider (ör. 0–1500 ₺), “Sırala” (fiyat artan/azalan, isim A–Z).
- Filtre + sıralama aktifken sonuç sayısı veya “sonuç bulunamadı” empty state.
- Grid: responsive 1/2/3 kolon; kartlar hizada.
3) Ürün detay (/product/:id)
- Büyük görsel, ürün adı, köken, fiyat ₺, roast seviyesi, kategori, stok etiketi.
- Tadım notaları chip’leri (ör. Çiçeksi, Narenciye…).
- Demleme yöntemleri (Pour Over, Chemex, Espresso…) — ikon + metin veya pill.
- Uzun açıklama + “Sepete Ekle” + isteğe bağlı “Kahve rehberinde oku” linki.
- İncelemeler / yıldız bölümü varsa (ProductReviews) — tasarımda modül olarak yer ver.
4) Hakkımızda (/about)
- Marka manifestosu, ekip veya süreç, Beano’nun rolü (maskot hikayesi), görseller.
5) Kahve Rehberi (/guide)
- İçerik listesi / makale kartları / kategori filtre; okuma odaklı tipografi.
6) İletişim (/contact)
- Form: ad, e-posta, konu, mesaj; harita placeholder veya adres bloğu; sosyal linkler.
7) Demleme Hesaplayıcı (/brew-calculator)
- Girdi alanları (kahve miktarı, su, oran), sonuç kartı, birincil CTA “Hesapla”; açıklayıcı mikro metin.
8) Kahve Quiz (/coffee-quiz)
- Adım adım soru ekranları (progress), seçenek kartları, sonuç ekranı “sana önerilen kahve”.
9) SSS (/faq)
- Accordion liste; her soru için geniş tıklama alanı (mobil).
10) Gizlilik (/privacy-policy) & Kullanım (/terms-of-service)
- Uzun metin layout: max-width okuma sütunu, içindekiler anchor’ları, alt başlık hiyerarşisi.
11) 404 (/not-found)
- Minimal, premium; ana sayfaya dön CTA; küçük Beano veya illüstrasyon.
FOOTER (koyu espresso zemin)
- Üst: “Bültene Katılın” — başlık, kısa metin, e-posta input + “Abone Ol” altın buton.
- Orta: 3 kolon — marka + kısa tagline; “Keşfet” link listesi (Mağaza, Rehber, SSS, vb.); “Yardım” veya yasal linkler.
- Alt: sosyal ikonlar (Instagram, Facebook, Twitter), telif, küçük “Beano ile Güçlendirilmiştir” rozet satırı.
DESIGN SYSTEM SAYFASI (ayrı frame)
- Renk token’ları, tipografi ölçeği, spacing (8px grid), radius, shadow, border, button states (default/hover/disabled), form states (focus/error), kart varyantları, navbar scrolled vs top.
EK NOTLAR
- Para birimi: Türk Lirası (₺), fiyat örnekleri 780–990 aralığında.
- Ürün verisinde alanlar: id, name, origin, price, image, tastingNotes[], brewMethods[], description, roastLevel, category, inStock.
- Tüm ürünler aynı paket görselini kullanıyorsa Figma’da geçici olarak aynı görseli kullan ama “ileride ürün başına benzersiz foto” notu düş.