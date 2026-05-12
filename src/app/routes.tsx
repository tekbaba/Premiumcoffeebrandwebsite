import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { About } from "./pages/About";
import { Guide } from "./pages/Guide";
import { Contact } from "./pages/Contact";
import { BrewCalculator } from "./pages/BrewCalculator";
import { CoffeeQuiz } from "./pages/CoffeeQuiz";
import { FAQ } from "./pages/FAQ";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { NotFound } from "./pages/NotFound";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { CheckoutDemo } from "./pages/CheckoutDemo";
import {
  KargoTakipPage,
  MesafeliSatisSozlesmesiPage,
  TeslimatVeIadePage,
} from "./pages/PolicyPlaceholder";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "product/:id", Component: ProductDetail },
      { path: "about", Component: About },
      { path: "guide", Component: Guide },
      { path: "contact", Component: Contact },
      { path: "brew-calculator", Component: BrewCalculator },
      { path: "coffee-quiz", Component: CoffeeQuiz },
      { path: "faq", Component: FAQ },
      { path: "privacy-policy", Component: PrivacyPolicy },
      { path: "terms-of-service", Component: TermsOfService },
      { path: "blog", Component: Blog },
      { path: "blog/:slug", Component: BlogPost },
      { path: "checkout", Component: CheckoutDemo },
      { path: "kargo-takip", Component: KargoTakipPage },
      { path: "teslimat-ve-iade", Component: TeslimatVeIadePage },
      { path: "mesafeli-satis-sozlesmesi", Component: MesafeliSatisSozlesmesiPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
