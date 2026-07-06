"use client";

import { useState, useMemo } from "react";
import { ChevronRight, Sparkles, Copy, Check, Image, FileText, Palette, ClipboardCheck, Lightbulb, RefreshCw, Phone, Monitor } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  generateContent,
  type RestaurantInput,
} from "@/lib/aigc-engine";

const DEFAULT_INPUT: RestaurantInput = {
  name: "蜀味轩",
  cuisine: "川菜",
  dish: "水煮牛肉",
  style: "warm",
  useCase: "大众点评店铺装修",
  tone: "地道成都味 · 三代传承",
};

const FOOD_PHOTOS: Record<string, string[]> = {
  "川菜": [
    "EMRcqDxu62Q",  // spicy fish stew
    "OuysQe-b72Q",  // Sichuan noodles
    "nrG5JaMvBEo",  // table full of Chinese dishes
    "s4AK2hyNFto",  // plates with chopsticks
  ],
  "粤菜": [
    "GZe_M6TUJ_k",  // dumplings on steamer
    "WeebpKNxjcs",  // bamboo steamer dim sum
    "BhEMuCDfL1I",  // steamed buns
    "KD-IwZ1yFn8",  // bamboo steamers
  ],
  "日料": [
    "V3sVKceiV74",  // sushi plate on wood
    "uf8iZBDnhtk",  // Japanese cuisine closeup
    "WMjCjmkGL2k",  // sushi box
    "Hcdx1zVQJ6Y",  // tuna on black plate
  ],
  "火锅": [
    "EMRcqDxu62Q",  // spicy stew (close match)
    "nrG5JaMvBEo",  // Chinese food table
    "OuysQe-b72Q",  // Sichuan noodles
    "s4AK2hyNFto",  // plates with chopsticks
  ],
};

function unsplashUrl(photoId: string, w = 800, h?: number): string {
  const base = `https://images.unsplash.com/photo-${photoId}?w=${w}&fit=crop&auto=format`;
  return h ? `${base}&h=${h}` : base;
}

