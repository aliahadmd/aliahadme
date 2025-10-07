# Custom Tailwind CSS Classes Reference

This document lists all reusable custom classes defined in `app/app.css` and where they are used across the application.

## Background Classes

### `.bg-primary`
- **Purpose**: Primary background color (light: #f0eee6, dark: #0f172a)
- **Used in**: Global body background
- **Example**: `<div className="bg-primary">...</div>`

### `.bg-secondary`
- **Purpose**: Secondary background color for cards/sections (light: #ffffff, dark: #1e293b)
- **Used in**: Layout sidebar, mobile menu, cards
- **Example**: `<nav className="bg-secondary">...</nav>`

### `.bg-tertiary`
- **Purpose**: Tertiary background for alternating rows/hover states (light: #f9fafb, dark: #334155)
- **Used in**: Table alternating rows, hover effects
- **Example**: Applied via hover states

## Text Classes

### `.text-primary`
- **Purpose**: Primary text color (light: #1f2937, dark: #e2e8f0)
- **Used in**: Body text, buttons, general content
- **Example**: `<p className="text-primary">...</p>`

### `.text-secondary`
- **Purpose**: Secondary/muted text color (light: #4b5563, dark: #94a3b8)
- **Used in**: Metadata, captions, footer
- **Example**: `<span className="text-secondary">...</span>`

### `.text-heading`
- **Purpose**: Heading text color (light: #111827, dark: #f1f5f9)
- **Used in**: All headings (h1-h6), page titles
- **Example**: `<h1 className="text-heading">...</h1>`

## Border Classes

### `.border-primary`
- **Purpose**: Primary border color (light: #e5e7eb, dark: #334155)
- **Used in**: Main borders, dividers, cards
- **Example**: `<div className="border border-primary">...</div>`

### `.border-secondary`
- **Purpose**: Secondary/lighter border color (light: #d1d5db, dark: #475569)
- **Used in**: Subtle separators, table borders
- **Example**: Applied in table cells

## Navigation Classes

### `.nav-link`
- **Purpose**: Default navigation link style (italic, with hover effect)
- **Used in**: All navigation links in sidebar and mobile menu
- **Example**: `<Link className="nav-link">about me</Link>`

### `.nav-link-active`
- **Purpose**: Active navigation link (green accent color)
- **Used in**: Currently active page link
- **Example**: `<Link className="nav-link-active">projects</Link>`

## Interactive Classes

### `.link`
- **Purpose**: Standard link styling with hover effect
- **Used in**: In-content links, back links
- **Example**: `<a className="link">View more</a>`

### `.mobile-menu-btn`
- **Purpose**: Mobile hamburger menu button with hover effect
- **Used in**: Layout mobile header
- **Example**: `<button className="mobile-menu-btn">...</button>`

### `.theme-toggle`
- **Purpose**: Theme switcher button (sun/moon icon)
- **Used in**: ThemeToggle component
- **Example**: `<button className="theme-toggle">...</button>`

## Form Classes

### `.select-themed`
- **Purpose**: Themed select dropdown with proper colors
- **Used in**: Category filters in throughts and projects pages
- **Example**: `<select className="select-themed">...</select>`

## Card/Item Classes

### `.card`
- **Purpose**: Generic card container with border and padding
- **Used in**: Can be used for any card-style container
- **Example**: `<div className="card">...</div>`

### `.item-card`
- **Purpose**: Article/project list item container
- **Used in**: Throughts and projects listing pages
- **Example**: `<div className="item-card">...</div>`

### `.item-title`
- **Purpose**: Article/project title link with hover effect
- **Used in**: Throughts and projects listing pages
- **Example**: `<Link className="item-title">Article Title</Link>`

### `.item-meta`
- **Purpose**: Article/project metadata (category, date)
- **Used in**: Throughts and projects listing pages
- **Example**: `<span className="item-meta">Web Dev . . . Jan 2024</span>`

## Button Classes

### `.btn-primary`
- **Purpose**: Primary button with accent color and hover effect
- **Used in**: Can be used for any primary action button
- **Example**: `<button className="btn-primary">Click me</button>`

## Utility Classes

### `.error-container`
- **Purpose**: Error page main container
- **Used in**: ErrorBoundary in root.tsx
- **Example**: `<main className="error-container">...</main>`

### `.error-stack`
- **Purpose**: Error stack trace display box
- **Used in**: ErrorBoundary stack trace display
- **Example**: `<pre className="error-stack">...</pre>`

## Markdown Prose Classes

### `.prose`
- **Purpose**: Base prose styling for markdown content
- **Used in**: All markdown rendered content (wraps dangerouslySetInnerHTML)
- **Example**: `<div className="prose prose-sm max-w-none">...</div>`

All prose sub-classes (`.prose h1`, `.prose p`, `.prose table`, etc.) are automatically applied to markdown content and don't need to be explicitly used.

## File Locations

### Custom classes defined in:
- `app/app.css` (lines 64-193)

### Custom classes used in:
- `app/components/Layout.tsx` - Navigation, footer, mobile menu
- `app/components/ThemeToggle.tsx` - Theme toggle button
- `app/root.tsx` - Error boundary
- `app/routes/home.tsx` - Prose wrapper
- `app/routes/awards.tsx` - Prose wrapper
- `app/routes/throughts.tsx` - Select, item cards
- `app/routes/projects.tsx` - Select, item cards
- `app/routes/podcasts.tsx` - Item cards with external links
- `app/routes/throughts.$slug.tsx` - Back link, prose wrapper
- `app/routes/projects.$slug.tsx` - Back link, prose wrapper

## Color Customization

To change the color scheme, edit the CSS variables in `app/app.css`:

```css
/* Light Mode (lines 9-22) */
@theme {
  --color-bg-primary: #f0eee6;
  --color-accent: #22c55e;
  /* ... more colors ... */
}

/* Dark Mode (lines 25-38) */
[data-theme="dark"] {
  --color-bg-primary: #0f172a;
  --color-accent: #22c55e;
  /* ... more colors ... */
}
```

All custom classes will automatically use these updated colors.

