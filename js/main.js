// 主控制器 - 管理游戏模块的加载和切换

// 游戏模块配置
const gameModules = [
  {
    id: 1,
    title: "基础线路",
    description: "根据线路颜色和数量判断剪哪根线",
    file: "basicWire.js",
    icon: "statics/svg/WireComponent.svg",
  },
  {
    id: 2,
    title: "按钮模块",
    description: "根据按钮颜色和文字决定如何按下和松开按钮",
    file: "button.js",
    icon: "statics/svg/ButtonComponent.svg",
  },
  {
    id: 3,
    title: "键盘模块",
    description: "根据显示的符号确定列后，返回正确的点击顺序",
    file: "keypad.js",
    icon: "statics/svg/KeypadComponent.svg",
  },
  {
    id: 4,
    title: "四色方块",
    description: "根据闪烁的颜色序列按正确顺序按下按钮",
    file: "simonSays.js",
    icon: "statics/svg/SimonComponent.svg",
  },
  {
    id: 5,
    title: "他叫什么？",
    description: "分两步读取标签",
    file: "whosFirst.js",
    icon: "statics/svg/WhosOnFirstComponent.svg",
  },
  {
    id: 6,
    title: "记忆模块",
    description: "记住数字位置并按顺序按下",
    file: "memory.js",
    icon: "statics/svg/MemoryComponent.svg",
  },
  {
    id: 7,
    title: "摩斯电码",
    description: "根据闪烁频率翻译摩斯电码",
    file: "morsCode.js",
    icon: "statics/svg/MorseCodeComponent.svg",
  },
  {
    id: 8,
    title: "复杂线路",
    description: "根据线路颜色和LED状态多次判断是否剪线",
    file: "complicatedWires.js",
    icon: "statics/svg/VennWireComponent.svg",
  },
  {
    id: 9,
    title: "顺序线路",
    description: "根据颜色序列按正确顺序剪线",
    file: "wireSequences.js",
    icon: "statics/svg/WireSequenceComponent.svg",
  },
  {
    id: 10,
    title: "迷宫",
    description: "先根据特征点确定迷宫，然后找到起点到终点的正确路径",
    file: "maze.js",
    icon: "statics/svg/MazeComponent.svg",
  },
  {
    id: 11,
    title: "密码模块",
    description: "根据显示的字母组合输入密码",
    file: "passwords.js",
    icon: "statics/svg/PasswordComponent.svg",
  },
  {
    id: 12,
    title: "旋钮模块",
    description: "根据指示灯位置调整旋钮",
    file: "knobs.js",
    icon: "statics/svg/NeedyKnobComponent.svg",
  },
];

// 全局工具函数
const Utils = {
  // 颜色映射
  colorMap: {
    red: { name: "红", class: "wire-red" },
    blue: { name: "蓝", class: "wire-blue" },
    white: { name: "白", class: "wire-white" },
    yellow: { name: "黄", class: "wire-yellow" },
    black: { name: "黑", class: "wire-black" },
    green: { name: "绿", class: "wire-green" },
  },

  // 显示结果
  showResult: function (message, elementId = "result") {
    const resultDiv = document.getElementById(elementId);
    if (resultDiv) {
      resultDiv.innerHTML = message;
      resultDiv.style.display = "block";
    }
  },

  // 隐藏结果
  hideResult: function (elementId = "result") {
    const resultDiv = document.getElementById(elementId);
    if (resultDiv) {
      resultDiv.style.display = "none";
    }
  },

  // 创建按钮
  createButton: function (text, onClick, className = "btn") {
    const btn = document.createElement("button");
    btn.className = className;
    btn.textContent = text;
    btn.onclick = onClick;
    return btn;
  },

  // 创建输入组
  createInputGroup: function (label, inputType = "text", id = null) {
    const group = document.createElement("div");
    group.className = "input-group";

    const labelElement = document.createElement("label");
    labelElement.textContent = label;

    const input = document.createElement("input");
    input.type = inputType;
    if (id) input.id = id;

    group.appendChild(labelElement);
    group.appendChild(input);
    return group;
  },
};

// 初始化页面
document.addEventListener("DOMContentLoaded", function () {
  renderGameGrid();
});

// 渲染游戏网格
function renderGameGrid() {
  const gameGrid = document.getElementById("gameGrid");
  gameGrid.innerHTML = "";

  gameModules.forEach((module) => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.onclick = () => openGameModule(module.id);

    card.innerHTML = `
      <img src="${module.icon}" alt="${module.title}" class="module-icon" />
      <h3>${module.title}</h3>
      <p>${module.description}</p>
    `;

    gameGrid.appendChild(card);
  });
}

// 打开游戏模块
function openGameModule(moduleId) {
  document.getElementById("gameGrid").style.display = "none";
  document.getElementById("gameModule").style.display = "block";

  const module = gameModules.find((m) => m.id === moduleId);
  document.getElementById("moduleTitle").textContent = module.title;
  // 调用对应模块的初始化函数
  const moduleName = module.file.replace(".js", "");
  if (
    window[`init${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}`]
  ) {
    window[`init${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}`]();
  } else {
    console.error(
      `init${
        moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
      } 初始化失败`
    );
  }
}

// 显示主菜单
function showMainMenu() {
  document.getElementById("gameGrid").style.display = "grid";
  document.getElementById("gameModule").style.display = "none";
  // 清理模块内容
  document.getElementById("moduleContent").innerHTML = "";
}
