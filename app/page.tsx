/* ------------------------------------------------------------------ */
/* Edit these                                                          */
/* ------------------------------------------------------------------ */
const EYEBROW = "Our promise";
const HEADING = "Made to be trusted";
const INTRO = "Six assurances that come with every piece you take home.";

// Silk texture from /public, laid under a dark green wash so text stays clear
const CARD_BG =
  "linear-gradient(135deg, rgba(4,36,27,0.86), rgba(2,21,16,0.95)), url('/home.jpeg')";

type IconName = "gem" | "seal" | "exchange" | "return" | "package" | "shield";

// Keep the wording to what you can honestly stand behind.
// `place` positions each card on wide screens (xl and up): column, row,
// side-to-side alignment and a vertical nudge, so they feel scattered.
// `flow` handles phones and tablets: side margins and a tablet offset.
const PROMISES: {
  icon: IconName;
  title: string;
  text: string;
  flow: string;
  place: string;
}[] = [
  {
    icon: "gem",
    title: "Certified natural diamonds",
    text: "Every diamond comes with its grading certificate.",
    flow: "mr-6 md:mr-0",
    place: "xl:col-start-1 xl:row-start-1 xl:justify-self-start xl:translate-y-2",
  },
  {
    icon: "seal",
    title: "BIS hallmarked gold",
    text: "Hallmarked for purity, so you know what you are wearing.",
    flow: "ml-6 md:ml-0 md:translate-y-8",
    place: "xl:col-start-1 xl:row-start-2 xl:justify-self-end xl:translate-y-6",
  },
  {
    icon: "exchange",
    title: "Lifetime exchange",
    text: "Exchange your piece at any Nakshathra showroom.",
    flow: "mr-6 md:mr-0",
    place: "xl:col-start-1 xl:row-start-3 xl:justify-self-start xl:translate-y-0",
  },
  {
    icon: "return",
    title: "30-day returns",
    text: "Changed your mind? Return it within 30 days. Terms apply.",
    flow: "ml-6 md:ml-0 md:translate-y-8",
    place: "xl:col-start-3 xl:row-start-1 xl:justify-self-end xl:translate-y-10",
  },
  {
    icon: "package",
    title: "Free shipping",
    text: "Insured delivery to your door at no extra cost.",
    flow: "mr-6 md:mr-0",
    place: "xl:col-start-3 xl:row-start-2 xl:justify-self-start xl:translate-y-4",
  },
  {
    icon: "shield",
    title: "One-year warranty",
    text: "Covered against manufacturing defects for a full year.",
    flow: "ml-6 md:ml-0 md:translate-y-8",
    place: "xl:col-start-3 xl:row-start-3 xl:justify-self-end xl:translate-y-8",
  },
];

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
const Icon = ({ name }: { name: IconName }) => {
  const paths: Record<IconName, React.ReactNode> = {
    gem: (
      <>
        <path d="M6 4h12l3 5-9 11L3 9z" />
        <path d="M3 9h18M9 4l-1.5 5L12 20M15 4l1.5 5L12 20" />
      </>
    ),
    seal: (
      <>
        <path d="M12 3l2.4 1.8 3 .1.9 2.9 2.3 1.9-1 2.8 1 2.8-2.3 1.9-.9 2.9-3 .1L12 21l-2.4-1.8-3-.1-.9-2.9-2.3-1.9 1-2.8-1-2.8 2.3-1.9.9-2.9 3-.1z" />
        <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
      </>
    ),
    exchange: <path d="M4 8h14l-3-3M20 16H6l3 3" />,
    return: (
      <>
        <path d="M5 12a7 7 0 107-7H7" />
        <path d="M9.5 2.5L7 5l2.5 2.5" />
      </>
    ),
    package: (
      <>
        <path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z" />
        <path d="M3 7.5l9 4.5 9-4.5M12 12v9" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  };
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <section
      aria-labelledby="promise-heading"
      className="relative overflow-hidden bg-[#f1ece2] px-4 py-20 text-[#031c15] md:px-8 md:py-28"
    >
      <div className="relative mx-auto grid max-w-7xl gap-5 md:grid-cols-2 md:gap-x-6 xl:grid-cols-[1fr_22rem_1fr] xl:grid-rows-3 xl:gap-x-8 xl:gap-y-8">
        {/* Heading, centred between the two card columns */}
        <div className="relative mb-6 text-center md:col-span-2 md:mb-10 xl:col-span-1 xl:col-start-2 xl:row-span-3 xl:row-start-1 xl:mb-0 xl:self-center">
          {/* Gold diamond outlines behind the heading (wide screens) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#b8955a]/30 xl:block"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-60 w-60 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#b8955a]/15 xl:block"
          />

          <div className="relative">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8a6d3b]">
              {EYEBROW}
            </p>
            <h2
              id="promise-heading"
              className="mt-4 font-serif text-4xl leading-tight md:text-5xl"
            >
              {HEADING}
            </h2>
            <p className="mx-auto mt-5 max-w-[15rem] text-[15px] leading-relaxed text-[#031c15]/65">
              {INTRO}
            </p>
          </div>
        </div>

        {/* Promise cards */}
        {PROMISES.map((p) => (
          <article
            key={p.title}
            style={{ backgroundImage: CARD_BG, backgroundSize: "cover" }}
            className={`group relative w-full overflow-hidden rounded-2xl border border-[#d4b678]/35 p-7 text-[#efe6d2] shadow-[0_18px_40px_rgba(3,28,21,0.25)] transition-[border-color,box-shadow] duration-300 hover:border-[#d4b678] hover:shadow-[0_22px_50px_rgba(3,28,21,0.4)] xl:max-w-[19rem] ${p.flow} ${p.place}`}
          >
            {/* Inner gold hairline frame */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-xl border border-[#d4b678]/15"
            />

            <div className="relative">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[#d4b678]/40 text-[#d4b678] transition-colors duration-300 group-hover:bg-[#d4b678] group-hover:text-[#031c15]">
                <Icon name={p.icon} />
              </span>
              <h3 className="mt-5 font-serif text-[22px] leading-snug text-[#e9d6a6]">
                {p.title}
              </h3>
              <span
                aria-hidden="true"
                className="mt-3 block h-px w-10 bg-gradient-to-r from-[#d4b678] to-transparent"
              />
              <p className="mt-3 text-[14px] leading-relaxed text-[#efe6d2]/80">
                {p.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
