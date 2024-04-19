let stage;

document.addEventListener("DOMContentLoaded", (event) => {
  const output = document.getElementById("output"); // Assuming output is used within the game
  window.game = new Game(output); // Make `game` globally accessible by attaching it to `window`
  document.getElementById("fire").addEventListener("click", function () {
    const inputX = document.getElementById("inputX").value.toUpperCase(); // Convert X input to uppercase
    const inputY = parseInt(document.getElementById("inputY").value); // Convert Y input to number

    // Convert letter (A-J) to number (0-9)
    const xCoordinate = inputX.charCodeAt(0) - "A".charCodeAt(0);

    // Validate inputs
    if (
      xCoordinate < 0 ||
      xCoordinate > 9 ||
      isNaN(inputY) ||
      inputY < 1 ||
      inputY > 10
    ) {
      alert(
        "Invalid input. Please enter a letter A-J for X and a number 1-10 for Y."
      );
      return;
    }

    // Adjust Y coordinate for zero-based grid, if necessary
    const yCoordinate = inputY - 1;

    console.log(`Firing at (${xCoordinate}, ${yCoordinate})`);
  });
});
