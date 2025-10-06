import { Link, data } from "react-router";
import type { Route } from "./+types/projects.$slug";
import { Layout } from "../components/Layout";
import { parseMarkdown, markdownToHtml } from "../utils/markdown";
import { promises as fs } from "fs";
import path from "path";

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const projectPath = path.join(
    process.cwd(),
    "content",
    "projects",
    `${slug}.md`
  );

  try {
    const content = await fs.readFile(projectPath, "utf-8");
    const { metadata, content: markdownContent } = parseMarkdown(content);
    const htmlContent = markdownToHtml(markdownContent);

    return { metadata, htmlContent };
  } catch (error) {
    throw data({ message: "Project not found" }, { status: 404 });
  }
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.metadata.title || "Project"} | Portfolio` },
    { name: "description", content: data?.metadata.title },
  ];
}

export default function ProjectDetail({ loaderData }: Route.ComponentProps) {
  const { metadata, htmlContent } = loaderData;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="mb-6 md:mb-8">
          <Link to="/projects" className="text-sm hover:text-green-600">
            ← back
          </Link>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">{metadata.title}</h1>
          <div className="text-gray-600 text-sm md:text-base">
            <p className="mb-1">Category: {metadata.category} | Date: {metadata.date}</p>
            <p>Github link: <a href={metadata.github} className="text-blue-600 hover:underline break-all">{metadata.github}</a></p>
          </div>
          <div
            className="prose prose-sm max-w-none mt-6"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </Layout>
  );
}

