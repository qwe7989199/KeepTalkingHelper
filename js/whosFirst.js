function initWhosFirst() {
  // prettier-ignore
  const displayTextOptions = [
    "您的", "是", "没有", "灯", "他们的", "", "东", "当", "它们的", "一", "好", "西",
    "空", "瞪", "动", "你", "您", "你的", "她们的", "显示", "说", "没", "等", "稍等",
    "泥", "他们", "戏", "喜","(空白的)"
  ];
  // prettier-ignore
  const buttonWordOptions = [
  "准备", "一", "没", "空", "没有", "是", "什么", "就是", "左", "预备", "中间", "好", "等下", "按",
  "你", "泥", "您", "你的", "您的", "Ni", "行", "不太对", "什么？", "好了", "下一个", "稍等下", "没问题", "好像"
  ];

  const content = document.getElementById("moduleContent");
  content.innerHTML = `
        <div class="input-group">
            <label>屏幕上显示的文字:</label>
            <input type="text" id="displayText" list="displayTextList" placeholder="请输入..." />
            <datalist id="displayTextList">
                ${displayTextOptions
                  .map((word) => `<option value="${word}">`)
                  .join("\n")}
            </datalist>
        </div>
        <div class="input-group">
            <label>按钮上看到的单词:</label>
            <input type="text" id="buttonWord" list="buttonWordList" placeholder="请输入..." />
            <datalist id="buttonWordList">
                ${buttonWordOptions
                  .map((word) => `<option value="${word}">`)
                  .join("\n")}
            </datalist>
        </div>
        <button class="btn" onclick="solveWhosFirst()">解决</button>
        <div id="whosFirstResult" class="result" style="display: none;"></div>
    `;
  Utils.hideResult("whosFirstResult");
}

function solveWhosFirst() {
  const displayText = document.getElementById("displayText").value.trim();
  if (displayText == "") {
    alert("请输入合法的文字");
    return;
  }
  const buttonWord = document.getElementById("buttonWord").value.trim();

  const position = getWhosFirstPosition(displayText);
  const association = getWhosFirstAssociations(buttonWord);

  let result = position ? `请按位于【${position}】的按钮。` : "错误的词。";
  if (association.length > 0) {
    result += `<br>接着，参考以下相关词的顺序：<br>${association.join(" → ")}`;
  } else {
    result += "<br>未找到相关词。";
  }

  Utils.showResult(result, "whosFirstResult");
}

function getWhosFirstPosition(text) {
  if (text === "您的") return "左上";
  if (["是", "没有", "灯", "他们的"].includes(text)) return "左中";
  if (["", "东", "当", "它们的", "(空白的)"].includes(text)) return "左下";
  if (["一", "好", "西"].includes(text)) return "右上";
  if (["空", "瞪", "动", "你", "您", "你的", "她们的"].includes(text))
    return "右中";
  if (
    ["显示", "说", "没", "等", "稍等", "泥", "他们", "戏", "喜"].includes(text)
  )
    return "右下";
  return null;
}

