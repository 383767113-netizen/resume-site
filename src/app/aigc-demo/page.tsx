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

function FoodCardMockup({ input, generated }: { input: RestaurantInput; generated: ReturnType<typeof generateContent> }) {
  const palettes: Record<string, { bg: string; accent: string; accent2: string; text: string; card: string; border: string; dark: string }> = {
    warm:  { bg: "#fdf6ee", accent: "#c94b1f", accent2: "#e8864a", text: "#4a2c1a", card: "#fffaf4", border: "#e8d0b0", dark: "#7a3a18" },
    modern:{ bg: "#f8f8f8", accent: "#2c2c2c", accent2: "#666", text: "#1a1a1a", card: "#fff", border: "#ddd", dark: "#111" },
    fresh: { bg: "#f4faf6", accent: "#3d8b5e", accent2: "#6db88a", text: "#1e3a28", card: "#fafdf8", border: "#c8e0c8", dark: "#2a5a38" },
  };
  const c = palettes[input.style] || palettes.warm;

  return (
    <div className="space-y-6">
      {/* === 大众点评店铺首页模拟 === */}
      <Card className="overflow-hidden border-border/60 shadow-sm">
        <div className="text-xs text-muted-foreground/70 px-4 py-2.5 bg-muted/50 border-b border-border/20 flex items-center gap-2">
          <Monitor className="h-3 w-3" /> 店铺首页效果预览 — 大众点评风格
        </div>
        <div className="p-4 sm:p-5 space-y-4" style={{ backgroundColor: c.bg }}>

          {/* 店招头图 */}
          <div className="w-full h-44 sm:h-52 rounded-xl relative overflow-hidden shadow-inner"
            style={{ background: `linear-gradient(160deg, ${c.accent}dd 0%, ${c.dark} 45%, ${c.accent2}88 60%, ${c.bg} 100%)` }}>
            <div className="absolute inset-0 opacity-20"
              style={{ background: `radial-gradient(ellipse 80% 60% at 35% 30%, ${c.accent2}44 0%, transparent 70%), radial-gradient(circle 40% at 70% 65%, ${c.accent}66 0%, transparent 70%)` }} />
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6"
              style={{ background: `linear-gradient(transparent 40%, ${c.dark}cc 85%, ${c.dark}ee 100%)` }}>
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

          {/* 菜品卡片网格 */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {[
              { name: input.dish, price: "¥68", cuisine: input.cuisine },
              { name: input.cuisine === "川菜" ? "麻婆豆腐" : input.cuisine === "粤菜" ? "豉汁凤爪" : input.cuisine === "日料" ? "炙烤鳗鱼" : "鲜切肥牛", price: input.cuisine === "川菜" ? "¥38" : input.cuisine === "粤菜" ? "¥42" : input.cuisine === "日料" ? "¥88" : "¥58", cuisine: input.cuisine },
              { name: input.cuisine === "川菜" ? "夫妻肺片" : input.cuisine === "粤菜" ? "蜜汁叉烧" : input.cuisine === "日料" ? "天妇罗盛合" : "手工虾滑", price: input.cuisine === "川菜" ? "¥48" : input.cuisine === "粤菜" ? "¥36" : input.cuisine === "日料" ? "¥68" : "¥42", cuisine: input.cuisine },
            ].map((dish, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}>
                <DishPhoto cuisine={dish.cuisine} dish={dish.name} index={i} palette={c} />
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

      {/* === 手机海报模拟 === */}
      <Card className="overflow-hidden border-border/60 shadow-sm">
        <div className="text-xs text-muted-foreground/70 px-4 py-2.5 bg-muted/50 border-b border-border/20 flex items-center gap-2">
          <Phone className="h-3 w-3" /> 活动海报效果预览 — 1080×1920 竖版
        </div>
        <div className="flex justify-center p-6" style={{ backgroundColor: c.bg }}>
          <div className="w-[200px] h-[356px] rounded-2xl relative overflow-hidden shadow-xl"
            style={{ border: `3px solid ${c.border}` }}>
            {/* Poster food photo area */}
            <div className="absolute inset-0" style={{ background: `linear-gradient(170deg, ${c.accent2}33 0%, ${c.dark} 55%, ${c.accent} 85%, ${c.dark} 100%)` }}>
              <div className="absolute inset-0 opacity-30"
                style={{ background: `radial-gradient(circle 50% at 40% 35%, ${c.accent2}88 0%, transparent 70%), radial-gradient(circle 30% at 65% 55%, white 0%, transparent 60%), radial-gradient(circle 25% at 30% 70%, ${c.accent}aa 0%, transparent 60%)` }} />
              {/* Dish silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <PosterDish cuisine={input.cuisine} dish={input.dish} palette={c} />
              </div>
            </div>
            {/* Text overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 space-y-1.5"
              style={{ background: `linear-gradient(transparent 0%, ${c.dark}dd 25%, ${c.dark} 100%)` }}>
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

function DishPhoto({ cuisine, dish, index, palette: c }: { cuisine: string; dish: string; index: number; palette: Record<string, string> }) {
  return (
    <div className="h-24 sm:h-28 relative overflow-hidden" style={{
      background: cuisine === "川菜" ? `linear-gradient(150deg, #7a1a0e 0%, #b8351e 15%, #d45328 30%, #c94b1f 55%, #8b1a0a 100%)` :
                 cuisine === "粤菜" ? `linear-gradient(150deg, #e8e0d0 0%, #f5f0e8 20%, #fff8f0 50%, #e8d8c0 100%)` :
                 cuisine === "日料" ? `linear-gradient(150deg, #1a1a2e 0%, #2d2d44 30%, #1a1a2e 60%, #0d0d1a 100%)` :
                 `linear-gradient(150deg, #6b1a0a 0%, #9b2d1a 20%, #c94b1f 40%, #7a1a0e 100%)`
    }}>
      {/* Lighting effect */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse 60% 50% at ${index === 0 ? '45%' : index === 1 ? '40%' : '50%'} ${index === 0 ? '30%' : index === 1 ? '45%' : '35%'}, ${c.accent2}55 0%, transparent 60%)`
      }} />

      {cuisine === "川菜" ? <SichuanDish dish={dish} index={index} /> :
       cuisine === "粤菜" ? <CantoneseDish dish={dish} index={index} /> :
       cuisine === "日料" ? <JapaneseDish dish={dish} index={index} /> :
       <HotpotDish dish={dish} index={index} />}

      {/* Vignette */}
      <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 40px 10px rgba(0,0,0,0.25)` }} />
    </div>
  );
}

function SichuanDish({ dish, index }: { dish: string; index: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Bowl */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[85%] h-[60%] rounded-[50%]"
        style={{ background: "linear-gradient(180deg, #fafaf5 0%, #e8e0d5 40%, #d8d0c0 100%)", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }} />
      {/* Chili oil broth */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[78%] h-[45%] rounded-[45%]"
        style={{ background: "linear-gradient(180deg, #c0392b 0%, #8b1a1a 40%, #6b1010 80%)", boxShadow: "inset 0 2px 8px rgba(255,180,100,0.3)" }} />
      {/* Oil sheen */}
      <div className="absolute bottom-3 left-[22%] w-[30%] h-[12%] rounded-full opacity-40"
        style={{ background: "radial-gradient(ellipse, #ff9944 0%, transparent 70%)" }} />
      {/* Beef slices */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="absolute"
          style={{
            bottom: `${15 + i * 6}%`,
            left: `${20 + i * 15}%`,
            width: `${18 + i * 3}%`,
            height: "14%",
            borderRadius: "40% 60% 50% 50%",
            background: `linear-gradient(${150 + i * 20}deg, #c8956c 0%, #a0714d 40%, #8b5e3c 100%)`,
            boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)",
            transform: `rotate(${-10 + i * 8}deg)`,
          }} />
      ))}
      {/* Chili peppers */}
      {[0, 1, 2].map((i) => (
        <div key={`cp${i}`} className="absolute w-[8%] h-[6%] rounded-full"
          style={{
            bottom: `${22 + i * 8}%`, left: `${25 + i * 20}%`,
            background: "#cc2222",
            boxShadow: "0 1px 2px rgba(0,0,0,0.4)"
          }} />
      ))}
      {/* Scallions */}
      {[0, 1, 2, 3].map((i) => (
        <div key={`sc${i}`} className="absolute w-[3%] h-[10%] rounded-full rotate-45"
          style={{
            bottom: `${20 + i * 5}%`, left: `${30 + i * 15}%`,
            background: "linear-gradient(180deg, #4a8c3f 0%, #2d5a1e 100%)",
            transform: `rotate(${20 + i * 30}deg)`,
          }} />
      ))}
      {/* Sichuan peppercorns */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={`pp${i}`} className="absolute w-[3%] h-[3%] rounded-full"
          style={{ bottom: `${15 + i * 7}%`, left: `${28 + i * 12}%`, background: "#552200", boxShadow: "0 0 1px rgba(0,0,0,0.5)" }} />
      ))}
    </div>
  );
}

