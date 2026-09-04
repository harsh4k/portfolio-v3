import fs from "fs";
import path from "path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(root, "..", "..");
const repoRoot = path.resolve(appRoot, "..");

const referenceWodniackPath = path.resolve(repoRoot, "references", "wodniack", "index.html");

// Harshit's 11 real projects ONLY for the Work section
const projects = [
  {
    title: "Velsaro",
    url: "https://www.velsaro.in/",
    key: "vlsr-0001/11",
    img: "/images/velsaro.webp",
  },
  {
    title: "Nexcart",
    url: "https://nexcart-v1.vercel.app/",
    key: "nxtc-0002/11",
    img: "/images/nexcart.webp",
  },
  {
    title: "Synapical",
    url: "https://synapical-com.pages.dev/",
    key: "synp-0003/11",
    img: "/images/synapical.webp",
  },
  {
    title: "Attendo",
    url: "https://attendov1.vercel.app/",
    key: "attd-0004/11",
    img: "/images/attendo.webp",
  },
  {
    title: "Coffee Digital",
    url: "https://coffeedigital.vercel.app/",
    key: "coff-0005/11",
    img: "/images/coffee-digital.webp",
  },
  {
    title: "Coffee Rebuild",
    url: "https://threedwebs.vercel.app/",
    key: "rebld-0006/11",
    img: "/images/coffee-rebuild.webp",
  },
  {
    title: "Oysnk",
    url: "https://oysnk.vercel.app/",
    key: "osnk-0007/11",
    img: "/images/Osynk.webp",
  },
  {
    title: "Shipd",
    url: "https://github.com/harsh4k/shipd",
    key: "shpd-0008/11",
    img: "/images/shipd.webp",
  },
  {
    title: "Rudo AI",
    url: "https://github.com/harsh4k/rudo",
    key: "rudo-0009/11",
    img: "/images/rudo.webp",
  },
  {
    title: "Bunny OS",
    url: "https://harsh4k.github.io/Bunny-OS/",
    key: "bnny-0010/11",
    img: "/images/bunny-os.webp",
  },
  {
    title: "GetCited",
    url: "https://github.com/harsh4k/Getcited",
    key: "gtct-0011/11",
    img: "/images/getcited.webp",
  },
];

// Generate work cards HTML matching original Wodniack markup structure exactly
const workCardsHtml = projects
  .map(
    (p) =>
      `  <a-work class="s__scene__work s__scene__work--video js-work astro-meqjtcea"> <div class="a__inner astro-meqjtcea"> <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="astro-meqjtcea"> <img src="${p.img}" alt="${p.title}" class="a__video js-video astro-meqjtcea" width="1082" height="636" loading="lazy" decoding="async" /> <div class="a__caption astro-meqjtcea"> <div class="a__caption__text astro-meqjtcea"> ${p.title} </div><!-- .a__caption__text --> <div class="a__caption__key astro-meqjtcea">\n#${p.key} </div><!-- .a__caption__key --> </div><!-- .a__caption --> </a> </div><!-- .a__inner --> </a-work>`
  )
  .join("  \n");

