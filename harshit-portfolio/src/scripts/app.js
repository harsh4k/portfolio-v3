import { startIntro } from "./intro.js";
import { initPortfolio, revealPortfolio } from "./portfolio.js";

initPortfolio();
startIntro();

window.addEventListener("portfolio:entered", revealPortfolio, { once: true });