function CantoneseDish({ dish, index }: { dish: string; index: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Bamboo steamer */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-[18%] rounded-full"
        style={{ background: "linear-gradient(180deg, #d4b896 0%, #b8956e 50%, #8b6b4a 100%)", boxShadow: "0 3px 10px rgba(0,0,0,0.25)" }} />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[64%] h-[14%] rounded-full"
        style={{ background: "linear-gradient(180deg, #e8d8c0 0%, #d4c4a8 100%)" }} />
      {/* Shrimp dumplings */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute flex flex-col items-center"
          style={{ bottom: `${12 + i * 2}%`, left: `${22 + i * 20}%` }}>
          {/* Dumpling body */}
          <div className="w-[28px] h-[20px] rounded-[60%] relative"
            style={{ background: "linear-gradient(180deg, rgba(255,250,245,0.9) 0%, rgba(240,230,220,0.85) 50%, rgba(220,200,185,0.8) 100%)", boxShadow: "0 2px 6px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.5)" }}>
            {/* Shrimp filling visible through */}
            <div className="absolute inset-[30%] rounded-full opacity-50"
              style={{ background: "linear-gradient(180deg, #f0a080 0%, #d87060 100%)" }} />
            {/* Pleats */}
            {[0, 1, 2].map((p) => (
              <div key={p} className="absolute top-0 w-[18%] h-[60%] rounded-full opacity-30"
                style={{ left: `${25 + p * 25}%`, background: "white", boxShadow: "0 0 2px rgba(0,0,0,0.1)" }} />
            ))}
          </div>
        </div>
      ))}
      {/* Steamer rim */}
      <div className="absolute bottom-1 left-[10%] right-[10%] h-[5%] rounded-full"
        style={{ background: "linear-gradient(90deg, #a08060, #c8a880, #a08060)" }} />
    </div>
  );
}

