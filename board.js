class Board {
  constructor() {
    this.rows = 10;
    this.cols = 10;
    this.topOffset = 30;
    this.leftOffset = 35; // Set this to a fixed value

    this.gridContainer = this.initializeGridPosition();
    this.grid = this.createGrid();

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

    let ship = new Ship(this.gridContainer, 4); // Create a ship with a size of 3
    ship.positionInCell(this.grid[0][0], this.grid[3][0]);

    let position = ship.getPosition();
    console.log(position); // Log the position of the ship

    if (this.debug) {
      console.log("Grid created");
    }
    return grid;
  }
}
