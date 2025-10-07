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
        <h1 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-heading">throughts</h1>
        
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
          {filteredThoughts.map((thought) => (
            <div key={thought.slug} className="item-card">
              <Link
                to={`/throughts/${thought.slug}`}
                className="item-title"
              >
                {thought.title}
              </Link>
              <span className="item-meta">
                {thought.category} . . . . . . . . . {thought.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

