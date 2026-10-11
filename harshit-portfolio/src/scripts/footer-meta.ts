/** The footer's live local time (src/components/Footer.astro). */
const clock = document.querySelector<HTMLTimeElement>(".js-local-time");
if (clock) {
  const zone = clock.dataset["zone"] ?? "Asia/Kolkata";
  const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: zone });
  const tick = () => {
    clock.textContent = `${format.format(new Date())} IST`;
  };
  tick();
  setInterval(tick, 15_000);
}
