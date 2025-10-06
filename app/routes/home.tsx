import type { Route } from "./+types/home";
import { Layout } from "../components/Layout";
import { readFile } from "fs/promises";
import { join } from "path";
import { markdownToHtml } from "../utils/markdown";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Me - Portfolio" },
    { name: "description", content: "Personal portfolio and bio" },
  ];
}

export async function loader() {
  const content = await readFile(
    join(process.cwd(), "content/about.md"),
    "utf-8"
  );
  return { content };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const html = markdownToHtml(loaderData.content);

  return (
    <Layout>
      <div className="prose prose-sm max-w-none">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
}
