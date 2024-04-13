class Game {
  constructor(board, output) {
    this.board = board;
    this.output = output;
    this.guesses = 0;
    this.gameWon = false;

    this.placeShips();
    console.log(this.board.ships);
  }

  convertCoords(position) {
    return Ship.convertCoords(position, "horizontal", this.startPosition);
  }

  placeShips() {
    this.patrolShip = this.placeRandomShip("patrol", 2);
    this.battleship = this.placeRandomShip("battleship", 4);
    this.destroyer = this.placeRandomShip("destroyer", 3);
    this.board.addShip(this.patrolShip);
    this.board.addShip(this.battleship);
    this.board.addShip(this.destroyer);
  }

  placeRandomShip(size, type) {
    let orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
    let x, y;

    if (orientation === "horizontal") {
      x = Math.floor(Math.random() * (10 - size + 1));
      y = Math.floor(Math.random() * 10);
    } else {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * (10 - size + 1));
    }

    let newShip = new Ship(type, size, { x: x, y: y }, orientation);

    // Check if any position of the new ship overlaps with existing ships
    for (let position of newShip.positions) {
      if (this.isPositionOccupied(position.x, position.y)) {
        return this.placeRandomShip(size, type); // Try placing the ship again
      }
    }

    this.board.ships.push(newShip);
    return newShip;
  }

  isPositionOccupied(x, y) {
    for (let ship of this.board.ships) {
      for (let position of ship.positions) {
        if (position.x === x && position.y === y) {
          return true;
        }
      }
    }
    return false;
  }

  validShipPlacement(ship) {
    // Check if the ship's starting position is within the grid
    if (
      ship.startPosition.x < 0 ||
      ship.startPosition.x > 9 ||
      ship.startPosition.y < 0 ||
      ship.startPosition.y > 9
    ) {
      console.error(`Invalid starting position for the ${ship.type}.`);
      return false;
    }

    // Check if the ship's orientation is valid and it doesn't go outside the grid
    if (
      ship.orientation === "horizontal" &&
      ship.startPosition.x + ship.size > 10
    ) {
      console.error(
        `Invalid orientation for the ${ship.type}. It goes outside the grid.`
      );
      return false;
    } else if (
      ship.orientation === "vertical" &&
      ship.startPosition.y + ship.size > 10
    ) {
      console.error(
        `Invalid orientation for the ${ship.type}. It goes outside the grid.`
      );
      return false;
    }

    // If all checks pass, the placement is valid
    return true;
  }

  validateInput(guessX, guessY) {
    if (isNaN(guessX) || isNaN(guessY)) {
      this.output.innerHTML = "Please enter a number.";
    } else if (guessX > 9 || guessY > 9) {
      this.output.innerHTML = "Please enter a number less than 10.";
    } else {
      this.playGame(guessX, guessY);
    }
  }

  playGame(guessX, guessY) {
    this.guesses++;
    if (
      this.patrolShip.isHit({ x: guessX, y: guessY }) ||
      this.battleship.isHit({ x: guessX, y: guessY }) ||
      this.destroyer.isHit({ x: guessX, y: guessY })
    ) {
      this.gameWon = true;
      this.endGame();
    } else {
      this.output.innerHTML = "Miss!";
    }
  }

  endGame() {
    if (this.gameWon) {
      this.output.innerHTML = `You hit one of my ships! It took you ${this.guesses} guesses`;
    }
  }
}
