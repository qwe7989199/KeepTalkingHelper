// 基础线路模块

let wireColors = [];

function initBasicWire() {
  const content = document.getElementById("moduleContent");
  content.innerHTML = `
        <div class="input-group">
            <label>线路数量:</label>
            <input type="number" id="wireCount" min="3" max="6" value="3" onchange="autoSolveBasicWire()">
        </div>
        <div class="input-group">
            <label>序列号最后一位数字:</label>
            <input type="number" id="lastSerial" min="0" max="9" value="0" onchange="autoSolveBasicWire()">
        </div>
        <div class="input-group">
            <label>选择线路颜色 (按顺序):</label>
            <div class="color-inputs">
                <button class="color-btn color-red" onclick="addWireColor('red')">红色</button>
                <button class="color-btn color-blue" onclick="addWireColor('blue')">蓝色</button>
                <button class="color-btn color-white" onclick="addWireColor('white')">白色</button>
                <button class="color-btn color-yellow" onclick="addWireColor('yellow')">黄色</button>
                <button class="color-btn color-black" onclick="addWireColor('black')">黑色</button>
            </div>
        </div>
        <div class="wire-display" id="wireDisplay"></div>
        <div style="margin-top:20px">
            <button class="btn btn-secondary" onclick="clearWires()">清除全部</button>
        </div>
        <div id="basicWireResult" class="result" style="display: none;"></div>
    `;

  // 重置状态
  wireColors = [];
  Utils.hideResult("basicWireResult");
}

function addWireColor(color) {
  const count = parseInt(document.getElementById("wireCount").value);
  if (wireColors.length < count) {
    wireColors.push(color);
    updateWireDisplay();
    autoSolveBasicWire();
  }
}

function autoSolveBasicWire() {
  const count = parseInt(document.getElementById("wireCount").value);
  const lastSerial = parseInt(document.getElementById("lastSerial").value);

  if (wireColors.length === count) {
    const result = calculateBasicWire(count, lastSerial, wireColors);
    Utils.showResult(result, "basicWireResult");
  } else {
    Utils.hideResult("basicWireResult");
  }
}

function updateWireDisplay() {
  const display = document.getElementById("wireDisplay");
  display.innerHTML = "";

  wireColors.forEach((color, index) => {
    const wire = document.createElement("div");
    wire.className = `wire-item ${Utils.colorMap[color].class}`;
    wire.textContent = `${index + 1}`;
    display.appendChild(wire);
  });
}

function clearWires() {
  wireColors = [];
  updateWireDisplay();
  Utils.hideResult("basicWireResult");
}

function solveBasicWire() {
  autoSolveBasicWire();
}

function calculateBasicWire(count, lastSerial, colors) {
  const redCount = colors.filter((c) => c === "red").length;
  const blueCount = colors.filter((c) => c === "blue").length;
  const whiteCount = colors.filter((c) => c === "white").length;
  const yellowCount = colors.filter((c) => c === "yellow").length;
  const blackCount = colors.filter((c) => c === "black").length;

  let advice = "";
  if (count === 3) {
    if (redCount === 0) advice = "剪【第 2 根】线";
    else if (colors[colors.length - 1] === "white") advice = "剪【最后一根】线";
    else if (blueCount > 1) advice = "剪【最后一根蓝】线";
    else advice = "剪【最后一根】线";
  } else if (count === 4) {
    if (redCount > 1 && lastSerial % 2 === 1) advice = "剪【最后一根红】线";
    else if (colors[colors.length - 1] === "yellow" && redCount === 0)
      advice = "剪【第 1 根】线";
    else if (blueCount === 1) advice = "剪【第 1 根】线";
    else if (yellowCount > 1) advice = "剪【最后一根】线";
    else advice = "剪【第 2 根】线";
  } else if (count === 5) {
    if (colors[colors.length - 1] === "black" && lastSerial % 2 === 1)
      advice = "剪【第 4 根】线";
    else if (redCount === 1 && yellowCount > 1) advice = "剪【第 1 根】线";
    else if (blackCount === 0) advice = "剪【第 2 根】线";
    else advice = "剪【第 1 根】线";
  } else if (count === 6) {
    if (yellowCount === 0 && lastSerial % 2 === 1) advice = "剪【第 3 根】线";
    else if (yellowCount === 1 && whiteCount > 1) advice = "剪【第 4 根】线";
    else if (redCount === 0) advice = "剪【最后一根】线";
    else advice = "剪【第 4 根】线";
  }
  return `建议操作: <strong>${advice}</strong>`;
}
