import { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Edit these                                                          */
/* ------------------------------------------------------------------ */
const WHATSAPP_NUMBER = "919846362916"; // digits only, with country code
const PREFILLED_MESSAGE = "Hi Nakshathra, I'd like to know more about your jewellery.";

const WhatsAppIcon = (): ReactNode => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3.5a8.5 8.5 0 00-7.3 12.9L3.5 20.5l4.2-1.1A8.5 8.5 0 1012 3.5z" />
    <path d="M9.2 8.6c-.3.4-.5 1-.3 1.7.5 1.8 2.3 3.7 4.3 4.4.7.2 1.3 0 1.7-.4l.5-.7-1.9-1-.7.6c-.9-.4-1.7-1.2-2.1-2.1l.6-.7-.9-1.9-.7.1z" />
  </svg>
);

/**
 * Floating WhatsApp button. Add it once in app/layout.tsx so it shows on every page.
 * Icon only on phones, icon + label from the `sm` breakpoint up.
 */
export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    PREFILLED_MESSAGE
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-4 z-40 inline-flex h-14 w-14 items-center justify-center gap-2.5 rounded-full bg-[#d4b678] text-[#031c15] shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-colors hover:bg-[#e9d6a6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4b678] sm:right-6 sm:h-auto sm:w-auto sm:px-5 sm:py-3.5"
    >
      <WhatsAppIcon />
      <span className="hidden text-[12px] font-semibold uppercase tracking-[0.2em] sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
