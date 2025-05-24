 class Game {
    constructor(rows, cols, targetSum) {
        this.grid = new Grid(rows, cols);
        this.currentSquare = null;
        this.targetSum = targetSum;
    }

    startGame() {
        this.grid.initializeGrid();
        this.generateNewSquare();
        this.startGameLoop();
    }

    generateNewSquare() {
        const numberList = [2, 4, 5, 10];
        const randomIndex = Math.floor(Math.random() * numberList.length);
        const randomNumber = numberList[randomIndex];
        this.currentSquare = new Square(randomNumber);
    }

    startGameLoop() {
        setInterval(() => {
            const row = this.currentSquare.row;
            const col = this.currentSquare.col;
            const value = this.currentSquare.value;

            let nextRow = row + 1;

            if(this.grid.isInsideGrid(nextRow, col) && this.grid.isCellEmpty(nextRow, col)) {
                this.grid.clearCellValue(row, col);
                this.currentSquare.moveDown();
                this.grid.setCellValue(nextRow, col, value);
            } 

            this.grid.renderGrid();
        }, 500)
    }
}
