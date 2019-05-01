window.addEventListener('load', function () {
  new init;
});

function init() {
  drawCells();
  bindEventsListeners();
}

const SETTINGS = {
  free: 0,
  wall: 1,
  start: 2,
  finish: 3,
  rowsQuantity: 20,
  columnsQuantity: 20,
  gameArr: []
}

function drawCells() {

  const CELLS_QUANTITY = SETTINGS.rowsQuantity * SETTINGS.columnsQuantity;

  const $container = document.getElementById("container");

  for (let i = 0; i < CELLS_QUANTITY; i++) {
    let $cell = document.createElement("div");
    $cell.classList = "cell";
    $container.appendChild($cell);
  }

}

function createMatrix() {
  let matrix = [];
  if (matrix.length === 0) {
    for (let i = 0; i < SETTINGS.rowsQuantity; i++) {
      matrix[i] = [];
      for (let j = 0; j < SETTINGS.columnsQuantity; j++) {
        // matrix[i][j] = Math.round(Math.abs(Math.random()));
        matrix[i][j] = Math.round(Math.abs(Math.random() - .7));
      }
    }
    matrix[0][0] = SETTINGS.start;
    matrix[SETTINGS.rowsQuantity - 1][SETTINGS.columnsQuantity - 1] = SETTINGS.finish;
  }

  return SETTINGS.gameArr = matrix;
}


function getMatrix() {
  if (SETTINGS.gameArr.length === 0) {
    let tempMatrix = createMatrix();
    return tempMatrix;
  } else {
    return SETTINGS.gameArr;
  }
}

function drawMatrix() {
  let currentMatrix = SETTINGS.gameArr;

  let $cellContainers = document.getElementsByClassName("cell");
  let stringMatrix = currentMatrix.flat();
  for (let i = 0; i < $cellContainers.length; i++) {
    let cellType = stringMatrix[i];
    let classNames = ['cell', 'wall', 'startCell', 'finishCell'];
    
    $cellContainers[i].classList.add(classNames[cellType]);
    $cellContainers[i].innerHTML = stringMatrix[i];

  }

  return currentMatrix;
}

function bindEventsListeners() {
  document.getElementById("generate").addEventListener("click", generateBtnClick);
  document.getElementById("find-path-btn").addEventListener("click", findPathBtnClick);
}

function generateBtnClick(e) {
  const $divError = document.querySelector(".alert");
  if ($divError) {
    $divError.remove(); 
  }

  clearMatrix();
  let $findPathBtn = document.getElementById("find-path-btn");
  e.target.setAttribute("disabled", "disabled");
  $findPathBtn.removeAttribute("disabled");
  createMatrix();
  drawMatrix();
}

function findPathBtnClick(e) {
  let $generateBtn = document.getElementById("generate");
  e.target.setAttribute("disabled", "disabled");
  $generateBtn.removeAttribute("disabled");
  drawPath();
}

function clearMatrix(e) {
  let $cellContainers = document.getElementsByClassName("cell");
  for (i in $cellContainers) {
    $cellContainers[i].innerHTML = '';
    $cellContainers[i].classList = 'cell';
  }
  let $generateBtn = document.getElementById("generate");
  $generateBtn.disabled = false;
}

function findShortestPath() {
  let matrix = getMatrix();

  let start = [0, 0];
  let end = [19, 19];

  function findWay(position, end) {
    let queue = [];

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

  return findWay(start, end);
}

function drawPath() {
  let $cellContainers = document.getElementsByClassName("cell");

  let tempArr = getTempArr();

  if (!tempArr) {
    return;
  }

  for (i in $cellContainers) {
    for (let m = 0; m < tempArr.length; m++) {
      if (i === $cellContainers.length - 1) {
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

function getTempArr() {
  let path = findShortestPath();

  if (path === undefined) {
    let text = "The path is undefined. Please try to re-generate labyrinth";
    showMessage(text);
  } else {
    let gapArr = [];
    for (let i = 0; i < path.length; i++) {
      let temp = path[i];
      let number = temp[0] * 20 + parseInt(temp[1]);
      gapArr.push(number);
    }
    return gapArr;
  }
}

function showMessage(someText) {
  const div = document.createElement("div");
  div.className = 'alert fail';
  div.appendChild(document.createTextNode(someText));

  const $wrapper = document.getElementById("wrapper");
  const $title = document.getElementById("title");
  $wrapper.insertBefore(div, $title);

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 5000);
}