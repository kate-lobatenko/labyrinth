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
    finish: 3
  };

  const rowsQuantity = 20;
  const columnsQuantity = 20;

  let matrix = [];

  if (matrix.length === 0) {
    for (let i = 0; i < rowsQuantity; i++) {
      matrix[i] = [];
      for (let j = 0; j < columnsQuantity; j++) {
        matrix[i][j] = Math.round(Math.abs(Math.random() - .2));
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

  return function getMatrix() {
    return matrix;
  }

}

function loadEventsListeners() {
  document.getElementById("find-path-btn").addEventListener("click", findPathBtnClick);
  document.getElementById("clear-path-btn").addEventListener("click", clearPathBtnClick);
}

function findShortestPath() {
  let customFunctionMatrix = createMatrix();
  let matrix = customFunctionMatrix();

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
  return path;
}

function findPathBtnClick(e) {
  e.target.setAttribute('disabled', true);
  drawPath();
  let $clearPathBtn = document.getElementById("clear-path-btn");
  $clearPathBtn.removeAttribute('disabled');
}

function drawPath() {
  let $cellContainers = document.getElementsByClassName("cell");

  let tempArr = getTempArr();

  for (i in $cellContainers) {
    for (let m = 0; m < tempArr.length; m++) {
      if (i === $cellContainers - 1) {
        break;
      }
      if (i == Number(tempArr[m])) {
        $cellContainers[i].className += " foundWay";
        $cellContainers[i].innerHTML = 3;
        tempArr.shift();
      }
    }

  }
}

function clearPathBtnClick(e) {
  let $cellContainers = document.getElementsByClassName("cell");
  for (i in $cellContainers) {
    $cellContainers[i].innerHTML = '';
    $cellContainers[i].classList = 'cell';
  }
  e.target.setAttribute('disabled', true);
  let $findPathBtn = document.getElementById("find-path-btn");
  $findPathBtn.removeAttribute('disabled');
}

function getTempArr() {
  let path = findShortestPath();
  console.log(path);
  let tempArr = [];
  for (let i = 0; i < path.length; i++) {
    let temp = path[i];
    let number = temp[0] * 20 + parseInt(temp[1]) + 1;
    tempArr.push(number);
  }
  return tempArr;
}