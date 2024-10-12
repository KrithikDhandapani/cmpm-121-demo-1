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
counterDisplay.innerHTML = `${counter} launches 🚀`; // Display initial counter 
app.append(counterDisplay);

// Function to update the counter display
const updateCounterDisplay = () => {
  counterDisplay.innerHTML = `${counter} launches 🚀`; // Update the display with new counter value
};

// Event listener to increase the counter on button click
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay(); // Update the counter display
});

// increase counter every 1 second
setInterval(() => {
  counter++;
  updateCounterDisplay(); // Update the counter display
}, 1000); 
