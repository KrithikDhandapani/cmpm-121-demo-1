import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Stardust Collector";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Main Button for collecting stardust
const button = document.createElement("button");
button.innerHTML = "Collect Stardust 🌟"; // Fun emoji and new label
app.append(button);

// div element that displays the stardust counter
const counterDisplay = document.createElement("div");
let counter: number = 0;
counterDisplay.innerHTML = `${counter.toFixed(2)} stardust 🌟`; // Stardust as the counter unit
app.append(counterDisplay);

// Upgrade items and initial costs
const upgrades = [
  { name: "Upgrade Spaceship", baseCost: 10, cost: 10, rate: 0.1, count: 0 }, 
  { name: "Hire Astronauts", baseCost: 100, cost: 100, rate: 2.0, count: 0 }, 
  { name: "Build Space Station", baseCost: 1000, cost: 1000, rate: 50, count: 0 } 
];

// Create buttons for purchasing upgrades
const upgradeButtons = upgrades.map((upgrade) => {
  const button = document.createElement("button");
  button.innerHTML = `Purchase ${upgrade.name} (+${upgrade.rate} stardust/sec, costs ${upgrade.cost.toFixed(2)} units)`;
  button.disabled = true; // Initially disabled
  app.append(button);
  return button;
});

// div element that displays the growth rate and item counts
const growthRateDisplay = document.createElement("div");
let growthRate: number = 0;
growthRateDisplay.innerHTML = `Growth rate: ${growthRate.toFixed(2)} stardust/sec 🌟`;
app.append(growthRateDisplay);

const itemCountDisplay = document.createElement("div");
itemCountDisplay.innerHTML = upgrades
  .map((upgrade) => `${upgrade.name}: ${upgrade.count} purchased`)
  .join("<br>");
app.append(itemCountDisplay);

// Function to update the counter and growth rate displays
const updateCounterDisplay = () => {
  counterDisplay.innerHTML = `${counter.toFixed(2)} stardust 🌟`; // Update the stardust display

  // Update growth rate display
  growthRateDisplay.innerHTML = `Growth rate: ${growthRate.toFixed(2)} stardust/sec 🌟`;

  // Update item count display
  itemCountDisplay.innerHTML = upgrades
    .map((upgrade) => `${upgrade.name}: ${upgrade.count} purchased`)
    .join("<br>");

  // Enable or disable upgrade buttons based on the player's counter
  upgradeButtons.forEach((button, i) => {
    button.disabled = counter < upgrades[i].cost;
  });
};

// Function to update the cost of an upgrade based on the number of purchases
const updateUpgradeCost = (upgrade: any) => {
  upgrade.cost = upgrade.baseCost * Math.pow(1.15, upgrade.count); 
};

// Event listener to increase the stardust counter on button click
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay(); // Update the stardust display
});

// Event listeners for purchasing upgrades
upgradeButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    const upgrade = upgrades[i];
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost; // Deduct the upgrade cost
      upgrade.count++;          // Increment the item purchase count
      growthRate += upgrade.rate; // Increase the growth rate
      updateUpgradeCost(upgrade); // Update the cost for the next purchase
      button.innerHTML = `Purchase ${upgrade.name} (+${upgrade.rate} stardust/sec, costs ${upgrade.cost.toFixed(2)} units)`;
      updateCounterDisplay();    // Update displays
    }
  });
});

// Animation frame for incremental stardust growth
let lastTimestamp: number = 0;

const animate = (timestamp: number) => {
  if (!lastTimestamp) lastTimestamp = timestamp; // Set initial timestamp if not already set
  const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert time from milliseconds to seconds
  counter += deltaTime * growthRate; // Increase stardust counter based on the growth rate and time passed
  updateCounterDisplay(); // Update the stardust display
  lastTimestamp = timestamp; // Update last timestamp
  requestAnimationFrame(animate); // Continue to request the next animation frame
};

// Start the animation loop
requestAnimationFrame(animate);
