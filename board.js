class Board {
  constructor(parent, rows, cols, topOffset, leftOffset) {
    this.parent = parent;
    this.rows = rows;
    this.cols = cols;
    this.topOffset = topOffset;
    this.leftOffset = leftOffset;
    this.grid = this.createGrid();
    this.ships = [];
  }

  createGrid() {
    let grid = [];
    // Calculate the size of each cell in pixels
    let cellWidth = (this.parent.offsetWidth - this.leftOffset) / this.cols;
    let cellHeight = (this.parent.offsetHeight - this.topOffset) / this.rows;

    console.log(`Cell width: ${cellWidth}px, Cell height: ${cellHeight}px`);

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
    return grid;
  }

  addShip(ship) {
    this.ships.push(ship); // Add the ship object to the array
    this.parent.appendChild(ship.element);
  }

  getCell(row, col) {
    return this.grid[row][col];
  }

  getAllShips() {
    return this.ships;
  }

  getShipAtCell(row, col) {
    return this.ships.find((ship) => ship.row === row && ship.col === col);
  }

  clearBoard() {
    this.ships.forEach((ship) => ship.element.remove());
    this.ships = [];
  }

  resetBoard() {
    this.clearBoard();
    this.grid = this.createGrid();
  }

  getEmptyCells() {
    return this.grid
      .flat()
      .filter((cell) => !this.getShipAtCell(cell.row, cell.col));
  }

  getOccupiedCells() {
    return this.grid
      .flat()
      .filter((cell) => this.getShipAtCell(cell.row, cell.col));
  }

  isValidPosition(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  getAdjacentCells(row, col) {
    const adjacentOffsets = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ];

    return adjacentOffsets
      .map((offset) => ({ row: row + offset.row, col: col + offset.col }))
      .filter(({ row, col }) => this.isValidPosition(row, col));
  }
}
