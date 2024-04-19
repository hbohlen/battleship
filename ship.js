class Ship {
<<<<<<< HEAD
  constructor(type, size, direction, gridContainer, ctx) {
    this.type = type; // Type of the ship (e.g., "Destroyer")
=======
  constructor(name, size, direction, gridContainer) {
    this.name = name; // Type of the ship (e.g., "Destroyer")
>>>>>>> 500e0d63d594983797ec50d273dbba1d49dfa4ca
    this.size = size; // Size of the ship (e.g., 3 cells)
    this.direction = direction; // "horizontal" or "vertical"
    this.gridContainer = gridContainer; // The container to which the ship will be attached
    this.ctx = ctx; // Add the canvas drawing context
    this.hits = 0; // Track the number of hits
    this.occupiedCells = []; // Array to store positions (row, col) the ship occupies
    this.hits = 0;

<<<<<<< HEAD
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
=======
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
>>>>>>> 500e0d63d594983797ec50d273dbba1d49dfa4ca
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
<<<<<<< HEAD
    // Positioning logic will need to be updated to work with canvas drawing instead of CSS
=======
    this.element.style.top = `${row * 10}%`; // Position from top
    this.element.style.left = `${col * 10}%`; // Position from left
    console.log(
      `Position set for ${this.name} at (${row}, ${col}) with occupied cells:`,
      this.occupiedCells
    );
>>>>>>> 500e0d63d594983797ec50d273dbba1d49dfa4ca
  }

  isCellOccupied(row, col) {
    const occupied = this.occupiedCells.some(
      (cell) => cell.row === row && cell.col === col
    );

    return occupied;
  }
}
