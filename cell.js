class Cell {
  constructor(row, col, gridContainer) {
    this.row = row;
    this.col = col;
    this.element = document.createElement("div");
    this.element.className = "cell";
    this.clicked = false;

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
    gridContainer.appendChild(this.element); // Append to gridContainer

    this.highlighted = false;

    // Add event listeners
    this.addEventListeners();
  }

  highlight() {
    this.highlighted = true;
    this.element.style.backgroundColor = "green";
  }

  addEventListeners() {
    this.element.addEventListener("mouseover", () => {
      if (!this.highlighted) {
        if (this.clicked) {
          const hit = game.checkForHit(this.row, this.col);
          if (hit) {
            this.element.style.backgroundColor = "transparent";
          } else {
            this.element.style.backgroundColor = "transparent";
          }
        } else {
          this.element.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        }
      }
    });
    this.element.addEventListener("click", () => {
      if (this.clicked) return; // Ignore clicks if the cell has already been clicked
      this.clicked = true; // Set clicked to true when the cell is clicked
      const hit = game.checkForHit(this.row, this.col);
      if (hit) {
        const hitMarker = document.createElement("div");
        hitMarker.className = "hit-marker";
        this.element.appendChild(hitMarker);
      } else {
        const missCircle = document.createElement("div");
        missCircle.className = "miss-circle";
        this.element.appendChild(missCircle);
      }
    });

    this.element.addEventListener("mouseout", () => {
      if (!this.highlighted && !this.clicked) {
        // Check if the cell has not been clicked
        this.element.style.backgroundColor = ""; // Only reset if not clicked
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