function JapaneseDish({ dish, index }: { dish: string; index: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Slate plate */}
      <div className="absolute w-[80%] h-[65%] rounded-lg"
        style={{ background: "linear-gradient(135deg, #3a3a4a 0%, #2a2a38 30%, #1a1a28 60%, #252535 100%)", boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" }} />
      {/* Texture lines on plate */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute h-[1px] opacity-20" style={{
          top: `${30 + i * 12}%`, left: "15%", width: `${60 + i * 5}%`,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
        }} />
      ))}
      {/* Salmon sashimi */}
      <div className="absolute left-[22%] top-[30%] w-[32%] h-[14%] rounded-[35%] rotate-[-8deg]"
        style={{ background: "linear-gradient(135deg, #ff9966 0%, #fa8072 30%, #ff7744 60%, #e06040 100%)", boxShadow: "0 2px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)" }}>
        {/* Fat marbling */}
        {[0, 1, 2].map((i) => (
          <div key={i} className="absolute h-[30%] w-[80%] rounded-full opacity-40"
            style={{ top: `${10 + i * 28}%`, left: "10%", background: "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,200,150,0.3))" }} />
        ))}
      </div>
      {/* Tuna sashimi */}
      <div className="absolute right-[22%] top-[28%] w-[28%] h-[16%] rounded-[35%] rotate-[5deg]"
        style={{ background: "linear-gradient(135deg, #cc3333 0%, #aa2020 40%, #881818 100%)", boxShadow: "0 2px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.15)" }} />
      {/* White fish */}
      <div className="absolute left-[35%] top-[50%] w-[25%] h-[12%] rounded-[40%] rotate-[-3deg]"
        style={{ background: "linear-gradient(135deg, #fafafa 0%, #f0e8e0 30%, #e8ddd5 100%)", boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.5)" }} />
      {/* Wasabi */}
      <div className="absolute right-[24%] top-[52%] w-[10%] h-[10%] rounded-full"
        style={{ background: "radial-gradient(circle at 40% 40%, #a8d8a0 0%, #6aaa50 60%, #4a8030 100%)", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />
      {/* Chopsticks */}
      <div className="absolute bottom-[8%] right-[18%] w-[45%] h-[2%] rounded-full"
        style={{ background: "linear-gradient(90deg, #6b4a30, #8b6b4a, #6b4a30)", boxShadow: "0 1px 2px rgba(0,0,0,0.3)", transform: "rotate(-2deg)" }} />
    </div>
  );
}

function HotpotDish({ dish, index }: { dish: string; index: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Copper pot body */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-[55%] rounded-[45%]"
        style={{ background: "linear-gradient(180deg, #c8964a 0%, #a07030 30%, #7a5020 70%, #5a3810 100%)", boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,220,150,0.3)" }} />
      {/* Pot rim */}
      <div className="absolute bottom-[48%] left-1/2 -translate-x-1/2 w-[78%] h-[12%] rounded-full"
        style={{ background: "linear-gradient(180deg, #e8c870, #b89040)", boxShadow: "0 2px 6px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,200,0.4)" }} />
      {/* Broth */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[72%] h-[38%] rounded-[42%]"
        style={{ background: "linear-gradient(180deg, #d44530 0%, #b02020 35%, #8b1515 70%, #6b0a0a 100%)", boxShadow: "inset 0 2px 8px rgba(255,180,100,0.25)" }} />
      {/* Chili oil ring */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[68%] h-[32%] rounded-[40%] border-2 opacity-40"
        style={{ borderColor: "#ff6633", borderRadius: "40%" }} />
      {/* Steam wisps */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="absolute w-[8%] h-[20%] rounded-full opacity-20"
          style={{
            bottom: `${50 + i * 3}%`, left: `${25 + i * 20}%`,
            background: `linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)`,
            transform: `rotate(${-15 + i * 10}deg) scaleX(${0.4 + i * 0.3})`,
          }} />
      ))}
      {/* Ingredients floating */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="absolute rounded-full"
          style={{
            bottom: `${6 + i * 8}%`, left: `${22 + i * 15}%`,
            width: `${5 + i * 2}%`, height: `${4 + i * 1}%`,
            background: i % 2 === 0 ? "#c87050" : "#e8a870",
            boxShadow: "0 1px 2px rgba(0,0,0,0.3)"
          }} />
      ))}
      {/* Sichuan peppercorns */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="absolute w-[2.5%] h-[2.5%] rounded-full"
          style={{ bottom: `${8 + i * 5}%`, left: `${20 + i * 12}%`, background: "#441100", opacity: 0.7 }} />
      ))}
    </div>
  );
}

