class Ship {
  constructor(type, size, direction, gridContainer, ctx) {
    this.type = type; // Type of the ship (e.g., "Destroyer")
    this.size = size; // Size of the ship (e.g., 3 cells)
    this.direction = direction; // "horizontal" or "vertical"
    this.gridContainer = gridContainer; // The container to which the ship will be attached
    this.ctx = ctx; // Add the canvas drawing context
    this.hits = 0; // Track the number of hits
    this.occupiedCells = []; // Array to store positions (row, col) the ship occupies

    // this.createElement(); // This method is now removed or commented out
  }

  // createElement() method is removed or commented out

  draw() {
    // Implement drawing logic based on this.type, this.size, and this.direction
    // Use this.ctx to draw on the canvas
  }

  registerHit() {
    this.hits += 1;
    // Check if hits equal size and handle ship destruction
    // Trigger explosion animation
  }

  setPosition(row, col) {
    // Clear previous positions
    this.occupiedCells = [];

    if (this.direction === "vertical") {
      for (let i = 0; i < this.size; i++) {
        this.occupiedCells.push({ row: row + i, col: col });
      }
    } else {
      // Assuming horizontal direction
      for (let i = 0; i < this.size; i++) {
        this.occupiedCells.push({ row: row, col: col + i });
      }
    }
    // Positioning logic will need to be updated to work with canvas drawing instead of CSS
  }

  isCellOccupied(row, col) {
    return this.occupiedCells.some(
      (cell) => cell.row === row && cell.col === col
    );
  }
}
