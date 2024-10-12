import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My super amazing cool game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Button to increase counter
const button = document.createElement("button");
button.innerHTML = "Launch 🚀"; // Fun emoji 
app.append(button);

// div element that displays counter
const counterDisplay = document.createElement("div");
let counter: number = 0;
counterDisplay.innerHTML = `${counter.toFixed(2)} launches 🚀`; // Display initial counter
app.append(counterDisplay);

// Upgrade items and costs
const upgrades = [
  { name: "A", cost: 10, rate: 0.1, count: 0 },
  { name: "B", cost: 100, rate: 2.0, count: 0 },
  { name: "C", cost: 1000, rate: 50, count: 0 }
];

// Create buttons for purchasing upgrades
const upgradeButtons = upgrades.map((upgrade) => {
  const button = document.createElement("button");
  button.innerHTML = `Purchase ${upgrade.name} (+${upgrade.rate} growth, costs ${upgrade.cost} units)`;
  button.disabled = true; // Initially disabled
  app.append(button);
  return button;
});

// div element that displays growth rate and item counts
const growthRateDisplay = document.createElement("div");
let growthRate: number = 0;
growthRateDisplay.innerHTML = `Growth rate: ${growthRate.toFixed(2)} launches/sec`;
app.append(growthRateDisplay);

const itemCountDisplay = document.createElement("div");
itemCountDisplay.innerHTML = upgrades
  .map((upgrade) => `${upgrade.name}: ${upgrade.count} purchased`)
  .join("<br>");
app.append(itemCountDisplay);

const updateCounterDisplay = () => {
  counterDisplay.innerHTML = `${counter.toFixed(2)} launches 🚀`; // Update the counter display

  // Update growth rate display
  growthRateDisplay.innerHTML = `Growth rate: ${growthRate.toFixed(2)} launches/sec`;

  // Update item count display
  itemCountDisplay.innerHTML = upgrades
    .map((upgrade) => `${upgrade.name}: ${upgrade.count} purchased`)
    .join("<br>");

  // Enable or disable upgrade buttons based on the player's counter
  upgradeButtons.forEach((button, i) => {
    button.disabled = counter < upgrades[i].cost;
  });
};

// Event listener to increase the counter on button click
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay(); // Update the counter display
});

// Event listeners for purchasing upgrades
upgradeButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    const upgrade = upgrades[i];
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost; // Deduct the upgrade cost
      upgrade.count++;          // Increment the item purchase count
      growthRate += upgrade.rate; // Increase the growth rate
      updateCounterDisplay();    // Update displays
    }
  });
});

// Animation frame counter increment
let lastTimestamp: number = 0;

const animate = (timestamp: number) => {
  if (!lastTimestamp) lastTimestamp = timestamp; // Set initial timestamp if not already set
  const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert time from milliseconds to seconds
  counter += deltaTime * growthRate; // Increase counter based on the growth rate and time passed
  updateCounterDisplay(); // Update the counter display
  lastTimestamp = timestamp; // Update last timestamp
  requestAnimationFrame(animate); // Continue to request next animation frame
};

// Start the animation loop
requestAnimationFrame(animate);
