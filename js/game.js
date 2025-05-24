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
        document.addEventListener("keydown", (e) => {
            
            const row = this.currentSquare.row;
            let col = this.currentSquare.col;
            
            let nextCol = col;

            if(e.key === "ArrowRight") {
                console.log("right");
                nextCol++;
            } else if( e.key === "ArrowLeft") {
                console.log("left");
                nextCol--;
            }

            
            if(this.grid.isInsideGrid(row, nextCol) && this.grid.isCellEmpty(row, nextCol)) {
                this.grid.clearCellValue(row, col);
                this.currentSquare.col = nextCol;
                this.grid.setCellValue(row, nextCol, this.currentSquare.value);
                this.grid.renderGrid();
            }


        });
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
            } else {
                this.generateNewSquare();
            }

            this.grid.renderGrid();
        }, 500)
    }
}
