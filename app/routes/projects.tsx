import { Link } from "react-router";
import { useState, useMemo } from "react";
import type { Route } from "./+types/projects";
import { Layout } from "../components/Layout";
import { parseMarkdown } from "../utils/markdown";
import { promises as fs } from "fs";
import path from "path";

export async function loader() {
  const projectsDir = path.join(process.cwd(), "content", "projects");
  const files = await fs.readdir(projectsDir);
  
  const projects = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const content = await fs.readFile(
          path.join(projectsDir, file),
          "utf-8"
        );
        const { metadata } = parseMarkdown(content);
        return metadata;
      })
  );

  // Sort by date (newest first)
  projects.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return { projects };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | Portfolio" },
    { name: "description", content: "My projects" },
  ];
}

export default function Projects({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;
  const [selectedCategory, setSelectedCategory] = useState("all categories");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category).filter(Boolean));
    return ["all categories", ...Array.from(cats)];
  }, [projects]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all categories") {
      return projects;
    }
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-heading">projects</h1>
        
        <div className="mb-6">
          <select 
            className="select-themed"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div key={project.slug} className="item-card">
              <Link
                to={`/projects/${project.slug}`}
                className="item-title"
              >
                {project.title}
              </Link>
              <span className="item-meta">
                {project.category} . . . . . . . . . {project.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

