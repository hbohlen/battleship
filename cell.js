class Cell {
  constructor(parent, row, col, topOffset, leftOffset, cellWidth, cellHeight) {
    this.parent = parent;
    this.row = row;
    this.col = col;
    this.element = document.createElement("div");
    this.element.className = "cell";
    // Set position and size using pixels
    this.element.style.top = `${topOffset + row * cellHeight}px`;
    this.element.style.left = `${leftOffset + col * cellWidth}px`;
    this.element.style.width = `${cellWidth}px`;
    this.element.style.height = `${cellHeight}px`;
    this.parent.appendChild(this.element);

    // Add event listeners
    this.addEventListeners();
  }

  addEventListeners() {
    // Add mouseover event listener
    this.element.addEventListener("mouseover", () => {
      this.element.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // Change color to red on hover
    });

    // Add mouseout event listener
    this.element.addEventListener("mouseout", () => {
      this.element.style.backgroundColor = "transparent"; // Revert color when not hovering
    });

    // Add click event listener
    this.element.addEventListener("click", () => {
      console.log(
        `Cell clicked at position ${Cell.getConvertedCoordinate(
          this.col,
          this.row
        )}`
      );
    });
  }

  getCenterPosition() {
    const x = parseInt(this.element.style.left, 10);
    const y = parseInt(this.element.style.top, 10);
    const width = parseInt(this.element.style.width, 10);
    const height = parseInt(this.element.style.height, 10);

    const centerX = x + width / 2;
    const centerY = y + height / 2;

    console.log("Center position:", { x: centerX, y: centerY });
    return { x: centerX, y: centerY };
  }

  static getConvertedCoordinate(x, y) {
    const colLetter = String.fromCharCode("A".charCodeAt(0) + x);
    const rowNum = y + 1;
    return `${colLetter}${rowNum}`;
  }
}
