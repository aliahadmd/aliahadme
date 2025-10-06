import { useEffect } from "react";

export function MermaidInit() {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      import("mermaid").then((mermaid) => {
        mermaid.default.initialize({
          startOnLoad: true,
          theme: "default",
          securityLevel: "loose",
        });
        // Re-render mermaid diagrams
        mermaid.default.contentLoaded();
      });
    }
  }, []);

  return null;
}

