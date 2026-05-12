import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Footer } from "../Footer";

function renderFooter() {
  return render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
}

describe("Footer", () => {
  it("marka bilgisini ve yasal bağlantıları gösterir", () => {
    renderFooter();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText(/Kahve severler için bir sığınak/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /gizlilik politikası/i })).toHaveAttribute(
      "href",
      "/privacy-policy"
    );
  });

  it("Tasarım Sistemi bağlantısı içermez", () => {
    renderFooter();
    expect(screen.queryByRole("link", { name: /tasarım sistemi/i })).not.toBeInTheDocument();
  });
});
