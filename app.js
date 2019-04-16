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
  console.log("createMatrix, matrix = ", matrix);
  if (matrix.length === 0) {
    for (let i = 0; i < SETTINGS.rowsQuantity; i++) {
      matrix[i] = [];
      for (let j = 0; j < SETTINGS.columnsQuantity; j++) {
        matrix[i][j] = Math.round(Math.abs(Math.random() - .3));
        if (i === 0 && j === 0) {
          matrix[i][j] = SETTINGS.start;
        }
        if (i === SETTINGS.rowsQuantity - 1 && j === SETTINGS.columnsQuantity - 1) {
          matrix[i][j] = SETTINGS.finish;
        }
      }
    }
  }

  return function saveMatrix() {
    return matrix;
  }
}

function getMatrix() {
  if (typeof matrix === 'undefined') {
    let customFunctionMatrix = createMatrix();
    let tempMatrix = customFunctionMatrix();
    return tempMatrix;
  } else {
    return matrix;
  }
}

function drawMatrix() {
  const SETTINGS = getSettings();

  let currentMatrix = getMatrix();

  let $cellContainers = document.getElementsByClassName("cell");
  let stringMatrix = currentMatrix.join().split(",");
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

  console.log("findShortestPath, matrix = ", matrix);
  let start = [0, 0];
  let end = [19, 19];

  function findWay(position, end) {
    let queue = [];
    // console.log("matrix[position[0]][position[1]]", matrix[position[0]][position[1]]);
    matrix[position[0]][position[1]] = 1;
    // console.log("matrix[position[0]][position[1]]", matrix[position[0]][position[1]]);
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
    console.log("findShortestPath, path = ", path);
  }

  let path = [];
  return function getPath() {
    return path = findWay(start, end);
  }
}

function drawPath() {
  let $cellContainers = document.getElementsByClassName("cell");

  let tempArr = getTempArr();

  if (tempArr !== undefined) {
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
}

function getTempArr() {
  let pathFunction = findShortestPath();
  let path = pathFunction();
  console.log("getTempArr, path = ", path);
  if (path === undefined) {
    let text = "The path is undefined. Please try to re-generate labyrinth";
    showMessage(text);
  } else {
    console.log("getTempArr, if path not undefined = ", path);
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
  }, 9000);
}