const WIDTH = 16;
const HEIGHT = 16;
const unitSpace = 40;

const board = document.querySelector(".board");

let DIRECTION = "LEFT";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

function newFood() {
  let pos;
  let isOnSnake = true;
  while (isOnSnake) {
    pos = { x: getRandomInt(0, HEIGHT), y: getRandomInt(0, WIDTH) };
    isOnSnake = snake.some(segment => pos.x === segment.x && pos.y === segment.y);
  }
  return pos;
}

let snake = [
  { x: Math.floor(HEIGHT / 2), y: Math.floor(WIDTH / 2) },
  { x: Math.floor(HEIGHT / 2) - 1, y: Math.floor(WIDTH / 2) },
  { x: Math.floor(HEIGHT / 2) - 2, y: Math.floor(WIDTH / 2) },
];

let food = newFood();

const drawBoard = () => {
  board.innerHTML = "";
  board.style.width = `${unitSpace * WIDTH}px`;
  board.style.height = `${unitSpace * HEIGHT}px`;

  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      const tileEl = document.createElement("div");
      tileEl.setAttribute("x", row);
      tileEl.setAttribute("y", col);
      tileEl.className = "tile";
      board.appendChild(tileEl);
    }
  }

  const foodEl = document.querySelector(`[x="${food.x}"][y="${food.y}"]`);
  if (foodEl) foodEl.classList.add("food");

  for (let i = 0; i < snake.length; i++) {
    const segment = snake[i];
    const segmentEl = document.querySelector(`[x="${segment.x}"][y="${segment.y}"]`);
    if (segmentEl) {
      if (i === 0) {
        segmentEl.classList.add("head");
      } else {
        segmentEl.classList.add("body");
      }
    }
  }
};

const gameLoop = () => {
  const newSnake = [];


  if (DIRECTION === "RIGHT") {
    newSnake[0] = { x: snake[0].x, y: (snake[0].y + 1) % WIDTH };
  } else if (DIRECTION === "LEFT") {
    let nextY = snake[0].y - 1;
    if (nextY === -1) nextY = WIDTH - 1;
    newSnake[0] = { x: snake[0].x, y: nextY };
  } else if (DIRECTION === "BOTTOM") {
    newSnake[0] = { x: (snake[0].x + 1) % HEIGHT, y: snake[0].y };
  } else if (DIRECTION === "TOP") {
    let nextX = snake[0].x - 1;
    if (nextX === -1) nextX = HEIGHT - 1;
    newSnake[0] = { x: nextX, y: snake[0].y };
  }

  for (let i = 0; i < snake.length - 1; i++) {
    newSnake[i + 1] = snake[i];
  }

  if (snake[0].x === food.x && snake[0].y === food.y) {
    newSnake.push(snake[snake.length - 1]);
    food = newFood();
  }

  snake = newSnake;
  drawBoard();
};

drawBoard();

setInterval(gameLoop, 100);

window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "ArrowUp" && DIRECTION !== "BOTTOM") {
    DIRECTION = "TOP";
  } else if (key === "ArrowDown" && DIRECTION !== "TOP") {
    DIRECTION = "BOTTOM";
  } else if (key === "ArrowRight" && DIRECTION !== "LEFT") {
    DIRECTION = "RIGHT";
  } else if (key === "ArrowLeft" && DIRECTION !== "RIGHT") {
    DIRECTION = "LEFT";
  }
});
