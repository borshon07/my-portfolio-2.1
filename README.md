<div align="center">

# Borshon Roy | Developer Portfolio

A full-stack developer portfolio with a movie-inspired intro, dark and light themes, 3D interactions, and a project detail page for every build.

[**Live Site**](https://borshon-roy-2-1.vercel.app/) · [**GitHub**](https://github.com/borshon07) · [**LinkedIn**](https://www.linkedin.com/in/borshon-roy09/)

![Next.js](https://img.shields.io/badge/Next.js_16-App_Router-000000?style=flat&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-FF7849?style=flat)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel)

</div>

---

## Live Site

**https://borshon-roy-2-1.vercel.app/**

<!-- Add a screenshot or GIF of your site here -->
<!-- ![Portfolio preview](./public/preview.png) -->

## Highlights

- **Two themes:** Obsidian and warm orange in dark mode, deep navy and cyan in light mode. The choice is saved in the browser.
- **Cinematic intro:** a movie-inspired preloader with a rainy storm drain, a red balloon and a multilingual greeting. It has a skip button and respects reduced motion.
- **Real projects, real pages:** every project has its own page with tech stack, overview, live link, GitHub link, challenges and future plans.
- **Real data only:** stats and the marquee are generated from the data file, so nothing is invented.

## Features

**Navigation**
- Floating 3D navbar with mouse tilt, flip-style link labels, a spinning cube logo and a scroll progress bar.
- Full-screen animated mobile menu. Desktop navigation appears from 1024px, tablets use the menu.
- Links work from project pages too: they return home and scroll to the chosen section, with clean URLs (no `#`).

**Hero**
- Serif italic headline with a hand-drawn underline, and a rotating role line.
- Magnetic buttons, 3D tilt portrait with glare, floating tech chips with real brand logos.
- Resume download and view buttons, plus social buttons. The email button copies the address, so it works even without a mail app.
- Tech marquee and live project counts.

**About**
- Scroll-reveal intro, count-up stats, and a draggable 3D cube of the core stack.
- Programming journey timeline that draws itself as you scroll.
- Education, interests, "How I work" flip cards, and a "Beyond the code" section.

**Skills**
- Five categories with filter tabs and real brand logos on 3D tiles.
- Skills without a brand logo use colored icons. No made-up skill levels.

**Projects**
- Scroll-driven 3D reveal, film-strip style screenshot frames, and project numbering.
- Statically generated detail pages at `/projects/[id]` with previous and next navigation.

**Contact**
- Email with copy to clipboard, phone, WhatsApp click-to-chat with a prefilled message, and social links.

**Extras**
- Liquid morph cursor on desktop (fine pointer only).
- `prefers-reduced-motion` support, keyboard focus styles and ARIA labels.
- Fully responsive layout.

## Tech Stack

| Category | Tools |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 with CSS variable theme tokens |
| Animation | Motion (`motion/react`), CSS 3D transforms, SVG filters |
| Icons | Lucide React, Simple Icons (brand logos via CDN) |
| Fonts | Geist Sans, Geist Mono, Instrument Serif |
| Linting | ESLint |
| Deployment | Vercel |

## Featured Projects

| Project | Stack | Links |
|---|---|---|
| **BazarDor** | Next.js 16, TypeScript, Tailwind CSS, HeroUI, Better Auth, MongoDB | [Details](https://borshon-roy-2-1.vercel.app/projects/bazardor-market-tracker) · [Source](https://github.com/borshon07/BazarDor-web-B14-Ass-07) |
| **FitLog** | Next.js, TypeScript, Tailwind CSS, DaisyUI, next-themes, Sonner | [Details](https://borshon-roy-2-1.vercel.app/projects/fitlog-workout-tracker) · [Source](https://github.com/borshon07/B-14-A06--FitLog-by-Borshon) |
| **DevStack Builder** | React, TypeScript, Tailwind CSS, Vite, React-Toastify | [Details](https://borshon-roy-2-1.vercel.app/projects/devstack-builder) · [Source](https://github.com/borshon07/B-14-A05--DevStack-) |

## Project Structure

```
├── public/
│   ├── Assits/                    # Profile photo
│   ├── projects/                  # Project screenshots
│   └── resume/                    # Resume PDF
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout, theme script, metadata
│   │   ├── page.tsx               # Home page
│   │   ├── globals.css            # Theme tokens (light and dark)
│   │   └── projects/[id]/page.tsx # Project detail route
│   ├── components/
│   │   ├── layout/                # Navbar, Footer
│   │   ├── sections/              # Hero, About, Skills, Projects, Contact, ProjectDetail
│   │   └── ui/                    # Preloader, CustomCursor, ThemeToggle, BrandIcon, ProjectVisual, ...
│   ├── data/
│   │   └── portfolioData.ts       # All portfolio content
│   ├── types/
│   │   └── portfolio.ts           # TypeScript types
│   └── utils/
│       ├── motion.ts              # Shared animation config
│       ├── scrollToSection.ts     # Smooth scroll on the same page
│       └── goToSection.ts         # Navigate home, then scroll
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- npm, yarn, pnpm or bun

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/borshon07/<your-repo-name>.git

# 2. Go to the project folder
cd <your-repo-name>

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. No environment variables are required.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint |

## Customization

Most content lives in `src/data/portfolioData.ts`:

```ts
export const personalInfo = { /* name, title, bio, email, resumeUrl, ... */ };
export const navItems = [ /* navigation links */ ];
export const socialLinks = [ /* GitHub, LinkedIn, Email */ ];
export const skillCategories = [ /* skills by category */ ];
export const projects = [ /* projects, challenges, improvements */ ];
```

- **Add a project:** add an object to `projects`, put a screenshot in `public/projects/`, and set its `image` path. The detail page is generated automatically.
- **Change colors:** edit the light and dark tokens at the top of `src/app/globals.css`.
- **Add a skill logo:** add an entry to the brand list in `src/components/ui/BrandIcon.tsx`.
- **Edit About text, journey and hobbies:** the content constants at the top of `src/components/sections/About.tsx`.
- **Change the intro:** greetings, timing and tagline are constants at the top of `src/components/ui/Preloader.tsx`.
- **Resume:** replace the PDF in `public/resume/` and update `resumeUrl`.

## Deployment

Deployed on [Vercel](https://vercel.com). To deploy your own copy:

1. Push the repo to GitHub.
2. Import the project on Vercel.
3. Click **Deploy**.

## Credits

- Brand logos from [Simple Icons](https://simpleicons.org/).
- Icons from [Lucide](https://lucide.dev/).
- Fonts: Geist and Instrument Serif.

## Contact

**Borshon Roy**, Full-Stack Web Developer, Bangladesh

- Portfolio: [borshon-roy-2-1.vercel.app](https://borshon-roy-2-1.vercel.app/)
- Email: borshonroy73@gmail.com
- GitHub: [@borshon07](https://github.com/borshon07)
- LinkedIn: [borshon-roy09](https://www.linkedin.com/in/borshon-roy09/)

---

<div align="center">

Designed and built by Borshon Roy

</div>