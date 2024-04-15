class Ship {
  constructor(gridContainer, size) {
    this.size = size;
    this.element = document.createElement("div");
    this.element.style.backgroundColor = "rgba(255, 255, 255, 0.75)"; // White with 25% transparency
    this.element.style.position = "absolute";
    this.element.style.width = "10%";
    gridContainer.appendChild(this.element);
  }

  positionInCell(initialCell, lastCell) {
    let initialBounds = initialCell.getBounds();
    let lastBounds = lastCell.getBounds();
    this.element.style.top = `${initialBounds.top}px`;
    this.element.style.left = `${initialBounds.left}px`;
    this.element.style.height = `${lastBounds.bottom - initialBounds.top}px`; // Height is based on the difference between the bottom bound of the last cell and the top bound of the initial cell
  }

  getPosition() {
    let shipBounds = this.element.getBoundingClientRect();
    let gridContainerBounds =
      this.element.parentElement.getBoundingClientRect();
    let position = {
      top: shipBounds.top - gridContainerBounds.top,
      left: shipBounds.left - gridContainerBounds.left,
      width: shipBounds.width,
      height: shipBounds.height,
    };
    return position;
  }
}
