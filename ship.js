class Ship {
  constructor(gridContainer, grid, size) {
    this.size = size;
    this.grid = grid;
    this.direction = Math.random() < 0.5 ? "horizontal" : "vertical";
    this.cells = [];
    this.element = document.createElement("div");
    this.element.style.backgroundColor = "rgba(255, 255, 255, 0.75)"; // White with 25% transparency
    this.element.style.position = "absolute";

    gridContainer.appendChild(this.element);
  }

  positionInCell(initialCell, lastCell) {
    let initialBounds = initialCell.getBounds();
    let lastBounds = lastCell.getBounds();
    this.element.style.top = `${initialBounds.top}px`;
    this.element.style.left = `${initialBounds.left}px`;

    // Map column indices to letters A-J
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    if (this.direction === "horizontal") {
      this.element.style.width = `${lastBounds.right - initialBounds.left}px`;
      this.element.style.height = `${
        initialBounds.bottom - initialBounds.top
      }px`;

      // Store the individual cells that the ship occupies
      for (let col = initialCell.col; col <= lastCell.col; col++) {
        this.cells.push({ row: initialCell.row + 1, col: letters[col] });
      }
    } else if (this.direction === "vertical") {
      this.element.style.height = `${lastBounds.bottom - initialBounds.top}px`;
      this.element.style.width = `${
        initialBounds.right - initialBounds.left
      }px`;

      // Store the individual cells that the ship occupies
      for (let row = initialCell.row; row <= lastCell.row; row++) {
        this.cells.push({ row: row + 1, col: letters[initialCell.col] });
      }
    }
  }

  getPosition() {
    let shipBounds = this.element.getBoundingClientRect();
    let gridContainerBounds =
      this.element.parentElement.getBoundingClientRect();
    let position = {
      top: shipBounds.top - gridContainerBounds.top,
      left: shipBounds.left - gridContainerBounds.left,
      width: shipBounds.width,
      height: shipBounds.height,
    };
    return position;
  }

  getCells() {
    // Return the cells occupied by the ship
    return this.cells;
  }
}
