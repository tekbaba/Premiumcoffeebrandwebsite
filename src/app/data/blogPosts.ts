import beanoAvatar from "../../imports/beano-removebg-preview.png";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
}

/** Tüm blog yazıları KAVEN maskotu Beano imzasıyla yayınlanır. */
const blogAuthor: BlogPost["author"] = {
  name: "Beano",
  avatar: beanoAvatar
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "pour-over-rehberi",
    title: "Pour Over Kahve Nasıl Demlenir? Adım Adım Rehber",
    excerpt: "Mükemmel bir fincan pour over kahve hazırlamak için bilmeniz gereken her şey. Su sıcaklığından öğütme boyutuna kadar tüm detaylar.",
    content: `Pour over kahve demleme, kahvenin doğal tatlarını ve aromatik notalarını öne çıkaran zarif bir yöntemdir. Bu rehberde, evde barista kalitesinde pour over kahve hazırlamak için tüm adımları ve püf noktalarını paylaşacağız.

## Gerekli Malzemeler

- V60 veya Chemex dripper
- Kağıt filtre
- Taze öğütülmüş kahve (20g)
- Sıcak su (320ml, 92-96°C)
- Kettle (tercihen swan neck)
- Terazi
- Timer

## Adım 1: Hazırlık

Filtreyi dripper'a yerleştirin ve sıcak su ile durulayın. Bu hem filtrenin kağıt tadını giderir hem de ekipmanınızı ısıtır.

## Adım 2: Kahve Ekleme

20g taze öğütülmüş kahveyi (orta-ince) filtreye ekleyin ve yatağı düzleştirin.

## Adım 3: Bloom

İlk 40ml suyu dairesel hareketlerle dökerek tüm kahveyi ıslatın. 30-45 saniye bekleyin. Bu aşamada kahve "bloom" (kabarma) yapar - CO2 salarak aromaların açığa çıkmasını sağlar.

## Adım 4: Ana Demleme

Kalan suyu 2-3 aşamada, dairesel hareketlerle yavaşça dökün. Toplam demleme süresi 2:30 - 3:00 dakika olmalı.

## Püf Noktaları

- Su sıcaklığı çok önemli: 92-96°C ideal
- Öğütme boyutu deniz tuzu kıvamında olmalı
- Pour hızınız tutarlı olmalı
- Merkezden başlayıp daire çizerek dökün

## Sonuç

İyi demlenen bir pour over kahve parlak, temiz ve dengeli olmalı. İlk denemelerinizde mükemmel sonuç alamayabilirsiniz ama pratik yaparak kendi tarzınızı bulacaksınız!`,
    author: blogAuthor,
    category: "Demleme Rehberi",
    tags: ["Pour Over", "V60", "Demleme", "Rehber"],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    publishedAt: "2026-05-10",
    readTime: "5 dk",
    featured: true
  },
  {
    id: "2",
    slug: "kahve-saklama",
    title: "Kahve Çekirdeklerini Nasıl Saklamalı? Tazeliği Koruma Sırları",
    excerpt: "Kahve çekirdeklerinizin tazeliğini ve aromasını korumanın en etkili yolları. Doğru saklama teknikleri ile kahvenizin ömrünü uzatın.",
    content: `Kahve çekirdeklerinin tazeliği, mükemmel bir fincan için kritik öneme sahiptir. Yanlış saklama koşulları aromaların kaybolmasına ve bayatlaşmaya neden olur. İşte doğru saklama yöntemleri...

## Kahvenin Düşmanları

1. **Hava/Oksijen**: Oksidasyon kahvenin en büyük düşmanı
2. **Işık**: UV ışınları aromaları bozar
3. **Nem**: Küf ve bozulmaya sebep olur
4. **Isı**: Aromaların buharlaşmasına neden olur

## Doğru Saklama Yöntemi

### İdeal Kap
- Hava geçirmez (vakum kapaklı)
- Opak (ışık geçirmeyen)
- Seramik veya cam (plastik değil)

### İdeal Ortam
- Oda sıcaklığı (15-25°C)
- Kuru
- Karanlık (dolap içi ideal)

## Buzdolabı Miti

**Hayır, kahveyi buzdolabında saklamayın!**
Buzdolabı:
- Nemlidir
- Koku emdirir
- Sıcaklık değişimlerine neden olur

## Tazelik Süresi

- **Çekirdek**: Kavurma sonrası 2-4 hafta
- **Öğütülmüş**: Maksimum 1 hafta
- **Optimal**: İlk 2 hafta

## Pro İpuçları

1. Küçük miktarlarda satın alın
2. Demlemeden hemen önce öğütün
3. Saklama kabını günde bir kez açın
4. İlk açılıştan sonra 2 hafta içinde tüketin`,
    author: blogAuthor,
    category: "İpuçları",
    tags: ["Saklama", "Tazelik", "İpuçları"],
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop",
    publishedAt: "2026-05-08",
    readTime: "4 dk",
    featured: false
  },
  {
    id: "3",
    slug: "single-origin-vs-blend",
    title: "Single Origin vs Blend: Hangisini Seçmeli?",
    excerpt: "Tek köken ve harman kahveler arasındaki farkları keşfedin. Her birinin avantajları ve hangi durumlarda tercih edilmesi gerektiğini öğrenin.",
    content: `Kahve dünyasında iki ana kategori vardır: Single Origin (Tek Köken) ve Blend (Harman). Her birinin kendine özgü karakteristikleri ve kullanım alanları vardır.

## Single Origin (Tek Köken)

### Nedir?
Tek bir ülke, bölge hatta çiftlikten gelen kahveler.

### Özellikleri
- Belirgin terroir karakteri
- Mevsimsel çeşitlilik
- Benzersiz tat profili
- Köken hikayesi

### Avantajları
- Saf, otantik tatlar
- Şeffaflık
- Merak uyandırıcı
- Her yıl farklı nüanslar

### Dezavantajları
- Fiyat dalgalanmaları
- Mevsimsel erişilebilirlik
- Bazen dengesiz olabilir

### Kimler İçin?
- Kahve meraklıları
- Tat profili araştıranlar
- Pour over/filtre kahve severler

## Blend (Harman)

### Nedir?
Farklı kökenlerden kahvelerin dengeli bir karışımı.

### Özellikleri
- Tutarlı tat profili
- Yıl boyunca aynı kalite
- Dengeli ve yumuşak
- Karmaşık ama uyumlu

### Avantajları
- Tutarlılık
- Dengeli tat
- Ekonomik
- Espresso için ideal

### Dezavantajları
- Köken belirsizliği
- Standart tatlar
- Daha az karakteristik

### Kimler İçin?
- Espresso severler
- Sürekli aynı tadı isteyenler
- Milk coffee içenler

## Hangisini Seçmeli?

### Single Origin Seçin:
- Pour over yapıyorsanız
- Farklı tatlar denemek istiyorsanız
- Köken hikayesi önemliyse

### Blend Seçin:
- Espresso yapıyorsanız
- Sütlü kahve içiyorsanız
- Tutarlılık arıyorsanız

## Sonuç

Her ikisi de harika! Single origin keşif için, blend günlük kullanım için ideal. KAVEN'de her iki kategoriden de seçenekler sunuyoruz!`,
    author: blogAuthor,
    category: "Kahve Kültürü",
    tags: ["Single Origin", "Blend", "Karşılaştırma"],
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop",
    publishedAt: "2026-05-05",
    readTime: "6 dk",
    featured: true
  },
  {
    id: "4",
    slug: "espresso-makine-bakimi",
    title: "Espresso Makinesi Bakımı: Uzun Ömür Sırları",
    excerpt: "Espresso makinenizin performansını korumak ve ömrünü uzatmak için yapmanız gerekenler. Günlük, haftalık ve aylık bakım rutinleri.",
    content: `Espresso makineniz değerli bir yatırımdır. Doğru bakımla yıllarca mükemmel espresso çekebilirsiniz. İşte kapsamlı bakım rehberi...

## Günlük Bakım

### Her Kullanımdan Sonra
1. **Gruphead Temizliği**
   - Backflush yapın
   - Duş başını sileyin
   - Portafilter'ı temizleyin

2. **Buhar Çubuğu**
   - Her kullanımdan sonra silin
   - Kısa bir buhar püskürün
   - Süt artıklarını temizleyin

3. **Drip Tray**
   - Boşaltın
   - Yıkayın

## Haftalık Bakım

### Her Hafta
1. **Detaylı Gruphead Temizliği**
   - Temizlik tozu ile backflush
   - Duş başını sökün ve yıkayın
   - Gasket'i kontrol edin

2. **Portafilter & Sepet**
   - Kahve yağlarını temizleyin
   - Delik tıkanıklıklarını açın

3. **Buhar Çubuğu Derin Temizlik**
   - Temizlik solüsyonu kullanın
   - Uç deliklerini kontrol edin

## Aylık Bakım

### Her Ay
1. **Kireç Temizliği (Descaling)**
   - Üretici önerilerine göre
   - Özel descaling solüsyonu
   - Tam sistem yıkaması

2. **Gasket Kontrolü**
   - Aşınma kontrolü
   - Gerekirse değiştirin

3. **Basınç Kontrolü**
   - 9 bar olmalı
   - Gerekirse ayarlayın

## Suyun Önemi

### Su Filtresi
- 2-3 ayda bir değiştirin
- Su sertliğini kontrol edin
- Filtresiz kullanmayın

### Su Kalitesi
- Yumuşak su tercih edin
- Damıtık su kullanmayın
- 50-150 ppm TDS ideal

## Pro İpuçları

1. **Kaliteli Malzeme**: Orijinal temizlik ürünleri kullanın
2. **Düzenlilik**: Bakım rutinini atlamamayın
3. **Kayıt**: Bakım tarihlerini not edin
4. **Profesyonel Servis**: Yılda bir teknik servise götürün

## Uyarı İşaretleri

Şu durumlarda servis gerekebilir:
- Basınç düşüklüğü
- Sızıntı
- Garip sesler
- Ekstraksiyon problemleri

## Sonuç

Düzenli bakım hem kahve kalitesini artırır hem de makinenizin ömrünü uzatır. Günlük 5 dakikalık bakım yıllarca sorunsuz kullanım sağlar!`,
    author: blogAuthor,
    category: "Ekipman",
    tags: ["Espresso", "Makine Bakımı", "Temizlik"],
    image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&h=600&fit=crop",
    publishedAt: "2026-05-03",
    readTime: "7 dk",
    featured: false
  },
  {
    id: "5",
    slug: "kahve-tadim-notlari",
    title: "Kahve Tadım Notlarını Anlamak: Cupping 101",
    excerpt: "Profesyonel kahve tadımı (cupping) nedir? Tat notalarını nasıl ayırt edersiniz? Kahvenizi daha iyi anlamanın yolları.",
    content: `Kahve tadımı (cupping) kahvenin kalitesini değerlendirmenin profesyonel yoludur. Bu rehber ile kahvenizi daha iyi anlayacak ve tat notalarını ayırt edebileceksiniz.

## Cupping Nedir?

Cupping, kahvenin aromalarını, tatlarını ve kalitesini objektif olarak değerlendirme sürecidir. Profesyonel alıcılar, kavurucular ve Q Grader'lar bu yöntemi kullanır.

## Temel Tadım Kategorileri

### 1. Aroma
- **Koku**: Kuru çekirdek aroması
- **Fragrance**: Demleme aroması
- **Aftertaste**: Yutukt sonrası tat

### 2. Flavor (Tat)
- Meyve notaları
- Çikolata/Fındık
- Çiçeksi
- Baharatlı

### 3. Acidity (Asidite)
- Parlak
- Canlı
- Yumuşak
- Keskin

### 4. Body (Gövde)
- Hafif/Çay benzeri
- Orta
- Dolgun/Kremamsı

### 5. Balance (Denge)
- Tüm elementlerin uyumu

## Evde Cupping Nasıl Yapılır?

### Gerekli Malzemeler
- 3-5 farklı kahve örneği
- Cupping kasesi/bardakları
- Kaşık (cupping spoon)
- Sıcak su (93°C)
- Timer
- Not defteri

### Adımlar

1. **Hazırlık**
   - 8.25g kahve / 150ml su
   - Orta-kaba öğütün
   - Kuru aromaları koklayın

2. **Bloom**
   - Sıcak su ekleyin
   - 4 dakika bekleyin
   - Yüzeyi kırın ve koklayın

3. **Tadım**
   - 10-15 dakika bekleyin
   - Kaşık ile höpürdetin
   - Ağzınıza alıp tüm damağınıza yayın

4. **Değerlendirme**
   - Notlar alın
   - Skorlayın
   - Karşılaştırın

## Tat Çarkı (Flavor Wheel)

SCA Flavor Wheel kahvedeki tatları kategorize eder:

### Ana Kategoriler
1. **Meyvemsi**: Narenciye, üzümsü, tropikal
2. **Tatlı**: Vanilya, karamel, bal
3. **Fındıksı/Kakao**: Badem, fındık, çikolata
4. **Baharatlı**: Tarçın, karanfil
5. **Çiçeksi**: Yasemin, lavanta

## Tat Notlarını Geliştirme

### Pratik Yapın
- Farklı kökenler deneyin
- Yan yana karşılaştırın
- Notlar alın

### Duyularınızı Eğitin
- Farklı meyveler tadın
- Baharat kokularını tanıyın
- Çikolata çeşitlerini deneyin

### Kelime Dağarcığı
- Özel terimler öğrenin
- Tanımlamalarda kesin olun

## Yaygın Tat Profilleri

### Etiyopya
- Çiçeksi
- Narenciye
- Çay benzeri

### Kolombiya
- Karamel
- Fındık
- Dengeli

### Kenya
- Frenk üzümü
- Domates
- Şarap benzeri

## Sonuç

Tat notalarını anlamak kahve deneyiminizi zenginleştirir. Pratik yaparak damağınızı eğitebilir ve favori profillerinizi keşfedebilirsiniz!`,
    author: blogAuthor,
    category: "Kahve Kültürü",
    tags: ["Cupping", "Tadım", "Tat Notları"],
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop",
    publishedAt: "2026-04-28",
    readTime: "8 dk",
    featured: true
  },
  {
    id: "6",
    slug: "cold-brew-rehberi",
    title: "Soğuk Demleme (Cold Brew) Rehberi: Evde Nasıl Yapılır?",
    excerpt: "Pürüzsüz, tatlı ve düşük asitli cold brew kahve yapmak için eksiksiz rehber. Oranlar, süre ve püf noktaları.",
    content: `Cold brew, özellikle sıcak yaz günlerinde mükemmel bir seçenek. Düşük asitli, yumuşak ve doğal tatlı profili ile favori bir kahve türü. İşte evde nasıl yapılacağı...

## Cold Brew Nedir?

Cold brew, kahvenin soğuk su ile uzun süre (12-24 saat) demlenmesiyle elde edilen konsantredir. Sıcak su kullanılmadığı için asidite ve acılık çok daha düşüktür.

## Gerekli Malzemeler

- Kaba öğütülmüş kahve (100g)
- Filtre edilmiş soğuk su (1 litre)
- Büyük kavanoz/kap
- Filtre (kağıt/bez/French Press)
- Buzdolabı

## Adım Adım Tarif

### 1. Öğütme
- **Öğütme Boyutu**: Çok kaba (French Press'ten bile kaba)
- **Miktar**: 100g kahve / 1L su (1:10 oran)

### 2. Karıştırma
- Kahveyi kaba ekleyin
- Soğuk su ile karıştırın
- Tüm kahvenin ıslandığından emin olun

### 3. Demleme
- Oda sıcaklığında veya buzdolabında
- **Süre**: 12-24 saat
  - 12 saat: Daha hafif
  - 18-24 saat: Daha yoğun

### 4. Filtreleme
- Kağıt filtre veya bez kullanın
- Yavaşça filtreleyin
- İki kez filtreleme daha temiz sonuç

## Saklama ve Servis

### Saklama
- Hava geçirmez cam şişe
- Buzdolabında 1-2 hafta
- Dondurucu küpleri yapabilirsiniz

### Servis
Cold brew konsantre olduğu için seyreltilmeli:
- 1:1 su veya süt ile
- Buzlu
- Kremalı
- Vanilya, tarçın vb. ekleyebilirsiniz

## Değişken Oranlar

### Hafif (1:12)
- 83g kahve / 1L su
- Daha az yoğun
- Direkt içilebilir

### Standart (1:10)
- 100g kahve / 1L su
- Dengeli
- Hafif seyreltme

### Yoğun (1:8)
- 125g kahve / 1L su
- Çok konsantre
- Espresso alternatifi

## Püf Noktaları

1. **Su Kalitesi**
   - Filtrelenmiş su kullanın
   - Musluk suyu aromayı bozabilir

2. **Kahve Seçimi**
   - Orta-koyu kavurma ideal
   - Çikolata/fındık notaları iyi sonuç verir

3. **Sıcaklık**
   - Buzdolabında daha temiz
   - Oda sıcaklığında daha hızlı

4. **Karıştırma**
   - İlk 5 dakika ara ara karıştırın
   - Sonra bırakın

## Yaygın Hatalar

1. **Çok İnce Öğütme**
   - Aşırı ekstraksiyon
   - Bulanık sonuç

2. **Çok Kısa Demleme**
   - Zayıf tat
   - Ekşi profil

3. **Çok Uzun Demleme**
   - Aşırı ekstraksiyon
   - Sert tat

## Tarif Çeşitleri

### Vanilla Cold Brew
- 1 vanilya çubuğu ekleyin
- Demleme sırasında

### Cinnamon Cold Brew
- 2 tarçın çubuğu
- Daha baharatlı profil

### Chocolate Cold Brew
- Kakao pudrası ile servis
- Çikolata sirkeli kahve kullanın

## Sonuç

Cold brew yapmak kolay ama sabır gerektirir. Bir kez denerseniz yazın vazgeçilmeziniz olacak!`,
    author: blogAuthor,
    category: "Demleme Rehberi",
    tags: ["Cold Brew", "Soğuk Kahve", "Tarif"],
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop",
    publishedAt: "2026-04-25",
    readTime: "6 dk",
    featured: false
  }
];

export const blogCategories = [
  "Tümü",
  "Demleme Rehberi",
  "Kahve Kültürü",
  "İpuçları",
  "Ekipman",
  "Tarifler"
];
