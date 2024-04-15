class Cell {
  constructor(row, col, gridContainer) {
    this.row = row;
    this.col = col;
    this.element = document.createElement("div");
    this.element.className = "cell";

    this.element.style.width = "10%";
    this.element.style.height = "10%";
    this.element.style.position = "absolute";
    this.element.style.border = "1px dotted white";
    this.element.style.boxSizing = "border-box";
    this.element.style.top = `${row * 10}%`;
    this.element.style.left = `${col * 10}%`;
    gridContainer.appendChild(this.element); // Append to gridContainer instead of stage

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

  addEventListeners() {
    // Add mouseover event listener
    this.element.addEventListener("mouseover", () => {
      this.element.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // Change color to red on hover
      if (this.debug) console.log("Mouseover event triggered");
    });
  }
}
