class Game {
  constructor(output) {
    this.output = output;
    this.stage = document.getElementById("stage");
    this.board = new Board(this.stage);
    this.init();
  }

  init() {
    const ships = [];

    // Place the Patrol ship randomly
    const patrolShip = new Ship(
      "Patrol",
      2,
      "vertical",
      this.board.gridContainer
    );
    this.placeShipRandomly(patrolShip, ships);

    // Place the Battleship randomly
    const battleship = new Ship(
      "Battleship",
      4,
      "horizontal",
      this.board.gridContainer
    );
    this.placeShipRandomly(battleship, ships);

    // Place the Destroyer randomly
    const destroyer = new Ship(
      "Destroyer",
      3,
      "vertical",
      this.board.gridContainer
    );
    this.placeShipRandomly(destroyer, ships);
  }

  placeShipRandomly(ship, existingShips) {
    const occupiedCells = [];
    existingShips.forEach((existingShip) => {
      occupiedCells.push(...existingShip.occupiedCells);
    });

    let isValidPlacement = false;
    let randomRow, randomCol;

    while (!isValidPlacement) {
      randomRow = Math.floor(Math.random() * this.board.rows);
      randomCol = Math.floor(Math.random() * this.board.cols);

      isValidPlacement = true;

      for (let i = 0; i < ship.size; i++) {
        if (ship.direction === "vertical") {
          if (
            randomRow + i >= this.board.rows ||
            occupiedCells.some(
              (cell) => cell.row === randomRow + i && cell.col === randomCol
            )
          ) {
            isValidPlacement = false;
            break;
          }
        } else {
          // Horizontal placement
          if (
            randomCol + i >= this.board.cols ||
            occupiedCells.some(
              (cell) => cell.row === randomRow && cell.col === randomCol + i
            )
          ) {
            isValidPlacement = false;
            break;
          }
        }
      }
    }

    ship.setPosition(randomRow, randomCol);
  }
}
