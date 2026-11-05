"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react"; // npm i qrcode.react

/* ------------------------------------------------------------------ */
/* Edit these                                                          */
/* ------------------------------------------------------------------ */
const BRAND = "Nakshathra";
const LOGO_SRC = "/logo.png"; // file inside the /public folder
const LOGO_WIDTH = 160; // real pixel width of your logo file
const LOGO_HEIGHT = 48; // real pixel height of your logo file

// Background image for the app download card (file inside /public)
const APP_CARD_BG = "/home.jpeg";

// The QR code encodes APP_URL. Use one link that sends iPhone users to the
// App Store and Android users to Google Play (a smart link / landing page).
const APP_URL = "https://nakshathra.com/app";
const APP_STORE_URL = "https://apps.apple.com/"; // replace with your app's page
const PLAY_STORE_URL = "https://play.google.com/store"; // replace with your app's page

const WHATSAPP_NUMBER = "919846362916"; // digits only, with country code
const WHATSAPP_DISPLAY = "+91 98463 62916";

const SHOP_LINKS = [
  { label: "All jewellery", href: "/collections/all" },
  { label: "Nose pins", href: "/collections/nose-pins" },
  { label: "Hand chains", href: "/collections/hand-chains" },
  { label: "Diamond jewellery", href: "/collections/diamond" },
  { label: "Wishlist", href: "/wishlist" },
];

const HELP_LINKS = [
  { label: "Track my order", href: "/track-order" },
  { label: "Shipping & delivery", href: "/shipping" },
  { label: "Returns & exchange", href: "/returns" },
  { label: "Size guide", href: "/size-guide" },
  { label: "Contact us", href: "/contact" },
];

const COMPANY_LINKS = [
  { label: "Our story", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Showrooms", href: "/showrooms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/shamna__nakshathra?vrfl=MWM4em9uajBsbHZjMg==", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/Shmananakshathra", icon: "facebook" },
  { label: "TikTok", href: "https://tiktok.com/", icon: "tiktok" },
  { label: "YouTube", href: "https://youtube.com/@nakshathrashamna?si=wrHrOMfKS6rDk_r9", icon: "youtube" },
] as const;

const INSTAGRAM_FOUNDER_HREF = "https://www.instagram.com/shamna__nakshathra?vrfl=MWM4em9uajBsbHZjMg=="; // "Follow Shamna" link

const LEGAL_LINES = [
  "Nakshathra Gold and Diamond LLP",
  "GSTIN 32AAVFN2013P1ZZ",
  "BIS Hallmark Reg. HM/C-6490566120",
  "Kochi, Kerala",
];

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

const SocialIcon = ({ name }: { name: (typeof SOCIALS)[number]["icon"] }) => {
  switch (name) {
    case "instagram":
      return (
        <svg {...iconProps}>
          <rect x="4" y="4" width="16" height="16" rx="4.5" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...iconProps}>
          <path d="M14 8.5h2V5.5h-2.4A3.6 3.6 0 0010 9.1V11H8v3h2v5.5h3V14h2.3l.5-3H13V9.4c0-.5.4-.9 1-.9z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...iconProps}>
          <path d="M13.5 4v10.2a3 3 0 11-3-3" />
          <path d="M13.5 4c.3 2.3 1.9 3.9 4.5 4.1" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...iconProps}>
          <rect x="3" y="6" width="18" height="12" rx="3.5" />
          <path d="M10.5 9.5v5l4.3-2.5-4.3-2.5z" />
        </svg>
      );
  }
};

const PhoneIcon = () => (
  <svg {...iconProps} width={18} height={18}>
    <rect x="7" y="3" width="10" height="18" rx="2.5" />
    <path d="M11 18h2" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4b678]";

const Diamond = ({ className = "" }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={`inline-block h-1 w-1 rotate-45 bg-[#d4b678] ${className}`}
  />
);

const ColumnTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-6 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.24em] text-[#d4b678]">
    <Diamond />
    {children}
  </h3>
);

const FooterLinks = ({
  links,
}: {
  links: { label: string; href: string }[];
}) => (
  <ul className="space-y-3.5">
    {links.map((l) => (
      <li key={l.href}>
        <Link
          href={l.href}
          className={`text-[15px] text-[#efe6d2]/80 transition-colors hover:text-[#d4b678] ${focusRing}`}
        >
          {l.label}
        </Link>
      </li>
    ))}
  </ul>
);

