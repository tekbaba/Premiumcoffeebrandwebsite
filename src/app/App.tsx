import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./routes";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { Toaster } from "sonner";

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
          <Toaster
            position="top-right"
            closeButton
            duration={3200}
            toastOptions={{
              style: {
                background: "var(--cream)",
                color: "var(--espresso)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xl)",
                fontSize: "14px",
                maxWidth: "min(360px, calc(100vw - 2rem))",
              },
              className: "toaster-custom",
            }}
            richColors
          />
      </WishlistProvider>
    </CartProvider>
    </HelmetProvider>
  );
}