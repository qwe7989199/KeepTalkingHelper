// maze.js

const MAZE_SIZE = 13;

const mazes = {
  maze1: {
    walls: [
      [1, 6],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 6],
      [2, 8],
      [2, 9],
      [2, 10],
      [2, 11],
      [3, 2],
      [3, 6],
      [4, 2],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [4, 8],
      [4, 9],
      [4, 10],
      [5, 2],
      [5, 6],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 8],
      [6, 9],
      [6, 10],
      [7, 2],
      [7, 8],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 5],
      [8, 6],
      [8, 7],
      [8, 8],
      [8, 9],
      [8, 10],
      [9, 6],
      [9, 10],
      [10, 2],
      [10, 3],
      [10, 4],
      [10, 8],
      [10, 9],
      [10, 10],
      [11, 4],
      [11, 8],
    ],
    signs: [
      [2, 1],
      [3, 6],
    ],
  },
  maze2: {
    walls: [
      [1, 6],
      [2, 1],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 10],
      [2, 11],
      [3, 4],
      [3, 8],
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 6],
      [4, 7],
      [4, 8],
      [4, 9],
      [4, 10],
      [5, 2],
      [5, 6],
      [6, 2],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 8],
      [6, 9],
      [6, 10],
      [7, 4],
      [7, 8],
      [7, 10],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 6],
      [8, 7],
      [8, 8],
      [8, 10],
      [9, 2],
      [9, 4],
      [9, 6],
      [9, 10],
      [10, 2],
      [10, 4],
      [10, 6],
      [10, 8],
      [10, 9],
      [10, 10],
      [11, 2],
      [11, 6],
    ],
    signs: [
      [2, 5],
      [4, 2],
    ],
  },
  maze3: {
    walls: [
      [1, 6],
      [1, 8],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 6],
      [2, 8],
      [2, 10],
      [3, 2],
      [3, 4],
      [3, 6],
      [3, 10],
      [4, 1],
      [4, 2],
      [4, 4],
      [4, 6],
      [4, 7],
      [4, 8],
      [4, 9],
      [4, 10],
      [5, 4],
      [5, 6],
      [5, 10],
      [6, 2],
      [6, 4],
      [6, 6],
      [6, 8],
      [6, 10],
      [7, 2],
      [7, 4],
      [7, 6],
      [7, 8],
      [7, 10],
      [8, 2],
      [8, 4],
      [8, 6],
      [8, 8],
      [8, 10],
      [9, 2],
      [9, 6],
      [9, 8],
      [9, 10],
      [10, 2],
      [10, 3],
      [10, 4],
      [10, 5],
      [10, 6],
      [10, 8],
      [10, 10],
      [11, 8],
    ],
    signs: [
      [4, 4],
      [4, 6],
    ],
  },
  maze4: {
    walls: [
      [1, 4],
      [2, 2],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
      [2, 9],
      [2, 10],
      [3, 2],
      [3, 4],
      [4, 2],
      [4, 4],
      [4, 6],
      [4, 7],
      [4, 8],
      [4, 9],
      [4, 10],
      [5, 2],
      [5, 6],
      [5, 10],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 8],
      [6, 9],
      [6, 10],
      [7, 2],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 5],
      [8, 6],
      [8, 7],
      [8, 8],
      [8, 9],
      [8, 10],
      [9, 10],
      [10, 2],
      [10, 3],
      [10, 4],
      [10, 5],
      [10, 6],
      [10, 7],
      [10, 8],
      [10, 10],
      [11, 6],
      [11, 10],
    ],
    signs: [
      [1, 1],
      [4, 1],
    ],
  },
  maze5: {
    walls: [
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
      [3, 10],
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 8],
      [4, 9],
      [4, 10],
      [4, 11],
      [5, 4],
      [5, 8],
      [6, 2],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [6, 8],
      [6, 10],
      [7, 2],
      [7, 8],
      [7, 10],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 5],
      [8, 6],
      [8, 8],
      [8, 9],
      [8, 10],
      [9, 2],
      [9, 10],
      [10, 4],
      [10, 5],
      [10, 6],
      [10, 7],
      [10, 8],
      [10, 9],
      [10, 10],
      [11, 2],
    ],
    signs: [
      [3, 5],
      [6, 4],
    ],
  },
  maze6: {
    walls: [
      [1, 2],
      [1, 6],
      [2, 2],
      [2, 4],
      [2, 6],
      [2, 7],
      [2, 8],
      [2, 10],
      [3, 2],
      [3, 4],
      [3, 6],
      [3, 10],
      [4, 2],
      [4, 4],
      [4, 6],
      [4, 8],
      [4, 9],
      [4, 10],
      [5, 4],
      [5, 6],
      [5, 8],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 8],
      [6, 10],
      [6, 11],
      [7, 4],
      [7, 8],
      [7, 10],
      [8, 1],
      [8, 2],
      [8, 4],
      [8, 6],
      [8, 8],
      [8, 10],
      [9, 4],
      [9, 6],
      [9, 8],
      [10, 2],
      [10, 3],
      [10, 4],
      [10, 5],
      [10, 6],
      [10, 8],
      [10, 9],
      [10, 10],
      [11, 8],
    ],
    signs: [
      [1, 5],
      [5, 3],
    ],
  },
  maze7: {
    walls: [
      [1, 8],
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 10],
      [3, 2],
      [3, 6],
      [3, 8],
      [4, 2],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [4, 8],
      [4, 9],
      [4, 10],
      [5, 4],
      [5, 8],
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 6],
      [6, 7],
      [6, 8],
      [6, 10],
      [6, 11],
      [7, 4],
      [7, 10],
      [8, 2],
      [8, 4],
      [8, 6],
      [8, 7],
      [8, 8],
      [8, 9],
      [8, 10],
      [9, 2],
      [9, 4],
      [9, 10],
      [10, 2],
      [10, 3],
      [10, 4],
      [10, 5],
      [10, 6],
      [10, 7],
      [10, 8],
      [10, 10],
    ],
    signs: [
      [1, 2],
      [6, 2],
    ],
  },
  maze8: {
    walls: [
      [1, 2],
      [1, 8],
      [2, 2],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 10],
      [3, 6],
      [3, 10],
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
      [4, 8],
      [4, 9],
      [4, 10],
      [5, 2],
      [5, 10],
      [6, 2],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 7],
      [6, 8],
      [6, 10],
      [7, 2],
      [7, 6],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 6],
      [8, 7],
      [8, 8],
      [8, 9],
      [8, 10],
      [8, 11],
      [9, 2],
      [9, 4],
      [10, 2],
      [10, 4],
      [10, 5],
      [10, 6],
      [10, 7],
      [10, 8],
      [10, 9],
      [10, 10],
      [10, 11],
    ],
    signs: [
      [1, 4],
      [4, 3],
    ],
  },
  maze9: {
    walls: [
      [1, 2],
      [2, 2],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
      [2, 10],
      [3, 2],
      [3, 4],
      [3, 8],
      [3, 10],
      [4, 2],
      [4, 4],
      [4, 6],
      [4, 7],
      [4, 8],
      [4, 10],
      [5, 6],
      [5, 10],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
      [6, 8],
      [6, 9],
      [6, 10],
      [7, 2],
      [7, 4],
      [7, 8],
      [8, 2],
      [8, 4],
      [8, 6],
      [8, 7],
      [8, 8],
      [8, 9],
      [8, 10],
      [9, 2],
      [9, 4],
      [9, 6],
      [9, 10],
      [10, 2],
      [10, 4],
      [10, 6],
      [10, 10],
      [10, 11],
      [11, 4],
      [11, 8],
    ],
    signs: [
      [2, 3],
      [5, 1],
    ],
  },
};

