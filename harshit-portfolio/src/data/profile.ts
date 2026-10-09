export const profile = {
  name: "Harshit Chauhan",
  role: "Software Developer",
  location: "Mumbai, India",
  timeZone: "Asia/Kolkata",
  email: "harshitsinhchauhan250@gmail.com",
  since: 2024,
  description:
    "Harshit Chauhan — software developer and Computer Engineering student at NMIMS Mumbai, building production web applications, desktop tools and local-first AI.",
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

export const highlights = [
  { value: "11", label: "Projects shipped", detail: "In production" },
  { value: "2026", label: "Hackathon winner", detail: "NamasteDev, with GetCited" },
  { value: "2026", label: "Junior dev intern", detail: "Synapical, ongoing" },
  { value: "B.Tech", label: "Computer Engineering", detail: "NMIMS Mumbai" },
] as const;

export const focus = [
  { title: "Web applications", detail: "React, TypeScript, Next.js, Supabase" },
  { title: "3D & motion", detail: "Three.js, WebGL, GSAP, interactive canvas" },
  { title: "Local AI & voice tools", detail: "Tauri, Rust and Node pipelines, Python" },
  { title: "Open source", detail: "github.com/harsh4k" },
] as const;
