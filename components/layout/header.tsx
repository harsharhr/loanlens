"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search as SearchIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { CalculatorSearch } from "@/components/search/calculator-search";
import { CATEGORIES, calculatorsByCategory } from "@/lib/calculators/registry";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className="sticky top-0 z-40 border-b transition-shadow"
      style={{
        background: "color-mix(in srgb, var(--surface) 88%, transparent)",
        backdropFilter: "saturate(140%) blur(8px)",
        borderColor: "var(--border)",
        boxShadow: scrolled ? "0 1px 12px rgba(15,23,42,0.06)" : "none",
      }}
    >
      <div className="container-page flex items-center justify-between h-16 gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-3 py-2 rounded text-[15px] font-semibold text-ink-secondary hover:text-brand hover:bg-brand-soft transition-colors focusable"
              aria-expanded={megaOpen}
              aria-haspopup="true"
              onClick={() => setMegaOpen((v) => !v)}
            >
              Finance <ChevronDown size={16} className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />
            </button>

            {megaOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                <div className="card shadow-elevated p-5 w-[640px] grid grid-cols-2 gap-x-6 gap-y-1">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id} className="py-1">
                      <Link
                        href={`/finance#${cat.id}`}
                        className="block text-xs font-bold uppercase tracking-wide text-brand mb-1 hover:underline"
                      >
                        {cat.label}
                      </Link>
                      <ul>
                        {calculatorsByCategory(cat.id).map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/finance/${c.slug}`}
                              className="block py-1 text-sm text-ink-secondary hover:text-brand transition-colors"
                            >
                              {c.title.replace(" Calculator", "")}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-2 mt-2 pt-3 border-t">
                    <Link href="/finance" className="link text-sm inline-flex items-center gap-1">
                      Browse all finance calculators →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="px-3 py-2 rounded text-[15px] font-semibold text-ink-secondary hover:text-brand hover:bg-brand-soft transition-colors focusable"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop inline search */}
          <div className="hidden lg:block w-72">
            <CalculatorSearch placeholder="Search calculators…" suggestions />
          </div>
          {/* Compact search trigger (tablet) */}
          <button
            className="lg:hidden btn btn-ghost btn-sm"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Toggle search"
          >
            <SearchIcon size={18} />
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden btn btn-ghost btn-sm"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Tablet search drawer */}
      {searchOpen && (
        <div className="lg:hidden border-t bg-surface">
          <div className="container-page py-3">
            <CalculatorSearch autoFocus />
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/30" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-surface shadow-elevated overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <Logo compact />
              <button className="btn btn-ghost btn-sm" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <CalculatorSearch autoFocus />
            </div>
            <nav className="px-4 pb-8" aria-label="Mobile">
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="py-2 border-t first:border-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand mb-1.5 mt-2">{cat.label}</p>
                  <ul className="grid grid-cols-1">
                    {calculatorsByCategory(cat.id).map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/finance/${c.slug}`}
                          className="block py-2 text-[15px] text-ink-secondary hover:text-brand"
                          onClick={() => setMobileOpen(false)}
                        >
                          {c.title.replace(" Calculator", "")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link
                href="/finance"
                className="btn btn-primary w-full mt-4"
                onClick={() => setMobileOpen(false)}
              >
                All finance calculators
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
