# Wellonik Client Onboarding Portal
> Handcrafted, premium client onboarding wizard for Wellonik Design Studio.

This is a modern, production-ready, fully responsive full-fledged onboarding dashboard engineered in React, Vite, Tailwind CSS, and Framer Motion. It collects comprehensive business criteria from new clients prior to commencing Social Media Marketing, Meta Ads, Google Ads, Branding, SEO, or Design operations.

## Key Architecture & Premium Capabilities

*   **Multi-Step Wizard Pipeline (10 Steps)**: Covers deep business context, marketing objectives, budgets, competitor portfolios, SWOT metrics, and brand kits.
*   **Draft Auto-Save (Every 30 Seconds)**: Prevents accidental loss of long text entries. Includes manual Draft Restores.
*   **Aesthetic Priority Ranger**: Custom Drag & Drop touch-friendly sorter to rank decision factors (Price, Quality, Support, Trust, etc.).
*   **Rich Dynamic Fields**: Instantly add/remove certifications, competitor records, active campaign offers, or custom hex color pickers.
*   **Dual-Theme Dark & Light Modes**: Seamless visual styling suited for creative teams.
*   **Multi-Format Export & Submission**:
    *   **Download JSON**: Standard payload schemas for developer database imports.
    *   **Print / Download PDF**: Fully styled, printable report templates that bypass sidebars/navbars and fits nicely on A4 pages.
*   **Client Search Jump Engine**: Search for variables (e.g. "budget", "CRM", "SWOT", "language") to jump directly to target steps.
*   **Completion Scoring**: Computes progress percentage based on critical question thresholds.

---

## Technical Stack & Packages

*   **Runtime Framework**: React 19 (TypeScript)
*   **Build Utility**: Vite + Tailwind CSS
*   **Animation Engine**: Framer Motion (imported from `motion/react`)
*   **Icon Library**: Lucide React

---

## Build, Run, and Deployment

### 1. Installation & Local Development
Install dependencies from outer root directory:
```bash
npm install
```

Start the Vite web preview:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Live Production Build
Compile high-efficiency assets:
```bash
npm run build
```
This serves clean, static production structures within the `/dist` directory.

### 3. Netlify Ready Launch
*   A customized `/netlify.toml` file is compiled to correctly proxy all React frontend router links.
*   Drag and drop the compiled `/dist` directory on Netlify App Dashboard, or link your GitHub repository for instantaneous CI/CD.
