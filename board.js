class Board {
  constructor(parent) {
    this.parent = parent;
    this.rows = 10;
    this.cols = 10;
    this.topOffset = 30;
    this.leftOffset = 30; // Set this to a fixed value
    this.stageWidth = 400; // Set this to a fixed value
    this.grid = this.createGrid();

    console.log(
      `Stage starts at pixel (${this.parent.getBoundingClientRect().left}, ${
        this.parent.getBoundingClientRect().top
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

  createGrid() {
    let grid = [];
    // Calculate the size of each cell in pixels
    let cellWidth = ((this.stageWidth - this.leftOffset) / this.cols) * 0.98; // Reduce cell width by 10%
    let cellHeight = ((300 - this.topOffset) / this.rows) * 0.99; // Assuming the stage height is 300

    if (this.debug) {
      console.log(`Cell width: ${cellWidth}px, Cell height: ${cellHeight}px`);
    }

    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.cols; c++) {
        let cell = new Cell(
          this.parent,
          r,
          c,
          this.topOffset,
          this.leftOffset,
          cellWidth,
          cellHeight
        );
        row.push(cell);
      }
      grid.push(row);
    }

    if (this.debug) {
      console.log("Grid created");
    }
    return grid;
  }
}
