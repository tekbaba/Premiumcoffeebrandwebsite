import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { LiveChatWidget } from "./LiveChatWidget";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { BackToTop } from "./BackToTop";
import { SeoHead } from "./SeoHead";

export function Root() {
  return (
    <div className="flex min-h-screen min-h-dvh flex-col overflow-x-hidden bg-[var(--cream)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-[calc(var(--announcement-offset)+var(--spacing-3))] focus:z-[60] focus:rounded-md focus:bg-[var(--espresso)] focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
      >
        İçeriğe atla
      </a>
      <ScrollToTop />
      <SeoHead />
      <AnnouncementBanner />
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <LiveChatWidget />
      <BackToTop />
    </div>
  );
}
