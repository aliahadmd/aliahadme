import { marked } from "marked";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import cpp from "highlight.js/lib/languages/cpp";
import c from "highlight.js/lib/languages/c";
import java from "highlight.js/lib/languages/java";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import sql from "highlight.js/lib/languages/sql";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import katex from "katex";

// Register languages
hljs.registerLanguage("python", python);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("c", c);
hljs.registerLanguage("java", java);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);

export interface Metadata {
  title?: string;
  slug?: string;
  category?: string;
  date?: string;
  github?: string;
}

export function parseMarkdown(content: string): {
  metadata: Metadata;
  content: string;
} {
  const metadataRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(metadataRegex);

  if (!match) {
    return { metadata: {}, content };
  }

  const metadataString = match[1];
  const markdownContent = match[2];

  const metadata: Metadata = {};
  metadataString.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      const value = valueParts.join(":").trim();
      metadata[key.trim() as keyof Metadata] = value;
    }
  });

  return { metadata, content: markdownContent };
}

// Configure marked with extensions
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true,
});

// Custom renderer for syntax highlighting and special code blocks
const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  // Check for math/latex blocks
  if (lang === 'math' || lang === 'latex') {
    try {
      return '<div class="math-block">' + katex.renderToString(text, {
        displayMode: true,
        throwOnError: false,
      }) + '</div>';
    } catch (e) {
      console.error('KaTeX error:', e);
      return '<pre><code>' + text + '</code></pre>';
    }
  }
  
  // Check for mermaid diagrams
  if (lang === 'mermaid') {
    return '<div class="mermaid">' + text + '</div>';
  }
  
  // Apply syntax highlighting
  let highlighted = text;
  if (lang && hljs.getLanguage(lang)) {
    try {
      highlighted = hljs.highlight(text, { language: lang }).value;
    } catch (err) {
      console.error('Highlight error:', err);
      highlighted = hljs.highlightAuto(text).value;
    }
  } else {
    highlighted = hljs.highlightAuto(text).value;
  }
  
  const langClass = lang ? ` language-${lang}` : '';
  return `<pre><code class="hljs${langClass}">${highlighted}</code></pre>`;
};

marked.use({ renderer });

// Enhanced markdown to HTML converter with full feature support
export function markdownToHtml(markdown: string): string {
  // Process inline math (between $ $)
  let processed = markdown.replace(/\$([^\$]+)\$/g, (match, math) => {
    try {
      return katex.renderToString(math, { throwOnError: false });
    } catch (e) {
      return match;
    }
  });

  // Process display math (between $$ $$)
  processed = processed.replace(/\$\$([^\$]+)\$\$/g, (match, math) => {
    try {
      return '<div class="math-block">' + katex.renderToString(math, {
        displayMode: true,
        throwOnError: false,
      }) + '</div>';
    } catch (e) {
      return match;
    }
  });

  // Convert markdown to HTML
  const html = marked.parse(processed);
  
  return html as string;
}

