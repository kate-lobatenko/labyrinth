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
  const startCell = 0;
  const endCell = CELLS_QUANTITY - 2;
  const walls = [5,7,9,25,36,50,51,52,53,108,115];
  const rowsQuantity = 20;
  const columnsQuantity = 20;

  let rows = columns = [];

  for (let i = 0; i < rowsQuantity; i++) {
    rows[i] = 0;
  }

  let cells = new Array(rows, columns);


  let $cellContainers = document.getElementsByClassName("cell");
  for (i in $cellContainers) {    
      if(i == startCell){
        $cellContainers[i].className += " startCell";
      }

      if(i == endCell){
        $cellContainers[i].className += " endCell";
      }

      if(walls.includes(Number(i))) {
        console.log("wall is ", i);
        $cellContainers[i].className += " wall";
      }
  }

}