function FoodCardMockup({ input, generated }: { input: RestaurantInput; generated: ReturnType<typeof generateContent> }) {
  const photos = FOOD_PHOTOS[input.cuisine] || FOOD_PHOTOS["川菜"];
  const palettes: Record<string, { bg: string; accent: string; text: string; card: string; border: string; dark: string }> = {
    warm:  { bg: "#fdf6ee", accent: "#c94b1f", text: "#4a2c1a", card: "#fffaf4", border: "#e8d0b0", dark: "#7a3a18" },
    modern:{ bg: "#f8f8f8", accent: "#2c2c2c", text: "#1a1a1a", card: "#fff", border: "#ddd", dark: "#111" },
    fresh: { bg: "#f4faf6", accent: "#3d8b5e", text: "#1e3a28", card: "#fafdf8", border: "#c8e0c8", dark: "#2a5a38" },
  };
  const c = palettes[input.style] || palettes.warm;

  const dishes = [
    { name: input.dish, price: "¥68" },
    { name: input.cuisine === "川菜" ? "麻婆豆腐" : input.cuisine === "粤菜" ? "豉汁凤爪" : input.cuisine === "日料" ? "炙烤鳗鱼" : "鲜切肥牛", price: input.cuisine === "川菜" ? "¥38" : input.cuisine === "粤菜" ? "¥42" : input.cuisine === "日料" ? "¥88" : "¥58" },
    { name: input.cuisine === "川菜" ? "夫妻肺片" : input.cuisine === "粤菜" ? "蜜汁叉烧" : input.cuisine === "日料" ? "天妇罗盛合" : "手工虾滑", price: input.cuisine === "川菜" ? "¥48" : input.cuisine === "粤菜" ? "¥36" : input.cuisine === "日料" ? "¥68" : "¥42" },
  ];

  return (
    <div className="space-y-6">
      {/* === 大众点评店铺首页模拟 === */}
      <Card className="overflow-hidden border-border/60 shadow-sm">
        <div className="text-xs text-muted-foreground/70 px-4 py-2.5 bg-muted/50 border-b border-border/20 flex items-center gap-2">
          <Monitor className="h-3 w-3" /> 店铺首页效果预览 — 大众点评风格
        </div>
        <div className="p-4 sm:p-5 space-y-4" style={{ backgroundColor: c.bg }}>
          {/* 店招头图 — real Unsplash photo */}
          <div className="w-full h-44 sm:h-52 rounded-xl relative overflow-hidden shadow-inner">
            <img
              src={unsplashUrl(photos[0], 1200, 400)}
              alt={`${input.name} 招牌菜`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6"
              style={{ background: `linear-gradient(transparent 30%, ${c.dark}cc 80%, ${c.dark}ee 100%)` }}>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-md">
                    {generated.layout.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 mt-0.5 drop-shadow">{generated.layout.subtitle}</p>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-white/90 text-xs bg-white/15 rounded-full px-3 py-1 backdrop-blur-sm">
                  <span className="text-yellow-300 text-sm">★</span> 4.8
                </div>
              </div>
            </div>
          </div>

          {/* 菜品卡片网格 — real photos */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {dishes.map((dish, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}>
                <div className="h-24 sm:h-28 relative overflow-hidden">
                  <img
                    src={unsplashUrl(photos[i + 1] || photos[1], 400, 280)}
                    alt={dish.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-2.5 sm:p-3">
                  <div className="text-xs sm:text-sm font-semibold truncate" style={{ color: c.text }}>{dish.name}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs sm:text-sm font-bold" style={{ color: c.accent }}>{dish.price}</span>
                    <span className="text-[10px] text-muted-foreground">月售 200+</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* === 手机海报模拟 — real photo === */}
      <Card className="overflow-hidden border-border/60 shadow-sm">
        <div className="text-xs text-muted-foreground/70 px-4 py-2.5 bg-muted/50 border-b border-border/20 flex items-center gap-2">
          <Phone className="h-3 w-3" /> 活动海报效果预览 — 1080×1920 竖版
        </div>
        <div className="flex justify-center p-6" style={{ backgroundColor: c.bg }}>
          <div className="w-[200px] h-[356px] rounded-2xl relative overflow-hidden shadow-xl"
            style={{ border: `3px solid ${c.border}` }}>
            {/* Real food photo as background */}
            <img
              src={unsplashUrl(photos[0], 400, 712)}
              alt={input.dish}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlays for text readability */}
            <div className="absolute inset-0" style={{ background: `linear-gradient(170deg, ${c.dark}44 0%, transparent 40%, ${c.dark}cc 75%, ${c.dark} 100%)` }} />
            {/* Text overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 space-y-1.5">
              <div className="text-[11px] tracking-[0.2em] text-white/70 uppercase">NEW ARRIVAL</div>
              <div className="text-xl font-bold text-white drop-shadow-lg tracking-wide">{input.dish}</div>
              <div className="text-xs text-white/80">限时尝鲜价 <span className="text-lg font-bold text-white ml-1">¥68</span></div>
              <div className="w-8 h-[1px] bg-white/30 my-1" />
              <div className="text-[10px] text-white/50 leading-relaxed">
                {generated.layout.subtitle}<br />
                大众点评搜索「{input.name}」
              </div>
            </div>
            {/* Corner badge */}
            <div className="absolute top-4 right-4 rounded-full px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-sm"
              style={{ backgroundColor: `${c.accent}cc` }}>新品</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function AIGCDemoPage() {
  const [input, setInput] = useState<RestaurantInput>(DEFAULT_INPUT);
  const [step, setStep] = useState<"input" | "result">("input");
  const [copied, setCopied] = useState<string | null>(null);

  const generated = useMemo(() => generateContent(input), [input]);

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const presets = [
    { label: "川菜 · 暖调", input: { ...DEFAULT_INPUT, name: "蜀味轩", cuisine: "川菜", dish: "水煮牛肉", style: "warm", tone: "地道成都味 · 三代传承" } },
    { label: "日料 · 极简", input: { ...DEFAULT_INPUT, name: "鮨隐", cuisine: "日料", dish: "刺身盛合", style: "modern", tone: "极致简约 · 旬之味" } },
    { label: "粤菜 · 清新", input: { ...DEFAULT_INPUT, name: "翠园小馆", cuisine: "粤菜", dish: "水晶虾饺", style: "fresh", tone: "清雅粤味 · 手工现做" } },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="mb-10">
        <Badge className="mb-4">交互式演示</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          AIGC 营销内容生成演示
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          复现简历中「线下餐饮商户 AIGC 营销内容解决方案」的完整流水线——
          输入商户信息，实时体验从需求翻译到内容产出的每个环节。
        </p>
      </div>

      {step === "input" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">商户信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quick presets */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">
                快速预设
              </Label>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <Button
                    key={p.label}
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(p.input as RestaurantInput)}
                  >
                    {p.label}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">商户名称</Label>
                <Input
                  id="name"
                  value={input.name}
                  onChange={(e) => setInput({ ...input, name: e.target.value })}
                  placeholder="如：蜀味轩"
                />
              </div>
              <div>
                <Label htmlFor="cuisine">菜系品类</Label>
                <Select
                  value={input.cuisine}
                  onValueChange={(v) => v && setInput({ ...input, cuisine: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="川菜">川菜</SelectItem>
                    <SelectItem value="粤菜">粤菜</SelectItem>
                    <SelectItem value="日料">日料</SelectItem>
                    <SelectItem value="火锅">火锅</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dish">招牌菜品</Label>
                <Input
                  id="dish"
                  value={input.dish}
                  onChange={(e) => setInput({ ...input, dish: e.target.value })}
                  placeholder="如：水煮牛肉"
                />
              </div>
              <div>
                <Label htmlFor="style">视觉风格</Label>
                <Select
                  value={input.style}
                  onValueChange={(v) => v && setInput({ ...input, style: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warm">温暖家常</SelectItem>
                    <SelectItem value="modern">现代精致</SelectItem>
                    <SelectItem value="fresh">清新自然</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="tone">品牌调性 / Slogan</Label>
                <Input
                  id="tone"
                  value={input.tone}
                  onChange={(e) => setInput({ ...input, tone: e.target.value })}
                  placeholder="如：地道成都味 · 三代传承"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setInput(DEFAULT_INPUT)}
              >
                <RefreshCw className="mr-1 h-3.5 w-3.5" />
                重置
              </Button>
              <Button onClick={() => setStep("result")} size="lg">
                <Sparkles className="mr-1.5 h-4 w-4" />
                开始生成
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setStep("input")}>
              <RefreshCw className="mr-1 h-3.5 w-3.5" />
              修改商户信息
            </Button>
            <div className="text-sm text-muted-foreground">
              正在为「{input.name}」生成内容
            </div>
          </div>

          <Tabs defaultValue="pipeline" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="pipeline" className="gap-1.5">
                <Lightbulb className="h-3.5 w-3.5" />
                需求翻译
              </TabsTrigger>
              <TabsTrigger value="prompts" className="gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                提示词
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-1.5">
                <Image className="h-3.5 w-3.5" />
                效果预览
              </TabsTrigger>
              <TabsTrigger value="copy" className="gap-1.5">
                <Palette className="h-3.5 w-3.5" />
                营销文案
              </TabsTrigger>
              <TabsTrigger value="qa" className="gap-1.5">
                <ClipboardCheck className="h-3.5 w-3.5" />
                质量校验
              </TabsTrigger>
            </TabsList>

            {/* Pipeline */}
            <TabsContent value="pipeline" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Step 1: 需求翻译</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    将 B 端客户模糊的业务需求拆解为结构化的 AIGC 生产标准
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-2">
                        原始需求（商户视角）
                      </div>
                      <Card className="border-border/50 bg-muted/30">
                        <CardContent className="py-3">
                          <p className="text-sm text-muted-foreground italic">
                            &ldquo;帮我拍点{input.cuisine}的菜品照片，要好看，放在大众点评上用的。&rdquo;
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="flex justify-center">
                      <ChevronRight className="h-6 w-6 text-muted-foreground rotate-90" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-2">
                        结构化翻译（四维生产标准）
                      </div>
                      <Card className="border-border/50">
                        <CardContent className="py-4">
                          <ul className="space-y-2">
                            {generated.specs.map((spec, i) => (
                              <li
                                key={i}
                                className="text-sm flex items-start gap-2"
                              >
                                <Badge
                                  variant="secondary"
                                  className="text-xs mt-0.5 flex-none"
                                >
                                  {i + 1}
                                </Badge>
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Prompts */}
            <TabsContent value="prompts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Step 2: 分层提示词生成
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    三层提示词结构：基础食材层 + 风格调性层 + 技术参数层
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "菜品图提示词", key: "dish" as const, icon: Image },
                    { label: "店铺头图提示词", key: "header" as const, icon: Monitor },
                    { label: "活动海报提示词", key: "poster" as const, icon: Phone },
                  ].map(({ label, key, icon: Icon }) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium flex items-center gap-1.5">
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                          {label}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          title={copied === key ? "已复制" : "复制提示词"}
                          onClick={() => handleCopy(generated.prompts[key], key)}
                        >
                          {copied === key ? (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                      <Card className="border-border/50 bg-muted/30">
                        <CardContent className="py-3">
                          <pre className="text-xs whitespace-pre-wrap font-mono text-muted-foreground leading-relaxed">
                            {generated.prompts[key]}
                          </pre>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preview */}
            <TabsContent value="preview" className="mt-6">
              <FoodCardMockup input={input} generated={generated} />
              <p className="text-xs text-muted-foreground text-center mt-4">
                以上为效果示意，实际 AIGC 产出会基于提示词调用 DeepSeek / 豆包 / 即梦等模型生成
              </p>
            </TabsContent>

            {/* Marketing Copy */}
            <TabsContent value="copy" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Step 3: 营销文案产出
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    基于品牌调性自动生成的店铺介绍与菜品描述文案
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {generated.copy.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-start justify-between gap-2 p-3 rounded-lg border border-border/50 bg-muted/30"
                      >
                        <p className="text-sm">{c}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-none"
                          onClick={() => handleCopy(c, `copy-${i}`)}
                        >
                          {copied === `copy-${i}` ? (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* QA */}
            <TabsContent value="qa" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Step 4: 质量校验标准
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    基于项目经验沉淀的质量检验规则，确保每一版产出符合交付标准
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: "食材还原度",
                        check: `核心食材（${input.dish}）是否形态准确、色泽真实`,
                        target: "合格率 ≥ 85%",
                      },
                      {
                        title: "风格一致性",
                        check: `是否符合「${input.tone}」品牌调性`,
                        target: "偏离度 ≤ 1 级",
                      },
                      {
                        title: "尺寸规范",
                        check: "图片比例、分辨率是否符合大众点评要求",
                        target: "100% 合规",
                      },
                      {
                        title: "文字可读性",
                        check: "海报文案是否清晰可辨，信息层级是否合理",
                        target: "5 米外可辨识",
                      },
                      {
                        title: "模板复用性",
                        check: "提示词是否可直接复用于同品类其他商户",
                        target: "换店名+菜品即可用",
                      },
                      {
                        title: "客户满意度",
                        check: "首轮交付是否达到验收标准",
                        target: "修改 ≤ 2 轮通过",
                      },
                    ].map((item) => (
                      <Card key={item.title} className="border-border/50">
                        <CardContent className="pt-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">
                              {item.title}
                            </h4>
                            <Badge
                              variant="secondary"
                              className="text-xs"
                            >
                              {item.target}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {item.check}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
