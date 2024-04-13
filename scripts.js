window.onload = function () {
  // Create a new Cell and log it to the console
  const parent = document.body; // or any other DOM element
  const row = 0;
  const col = 0;
  const topOffset = 0;
  const leftOffset = 0;
  const cellWidth = 50; // adjust as needed
  const cellHeight = 50; // adjust as needed

  const cell = new Cell(
    parent,
    row,
    col,
    topOffset,
    leftOffset,
    cellWidth,
    cellHeight
  );
  console.log(cell);
};
