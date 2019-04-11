window.addEventListener('load', function () {
  new init;
});

function init() {
  draw();
}

function draw() {

  const CELLS_QUANTITY = getCellsQuantity();

  const $container = document.getElementById("container");

  for (let i = 0; i < CELLS_QUANTITY; i++) {
    let $cell = document.createElement("div");
    $cell.classList = "cell";
    $container.appendChild($cell);
  }

  drawCells();
}

function getCellsQuantity() {
  const CELLS_QUANTITY = 400;
  return CELLS_QUANTITY;
}

function drawCells(matrix) {
  let customMatrix = createMatrix.call(matrix);
  console.log(customMatrix);
}

function createMatrix() {
  const SETTINGS = {
    free: 0,
    wall: 1,
    start: 2,
    finish: 3,
    visited: 4
  };

  const rowsQuantity = 20;
  const columnsQuantity = 20;

  let matrix = [];

  for (let i = 0; i < rowsQuantity; i++) {
    matrix[i] = [];
    for (let j = 0; j < columnsQuantity; j++) {
      matrix[i][j] = Math.round(Math.random());
      if (i === 0 && j === 0) {
        matrix[i][j] = SETTINGS.start;
      }
      if (i === rowsQuantity - 1 && j === columnsQuantity - 1) {
        matrix[i][j] = SETTINGS.finish;
      }
    }
  }

  let $cellContainers = document.getElementsByClassName("cell");
  let stringMatrix = matrix.join().split(",");
  for (i in $cellContainers) {
    $cellContainers[i].innerHTML = stringMatrix[i];
    if (stringMatrix[i] == SETTINGS.start) {
      $cellContainers[i].className += " startCell";
    }
    if (stringMatrix[i] == SETTINGS.finish) {
      $cellContainers[i].className += " finishCell";
    }
    if (stringMatrix[i] == SETTINGS.wall) {
      $cellContainers[i].className += " wall";
    }
  }

  return matrix;
}
