let wireSequenceHistory = {
  red: 0,
  blue: 0,
  black: 0,
};

function initWireSequences() {
  const content = document.getElementById("moduleContent");
  content.innerHTML = `
    <div class="wire-sequence-container">
      <div class="wire-group">
        <label style="color:red">红色线路:</label>
        <div class="wire-options">
          <label class="wire-option"><span>A</span><input type="checkbox" name="redWire" value="A" class="large-checkbox"></label>
          <label class="wire-option"><span>B</span><input type="checkbox" name="redWire" value="B" class="large-checkbox"></label>
          <label class="wire-option"><span>C</span><input type="checkbox" name="redWire" value="C" class="large-checkbox"></label>
        </div>
      </div>
      <div class="wire-group">
        <label style="color:blue">蓝色线路:</label>
        <div class="wire-options">
          <label class="wire-option"><span>A</span><input type="checkbox" name="blueWire" value="A" class="large-checkbox"></label>
          <label class="wire-option"><span>B</span><input type="checkbox" name="blueWire" value="B" class="large-checkbox"></label>
          <label class="wire-option"><span>C</span><input type="checkbox" name="blueWire" value="C" class="large-checkbox"></label>
        </div>
      </div>
      <div class="wire-group">
        <label style="color:black">黑色线路:</label>
        <div class="wire-options">
          <label class="wire-option"><span>A</span><input type="checkbox" name="blackWire" value="A" class="large-checkbox"></label>
          <label class="wire-option"><span>B</span><input type="checkbox" name="blackWire" value="B" class="large-checkbox"></label>
          <label class="wire-option"><span>C</span><input type="checkbox" name="blackWire" value="C" class="large-checkbox"></label>
        </div>
      </div>
    </div>
    <div class="action-buttons" style="margin-top: 30px;">
        <button class="btn" onclick="solveWireSequences()">解决</button>
        <button class="btn btn-secondary" onclick="switchWireSequences()">切换</button>
        <button class="btn btn-secondary" onclick="resetWireSequences()">重置</button>
    </div>
    <div id="wireSequencesResult" class="result" style="display: none; margin-top:10px;"></div>
  `;

  resetWireSequences();
}

function getCheckedValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checkboxes).map((cb) => cb.value);
}

function solveWireSequences() {
  const redWire = getCheckedValues("redWire");
  const blueWire = getCheckedValues("blueWire");
  const blackWire = getCheckedValues("blackWire");

  const result = calculateWireSequences(redWire, blueWire, blackWire);
  showResult(result, "wireSequencesResult");
}

function switchWireSequences() {
  // 清空所有勾选
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((cb) => (cb.checked = false));
}

function resetWireSequences() {
  wireSequenceHistory = { red: 0, blue: 0, black: 0 };
  hideResult("wireSequencesResult");
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((cb) => (cb.checked = false));
}

function calculateWireSequences(redArr, blueArr, blackArr) {
  const redTable = [
    ["C"],
    ["B"],
    ["A"],
    ["A", "C"],
    ["B"],
    ["A", "C"],
    ["A", "B", "C"],
    ["A", "B"],
    ["B"],
  ];
  const blueTable = [
    ["B"],
    ["A", "C"],
    ["B"],
    ["A"],
    ["B"],
    ["B", "C"],
    ["C"],
    ["A", "C"],
    ["A"],
  ];
  const blackTable = [
    ["A", "B", "C"],
    ["A", "C"],
    ["B"],
    ["A", "C"],
    ["B"],
    ["B", "C"],
    ["A", "B"],
    ["C"],
    ["C"],
  ];

  let results = [];

  // 红线处理
  redArr.forEach((letter) => {
    wireSequenceHistory.red++;
    const idx = wireSequenceHistory.red - 1;
    const valid = redTable[idx] || [];
    const decision = valid.includes(letter) ? "剪断" : "不剪";
    results.push(
      `<span style="color: red">红色(${letter}): ${decision}</span>`
    );
  });

  // 蓝线处理
  blueArr.forEach((letter) => {
    wireSequenceHistory.blue++;
    const idx = wireSequenceHistory.blue - 1;
    const valid = blueTable[idx] || [];
    const decision = valid.includes(letter) ? "剪断" : "不剪";
    results.push(
      `<span style="color: blue">蓝色(${letter}): ${decision}</span>`
    );
  });

  // 黑线处理
  blackArr.forEach((letter) => {
    wireSequenceHistory.black++;
    const idx = wireSequenceHistory.black - 1;
    const valid = blackTable[idx] || [];
    const decision = valid.includes(letter) ? "剪断" : "不剪";
    results.push(
      `<span style="color: black">黑色(${letter}): ${decision}</span>`
    );
  });

  // 累计次数统计
  const counts = `
    <div style="margin-top: 8px;">
      <strong>累计出现次数：</strong><br>
      <span style="color: red;">红色: ${wireSequenceHistory.red} 次</span><br>
      <span style="color: blue;">蓝色: ${wireSequenceHistory.blue} 次</span><br>
      <span style="color: black;">黑色: ${wireSequenceHistory.black} 次</span>
    </div>
  `;

  return results.join("<br>") + counts;
}

function showResult(html, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = html;
  container.style.display = "block";
}

function hideResult(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  container.style.display = "none";
}
