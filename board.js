class Board {
  constructor(stage) {
    this.stage = stage;
    this.rows = 10;
    this.cols = 10;

    this.gridContainer = this.initializeGridPosition();
    this.grid = this.createGrid();
  }

  initializeGridPosition() {
    const topOffset = 30; // Directly use the value here
    const leftOffset = 35; // Directly use the value here

    let gridContainer = document.createElement("div");
    gridContainer.className = "grid-container";
    gridContainer.style.position = "absolute";
    gridContainer.style.top = `${topOffset}px`;
    gridContainer.style.left = `${leftOffset}px`;
    gridContainer.style.width = `calc(100% - ${leftOffset}px)`;
    gridContainer.style.height = `calc(100% - ${topOffset}px)`;
    this.stage.appendChild(gridContainer);
    return gridContainer;
  }
  createGrid() {
    let grid = [];
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.cols; c++) {
        let cell = new Cell(r, c, this.gridContainer);
        row.push(cell);
      }
      grid.push(row);
    }
    return grid;
  }

  highlightValidPositions(shipSize, orientation) {
    const occupiedCells = this.getOccupiedCells(); // Implement a method to get all occupied cells

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let isValid = true;

        // Check if the cell is already occupied by the Patrol ship
        if (
          occupiedCells.some((cell) => cell.row === row && cell.col === col)
        ) {
          isValid = false;
        }

        // Check if the ship fits vertically or horizontally without going out of bounds
        if (orientation === "vertical") {
          if (row + shipSize > this.rows) isValid = false;
        } else {
          if (col + shipSize > this.cols) isValid = false;
        }

        // Highlight the cell if the position is valid
        if (isValid) {
          this.grid[row][col].highlight(); // Apply highlight to valid positions
        }
      }
    }
  }

  getOccupiedCells() {
    let occupiedCells = [];
    // Add logic to collect all occupied cells from placed ships
    // For example, you can iterate over all ships and add their occupied cells to this list
    return occupiedCells;
  }
}
