class Ship {
  constructor(name, size, direction, gridContainer) {
    this.name = name; // Type of the ship (e.g., "Destroyer")
    this.size = size; // Size of the ship (e.g., 3 cells)
    this.direction = direction; // "horizontal" or "vertical"
    this.gridContainer = gridContainer; // The container to which the ship will be attached
    this.occupiedCells = []; // Array to store positions (row, col) the ship occupies
    this.hits = 0;

    console.log(`Creating ship: ${this.name}`); // Log the name when creating the ship
    this.createElement();
  }

  createElement() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.element = document.createElement("div");
    this.element.className = "ship " + this.name.toLowerCase();
    // Set background image based on ship type and direction
    let imageName =
      this.name.toLowerCase() + (this.direction === "vertical" ? "_v" : "_h");
    this.element.style.backgroundImage = `url('images/${imageName}.png')`;

    console.log(`Element created for ${this.name} with image ${imageName}`);
    this.gridContainer.appendChild(this.element);
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
    console.log(
      `Position set for ${this.name} at (${row}, ${col}) with occupied cells:`,
      this.occupiedCells
    );
  }

  isCellOccupied(row, col) {
    const occupied = this.occupiedCells.some(
      (cell) => cell.row === row && cell.col === col
    );

    return occupied;
  }
}