const StoreButton = ({
  href,
  small,
  big,
}: {
  href: string;
  small: string;
  big: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group inline-flex items-center gap-3 rounded-xl border border-[#d4b678]/40 bg-[#021510]/40 px-5 py-3 text-[#efe6d2] backdrop-blur-sm transition-colors hover:border-[#d4b678] hover:bg-[#d4b678]/10 ${focusRing}`}
  >
    <span className="text-[#d4b678]">
      <PhoneIcon />
    </span>
    <span className="flex flex-col leading-tight">
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#efe6d2]/70">
        {small}
      </span>
      <span className="font-serif text-lg">{big}</span>
    </span>
  </a>
);

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function Footer() {
  // Static year for the prerender, updated to the real year in the browser
  const [year, setYear] = useState(2026);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-gradient-to-b from-[#04241b] to-[#021510] text-[#efe6d2]">
      {/* Gold hairline with a diamond, echoing the header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4b678]/60 to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#d4b678]"
      />

      <div className="mx-auto max-w-7xl px-4 pb-28 pt-16 md:px-8 md:pb-16">
        {/* ------------------ App download panel ------------------ */}
        <section
          aria-labelledby="app-heading"
          className="relative isolate overflow-hidden rounded-2xl border border-[#d4b678]/25 bg-[#04241b] p-8 md:p-12"
        >
          {/* Silk background image */}
          <Image
            src={APP_CARD_BG}
            alt=""
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="-z-20 object-cover"
            aria-hidden="true"
          />

          {/* Dark overlay keeps text readable and ties into the footer colours */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-br from-[#04241b]/70 via-[#04241b]/50 to-[#021510]/80"
          />

          {/* Content sits above the image and overlay */}
          <div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2
                id="app-heading"
                className="font-serif text-3xl leading-tight text-[#e9d6a6] md:text-4xl"
              >
                Download the {BRAND} app
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#efe6d2]/85">
                Browse the collections, save your wishlist and find your nearest
                showroom from your phone.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <StoreButton
                  href={APP_STORE_URL}
                  small="Download on the"
                  big="App Store"
                />
                <StoreButton
                  href={PLAY_STORE_URL}
                  small="Get it on"
                  big="Google Play"
                />
              </div>
            </div>

            {/* QR code: hidden on phones, where scanning your own screen is no use */}
            <div className="hidden shrink-0 flex-col items-center gap-3 md:flex">
              <div className="rounded-2xl border border-[#d4b678]/50 bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                <QRCodeSVG
                  value={APP_URL}
                  size={136}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#031c15"
                  title={`Scan to download the ${BRAND} app`}
                />
              </div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#efe6d2]/80">
                Scan to download
              </p>
            </div>
          </div>
        </section>

        {/* ------------------ Main columns ------------------ */}
        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              href="/"
              aria-label={`${BRAND} home`}
              className={`inline-block ${focusRing}`}
            >
              <Image
                src={LOGO_SRC}
                alt={BRAND}
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-[#efe6d2]/75">
              Founded by Shamna Shanavas in 2012. Lightweight gold and certified
              diamonds in 35+ showrooms across seven countries.
            </p>
            <a
              href={INSTAGRAM_FOUNDER_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-5 inline-block border-b border-[#d4b678]/50 pb-0.5 text-[15px] text-[#e9d6a6] transition-colors hover:text-[#d4b678] ${focusRing}`}
            >
              Follow Shamna on Instagram
            </a>

            <ul className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`grid h-11 w-11 place-items-center rounded-full border border-[#d4b678]/30 text-[#efe6d2] transition-colors hover:border-[#d4b678] hover:bg-[#d4b678] hover:text-[#031c15] ${focusRing}`}
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Shop">
            <ColumnTitle>Shop</ColumnTitle>
            <FooterLinks links={SHOP_LINKS} />
          </nav>

          <nav aria-label="Help">
            <ColumnTitle>Help</ColumnTitle>
            <FooterLinks links={HELP_LINKS} />
          </nav>

          <nav aria-label="Company" className="col-span-2 md:col-span-1">
            <ColumnTitle>Company</ColumnTitle>
            <FooterLinks links={COMPANY_LINKS} />
          </nav>

          {/* Talk to us */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <ColumnTitle>Talk to us</ColumnTitle>
            <ul className="space-y-4 text-[15px]">
              <li>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-[#efe6d2]/50">
                  WhatsApp
                </span>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  className={`text-[#efe6d2] transition-colors hover:text-[#d4b678] ${focusRing}`}
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-[#efe6d2]/50">
                  Email
                </span>
                <a
                  href="mailto:info@nakshathra.com"
                  className={`text-[#efe6d2] transition-colors hover:text-[#d4b678] ${focusRing}`}
                >
                  info@nakshathra.com
                </a>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-[#efe6d2]/50">
                  GCC office
                </span>
                <a
                  href="tel:+971521089916"
                  className={`text-[#efe6d2]/80 transition-colors hover:text-[#d4b678] ${focusRing}`}
                >
                  +971 52 108 9916
                </a>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-[#efe6d2]/50">
                  India office
                </span>
                <a
                  href="tel:+919846368916"
                  className={`text-[#efe6d2]/80 transition-colors hover:text-[#d4b678] ${focusRing}`}
                >
                  +91 98463 68916
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ------------------ Legal ------------------ */}
        <div className="mt-14 border-t border-[#d4b678]/15 pt-8 text-[13px] leading-relaxed text-[#efe6d2]/60">
          <p>
            © {year} Nakshathra Gold &amp; Diamonds. All
            rights reserved.
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            {LEGAL_LINES.map((line, i) => (
              <li key={line} className="flex items-center gap-4">
                {i > 0 && <Diamond />}
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
