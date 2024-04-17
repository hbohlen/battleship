class Game {
  constructor(output) {
    this.output = output;
    this.stage = document.getElementById("stage");
    this.board = new Board(this.stage); // Move the board creation into the Game class
  }

  init() {
    console.log(this.board);
    // Any additional setup can go here
  }
}
