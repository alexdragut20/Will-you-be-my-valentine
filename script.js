const envelope = document.getElementById("envelope");
const overlay = document.getElementById("overlay");
const questionCard = document.getElementById("questionCard");
const successCard = document.getElementById("successCard");
const actions = document.getElementById("actions");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let questionVisible = false;
let noMoveCount = 0;
let glitterCleanupTimeout;
const noMessages = [
  "Are you sure?",
  "Think again",
  "Really no?",
  "Maybe yes?",
  "One more thought?"
];
const randomBetween = (min, max) => Math.random() * (max - min) + min;
const centerWeighted = () => (Math.random() + Math.random() + Math.random()) / 3;

const setNoPosition = (x, y) => {
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "none";
};

const resetNoButton = () => {
  const safePadding = 8;
  const maxX = Math.max(safePadding, actions.clientWidth - noBtn.offsetWidth - safePadding);
  const centeredY = (actions.clientHeight - noBtn.offsetHeight) / 2;
  const targetX = Math.min(Math.max(actions.clientWidth * 0.66, safePadding), maxX);

  setNoPosition(targetX, Math.max(centeredY, safePadding));
  noMoveCount = 0;
  noBtn.textContent = "No";
};

const findSafeSpot = () => {
  const safePadding = 8;
  const noWidth = noBtn.offsetWidth;
  const noHeight = noBtn.offsetHeight;
  const maxX = Math.max(safePadding, actions.clientWidth - noWidth - safePadding);
  const maxY = Math.max(safePadding, actions.clientHeight - noHeight - safePadding);

  const actionsRect = actions.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();
  const guard = 22;
  const yesBox = {
    left: yesRect.left - actionsRect.left - guard,
    right: yesRect.right - actionsRect.left + guard,
    top: yesRect.top - actionsRect.top - guard,
    bottom: yesRect.bottom - actionsRect.top + guard
  };

  for (let attempt = 0; attempt < 50; attempt += 1) {
    const x = randomBetween(safePadding, maxX);
    const y = randomBetween(safePadding, maxY);
    const candidate = {
      left: x,
      right: x + noWidth,
      top: y,
      bottom: y + noHeight
    };

    const overlapsYes = !(
      candidate.right < yesBox.left ||
      candidate.left > yesBox.right ||
      candidate.bottom < yesBox.top ||
      candidate.top > yesBox.bottom
    );

    if (!overlapsYes) {
      return { x, y };
    }
  }

  return { x: maxX, y: safePadding };
};

const dodgeNoButton = (event) => {
  if (!questionVisible) {
    return;
  }

  if (event.cancelable) {
    event.preventDefault();
  }
  event.stopPropagation();

  const { x, y } = findSafeSpot();
  setNoPosition(x, y);
  noMoveCount += 1;
  noBtn.textContent = noMessages[(noMoveCount - 1) % noMessages.length];
};

const launchGlitterRain = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const existing = document.querySelector(".glitter-rain");
  if (existing) {
    existing.remove();
  }

  if (glitterCleanupTimeout) {
    window.clearTimeout(glitterCleanupTimeout);
  }

  const rain = document.createElement("div");
  rain.className = "glitter-rain";

  const haze = document.createElement("div");
  haze.className = "glitter-haze";
  rain.appendChild(haze);

  const flareCount = 72;
  const shardCount = 180;
  const totalPieces = flareCount + shardCount;

  for (let i = 0; i < totalPieces; i += 1) {
    const isFlare = i < flareCount;
    const x = 50 + (centerWeighted() - 0.5) * 86;
    const piece = document.createElement("span");
    piece.className = `glitter-piece ${isFlare ? "flare" : "shard"}`;
    piece.style.left = `${x.toFixed(2)}%`;
    piece.style.top = `${randomBetween(-4, 28).toFixed(2)}%`;
    piece.style.setProperty("--size", `${randomBetween(isFlare ? 8 : 1.4, isFlare ? 18 : 4.7).toFixed(1)}px`);
    piece.style.setProperty("--duration", `${randomBetween(isFlare ? 3.9 : 3.2, isFlare ? 6.8 : 6.1).toFixed(2)}s`);
    piece.style.setProperty("--delay", `${randomBetween(0, 1.4).toFixed(2)}s`);
    piece.style.setProperty("--fall", `${randomBetween(20, 56).toFixed(1)}vh`);
    piece.style.setProperty("--drift", `${randomBetween(-18, 18).toFixed(1)}px`);
    piece.style.setProperty("--spin", `${randomBetween(-180, 180).toFixed(0)}deg`);
    piece.style.setProperty("--twinkle", `${randomBetween(0.7, 2.1).toFixed(2)}s`);
    piece.style.setProperty("--alpha", `${randomBetween(isFlare ? 0.7 : 0.34, isFlare ? 1 : 0.76).toFixed(2)}`);
    rain.appendChild(piece);
  }

  document.body.appendChild(rain);

  glitterCleanupTimeout = window.setTimeout(() => {
    rain.remove();
    glitterCleanupTimeout = undefined;
  }, 7600);
};

const openQuestion = () => {
  envelope.classList.add("open");
  envelope.disabled = true;

  window.setTimeout(() => {
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    questionCard.classList.remove("hidden");
    successCard.classList.add("hidden");
    successCard.classList.remove("show");
    questionVisible = true;
    window.requestAnimationFrame(resetNoButton);
  }, 320);
};

const showInvitation = () => {
  questionVisible = false;
  questionCard.classList.add("hidden");
  successCard.classList.remove("hidden");
  successCard.classList.add("show");
  launchGlitterRain();
};

envelope.addEventListener("click", openQuestion);

[
  "mouseenter",
  "pointerenter",
  "mouseover",
  "focus",
  "pointerdown",
  "mousedown",
  "touchstart",
  "click"
].forEach((eventName) => {
  noBtn.addEventListener(eventName, dodgeNoButton, { passive: false });
});

yesBtn.addEventListener("click", showInvitation);

window.addEventListener("resize", () => {
  if (questionVisible) {
    resetNoButton();
  }
});
