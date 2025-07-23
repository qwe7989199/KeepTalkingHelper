// 记忆模块完整逻辑

let memoryStage = 1;
let memoryHistory = [];

function initMemory() {
  const content = document.getElementById("moduleContent");
  content.innerHTML = `
    <div class="input-group">
        <label>当前阶段:</label>
        <input type="number" id="memoryStage" value="1" min="1" max="5" readonly>
    </div>
    <div class="input-group">
        <label>显示的数字:</label>
        <input type="number" id="displayNumber" min="1" max="4" value="1">
    </div>
    
    <div class="input-group row">
          <label>标签数字:</label>
          <div class="coord-pair">
          <input type="number" id="label1" min="0" max="9" value="0">
          <input type="number" id="label2" min="0" max="9" value="0">
          <input type="number" id="label3" min="0" max="9" value="0">
          <input type="number" id="label4" min="0" max="9" value="0">
        </div>
    </div>

    <button class="btn" onclick="solveMemory()">解决</button>
    <button class="btn btn-secondary" onclick="resetMemory()">重置</button>
    <div id="memoryResult" class="result" style="display: none;"></div>
  `;

  resetMemory();
}

function solveMemory() {
  const stage = memoryStage;
  const displayNum = parseInt(document.getElementById("displayNumber").value);
  const labels = [
    parseInt(document.getElementById("label1").value),
    parseInt(document.getElementById("label2").value),
    parseInt(document.getElementById("label3").value),
    parseInt(document.getElementById("label4").value),
  ];

  const { position, label, message } = calculateMemory(
    stage,
    displayNum,
    labels
  );

  // 记录历史
  memoryHistory.push({
    stage,
    displayNum,
    position,
    label,
  });

  // 更新阶段
  memoryStage++;
  if (memoryStage > 5) memoryStage = 5;
  document.getElementById("memoryStage").value = memoryStage;

  Utils.showResult(message, "memoryResult");
}

function resetMemory() {
  memoryStage = 1;
  memoryHistory = [];
  document.getElementById("memoryStage").value = 1;
  document.getElementById("label1").value = 0;
  document.getElementById("label2").value = 0;
  document.getElementById("label3").value = 0;
  document.getElementById("label4").value = 0;
  Utils.hideResult("memoryResult");
}

function calculateMemory(stage, display, labels) {
  let pos = 0;
  let label = 0;
  const prev = memoryHistory;

  if (stage === 1) {
    if (display === 1 || display === 2) pos = 2;
    else if (display === 3) pos = 3;
    else if (display === 4) pos = 4;
  } else if (stage === 2) {
    if (display === 1) {
      label = 4;
      pos = labels.indexOf(4) + 1;
    } else if (display === 2 || display === 4) {
      pos = prev[0].position;
    } else if (display === 3) {
      pos = 1;
    }
  } else if (stage === 3) {
    if (display === 1) {
      label = prev[1].label;
      pos = labels.indexOf(label) + 1;
    } else if (display === 2) {
      label = prev[0].label;
      pos = labels.indexOf(label) + 1;
    } else if (display === 3) {
      pos = 3;
    } else if (display === 4) {
      label = 4;
      pos = labels.indexOf(4) + 1;
    }
  } else if (stage === 4) {
    if (display === 1) {
      pos = prev[0].position;
    } else if (display === 2) {
      pos = 1;
    } else if (display === 3 || display === 4) {
      pos = prev[1].position;
    }
  } else if (stage === 5) {
    if (display === 1) {
      label = prev[0].label;
      pos = labels.indexOf(label) + 1;
    } else if (display === 2) {
      label = prev[1].label;
      pos = labels.indexOf(label) + 1;
    } else if (display === 3) {
      label = prev[3].label;
      pos = labels.indexOf(label) + 1;
    } else if (display === 4) {
      label = prev[2].label;
      pos = labels.indexOf(label) + 1;
    }
  }

  label = labels[pos - 1]; // 最终确定按下的按钮的标签
  const msg = `按下位置 ${pos} 的按钮（数字为 ${label}）`;

  return { position: pos, label, message: msg };
}
