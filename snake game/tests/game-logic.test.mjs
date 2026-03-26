import test from "node:test";
import assert from "node:assert/strict";
import {
  advanceState,
  createInitialState,
  placeFood,
  setDirection,
} from "../src/game-logic.mjs";

test("moves one cell in current direction", () => {
  const state = {
    width: 10,
    height: 10,
    tickMs: 120,
    snake: [
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
    ],
    direction: "RIGHT",
    nextDirection: null,
    food: { x: 8, y: 8 },
    score: 0,
    status: "running",
  };

  const next = advanceState(state);
  assert.deepEqual(next.snake, [
    { x: 4, y: 3 },
    { x: 3, y: 3 },
    { x: 2, y: 3 },
  ]);
  assert.equal(next.score, 0);
});

test("grows and increments score when food is eaten", () => {
  const state = {
    width: 10,
    height: 10,
    tickMs: 120,
    snake: [
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
    ],
    direction: "RIGHT",
    nextDirection: null,
    food: { x: 4, y: 3 },
    score: 0,
    status: "running",
  };

  const next = advanceState(state, () => 0);
  assert.equal(next.snake.length, 4);
  assert.equal(next.score, 1);
});

test("ends game on wall collision", () => {
  const state = {
    width: 5,
    height: 5,
    tickMs: 120,
    snake: [
      { x: 4, y: 2 },
      { x: 3, y: 2 },
      { x: 2, y: 2 },
    ],
    direction: "RIGHT",
    nextDirection: null,
    food: { x: 0, y: 0 },
    score: 0,
    status: "running",
  };

  const next = advanceState(state);
  assert.equal(next.status, "over");
});

test("ends game on self collision", () => {
  const state = {
    width: 6,
    height: 6,
    tickMs: 120,
    snake: [
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
    ],
    direction: "RIGHT",
    nextDirection: null,
    food: { x: 5, y: 5 },
    score: 0,
    status: "running",
  };

  const next = advanceState(state);
  assert.equal(next.status, "over");
});

test("food placement avoids snake cells", () => {
  const snake = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ];

  const food = placeFood(2, 2, snake, () => 0);
  assert.deepEqual(food, { x: 1, y: 1 });
});

test("cannot reverse direction in one step", () => {
  const state = createInitialState({ width: 10, height: 10, rng: () => 0 });
  const next = setDirection(state, "LEFT");
  assert.equal(next.nextDirection, null);
});
