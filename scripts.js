import { Ship } from "./ship.js";

document.addEventListener("DOMContentLoaded", () => {
  const ships = [
    new Ship("Patrol", 2, "vertical", 0, 0),
    new Ship("Destroyer", 3, "horizontal", 5, 0),
    new Ship("Battleship", 4, "vertical", 2, 3),
    // Add more ships as needed
  ];
  const canvas = document.getElementById("stage");
  const gridCanvas = document.getElementById("gridCanvas"); // Grab the gridCanvas element
  const ctx = canvas.getContext("2d");
  const gridCtx = gridCanvas.getContext("2d"); // Get the context for gridCanvas
  const shipsCanvas = document.getElementById("shipsCanvas");
  const shipsCtx = shipsCanvas.getContext("2d");
  const rows = 10; // Example row count
  const cols = 10; // Example column count

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
    gridCtx.setLineDash([]); // Reset the dash pattern to solid
  }

  // Call drawGrid function after defining it
  drawGrid();

  function highlightCell(event) {
    // Clear the canvas and redraw the grid to remove previous highlights
    gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    drawGrid();
    drawShips(); // Redraw ships after the grid is redrawn

    const rect = gridCanvas.getBoundingClientRect();
    const scaleX = gridCanvas.width / rect.width; // Ratio of actual width to displayed width
    const scaleY = gridCanvas.height / rect.height; // Ratio of actual height to displayed height
    const mouseX = (event.clientX - rect.left) * scaleX; // Adjusted X coordinate
    const mouseY = (event.clientY - rect.top) * scaleY; // Adjusted Y coordinate
    const cellX = Math.floor(mouseX / (gridCanvas.width / cols));
    const cellY = Math.floor(mouseY / (gridCanvas.height / rows));

    // Highlight the cell
    gridCtx.fillStyle = "red";
    gridCtx.fillRect(
      cellX * (gridCanvas.width / cols),
      cellY * (gridCanvas.height / rows),
      gridCanvas.width / cols,
      gridCanvas.height / rows
    );
  }

  gridCanvas.addEventListener("mousemove", highlightCell);

  gridCanvas.addEventListener("click", function (event) {
    const rect = gridCanvas.getBoundingClientRect();
    const scaleX = gridCanvas.width / rect.width; // Ratio of actual width to displayed width
    const scaleY = gridCanvas.height / rect.height; // Ratio of actual height to displayed height
    const mouseX = (event.clientX - rect.left) * scaleX; // Adjusted X coordinate
    const mouseY = (event.clientY - rect.top) * scaleY; // Adjusted Y coordinate
    const cellX = Math.floor(mouseX / (gridCanvas.width / cols));
    const cellY = Math.floor(mouseY / (gridCanvas.height / rows));

    // Convert cellX from number to letter for columns A-J
    const columnLabel = String.fromCharCode(65 + cellX); // Convert 0-9 to A-J
    console.log(`Clicked cell at: ${columnLabel}, ${cellY + 1}`); // Adjust cellY to 1-10

    const hitShip = ships.find((ship) => {
      const relativePosition =
        ship.orientation === "horizontal"
          ? cellX - ship.startX
          : cellY - ship.startY;
      return (
        relativePosition >= 0 &&
        relativePosition < ship.length &&
        !ship.isPositionHit(relativePosition)
      );
    });

    if (hitShip) {
      const relativePosition =
        hitShip.orientation === "horizontal"
          ? cellX - hitShip.startX
          : cellY - hitShip.startY;
      console.log(`Hit detected on ${hitShip.name}`);
      hitShip.hit(relativePosition); // Mark the hit with the relative position
      if (hitShip.isSunk()) {
        console.log(`${hitShip.name} is sunk!`);
        checkAllShipsSunk();
      }
      // Calculate the center of the hit cell for the animation
      const hitX =
        cellX * (gridCanvas.width / cols) + gridCanvas.width / cols / 2;
      const hitY =
        cellY * (gridCanvas.height / rows) + gridCanvas.height / rows / 2;
      animateHit(hitX, hitY); // Call animateHit with the center coordinates of the hit cell
    } else {
      console.log("Miss or already hit");
      // Handle miss logic or already hit cell
    }
  });

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
  explosionImage.src = "./images/explosion.png";

  function animateHit(x, y) {
    let size = 0; // Initial size of the explosion
    const maxSize = 40; // Increased maximum size of the explosion
    const animationStep = 5; // How much the explosion grows each frame
    const shipCellWidth = gridCanvas.width / cols; // Width of a cell
    const shipCellHeight = gridCanvas.height / rows; // Height of a cell

    function draw() {
      gridCtx.save(); // Save the current state before clipping
      gridCtx.clearRect(x - size / 2, y - size / 2, size, size);
      gridCtx.beginPath();
      gridCtx.arc(x, y, size / 2, 0, 2 * Math.PI);
      gridCtx.closePath();
      gridCtx.clip();
      gridCtx.drawImage(explosionImage, x - size / 2, y - size / 2, size, size);
      gridCtx.restore(); // Restore the context to remove the clipping effect for future drawings
      // Increase the size for the next frame
      size += animationStep;
      if (size > maxSize) size = maxSize;

      // Continue the animation if the maximum size hasn't been reached
      if (size < maxSize) {
        requestAnimationFrame(draw);
      }
    }

    draw();
  }
});
