function initSimonSays() {
  const content = document.getElementById("moduleContent");
  content.innerHTML = `
        <div class="input-group">
            <label>序列号是否包含元音字母?</label>
            <select id="hasVowel">
                <option value="true">是</option>
                <option value="false">否</option>
            </select>
        </div>
        <div class="input-group">
            <label>失误次数 (0~2):</label>
            <input type="number" id="strikeCount" min="0" max="2" value="0">
        </div>
        <div class="input-group">
            <label>闪烁的颜色顺序 (可多次点击):</label>
            <div class="color-inputs">
                <button class="color-btn color-red" onclick="addSimonColor('red')">红</button>
                <button class="color-btn color-blue" onclick="addSimonColor('blue')">蓝</button>
                <button class="color-btn color-green" onclick="addSimonColor('green')">绿</button>
                <button class="color-btn color-yellow" onclick="addSimonColor('yellow')">黄</button>
            </div>
        </div>
        <div class="input-group">
            <label>当前闪烁顺序:</label>
            <div id="colorSequence" style="min-blackght:24px;"></div>
        </div>
        <button class="btn" onclick="solveSimonSays()">解决</button>
        <button class="btn btn-secondary" onclick="resetSimonSays()">重置</button>
        <div id="simonResult" class="result" style="display: none;"></div>
    `;

  window._simonSequence = [];
  updateColorSequenceDisplay();
  Utils.hideResult("simonResult");
}

function addSimonColor(color) {
  window._simonSequence.push(color);
  updateColorSequenceDisplay();
}

function updateColorSequenceDisplay() {
  const display = document.getElementById("colorSequence");
  display.innerText = window._simonSequence
    .map((c) => Utils.colorMap[c].name)
    .join(" - ");
}

function resetSimonSays() {
  window._simonSequence = [];
  updateColorSequenceDisplay();
  Utils.hideResult("simonResult");
}

function solveSimonSays() {
  const hasVowel = document.getElementById("hasVowel").value === "true";
  const strikeCount = parseInt(document.getElementById("strikeCount").value);
  const sequence = window._simonSequence;

  if (sequence.length === 0) {
    alert("请先点击至少一个闪烁颜色！");
    return;
  }

  const result = sequence.map((color) => {
    return Utils.colorMap[calculateSimonSays(hasVowel, strikeCount, color)]
      .name;
  });

  Utils.showResult(`按下按钮顺序：${result.join(" → ")}`, "simonResult");
}

function calculateSimonSays(hasVowel, strikeCount, color) {
  if (hasVowel) {
    const vowelMap = {
      red: ["blue", "yellow", "green"],
      blue: ["red", "green", "red"],
      green: ["yellow", "blue", "yellow"],
      yellow: ["green", "red", "yellow"],
    };
    return vowelMap[color][strikeCount];
  } else {
    const consonantMap = {
      red: ["blue", "red", "yellow"],
      blue: ["yellow", "blue", "green"],
      green: ["green", "yellow", "blue"],
      yellow: ["red", "green", "red"],
    };
    return consonantMap[color][strikeCount];
  }
}
