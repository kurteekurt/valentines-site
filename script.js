const card = document.getElementById("card");
const heading = card.querySelector("h1");
const message = document.getElementById("message");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttons = document.getElementById("buttons");
const confetti = document.getElementById("confetti");
const finalScreen = document.getElementById("finalScreen");

const noTexts = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Last chance?",
  "Please?",
  "Pretty please?",
];

let noCount = 0;
let locked = false;
let yesScale = 1;
let lastSparkleTime = 0;

function placeNoButtonRandomly() {
  if (locked) return;

  const wrapRect = buttons.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, wrapRect.width - btnRect.width);
  const maxY = Math.max(0, wrapRect.height - btnRect.height);

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function launchHearts(amount = 24) {
  for (let i = 0; i < amount; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = Math.random() > 0.5 ? "❤" : "💖";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.bottom = `${6 + Math.random() * 16}%`;
    heart.style.animationDelay = `${Math.random() * 260}ms`;
    confetti.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1800);
  }
}

function celebrateYes() {
  if (locked) return;
  locked = true;

  card.classList.add("yes");
  message.textContent = "Best answer ever. Date night is officially on. ❤";
  yesBtn.textContent = "Yay!";
  noBtn.style.opacity = "0";
  noBtn.style.pointerEvents = "none";

  launchHearts(30);

  setTimeout(() => {
    card.classList.add("final");
    finalScreen.setAttribute("aria-hidden", "false");
    heading.textContent = "You said yes!";
  }, 1200);
}

yesBtn.addEventListener("click", celebrateYes);

noBtn.addEventListener("mouseenter", () => {
  if (window.innerWidth > 700) {
    placeNoButtonRandomly();
  }
});

noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  noCount += 1;
  yesScale = Math.min(2, yesScale + 0.15);
  yesBtn.style.transform = `scale(${yesScale})`;
  noBtn.textContent = noTexts[Math.min(noCount, noTexts.length - 1)];
  placeNoButtonRandomly();
});

window.addEventListener("resize", () => {
  if (!locked) {
    noBtn.style.position = "relative";
    noBtn.style.left = "0";
    noBtn.style.top = "0";
  }
});

function spawnSparkle(x, y) {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 520);
}

window.addEventListener(
  "mousemove",
  (event) => {
    const now = performance.now();
    if (now - lastSparkleTime < 35) return;
    lastSparkleTime = now;
    spawnSparkle(event.clientX, event.clientY);
  },
  { passive: true }
);

window.addEventListener(
  "touchmove",
  (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    const now = performance.now();
    if (now - lastSparkleTime < 50) return;
    lastSparkleTime = now;
    spawnSparkle(touch.clientX, touch.clientY);
  },
  { passive: true }
);
