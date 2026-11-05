"use client";

// npm i framer-motion
import { motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Edit these                                                          */
/* ------------------------------------------------------------------ */
const HEADING = "Made to be trusted";
const INTRO = "Six assurances that come with every piece you take home.";

type IconName = "gem" | "seal" | "exchange" | "return" | "package" | "shield";

// Keep the wording to what you can honestly stand behind.
const PROMISES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "gem",
    title: "Certified natural diamonds",
    text: "Every diamond comes with its grading certificate.",
  },
  {
    icon: "seal",
    title: "BIS hallmarked gold",
    text: "Hallmarked for purity, so you know what you are wearing.",
  },
  {
    icon: "exchange",
    title: "Lifetime exchange",
    text: "Exchange your piece at any Nakshathra showroom.",
  },
  {
    icon: "return",
    title: "30-day returns",
    text: "Changed your mind? Return it within 30 days. Terms apply.",
  },
  {
    icon: "package",
    title: "Free shipping",
    text: "Insured delivery to your door at no extra cost.",
  },
  {
    icon: "shield",
    title: "One-year warranty",
    text: "Covered against manufacturing defects for a full year.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
const ICON_PATHS: Record<IconName, string[]> = {
  gem: ["M6 4h12l3 5-9 11L3 9z", "M3 9h18M9 4l-1.5 5L12 20M15 4l1.5 5L12 20"],
  seal: [
    "M12 3l2.4 1.8 3 .1.9 2.9 2.3 1.9-1 2.8 1 2.8-2.3 1.9-.9 2.9-3 .1L12 21l-2.4-1.8-3-.1-.9-2.9-2.3-1.9 1-2.8-1-2.8 2.3-1.9.9-2.9 3-.1z",
    "M8.8 12.2l2.2 2.2 4.2-4.4",
  ],
  exchange: ["M4 8h14l-3-3M20 16H6l3 3"],
  return: ["M5 12a7 7 0 107-7H7", "M9.5 2.5L7 5l2.5 2.5"],
  package: ["M3 7.5L12 3l9 4.5v9L12 21l-9-4.5z", "M3 7.5l9 4.5 9-4.5M12 12v9"],
  shield: ["M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z", "M9 12l2 2 4-4"],
};

const Icon = ({ name }: { name: IconName }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {ICON_PATHS[name].map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
);

/* ------------------------------------------------------------------ */
/* Hallmark medallion: a ring of text turns slowly around the icon     */
/* ------------------------------------------------------------------ */
const RING_PATH =
  "M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0";
const RING_LENGTH = 2 * Math.PI * 78;

const Medallion = ({
  index,
  title,
  icon,
  spin,
}: {
  index: number;
  title: string;
  icon: IconName;
  spin: boolean;
}) => {
  const id = `nk-ring-${index}`;
  const label = title.toUpperCase();
  return (
    <div className="relative mx-auto h-[140px] w-[140px]">
      {/* Turning ring */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full text-[#0a2e24] transition-colors duration-500 group-hover:text-[#b8964f]"
        aria-hidden="true"
        animate={spin ? { rotate: index % 2 === 0 ? 360 : -360 } : undefined}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeOpacity="0.18" />
        <circle cx="100" cy="100" r="58" fill="none" stroke="#d4b678" strokeOpacity="0.7" />
        <defs>
          <path id={id} d={RING_PATH} />
        </defs>
        <text
          fill="currentColor"
          fontSize="11.5"
          fontWeight="500"
          letterSpacing="1"
        >
          <textPath
            href={`#${id}`}
            textLength={RING_LENGTH - 2}
            lengthAdjust="spacing"
          >
            {`${label} ◆ ${label} ◆ `}
          </textPath>
        </text>
      </motion.svg>

      {/* Icon in a solid green disc */}
      <motion.div
        className="absolute inset-0 grid place-items-center"
        whileHover={spin ? { scale: 1.06 } : undefined}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
      >
        <span className="grid h-[68px] w-[68px] place-items-center rounded-full bg-[#0a2e24] text-[#d4b678] shadow-[0_10px_22px_-10px_rgba(10,46,36,0.6)]">
          <Icon name={icon} />
        </span>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function Home() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="promise-heading"
      className="bg-white px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-xl text-center"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2
            id="promise-heading"
            className="font-serif text-4xl leading-tight text-[#0a2e24] md:text-5xl"
          >
            {HEADING}
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4b678]" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#d4b678]" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4b678]" />
          </div>
          <p className="mt-6 text-base leading-relaxed text-[#0a2e24]/70">
            {INTRO}
          </p>
        </motion.div>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {PROMISES.map((p, i) => (
            <motion.li
              key={p.title}
              className="group text-center"
              initial={reduce ? false : { opacity: 0, scale: 0.85, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
            >
              <Medallion
                index={i}
                title={p.title}
                icon={p.icon}
                spin={!reduce}
              />
              <h3 className="mt-6 font-serif text-lg leading-snug text-[#0a2e24]">
                {p.title}
              </h3>
              <p className="mx-auto mt-2 max-w-[14rem] text-[13px] leading-relaxed text-[#0a2e24]/70">
                {p.text}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
