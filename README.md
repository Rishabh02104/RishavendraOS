# 🌌 RishavendraOS — Cybernetic Portfolio OS

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=flat-square&logo=three.js)](https://threejs.org)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

An immersive, interactive, WebGL-powered 3D Operating System portfolio displaying cutting-edge AI Agent pipelines, computer vision models, full-stack architectures, and visual cryptography concepts. Built with **Next.js**, **React Three Fiber (R3F)**, **Framer Motion**, and **custom GLSL Shaders**.

---

## 🚀 Key Visual & System Features

### 🧠 1. 3D Brain Synapse Navigation
- **Holographic Point-Cloud**: The home screen features an interactive 3D brain model loaded from a GLTF asset and rendered using a custom-themed white-gray holographic shader (`holographicShader.js`).
- **Interactive Hotspots**: The brain features glowing **Electric Cyan** (`#00E5FF`) clickable lobe synapses representing different professional domains and projects (Frontal Lobe, Parietal Lobe, Prefrontal Cortex, etc.).
- **Interactive Parallax**: Dynamic mouse parallax and ambient floating dust particles shift coordinates based on cursor positioning.

### 💼 2. Recruiter Mode Dashboard
- **Translucent UI Overlay**: Activating **Recruiter Mode** overlay renders a modern translucent panel (`rgba(8, 8, 8, 0.85)` + `12px` backdrop blur) while scaling the 3D brain to `0.7` scale and `0.3` opacity in the background.
- **Evidence of Skills**: Quick-glance checkboxes mapping skills to actual, verified outcomes in the project codebase.
- **Direct Resume Actions**: Embedded options to open `/assets/resume.pdf` in a new tab or trigger a direct download.

### 🎨 3. Cinematic 3D Watermark Rain
- **Integrated Billboard Plane**: Customized falling matrix-rain characters spelling `"HIRE ME "` rendered on an offscreen 2D canvas texture and mapped to a background billboard at `z = -8`.
- **Depth Pre-Pass Masking**: Implemented an invisible depth pre-pass in the brain model to block the matrix background from drawing inside the brain cloud, maintaining clean point-cloud boundaries.
- **Post-Processing Stack**: Outfitted the global WebGL canvas with cinematic **Bloom**, **Vignette**, and **Chromatic Aberration** effects.

---

## 📂 Interactive Project Worlds

Every project synapse opens up a dedicated 3D interactive viewport:

1. **AI Job Agent** (`/ai-job-agent`)
   - **Visuals**: A custom procedural `AutonomousPipeline` modeling a central green agent core (`#10b981`) communicating with orbiting Scraper, LLM Matcher, and Form Submitter satellite nodes.
   - **Concept**: Fully autonomous job search and application pipeline scraping listings, scoring matches with LLMs (LangChain/OpenAI), and auto-submitting forms.
2. **CareerForge** (`/careerforge`)
   - **Visuals**: A highly detailed 3D laptop model with a functional open angle (`103°`) and high-intensity blue emissive screen glow (`#5ea8ff`).
   - **Concept**: ATS Optimizer, resume scanner, and dynamic interview coach.
3. **Road Detection** (`/road-detection`)
   - **Visuals**: A procedural wireframe drone model with dynamic Y-axis drift, spinning rotors, and a scale-decoupled scanner cone projecting onto a binary terrain map.
   - **Concept**: Binary terrain classification and estimation of road dimension metrics.
4. **Secure Voting** (`/secure-voting`)
   - **Visuals**: A rotating vault core emitted in emerald light (`#a7f3d0`) surrounded by eight orbiting octahedra.
   - **Concept**: Visual cryptography voting concept splitting ballot information into secure, reconstructible shares.
5. **Computer Vision** (`/computer-vision`)
   - **Visuals**: A horizontal CNN architecture model showing Input, Conv, Pool, Dense, and Output layers connected by a glowing tube with cyan pulses.
   - **Concept**: Custom CNN layer modeling and OpenCV features.
6. **Product Building** (`/product-building`)
   - **Visuals**: A 3D System Architecture diagram stacking UI, AI, Logic, Data, and Infra layers with downward-traveling data pulses.
   - **Concept**: Abstract architectural stacking and ecosystem mapping.
7. **AI Systems** (`/ai-systems`)
   - **Visuals**: A floating 3D double helix Intelligence Spine representing deep neural networks.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (using Turbopack)
- **3D Engine**: [Three.js](https://threejs.org/), [@react-three/fiber](https://github.com/pmndrs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation**: [GSAP (GreenSock)](https://greensock.com/gsap/) (for camera controls), [Framer Motion](https://www.framer.com/motion/) (for HTML overlays)
- **Styling**: Vanilla CSS, Tailwind CSS
- **Post-Processing**: `@react-three/postprocessing`
- **Icons**: `lucide-react`

---

## 💻 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rishabh02104/RishavendraOS.git
   cd RishavendraOS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

To create an optimized production build:
```bash
npm run build
npm run start
```

---

## 🏛️ Project Structure

```text
RishavendraOS/
├── public/
│   └── assets/            # Static 3D Models (.glb) & PDF Resume
├── src/
│   ├── app/               # Next.js App Router root & global styling
│   ├── components/        # Shared components (BrainModel, InfoPanel, Navbar, etc.)
│   ├── context/           # App state context
│   ├── hooks/             # Custom React hooks (Transitions, etc.)
│   ├── shaders/           # Custom GLSL Shaders (Vertex & Fragment)
│   └── views/             # Project-specific overlay pages and 3D scenes
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