function getWhosFirstAssociations(word) {
  const associations = {
    准备: [
      "是",
      "好",
      "什么",
      "中间",
      "左",
      "按",
      "预备",
      "空",
      "准备",
      "没",
      "一",
      "就是",
      "没有",
      "等下",
    ],
    一: [
      "左",
      "好",
      "是",
      "中间",
      "没",
      "预备",
      "没有",
      "就是",
      "等下",
      "准备",
      "空",
      "什么",
      "按",
      "一",
    ],
    没: [
      "空",
      "就是",
      "等下",
      "一",
      "什么",
      "准备",
      "预备",
      "是",
      "没有",
      "左",
      "按",
      "好",
      "没",
      "中间",
    ],
    空: [
      "等下",
      "预备",
      "好",
      "中间",
      "空",
      "按",
      "准备",
      "没有",
      "没",
      "什么",
      "左",
      "就是",
      "是",
      "一",
    ],
    没有: [
      "就是",
      "预备",
      "好",
      "中间",
      "是",
      "空",
      "没",
      "按",
      "左",
      "什么",
      "等下",
      "一",
      "没有",
      "准备",
    ],
    是: [
      "好",
      "预备",
      "就是",
      "中间",
      "一",
      "什么",
      "按",
      "准备",
      "没有",
      "是",
      "左",
      "空",
      "没",
      "等下",
    ],
    什么: [
      "就是",
      "什么",
      "左",
      "没有",
      "准备",
      "空",
      "中间",
      "没",
      "好",
      "一",
      "等下",
      "是",
      "按",
      "预备",
    ],
    就是: [
      "准备",
      "没有",
      "左",
      "什么",
      "好",
      "是",
      "预备",
      "没",
      "按",
      "空",
      "就是",
      "中间",
      "等下",
      "一",
    ],
    左: [
      "预备",
      "左",
      "一",
      "没",
      "中间",
      "是",
      "空",
      "什么",
      "就是",
      "等下",
      "按",
      "准备",
      "好",
      "没有",
    ],
    预备: [
      "是",
      "没有",
      "准备",
      "按",
      "没",
      "等下",
      "什么",
      "预备",
      "中间",
      "左",
      "就是",
      "空",
      "好",
      "一",
    ],
    中间: [
      "空",
      "准备",
      "好",
      "什么",
      "没有",
      "按",
      "没",
      "等下",
      "左",
      "中间",
      "预备",
      "一",
      "就是",
      "是",
    ],
    好: [
      "中间",
      "没",
      "一",
      "是",
      "就是",
      "没有",
      "等下",
      "好",
      "左",
      "准备",
      "空",
      "按",
      "什么",
      "预备",
    ],
    等下: [
      "就是",
      "没",
      "空",
      "好",
      "是",
      "左",
      "一",
      "按",
      "什么",
      "等下",
      "没有",
      "准备",
      "预备",
      "中间",
    ],
    按: [
      "预备",
      "中间",
      "是",
      "准备",
      "按",
      "好",
      "没有",
      "就是",
      "空",
      "左",
      "一",
      "什么",
      "没",
      "等下",
    ],

    你: [
      "没问题",
      "泥",
      "您",
      "你的",
      "下一个",
      "行",
      "您的",
      "稍等下",
      "什么？",
      "你",
      "不太对",
      "好像",
      "好了",
      "Ni",
    ],
    泥: [
      "您",
      "下一个",
      "好像",
      "行",
      "什么？",
      "好了",
      "不太对",
      "稍等下",
      "你",
      "Ni",
      "你的",
      "没问题",
      "您的",
      "泥",
    ],
    您: [
      "不太对",
      "泥",
      "行",
      "您",
      "下一个",
      "您的",
      "没问题",
      "Ni",
      "你的",
      "你",
      "什么？",
      "稍等下",
      "好像",
      "好了",
    ],
    你的: [
      "你",
      "你的",
      "您的",
      "下一个",
      "不太对",
      "泥",
      "Ni",
      "您",
      "什么？",
      "行",
      "没问题",
      "好了",
      "好像",
      "稍等下",
    ],
    您的: [
      "好了",
      "Ni",
      "您的",
      "行",
      "什么？",
      "没问题",
      "您",
      "稍等下",
      "你的",
      "好像",
      "下一个",
      "不太对",
      "泥",
      "你",
    ],
    Ni: [
      "行",
      "没问题",
      "下一个",
      "什么？",
      "你的",
      "您的",
      "不太对",
      "好了",
      "Ni",
      "你",
      "好像",
      "稍等下",
      "泥",
      "您",
    ],
    行: [
      "行",
      "您",
      "泥",
      "你",
      "好了",
      "稍等下",
      "不太对",
      "下一个",
      "没问题",
      "好像",
      "你的",
      "您的",
      "Ni",
      "什么？",
    ],
    不太对: [
      "您的",
      "Ni",
      "泥",
      "你的",
      "下一个",
      "不太对",
      "好了",
      "你",
      "行",
      "好像",
      "您",
      "没问题",
      "稍等下",
      "什么？",
    ],
    "什么？": [
      "你",
      "稍等下",
      "你的",
      "您",
      "Ni",
      "好了",
      "不太对",
      "好像",
      "泥",
      "行",
      "您的",
      "下一个",
      "什么？",
      "没问题",
    ],
    好了: [
      "没问题",
      "行",
      "下一个",
      "什么？",
      "您",
      "您的",
      "你的",
      "稍等下",
      "好像",
      "你",
      "Ni",
      "泥",
      "不太对",
      "好了",
    ],
    下一个: [
      "什么？",
      "行",
      "不太对",
      "您",
      "稍等下",
      "没问题",
      "下一个",
      "好像",
      "好了",
      "泥",
      "您的",
      "你的",
      "Ni",
      "你",
    ],
    稍等下: [
      "泥",
      "Ni",
      "好了",
      "不太对",
      "你",
      "您的",
      "没问题",
      "什么？",
      "你的",
      "下一个",
      "稍等下",
      "行",
      "您",
      "好像",
    ],
    没问题: [
      "泥",
      "好了",
      "好像",
      "你的",
      "你",
      "稍等下",
      "行",
      "您的",
      "没问题",
      "Ni",
      "什么？",
      "下一个",
      "您",
      "不太对",
    ],
    好像: [
      "你的",
      "下一个",
      "Ni",
      "您的",
      "稍等下",
      "好了",
      "不太对",
      "什么？",
      "行",
      "你",
      "好像",
      "没问题",
      "泥",
      "您",
    ],
  };

  return associations[word] || [];
}
