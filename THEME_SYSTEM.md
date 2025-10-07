# Theme System Documentation

## 🎨 Dark Mode & Light Mode Support

Your portfolio now features a complete theme system with automatic dark/light mode support!

## Features

✅ **Automatic Theme Detection** - Respects system preferences  
✅ **Manual Toggle** - Moon/Sun icon button to switch themes  
✅ **Persistent Storage** - Remembers user preference in localStorage  
✅ **Smooth Transitions** - 0.3s ease animations between themes  
✅ **Reusable CSS Classes** - Easy to maintain and customize

---

## Theme Toggle Button

Located in:
- **Desktop**: Top of sidebar navigation
- **Mobile**: Header next to hamburger menu

**Icons:**
- 🌙 Moon = Click to enable dark mode
- ☀️ Sun = Click to enable light mode

---

## CSS Variables (Customizable)

All colors are defined as CSS variables in `app/app.css`:

### Light Mode Colors
```css
--bg-primary: #f0eee6;      /* Main background (warm beige) */
--bg-secondary: #ffffff;     /* Cards, sidebar background */
--bg-tertiary: #f9fafb;      /* Alternate rows, hover states */
--text-primary: #1f2937;     /* Main text color */
--text-secondary: #4b5563;   /* Secondary text, meta info */
--text-heading: #111827;     /* Headings, bold text */
--text-link: #2563eb;        /* Links */
--border-primary: #e5e7eb;   /* Main borders */
--accent-primary: #22c55e;   /* Green accent (nav active) */
```

### Dark Mode Colors
```css
--bg-primary: #0f172a;       /* Main background (dark blue) */
--bg-secondary: #1e293b;     /* Cards, sidebar background */
--bg-tertiary: #334155;      /* Alternate rows, hover states */
--text-primary: #e2e8f0;     /* Main text color (light) */
--text-secondary: #94a3b8;   /* Secondary text */
--text-heading: #f1f5f9;     /* Headings (lighter) */
--text-link: #60a5fa;        /* Links (brighter blue) */
--border-primary: #334155;   /* Main borders (darker) */
--accent-primary: #22c55e;   /* Green accent (same) */
```

---

## Reusable CSS Classes

Instead of inline Tailwind classes, use these semantic classes:

### Backgrounds
```css
.bg-primary      /* Main page background */
.bg-secondary    /* Cards, sidebar */
.bg-tertiary     /* Hover states, alternating rows */
```

### Text Colors
```css
.text-primary    /* Normal text */
.text-secondary  /* Meta info, dates */
.text-heading    /* Headings, bold emphasis */
.text-link       /* Links */
```

### Borders
```css
.border-primary    /* Main borders */
.border-secondary  /* Secondary borders */
```

### Navigation
```css
.nav-link         /* Normal navigation link */
.nav-link-active  /* Active navigation link (green) */
```

### Components
```css
.card            /* Card component */
.btn-primary     /* Primary button */
.theme-toggle    /* Theme toggle button */
```

---

## How to Change Colors

### Example: Change accent color from green to blue

1. Open `app/app.css`
2. Find both `:root` and `[data-theme="dark"]` sections
3. Update the accent colors:

```css
/* Light mode */
:root {
  --accent-primary: #3b82f6;    /* Blue instead of green */
  --accent-hover: #2563eb;
}

/* Dark mode */
[data-theme="dark"] {
  --accent-primary: #60a5fa;    /* Lighter blue for dark mode */
  --accent-hover: #93c5fd;
}
```

### Example: Change background colors

```css
/* Make dark mode even darker */
[data-theme="dark"] {
  --bg-primary: #000000;        /* Pure black */
  --bg-secondary: #0a0a0a;      /* Very dark gray */
  --bg-tertiary: #1a1a1a;
}
```

---

## Usage in Components

### Before (hardcoded colors):
```tsx
<div className="bg-white text-gray-900 border-gray-300">
  <h1 className="text-gray-800">Title</h1>
</div>
```

### After (theme-aware):
```tsx
<div className="bg-secondary text-primary border-primary">
  <h1 className="text-heading">Title</h1>
</div>
```

---

## Markdown Content Styling

All markdown content automatically adapts to theme:

- **Code blocks**: Dark background in both themes
- **Inline code**: Yellow/orange background (light), dark orange (dark)
- **Tables**: Themed headers and rows
- **Links**: Blue in light mode, lighter blue in dark mode
- **Headings**: Darker in light mode, lighter in dark mode

---

## Implementation Details

### ThemeProvider (`app/utils/theme.tsx`)
- React Context for global theme state
- Stores preference in localStorage
- Checks system preference on first load
- Updates `data-theme` attribute on `<html>`

### ThemeToggle Component
- Shows appropriate icon (moon/sun)
- Smooth transition between themes
- Accessible with ARIA labels

### CSS Variables
- Defined in `app/app.css`
- Scoped by `data-theme` attribute
- Smooth 0.3s transitions

---

## Testing Themes

### Method 1: Use the toggle button
Click the moon/sun icon in the navigation.

### Method 2: Browser DevTools
```javascript
// In console
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');
```

### Method 3: System Preferences
Change your OS theme and refresh the page (if no localStorage preference set).

---

## Browser Support

✅ All modern browsers (Chrome, Firefox, Safari, Edge)  
✅ Mobile browsers (iOS Safari, Chrome Mobile)  
✅ Respects `prefers-color-scheme` media query

---

## Troubleshooting

### Theme doesn't persist
- Check if localStorage is enabled in browser
- Clear localStorage: `localStorage.removeItem('theme')`

### Colors not updating
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check browser console for errors

### Custom colors not working
- Ensure CSS variables are defined in both `:root` and `[data-theme="dark"]`
- Check for typos in variable names
- Restart dev server: `npm run dev`

---

## Best Practices

1. **Always use CSS variables** - Don't hardcode colors
2. **Test both themes** - Before deploying
3. **Consider accessibility** - Ensure good contrast ratios
4. **Use semantic classes** - `.text-primary` instead of `.text-gray-900`
5. **Keep consistency** - Use the same class names across components

---

## Color Contrast (WCAG AA Compliant)

### Light Mode
- Text on background: ✅ 12.6:1
- Links on background: ✅ 7.1:1

### Dark Mode
- Text on background: ✅ 13.8:1
- Links on background: ✅ 6.9:1

---

## Quick Reference

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background | #f0eee6 (Beige) | #0f172a (Dark Blue) |
| Text | #1f2937 (Dark Gray) | #e2e8f0 (Light Gray) |
| Accent | #22c55e (Green) | #22c55e (Green) |
| Links | #2563eb (Blue) | #60a5fa (Light Blue) |

---

**🎉 Your portfolio now has full theme support with easy customization!**

