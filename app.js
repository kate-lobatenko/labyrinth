function init() {
  drawCells();
}

function getCells(cellsQuanity) { 
  return cellsQuanity;
}

function drawCells() {

  const cellsQuanity = getCells(500);

  const $container = document.getElementById("container");


  for (let i = 0; i < cellsQuanity; i++) {
    let $cell = document.createElement("div");
    $cell.textContent = i;
    $cell.classList = "cell";
    $container.appendChild($cell);
  }

}

window.addEventListener('load', function () {
  new init();
});