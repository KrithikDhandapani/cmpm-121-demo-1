import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Stardust Collector";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "Collect Stardust 🌟"; // Fun emoji and new label
app.append(button);

const counterDisplay = document.createElement("div");
let counter: number = 0;
counterDisplay.innerHTML = `${counter.toFixed(2)} stardust 🌟`; // Stardust as the counter unit
app.append(counterDisplay);

interface Item {
  name: string;
  price: number;  // Renamed from cost to price
  productionRate: number;  // Renamed from rate to productionRate
  count: number;  // Added count to track how many of each item is purchased
  description: string;  // Added description for each item
};

const availableItems: Item[] = [
  { name: "Upgrade Spaceship", price: 10, productionRate: 0.1, count: 0, description: "Enhances your spaceship's ability to gather stardust." },
  { name: "Hire Astronauts", price: 100, productionRate: 2.0, count: 0, description: "A team of astronauts working tirelessly to collect stardust." },
  { name: "Build Space Station", price: 1000, productionRate: 50, count: 0, description: "A massive space station that automates stardust collection." },
  { name: "Deploy Satellite", price: 500, productionRate: 20, count: 0, description: "A satellite that constantly collects stardust from the cosmos." },
  { name: "Build Nebula Factory", price: 5000, productionRate: 200, count: 0, description: "A giant factory located within a nebula, producing vast amounts of stardust." },
];

const upgradeButtons: HTMLButtonElement[] = availableItems.map((item) => {
  const button = document.createElement("button");
  button.innerHTML = `Purchase ${item.name} (+${item.productionRate} stardust/sec, costs ${item.price.toFixed(2)} units)`;
  button.disabled = true; // Initially disabled
  app.append(button);
  return button;
});

const growthRateDisplay = document.createElement("div");
let growthRate: number = 0;
growthRateDisplay.innerHTML = `Growth rate: ${growthRate.toFixed(2)} stardust/sec 🌟`;
app.append(growthRateDisplay);

const itemCountDisplay = document.createElement("div");
itemCountDisplay.innerHTML = availableItems
  .map((item) => `${item.name}: 0 purchased`)
  .join("<br>");
app.append(itemCountDisplay);

const itemDescriptionsDisplay = document.createElement("div");
itemDescriptionsDisplay.innerHTML = availableItems
  .map((item) => `<b>${item.name}:</b> ${item.description}`)
  .join("<br><br>");
app.append(itemDescriptionsDisplay);

// Function to update displays
const updateCounterDisplay = () => {
  counterDisplay.innerHTML = `${counter.toFixed(2)} stardust 🌟`; // Update the stardust display
  growthRateDisplay.innerHTML = `Growth rate: ${growthRate.toFixed(2)} stardust/sec 🌟`; // Update growth rate display

  // Update item purchase count
  itemCountDisplay.innerHTML = availableItems
    .map((item) => `${item.name}: ${item.count} purchased`)
    .join("<br>");

  // Enable or disable upgrade buttons based on the current counter
  upgradeButtons.forEach((button, i) => {
    button.disabled = counter < availableItems[i].price; // Enable only if enough units
  });
};

// Function to update the price for an item after each purchase
const updateItemPrice = (item: Item) => {
  item.price = item.price * 1.15; // Increase price by 15% after each purchase
};

// Event listener for the collect button
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
});

// Event listeners for purchasing upgrades
upgradeButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    const item = availableItems[i];
    if (counter >= item.price) {
      counter -= item.price; // Deduct the item's price
      item.count++; // Increase purchase count
      growthRate += item.productionRate; // Increase the growth rate
      updateItemPrice(item); // Increase the price for the next purchase
      button.innerHTML = `Purchase ${item.name} (+${item.productionRate} stardust/sec, costs ${item.price.toFixed(2)} units)`;
      updateCounterDisplay(); // Update the displays after purchasing
    }
  });
});

// Animation for incremental stardust growth
let lastTimestamp: number = 0;

const animate = (timestamp: number) => {
  if (!lastTimestamp) lastTimestamp = timestamp; // Set initial timestamp if not already set
  const deltaTime = (timestamp - lastTimestamp) / 1000; // Calculate time in seconds
  counter += deltaTime * growthRate; // Increment stardust counter based on growth rate
  updateCounterDisplay(); // Update the display
  lastTimestamp = timestamp; // Update last timestamp
  requestAnimationFrame(animate); // Continue requesting next animation frame
};

// Start the animation loop
requestAnimationFrame(animate);
