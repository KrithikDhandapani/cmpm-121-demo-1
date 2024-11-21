import "./style.css";

// Constants
const MAGIC_PRICE_INCREASE_RATE = 1.15; // 15% price increase
const INITIAL_COUNTER = 0;
const INITIAL_GROWTH_RATE = 0;

// DOM Elements
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Stardust Collector";
document.title = gameName;

const header = createHeader(gameName);
const collectButton = createCollectButton();
const counterDisplay = createDisplay("0.00 stardust 🌟");
const growthRateDisplay = createDisplay("Growth rate: 0.00 stardust/sec 🌟");
const itemCountDisplay = createDisplay("");
const itemDescriptionsDisplay = createDisplay("");

// Game State
let counter: number = INITIAL_COUNTER;
let growthRate: number = INITIAL_GROWTH_RATE;

// Items available for purchase
interface Item {
  name: string;
  price: number;
  productionRate: number;
  count: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Upgrade Spaceship",
    price: 10,
    productionRate: 0.1,
    count: 0,
    description: "Enhances your spaceship's ability to gather stardust.",
  },
  {
    name: "Hire Astronauts",
    price: 100,
    productionRate: 2.0,
    count: 0,
    description: "A team of astronauts working tirelessly to collect stardust.",
  },
  {
    name: "Build Space Station",
    price: 1000,
    productionRate: 50,
    count: 0,
    description: "A massive space station that automates stardust collection.",
  },
  {
    name: "Deploy Satellite",
    price: 500,
    productionRate: 20,
    count: 0,
    description: "A satellite that constantly collects stardust from the cosmos.",
  },
  {
    name: "Build Nebula Factory",
    price: 5000,
    productionRate: 200,
    count: 0,
    description: "A giant factory located within a nebula, producing vast amounts of stardust.",
  },
];

// Dynamically generate buttons for purchasing items
const upgradeButtons = createUpgradeButtons();

// Initialize UI
app.append(header, collectButton, counterDisplay, growthRateDisplay, itemCountDisplay, itemDescriptionsDisplay);
upgradeButtons.forEach((button) => app.append(button));

// --- Utility Functions ---
function createHeader(title: string): HTMLHeadingElement {
  const header = document.createElement("h1");
  header.innerHTML = title;
  return header;
}

function createCollectButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.innerHTML = "Collect Stardust 🌟";
  button.addEventListener("click", handleCollect);
  return button;
}

function createDisplay(initialText: string): HTMLDivElement {
  const display = document.createElement("div");
  display.innerHTML = initialText;
  return display;
}

function createUpgradeButtons(): HTMLButtonElement[] {
  return availableItems.map((item, index) => {
    const button = document.createElement("button");
    button.innerHTML = `Purchase ${item.name} (+${item.productionRate} stardust/sec, costs ${item.price.toFixed(
      2
    )} units)`;
    button.disabled = true;
    button.addEventListener("click", () => handlePurchase(index));
    return button;
  });
}

// --- Event Handlers ---
function handleCollect(): void {
  counter++;
  updateUI();
}

function handlePurchase(index: number): void {
  const item = availableItems[index];
  if (counter >= item.price) {
    counter -= item.price;
    item.count++;
    growthRate += item.productionRate;
    item.price *= MAGIC_PRICE_INCREASE_RATE;
    upgradeButtons[index].innerHTML = `Purchase ${item.name} (+${item.productionRate} stardust/sec, costs ${item.price.toFixed(
      2
    )} units)`;
    updateUI();
  }
}

// --- Update Functions ---
function updateUI(): void {
  // Update main displays
  counterDisplay.innerHTML = `${counter.toFixed(2)} stardust 🌟`;
  growthRateDisplay.innerHTML = `Growth rate: ${growthRate.toFixed(2)} stardust/sec 🌟`;

  // Update item counts
  itemCountDisplay.innerHTML = availableItems
    .map((item) => `${item.name}: ${item.count} purchased`)
    .join("<br>");

  // Enable or disable upgrade buttons
  upgradeButtons.forEach((button, i) => {
    button.disabled = counter < availableItems[i].price;
  });

  // Update item descriptions
  itemDescriptionsDisplay.innerHTML = availableItems
    .map((item) => `<b>${item.name}:</b> ${item.description}`)
    .join("<br><br>");
}

// --- Animation Loop ---
let lastTimestamp: number = 0;

function animate(timestamp: number): void {
  if (!lastTimestamp) lastTimestamp = timestamp;
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  counter += deltaTime * growthRate;
  updateUI();
  lastTimestamp = timestamp;
  requestAnimationFrame(animate);
}

// Start the animation loop
requestAnimationFrame(animate);
