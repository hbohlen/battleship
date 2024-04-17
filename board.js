class Board {
  constructor(stage) {
    this.stage = stage;
    this.rows = 10;
    this.cols = 10;
    this.topOffset = 30;
    this.leftOffset = 35; // Set this to a fixed value

    this.gridContainer = this.initializeGridPosition();
    this.grid = this.createGrid();
  }

  initializeGridPosition() {
    let gridContainer = document.createElement("div");
    gridContainer.className = "grid-container";
    gridContainer.style.position = "absolute";
    gridContainer.style.top = `${this.topOffset}px`;
    gridContainer.style.left = `${this.leftOffset}px`;
    gridContainer.style.width = `calc(100% - ${this.leftOffset}px)`;
    gridContainer.style.height = `calc(100% - ${this.topOffset}px)`;
    this.stage.appendChild(gridContainer); // Use this.stage to append the gridContainer
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
}