function matchMap(x1, y1, x2, y2) {
  for (const key in mazes) {
    const [s1, s2] = mazes[key].signs;
    if (
      (x1 === s1[0] && y1 === s1[1] && x2 === s2[0] && y2 === s2[1]) ||
      (x2 === s1[0] && y2 === s1[1] && x1 === s2[0] && y1 === s2[1])
    ) {
      return key;
    }
  }
  return null;
}

function createMazeFromWalls(walls) {
  const maze = Array.from({ length: MAZE_SIZE }, () =>
    Array(MAZE_SIZE).fill(0)
  );
  for (let i = 0; i < MAZE_SIZE; i++) {
    maze[0][i] = 1;
    maze[i][0] = 1;
    maze[MAZE_SIZE - 1][i] = 1;
    maze[i][MAZE_SIZE - 1] = 1;
  }
  for (const [r, c] of walls) {
    maze[r][c] = 1;
  }
  return maze;
}

function findPath(maze, sx, sy, tx, ty) {
  const m = maze.length,
    n = maze[0].length;
  const visited = Array.from({ length: m }, () => Array(n).fill(false));
  const parent = Array.from({ length: m }, () => Array(n).fill(null));
  const queue = [[sx, sy]];
  visited[sx][sy] = true;

  const dirs = [
    [-2, 0, "⬇"],
    [2, 0, "⬆"],
    [0, -2, "➡"],
    [0, 2, "⬅"],
  ];

  while (queue.length) {
    const [x, y] = queue.shift();
    if (x === tx && y === ty) break;

    for (const [dx, dy] of dirs) {
      const nx = x + dx,
        ny = y + dy;
      const mx = x + dx / 2,
        my = y + dy / 2;
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < m &&
        ny < n &&
        maze[mx][my] === 0 &&
        maze[nx][ny] === 0 &&
        !visited[nx][ny]
      ) {
        visited[nx][ny] = true;
        parent[nx][ny] = [x, y];
        queue.push([nx, ny]);
      }
    }
  }

  if (!visited[tx][ty]) return null;

  const path = [];
  let [x, y] = [tx, ty];
  while (x !== sx || y !== sy) {
    const [px, py] = parent[x][y];
    if (px === x - 2) path.push("⬇");
    else if (px === x + 2) path.push("⬆");
    else if (py === y - 2) path.push("➡");
    else if (py === y + 2) path.push("⬅");
    [x, y] = [px, py];
  }

  return path.reverse();
}

