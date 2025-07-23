function initComplicatedWires() {
  const content = document.getElementById("moduleContent");
  content.innerHTML = `
    <div class="input-group">
        <label>电池数量:</label>
        <input type="number" id="batteryCount" min="0" value="0">
    </div>
    <div class="input-group">
        <label>是否有并口(Parallel Port)?</label>
        <select id="hasParallel">
            <option value="true">是</option>
            <option value="false">否</option>
        </select>
    </div>
    <div class="input-group">
        <label>序列号最后一位数字:</label>
        <input type="number" id="serialLastDigit" min="0" max="9" value="0">
    </div>
    <hr>
    <div class="input-group">
        <label>电线颜色:</label>
        <select id="wireColor">
            <option value="none">无色（白色）</option>
            <option value="red">有红色</option>
            <option value="blue">有蓝色</option>
            <option value="syellow">红+蓝（双色）</option>
        </select>
    </div>
    <div class="input-group">
        <label>是否有星星标记?</label>
        <select id="hasStar">
            <option value="false">否</option>
            <option value="true">是</option>
        </select>
    </div>
    <div class="input-group">
        <label>LED 是否亮着?</label>
        <select id="ledOn">
            <option value="false">否</option>
            <option value="true">是</option>
        </select>
    </div>
    <button class="btn" onclick="solveComplicatedWires()">判断是否剪线</button>
    <div id="complicatedWiresResult" class="result" style="display:none;"></div>
  `;

  Utils.hideResult("complicatedWiresResult");
}

function solveComplicatedWires() {
  const color = document.getElementById("wireColor").value;
  const hasStar = document.getElementById("hasStar").value === "true";
  const ledOn = document.getElementById("ledOn").value === "true";

  const batteryCount = parseInt(document.getElementById("batteryCount").value);
  const hasParallel = document.getElementById("hasParallel").value === "true";
  const lastEven =
    parseInt(document.getElementById("serialLastDigit").value) % 2 === 0;

  const code = getWireCode(color, hasStar, ledOn);
  const result = judgeByCode(code, { lastEven, batteryCount, hasParallel });

  Utils.showResult(
    result ? "✂️ 剪断电线" : "❌ 不要剪线",
    "complicatedWiresResult"
  );
}

// 获取代码 C/D/S/P/B
function getWireCode(color, hasStar, ledOn) {
  // 对照图上的逻辑直接翻译
  if (color === "red") {
    if (hasStar) return ledOn ? "b" : "c";
    return ledOn ? "b" : "s";
  } else if (color === "blue") {
    if (hasStar) return ledOn ? "p" : "d";
    return ledOn ? "p" : "s";
  } else if (color === "yellow") {
    if (hasStar) return ledOn ? "d" : "p";
    return ledOn ? "s" : "d";
  } else {
    // 无色
    if (hasStar) return ledOn ? "b" : "c";
    return ledOn ? "d" : "c";
  }
}

function judgeByCode(code, { lastEven, batteryCount, hasParallel }) {
  switch (code) {
    case "c":
      return true;
    case "d":
      return false;
    case "s":
      return lastEven;
    case "p":
      return hasParallel;
    case "b":
      return batteryCount >= 2;
    default:
      return false;
  }
}
