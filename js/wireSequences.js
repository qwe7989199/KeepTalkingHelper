let wireSequenceHistory = {
  red: 0,
  blue: 0,
  black: 0,
};

function initWireSequences() {
  const content = document.getElementById("moduleContent");
  let wireRows = "";
  for (let i = 0; i < 3; i++) {
    wireRows += `
      <div class="wire-row" style="margin-bottom:8px;">
        <select class="wire-color form-select">
          <option value="">无</option>
          <option value="red" style="color:red;">红</option>
          <option value="blue" style="color:blue;">蓝</option>
          <option value="black" style="color:black;">黑</option>
        </select>
        <select class="wire-end form-select">
          <option value="">无</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>
    `;
  }
  content.innerHTML = `
    <div class="wire-sequence-container">
      <label>请按顺序填写本面板每根线的颜色和端点：</label>
      ${wireRows}
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
  const wireRows = document.querySelectorAll(".wire-row");
  let results = [];
  // 用于累计计数
  let colorCount = { red: 0, blue: 0, black: 0 };
  wireRows.forEach((row) => {
    const color = row.querySelector(".wire-color").value;
    const end = row.querySelector(".wire-end").value;
    if (!color || !end) return;
    let table;
    if (color === "red") {
      table = [
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
    } else if (color === "blue") {
      table = [
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
    } else if (color === "black") {
      table = [
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
    }
    // 累计全局计数
    wireSequenceHistory[color]++;
    colorCount[color]++;
    const idx = wireSequenceHistory[color] - 1;
    const valid = table && table[idx] ? table[idx] : [];
    const decision = valid.includes(end) ? "剪断" : "不剪";
    const colorText =
      color === "black" ? "黑色" : color === "red" ? "红色" : "蓝色";
    if (decision === "剪断") {
      results.push(
        `<span style="color: ${color}">${colorText}(${end}): 剪断</span>`
      );
    } else {
      results.push(
        `<span style="color: #CCC;">${colorText}(${end}): 不剪</span>`
      );
    }
  });

  // 显示全局累计次数
  const counts = `
    <div style="margin-top: 8px;">
      <strong>累计出现次数：</strong><br>
      <span style="color: red;">红色: ${wireSequenceHistory.red} 次</span><br>
      <span style="color: blue;">蓝色: ${wireSequenceHistory.blue} 次</span><br>
      <span style="color: black;">黑色: ${wireSequenceHistory.black} 次</span>
    </div>
  `;
  showResult(results.join("<br>") + counts, "wireSequencesResult");
}

function switchWireSequences() {
  document.querySelectorAll(".wire-color").forEach((sel) => (sel.value = ""));
  document.querySelectorAll(".wire-end").forEach((sel) => (sel.value = ""));
}

function resetWireSequences() {
  wireSequenceHistory = { red: 0, blue: 0, black: 0 }; // 全局计数重置
  document.querySelectorAll(".wire-color").forEach((sel) => (sel.value = ""));
  document.querySelectorAll(".wire-end").forEach((sel) => (sel.value = ""));
  hideResult("wireSequencesResult");
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
