<div align="center">

# Borshon Roy | Developer Portfolio

A modern, responsive developer portfolio with 3D animations, a liquid cursor, and a dark editorial UI.

[**Live Demo**](https://borshon-roy-2-1.vercel.app/) · [**GitHub**](https://github.com/borshon07) · [**LinkedIn**](https://www.linkedin.com/in/borshon-roy09/)

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?style=flat&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-FF7849?style=flat)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel)

</div>

---

## Live Site

**https://borshon-roy-2-1.vercel.app/**

<!-- Add a screenshot or GIF of your site here -->
<!-- ![Portfolio preview](./public/preview.png) -->

## Features

- **3D intro preloader:** a rotating 3D cube with orbit rings and a loading counter, shown on every visit and reload.
- **Liquid morph cursor:** a gooey cursor that stretches with speed and morphs into the shape of buttons and links.
- **3D floating navbar:** tilts with the mouse, flip-style link labels, a spinning cube logo, and a scroll progress bar.
- **3D tilt cards:** Hero, About, Skills and Projects cards respond to the mouse with depth layers and cursor glare.
- **Animated sections:** staggered entrances, scroll reveals, and a sliding filter pill in the Skills section.
- **Smooth navigation:** smooth scrolling between sections, clean URLs without `#`, and an active section indicator.
- **Contact section:** one-click email and copy-to-clipboard with animated feedback.
- **Fully responsive:** full-screen animated mobile menu and touch-friendly layout.
- **Accessible:** respects `prefers-reduced-motion`, keyboard navigation, and ARIA labels.
- **Data-driven:** all content lives in one file, so updating it never requires touching components.

## Tech Stack

| Category | Tools |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Motion (`motion/react`), CSS 3D transforms, SVG filters |
| Icons | Lucide React |
| Fonts | Geist Sans & Geist Mono |
| Deployment | Vercel |

## Sections

1. **Hero:** headline, 3D portrait card, floating tech chips
2. **About:** profile and engineering values
3. **Skills:** categorized, filterable skill cards
4. **Projects:** featured work with live demo and source links
5. **Contact:** email and social links

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout (Preloader, Cursor, Navbar, Footer)
│   ├── page.tsx              # Home page
│   └── icon.svg              # Favicon
├── components/
│   ├── ui/
│   │   ├── Preloader.tsx     # 3D intro animation
│   │   ├── CustomCursor.tsx  # Liquid morph cursor
│   │   └── Icons.tsx         # Custom brand icons
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── data/
│   └── portfolioData.ts      # All portfolio content
├── types/
│   └── portfolio.ts          # TypeScript types
└── utils/
    ├── motion.ts             # Shared animation config
    └── scrollToSection.ts    # Smooth scroll helper
```

## Getting Started

### Prerequisites

- Node.js 18.18 or later
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

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint |

## Customization

All content is stored in `src/data/portfolioData.ts`:

```ts
export const personalInfo = { /* name, title, bio, email, location */ };
export const socialLinks = [ /* GitHub, LinkedIn, Email */ ];
export const skillCategories = [ /* skills by category */ ];
export const projects = [ /* featured projects */ ];
```

- **Change the accent color:** replace `#FF7849` across the components with your preferred color.
- **Change preloader duration:** edit `duration` in `Preloader.tsx`.
- **Add a nav section:** add an item to `navItems` and give the section a matching `id`.

## Deployment

Deployed on [Vercel](https://vercel.com). To deploy your own copy:

1. Push the repo to GitHub.
2. Import the project on Vercel.
3. Click **Deploy**. No environment variables are required.

## Featured Projects

| Project | Stack |
|---|---|
| [BazarDor](https://bazar-dor-web-b14-ass-07.vercel.app) | Next.js, TypeScript, Better Auth, MongoDB |
| [FitLog](https://github.com/borshon07/B-14-A06--FitLog-by-Borshon) | Next.js, Tailwind CSS, DaisyUI |
| [DevStack Builder](https://github.com/borshon07/B-14-A05--DevStack-) | React, TypeScript, Vite |

## Contact

**Borshon Roy**, Web Developer, Bangladesh

- Portfolio: [borshon-roy-2-1.vercel.app](https://borshon-roy-2-1.vercel.app/)
- Email: borshonroy73@gmail.com
- GitHub: [@borshon07](https://github.com/borshon07)
- LinkedIn: [borshon-roy09](https://www.linkedin.com/in/borshon-roy09/)

---

<div align="center">

Designed & built by Borshon Roy

</div>