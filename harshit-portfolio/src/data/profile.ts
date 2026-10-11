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
  school: "NMIMS Mumbai",
  stack: ["React", "TypeScript", "Next.js", "Three.js", "GSAP", "Tailwind", "Supabase", "Python"],
  /** Search results cut descriptions at about 155 characters; a test keeps it under that. */
  description:
    "Software developer and Computer Engineering student at NMIMS Mumbai, building production web apps, motion-led sites and local-first AI tools.",
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
 * `burst` picks the doodle a cell throws on hover or tap
 * (public/images/burst/<burst>.svg).
 */
export const highlights = [
  {
    slot: "webby2025",
    burst: "spark",
    kind: "text",
    lines: ["NamasteDev Hackathon 2026 Winner", "GetCited AEO & GEO Website Platform"],
  },
  { slot: "awwwards", burst: "face", kind: "counter", name: "SHIPPED", counters: ["11 Projects", "Production"] },
  { slot: "netMag2016", burst: "code", kind: "text", lines: ["Synapical Junior Dev Intern", "Summer 2025"] },
  { slot: "fwa", burst: "code", kind: "counter", name: "INTERN", counters: ["Synapical", "Junior Dev"] },
  {
    slot: "commArt2017",
    burst: "code",
    kind: "text",
    lines: [`Stack: ${profile.stack.join(" · ")}`],
  },
  { kind: "blank" },
  { slot: "cssda", burst: "spark", kind: "counter", name: "DEGREE", counters: ["NMIMS Mumbai", "B.Tech CE"] },
  { slot: "gsapOct2024", burst: "spark", kind: "text", lines: ["3D & WebGL Experiences", "Interactive Canvas Motion"] },
  {
    slot: "gsapNov2024",
    burst: "bug",
    kind: "text",
    lines: ["Local AI & Voice Tools", "Tauri, Rust & Node Pipelines"],
  },
  { slot: "CSSDA2016", burst: "bug", kind: "text", lines: ["Open Source Contributor", "github.com/harsh4k"] },
  {
    slot: "CSSDA2015",
    burst: "face",
    kind: "text",
    lines: ["Building Considered Digital Products", `Since ${profile.since}`],
  },
] as const;

/**
 * The gates in the Toolkit section (src/components/ScrollScene.astro, rail
 * scene), in order along the track: the areas of the stack, so it doesn't
 * repeat the About highlights.
 */
export const toolkit = [
  { mark: "Frontend", title: "React · Next.js · TypeScript", detail: "Typed interfaces, styled with Tailwind" },
  { mark: "Motion", title: "GSAP · Three.js", detail: "Scroll-led motion and WebGL scenes" },
  { mark: "Backend", title: "Supabase · Node", detail: "Auth, data and APIs behind the apps" },
  { mark: "AI tools", title: "Python · Tauri · Rust", detail: "Local-first AI and voice tools" },
  { mark: "Delivery", title: "Git · CI · Playwright", detail: "Checked and tested on every push" },
] as const;

/** The steps of the Helix Dive section (src/components/HelixDive.astro), top to bottom. */
export const workSteps = [
  { mark: "Idea", detail: "Find the real problem and who has it" },
  { mark: "Design", detail: "Sketch the flow, the motion and the system" },
  { mark: "Build", detail: "Typed, tested code in small steps" },
  { mark: "Test", detail: "On real phones, slow networks and screen readers" },
  { mark: "Ship", detail: "Deploy, measure, and keep improving" },
] as const;
