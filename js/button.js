// 按钮模块

let selectedColor = null;
let selectedText = null;

function initButton() {
  const content = document.getElementById("moduleContent");
  content.innerHTML = `
    <div class="input-group">
      <label>按钮颜色:</label>
      <div id="colorBtnGroup" class="color-inputs">
        <button class="color-btn color-blue" data-value="蓝色" onclick="selectButtonColor('蓝色', this)">蓝色</button>
        <button class="color-btn color-white" data-value="白色" onclick="selectButtonColor('白色', this)">白色</button>
        <button class="color-btn color-yellow" data-value="黄色" onclick="selectButtonColor('黄色', this)">黄色</button>
        <button class="color-btn color-red" data-value="红色" onclick="selectButtonColor('红色', this)">红色</button>
        <button class="color-btn color-black" data-value="其他" onclick="selectButtonColor('其他', this)">其他</button>
      </div>
    </div>
    <div class="input-group">
      <label>按钮文字:</label>
      <div id="textBtnGroup" class="color-inputs">
        <button class="color-btn" data-value="中止" onclick="selectButtonText('中止', this)">中止</button>
        <button class="color-btn" data-value="引爆" onclick="selectButtonText('引爆', this)">引爆</button>
        <button class="color-btn" data-value="按住" onclick="selectButtonText('按住', this)">按住</button>
        <button class="color-btn" data-value="其他" onclick="selectButtonText('其他', this)">其他</button>
      </div>
    </div>
    <div class="input-group">
      <label>电池数量:</label>
      <input type="number" id="batteryCount" min="0" max="6" value="0">
    </div>
    <div class="input-group">
      <label>是否有标着CAR的亮起指示灯:</label>
      <select id="hasCar">
        <option value="false">否</option>
        <option value="true">是</option>
      </select>
    </div>
    <div class="input-group">
      <label>是否有标着FRK的亮起指示灯:</label>
      <select id="hasFrk">
        <option value="false">否</option>
        <option value="true">是</option>
      </select>
    </div>
    <button class="btn" onclick="solveButton()">解决</button>
    <div id="buttonResult" class="result" style="display: none;"></div>
    <div id="heldButtonDiv" style="display: none; margin-top: 20px;">
      <div class="input-group">
        <label>请按住按钮并选择发光条的颜色:</label>
        <div id="glowBtnGroup" class="color-inputs">
          <button class="color-btn" data-value="蓝色" onclick="selectGlowColor('蓝色', this)">蓝色</button>
          <button class="color-btn" data-value="白色" onclick="selectGlowColor('白色', this)">白色</button>
          <button class="color-btn" data-value="黄色" onclick="selectGlowColor('黄色', this)">黄色</button>
          <button class="color-btn" data-value="其他" onclick="selectGlowColor('其他', this)">其他</button>
        </div>
      </div>
      <button class="btn" onclick="solveHeldButton()">确定</button>
      <div id="heldButtonResult" class="result" style="display: none;"></div>
    </div>
  `;
  Utils.hideResult("buttonResult");
  document.getElementById("heldButtonDiv").style.display = "none";
  document.getElementById("heldButtonResult").style.display = "none";
  selectedColor = null;
  selectedText = null;
  selectedGlow = null;
}

// 颜色单选
function selectButtonColor(value, btn) {
  selectedColor = value;
  document
    .querySelectorAll("#colorBtnGroup .color-btn")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
}

// 文字单选
function selectButtonText(value, btn) {
  selectedText = value;
  document
    .querySelectorAll("#textBtnGroup .color-btn")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
}

function solveButton() {
  Utils.hideResult("buttonResult");
  document.getElementById("heldButtonDiv").style.display = "none";
  document.getElementById("heldButtonResult").style.display = "none";

  const batteryCount = parseInt(document.getElementById("batteryCount").value);
  const hasCar = document.getElementById("hasCar").value === "true";
  const hasFrk = document.getElementById("hasFrk").value === "true";

  if (!selectedColor || !selectedText) {
    alert("请选择按钮颜色和按钮文字！");
    return;
  }

  if (selectedColor === "蓝色" && selectedText === "中止") {
    showHeldButton();
  } else if (batteryCount > 1 && selectedText === "引爆") {
    Utils.showResult("按下并立即松开按钮", "buttonResult");
  } else if (selectedColor === "白色" && hasCar) {
    showHeldButton();
  } else if (batteryCount > 2 && hasFrk) {
    Utils.showResult("按下并立即松开按钮", "buttonResult");
  } else if (selectedColor === "黄色") {
    showHeldButton();
  } else if (selectedColor === "红色" && selectedText === "按住") {
    Utils.showResult("按下并立即松开按钮", "buttonResult");
  } else {
    showHeldButton();
  }
}

let selectedGlow = null;
function selectGlowColor(value, btn) {
  selectedGlow = value;
  document
    .querySelectorAll("#glowBtnGroup .color-btn")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
}

function showHeldButton() {
  document.getElementById("heldButtonDiv").style.display = "block";
  document.getElementById("heldButtonResult").style.display = "none";
  selectedGlow = null;
  document
    .querySelectorAll("#glowBtnGroup .color-btn")
    .forEach((b) => b.classList.remove("selected"));
}

function solveHeldButton() {
  if (!selectedGlow) {
    alert("请选择发光条的颜色！");
    return;
  }
  let result = "";
  if (selectedGlow === "蓝色") {
    result = "当倒计时在任何位置显示【4】时松开";
  } else if (selectedGlow === "白色") {
    result = "当倒计时在任何位置显示【1】时松开";
  } else if (selectedGlow === "黄色") {
    result = "当倒计时在任何位置显示【5】时松开";
  } else {
    result = "当倒计时在任何位置显示【1】时松开";
  }
  Utils.showResult(result, "heldButtonResult");
  document.getElementById("heldButtonResult").style.display = "block";
}
