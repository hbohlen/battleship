class Ship {
  constructor(type, size, direction, gridContainer) {
    this.type = type; // Type of the ship (e.g., "Destroyer")
    this.size = size; // Size of the ship (e.g., 3 cells)
    this.direction = direction; // "horizontal" or "vertical"
    this.gridContainer = gridContainer; // The container to which the ship will be attached
    this.occupiedCells = []; // Array to store positions (row, col) the ship occupies

    this.createElement();
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.className = "ship " + this.type.toLowerCase(); // Use type for specific styling

    // Assign different colors based on ship type
    switch (this.type) {
      case "Patrol":
        this.element.style.backgroundColor = "blue";
        break;
      case "Battleship":
        this.element.style.backgroundColor = "green";
        break;
      case "Destroyer":
        this.element.style.backgroundColor = "red";
        break;
      default:
        this.element.style.backgroundColor = "black";
    }

    this.gridContainer.appendChild(this.element);
    // Additional logic to position and style the ship based on its size and direction
  }

  setPosition(row, col) {
    // Clear previous positions
    this.occupiedCells = [];

    if (this.direction === "vertical") {
      this.element.style.width = `10%`; // Width for a vertical ship is the size of one cell
      this.element.style.height = `${this.size * 10}%`; // Height is size times 10%
      for (let i = 0; i < this.size; i++) {
        this.occupiedCells.push({ row: row + i, col: col });
      }
    } else {
      // Assuming horizontal direction
      this.element.style.width = `${this.size * 10}%`; // Width is size times 10% for horizontal
      this.element.style.height = `10%`; // Height for a horizontal ship is the size of one cell
      for (let i = 0; i < this.size; i++) {
        this.occupiedCells.push({ row: row, col: col + i });
      }
    }
    this.element.style.top = `${row * 10}%`; // Position from top
    this.element.style.left = `${col * 10}%`; // Position from left
  }

  isCellOccupied(row, col) {
    return this.occupiedCells.some(
      (cell) => cell.row === row && cell.col === col
    );
  }
}
