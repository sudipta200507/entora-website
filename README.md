# Entora Website (Next.js)

Modern AI-tech marketing website for client acquisition and lead conversion.

## Tech Stack
- Next.js 16 (App Router)
- Tailwind CSS
- Framer Motion
- Lucide React
- TypeScript

## Run Locally
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production
```bash
npm run build
npm run start
```

## Deploy (Vercel)
1. Import this GitHub repo in Vercel:
   - https://github.com/sudipta200507/entora-website
2. Framework preset: `Next.js`
3. Root directory: repository root
4. Build command: `npm run build`
5. Output: default Next.js output

### Domain Setup (`entora.space`)
Update DNS to Vercel:
- `A` record for `@` -> `76.76.21.21`
- `CNAME` record for `www` -> `cname.vercel-dns.com`

## Project Structure
```text
app/
  api/
    contact/
      route.ts
  globals.css
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  sections/
    AboutSection.tsx
    ContactSection.tsx
    CtaSection.tsx
    Footer.tsx
    HeroSection.tsx
    Navbar.tsx
    ProcessSection.tsx
    ProjectsSection.tsx
    ServicesSection.tsx
    TrustSection.tsx
  ui/
    cn.ts
    reveal.tsx
data/
  caseStudies.json
  process.ts
  services.ts
public/
  favicon.png
  googlebd708298028680ca.html
```
