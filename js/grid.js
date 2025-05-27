class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.cellValues = [];  
    this.cellDivs = [];
    this.gridElement = document.getElementById("grid");
  }

  initializeGrid() {
    let rowDivs = document.querySelectorAll("div.row");

    rowDivs.forEach(row => {
        let rowValues =[];
        let rowDivs= [];

        let cellDivs = row.querySelectorAll("div.cell");

        cellDivs.forEach(cell => {
            rowDivs.push(cell);
            rowValues.push(null);
        });

        this.cellValues.push(rowValues);
        this.cellDivs.push(rowDivs);
    })
  }

  renderGrid() {
    for(let row = 0; row < this.rows; row++) {
        for(let col = 0; col < this.cols; col++){
            let cellvalue = this.cellValues[row][col];
            let cellDiv = this.cellDivs[row][col];

            if(cellvalue !== null) {
                cellDiv.innerText = cellvalue;
                cellDiv.style.backgroundColor = "#4caf50";
            } else {
                cellDiv.innerText = "";
                cellDiv.style.backgroundColor = "#333";
            }
        }
    }
  }

  isInsideGrid(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  isCellEmpty(row, col) {
    return this.cellValues[row][col] === null;
  }

  clearCellValue(row, col) {
    this.cellValues[row][col] = null;
  }

  setCellValue(row, col, value) {
    this.cellValues[row][col] = value
  }

  applyGravity(){
    for(let col = 0; col < this.cols; col++){
      let valuesInCol = [];

      for(let row = 0; row < this.rows; row++){
        
        let cellValue = this.cellValues[row][col];
        if(cellValue !== null) {
          valuesInCol.push(cellValue);
          this.clearCellValue(row, col);
        }
      }

      let numOfSquaresFound = valuesInCol.length;

      for(let i = this.rows-1; i > this.rows - 1 - numOfSquaresFound; i--) {
        this.setCellValue(i, col, valuesInCol.pop());
      }
    }

    this.renderGrid();
  }
}
