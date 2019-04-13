window.addEventListener('load', function () {
  new init;
});

function init() {
  drawCells();
  loadEventsListeners();
}

function getSettings() {
  const SETTINGS = {
    free: 0,
    wall: 1,
    start: 2,
    finish: 3,
    rowsQuantity: 20,
    columnsQuantity: 20
  };
  return SETTINGS;
}

function drawCells() {

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

  const SETTINGS = getSettings();

  let matrix = [];

  console.log("matrix before:", matrix);

  if (matrix.length === 0) {
    for (let i = 0; i < SETTINGS.rowsQuantity; i++) {
      matrix[i] = [];
      for (let j = 0; j < SETTINGS.columnsQuantity; j++) {
        matrix[i][j] = Math.round(Math.abs(Math.random() - .2));
        if (i === 0 && j === 0) {
          matrix[i][j] = SETTINGS.start;
        }
        if (i === SETTINGS.rowsQuantity - 1 && j === SETTINGS.columnsQuantity - 1) {
          matrix[i][j] = SETTINGS.finish;
        }
      }
    }
  }

  console.log("matrix after:", matrix);

  return function getMatrix() {
    return matrix;
  }

}

function getMatrix() {
  let customFunctionMatrix = createMatrix();
  let matrix = customFunctionMatrix();
  return matrix;
}

function drawMatrix() {
  const SETTINGS = getSettings();

  let matrix = getMatrix();

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

function loadEventsListeners() {
  document.getElementById("generate").addEventListener("click", generateBtnClick);
  document.getElementById("find-path-btn").addEventListener("click", findPathBtnClick);
  document.getElementById("clear-path-btn").addEventListener("click", clearPathBtnClick);
}

function generateBtnClick(e) {
  let $findPathBtn = document.getElementById("find-path-btn");
  e.target.setAttribute("disabled", "disabled");
  $findPathBtn.removeAttribute("disabled");
  drawMatrix();
}

function findPathBtnClick(e) {
  let $generateBtn = document.getElementById("generate");
  let $clearPathBtn = document.getElementById("clear-path-btn");
  e.target.setAttribute("disabled", "disabled");
  $generateBtn.setAttribute("disabled", "disabled");
  $clearPathBtn.removeAttribute("disabled");
  drawPath();
}

function clearPathBtnClick(e) {
  let $cellContainers = document.getElementsByClassName("cell");
  for (i in $cellContainers) {
    $cellContainers[i].innerHTML = '';
    $cellContainers[i].classList = 'cell';
  }
  e.target.setAttribute("disabled", "disabled");
  let $generateBtn = document.getElementById("generate");
  $generateBtn.disabled = false;
}

function findShortestPath() {
  let matrix = getMatrix();

  let start = [0, 0];
  let end = [19, 19];

  function findWay(position, end) {
    let queue = [];

    matrix[position[0]][position[1]] = 1;
    queue.push([position]); // store a path, not just a position

    while (queue.length > 0) {
      let path = queue.shift(); // get the path out of the queue
      let pos = path[path.length - 1]; // ... and then the last position from it
      let direction = [
        [pos[0] + 1, pos[1]],
        [pos[0], pos[1] + 1],
        [pos[0] - 1, pos[1]],
        [pos[0], pos[1] - 1]
      ];

      for (let i = 0; i < direction.length; i++) {
        // Perform this check first:
        if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
          // return the path that led to the find
          return path.concat([end]);
        }

        if (direction[i][0] < 0 || direction[i][0] >= matrix[0].length ||
          direction[i][1] < 0 || direction[i][1] >= matrix[0].length ||
          matrix[direction[i][0]][direction[i][1]] != 0) {
          continue;
        }

        matrix[direction[i][0]][direction[i][1]] = 1;
        // extend and push the path on the queue
        queue.push(path.concat([direction[i]]));
      }
    }
  }

  let path = findWay(start, end);
  return function getPath() {
    return path;
  }
}


function drawPath() {
  let $cellContainers = document.getElementsByClassName("cell");

  let tempArr = getTempArr();

  function getTempArr() {
    let pathFunction = findShortestPath();
    let path = pathFunction();
    console.log(path);
    let tempArr = [];
    for (let i = 0; i < path.length; i++) {
      let temp = path[i];
      let number = temp[0] * 20 + parseInt(temp[1]);
      tempArr.push(number);
    }
    return tempArr;
  }

  for (i in $cellContainers) {
    for (let m = 0; m < tempArr.length; m++) {
      if (i === $cellContainers.length) {
        break;
      }
      if (i == Number(tempArr[m])) {
        $cellContainers[i].className += " foundWay";
        $cellContainers[i].innerHTML = tempArr[m];
        tempArr.shift();
      }
    }

  }
}