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

// New button to purchase upgrade
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Purchase Upgrade (+1 growth rate)";
upgradeButton.disabled = true; // Initially disabled
app.append(upgradeButton);

let growthRate: number = 0; // Start with no automatic growth rate

// Function to update the counter display
const updateCounterDisplay = () => {
  counterDisplay.innerHTML = `${counter.toFixed(2)} launches 🚀`; // Update the display with new counter value
  // Enable/disable upgrade button based on the player's counter
  if (counter >= 10) {
    upgradeButton.disabled = false;
  } else {
    upgradeButton.disabled = true;
  }
};

// Event listener to increase the counter on button click
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay(); // Update the counter display
});

// Event listener for purchasing upgrade
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10; // Deduct 10 units
    growthRate++;   // Increase the growth +1
    updateCounterDisplay(); // Update counter after the purchase
  }
});

// Animation frame counter increment
let lastTimestamp: number = 0;

const animate = (timestamp: number) => {
  if (!lastTimestamp) lastTimestamp = timestamp; // Set initial timestamp if not already set
  const deltaTime = (timestamp - lastTimestamp) / 1000; 
  counter += deltaTime * growthRate; // Increase counter(based on growth rate and time)
  updateCounterDisplay(); // Update the counter display
  lastTimestamp = timestamp; // Update last timestamp
  requestAnimationFrame(animate); // Continue to request next animation frame
};

// Start the animation loop
requestAnimationFrame(animate);
