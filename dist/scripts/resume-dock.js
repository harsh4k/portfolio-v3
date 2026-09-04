/**
 * Resume dock — opens from the header Resume item (next to Contact).
 * Preview is drawn with PDF.js so Brave/Chrome cannot block a native PDF iframe.
 */
(() => {
  const PDF_URL = "/resume.pdf";
  const DOCX_URL = "/Harshit_Resume.docx";
  const PDFJS_URL = "/scripts/pdf.min.mjs";
  const PDF_WORKER_URL = "/scripts/pdf.worker.min.mjs";

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
          <div class="resume-dock__pages" data-resume-pages>
            <p class="resume-dock__status">Loading resume…</p>
          </div>
        </div>
      </section>
    </div>
  `;

  const mount = () => {
    if (document.getElementById("resume-dock")) return document.getElementById("resume-dock");
    document.body.insertAdjacentHTML("beforeend", markup);
    const el = document.getElementById("resume-dock");
    el.style.zIndex = "200000";
    return el;
  };

  const dock = mount();
  const pagesEl = dock.querySelector("[data-resume-pages]");
  let lastFocus = null;
  let renderTask = null;

  const failPreview = () => {
    pagesEl.innerHTML = `
      <p class="resume-dock__status">
        Preview unavailable.
        <a class="resume-dock__fallback" href="${PDF_URL}" target="_blank" rel="noopener">Open PDF</a>
      </p>
    `;
  };

  const renderPreview = async () => {
    if (pagesEl.dataset.ready === "1") return;
    if (renderTask) return renderTask;

    renderTask = (async () => {
      try {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        const pdfjs = await import(PDFJS_URL);
        pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;
        const pdf = await pdfjs.getDocument({ url: PDF_URL, withCredentials: false }).promise;
        const fragment = document.createDocumentFragment();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          const base = page.getViewport({ scale: 1 });
          const maxWidth = Math.min(pagesEl.clientWidth || 800, 900);
          const scale = (maxWidth / base.width) * dpr;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.className = "resume-dock__page";
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.setAttribute("aria-label", `Resume page ${pageNumber}`);
          const context = canvas.getContext("2d", { alpha: false });
          await page.render({ canvasContext: context, viewport }).promise;
          fragment.appendChild(canvas);
        }

        pagesEl.replaceChildren(fragment);
        pagesEl.dataset.ready = "1";
      } catch (error) {
        console.warn("resume preview failed", error);
        failPreview();
      } finally {
        renderTask = null;
      }
    })();

    return renderTask;
  };

  const setOpen = (open) => {
    dock.hidden = !open;
    document.documentElement.classList.toggle("resume-dock-open", open);
    if (open) {
      lastFocus = document.activeElement;
      dock.querySelector("[data-resume-close]")?.focus();
      void renderPreview();
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
