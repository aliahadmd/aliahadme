import type { Route } from "./+types/awards";
import { Layout } from "../components/Layout";
import { markdownToHtml } from "../utils/markdown";
import { promises as fs } from "fs";
import path from "path";

export async function loader() {
  const awardsPath = path.join(process.cwd(), "content", "awards.md");
  const content = await fs.readFile(awardsPath, "utf-8");
  const htmlContent = markdownToHtml(content);
  
  return { htmlContent };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Awards & Certifications | Portfolio" },
    { name: "description", content: "My awards and certifications" },
  ];
}

export default function Awards({ loaderData }: Route.ComponentProps) {
  const { htmlContent } = loaderData;

  return (
    <Layout>
      <div className="prose prose-sm max-w-none">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </Layout>
  );
}

