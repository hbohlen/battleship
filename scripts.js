let stage;

document.addEventListener("DOMContentLoaded", (event) => {
  stage = document.getElementById("stage");

  // Now you can use stage as the parent for the board
  const board = new Board();
  console.log(board);

  // Create a new Game instance with the board
  const output = document.getElementById("output"); // replace with your actual output element
  const game = new Game(board, output);
  console.log(game);
});
