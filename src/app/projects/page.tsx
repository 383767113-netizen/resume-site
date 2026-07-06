import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          项目经验
        </h1>
        <p className="mt-2 text-muted-foreground max-w-xl">
          从创业到 AIGC，每个项目都沉淀了可复用的方法论。点击查看完整案例。
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="h-full border-border/50 hover:border-border hover:shadow-sm transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {project.company}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {project.period}
                  </span>
                </div>
                <CardTitle className="text-lg mt-2">{project.title}</CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.subtitle}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {project.metrics && (
                  <div className="flex gap-4 text-sm">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <span className="font-semibold">{m.value}</span>
                        <span className="text-muted-foreground ml-1 text-xs">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
