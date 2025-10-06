# Personal Portfolio Website

A simple, clean personal portfolio website built with React Router v7 and Tailwind CSS.

## Features

- **About Me** page with markdown-based bio
- **Throughts** section for articles and blog posts (filterable by category)
- **Projects** showcase with detailed case studies
- **Awards & Certifications** page to highlight achievements
- Clean sidebar navigation
- Fully markdown-based content management

## Project Structure

```
app/
├── components/
│   └── Layout.tsx          # Shared layout with sidebar navigation
├── routes/
│   ├── home.tsx            # About me page
│   ├── throughts.tsx       # List of articles
│   ├── throughts.$slug.tsx # Individual article detail
│   ├── projects.tsx        # List of projects
│   └── projects.$slug.tsx  # Individual project detail
└── utils/
    └── markdown.ts         # Markdown parsing and HTML conversion

content/
├── about.md                # Your bio and contact info
├── awards.md               # Awards and certifications
├── throughts/              # Article markdown files
│   ├── article1.md
│   ├── article2.md
│   └── ...
└── projects/               # Project markdown files
    ├── project1.md
    ├── project2.md
    └── ...
```

## Managing Content

### About Page
Edit `content/about.md` to update your bio, title, and contact information.

### Awards & Certifications
Edit `content/awards.md` to add your awards and certifications in markdown format.

### Adding Throughts/Articles
Create a new markdown file in `content/throughts/` with the following frontmatter:

```markdown
---
title: Your Article Title
slug: article-slug
category: Technology
date: 2025/4/1
---

Your article content here...
```

### Adding Projects
Create a new markdown file in `content/projects/` with the following frontmatter:

```markdown
---
title: Your Project Title
slug: project-slug
category: Fullstack
date: 2025/9/1
github: https://github.com/yourusername/project
---

## Case study:

Your project description...
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Tech Stack

- React 19
- React Router v7 (with file-based routing)
- Tailwind CSS v4
- TypeScript
- Vite
- Marked (Markdown parser)
- Highlight.js (Code syntax highlighting)
- KaTeX (Math equations)
- Mermaid (Diagrams and flowcharts)

## Markdown Features

All markdown content supports:
- ✅ **Code Blocks** with syntax highlighting (Python, JavaScript, TypeScript, etc.)
- ✅ **Tables** with responsive styling
- ✅ **Math Equations** (inline: `$equation$`, display: `$$equation$$`)
- ✅ **UML Diagrams** using Mermaid (flowcharts, sequence diagrams, etc.)
- ✅ **Images** with responsive sizing
- ✅ **Lists** (ordered and unordered)
- ✅ **Blockquotes**
- ✅ **Text formatting** (bold, italic, strikethrough)
- ✅ **Links** and more!

See `/throughts/markdown-demo` for a live demonstration of all features.
