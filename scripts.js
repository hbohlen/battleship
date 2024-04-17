let stage;

document.addEventListener("DOMContentLoaded", (event) => {
  const output = document.getElementById("output"); // Assuming output is used within the game
  const game = new Game(output);
  game.init();
});
