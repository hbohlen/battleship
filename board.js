class Board {
  constructor() {
    this.rows = 10;
    this.cols = 10;
    this.topOffset = 30;
    this.leftOffset = 35; // Set this to a fixed value

    this.gridContainer = this.initializeGridPosition();
    this.grid = this.createGrid();

    this.ships = [];
    this.doShipsOverlap = this.doShipsOverlap.bind(this);
    this.placeRandomShip = this.placeRandomShip.bind(this);

    console.log(
      `Stage starts at pixel (${stage.getBoundingClientRect().left}, ${
        stage.getBoundingClientRect().top
      })`
    );

    this.debug = true;

    if (this.debug) {
      console.log("Creating a new Board");
      console.log(
        `Board created with ${this.rows} rows and ${this.cols} columns`
      );
    }
  }

  initializeGridPosition() {
    let gridContainer = document.createElement("div");
    gridContainer.className = "grid-container";
    gridContainer.style.position = "absolute";
    gridContainer.style.top = `${this.topOffset}px`;
    gridContainer.style.left = `${this.leftOffset}px`;
    gridContainer.style.width = `calc(100% - ${this.leftOffset}px)`; // Subtract the left offset from the width
    gridContainer.style.height = `calc(100% - ${this.topOffset}px)`;
    stage.appendChild(gridContainer);
    return gridContainer;
  }

  createGrid() {
    let grid = [];

    if (this.debug) {
      console.log(`Cell width: ${cellWidth}px, Cell height: ${cellHeight}px`);
    }

    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.cols; c++) {
        let cell = new Cell(r, c, this.gridContainer);
        row.push(cell);
      }
      grid.push(row);
    }

    this.grid = grid;

    let ship = new Ship(this.gridContainer, this.grid, 4); // Create a ship with a size of 4 // Create a ship with a size of 4
    this.placeRandomShip(ship);
    console.log(ship.getCells());

    let patrolBoat = new Ship(this.gridContainer, this.grid, 2); // Create a patrol boat with a size of 2
    this.placeRandomShip(patrolBoat);
    console.log(patrolBoat.getCells());

    let destroyer = new Ship(this.gridContainer, this.grid, 3); // Create a destroyer with a size of 3
    this.placeRandomShip(destroyer);
    console.log(destroyer.getCells());

    let position = ship.getPosition();
    console.log(position); // Log the position of the ship

    if (this.debug) {
      console.log("Grid created");
    }
    return grid;
  }

  placeRandomShip(ship) {
    let row, col, initialCell, lastCell;

    do {
      // Generate random starting position for the ship
      row = Math.floor(Math.random() * this.grid.length);
      col = Math.floor(Math.random() * this.grid[0].length);
      initialCell = this.grid[row][col];

      // Calculate the final position based on the ship's direction and size
      if (ship.direction === "horizontal") {
        lastCell =
          this.grid[row][
            Math.min(col + ship.size - 1, this.grid[0].length - 1)
          ];
      } else if (ship.direction === "vertical") {
        lastCell =
          this.grid[Math.min(row + ship.size - 1, this.grid.length - 1)][col];
      }
    } while (!this.isShipFit(initialCell, lastCell, ship.direction, ship.size));

    // Position the ship in the calculated cells
    ship.positionInCell(initialCell, lastCell);

    if (this.doShipsOverlap(ship)) {
      // If it does, try again
      this.placeRandomShip(ship);
    } else {
      // Add the ship to the ships array only if it doesn't overlap
      this.ships.push(ship);
    }
  }

  isCellOccupied(cell) {
    return cell.hasShip;
  }

  doShipsOverlap(newShip) {
    for (let existingShip of this.ships) {
      let existingShipCells = existingShip.getCells();
      let newShipCells = newShip.getCells();

      for (let cell of newShipCells) {
        if (
          existingShipCells.some(
            (existingCell) =>
              existingCell.row === cell.row && existingCell.col === cell.col
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }

  isShipFit(initialCell, lastCell, direction, shipSize) {
    // Check if the ship fits within the board
    if (direction === "horizontal") {
      if (lastCell.col - initialCell.col + 1 !== shipSize) {
        return false;
      }
      // Check if any of the cells are already occupied
      for (let col = initialCell.col; col <= lastCell.col; col++) {
        if (this.isCellOccupied(this.grid[initialCell.row][col])) {
          return false;
        }
      }
    } else if (direction === "vertical") {
      if (lastCell.row - initialCell.row + 1 !== shipSize) {
        return false;
      }
      // Check if any of the cells are already occupied
      for (let row = initialCell.row; row <= lastCell.row; row++) {
        if (this.isCellOccupied(this.grid[row][initialCell.col])) {
          return false;
        }
      }
    }
    return true;
  }
}
