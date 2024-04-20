document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("stage");
  const gridCanvas = document.getElementById("gridCanvas"); // Grab the gridCanvas element
  const ctx = canvas.getContext("2d");
  const gridCtx = gridCanvas.getContext("2d"); // Get the context for gridCanvas
  const rows = 10; // Example row count
  const cols = 10; // Example column count

  function drawGrid() {
    const numRows = 10;
    const numCols = 10;
    const cellWidth = gridCanvas.width / numCols;
    const cellHeight = gridCanvas.height / numRows;

    gridCtx.strokeStyle = "#FFFFFF"; // Set the line color to white
    gridCtx.lineWidth = 0.5; // Set the line width to 0.5 for finer lines
    gridCtx.setLineDash([1, 1]); // Adjust the dash pattern for a more fine dotted line
    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
        gridCtx.strokeRect(
          i * cellWidth,
          j * cellHeight,
          cellWidth,
          cellHeight
        );
      }
    }
    gridCtx.setLineDash([]); // Reset the dash pattern to solid
  }

  // Call drawGrid function after defining it
  drawGrid();

  function highlightCell(event) {
    // Clear the canvas and redraw the grid to remove previous highlights
    gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    drawGrid();

    const rect = gridCanvas.getBoundingClientRect();
    const scaleX = gridCanvas.width / rect.width; // Ratio of actual width to displayed width
    const scaleY = gridCanvas.height / rect.height; // Ratio of actual height to displayed height
    const mouseX = (event.clientX - rect.left) * scaleX; // Adjusted X coordinate
    const mouseY = (event.clientY - rect.top) * scaleY; // Adjusted Y coordinate
    const cellX = Math.floor(mouseX / (gridCanvas.width / cols));
    const cellY = Math.floor(mouseY / (gridCanvas.height / rows));

    // Highlight the cell
    gridCtx.fillStyle = "red";
    gridCtx.fillRect(
      cellX * (gridCanvas.width / cols),
      cellY * (gridCanvas.height / rows),
      gridCanvas.width / cols,
      gridCanvas.height / rows
    );
  }

  gridCanvas.addEventListener("mousemove", highlightCell);
});
