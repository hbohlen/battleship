class Cell {
  constructor(row, col, gridContainer) {
    this.row = row;
    this.col = col;
    this.element = document.createElement("div");
    this.element.className = "cell";

    // Example calculation for cell size (adjust the offset values as per your actual setup)
    const availableWidth = 400 - 30; // 400px is the width of the stage, 30px is the left offset
    const availableHeight = 300 - 30; // 300px is the height of the stage, 30px is the top offset

    const cellWidth = availableWidth / 10; // Divide by the number of cells horizontally
    const cellHeight = availableHeight / 10; // Divide by the number of cells vertically

    this.element.style.width = `${cellWidth}px`;
    this.element.style.height = `${cellHeight}px`;
    this.element.style.position = "absolute";
    this.element.style.border = "1px dotted white";
    this.element.style.boxSizing = "border-box";
    this.element.style.top = `${row * 10}%`;
    this.element.style.left = `${col * 10}%`;
    gridContainer.appendChild(this.element); // Append to gridContainer instead of stage

    this.highlighted = false;

    this.debug = true;

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

  highlight() {
    this.highlighted = true; // Add this line
    this.element.style.backgroundColor = "green";
  }

  addEventListeners() {
    // Modify these event listeners
    this.element.addEventListener("mouseover", () => {
      if (!this.highlighted) {
        // Add this line
        this.element.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
      }
    });
    this.element.addEventListener("click", () => {
      console.log(`Cell at row ${this.row}, col ${this.col} was clicked`);
    });

    this.element.addEventListener("mouseout", () => {
      if (!this.highlighted) {
        // Add this line
        this.element.style.backgroundColor = "";
      }
    });
  }

  getBounds() {
    let bounds = this.element.getBoundingClientRect();
    let gridContainerBounds =
      this.element.parentElement.getBoundingClientRect();
    let relativeBounds = {
      top: bounds.top - gridContainerBounds.top,
      left: bounds.left - gridContainerBounds.left,
      bottom: bounds.bottom - gridContainerBounds.top,
      right: bounds.right - gridContainerBounds.left,
    };
    return relativeBounds;
  }
}
