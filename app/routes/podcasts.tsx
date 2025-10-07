import type { Route } from "./+types/podcasts";
import { Layout } from "../components/Layout";
import { promises as fs } from "fs";
import path from "path";

interface PodcastMetadata {
  title: string;
  date: string;
  url: string;
}

export async function loader() {
  const podcastsDir = path.join(process.cwd(), "content", "podcasts");
  
  try {
    const files = await fs.readdir(podcastsDir);
    const podcastFiles = files.filter((file) => file.endsWith(".md"));

    const podcasts = await Promise.all(
      podcastFiles.map(async (file) => {
        const content = await fs.readFile(
          path.join(podcastsDir, file),
          "utf-8"
        );
        const metadataMatch = content.match(/^---\n([\s\S]+?)\n---/);
        
        if (metadataMatch) {
          const metadata = metadataMatch[1];
          const title = metadata.match(/title:\s*(.+)/)?.[1] || "Untitled";
          const date = metadata.match(/date:\s*(.+)/)?.[1] || "";
          const url = metadata.match(/url:\s*(.+)/)?.[1] || "";
          
          return {
            title,
            date,
            url,
          };
        }
        
        return null;
      })
    );

    const validPodcasts = podcasts
      .filter((p): p is PodcastMetadata => p !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { podcasts: validPodcasts };
  } catch (error) {
    return { podcasts: [] };
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Podcasts | Portfolio" },
    { name: "description", content: "My podcast appearances and episodes" },
  ];
}

export default function Podcasts({ loaderData }: Route.ComponentProps) {
  const { podcasts } = loaderData;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-heading">podcasts</h1>
        
        <div className="space-y-4">
          {podcasts.length === 0 ? (
            <p className="text-secondary">No podcasts yet.</p>
          ) : (
            podcasts.map((podcast, index) => (
              <div key={index} className="item-card">
                <a
                  href={podcast.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="item-title"
                >
                  {podcast.title}
                  <svg 
                    className="inline-block w-4 h-4 ml-1 -mt-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
                <span className="item-meta">{podcast.date}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

