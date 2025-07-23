function initMorsCode() {
  const content = document.getElementById("moduleContent");
  content.innerHTML = `
    <div class="input-group">
        <label>输入摩斯码 (用空格分隔字母):</label>
        <input type="text" id="morseInput" placeholder="例如：. .-.. .. -.-. 表示ELIC">
    </div>
    <div id="morsCodeResult" class="result" style="display: none;"></div>
  `;

  const input = document.getElementById("morseInput");
  input.addEventListener("input", solveMorsCode);

  Utils.hideResult("morsCodeResult");
}

function solveMorsCode() {
  const morseInput = document.getElementById("morseInput").value.trim();
  const result = calculateMorsCode(morseInput);
  Utils.showResult(result, "morsCodeResult");
}

function calculateMorsCode(morseStr) {
  const morseToLetter = {
    ".": "E",
    "..": "I",
    "...": "S",
    "....": "H",
    ".-": "A",
    ".-.": "R",
    ".-..": "L",
    "..-.": "F",
    "...-": "V",
    "-": "T",
    "-.": "N",
    "-..": "D",
    "--": "M",
    "---": "O",
    "-...": "B",
    "-.-": "K",
    "-..-": "X",
    "-.-.": "C",
  };

  const frequencyMap = {
    beats: 3.6,
    bistro: 3.552,
    bombs: 3.565,
    boxes: 3.535,
    break: 3.572,
    brick: 3.575,
    flick: 3.555,
    halls: 3.515,
    leaks: 3.542,
    shell: 3.505,
    slick: 3.522,
    steak: 3.582,
    sting: 3.592,
    strobe: 3.545,
    trick: 3.532,
    vector: 3.595,
  };

  if (!morseStr) return "请输入摩斯码";

  const letters = morseStr.split(" ").map((code) => morseToLetter[code] || "?");
  if (letters.includes("?")) return "❌ 包含无法识别的摩斯码段";

  const prefix = letters.join("").toLowerCase();

  const matches = Object.entries(frequencyMap).filter(([word]) =>
    word.startsWith(prefix)
  );

  if (matches.length === 0) {
    return `❌ 没有匹配的单词，当前前缀：${prefix.toUpperCase()}`;
  }

  const list = matches
    .map(([word, freq]) => `${word.toUpperCase()} → ${freq.toFixed(3)} MHz`)
    .join("<br>");

  return `可能的单词和频率如下：<br>${list}`;
}
