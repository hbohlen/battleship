import { Ship } from "./ship.js";

// Helper function to check if a ship can be placed
function canPlaceShip(ship, ships, rows, cols) {
  for (let i = 0; i < ship.length; i++) {
    const posX =
      ship.orientation === "horizontal" ? ship.startX + i : ship.startX;
    const posY =
      ship.orientation === "vertical" ? ship.startY + i : ship.startY;

    // Check bounds
    if (posX >= cols || posY >= rows) return false;

    // Check overlap
    for (const otherShip of ships) {
      if (otherShip === ship) continue;
      for (let j = 0; j < otherShip.length; j++) {
        const otherPosX =
          otherShip.orientation === "horizontal"
            ? otherShip.startX + j
            : otherShip.startX;
        const otherPosY =
          otherShip.orientation === "vertical"
            ? otherShip.startY + j
            : otherShip.startY;

        if (posX === otherPosX && posY === otherPosY) return false;
      }
    }
  }
  return true;
}

// Function to randomly place all ships with random orientations
function placeShipsRandomly(ships, rows, cols) {
  ships.forEach((ship) => {
    let placed = false;
    while (!placed) {
      const randomX = Math.floor(Math.random() * cols);
      const randomY = Math.floor(Math.random() * rows);
      const randomOrientation = Math.random() > 0.5 ? "horizontal" : "vertical"; // Randomly set orientation

      ship.startX = randomX;
      ship.startY = randomY;
      ship.orientation = randomOrientation;

      if (canPlaceShip(ship, ships, rows, cols)) {
        placed = true;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const ships = [
    new Ship("Patrol", 2),
    new Ship("Destroyer", 3),
    new Ship("Battleship", 4),
    // Add more ships as needed
  ];
  const canvas = document.getElementById("stage");
  const gridCanvas = document.getElementById("gridCanvas"); // Grab the gridCanvas element
  const ctx = canvas.getContext("2d");
  const gridCtx = gridCanvas.getContext("2d"); // Get the context for gridCanvas
  const shipsCanvas = document.getElementById("shipsCanvas");
  const shipsCtx = shipsCanvas.getContext("2d");
  const explosionCanvas = document.getElementById("explosionCanvas");
  const explosionCtx = explosionCanvas.getContext("2d");

  const rows = 10; // Example row count
  const cols = 10; // Example column count
  const misses = [];
  const hits = [];

  placeShipsRandomly(ships, rows, cols);

  function drawGrid() {
    const numRows = 10;
    const numCols = 10;
    const cellWidth = gridCanvas.width / numCols;
    const cellHeight = gridCanvas.height / numRows;

    gridCtx.strokeStyle = "#FFFFFF"; // Set the line color to white
    gridCtx.lineWidth = 0.5; // Set the line width to 0.5 for finer lines
    gridCtx.setLineDash([1, 1]); // Adjust the dash pattern for a more fine dotted line
    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
        gridCtx.strokeRect(
          i * cellWidth,
          j * cellHeight,
          cellWidth,
          cellHeight
        );
      }
    }
    // Redraw hits and misses
    hits.forEach((hit) => drawHitMarker(hit.x, hit.y));
    misses.forEach((miss) => drawMissMarker(miss.x, miss.y));
    gridCtx.setLineDash([]); // Reset the dash pattern to solid
  }

  // Call drawGrid function after defining it
  drawGrid();

  function highlightCell(event) {
    gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    drawGrid(); // Redraw grid to clear previous highlights
    drawShips(); // Ensure ships are redrawn if you are showing them

    const rect = gridCanvas.getBoundingClientRect();
    const scaleX = gridCanvas.width / rect.width;
    const scaleY = gridCanvas.height / rect.height;
    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;
    const cellX = Math.floor(mouseX / (gridCanvas.width / cols));
    const cellY = Math.floor(mouseY / (gridCanvas.height / rows));

    const centerX =
      cellX * (gridCanvas.width / cols) + gridCanvas.width / cols / 2;
    const centerY =
      cellY * (gridCanvas.height / rows) + gridCanvas.height / rows / 2;
    const radius = gridCanvas.width / cols / 4; // Reticule radius

    // Draw circle for reticule
    gridCtx.strokeStyle = "red";
    gridCtx.beginPath();
    gridCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    gridCtx.stroke();

    // Draw crosshairs
    gridCtx.beginPath();
    gridCtx.moveTo(centerX - radius, centerY);
    gridCtx.lineTo(centerX + radius, centerY);
    gridCtx.moveTo(centerX, centerY - radius);
    gridCtx.lineTo(centerX, centerY + radius);
    gridCtx.stroke();
  }

  gridCanvas.addEventListener("mousemove", function (event) {
    if (!isAnimating) {
      // Only highlight if no animation is ongoing
      highlightCell(event);
    }
  });

  gridCanvas.addEventListener("click", function (event) {
    if (isAnimating) {
      console.log("Animation in progress, please wait.");
      return;
    }
    const rect = gridCanvas.getBoundingClientRect();
    const scaleX = gridCanvas.width / rect.width;
    const scaleY = gridCanvas.height / rect.height;
    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;
    const cellX = Math.floor(mouseX / (gridCanvas.width / cols));
    const cellY = Math.floor(mouseY / (gridCanvas.height / rows));

    if (
      misses.some((m) => m.x === cellX && m.y === cellY) ||
      hits.some((h) => h.x === cellX && h.y === cellY)
    ) {
      console.log("Cell already clicked");
      return;
    }

    let isHit = false;

    for (const ship of ships) {
      for (let i = 0; i < ship.length; i++) {
        const shipX =
          ship.orientation === "horizontal" ? ship.startX + i : ship.startX;
        const shipY =
          ship.orientation === "vertical" ? ship.startY + i : ship.startY;

        if (cellX === shipX && cellY === shipY) {
          console.log(`Hit detected on ${ship.name}`);
          ship.hit(i); // Assuming ship.hit marks the part of the ship hit
          hits.push({ x: cellX, y: cellY });
          animateHit(cellX, cellY, function () {
            drawHitMarker(cellX, cellY);
          });
          isHit = true;
          break;
        }
      }
      if (isHit) {
        if (ship.isSunk()) {
          console.log(`${ship.name} is sunk!`);
          checkAllShipsSunk();
        }
        break;
      }
    }

    if (!isHit) {
      console.log("Miss");
      misses.push({ x: cellX, y: cellY });
      drawMissMarker(cellX, cellY);
    }
  });

  function drawHitMarker(cellX, cellY) {
    const centerX =
      cellX * (gridCanvas.width / cols) + gridCanvas.width / cols / 2;
    const centerY =
      cellY * (gridCanvas.height / rows) + gridCanvas.height / rows / 2;
    const radius = gridCanvas.width / cols / 10;

    gridCtx.fillStyle = "red";
    gridCtx.beginPath();
    gridCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    gridCtx.fill();
  }

  // Function to draw a white marker on a miss
  function drawMissMarker(cellX, cellY) {
    const centerX =
      cellX * (gridCanvas.width / cols) + gridCanvas.width / cols / 2;
    const centerY =
      cellY * (gridCanvas.height / rows) + gridCanvas.height / rows / 2;
    const radius = gridCanvas.width / cols / 10; // Adjust radius size as needed

    gridCtx.fillStyle = "white";
    gridCtx.beginPath();
    gridCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    gridCtx.fill();
  }

  function checkAllShipsSunk() {
    const allSunk = ships.every((ship) => ship.isSunk());
    if (allSunk) {
      document.getElementById("output").textContent =
        "You won! All the ships have been sunk!";
    }
  }

  function drawShips() {
    ships.forEach((ship) => {
      const shipImage = new Image();
      shipImage.src = `./images/${ship.name}_${ship.orientation.charAt(0)}.png`;

      shipImage.onload = () => {
        console.log(`Image loaded for ${ship.name}`);
        if (ship.orientation === "vertical") {
          console.log(
            `Drawing ${ship.name} at X: ${
              ship.startX * (shipsCanvas.width / cols)
            }, Y: ${ship.startY * (shipsCanvas.height / rows)}, Width: ${
              shipsCanvas.width / cols
            }, Height: ${(shipsCanvas.height / rows) * ship.length}`
          );
          shipsCtx.drawImage(
            shipImage,
            ship.startX * (shipsCanvas.width / cols),
            ship.startY * (shipsCanvas.height / rows),
            shipsCanvas.width / cols,
            (shipsCanvas.height / rows) * ship.length
          );
        } else {
          console.log(
            `Drawing ${ship.name} at X: ${
              ship.startX * (shipsCanvas.width / cols)
            }, Y: ${ship.startY * (shipsCanvas.height / rows)}, Width: ${
              (shipsCanvas.width / cols) * ship.length
            }, Height: ${shipsCanvas.height / rows}`
          );
          shipsCtx.drawImage(
            shipImage,
            ship.startX * (shipsCanvas.width / cols),
            ship.startY * (shipsCanvas.height / rows),
            (shipsCanvas.width / cols) * ship.length,
            shipsCanvas.height / rows
          );
        }
      };
    });
  }

  // Call drawShips after drawGrid
  drawShips();

  const explosionImage = new Image();
  explosionImage.onload = function () {
    console.log("Explosion image successfully loaded.");
  };
  explosionImage.onerror = function () {
    console.log("Error loading the explosion image.");
  };
  explosionImage.src = "./images/explosion.png";

  let isAnimating = false;

  function animateHit(x, y, callback) {
    isAnimating = true;
    let size = 0;
    const maxSize = 40;
    const animationStep = 5;

    function draw() {
      explosionCtx.clearRect(
        0,
        0,
        explosionCanvas.width,
        explosionCanvas.height
      ); // Clear the canvas on each frame
      explosionCtx.beginPath();
      explosionCtx.arc(x, y, size / 2, 0, 2 * Math.PI);
      explosionCtx.closePath();
      explosionCtx.drawImage(
        explosionImage,
        x - size / 2,
        y - size / 2,
        size,
        size
      );

      size += animationStep;
      if (size < maxSize) {
        requestAnimationFrame(draw);
      } else {
        isAnimating = false;
        callback(); // Execute the callback
      }
    }

    draw();
  }
});
