window.addEventListener('load', function () {
  new init;
});

function init() {
  draw();
  loadEventsListeners();
}

function draw() {

  const CELLS_QUANTITY = getCellsQuantity();

  const $container = document.getElementById("container");

  for (let i = 0; i < CELLS_QUANTITY; i++) {
    let $cell = document.createElement("div");
    $cell.classList = "cell";
    $container.appendChild($cell);
  }

}

function getCellsQuantity() {
  const CELLS_QUANTITY = 400;
  return CELLS_QUANTITY;
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

  if (matrix.length === 0) {
    for (let i = 0; i < rowsQuantity; i++) {
      matrix[i] = [];
      for (let j = 0; j < columnsQuantity; j++) {
        matrix[i][j] = Math.round(Math.random() - .3);
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
  }

}

function getMatrix() {
  return matrix = createMatrix();
}

function loadEventsListeners() {
  document.getElementById("find-path-btn").addEventListener("click", findPathBtnClick);
}

function findShortestPath() {
  let neighbors = [];
  let way = [];
  let shortestPath = [];
  let customMatrix = createMatrix.apply(arguments);
  console.log(customMatrix);
}

function findPathBtnClick(e) {
  e.target.setAttribute('disabled', true);
  findShortestPath();
  let $clearPathBtn = document.getElementById("clear-path-btn");
  $clearPathBtn.removeAttribute('disabled');
}

function moveLeft(x) {
  return x - 1;
}

function moveRight(x) {
  return x + 1;
}

function moveTop(y) {
  return y - 1;
}

function moveBottom(y) {
  return y + 1;
}