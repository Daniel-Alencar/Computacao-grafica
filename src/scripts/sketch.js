let grid;
let cols;
let rows;
let resolution = 10;
let playing = false;

let Xdots = [];
let Ydots = [];

function setup() {
  createCanvas(800, 500);
  background(0);

  cols = width / resolution;
  rows = height / resolution;
  console.log("COLUMNS == ", cols);
  console.log("ROWS == ", rows);
  
  grid = make2DArray(cols, rows);

  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(0);
    }
  }
}

function draw() {
  if(playing) {
    background(0);
    
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;

        if(grid[i][j].value == 1) {
          Xdots.push(i);
          Ydots.push(j);

          fill(255);
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }

    DDA(Xdots[0], Ydots[0], Xdots[1], Ydots[1]);

  } else {
    // Salvamento de pontos marcados no mouse
    if(mouseIsPressed) {
      let rect = new MyRect();
      rect.show();
  
      let i = rect.px / resolution;
      let j = rect.py / resolution;
      console.log("i(collumn) == ", i, " e j(row) == ", j);
      
      if(i < cols && j < rows && i >= 0 && j >= 0) {
        grid[i][j].value = 1;
      }
    }
  }
}

function upgradeGrid(x, y) {
  grid[x][y].value = 1;
  upgradeDrawningGrid();
}

function upgradeDrawningGrid() {
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;

      if(grid[i][j].value == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
}

function DDA(x1, y1, x2, y2) {
  let step = 0;
  let x, y, dx, dy;

  step = Math.abs(x2 - x1);

  if(Math.abs(y2 - y1) > step) {
    step = Math.abs(y2 - y1);
  }
  dx = (x2 - x1) / step;
  dy = (y2 - y1) / step;

  x = x1;
  y = y1;

  while(x < x2) {
    upgradeGrid(Math.round(x), Math.round(y));
    x = x + dx;
    y = y + dy;
  }
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for(let i = -1; i < 2; i++) {
    for(let j = -1; j < 2; j++) {

      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row].value;
    }
  }
  sum -= grid[x][y].value;
  return sum;
}


document.addEventListener('DOMContentLoaded', () => {

  const playButton = document.querySelector('.play-button');
  const playOrPause = () => {
    playing = !playing;
    playButton.value = playing ? "Pause" : "Play";
  }
  playButton.onclick = playOrPause;




  const clearButton = document.querySelector('.clear-button');
  clearButton.onclick = () => {
    background(0);

    Xdots = [];
    Ydots = [];

    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        grid[i][j].value = 0;
      }
    }
    upgradeDrawningGrid();

    if(playing) {
      playing = false;
      playButton.value = "Play";
    }
  };

});