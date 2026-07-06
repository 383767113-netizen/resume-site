import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Award,
  Zap,
  FileText,
  BarChart3,
  Wrench,
} from "lucide-react";

const TECH_SKILLS = [
  {
    category: "提示词工程",
    items: ["结构化提示词设计", "Few-shot 模板搭建", "风格标签库构建", "分层提示词架构"],
    icon: FileText,
  },
  {
    category: "AIGC 工具",
    items: ["DeepSeek", "豆包", "即梦", "Midjourney", "Dify 自动化工作流"],
    icon: Zap,
  },
  {
    category: "流程与数据",
    items: ["业务 SOP 搭建", "质量校验标准", "Excel 数据分析", "飞书文档协同"],
    icon: BarChart3,
  },
  {
    category: "延伸能力",
    items: ["Pika 视频生成", "商务谈判", "跨组织协作", "项目效果复盘"],
    icon: Wrench,
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">
        <Avatar className="h-24 w-24 text-2xl">
          <AvatarFallback className="bg-primary/10 text-primary">
            朱
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">朱耀龙</h1>
          <p className="text-lg text-muted-foreground mt-1">
            AIGC 内容解决方案 / AI 内容生产运营
          </p>
          <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              成都
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5" />
              社招 · 12-18K/月
            </span>
            <span className="flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5" />
              深圳大学 · 数学与计算科学
            </span>
          </div>
        </div>
      </div>

      <Separator className="mb-12" />

      {/* Career Advantage */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5" />
          职业优势
        </h2>
        <Card className="border-border/50">
          <CardContent className="pt-5">
            <p className="text-muted-foreground leading-relaxed">
              拥有 4 年创业经历打磨的商业闭环与客户需求挖掘能力，后续深耕商务运营与流程标准化建设，
              形成数据驱动的体系化思维。2025 年成功将 AIGC 工具落地实体商户场景，跑通需求翻译-内容生产-效果验证的完整闭环。
              核心差异优势在于：兼具 B 端客户需求挖掘经验与 AI 工具深度使用能力，可在商业诉求与模型能力之间担任翻译与交付角色，
              支撑 AIGC 内容解决方案规模化落地。
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Skills */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">专业技能</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {TECH_SKILLS.map((skill) => (
            <Card key={skill.category} className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <skill.icon className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">{skill.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <Badge key={item} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="mb-12" />

      {/* Education */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          教育经历
        </h2>
        <Card className="border-border/50">
          <CardContent className="pt-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">深圳大学</p>
                <p className="text-sm text-muted-foreground">
                  数学与计算科学 · 本科
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                2014.09 – 2022.06
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact */}
      <div>
        <h2 className="text-xl font-semibold mb-4">联系方式</h2>
        <Card className="border-border/50">
          <CardContent className="pt-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">电话</div>
                  <div className="text-sm font-medium">15986713569</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">邮箱</div>
                  <div className="text-sm font-medium">
                    383767113@qq.com
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