if (fs.existsSync(referenceWodniackPath)) {
  const wodniackHtml = fs.readFileSync(referenceWodniackPath, "utf8");
  let html = wodniackHtml;

  // 1. Remove cloudflare email decode script
  html = html.replace(/<script[^>]*email-decode\.min\.js[^>]*><\/script>/g, "");

  // 1b. Drop the reference markup's inline `opacity: 0` on .site-wrapper.
  //
  //     Upstream, the site intro runs at load and clears this on its first frame.
  //     Here the intro is gated behind the hand pull, so the wrapper would stay
  //     fully transparent until the visitor interacts — which hides every LCP
  //     candidate on the page (the <h1> is ~170k px2) behind an effective
  //     opacity of 0. Chrome then reports no LCP at all, and Lighthouse fails
  //     the whole Performance category with NO_LCP.
  //
  //     Nothing changes visually: #intro-layer and .site-intro are both fixed,
  //     full-viewport and fully opaque, so the wrapper is covered either way.
  html = html.replace(
    '<div class="site-wrapper js-site-wrapper astro-j7pv25f6" style="opacity: 0;">',
    '<div class="site-wrapper js-site-wrapper astro-j7pv25f6">'
  );

  // 2. Inject 3D intro layer at the top of body
  html = html.replace(
    '<body class="astro-j7pv25f6">',
    '<body class="astro-j7pv25f6">\n  <div id="intro-layer" class="intro-layer"><div id="app"></div></div>'
  );

  // 3. Header monogram & author
  html = html.replace(/Antoine Wodniack/g, "Harshit Chauhan");
  const awLogoPaths = `<path d="M240.245 0v263.2h-19.894V0h-39.756v263.2h-19.861V0h-39.755v280H280V0h-39.755Z" fill="#160000" class="astro-5qrshpxv"></path> <path d="M0 0v280h39.755V16.8H59.65V280h39.756V0H0Z" fill="#160000" class="astro-5qrshpxv"></path>`;
  const hcLogoPaths = `<path d="M0 0v280h39.755V158.4h59.65V280h39.756V0H99.411v118.8H39.755V0H0Z" fill="#160000" class="astro-5qrshpxv"></path> <path d="M160.734 0v280H280V240.245h-79.51V39.755H280V0H160.734Z" fill="#160000" class="astro-5qrshpxv"></path>`;
  html = html.replaceAll(awLogoPaths, hcLogoPaths);

  const awFootLogo = `<path d="M240.245 0v263.2h-19.894V0h-39.756v263.2h-19.861V0h-39.755v280H280V0h-39.755Z" fill="#160000" class="astro-75cegwoc"></path> <path d="M0 0v280h39.755V16.8H59.65V280h39.756V0H0Z" fill="#160000" class="astro-75cegwoc"></path>`;
  const hcFootLogo = `<path d="M0 0v280h39.755V158.4h59.65V280h39.756V0H99.411v118.8H39.755V0H0Z" fill="#160000" class="astro-75cegwoc"></path> <path d="M160.734 0v280H280V240.245h-79.51V39.755H280V0H160.734Z" fill="#160000" class="astro-75cegwoc"></path>`;
  html = html.replaceAll(awFootLogo, hcFootLogo);

  // 3b. Site intro animation monogram ("HC" instead of "AW")
  const awIntroLogo = `<div class="sb-logo js-logo astro-j7pv25f6"> <div class="sb__path sb__path--v sb__path--v-1 js-logo-line-v astro-j7pv25f6"></div> <div class="sb__path sb__path--h sb__path--h-1 js-logo-line-h astro-j7pv25f6"></div> <div class="sb__path sb__path--v sb__path--v-2 js-logo-line-v astro-j7pv25f6"></div> <div class="sb__path sb__path--v sb__path--v-3 js-logo-line-v astro-j7pv25f6"></div> <div class="sb__path sb__path--h sb__path--h-2 js-logo-line-h astro-j7pv25f6"></div> <div class="sb__path sb__path--v sb__path--v-4 js-logo-line-v astro-j7pv25f6"></div> <div class="sb__path sb__path--h sb__path--h-3 js-logo-line-h astro-j7pv25f6"></div> <div class="sb__path sb__path--v sb__path--v-5 js-logo-line-v astro-j7pv25f6"></div> </div>`;
  const hcIntroLogo = `<div class="sb-logo js-logo astro-j7pv25f6"> <div class="sb__path sb__path--v sb__path--v-1 js-logo-line-v astro-j7pv25f6"></div> <div class="sb__path sb__path--v sb__path--v-2 js-logo-line-v astro-j7pv25f6"></div> <div class="sb__path sb__path--h sb__path--h-1 js-logo-line-h astro-j7pv25f6"></div> <div class="sb__path sb__path--v sb__path--v-3 js-logo-line-v astro-j7pv25f6"></div> <div class="sb__path sb__path--h sb__path--h-2 js-logo-line-h astro-j7pv25f6"></div> <div class="sb__path sb__path--h sb__path--h-3 js-logo-line-h astro-j7pv25f6"></div> </div>`;
  html = html.replace(awIntroLogo, hcIntroLogo);

  // 4. Remove QR code from header
  html = html.replace(
    /<a[^>]*class="sb-qr-code[^>]*>[\s\S]*?<\/a><!-- \.sb-qr-code -->/g,
    ""
  );

  // 5. Availability
  html = html.replace(
    /Coding globally from France\./g,
    "Coding from Mumbai, India."
  );
  html = html.replace(
    /Available for freelance work →/g,
    "Available for projects & roles →"
  );

  // 6. Socials in header (with secure rel attributes)
  html = html.replace(
    /<a href="https:\/\/codepen\.io\/wodniack"[^>]*>/g,
    '<a href="https://github.com/harsh4k" target="_blank" rel="noopener noreferrer" class="astro-5qrshpxv" aria-label="GitHub">'
  );
  html = html.replace(
    /Follow me on CodePen/g,
    "Follow me on GitHub"
  );
  html = html.replace(
    /<a href="https:\/\/www\.linkedin\.com\/in\/wodniack\/"[^>]*>/g,
    '<a href="https://www.linkedin.com/in/harshit-chauhan-17a898364/" target="_blank" rel="noopener noreferrer" class="astro-5qrshpxv" aria-label="LinkedIn">'
  );

  html = html.replace(
    '<span class="sb__text astro-5qrshpxv">Contact</span> </a> </li> </ul> </nav>',
    '<span class="sb__text astro-5qrshpxv">Contact</span> </a> </li><li class="sb__item js-menu-item astro-5qrshpxv"> <a href="#resume" class="js-resume-open astro-5qrshpxv"> <span class="sb__text astro-5qrshpxv">Resume</span> </a> </li> </ul> </nav>'
  );

  // 7. Bio & About
  const oldAbout1 = "I collaborate with agencies and designers to craft memorable user experiences, bringing their vision to life with a nice touch of animation.";
  const newAbout1 = "I design and build production web applications, motion-led studio sites, and local-first AI tools — balancing performance, interaction, and clean systems.";
  html = html.replace(oldAbout1, newAbout1);

  const oldAbout2Start = html.indexOf("I started with Dreamweaver");
  const oldAbout2End = html.indexOf("</p>", oldAbout2Start);
  if (oldAbout2Start !== -1 && oldAbout2End !== -1) {
    const newAbout2 = `I'm a Computer Engineering student at NMIMS Mumbai and frontend developer crafting considered digital experiences. I learn quickest by taking things apart, building from scratch, and shipping — from e-commerce platforms like <a href="https://www.velsaro.in/" target="_blank" rel="noopener noreferrer" class="astro-am7g2yfn">Velsaro</a> and <a href="https://nexcart-v1.vercel.app/" target="_blank" rel="noopener noreferrer" class="astro-am7g2yfn">Nexcart</a> to studio sites like <a href="https://synapical-com.pages.dev/" target="_blank" rel="noopener noreferrer" class="astro-am7g2yfn">Synapical</a> and college systems like <a href="https://attendov1.vercel.app/" target="_blank" rel="noopener noreferrer" class="astro-am7g2yfn">Attendo</a>.`;
    html = html.substring(0, oldAbout2Start) + newAbout2 + html.substring(oldAbout2End);
  }

  // 8. Highlights section: Populate all 10 slots
  html = html.replace(
    /<h2 class="s__title astro-am7g2yfn">Awards<\/h2>/g,
    '<h2 class="s__title astro-am7g2yfn">Highlights</h2>'
  );

  const awardsListStart = html.indexOf('<ul class="s__awards');
  const awardsListEnd = html.indexOf('</ul>', awardsListStart) + 5;
  if (awardsListStart !== -1 && awardsListEnd !== -1) {
    const newAwardsHtml = `<ul class="s__awards astro-am7g2yfn">
      <li class="s__award s__award--text s__award--webby2025 js-award astro-am7g2yfn">
        <span class="s__award__inner astro-am7g2yfn">
          <span class="s__award__text astro-am7g2yfn">NamasteDev Hackathon 2026 Winner <br/>GetCited AEO & GEO Website Platform</span>
        </span>
        <span class="s__award__mask astro-am7g2yfn"></span>
      </li>
      <li class="s__award s__award--counter s__award--awwwards js-award astro-am7g2yfn">
        <span class="s__award__inner astro-am7g2yfn">
          <span class="s__award__name astro-am7g2yfn">SHIPPED</span>
          <span class="s__award__counter astro-am7g2yfn">(11 Projects)</span>
          <span class="s__award__counter astro-am7g2yfn">(Production)</span>
        </span>
        <span class="s__award__mask astro-am7g2yfn"></span>
      </li>
      <li class="s__award s__award--text s__award--netMag2016 js-award astro-am7g2yfn">
        <span class="s__award__inner astro-am7g2yfn">
          <span class="s__award__text astro-am7g2yfn">Synapical Junior Dev Intern <br/>Summer 2025</span>
        </span>
        <span class="s__award__mask astro-am7g2yfn"></span>
      </li>
      <li class="s__award s__award--counter s__award--fwa js-award astro-am7g2yfn">
        <span class="s__award__inner astro-am7g2yfn">
          <span class="s__award__name astro-am7g2yfn">INTERN</span>
          <span class="s__award__counter astro-am7g2yfn">(Synapical)</span>
          <span class="s__award__counter astro-am7g2yfn">(Junior Dev)</span>
        </span>
        <span class="s__award__mask astro-am7g2yfn"></span>
      </li>
      <li class="s__award s__award--text s__award--commArt2017 js-award astro-am7g2yfn">
        <span class="s__award__inner astro-am7g2yfn">
          <span class="s__award__text astro-am7g2yfn">Stack: React · TypeScript · Next.js · Three.js · GSAP · Tailwind · Supabase · Python</span>
        </span>
        <span class="s__award__mask astro-am7g2yfn"></span>
      </li>
      <li class="s__award s__award--blank astro-am7g2yfn">
        <svg width="101" height="113" viewBox="0 0 101 113" fill="none" xmlns="http://www.w3.org/2000/svg" class="astro-am7g2yfn">
          <path d="M80.05 107.398c-21.944 12.67-52.875.18-69.085-27.896m69.086 27.896c21.945-12.67 26.594-45.702 10.384-73.778M80.05 107.398c-19.686 11.366-48.786-2.181-64.996-30.258C-1.155 49.063 1.663 17.09 21.35 5.723m58.702 101.675c19.686-11.366 22.504-43.34 6.293-71.417C70.134 7.904 41.034-5.642 21.35 5.723" class="astro-am7g2yfn"></path>
        </svg>
        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg" class="astro-am7g2yfn"><path fill="#160000" d="m24.5 0 3.3 21.2L49 24.5l-21.2 3.3L24.5 49l-3.3-21.2L0 24.5l21.2-3.3L24.5 0z" class="astro-am7g2yfn"></path></svg>
        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg" class="astro-am7g2yfn"><path fill="#160000" d="m24.5 0 3.3 21.2L49 24.5l-21.2 3.3L24.5 49l-3.3-21.2L0 24.5l21.2-3.3L24.5 0z" class="astro-am7g2yfn"></path></svg>
        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg" class="astro-am7g2yfn"><path fill="#160000" d="m24.5 0 3.3 21.2L49 24.5l-21.2 3.3L24.5 49l-3.3-21.2L0 24.5l21.2-3.3L24.5 0z" class="astro-am7g2yfn"></path></svg>
        <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg" class="astro-am7g2yfn"><path fill="#160000" d="m24.5 0 3.3 21.2L49 24.5l-21.2 3.3L24.5 49l-3.3-21.2L0 24.5l21.2-3.3L24.5 0z" class="astro-am7g2yfn"></path></svg>
      </li>
      <li class="s__award s__award--counter s__award--cssda js-award astro-am7g2yfn">
        <span class="s__award__inner astro-am7g2yfn">
          <span class="s__award__name astro-am7g2yfn">DEGREE</span>
          <span class="s__award__counter astro-am7g2yfn">(NMIMS Mumbai)</span>
          <span class="s__award__counter astro-am7g2yfn">(B.Tech CE)</span>
        </span>
        <span class="s__award__mask astro-am7g2yfn"></span>
      </li>
      <li class="s__award s__award--text s__award--gsapOct2024 js-award astro-am7g2yfn">
        <span class="s__award__inner astro-am7g2yfn">
          <span class="s__award__text astro-am7g2yfn">3D & WebGL Experiences <br/>Interactive Canvas Motion</span>
        </span>
        <span class="s__award__mask astro-am7g2yfn"></span>
      </li>
      <li class="s__award s__award--text s__award--gsapNov2024 js-award astro-am7g2yfn">
        <span class="s__award__inner astro-am7g2yfn">
          <span class="s__award__text astro-am7g2yfn">Local AI & Voice Tools <br/>Tauri, Rust & Node Pipelines</span>
        </span>
        <span class="s__award__mask astro-am7g2yfn"></span>
      </li>
      <li class="s__award s__award--text s__award--CSSDA2016 js-award astro-am7g2yfn">
        <span class="s__award__inner astro-am7g2yfn">
          <span class="s__award__text astro-am7g2yfn">Open Source Contributor <br/>github.com/harsh4k</span>
        </span>
        <span class="s__award__mask astro-am7g2yfn"></span>
      </li>
      <li class="s__award s__award--text s__award--CSSDA2015 js-award astro-am7g2yfn">
        <span class="s__award__inner astro-am7g2yfn">
          <span class="s__award__text astro-am7g2yfn">Building Considered Digital Products <br/>Since 2024</span>
        </span>
        <span class="s__award__mask astro-am7g2yfn"></span>
      </li>
    </ul>`;
    html = html.substring(0, awardsListStart) + newAwardsHtml + html.substring(awardsListEnd);
  }

  // 9. Work Section: Replace all items in s__scene with EXACTLY Harshit's 11 project cards!
  const sceneStart = html.indexOf('<div class="s__scene js-scene astro-doefkd43">');
  const firstWorkIdx = html.indexOf('<a-work', sceneStart);
  const lastWorkCloseIdx = html.indexOf('</div><!-- .s__scene -->', sceneStart);
  const actualLastWorkCloseIdx = html.lastIndexOf('</a-work>', lastWorkCloseIdx) + 9;

  if (firstWorkIdx !== -1 && actualLastWorkCloseIdx !== -1) {
    html =
      html.substring(0, firstWorkIdx) +
      workCardsHtml +
      html.substring(actualLastWorkCloseIdx);
  }

  // 10. Visual Archive (s-my-way — "Building with intent since 2024") images
  html = html.replace(/\/images\/sprite-vanish\.png/g, "/images/brain.webp");
  html = html.replace(/_astro\/art-1987\.[^"]+\.webp/g, "images/p1.webp");
  html = html.replace(/_astro\/art-dtyw\.[^"]+\.webp/g, "images/p2.webp");
  html = html.replace(/_astro\/art-lines\.[^"]+\.webp/g, "images/p3.webp");
  html = html.replace(/_astro\/first-fwa\.[^"]+\.webp/g, "images/Hackathon.webp");
  html = html.replace(/_astro\/gameboy\.[^"]+\.webp/g, "images/2024.webp");
  html = html.replace(/_astro\/remote-2005\.[^"]+\.webp/g, "images/profile.webp");
  html = html.replace(/_astro\/roar\.[^"]+\.webp/g, "images/t3.webp");
  html = html.replace(/_astro\/setup-2006\.[^"]+\.webp/g, "images/v6.webp");
  html = html.replace(/_astro\/setup-2016\.[^"]+\.webp/g, "images/v11.webp");
  html = html.replace(/_astro\/setup-2020\.[^"]+\.webp/g, "images/2026.webp");
  html = html.replace(/_astro\/legos\.[^"]+\.webp/g, "images/pic1.webp");

  // Add loading="lazy" and decoding="async" to archive images
  html = html.replace(/<img class="a__img/g, '<img loading="lazy" decoding="async" class="a__img');

  // Captions in s-my-way section
  html = html.replace("Waaark Creative Robots", "Neural Workspace Studio");
  html = html.replace("2011 portfolio", "Generative Poster 1");
  html = html.replace("2014 portfolio", "Spatial Interface 2");
  html = html.replace("2017 portfolio (never released)", "Design Archive 3");
  html = html.replace("2021 portfolio", "Creative Systems Lab");

  // 11. 3D rotating text in Visual Archive section
  html = html.replaceAll(
    `Coding <br class="astro-fiibiggq">\nmy way <br class="astro-fiibiggq">\nsince <br class="astro-fiibiggq">\n1987`,
    `Building <br class="astro-fiibiggq">\nwith intent <br class="astro-fiibiggq">\nsince <br class="astro-fiibiggq">\n2024`
  );
  html = html.replaceAll(
    `Coding <br class="astro-fiibiggq">\r\nmy way <br class="astro-fiibiggq">\r\nsince <br class="astro-fiibiggq">\r\n1987`,
    `Building <br class="astro-fiibiggq">\r\nwith intent <br class="astro-fiibiggq">\r\nsince <br class="astro-fiibiggq">\r\n2024`
  );

  // 12. Contact email in CTA
  html = html.replace(
    /href="\/cdn-cgi\/l\/email-protection[^"]*"/g,
    'href="mailto:harshitsinhchauhan250@gmail.com"'
  );
  html = html.replace(
    /<span class="__cf_email__"[^>]*>[^<]*<\/span>/g,
    "harshitsinhchauhan250@gmail.com"
  );

  // 13. SEO Head replacements & Metadata Overhaul
  html = html.replace(
    /<title>[^<]*<\/title>/,
    "<title>Harshit Chauhan — Creative Developer &amp; Student</title>"
  );
  html = html.replace(
    /<meta name="description"[^>]*>/,
    '<meta name="description" content="Harshit Chauhan — Computer Engineering student at NMIMS Mumbai &amp; Creative Developer crafting considered web applications, motion systems, and local AI tools.">'
  );
  html = html.replace(
    /<meta name="viewport"[^>]*>/,
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
  );
  html = html.replace(
    /<meta name="apple-mobile-web-app-title"[^>]*>/,
    '<meta name="apple-mobile-web-app-title" content="Harshit">'
  );
  html = html.replace(
    /<meta name="theme-color"[^>]*>/,
    '<meta name="theme-color" content="#F40C3F">'
  );
  html = html.replace(
    /(<link rel="icon"[^>]*>)+<link rel="shortcut icon"[^>]*><link rel="apple-touch-icon"[^>]*>/,
    [
      '<link rel="icon" type="image/png" href="/icons/logo.png">',
      '<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">',
      '<link rel="icon" type="image/png" sizes="48x48" href="/icons/favicon-48x48.png">',
      '<link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png">',
      '<link rel="shortcut icon" href="/icons/favicon.ico">',
      '<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">',
    ].join("")
  );

  // Replace OpenGraph & Twitter tags
  html = html.replace(/<meta property="og:locale"[^>]*>/, '<meta property="og:locale" content="en_US">');
  html = html.replace(/<meta property="og:title"[^>]*>/, '<meta property="og:title" content="Harshit Chauhan — Creative Developer &amp; Student">');
  html = html.replace(/<meta property="og:description"[^>]*>/, '<meta property="og:description" content="Harshit Chauhan — Computer Engineering student at NMIMS Mumbai &amp; Creative Developer crafting considered web applications, motion systems, and local AI tools.">');
  html = html.replace(/<meta property="og:url"[^>]*>/, '<meta property="og:url" content="https://harshh.pages.dev/">');
  html = html.replace(/<meta property="og:site_name"[^>]*>/, '<meta property="og:site_name" content="Harshit Chauhan Portfolio">');
  html = html.replace(/<meta property="og:image"[^>]*>/, '<meta property="og:image" content="https://harshh.pages.dev/images/og-image.png">');
  html = html.replace(/<meta property="og:image:height"[^>]*>/, '<meta property="og:image:height" content="630">');
  html = html.replace(/<meta name="twitter:image"[^>]*>/, '<meta name="twitter:image" content="https://harshh.pages.dev/images/og-image.png">');

  // 14. Inject SEO links, Manifest, JSON-LD, Stylesheets & image play/pause polyfill into <head>
  const headEnd = html.indexOf("</head>");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Harshit Chauhan",
    "jobTitle": "Creative Developer & Computer Engineering Student",
    "url": "https://harshh.pages.dev/",
    "email": "harshitsinhchauhan250@gmail.com",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "NMIMS Mumbai"
    },
    "sameAs": [
      "https://github.com/harsh4k",
      "https://www.linkedin.com/in/harshit-chauhan-17a898364/"
    ],
    "knowsAbout": [
      "React",
      "TypeScript",
      "Next.js",
      "Three.js",
      "GSAP",
      "Supabase",
      "Python",
      "WebGL",
      "Frontend Development"
    ]
  };

  const extraHeadTags = `
  <link rel="stylesheet" crossorigin href="/assets/index-DG8As337.css" data-intro-style>
  <link rel="canonical" href="https://harshh.pages.dev/">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
  <link rel="stylesheet" href="/styles/integration.css">
  <script src="/scripts/img-media.js"></script>
`;
  html = html.substring(0, headEnd) + extraHeadTags + html.substring(headEnd);

  // 16. Inject bridge script before </body>
  const bodyEnd = html.indexOf("</body>");
  if (bodyEnd !== -1) {
    const bridgeScript = `  <script type="module" src="/scripts/bridge.js"></script>\n  <script type="module" src="/scripts/resume-dock.js"></script>\n  <script type="module" src="/scripts/pwa.js"></script>\n`;
    html = html.substring(0, bodyEnd) + bridgeScript + html.substring(bodyEnd);
  }

  fs.writeFileSync(path.resolve(appRoot, "index.html"), html, "utf8");
  console.log("build: index.html compiled from references markup with 3D intro layer.");
} else {
  console.log("build: references/ directory not found — using committed index.html.");
}

// 17. Sync reference assets to public/
const syncDir = (src, dest) => {
  if (fs.existsSync(src)) {
    fs.mkdirSync(dest, { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
  }
};

const adrienRef = path.resolve(repoRoot, "references", "adrienlamy");
const wodniackRef = path.resolve(repoRoot, "references", "wodniack");
const publicDir = path.resolve(appRoot, "public");

if (fs.existsSync(adrienRef)) {
  syncDir(path.join(adrienRef, "assets"), path.join(publicDir, "assets"));
  syncDir(path.join(adrienRef, "webgl"), path.join(publicDir, "webgl"));
  syncDir(path.join(adrienRef, "fonts"), path.join(publicDir, "fonts"));
  syncDir(path.join(adrienRef, "videos"), path.join(publicDir, "videos"));
  syncDir(path.join(adrienRef, "images", "ctas"), path.join(publicDir, "images", "ctas"));
}

const repoCtas = path.resolve(repoRoot, "dist", "images", "ctas");
if (!fs.existsSync(path.join(publicDir, "images", "ctas", "tex-ui-switch-fe-on.webp")) && fs.existsSync(repoCtas)) {
  syncDir(repoCtas, path.join(publicDir, "images", "ctas"));
}

const logoFiles = ["logo.png", "logo.svg"].map((name) => {
  const filePath = path.join(publicDir, "icons", name);
  return fs.existsSync(filePath) ? { filePath, bytes: fs.readFileSync(filePath) } : null;
}).filter(Boolean);

if (fs.existsSync(wodniackRef)) {
  syncDir(path.join(wodniackRef, "_astro"), path.join(publicDir, "_astro"));
  syncDir(path.join(wodniackRef, "fonts"), path.join(publicDir, "fonts"));
  syncDir(path.join(wodniackRef, "icons"), path.join(publicDir, "icons"));
}

if (logoFiles.length) {
  fs.mkdirSync(path.join(publicDir, "icons"), { recursive: true });
  for (const { filePath, bytes } of logoFiles) fs.writeFileSync(filePath, bytes);
}

const runScript = (name) => {
  const result = spawnSync(process.execPath, [path.resolve(root, name)], { stdio: "inherit" });
  if (result.status !== 0) console.warn(`build: ${name} skipped or failed`);
};
runScript("generate-pwa-icons.mjs");
runScript("generate-og.mjs");

const dropIfPresent = (target) => {
  try {
    fs.rmSync(target, { recursive: true, force: true });
  } catch (error) {
    console.warn("build: could not remove", target, error.message);
  }
};
// Filename prefixes of the reference author's own photographs. The visual
// archive swaps in Harshit's images, so these are left over unreferenced.
// Matched on the prefix because the suffix is a content hash that changes
// whenever the reference site is re-synced.
const REFERENCE_PHOTO_PREFIXES = [
  "art-1987", "art-dtyw", "art-lines", "first-fwa", "gameboy", "legos",
  "remote-2005", "roar", "setup-2006", "setup-2016", "setup-2020",
];

const pruneJunk = (dir) => {
  dropIfPresent(path.join(dir, "pwa-icons"));
  dropIfPresent(path.join(dir, "service-worker.js"));
  dropIfPresent(path.join(dir, "images", "images"));
  dropIfPresent(path.join(dir, "icons", "icons"));
  dropIfPresent(path.join(dir, "cdn-cgi"));

  // Nested byte-identical copies of a directory that already exists one level
  // up. .gitignore hides the ones under public/, but the dist/ copy is tracked,
  // so they were being committed anyway.
  dropIfPresent(path.join(dir, "_astro", "_astro"));
  dropIfPresent(path.join(dir, "fonts", "fonts"));
  dropIfPresent(path.join(dir, "assets", "fonts"));

  // Nothing on this site plays video out of _astro/ — the work section uses
  // still .webp — so every .mp4 in there is the reference site's client
  // showreels riding along. ~78 MB across public/ and dist/ combined.
  const astroDir = path.join(dir, "_astro");
  if (fs.existsSync(astroDir)) {
    for (const entry of fs.readdirSync(astroDir)) {
      const isShowreel = entry.toLowerCase().endsWith(".mp4");
      const isReferencePhoto = REFERENCE_PHOTO_PREFIXES.some(
        (prefix) => entry.startsWith(`${prefix}.`)
      );
      if (isShowreel || isReferencePhoto) dropIfPresent(path.join(astroDir, entry));
    }
  }
};
pruneJunk(publicDir);

// 18. Assemble repo dist/ for static hosting (Cloudflare Pages, Vercel, Netlify)
const distDir = path.resolve(repoRoot, "dist");
fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

fs.copyFileSync(path.resolve(appRoot, "index.html"), path.join(distDir, "index.html"));
fs.cpSync(publicDir, distDir, { recursive: true });

fs.mkdirSync(path.join(distDir, "styles"), { recursive: true });
fs.copyFileSync(
  path.resolve(appRoot, "src", "styles", "integration.css"),
  path.join(distDir, "styles", "integration.css")
);

fs.mkdirSync(path.join(distDir, "scripts"), { recursive: true });
for (const script of ["bridge.js", "pwa.js", "resume-dock.js", "img-media.js"]) {
  fs.copyFileSync(
    path.resolve(appRoot, "src", "scripts", script),
    path.join(distDir, "scripts", script)
  );
}

const pdfjsBuild = path.resolve(appRoot, "node_modules", "pdfjs-dist", "build");
const pdfjsRequired = ["pdf.min.mjs", "pdf.worker.min.mjs"];
for (const file of pdfjsRequired) {
  const from = path.join(pdfjsBuild, file);
  if (!fs.existsSync(from)) {
    throw new Error(`Missing ${from}. Run npm install in harshit-portfolio.`);
  }
  fs.copyFileSync(from, path.join(distDir, "scripts", file));
}
const pdfjsMap = path.join(pdfjsBuild, "pdf.mjs.map");
if (fs.existsSync(pdfjsMap)) {
  fs.copyFileSync(pdfjsMap, path.join(distDir, "scripts", "pdf.mjs.map"));
}

const resumeDocx = path.resolve(repoRoot, "docs", "Harshit_Resume.docx");
const resumePdf = path.resolve(repoRoot, "docs", "Harshit_resume.pdf");
if (fs.existsSync(resumeDocx)) {
  fs.copyFileSync(resumeDocx, path.join(distDir, "Harshit_Resume.docx"));
  fs.copyFileSync(resumeDocx, path.join(publicDir, "Harshit_Resume.docx"));
}
if (fs.existsSync(path.join(publicDir, "resume.pdf"))) {
  fs.copyFileSync(path.join(publicDir, "resume.pdf"), path.join(distDir, "resume.pdf"));
} else if (fs.existsSync(resumePdf)) {
  fs.copyFileSync(resumePdf, path.join(distDir, "resume.pdf"));
  fs.copyFileSync(resumePdf, path.join(publicDir, "resume.pdf"));
}

pruneJunk(distDir);

console.log("build: dist/ assembled at", distDir);
