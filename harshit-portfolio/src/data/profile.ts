export const profile = {
  name: "Harshit Chauhan",
  role: "Software Developer",
  /**
   * The two giant words in the hero. The design's type size is tuned to these
   * words; src/styles/site.css scales it down to fit "Software".
   */
  heroTitle: ["Software", "Developer"],
  location: "Mumbai, India",
  availability: "Available for projects & roles",
  timeZone: "Asia/Kolkata",
  email: "harshitsinhchauhan250@gmail.com",
  since: 2024,
  description:
    "Harshit Chauhan — Computer Engineering student at NMIMS Mumbai and software developer building production web applications, motion-led sites and local-first AI tools.",
  socials: [
    { label: "GitHub", handle: "harsh4k", url: "https://github.com/harsh4k" },
    {
      label: "LinkedIn",
      handle: "harshit-chauhan",
      url: "https://www.linkedin.com/in/harshit-chauhan-17a898364/",
    },
  ],
  resume: { pdf: "/resume.pdf", docx: "/Harshit_Resume.docx" },
} as const;

/**
 * The "Hire me" link. The subject is percent-encoded: an unencoded space ends
 * the subject early in some mail clients.
 */
export const hireMe = `mailto:${profile.email}?subject=${encodeURIComponent("Hello Harshit")}`;

/**
 * The Highlights grid. Each `slot` is the modifier class the design's
 * stylesheet uses to place that cell, so the order and slots must stay paired.
 */
export const highlights = [
  {
    slot: "webby2025",
    kind: "text",
    lines: ["NamasteDev Hackathon 2026 Winner", "GetCited AEO & GEO Website Platform"],
  },
  { slot: "awwwards", kind: "counter", name: "SHIPPED", counters: ["11 Projects", "Production"] },
  { slot: "netMag2016", kind: "text", lines: ["Synapical Junior Dev Intern", "Summer 2025"] },
  { slot: "fwa", kind: "counter", name: "INTERN", counters: ["Synapical", "Junior Dev"] },
  {
    slot: "commArt2017",
    kind: "text",
    lines: ["Stack: React · TypeScript · Next.js · Three.js · GSAP · Tailwind · Supabase · Python"],
  },
  { kind: "blank" },
  { slot: "cssda", kind: "counter", name: "DEGREE", counters: ["NMIMS Mumbai", "B.Tech CE"] },
  { slot: "gsapOct2024", kind: "text", lines: ["3D & WebGL Experiences", "Interactive Canvas Motion"] },
  { slot: "gsapNov2024", kind: "text", lines: ["Local AI & Voice Tools", "Tauri, Rust & Node Pipelines"] },
  { slot: "CSSDA2016", kind: "text", lines: ["Open Source Contributor", "github.com/harsh4k"] },
  { slot: "CSSDA2015", kind: "text", lines: ["Building Considered Digital Products", `Since ${profile.since}`] },
] as const;
