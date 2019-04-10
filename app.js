window.addEventListener('load', function () {
  new init;
});

function init() {
  drawContainer();
  setCells();
}

function drawContainer() {

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

function setCells() {
  const CELLS_QUANTITY = getCellsQuantity();
  const rowsQuantity = 20;
  const columnsQuantity = 20;
  let cells = new Array;
  const startCell = 0;
  const endCell = 399;
  const walls = 1;

  for (let i = 0; i < rowsQuantity; i++) {
    cells[i] = new Array;
    for (let j = 0; j < columnsQuantity; j++) {
      cells[i][j] = 0;
    }
  }

  console.log(cells);

  let $cellContainers = document.getElementsByClassName("cell");
  for (i in $cellContainers) {    
      if(i == startCell){
        $cellContainers[i].className += " startCell";
      }

      if(i == endCell){
        $cellContainers[i].className += " endCell";
      }

      if(walls.includes(Number(i))) {
        $cellContainers[i].className += " wall";
      }

      $cellContainers[i].innerHTML = cells[i][i];
  }

  return cells;
}