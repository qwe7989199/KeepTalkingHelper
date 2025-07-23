function initKnobs() {
  const content = document.getElementById("moduleContent");
  content.innerHTML = `
    <div class="input-group">
      <label>第一排亮灯编号（如 356）:</label>
      <input type="text" id="row1" placeholder="只填数字，如356">
    </div>
    <div class="input-group">
      <label>第二排亮灯编号（如 12346）:</label>
      <input type="text" id="row2" placeholder="只填数字，如12346">
    </div>
    <button class="btn" onclick="solveKnobs()">解决</button>
    <div id="knobsResult" class="result" style="display: none;"></div>
  `;

  Utils.hideResult("knobsResult");
}

function solveKnobs() {
  const row1 = document.getElementById("row1").value.trim();
  const row2 = document.getElementById("row2").value.trim();

  const result = calculateKnobs(row1, row2);
  Utils.showResult(result, "knobsResult");
}

function calculateKnobs(r1, r2) {
  const map = {
    "356|12346": "上",
    "135|2356": "上",
    "236|12346": "下",
    "135|26": "下",
    "5|1456": "左",
    "5|45": "左",
    "13456|1235": "右",
    "134|1235": "右",
  };

  // 将输入按顺序排序，以避免用户输入顺序不同导致无法匹配
  const key = [r1, r2].map((s) => s.split("").sort().join("")).join("|");

  if (map[key]) {
    return `将旋钮指向：${map[key]}`;
  } else {
    return "未找到匹配的灯光配置，请检查输入";
  }
}
