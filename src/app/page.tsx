import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Layers,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SKILLS = [
  {
    icon: Brain,
    title: "需求翻译能力",
    desc: "将 B 端客户模糊的业务诉求拆解为结构化的 AIGC 生产标准与提示词方案，精准匹配模型能力边界，前置对齐验收标准，大幅降低沟通与返工成本。",
  },
  {
    icon: Layers,
    title: "体系化落地能力",
    desc: "从 0 到 1 搭建 AIGC 内容生产 SOP、质量校验规则与行业模板库，生产流程模板化程度高，可快速复制到多场景，支撑规模化内容量产。",
  },
  {
    icon: TrendingUp,
    title: "数据驱动运营",
    desc: "基于交易、评价、区域等多维度数据搭建商户画像与效果评估体系，让 AIGC 内容生产从「凭感觉」走向「看数据」。",
  },
];

const EXPERIENCES = [
  {
    period: "2025.02 – 2025.09",
    company: "字节跳动",
    role: "商务经理（数据与策略运营）",
    highlights: [
      "落地标杆商户孵化项目，累计孵化 6 家月销 10 万+、2 家月销 30 万+标杆商户",
      "助力合作服装品牌达成成都区域市场占有率第二",
      "沉淀数据驱动的运营方法论，可复用至 AIGC 内容生产的效果评估与策略迭代",
    ],
  },
  {
    period: "2023.09 – 2024.09",
    company: "本地青年社交平台",
    role: "商务经理（用户与场景运营）",
    highlights: [
      "设计 10 余条主题社交线路，沉淀场景化解决方案 SOP，周均参与用户超 1000 人",
      "累计签约 50+ 优质商户，带动平台业务流水突破 150 万元",
      "锻炼模糊需求挖掘与客户方案包装能力",
    ],
  },
  {
    period: "2022.08 – 2023.07",
    company: "拓浦集团",
    role: "人事主管（流程优化与数据化）",
    highlights: [
      "输出全链路标准化操作手册，人力流程整体执行效率提升 40%",
      "搭建人力运营数据看板，风险事件发生率降低 30%",
    ],
  },
  {
    period: "2016.09 – 2020.08",
    company: "菜鸟文化传媒有限公司",
    role: "联合创始人",
    highlights: [
      "锚定「大学+青年文化」细分赛道，从 0 到 1 落地线下文娱业务",
      "将单店月利润从 1.5 万元提升至 5 万元",
      "具备成熟的商务谈判与跨组织协作能力",
    ],
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-6 text-xs font-medium">
              AIGC 内容解决方案 · 成都
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              朱耀龙
            </h1>
            <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
              AI 内容生产运营 / AIGC 内容解决方案
            </p>
            <p className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
              4 年创业经历打磨商业闭环，深耕商务运营与流程标准化。
              2025 年将 AIGC 落地实体商户场景，跑通需求翻译-内容生产-效果验证完整闭环。
              核心差异：兼具 B 端客户需求挖掘经验与 AI 工具深度使用能力，可在商业诉求与模型能力之间担任翻译与交付角色。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/aigc-demo">
                <Button size="lg">
                  体验 AIGC 演示
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg">
                  查看项目经验
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Core Skills */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            核心能力
          </h2>
          <p className="mt-2 text-muted-foreground">
            商业洞察 × AI 工具 × 流程标准化，三者交汇处的稀缺能力组合
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((skill) => (
              <Card key={skill.title} className="border-border/50">
                <CardHeader>
                  <skill.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{skill.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {skill.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Experience Timeline */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          工作经历
        </h2>
        <p className="mt-2 text-muted-foreground">
          从创业到平台，从运营到 AIGC——一条能力持续叠加的路径
        </p>
        <div className="mt-10 space-y-0">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="relative pl-8 pb-10 last:pb-0 border-l border-border ml-3"
            >
              <div className="absolute left-0 top-1.5 -translate-x-1/2 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {exp.period}
                </span>
                <h3 className="text-lg font-semibold">{exp.company}</h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {exp.role}
                </p>
                <ul className="mt-2 space-y-1">
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="text-sm text-muted-foreground leading-relaxed before:content-['–'] before:mr-2 before:text-muted-foreground/50"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* AIGC Project Highlight */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <Badge className="mb-4">核心项目</Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                线下餐饮商户 AIGC 营销内容解决方案
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                针对中小餐饮商户素材产出成本高、更新迭代慢的痛点，
                主导 AIGC 营销素材全流程交付服务。覆盖菜品图、店铺头图、活动海报三类素材，
                将单版素材平均产出周期从 30 分钟压缩至 10 分钟，
                素材点击率平均提升 28%，线上曝光较基准值提升 40%。
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/projects/aigc-catering">
                  <Button variant="outline" size="sm">
                    查看完整案例
                  </Button>
                </Link>
                <Link href="/aigc-demo">
                  <Button size="sm">
                    在线体验
                    <Zap className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3">
              <Card className="border-border/50 bg-background">
                <CardContent className="pt-5 text-center">
                  <div className="text-3xl font-bold">67%</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    产出周期压缩
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-background">
                <CardContent className="pt-5 text-center">
                  <div className="text-3xl font-bold">85%</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    菜品还原合格率
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-background">
                <CardContent className="pt-5 text-center">
                  <div className="text-3xl font-bold">+28%</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    素材点击率提升
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-background">
                <CardContent className="pt-5 text-center">
                  <div className="text-3xl font-bold">+40%</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    线上曝光增量
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
