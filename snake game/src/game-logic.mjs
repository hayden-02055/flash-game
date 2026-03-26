export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const OPPOSITE = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

export function createInitialState(config = {}) {
  const width = config.width ?? 20;
  const height = config.height ?? 20;
  const tickMs = config.tickMs ?? 120;
  const rng = config.rng ?? Math.random;
  const startX = Math.floor(width / 2);
  const startY = Math.floor(height / 2);
  const snake = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
  ];

  return {
    width,
    height,
    tickMs,
    snake,
    direction: "RIGHT",
    nextDirection: null,
    food: placeFood(width, height, snake, rng),
    score: 0,
    status: "running",
  };
}

export function setDirection(state, requestedDirection) {
  if (!DIRECTIONS[requestedDirection]) return state;
  if (state.status === "over") return state;

  const fromDirection = state.nextDirection ?? state.direction;
  if (OPPOSITE[fromDirection] === requestedDirection) {
    return state;
  }

  return { ...state, nextDirection: requestedDirection };
}

export function togglePause(state) {
  if (state.status === "over") return state;
  if (state.status === "running") return { ...state, status: "paused" };
  return { ...state, status: "running" };
}

export function restart(state, config = {}) {
  return createInitialState({
    width: config.width ?? state.width,
    height: config.height ?? state.height,
    tickMs: config.tickMs ?? state.tickMs,
    rng: config.rng,
  });
}

export function advanceState(state, rng = Math.random) {
  if (state.status !== "running") {
    return state;
  }

  const direction = state.nextDirection ?? state.direction;
  const move = DIRECTIONS[direction];
  const head = state.snake[0];
  const newHead = { x: head.x + move.x, y: head.y + move.y };

  if (isOutOfBounds(newHead, state.width, state.height)) {
    return { ...state, status: "over", direction, nextDirection: null };
  }

  const ateFood = newHead.x === state.food.x && newHead.y === state.food.y;
  const newSnake = [newHead, ...state.snake];

  if (!ateFood) {
    newSnake.pop();
  }

  if (isSelfCollision(newSnake)) {
    return { ...state, status: "over", direction, nextDirection: null, snake: newSnake };
  }

  const food = ateFood ? placeFood(state.width, state.height, newSnake, rng) : state.food;

  return {
    ...state,
    snake: newSnake,
    direction,
    nextDirection: null,
    food,
    score: state.score + (ateFood ? 1 : 0),
  };
}

export function isOutOfBounds(point, width, height) {
  return point.x < 0 || point.y < 0 || point.x >= width || point.y >= height;
}

export function isSelfCollision(snake) {
  const [head, ...rest] = snake;
  return rest.some((segment) => segment.x === head.x && segment.y === head.y);
}

export function placeFood(width, height, snake, rng = Math.random) {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
  const openCells = [];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const key = `${x},${y}`;
      if (!occupied.has(key)) {
        openCells.push({ x, y });
      }
    }
  }

  if (openCells.length === 0) {
    return null;
  }

  const index = Math.floor(rng() * openCells.length);
  return openCells[index];
}
