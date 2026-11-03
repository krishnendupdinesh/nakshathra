"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Edit these                                                          */
/* ------------------------------------------------------------------ */
const BRAND = "Nakshathra"; // used for the logo's alt text and aria-label
const LOGO_SRC = "/logo.png"; // file inside the /public folder
const LOGO_WIDTH = 160; // real pixel width of your logo file
const LOGO_HEIGHT = 48; // real pixel height of your logo file

const SHOWROOMS_HREF = "/showrooms";
const WISHLIST_HREF = "/wishlist";

// Scrolling messages in the thin strip above the main bar (hidden on scroll).
const ANNOUNCEMENTS = [
  "Free insured delivery across India",
  "BIS hallmarked",
  "Prices include GST",
  "Same making charge as our showrooms",
  "Lifetime exchange at 35+ Nakshathra showrooms",
];

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections", dropdown: true },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Items inside the Collections panel. Add or remove freely.
const COLLECTIONS = [
  { label: "All Jewellery", note: "Every piece in one place", href: "/collections/all" },
  { label: "Nose Pins", note: "Delicate, everyday studs", href: "/collections/nose-pins" },
  { label: "Hand Chains", note: "Fine chains for the wrist", href: "/collections/hand-chains" },
  { label: "Diamond", note: "Pieces set with diamonds", href: "/collections/diamond" },
];

// Quick links shown under the search box
const POPULAR_SEARCHES = ["Nose pins", "Hand chains", "Diamond", "Gold chains"];

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const SearchIcon = () => (
  <svg {...iconProps}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
);

const UserIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20c1-3.6 4-5.5 7.5-5.5s6.5 1.9 7.5 5.5" />
  </svg>
);

const BagIcon = () => (
  <svg {...iconProps}>
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 8V7a3 3 0 016 0v1" />
  </svg>
);

const HeartIcon = () => (
  <svg {...iconProps}>
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.3a4.3 4.3 0 017.5 2.5C19.5 15.4 12 20 12 20z" />
  </svg>
);

const PinIcon = ({ size = 20 }: { size?: number }) => (
  <svg {...iconProps} width={size} height={size}>
    <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const Badge = ({ count }: { count: number }) =>
  count > 0 ? (
    <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#d4b678] px-1 text-[10px] font-semibold text-[#031c15]">
      {count}
    </span>
  ) : null;

/* ------------------------------------------------------------------ */
/* Shared classes                                                      */
/* ------------------------------------------------------------------ */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4b678]";

const iconBtn = `relative grid h-9 w-9 place-items-center rounded-full text-[#efe6d2] transition-colors hover:text-[#d4b678] sm:h-10 sm:w-10 ${focusRing}`;