function solveMaze(sx, sy, tx, ty, sign1, sign2) {
  const mazeKey = matchMap(sign1[0], sign1[1], sign2[0], sign2[1]);
  // console.log(mazeKey);
  showMazeSvg(mazeKey);
  if (!mazeKey) return null;
  const maze = createMazeFromWalls(mazes[mazeKey].walls);
  const startRow = sx * 2 - 1;
  const startCol = sy * 2 - 1;
  const endRow = tx * 2 - 1;
  const endCol = ty * 2 - 1;
  return findPath(maze, startRow, startCol, endRow, endCol);
}

function initMaze() {
  const content = document.getElementById("moduleContent");
  content.innerHTML = `
    <div class="maze-layout">
      <div class="maze-inputs">
        <div class="input-group row">
          <label>标记①：</label>
          <div class="coord-pair">
            <input type="number" id="sign1Row" min="1" max="6" value="2">
            <span>,</span>
            <input type="number" id="sign1Col" min="1" max="6" value="1">
          </div>
        </div>

        <div class="input-group row">
          <label>标记②：</label>
          <div class="coord-pair">
            <input type="number" id="sign2Row" min="1" max="6" value="3">
            <span>,</span>
            <input type="number" id="sign2Col" min="1" max="6" value="6">
          </div>
        </div>

        <div class="input-group row">
          <label>起点：</label>
          <div class="coord-pair">
            <input type="number" id="startRow" min="1" max="6" value="2">
            <span>,</span>
            <input type="number" id="startCol" min="1" max="6" value="1">
          </div>
        </div>
        <div class="input-group row">
          <label>终点：</label>
          <div class="coord-pair">
            <input type="number" id="targetRow" min="1" max="6" value="3">
            <span>,</span>
            <input type="number" id="targetCol" min="1" max="6" value="6">
          </div>
        </div>

        <button class="btn" onclick="solveMazeUI()">寻找路径</button>
        <button class="btn btn-secondary" onclick="clearMazeUI()">清除</button>
        <div id="mazeResult" class="result" style="display: none;"></div>
        <div id="mazeSvgContainer" class="maze-svg-wrapper"></div>


      </div>

    </div>
  `;

  Utils.hideResult("mazeResult");
}

function solveMazeUI() {
  const s1r = parseInt(document.getElementById("sign1Row").value);
  const s1c = parseInt(document.getElementById("sign1Col").value);
  const s2r = parseInt(document.getElementById("sign2Row").value);
  const s2c = parseInt(document.getElementById("sign2Col").value);
  const sr = parseInt(document.getElementById("startRow").value);
  const sc = parseInt(document.getElementById("startCol").value);
  const tr = parseInt(document.getElementById("targetRow").value);
  const tc = parseInt(document.getElementById("targetCol").value);

  const path = solveMaze(sr, sc, tr, tc, [s1r, s1c], [s2r, s2c]);
  if (path) {
    Utils.showResult("路径：" + path.join("   "), "mazeResult");
  } else {
    Utils.showResult("未匹配到地图或未找到路径", "mazeResult");
  }
}

function clearMazeUI() {
  Utils.hideResult("mazeResult");
  document.getElementById("mazeSvgContainer").innerHTML = "";
  document.getElementById("sign1Row").value = 2;
  document.getElementById("sign1Col").value = 1;
  document.getElementById("sign2Row").value = 3;
  document.getElementById("sign2Col").value = 6;
  document.getElementById("startRow").value = 2;
  document.getElementById("startCol").value = 1;
  document.getElementById("targetRow").value = 3;
  document.getElementById("targetCol").value = 6;
}

function showMazeSvg(mazeKey) {
  const container = document.getElementById("mazeSvgContainer");

  // 提取数字部分，例如 "maze1" -> 1
  const index = parseInt(mazeKey.replace("maze", ""));
  if (isNaN(index) || index < 1 || index > 9) {
    container.innerHTML = "无效的迷宫编号";
    return;
  }

  // 对应文件是 maze0.svg ~ maze8.svg
  const svgPath = `statics/svg/maze${index - 1}.svg`;

  container.innerHTML = `
      <object type="image/svg+xml" data="${svgPath}" width="300" height="300">
        迷宫图加载失败
      </object>
  `;
}
