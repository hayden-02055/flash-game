import {
  advanceState,
  createInitialState,
  restart,
  setDirection,
  togglePause,
} from "./game-logic.mjs";

const gridElement = document.querySelector("#grid");
const scoreElement = document.querySelector("#score");
const statusElement = document.querySelector("#status");
const pauseButton = document.querySelector("#pause-btn");
const restartButton = document.querySelector("#restart-btn");

let state = createInitialState({ width: 20, height: 20, tickMs: 120 });
const cells = [];

function createGrid() {
  const count = state.width * state.height;
  for (let i = 0; i < count; i += 1) {
    const cell = document.createElement("div");
    cell.className = "cell";
    gridElement.appendChild(cell);
    cells.push(cell);
  }
}

function getIndex(x, y) {
  return y * state.width + x;
}

function render() {
  for (const cell of cells) {
    cell.className = "cell";
  }

  for (const segment of state.snake) {
    const index = getIndex(segment.x, segment.y);
    if (cells[index]) {
      cells[index].classList.add("snake");
    }
  }

  if (state.food) {
    const foodIndex = getIndex(state.food.x, state.food.y);
    if (cells[foodIndex]) {
      cells[foodIndex].classList.add("food");
    }
  }

  scoreElement.textContent = String(state.score);
  statusElement.textContent =
    state.status === "running"
      ? "Running"
      : state.status === "paused"
      ? "Paused"
      : "Game Over";
  pauseButton.textContent = state.status === "paused" ? "Resume" : "Pause";
}

function tick() {
  const next = advanceState(state);
  state = next;
  render();
}

function handleDirection(direction) {
  state = setDirection(state, direction);
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (key === "arrowup" || key === "w") handleDirection("UP");
  if (key === "arrowdown" || key === "s") handleDirection("DOWN");
  if (key === "arrowleft" || key === "a") handleDirection("LEFT");
  if (key === "arrowright" || key === "d") handleDirection("RIGHT");

  if (key === " ") {
    event.preventDefault();
    state = togglePause(state);
    render();
  }

  if (key === "r") {
    state = restart(state);
    render();
  }
});

pauseButton.addEventListener("click", () => {
  state = togglePause(state);
  render();
});

restartButton.addEventListener("click", () => {
  state = restart(state);
  render();
});

document.querySelectorAll("[data-dir]").forEach((button) => {
  button.addEventListener("click", () => {
    handleDirection(button.dataset.dir);
  });
});

createGrid();
render();
setInterval(tick, state.tickMs);