function PosterDish({ cuisine, dish, palette: c }: { cuisine: string; dish: string; palette: Record<string, string> }) {
  return (
    <div className="w-full h-full relative">
      {cuisine === "川菜" ? (
        <>
          {/* Large serving bowl from above */}
          <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[75%] h-[40%] rounded-[45%]"
            style={{ background: "linear-gradient(180deg, #f5f0e8 0%, #e0d8cc 40%, #d0c8b8 100%)", boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }} />
          <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[68%] h-[32%] rounded-[40%]"
            style={{ background: "linear-gradient(180deg, #c9402a 0%, #9b1a1a 40%, #7a1010 80%)", boxShadow: "inset 0 3px 10px rgba(255,160,80,0.4)" }} />
          {/* Beef slices */}
          {[0,1,2,3,4,5].map((i) => (
            <div key={i} className="absolute rounded-[40%]"
              style={{
                top: `${32 + i * 4}%`, left: `${22 + (i % 3) * 18}%`,
                width: `${14 + i * 2}%`, height: "10%",
                background: `linear-gradient(${160 + i * 15}deg, #c89870, #9a6a48)`,
                boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                transform: `rotate(${-8 + i * 6}deg)`,
              }} />
          ))}
          {/* Oil shimmer */}
          <div className="absolute top-[30%] left-[28%] w-[20%] h-[8%] rounded-full opacity-30"
            style={{ background: "radial-gradient(ellipse, #ffaa44, transparent)" }} />
        </>
      ) : cuisine === "粤菜" ? (
        <>
          {/* Bamboo steamer with dumplings */}
          <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[65%] h-[35%] rounded-full"
            style={{ background: "linear-gradient(180deg, #d8c0a0, #b89570)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }} />
          {[0,1,2,3].map((i) => (
            <div key={i} className="absolute"
              style={{ top: `${32 + (i % 2) * 8}%`, left: `${24 + i * 14}%` }}>
              <div className="w-[30px] h-[22px] rounded-[55%] relative"
                style={{ background: "linear-gradient(180deg, rgba(255,250,245,0.9), rgba(235,225,210,0.85))", boxShadow: "0 2px 8px rgba(0,0,0,0.25), inset 0 3px 5px rgba(255,255,255,0.5)" }}>
                <div className="absolute inset-[28%] rounded-full opacity-40"
                  style={{ background: "linear-gradient(180deg, #f0a080, #d87060)" }} />
              </div>
            </div>
          ))}
        </>
      ) : cuisine === "日料" ? (
        <>
          {/* Dark slate plate */}
          <div className="absolute top-[20%] left-[10%] w-[80%] h-[55%] rounded-xl"
            style={{ background: "linear-gradient(140deg, #3a3a4a, #222238, #1a1a2e)", boxShadow: "0 6px 25px rgba(0,0,0,0.5)" }} />
          {/* Salmon */}
          <div className="absolute top-[28%] left-[18%] w-[22%] h-[12%] rounded-[35%] rotate-[-5deg]"
            style={{ background: "linear-gradient(135deg, #ff9966, #fa7060, #e05540)", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" }} />
          {/* Tuna */}
          <div className="absolute top-[26%] right-[20%] w-[20%] h-[14%] rounded-[35%] rotate-[4deg]"
            style={{ background: "linear-gradient(135deg, #c83535, #991818)", boxShadow: "0 2px 6px rgba(0,0,0,0.4)" }} />
          {/* Shiso leaf accent */}
          <div className="absolute top-[38%] left-[35%] w-[10%] h-[8%] rounded-[50%] rotate-[15deg] opacity-70"
            style={{ background: "linear-gradient(135deg, #5a9a40, #3a7020)" }} />
          {/* Gold flakes hint */}
          {[0,1,2].map((i) => (
            <div key={i} className="absolute w-[3%] h-[1%] rounded-full"
              style={{ top: `${42 + i * 3}%`, left: `${30 + i * 15}%`, background: "#d4a840", opacity: 0.5 }} />
          ))}
        </>
      ) : (
        <>
          {/* Copper hotpot */}
          <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[70%] h-[50%] rounded-[45%]"
            style={{ background: "linear-gradient(180deg, #d4a450, #a07030, #7a5020)", boxShadow: "0 6px 30px rgba(0,0,0,0.4)" }} />
          <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[62%] h-[38%] rounded-[40%]"
            style={{ background: "linear-gradient(180deg, #d44530, #a02020, #7a1010)", boxShadow: "inset 0 3px 10px rgba(255,160,80,0.3)" }} />
          {/* Steam */}
          {[0,1,2,3].map((i) => (
            <div key={i} className="absolute rounded-full opacity-15"
              style={{
                top: `${10 + i * 5}%`, left: `${25 + i * 15}%`,
                width: `${10 + i * 3}%`, height: `${15 + i * 2}%`,
                background: "radial-gradient(ellipse, white, transparent)"
              }} />
          ))}
        </>
      )}
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
