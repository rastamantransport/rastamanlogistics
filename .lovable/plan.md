

## Blog Section Plan

### Overview
Add a static blog with hardcoded articles about auto transport tips and guides. Two new pages: a blog listing page (`/blog`) and individual blog post pages (`/blog/:slug`).

### Blog Content (6 initial articles)
1. "How to Prepare Your Car for Shipping" — checklist for customers
2. "Open vs Enclosed Auto Transport: Which Is Right for You?" — comparison guide
3. "How Much Does It Cost to Ship a Car?" — pricing factors breakdown
4. "Top 5 Questions to Ask Your Auto Transport Broker" — buyer's guide
5. "Snowbird Season: Shipping Your Car to Florida" — seasonal guide
6. "What to Know About Door-to-Door Vehicle Delivery" — service explainer

### Files to Create/Modify

**New files:**
- `src/data/blogPosts.ts` — Array of blog post objects (slug, title, excerpt, date, category, readTime, content as JSX-friendly string, SEO meta)
- `src/pages/Blog.tsx` — Blog listing page with card grid, category filter, SEO head, JSON-LD (Blog schema)
- `src/pages/BlogPost.tsx` — Individual post page with full content, related posts sidebar/section, CTA to quote form, Article JSON-LD schema

**Modified files:**
- `src/App.tsx` — Add lazy routes for `/blog` and `/blog/:slug`
- `src/entry-server.tsx` — Add eager imports and routes for SSR
- `src/routes.tsx` — Add blog routes to config
- `src/components/Navbar.tsx` — Add "Blog" link to nav
- `src/components/Footer.tsx` — Add "Blog" link under Company column
- `public/sitemap.xml` — Add `/blog` + 6 individual post URLs
- `vite-prerender-plugin.ts` — Add blog routes to ROUTES array for prerendering

### Page Design

**Blog listing (`/blog`):**
- Navbar + SEOHead + hero banner ("Auto Transport Tips & Guides")
- Category filter chips (All, Tips, Guides, Seasonal)
- Responsive card grid (1 col mobile, 2 col md, 3 col lg) — each card shows title, excerpt, date, read time, category badge
- CTA section at bottom linking to quote calculator
- Footer

**Blog post (`/blog/:slug`):**
- Navbar + SEOHead with article-specific meta
- Breadcrumb (Home > Blog > Post Title)
- Article content with proper heading hierarchy (h1, h2, h3)
- Related posts section (2-3 cards)
- CTA banner ("Ready to ship? Get a free quote")
- Footer

### SEO Details
- Each post gets unique title, description, canonical URL
- Article JSON-LD schema (headline, datePublished, author, publisher)
- Blog listing gets BlogPosting collection schema
- Internal links between posts and service pages for link equity

