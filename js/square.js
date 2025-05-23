class Square {
  constructor(value, row = 0, col = 4) {
    this.value = value;
    this.row = row;
    this.col = col;
  }

  moveDown() {
    this.row++;
  }

  moveLeft() {
    this.col--;
  }

  moveRight() {
    this.col++;
  }

  getPosition() {
    return { row: this.row, col: this.col };
  }
}
