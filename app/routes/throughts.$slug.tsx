import { Link, data } from "react-router";
import type { Route } from "./+types/throughts.$slug";
import { Layout } from "../components/Layout";
import { parseMarkdown, markdownToHtml } from "../utils/markdown";
import { promises as fs } from "fs";
import path from "path";

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const thoughtPath = path.join(
    process.cwd(),
    "content",
    "throughts",
    `${slug}.md`
  );

  try {
    const content = await fs.readFile(thoughtPath, "utf-8");
    const { metadata, content: markdownContent } = parseMarkdown(content);
    const htmlContent = markdownToHtml(markdownContent);

    return { metadata, htmlContent };
  } catch (error) {
    throw data({ message: "Thought not found" }, { status: 404 });
  }
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.metadata.title || "Thought"} | Portfolio` },
    { name: "description", content: data?.metadata.title },
  ];
}

export default function ThoughtDetail({ loaderData }: Route.ComponentProps) {
  const { metadata, htmlContent } = loaderData;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="mb-6 md:mb-8">
          <Link to="/throughts" className="text-sm link">
            ← back
          </Link>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-heading">{metadata.title}</h1>
          <p className="text-secondary text-sm md:text-base">
            date: {metadata.date} | Category: {metadata.category}
          </p>
          <div
            className="prose prose-sm max-w-none mt-6"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </Layout>
  );
}

