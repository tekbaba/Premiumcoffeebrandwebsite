import { describe, it, expect } from "vitest";
import { getSeoForPath, getSeoForProduct } from "../seo";

describe("getSeoForPath", () => {
  it("ana sayfa için başlık döner", () => {
    const m = getSeoForPath("/");
    expect(m.title).toMatch(/KAVEN/);
    expect(m.canonical).toMatch(/https:\/\//);
    expect(m.description.length).toBeGreaterThan(20);
  });

  it("bilinmeyen yollar için 404 tarzı meta üretir", () => {
    const m = getSeoForPath("/yok-bu-sayfa");
    expect(m.title).toMatch(/bulunamadı/i);
  });
});

describe("getSeoForProduct", () => {
  it("ürün adıyla başlık oluşturur", () => {
    const m = getSeoForProduct("/product/test-id", "Etiyopya Yirgacheffe");
    expect(m.title).toContain("Etiyopya");
    expect(m.canonical).toContain("/product/test-id");
  });
});
