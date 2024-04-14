document.addEventListener("DOMContentLoaded", (event) => {
  // Create a new div element
  const gridContainer = document.createElement("div");

  // Add the 'grid-container' class to the div
  gridContainer.classList.add("grid-container");

  // Append the div to the body
  document.body.appendChild(gridContainer);

  // Now you can use gridContainer as the parent for the board
  const board = new Board(gridContainer);
  console.log(board);

  // Create a new Game instance with the board
  const output = document.getElementById("output"); // replace with your actual output element
  const game = new Game(board, output);
  console.log(game);
});
