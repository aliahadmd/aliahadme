# 🚀 Deployment Guide

Your portfolio is production-ready and can be deployed to any modern hosting platform.

## Quick Deploy Options

### 1. Vercel (Recommended - Zero Config)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy: Yes
# - Scope: Your account
# - Link to existing project: No
# - Project name: aliahad (or your preference)
# - Directory: ./ (root)
# - Override settings: No
```

**Vercel will automatically:**
- Detect React Router v7
- Run `npm run build`
- Deploy to a production URL
- Set up continuous deployment from Git

**Custom Domain:**
```bash
vercel domains add yourdomain.com
```

---

### 2. Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Or use drag-and-drop:
# 1. Build: npm run build
# 2. Visit: app.netlify.com/drop
# 3. Drag the build/ folder
```

**netlify.toml** (already configured):
```toml
[build]
  command = "npm run build"
  publish = "build/client"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3. Docker Deployment

Your project includes a Dockerfile for containerization.

```bash
# Build Docker image
docker build -t aliahad-portfolio .

# Run container
docker run -p 3000:3000 aliahad-portfolio

# Visit: http://localhost:3000
```

**Deploy to cloud platforms:**
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**

---

### 4. Static Hosting (S3, Cloudflare Pages, etc.)

```bash
# Build for production
npm run build

# Upload these files:
build/client/*  → Your hosting service
```

**For React Router to work with static hosting:**
- Configure redirects: All routes → /index.html
- Enable SPA mode (already done in react-router.config.ts)

---

## Environment Variables

Currently, your app doesn't require environment variables. If you add API integrations, create:

**.env.production**
```
VITE_API_URL=https://api.yourdomain.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Custom Domain Setup

### DNS Configuration

**A Records** (if using root domain):
```
Type: A
Name: @
Value: [Your host's IP]
```

**CNAME Records** (if using subdomain):
```
Type: CNAME
Name: www
Value: [Your host's domain]
```

### SSL Certificate

Most modern platforms (Vercel, Netlify, Cloudflare) provide:
- ✅ Automatic SSL/HTTPS
- ✅ Free certificates (Let's Encrypt)
- ✅ Auto-renewal

---

## Performance Optimization

Your build is already optimized, but for extra performance:

### 1. Enable CDN
Most platforms have built-in CDN. Enable it in settings.

### 2. Image Optimization
If you add images to markdown:
- Use WebP format
- Compress before uploading
- Consider Cloudinary/Imgix for dynamic optimization

### 3. Analytics
Add analytics by updating `app/root.tsx`:

```typescript
// Google Analytics
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## Continuous Deployment

### GitHub Actions (for custom servers)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - name: Deploy
        run: |
          # Your deployment commands
```

---

## Monitoring & Maintenance

### 1. Check Build Logs
Monitor deployments for errors.

### 2. Update Dependencies
```bash
npm update
npm audit fix
```

### 3. Test After Updates
```bash
npm run typecheck
npm run build
```

---

## Troubleshooting

### Issue: 404 on refresh
**Solution:** Ensure SPA redirects are configured (all routes → /index.html)

### Issue: Styles not loading
**Solution:** Check `ssr: true` in `react-router.config.ts`

### Issue: Large bundle size
**Solution:** Already optimized! Current size: 4.2MB (includes KaTeX fonts)

---

## Production Checklist

Before deploying:
- ✅ Update personal information in content files
- ✅ Add your real projects and articles
- ✅ Test all pages locally
- ✅ Run `npm run build` successfully
- ✅ Check production build locally: `npm start`
- ✅ Verify responsive design on mobile
- ✅ Test markdown features (code, math, diagrams)

---

## Support & Resources

- **React Router Docs:** https://reactrouter.com
- **Tailwind CSS:** https://tailwindcss.com
- **Vercel Support:** https://vercel.com/support
- **Netlify Docs:** https://docs.netlify.com

---

## Your URLs

**Development:** http://localhost:5173  
**Production:** [Your domain after deployment]

---

**🎉 Ready to deploy! Choose your platform and launch your portfolio to the world!**

