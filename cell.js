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
    this.element.style.position = "absolute";
    this.element.style.border = "1px dotted white";
    this.element.style.boxSizing = "border-box";
    this.parent.appendChild(this.element);
    this.debug = true;

    this.bounds = {
      top: topOffset + row * cellHeight,
      left: leftOffset + col * cellWidth,
      bottom: topOffset + (row + 1) * cellHeight,
      right: leftOffset + (col + 1) * cellWidth,
    };

    // Add event listeners
    this.addEventListeners();

    // Debug

    if (this.debug) {
      console.log("Creating a new Cell");
      console.log(
        `Cell created at position (${this.row}, ${this.col}) with size (${this.element.style.width}, ${this.element.style.height})`
      );
    }
  }

  addEventListeners() {
    // Add mouseover event listener
    this.element.addEventListener("mouseover", () => {
      this.element.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // Change color to red on hover
      if (this.debug) console.log("Mouseover event triggered");
    });

    // Add mouseout event listener
    this.element.addEventListener("mouseout", () => {
      this.element.style.backgroundColor = "transparent"; // Revert color when not hovering
      if (this.debug) console.log("Mouseout event triggered");
    });

    // Add click event listener
    this.element.addEventListener("click", () => {
      console.log(
        `Cell clicked at position ${Cell.getConvertedCoordinate(
          this.col,
          this.row
        )}`
      );
      if (this.debug) console.log("Click event triggered");
    });
  }

  getBounds() {
    const x = parseInt(this.element.style.left, 10);
    const y = parseInt(this.element.style.top, 10);
    const width = parseInt(this.element.style.width, 10);
    const height = parseInt(this.element.style.height, 10);

    if (this.debug) {
      console.log("Getting bounds of Cell");
      console.log(
        `Bounds of Cell: left=${x}, right=${x + width}, top=${y}, bottom=${
          y + height
        }`
      );
    }

    return {
      left: x,
      right: x + width,
      top: y,
      bottom: y + height,
    };
  }

  static getConvertedCoordinate(x, y) {
    const colLetter = String.fromCharCode("A".charCodeAt(0) + x);
    const rowNum = y + 1;

    if (this.debug) {
      console.log("Converting coordinates to alphanumeric");
      console.log(`Converted coordinates: ${colLetter}${rowNum}`);
    }

    return `${colLetter}${rowNum}`;
  }
}