// Desktop nav link with a gold underline that grows from the centre
const navLink = (active: boolean) =>
  `relative py-2 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors ${focusRing} after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:bg-[#d4b678] after:transition-transform after:duration-300 ${
    active
      ? "text-[#d4b678] after:scale-x-100"
      : "text-[#efe6d2] after:scale-x-0 hover:text-[#d4b678] hover:after:scale-x-100"
  }`;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function Header({
  cartCount = 0,
  wishlistCount = 0,
}: {
  cartCount?: number;
  wishlistCount?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCollections, setMobileCollections] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Compact the header after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything when the route changes
  useEffect(() => {
    setMobileOpen(false);
    setCollectionsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Close the collections panel on outside click, and everything on Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setCollectionsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCollectionsOpen(false);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Focus the search box when it opens
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-[#0a2e24] text-[#efe6d2] transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          : "shadow-[0_6px_24px_rgba(0,0,0,0.2)]"
      }`}
    >
      <style>{`
        @keyframes nk-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .nk-marquee {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
        }
        .nk-marquee-track { animation: nk-marquee 45s linear infinite; }
        .nk-marquee:hover .nk-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .nk-marquee-track { animation: none; }
        }
      `}</style>

      {/* ---------------- Top strip ---------------- */}
      <div
        className={`overflow-hidden bg-[#0a2e24] shadow-[inset_0_-1px_0_rgba(212,182,120,0.18)] transition-[max-height,opacity,visibility] duration-300 ${
          scrolled ? "invisible max-h-0 opacity-0" : "visible max-h-9 opacity-100"
        }`}
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center gap-5 px-4 text-[11px] uppercase tracking-[0.18em] lg:px-8">
          <Link
            href={SHOWROOMS_HREF}
            className={`hidden shrink-0 items-center gap-2 border-r border-[#d4b678]/25 pr-5 text-[#d4b678] transition-colors hover:text-[#e9d6a6] sm:inline-flex ${focusRing}`}
          >
            <PinIcon size={14} />
            Find a Store
          </Link>

          {/* Scrolling messages: pauses on hover, static for reduced motion */}
          <div className="nk-marquee min-w-0 flex-1 overflow-hidden">
            <div className="nk-marquee-track flex w-max">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex shrink-0 items-center"
                >
                  {ANNOUNCEMENTS.map((text) => (
                    <li key={text} className="flex items-center whitespace-nowrap">
                      <span className="text-[#efe6d2]/80">{text}</span>
                      <span
                        aria-hidden="true"
                        className="mx-6 h-1 w-1 rotate-45 bg-[#d4b678]"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Main row ---------------- */}
      <div
        className={`mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-stretch px-4 transition-[height] duration-300 lg:px-8 ${
          scrolled ? "h-14 lg:h-16" : "h-16 lg:h-20"
        }`}
      >
        {/* Left: menu button (mobile) + logo */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={`${iconBtn} -ml-2 lg:hidden`}
          >
            <svg {...iconProps}>
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>

          <Link
            href="/"
            aria-label={`${BRAND} home`}
            className={`flex shrink-0 items-center ${focusRing}`}
          >
            <Image
              src={LOGO_SRC}
              alt={BRAND}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              priority
              className={`w-auto transition-[height] duration-300 ${
                scrolled ? "h-8 lg:h-10" : "h-10 lg:h-14"
              }`}
            />
          </Link>
        </div>

        {/* Center: desktop nav */}
        <div className="flex items-stretch">
          <nav
            aria-label="Main"
            className="hidden items-stretch gap-6 xl:gap-9 lg:flex"
          >
            {NAV_LINKS.map(({ label, href, dropdown }) =>
              dropdown ? (
                <div
                  key={href}
                  ref={dropdownRef}
                  className="flex items-center"
                  onMouseEnter={() => {
                    setCollectionsOpen(true);
                    setSearchOpen(false);
                  }}
                  onMouseLeave={() => setCollectionsOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setCollectionsOpen((v) => !v);
                      setSearchOpen(false);
                    }}
                    aria-expanded={collectionsOpen}
                    aria-haspopup="true"
                    aria-controls="collections-menu"
                    className={`${navLink(isActive(href) || collectionsOpen)} inline-flex items-center gap-2`}
                  >
                    {label}
                    <Chevron open={collectionsOpen} />
                  </button>

                  {/* Full-width collections panel */}
                  <div
                    id="collections-menu"
                    className={`absolute inset-x-0 top-full border-y border-[#d4b678]/20 bg-[#0a2e24] shadow-[0_24px_50px_rgba(0,0,0,0.45)] transition duration-300 ${
                      collectionsOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10 px-8 py-10">
                      <div className="col-span-4">
                        <p className="font-serif text-3xl text-[#e9d6a6]">
                          Collections
                        </p>
                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#efe6d2]/75">
                          Find the piece that fits the occasion.
                        </p>
                        <Link
                          href="/collections/all"
                          className={`mt-6 inline-block border-b border-[#d4b678]/60 pb-1 text-[12px] uppercase tracking-[0.2em] text-[#d4b678] transition-colors hover:text-[#e9d6a6] ${focusRing}`}
                        >
                          View all jewellery
                        </Link>
                      </div>

                      <ul className="col-span-8 grid grid-cols-2 gap-4">
                        {COLLECTIONS.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={`group block rounded-lg border p-5 transition-colors hover:border-[#d4b678]/50 hover:bg-white/[0.03] ${focusRing} ${
                                pathname === item.href
                                  ? "border-[#d4b678]/50"
                                  : "border-[#d4b678]/15"
                              }`}
                            >
                              <span className="block font-serif text-xl text-[#efe6d2] transition-colors group-hover:text-[#e9d6a6]">
                                {item.label}
                              </span>
                              <span className="mt-1 block text-sm text-[#efe6d2]/75">
                                {item.note}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className="flex items-center"
                >
                  <span className={navLink(isActive(href))}>{label}</span>
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Right: icons */}
        <div className="flex items-center justify-end gap-0.5 sm:gap-1.5">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((v) => !v);
              setCollectionsOpen(false);
            }}
            aria-expanded={searchOpen}
            aria-controls="search-panel"
            aria-label="Search"
            className={iconBtn}
          >
            <SearchIcon />
          </button>

          <Link
            href={WISHLIST_HREF}
            aria-label={`Wishlist, ${wishlistCount} item${wishlistCount === 1 ? "" : "s"}`}
            className={iconBtn}
          >
            <HeartIcon />
            <Badge count={wishlistCount} />
          </Link>

          <Link
            href="/account"
            aria-label="Account"
            className={`${iconBtn} hidden sm:grid`}
          >
            <UserIcon />
          </Link>

          <Link
            href="/cart"
            aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            className={`${iconBtn} -mr-1.5 lg:mr-0`}
          >
            <BagIcon />
            <Badge count={cartCount} />
          </Link>
        </div>
      </div>

      {/* ---------------- Search panel ---------------- */}
      <div
        id="search-panel"
        className={`overflow-hidden bg-[#0a2e24] transition-[max-height] duration-300 ${
          searchOpen ? "max-h-48 border-t border-[#d4b678]/15" : "max-h-0"
        }`}
      >
        <div className="mx-auto max-w-3xl px-4 py-6 md:px-8">
          <form onSubmit={submitSearch} role="search" className="flex items-end gap-4">
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rings, chains, nose pins…"
              tabIndex={searchOpen ? 0 : -1}
              className="w-full border-b border-[#d4b678]/40 bg-transparent pb-2 font-serif text-xl text-[#efe6d2] placeholder:text-[#efe6d2]/75 focus:border-[#d4b678] focus:outline-none"
            />
            <button
              type="submit"
              tabIndex={searchOpen ? 0 : -1}
              className={`shrink-0 rounded-full border border-[#d4b678]/60 px-6 py-2 text-[12px] uppercase tracking-[0.2em] text-[#e9d6a6] transition-colors hover:bg-[#d4b678] hover:text-[#031c15] ${focusRing}`}
            >
              Search
            </button>
          </form>

          <ul className="mt-4 flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((term) => (
              <li key={term}>
                <Link
                  href={`/search?q=${encodeURIComponent(term)}`}
                  tabIndex={searchOpen ? 0 : -1}
                  className={`block rounded-full border border-[#d4b678]/25 px-4 py-1.5 text-[12px] tracking-wide text-[#efe6d2]/80 transition-colors hover:border-[#d4b678] hover:text-[#d4b678] ${focusRing}`}
                >
                  {term}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------------- Mobile menu ---------------- */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="max-h-[75dvh] overflow-y-auto border-t border-[#d4b678]/20 bg-[#0a2e24] px-6 pb-6 pt-2 lg:hidden"
        >
          <ul className="divide-y divide-[#d4b678]/10">
            {NAV_LINKS.map(({ label, href, dropdown }) => (
              <li key={href}>
                {dropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setMobileCollections((v) => !v)}
                      aria-expanded={mobileCollections}
                      className="flex w-full items-center justify-between py-4 font-serif text-xl text-[#efe6d2]"
                    >
                      {label}
                      <Chevron open={mobileCollections} />
                    </button>
                    {mobileCollections && (
                      <ul className="pb-3 pl-4">
                        {COLLECTIONS.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block py-2.5 text-sm text-[#efe6d2]/80 hover:text-[#d4b678]"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={`block py-4 font-serif text-xl ${
                      isActive(href) ? "text-[#d4b678]" : "text-[#efe6d2]"
                    }`}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-6 border-t border-[#d4b678]/20 pt-5 text-[12px] uppercase tracking-[0.2em] text-[#d4b678]">
            <Link href={SHOWROOMS_HREF} className="inline-flex items-center gap-2">
              <PinIcon size={16} />
              Find a Store
            </Link>
            <Link href="/account" className="inline-flex items-center gap-2 sm:hidden">
              <UserIcon />
              Account
            </Link>
          </div>
        </nav>
      )}

      {/* Gold hairline with a small diamond ornament */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d4b678]/60 to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rotate-45 bg-[#d4b678]"
      />
    </header>
  );
}
