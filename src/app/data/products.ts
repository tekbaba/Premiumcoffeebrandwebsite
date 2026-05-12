import coffeePackageImage from "../../imports/ChatGPT_Image_7_May_2026_18_10_56__1_.png";

export interface ProductVariant {
  weight: "250g" | "500g" | "1kg";
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  origin: string;
  price: number; // Base price for 250g
  variants: ProductVariant[];
  image: string;
  tastingNotes: string[];
  brewMethods: string[];
  description: string;
  roastLevel: string;
  category: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "ethiopian-yirgacheffe",
    name: "Etiyopya Yirgacheffe",
    origin: "Etiyopya",
    price: 850,
    variants: [
      { weight: "250g", price: 850, inStock: true },
      { weight: "500g", price: 1575, inStock: true },
      { weight: "1kg", price: 2975, inStock: true }
    ],
    image: coffeePackageImage,
    tastingNotes: ["Çiçeksi", "Narenciye", "Bergamot", "Yasemin"],
    brewMethods: ["Pour Over", "Chemex", "V60"],
    description: "Parlak asiditeye ve çay benzeri bir gövdeye sahip narin ve aromatik bir kahve. Bu Etiyopya mirası, çiçek notaları ve narenciye parlaklığı ile klasik Yirgacheffe profilini sergiliyor.",
    roastLevel: "Açık",
    category: "Tek Köken",
    inStock: true
  },
  {
    id: "colombia-supremo",
    name: "Kolombiya Supremo",
    origin: "Kolombiya",
    price: 780,
    variants: [
      { weight: "250g", price: 780, inStock: true },
      { weight: "500g", price: 1445, inStock: true },
      { weight: "1kg", price: 2730, inStock: true }
    ],
    image: coffeePackageImage,
    tastingNotes: ["Karamel", "Fındık", "Sütlü Çikolata", "Esmer Şeker"],
    brewMethods: ["Espresso", "Filtre", "French Press"],
    description: "Pürüzsüz ve tatlı bir son ile zengin ve dengeli. Kolombiya'nın kahve bölgelerinin yüksek rakımlarında yetiştirilen bu supremo sınıfı çekirdek, olağanüstü berraklık ve tatlılık sunar.",
    roastLevel: "Orta",
    category: "Tek Köken",
    inStock: true
  },
  {
    id: "sumatra-mandheling",
    name: "Sumatra Mandheling",
    origin: "Endonezya",
    price: 920,
    variants: [
      { weight: "250g", price: 920, inStock: true },
      { weight: "500g", price: 1705, inStock: true },
      { weight: "1kg", price: 3220, inStock: true }
    ],
    image: coffeePackageImage,
    tastingNotes: ["Bitter Çikolata", "Sedir", "Toprak", "Tütün"],
    brewMethods: ["French Press", "Soğuk Demleme", "Moka Pot"],
    description: "Düşük asidite ve karmaşık toprak notaları ile dolgun gövdeli. Sumatra'dan gelen bu yaş işlenmiş kahve, eşsiz şurup kıvamlı bir yapı ve kalıcı bir son sunar.",
    roastLevel: "Koyu",
    category: "Tek Köken",
    inStock: true
  },
  {
    id: "kenya-aa",
    name: "Kenya AA",
    origin: "Kenya",
    price: 990,
    variants: [
      { weight: "250g", price: 990, inStock: true },
      { weight: "500g", price: 1835, inStock: true },
      { weight: "1kg", price: 3465, inStock: true }
    ],
    image: coffeePackageImage,
    tastingNotes: ["Frenk Üzümü", "Greyfurt", "Şarap", "Domates"],
    brewMethods: ["Pour Over", "Aeropress", "Sifon"],
    description: "Canlı asidite ile cesur ve şarap benzeri. Kenya AA, karmaşık meyve ağırlıklı profili ve temiz sonu ile bilinen, Kenya kahvesinin en yüksek derecesini temsil eder.",
    roastLevel: "Açık-Orta",
    category: "Tek Köken",
    inStock: true
  },
  {
    id: "guatemala-antigua",
    name: "Guatemala Antigua",
    origin: "Guatemala",
    price: 820,
    variants: [
      { weight: "250g", price: 820, inStock: true },
      { weight: "500g", price: 1520, inStock: true },
      { weight: "1kg", price: 2870, inStock: true }
    ],
    image: coffeePackageImage,
    tastingNotes: ["Kakao", "Muskat", "Elma", "Duman"],
    brewMethods: ["Espresso", "Moka Pot", "Filtre"],
    description: "Dolgun gövde ile karmaşık ve baharatlı. Antigua'nın volkanik toprağında yetiştirilen bu kahve, kendine özgü dumanlı tatlılık ve zengin kakao notaları sunar.",
    roastLevel: "Orta-Koyu",
    category: "Tek Köken",
    inStock: true
  },
  {
    id: "house-blend",
    name: "KAVEN Özel Karışım",
    origin: "Karışım",
    price: 710,
    variants: [
      { weight: "250g", price: 710, inStock: true },
      { weight: "500g", price: 1315, inStock: true },
      { weight: "1kg", price: 2485, inStock: true }
    ],
    image: coffeePackageImage,
    tastingNotes: ["Dengeli", "Yumuşak", "Bal", "Badem"],
    brewMethods: ["Espresso", "Filtre", "French Press", "Pour Over"],
    description: "Günlük mükemmellik için hazırlanmış imza karışımımız. Orta ve Güney Amerika çekirdeklerinin uyumlu kombinasyonu, tatlılığı ve dengeyi öne çıkarmak için kavrulmuştur.",
    roastLevel: "Orta",
    category: "Karışım",
    inStock: true
  }
];
