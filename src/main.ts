import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My super amazing cool game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Button
const button = document.createElement("button");
button.innerHTML = "Launch 🚀"; // Fun emoji 
app.append(button);

// div element that displays counter
const counterDisplay = document.createElement("div");
let counter: number = 0;
counterDisplay.innerHTML = `${counter.toFixed(2)} launches 🚀`; // initial counter with 2 decimal points 
app.append(counterDisplay);

// Function to update the counter display
const updateCounterDisplay = () => {
  counterDisplay.innerHTML = `${counter.toFixed(2)} launches 🚀`; // Update the display with new counter value
};

// Event listener to increase the counter on button click
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay(); // Update the counter display
});

// Animation frame counter increment
let lastTimestamp: number = 0;
const incrementPerSecond = 1; // 1 unit per second

const animate = (timestamp: number) => {
  if (!lastTimestamp) lastTimestamp = timestamp; //  initial timestamp 
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  counter += deltaTime * incrementPerSecond; // Increase counter based on time passed
  updateCounterDisplay(); // Update counter display
  lastTimestamp = timestamp; // Update last timestamp
  requestAnimationFrame(animate); // Continue to request next animation frame
};

// Start the animation loop
requestAnimationFrame(animate);
