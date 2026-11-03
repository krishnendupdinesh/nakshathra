/* ------------------------------------------------------------------ */
/* Edit these                                                          */
/* ------------------------------------------------------------------ */
const EYEBROW = "Our promise";
const HEADING = "Made to be trusted";
const INTRO = "Six assurances that come with every piece you take home.";

// Silk texture from /public under a dark green wash (edit the 0.x values to
// show more or less of the silk)
const SECTION_BG =
  "linear-gradient(180deg, rgba(3,28,21,0.93), rgba(2,21,16,0.97)), url('/home.jpeg')";
const CARD_BG =
  "linear-gradient(180deg, rgba(10,61,47,0.72), rgba(4,36,27,0.92)), url('/home.jpeg')";

type IconName = "gem" | "seal" | "exchange" | "return" | "package" | "shield";

// Keep the wording to what you can honestly stand behind.
// `drop` is how far each card hangs from the chain on wide screens.
const PROMISES: {
  icon: IconName;
  title: string;
  text: string;
  drop: string;
}[] = [
  {
    icon: "gem",
    title: "Certified natural diamonds",
    text: "Every diamond comes with its grading certificate.",
    drop: "xl:h-6",
  },
  {
    icon: "seal",
    title: "BIS hallmarked gold",
    text: "Hallmarked for purity, so you know what you are wearing.",
    drop: "xl:h-20",
  },
  {
    icon: "exchange",
    title: "Lifetime exchange",
    text: "Exchange your piece at any Nakshathra showroom.",
    drop: "xl:h-6",
  },
  {
    icon: "return",
    title: "30-day returns",
    text: "Changed your mind? Return it within 30 days. Terms apply.",
    drop: "xl:h-20",
  },
  {
    icon: "package",
    title: "Free shipping",
    text: "Insured delivery to your door at no extra cost.",
    drop: "xl:h-6",
  },
  {
    icon: "shield",
    title: "One-year warranty",
    text: "Covered against manufacturing defects for a full year.",
    drop: "xl:h-20",
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

/* One scallop of the chain. Six of them side by side make a garland. */
const ChainSwag = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 100 20"
    preserveAspectRatio="none"
    className="block h-5 w-full overflow-visible text-[#d4b678] sm:h-6"
  >
    <path
      d="M0 0 Q50 40 100 0"
      fill="none"
      stroke="currentColor"
      strokeOpacity="0.35"
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
    />
    <path
      d="M0 0 Q50 40 100 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="0.1 6"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <section
      aria-labelledby="promise-heading"
      style={{ backgroundImage: SECTION_BG, backgroundSize: "cover" }}
      className="relative overflow-hidden bg-[#031c15] px-4 py-20 text-[#efe6d2] md:px-8 md:py-28"
    >
      {/* Heading */}
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#d4b678]">
          {EYEBROW}
        </p>
        <h2
          id="promise-heading"
          className="mt-4 font-serif text-4xl leading-tight text-[#e9d6a6] md:text-5xl"
        >
          {HEADING}
        </h2>
        <div
          aria-hidden="true"
          className="mx-auto mt-6 flex items-center justify-center gap-3"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4b678]/60" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[#d4b678]" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4b678]/60" />
        </div>
        <p className="mx-auto mt-6 max-w-sm text-[15px] leading-relaxed text-[#efe6d2]/70">
          {INTRO}
        </p>
      </div>

      {/* Chain with the promises hanging from it */}
      <ul className="mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-y-10 sm:grid-cols-3 xl:grid-cols-6 xl:gap-y-0">
        {PROMISES.map((p, i) => (
          <li key={p.title} className="flex flex-col items-center px-1.5 sm:px-2 xl:px-0">
            {/* Chain segment, with a gold diamond joining each pair */}
            <div className="relative w-full">
              <ChainSwag />
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#d4b678]"
              />
              {(i + 1) % 6 === 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 hidden h-2 w-2 -translate-y-1/2 translate-x-1/2 rotate-45 bg-[#d4b678] xl:block"
                />
              )}
            </div>

            {/* Thread the card hangs from */}
            <span
              aria-hidden="true"
              className={`block h-6 w-px bg-gradient-to-b from-[#d4b678] to-[#d4b678]/40 ${p.drop}`}
            />
            <span
              aria-hidden="true"
              className="-mt-px block h-1.5 w-1.5 rotate-45 bg-[#d4b678]"
            />

            {/* Arched card */}
            <article
              style={{
                backgroundImage: CARD_BG,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="group relative mx-1 mt-1 flex w-full flex-1 flex-col items-center overflow-hidden rounded-t-full rounded-b-2xl border border-[#d4b678]/40 px-4 pb-8 pt-12 text-center shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#d4b678] hover:shadow-[0_22px_50px_rgba(212,182,120,0.15)] xl:mx-3 xl:flex-none xl:px-5"
            >
              {/* Inner arched hairline */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-1.5 rounded-t-full rounded-b-xl border border-[#d4b678]/15"
              />

              <span className="relative grid h-12 w-12 place-items-center rounded-full border border-[#d4b678]/45 text-[#d4b678] transition-colors duration-300 group-hover:bg-[#d4b678] group-hover:text-[#031c15]">
                <Icon name={p.icon} />
              </span>
              <h3 className="relative mt-5 font-serif text-[19px] leading-snug text-[#e9d6a6]">
                {p.title}
              </h3>
              <span
                aria-hidden="true"
                className="relative mt-3 block h-px w-10 bg-gradient-to-r from-transparent via-[#d4b678] to-transparent"
              />
              <p className="relative mt-3 text-[13px] leading-relaxed text-[#efe6d2]/75">
                {p.text}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
