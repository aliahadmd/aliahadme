import { Link } from "react-router";
import { useState, useMemo } from "react";
import type { Route } from "./+types/throughts";
import { Layout } from "../components/Layout";
import { parseMarkdown } from "../utils/markdown";
import { promises as fs } from "fs";
import path from "path";

export async function loader() {
  const thoughtsDir = path.join(process.cwd(), "content", "throughts");
  const files = await fs.readdir(thoughtsDir);
  
  const thoughts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const content = await fs.readFile(
          path.join(thoughtsDir, file),
          "utf-8"
        );
        const { metadata } = parseMarkdown(content);
        return metadata;
      })
  );

  // Sort by date (newest first)
  thoughts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return { thoughts };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Throughts | Portfolio" },
    { name: "description", content: "My thoughts and articles" },
  ];
}

export default function Throughts({ loaderData }: Route.ComponentProps) {
  const { thoughts } = loaderData;
  const [selectedCategory, setSelectedCategory] = useState("all categories");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(thoughts.map((t) => t.category).filter(Boolean));
    return ["all categories", ...Array.from(cats)];
  }, [thoughts]);

  // Filter thoughts by category
  const filteredThoughts = useMemo(() => {
    if (selectedCategory === "all categories") {
      return thoughts;
    }
    return thoughts.filter((t) => t.category === selectedCategory);
  }, [thoughts, selectedCategory]);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">throughts</h1>
        
        <div className="mb-6">
          <select 
            className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-auto"
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
          {filteredThoughts.map((thought) => (
            <div key={thought.slug} className="border-b border-gray-200 pb-4">
              <Link
                to={`/throughts/${thought.slug}`}
                className="text-base md:text-lg hover:text-green-600 block mb-2"
              >
                {thought.title}
              </Link>
              <span className="text-gray-500 text-xs md:text-sm block md:inline md:ml-4">
                {thought.category} . . . . . . . . . {thought.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

