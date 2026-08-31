import { archiveItems, profile, projects, socials } from "../data.js";

const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[character]);

function projectMarkup(project, index) {
  const destination = project.liveUrl || project.repoUrl;
  const destinationLabel = project.liveUrl ? "Visit project" : "View repository";
  const tags = project.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("");
  return `
    <article class="project-card ${index < 6 ? "project-card--featured" : ""}">
      <a class="project-link" href="${destination}" target="_blank" rel="noreferrer" aria-label="${destinationLabel}: ${project.title}">
        <div class="project-image-wrap">
          <img src="assets/images/${project.image}" alt="${project.title} project cover" loading="${index < 3 ? "eager" : "lazy"}" />
          <span class="project-orbit" aria-hidden="true">OPEN ↗</span>
        </div>
        <div class="project-meta">
          <span>${project.number} / ${project.type}</span>
          <span>${project.year} · ${project.status}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-footer"><span>${project.role}</span><ul>${tags}</ul></div>
      </a>
    </article>`;
}

function renderProjects() {
  const grid = document.querySelector("#project-grid");
  if (grid) grid.innerHTML = projects.map(projectMarkup).join("");
}

function renderArchive() {
  const grid = document.querySelector("#archive-grid");
  if (!grid) return;
  grid.innerHTML = archiveItems.map((item, index) => `
    <figure class="archive-card archive-card--${(index % 3) + 1}">
      <img src="assets/images/${item.image}" alt="${item.title}" loading="lazy" />
      <figcaption><span>${item.title}</span><span>${item.note}</span></figcaption>
    </figure>`).join("");
}

function renderFacts() {
  const list = document.querySelector("#facts-list");
  if (!list) return;
  list.innerHTML = profile.facts.map(([term, description]) => `<div><dt>${term}</dt><dd>${description}</dd></div>`).join("");
}

function renderSocials() {
  const socialList = document.querySelector("#social-list");
  if (!socialList) return;
  socialList.innerHTML = socials.map(([name, url, handle]) => `
    <a href="${url}" target="_blank" rel="noreferrer"><span>${name}</span><span>${handle} ↗</span></a>`).join("");
}

function addWaves() {
  const field = document.querySelector("#wave-field");
  if (!field) return;
  field.innerHTML = Array.from(
    { length: 14 },
    (_, index) => `<span class="wave-line" style="--wave-offset:${index * 2}px;--wave-scale:${1 + index * 0.008};--delay:${index * -0.22}s"></span>`,
  ).join("");
}

function initContrast() {
  const button = document.querySelector("#contrast-toggle");
  if (!button) return;
  const stored = sessionStorage.getItem("portfolio-contrast");
  if (stored === "high") document.documentElement.dataset.contrast = "high";
  button.setAttribute("aria-pressed", String(stored === "high"));
  button.addEventListener("click", () => {
    const next = document.documentElement.dataset.contrast === "high" ? "base" : "high";
    if (next === "high") document.documentElement.dataset.contrast = "high";
    else delete document.documentElement.dataset.contrast;
    sessionStorage.setItem("portfolio-contrast", next);
    button.setAttribute("aria-pressed", String(next === "high"));
  });
}

function initHeroPointer() {
  const hero = document.querySelector(".portfolio-hero");
  if (!hero || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    hero.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 14}px`);
    hero.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 9}px`);
  });
}

function rotateConsole() {
  const consoleLine = document.querySelector("#header-console");
  if (!consoleLine) return;
  const messages = ["SYSTEM ONLINE · BUILDING WITH INTENT", "CURRENTLY SHIPPING · WEB / TOOLS / AI", "AVAILABLE FOR GOOD PROBLEMS", "FROM MUMBAI · WORKING GLOBALLY"];
  let index = 0;
  window.setInterval(() => {
    index = (index + 1) % messages.length;
    consoleLine.textContent = messages[index];
  }, 3600);
}

export function initPortfolio() {
  document.querySelector("#hero-bio").textContent = profile.shortBio;
  document.querySelector("#hero-location").textContent = profile.location;
  document.querySelector("#about-copy").textContent = profile.about;
  const email = document.querySelector("#email-link");
  email.href = `mailto:${profile.email}`;
  email.textContent = profile.email;
  document.querySelector("#current-year").textContent = String(new Date().getFullYear());
  renderFacts();
  renderProjects();
  renderArchive();
  renderSocials();
  addWaves();
  initContrast();
  initHeroPointer();
  rotateConsole();
}

export function revealPortfolio() {
  const portfolio = document.querySelector("#portfolio");
  if (!portfolio || portfolio.classList.contains("is-ready")) return;
  portfolio.classList.add("is-ready");
  portfolio.removeAttribute("aria-hidden");
  document.body.classList.add("is-entered");
  window.setTimeout(() => document.querySelector("#portfolio-title")?.focus({ preventScroll: true }), 700);
}
