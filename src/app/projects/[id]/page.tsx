import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <Link href="/projects">
        <Button variant="ghost" size="sm" className="mb-8 -ml-2">
          <ArrowLeft className="mr-1 h-4 w-4" />
          返回项目列表
        </Button>
      </Link>

      <div className="space-y-10">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <span>{project.company}</span>
            <span>·</span>
            <span>{project.period}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {project.title}
          </h1>
          <p className="mt-2 text-muted-foreground">{project.subtitle}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m) => (
              <Card key={m.label} className="border-border/50">
                <CardContent className="pt-5 text-center">
                  <div className="text-2xl font-bold">{m.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {m.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary */}
        <div>
          <h2 className="text-lg font-semibold mb-3">项目概述</h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Problem */}
        {project.problem && (
          <div>
            <h2 className="text-lg font-semibold mb-3">面临的问题</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.problem}
            </p>
          </div>
        )}

        {/* Approach */}
        {project.approach && (
          <div>
            <h2 className="text-lg font-semibold mb-3">解决方案</h2>
            <ul className="space-y-2">
              {project.approach.map((a, i) => (
                <li key={i} className="flex gap-2 text-muted-foreground">
                  <span className="text-primary font-medium flex-none">
                    {i + 1}.
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Results */}
        {project.results && (
          <div>
            <h2 className="text-lg font-semibold mb-3">项目成果</h2>
            <ul className="space-y-2">
              {project.results.map((r, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-muted-foreground before:content-['✓'] before:text-green-500 before:font-semibold before:flex-none"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detail narrative */}
        {project.detail && (
          <>
            <Separator />
            <div>
              <h2 className="text-lg font-semibold mb-3">项目复盘</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.detail}
              </p>
            </div>
          </>
        )}

        {/* AIGC demo CTA */}
        {id === "aigc-catering" && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="py-6 text-center">
              <h3 className="font-semibold mb-2">在线体验 AIGC 内容生成</h3>
              <p className="text-sm text-muted-foreground mb-4">
                输入商户信息，亲自体验从需求翻译到内容产出的完整流水线
              </p>
              <Link href="/aigc-demo">
                <Button>进入演示</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
