function initPasswords() {
  console.log("密码模块初始化");
  const content = document.getElementById("moduleContent");
  content.innerHTML = `
    <div class="input-group">
      <label>第一列字母:</label>
      <input type="text" id="column1" placeholder="如: ABX">
    </div>
    <div class="input-group">
      <label>第二列字母:</label>
      <input type="text" id="column2" placeholder="如: BOY">
    </div>
    <div class="input-group">
      <label>第三列字母:</label>
      <input type="text" id="column3" placeholder="如: CDE">
    </div>
    <div class="input-group">
      <label>第四列字母:</label>
      <input type="text" id="column4" placeholder="如: FGK">
    </div>
    <div class="input-group">
      <label>第五列字母:</label>
      <input type="text" id="column5" placeholder="如: STU">
    </div>
    <button class="btn" onclick="solvePasswords()">解决</button>
    <div id="passwordsResult" class="result" style="display: none;"></div>
  `;

  // 添加输入监听器，实时更新结果
  for (let i = 1; i <= 5; i++) {
    document
      .getElementById(`column${i}`)
      .addEventListener("input", solvePasswords);
  }

  Utils.hideResult("passwordsResult");
}

function solvePasswords() {
  const columns = [
    document.getElementById("column1").value.toUpperCase(),
    document.getElementById("column2").value.toUpperCase(),
    document.getElementById("column3").value.toUpperCase(),
    document.getElementById("column4").value.toUpperCase(),
    document.getElementById("column5").value.toUpperCase(),
  ];

  const result = calculatePasswords(columns);
  Utils.showResult(result, "passwordsResult");
}

function calculatePasswords(columns) {
  const passwords = [
    "ABOUT",
    "AFTER",
    "AGAIN",
    "BELOW",
    "COULD",
    "EVERY",
    "FIRST",
    "FOUND",
    "GREAT",
    "HOUSE",
    "LARGE",
    "LEARN",
    "NEVER",
    "OTHER",
    "PLACE",
    "PLANT",
    "POINT",
    "RIGHT",
    "SMALL",
    "SOUND",
    "SPELL",
    "STILL",
    "STUDY",
    "THEIR",
    "THERE",
    "THESE",
    "THING",
    "THINK",
    "THREE",
    "WATER",
    "WHERE",
    "WHICH",
    "WORLD",
    "WOULD",
    "WRITE",
  ];

  // 放宽：只要是 A-Z 字母即可，允许为空
  if (columns.some((col) => !/^[A-Z]*$/.test(col))) {
    return "❌ 只能输入字母 A-Z。";
  }

  const possible = passwords.filter((word) => {
    return word.split("").every((ch, idx) => {
      return columns[idx] === "" || columns[idx].includes(ch);
    });
  });

  if (possible.length === 1) {
    return `✅ 唯一密码是：${possible[0]}`;
  } else if (possible.length > 1) {
    return `可能的密码有：${possible.join(", ")}`;
  } else {
    return "❌ 暂无匹配结果，继续输入试试看。";
  }
}
