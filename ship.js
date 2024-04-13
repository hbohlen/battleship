class Ship {
  constructor(type, size, startPosition, orientation, parent) {
    this.parent = parent;
    console.log("Parent Element:", parent);
    this.type = type;
    this.size = size;
    this.startPosition = startPosition;
    this.orientation = orientation;
    this.positions = [];
    this.hits = 0;
    this.element = document.createElement("div");
    this.element.className = "ship";

    this.calculateShipPosition();
    this.setShipImage(type);
    this.setShipSize(type);
    this.rotateShip();
    this.setPosition();
    this.logCoordinates();
  }

  calculateShipPosition() {
    for (let i = 0; i < this.size; i++) {
      const row =
        this.startPosition.row + (this.orientation === "vertical" ? i : 0);
      const col =
        this.startPosition.col + (this.orientation === "horizontal" ? i : 0);
      const cell = new Cell(null, row, col, 0, 0, 0, 0);
      this.positions.push(cell);
    }
    console.log("Calculated ship positions:", this.positions);
  }

  setShipImage(type) {
    const imageUrlMap = {
      patrol: "url(images/ShipPatrolHull.png)",
      battleship: "url(images/ShipBattleshipHull.png)",
      destroyer: "url(images/ShipDestroyerHull.png)",
    };
    this.element.style.backgroundImage = imageUrlMap[type] || "";
  }

  setShipSize(type) {
    const cellWidth = 36.7; // Adjust based on your grid cell size
    this.element.style.width = this.size * cellWidth + "px";
    this.element.style.height = "27.4px"; // Fixed cell height
  }

  rotateShip() {
    if (this.orientation === "horizontal") {
      this.element.style.transform = "rotate(270deg)";
      this.element.style.transformOrigin = "top left";
    } else {
      this.element.style.transform = "rotate(0deg)";
    }
  }

  setPosition() {
    if (this.parent) {
      // Logic to position the ship element
      console.log("Appending ship element to parent element:", this.parent); // Log when successfully appending to parent element

      const cellWidth = 36.7; // Adjust based on your grid cell size
      const cellHeight = 27.4; // Adjust based on your grid cell size
      const halfCellWidth = cellWidth / 2;
      const halfCellHeight = cellHeight / 2;

      const startCell = this.positions[0];
      const endCell = this.positions[this.size - 1];

      const left =
        ((startCell.col + endCell.col + 2) * cellWidth) / 2 - halfCellWidth;
      const top =
        ((startCell.row + endCell.row + 2) * cellHeight) / 2 - halfCellHeight;

      this.element.style.position = "absolute";
      this.element.style.left = left + "px";
      this.element.style.top = top + "px";

      // Append to parent element
      this.parent.appendChild(this.element);
    } else {
      console.log(
        "Parent element is null or undefined. Cannot append ship element."
      ); // Log when parent element is missing
    }
  }

  logCoordinates() {
    for (let cell of this.positions) {
      console.log(`Ship ${this.type} occupies: ${Board.convertCoords(cell)}`);
    }
  }

  isHit(guess) {
    for (let position of this.positions) {
      if (guess.row === position.row && guess.col === position.col) {
        this.hits++;
        return true;
      }
    }
    return false;
  }

  isSunk() {
    return this.hits >= this.size;
  }
}
