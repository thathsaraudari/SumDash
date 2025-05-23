class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.cellValues = [];  
    this.cellDivs = [];
    this.gridElement = document.getElementById("grid");
  }

  initializeGrid() {
    let rowDivs = document.querySelectorAll("row");

    rowDivs.forEach(row => {
        let rowValues =[];
        let rowDivs= [];

        let cellDivs = row.querySelectorAll("div.cell");

        cellDivs.forEach(cell => {
            rowDivs.push(cell);
            rowValues.push(null);
        });

        this.cellValues.push(rowValues);
    })
  }
}