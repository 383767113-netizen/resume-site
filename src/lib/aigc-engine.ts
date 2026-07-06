// AIGC content generation engine
// Simulates the pipeline described in the resume: 需求翻译 → 风格对齐 → 提示词生成 → 效果输出

export interface RestaurantInput {
  name: string;
  cuisine: string;
  dish: string;
  style: string;
  useCase: string;
  tone: string;
}

interface GeneratedContent {
  specs: string[];
  prompts: {
    dish: string;
    header: string;
    poster: string;
  };
  copy: string[];
  layout: {
    title: string;
    subtitle: string;
    highlights: string[];
  };
}

const STYLE_PRESETS: Record<string, { colors: string[]; mood: string; lighting: string; composition: string }> = {
  warm: {
    colors: ["暖橙", "深棕", "米白"],
    mood: "温馨家常，如母亲厨房般亲切",
    lighting: "暖黄侧光，营造傍晚用餐氛围",
    composition: "中式摆盘，食材居中，四周留白",
  },
  modern: {
    colors: ["深灰", "纯白", "金色"],
    mood: "现代精致，高端餐饮品质感",
    lighting: "柔和顶光+侧逆光，突出立体感",
    composition: "不对称构图，食材占据画面 2/3，1/3 留白",
  },
  fresh: {
    colors: ["浅绿", "纯白", "柠檬黄"],
    mood: "清新自然，健康轻食感",
    lighting: "明亮自然光，模拟午后窗边拍摄",
    composition: "散点构图，食材与配料自然分布",
  },
};

const CUISINE_PRESETS: Record<string, { keywords: string[]; plating: string; challenge: string }> = {
  "川菜": {
    keywords: ["红油光泽", "花椒颗粒", "辣椒段", "芝麻装饰"],
    plating: "中式圆盘，食材堆叠有层次感",
    challenge: "红油反光控制与食材纹理还原",
  },
  "粤菜": {
    keywords: ["清透汤汁", "食材原色", "精致摆盘", "蒸制光泽"],
    plating: "白瓷盘，食材自然舒展，清雅留白",
    challenge: "清淡菜品的质感表达，避免寡淡",
  },
  "日料": {
    keywords: ["木质纹理", "食材新鲜感", "极简构图", "芥末点缀"],
    plating: "木质/深色食器，单件食材特写",
    challenge: "生食质感还原与色彩饱和度控制",
  },
  "火锅": {
    keywords: ["沸腾汤底", "蒸汽效果", "食材丰富", "蘸料色彩"],
    plating: "铜锅/九宫格，俯拍食材全貌",
    challenge: "蒸汽带来的画面模糊与色彩溢出",
  },
};

export function generateContent(input: RestaurantInput): GeneratedContent {
  const stylePreset = STYLE_PRESETS[input.style] || STYLE_PRESETS.warm;
  const cuisinePreset = CUISINE_PRESETS[input.cuisine] || CUISINE_PRESETS["川菜"];

  const specs = [
    `品类：${input.cuisine} — ${cuisinePreset.keywords.join("、")}`,
    `色调：${stylePreset.colors.join(" / ")}`,
    `氛围：${stylePreset.mood}`,
    `打光：${stylePreset.lighting}`,
    `构图：${stylePreset.composition}`,
    `器皿与摆盘：${cuisinePreset.plating}`,
    `技术难点：${cuisinePreset.challenge}`,
  ];

  const dishPrompt = `[基础食材层]
主体：一份${input.cuisine}的${input.dish}，${cuisinePreset.plating}
食材细节：${cuisinePreset.keywords.join("、")}
装盘：${cuisinePreset.plating}

[风格调性层]
色调：${stylePreset.colors.join(" / ")}色系
氛围：${stylePreset.mood}
光线：${stylePreset.lighting}
风格：${input.tone}

[技术参数层]
构图：${stylePreset.composition}
画质：超高清，食物摄影级锐度
景深：浅景深，背景适度虚化
画面比例：4:3，适配大众点评头图尺寸
重点：${cuisinePreset.challenge}，请优先保证`;

  const headerPrompt = `[店铺头图提示词]
${input.name}，一家${input.tone}的${input.cuisine}餐厅
整体氛围：${stylePreset.mood}
色彩基调：${stylePreset.colors.join("、")}
画面元素：招牌菜品${input.dish}、店内环境一角、柔和光效
构图：横幅 16:9，左侧菜品特写，右侧留白用于店铺名称
风格：${input.tone}，适合大众点评店铺首页
画质：商业摄影级`;

  const posterPrompt = `[活动海报提示词]
主题：${input.name} × 新品推荐
主视觉：${input.dish}特写，${stylePreset.composition}
色调：${stylePreset.colors[0]}渐变背景
文案区域：画面底部 30% 半透明遮罩
风格：${input.tone}
文字元素：「新品上市」「${input.dish}」「限时尝鲜」
尺寸：1080×1920 竖版海报`;

  const copy = [
    `【${input.name}】${input.tone}的${input.cuisine}之选`,
    `招牌${input.dish}——${stylePreset.mood}，每一口都是地道风味`,
    `严选食材 · 匠心烹饪 · ${cuisinePreset.keywords.slice(0, 2).join(" · ")}`,
    `📍大众点评搜索「${input.name}」，新品限时尝鲜`,
  ];

  return {
    specs,
    prompts: {
      dish: dishPrompt,
      header: headerPrompt,
      poster: posterPrompt,
    },
    copy,
    layout: {
      title: `${input.name}`,
      subtitle: `${input.tone} · ${input.cuisine}`,
      highlights: [
        `招牌 ${input.dish}`,
        `${stylePreset.mood.split("，")[0]}`,
        cuisinePreset.keywords.slice(0, 2).join(" · "),
      ],
    },
  };
}
