const threshold = 70;

const clamp = (value) => Math.min(100, Math.max(0, value));

export function startIntro() {
  const intro = document.querySelector("#intro");
  const control = document.querySelector("#pull-control");
  const status = document.querySelector("#pull-status");
  if (!intro || !control || !status) return;

  let active = false;
  let complete = false;
  let startX = 0;
  let startingProgress = 0;
  let progress = 0;

  const setProgress = (next) => {
    progress = clamp(next);
    intro.style.setProperty("--pull-progress", `${progress}%`);
    control.setAttribute("aria-valuenow", String(Math.round(progress)));
    control.setAttribute("aria-valuetext", `Pull progress ${Math.round(progress)} percent`);
    status.textContent = progress >= threshold ? "RELEASE TO ENTER THE ARCHIVE" : "PULL TO ENTER THE ARCHIVE";
  };

  const enterPortfolio = () => {
    if (complete) return;
    complete = true;
    setProgress(100);
    status.textContent = "ENTERING THE ARCHIVE";
    control.setAttribute("aria-disabled", "true");
    intro.classList.add("is-leaving");
    window.dispatchEvent(new CustomEvent("portfolio:entered"));
  };

  const reset = () => {
    intro.classList.remove("is-pulling");
    setProgress(0);
  };

  const onPointerMove = (event) => {
    if (!active || complete) return;
    const width = Math.max(control.getBoundingClientRect().width * 0.72, 1);
    intro.classList.add("is-pulling");
    setProgress(startingProgress + ((event.clientX - startX) / width) * 100);
  };

  const onPointerEnd = (event) => {
    if (!active) return;
    active = false;
    control.releasePointerCapture?.(event.pointerId);
    if (progress >= threshold) enterPortfolio();
    else reset();
  };

  control.addEventListener("pointerdown", (event) => {
    if (complete) return;
    event.preventDefault();
    active = true;
    startX = event.clientX;
    startingProgress = progress;
    control.setPointerCapture?.(event.pointerId);
  });

  control.addEventListener("pointermove", onPointerMove);
  control.addEventListener("pointerup", onPointerEnd);
  control.addEventListener("pointercancel", onPointerEnd);
  control.addEventListener("keydown", (event) => {
    if (complete) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setProgress(progress + 20);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setProgress(progress - 20);
    }
    if (event.key === "Home") {
      event.preventDefault();
      setProgress(0);
    }
    if (event.key === "End" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      enterPortfolio();
    }
  });
}
