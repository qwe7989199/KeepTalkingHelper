// 键盘模块

// 27个符号中文名（顺序与01.png~27.png一致）
const keypadSymbols = [
  "镜子",
  "A和T交织",
  "λ有一条线",
  "闪电",
  "蜘蛛",
  "带尾巴的花体H",
  "倒C内有一点",
  "倒E上有两点",
  "弹簧Q",
  "镜像K",
  "反向问号",
  "copyright",
  "大鼻子",
  "half 3 with tail",
  "空心五角星",
  "6",
  "反向P",
  "b和T交织",
  "开心的脸",
  "三叉戟",
  "C内有一点",
  "触角蛇",
  "实心五角星",
  "キ",
  "?",
  "反向的N",
  "omega",
];

// 6列，每列7个符号（下标从1开始，需-1转为数组下标）
const keypadVecs = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 1, 7, 9, 15, 6, 11],
  [12, 13, 9, 10, 14, 3, 15],
  [16, 17, 18, 5, 10, 11, 19],
  [20, 19, 18, 21, 17, 22, 23],
  [16, 8, 24, 25, 20, 26, 27],
];

// 记录已选的符号（最多4个）
let selectedKeypadSymbols = [];

function initKeypad() {
  const content = document.getElementById("moduleContent");
  content.innerHTML = `
    <div class="input-group">
      <label>请选择4个符号（点击图片，已选高亮）：</label>
      <span id="keypadSelectedCount" style="margin-left:12px;color:#667eea;font-weight:bold;">已选0/4</span>
      <div class="keypad-table-wrap" id="keypadTableWrap"></div>
    </div>
    <button class="btn" onclick="solveKeypad()">解决</button>
    <div id="keypadResult" class="result" style="display: none;"></div>
  `;
  selectedKeypadSymbols = []; // 重置已选符号
  renderKeypadTable(); // 重新渲染图片，清除高亮
  updateKeypadSelectedCount(); // 初始化计数
  Utils.hideResult("keypadResult");
}

function renderKeypadTable(highlightCol = -1) {
  const wrap = document.getElementById("keypadTableWrap");
  wrap.innerHTML = "";
  for (let col = 0; col < 6; col++) {
    const colDiv = document.createElement("div");
    colDiv.className = "keypad-col";
    if (col === highlightCol) {
      colDiv.style.background = "#ff9494ff"; // 淡红色
      colDiv.style.borderRadius = "8px";
    }
    for (let row = 0; row < 7; row++) {
      const idx = keypadVecs[col][row] - 1;
      const img = document.createElement("img");
      img.className = "keypad-symbol-image";
      img.src = `statics/img/modules/keypad/${String(idx + 1).padStart(
        2,
        "0"
      )}.webp`;
      img.alt = keypadSymbols[idx];
      img.title = keypadSymbols[idx];
      img.style.cursor = "pointer";
      img.onclick = () => selectKeypadSymbol(idx, img);
      if (selectedKeypadSymbols.includes(idx)) {
        img.classList.add("selected");
      }
      colDiv.appendChild(img);
    }
    wrap.appendChild(colDiv);
  }
  updateKeypadSelectedCount();
}

function selectKeypadSymbol(symbol, btn) {
  if (
    selectedKeypadSymbols.length >= 4 &&
    !btn.classList.contains("selected")
  ) {
    alert("最多只能选择4个符号！");
    return;
  }
  if (btn.classList.contains("selected")) {
    // 取消选择
    selectedKeypadSymbols = selectedKeypadSymbols.filter((s) => s !== symbol);
  } else {
    // 选择
    selectedKeypadSymbols.push(symbol);
  }
  renderKeypadTable(); // 每次操作后刷新UI
}

// 解决逻辑：找到包含这4个符号的那一列，并按该列顺序输出
function solveKeypad() {
  if (selectedKeypadSymbols.length !== 4) {
    alert("请选择4个符号！");
    return;
  }
  // 找到包含这4个符号的列
  let foundCol = -1;
  for (let col = 0; col < 6; col++) {
    const colSet = new Set(keypadVecs[col].map((x) => x - 1));
    if (selectedKeypadSymbols.every((idx) => colSet.has(idx))) {
      foundCol = col;
      break;
    }
  }
  if (foundCol === -1) {
    Utils.showResult("未找到包含这4个符号的列，请检查选择！", "keypadResult");
    renderKeypadTable(-1); // 无高亮
    return;
  }
  // 高亮该列
  renderKeypadTable(foundCol);
  const colArr = keypadVecs[foundCol].map((x) => x - 1);
  const orderedSelected = colArr.filter((idx) =>
    selectedKeypadSymbols.includes(idx)
  );
  const result =
    "请按顺序点击：" +
    orderedSelected
      .map(
        (idx) =>
          `<img src="statics/img/modules/keypad/${String(idx + 1).padStart(
            2,
            "0"
          )}.webp" alt="${keypadSymbols[idx]}" title="${
            keypadSymbols[idx]
          }" style="height:64px;vertical-align:middle;margin:0 4px;border-radius:4px;border:2px solid #667eea;">`
      )
      .join("");
  Utils.showResult(result, "keypadResult");
}

function updateKeypadSelectedCount() {
  const countSpan = document.getElementById("keypadSelectedCount");
  if (countSpan) {
    countSpan.textContent = `已选${selectedKeypadSymbols.length}/4`;
  }
}
