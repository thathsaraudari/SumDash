 class Game {
    constructor(rows, cols, targetSum) {
        this.grid = new Grid(rows, cols);
        this.currentSquare = null;
        this.targetSum = targetSum;
        this.score = 0;
        this.scoreLabel = document.getElementById('score');
        this.pauseButton = document.getElementById('pause-button');
        this.isPaused = true;

        this.pauseButton.addEventListener('click', () => this.startPauseGame());
    }

    startGame() {
        this.grid.initializeGrid();
        this.generateNewSquare();
        this.startGameLoop();
        document.addEventListener("keydown", (e) => {
            
            const row = this.currentSquare.row;
            let col = this.currentSquare.col;
            
            let nextCol = col;
            let nextRow = row;

            if(e.key === "ArrowRight") {
                // console.log("right");
                nextCol++;
            } else if( e.key === "ArrowLeft") {
                // console.log("left");
                nextCol--;
            } else if(e.key === "ArrowDown"){
              console.log("down")
                nextRow++;
            }



            
            if(this.grid.isInsideGrid(nextRow, nextCol) && this.grid.isCellEmpty(nextRow , nextCol)) {
                this.grid.clearCellValue(row, col);
                this.currentSquare.col = nextCol;
                this.currentSquare.row = nextRow ;
                this.grid.setCellValue(nextRow , nextCol, this.currentSquare.value);
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
            if (this.isPaused) {
              return;
            } 
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
                this.isClear();
                this.grid.applyGravity()
            }

            this.grid.renderGrid();
        }, 500)
    }

    isClear() {

      for(let row = 0; row < this.grid.rows; row++) {
        console.log(row);

        for(let startCol = 0; startCol < this.grid.cols; startCol++) {
          let sum = 0;
          let cells = [];

          for(let col = startCol; col < this.grid.cols; col++) {
            // console.log(`row${row} - startCol${startCol}`);
            let cellValue = this.grid.cellValues[row][col];
            if(cellValue === null) {
              break;
            }

            sum += cellValue;
            cells.push({
              row: row,
              col: col
            });

            if(sum === this.targetSum){
              console.log("sum");
              cells.forEach(cell => {
                this.grid.clearCellValue(cell.row, cell.col);
              });

              this.score += 20;
              this.scoreLabel.innerText = this.score;
              break;
            } else if(sum > this.targetSum) {
              console.log("greater than sum")
              break;
            }
          }
        }
      }


      //check vertically
      for(let col = 0; col < this.grid.cols; col++) {
        console.log(col);

        for(let startRow = 0; startRow < this.grid.rows; startRow++) {
          let sum = 0;
          let cells = [];

          for(let row = startRow; row < this.grid.rows; row++) {
            // console.log(`row${row} - startCol${startCol}`);
            let cellValue = this.grid.cellValues[row][col];
            if(cellValue === null) {
              break;
            }

            sum += cellValue;
            cells.push({
              row: row,
              col: col
            });

            if(sum === this.targetSum){
              console.log("sum");
              cells.forEach(cell => {
                this.grid.clearCellValue(cell.row, cell.col);
              });
              this.score += 20;
              this.scoreLabel.innerText = this.score;
              break;
            } else if(sum > this.targetSum) {
              console.log("greater than sum")
              break;
            }
          }
        }
      }

    }

    startPauseGame() {
      console.log('clicked');
      let buttonText = this.pauseButton.innerText;
      if (buttonText === 'Start Game' && this.isPaused) {
        this.pauseButton.innerText = 'Pause Game';
        this.isPaused = false;
      } else if(buttonText === 'Pause Game' && !this.isPaused) {
        this.pauseButton.innerText = 'Resume Game';
        this.isPaused = true;
      } else if (buttonText === 'Resume Game' && this.isPaused) {
        this.pauseButton.innerText = 'Pause Game';
        this.isPaused = false;
      }
    }

  
 }

