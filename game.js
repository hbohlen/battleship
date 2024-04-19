class Game {
  constructor(output) {
    this.output = output;
    this.stage = document.getElementById("stage");
    this.board = new Board(this.stage);
    this.ships = []; // Initialize the ships array
    this.init();
  }

  init() {
    const ships = [];
    this.ships.forEach((ship) => (ship.hits = 0));

    // Place the Patrol ship randomly
    const patrolShip = new Ship(
      "Patrol",
      2,
      Math.random() < 0.5 ? "vertical" : "horizontal",
      this.board.gridContainer
    );
    this.placeShipRandomly(patrolShip, ships);

    // Place the Battleship randomly
    const battleship = new Ship(
      "Battleship",
      4,
      Math.random() < 0.5 ? "vertical" : "horizontal",
      this.board.gridContainer
    );
    this.placeShipRandomly(battleship, ships);

    // Place the Destroyer randomly
    const destroyer = new Ship(
      "Destroyer",
      3,
      Math.random() < 0.5 ? "vertical" : "horizontal",
      this.board.gridContainer
    );
    this.placeShipRandomly(destroyer, ships);

    ships.forEach((ship) => {
      console.log(`${ship.name} occupied cells:`, ship.occupiedCells);
    });

    this.ships = ships;
  }

  placeShipRandomly(ship, existingShips) {
    let isValidPlacement = false;
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loops

    while (!isValidPlacement && attempts < maxAttempts) {
      attempts++;
      let randomRow = Math.floor(Math.random() * this.board.rows);
      let randomCol = Math.floor(Math.random() * this.board.cols);

      // Assume placement is valid initially
      isValidPlacement = true;

      // Check if the ship fits within the grid bounds
      if (ship.direction === "vertical") {
        if (randomRow + ship.size > this.board.rows) {
          isValidPlacement = false;
        }
      } else {
        // Horizontal
        if (randomCol + ship.size > this.board.cols) {
          isValidPlacement = false;
        }
      }

      // If it fits, check for overlap with existing ships
      if (isValidPlacement) {
        for (let i = 0; i < ship.size; i++) {
          let checkRow =
            ship.direction === "vertical" ? randomRow + i : randomRow;
          let checkCol =
            ship.direction === "horizontal" ? randomCol + i : randomCol;

          if (
            existingShips.some((ship) =>
              ship.isCellOccupied(checkRow, checkCol)
            )
          ) {
            isValidPlacement = false;
            break;
          }
        }
      }

      // If valid, set the ship's position
      if (isValidPlacement) {
        ship.setPosition(randomRow, randomCol);
        existingShips.push(ship); // Add the successfully placed ship to the list of existing ships
      }
    }

    if (!isValidPlacement) {
      console.error("Failed to place ship after " + maxAttempts + " attempts");
    }
  }

  checkForHit(row, col) {
    const hit = this.ships.some((ship) => {
      const occupied = ship.isCellOccupied(row, col);
      if (occupied) {
        ship.hits += 1; // Increment hits
        if (ship.hits === ship.size) {
          console.log(`${ship.name} has been sunk!`);
          // After sinking a ship, check if all ships have been sunk
          if (this.allShipsSunk()) {
            console.log("All ships have been sunk! Game over.");
            // Update the output div
            const outputDiv = document.getElementById("output");
            if (outputDiv) {
              outputDiv.textContent = "All ships have been sunk! Game over.";
              outputDiv.style.textAlign = "center"; // Center the text
              outputDiv.style.fontStyle = "italic"; // Make the text italic
            }
          }
        }
        const cellElement = this.stage.querySelector(
          `[data-row="${row}"][data-col="${col}"]`
        );
        if (cellElement) {
          cellElement.style.backgroundColor = "red";
        }
        return true; // Return true for a hit
      } else {
        const cellElement = this.stage.querySelector(
          `[data-row="${row}"][data-col="${col}"]`
        );
        if (cellElement) {
          cellElement.style.backgroundColor = "white";
        }
      }
      return false;
    });
    return hit;
  }

  allShipsSunk() {
    console.log("Ship statuses:");
    this.ships.forEach((ship) => {
      console.log(`${ship.name}: ${ship.hits}/${ship.size}`);
    });
    const allSunk = this.ships.every((ship) => ship.hits >= ship.size);
    console.log(`Checking all ships sunk: ${allSunk}`);

    if (allSunk) {
      // Make ships visible
      const shipElements = document.querySelectorAll(".ship");
      shipElements.forEach((el) => (el.style.visibility = "visible"));

      const outputDiv = document.getElementById("output");
      if (outputDiv) {
        outputDiv.textContent = "All ships have been sunk! Game over.";
        outputDiv.style.textAlign = "center";
        outputDiv.style.fontStyle = "italic";
      }
    }

    return allSunk;
  }
}
