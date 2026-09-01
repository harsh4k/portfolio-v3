/**
 * Resume dock — opens from the header Resume item (next to Contact).
 * Preview uses /resume.pdf; download also offers the attached .docx.
 */
(() => {
  const PDF_URL = "/resume.pdf";
  const DOCX_URL = "/Harshit_Resume.docx";

  const markup = `
    <div class="resume-dock" id="resume-dock" hidden>
      <button type="button" class="resume-dock__scrim" data-resume-close aria-label="Close resume"></button>
      <section class="resume-dock__panel" role="dialog" aria-modal="true" aria-labelledby="resume-dock-title">
        <header class="resume-dock__bar">
          <p class="resume-dock__title" id="resume-dock-title">Resume</p>
          <div class="resume-dock__actions">
            <a class="resume-dock__link" href="${PDF_URL}" download="Harshit_Chauhan_Resume.pdf">PDF</a>
            <a class="resume-dock__link" href="${DOCX_URL}" download="Harshit_Resume.docx">DOCX</a>
            <button type="button" class="resume-dock__close" data-resume-close>Close</button>
          </div>
        </header>
        <div class="resume-dock__frame">
          <iframe title="Harshit Chauhan resume" src="${PDF_URL}"></iframe>
        </div>
      </section>
    </div>
  `;

  const mount = () => {
    if (document.getElementById("resume-dock")) return document.getElementById("resume-dock");
    document.body.insertAdjacentHTML("beforeend", markup);
    return document.getElementById("resume-dock");
  };

  const dock = mount();
  let lastFocus = null;

  const setOpen = (open) => {
    dock.hidden = !open;
    document.documentElement.classList.toggle("resume-dock-open", open);
    if (open) {
      lastFocus = document.activeElement;
      dock.querySelector("[data-resume-close]")?.focus();
    } else {
      if (location.hash === "#resume") {
        history.replaceState(null, "", location.pathname + location.search);
      }
      if (lastFocus instanceof HTMLElement) lastFocus.focus();
    }
  };

  const open = (event) => {
    event?.preventDefault();
    setOpen(true);
  };

  const close = () => setOpen(false);

  document.addEventListener("click", (event) => {
    const opener = event.target instanceof Element && event.target.closest(".js-resume-open");
    if (opener) {
      event.preventDefault();
      event.stopPropagation();
      open(event);
      return;
    }
    if (event.target instanceof Element && event.target.closest("[data-resume-close]")) {
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dock.hidden) close();
  });

  if (location.hash === "#resume") setOpen(true);
})();
