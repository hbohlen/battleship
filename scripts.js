document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("stage");
  const ctx = canvas.getContext("2d");
  const rows = 10; // Example row count
  const cols = 10; // Example column count

  const offsetX = 37; // Adjust as needed to align with the background image
  const offsetY = 30; // Adjust as needed to align with the background image
  const cellWidth = (canvas.width - offsetX) / cols; // Adjusted for 10% of the remaining space
  const cellHeight = (canvas.height - offsetY) / rows; // Adjusted for 10% of the remaining space

  // Function to draw grid
  function drawGrid() {
    ctx.strokeStyle = "#FFFFFF"; // Set the line color to white
    ctx.setLineDash([5, 5]); // Create dotted lines

    // Draw vertical lines for columns, starting from the second column
    for (let i = 1; i < cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellWidth + offsetX, offsetY + cellHeight);
      ctx.lineTo(i * cellWidth + offsetX, canvas.height - offsetY);
      ctx.stroke();
    }

    // Draw horizontal lines for rows, starting from the second row
    for (let j = 1; j < rows; j++) {
      ctx.beginPath();
      ctx.moveTo(offsetX + cellWidth, j * cellHeight + offsetY);
      ctx.lineTo(canvas.width - offsetX, j * cellHeight + offsetY);
      ctx.stroke();
    }

    ctx.setLineDash([]); // Reset the dash pattern to solid
  }

  // Draw the grid over the background
  drawGrid();

  let lastHighlightedCell = null;

  canvas.addEventListener("mousemove", function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the canvas
    const y = event.clientY - rect.top; // y position within the canvas

    highlightCell(x, y);
  });

  function highlightCell(x, y) {
    const col = Math.floor((x - offsetX - cellWidth) / cellWidth);
    const row = Math.floor((y - offsetY - cellHeight) / cellHeight);

    // Check if the cell is within the usable range
    if (col < 0 || row < 0) {
      return;
    }

    lastHighlightedCell = { row, col };

    // Clear previous highlight by redrawing the grid and then highlight the new cell
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawGrid(); // Redraw the grid

    // Highlight the new cell
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Semi-transparent red
    ctx.fillRect(
      col * cellWidth + offsetX,
      row * cellHeight + offsetY,
      cellWidth,
      cellHeight
    );
  }

  canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left - offsetX - cellWidth; // Adjusted x position
    const y = event.clientY - rect.top - offsetY - cellHeight; // Adjusted y position

    // Ensure clicks within the grid boundaries are processed
    if (x >= 0 && y >= 0) {
      const col = Math.floor(x / cellWidth);
      const row = Math.floor(y / cellHeight);

      // Ensure the calculated row and col are within the grid
      if (col >= 0 && col < cols && row >= 0 && row < rows) {
        console.log(`Grid coordinates: Row ${row}, Col ${col}`);
      }
    }
  });
});
