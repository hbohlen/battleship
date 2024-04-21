export class Ship {
  constructor(name, length, orientation, startX, startY) {
    this.name = name;
    this.length = length;
    this.orientation = orientation;
    this.startX = startX;
    this.startY = startY;
    this.hits = new Array(length).fill(false); // Initialize hits array
  }

  hit(position) {
    this.hits[position] = true; // Mark the specific position as hit
  }

  isSunk() {
    return this.hits.every((hit) => hit); // Check if all positions are hit
  }

  // New method to check if a specific position has been hit
  isPositionHit(position) {
    return this.hits[position];
  }
}
