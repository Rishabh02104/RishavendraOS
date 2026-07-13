"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Shield } from "lucide-react";
import { useCosmicTransition } from "../hooks/useCosmicTransition";

// Inline Custom SVG GitHub Icon for compatibility
function GithubIcon({ size = 12, className = "" }) {
  return (
    <svg
      height={size}
      width={size}
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

// Inline Custom SVG LinkedIn Icon for compatibility
function LinkedinIcon({ size = 12, className = "" }) {
  return (
    <svg
      height={size}
      width={size}
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.676 0 7.225 0 7.225h2.4z" />
    </svg>
  );
}

// Corner HUD brackets component
function PanelBrackets() {
  return (
    <>
      <div className="corner-bracket bracket-tl" />
      <div className="corner-bracket bracket-tr" />
      <div className="corner-bracket bracket-bl" />
      <div className="corner-bracket bracket-br" />
    </>
  );
}

export default function MainScene({ isInspected, setIsInspected, onRecruiterClick }) {
  const triggerTransition = useCosmicTransition();

  // Typewriter effect for Panel 1
  const headlineText = "Building intelligent systems at the intersection of AI · Computer Vision · Full Stack Engineering";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(headlineText.substring(0, i + 1));
      i++;
      if (i >= headlineText.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  // Projects list for Panel 2
  const projects = useMemo(() => [
    { name: "CareerForge", tag: "ACTIVE", route: "/careerforge" },
    { name: "Road Detection", tag: "DONE", route: "/road-detection" },
    { name: "Secure Voting", tag: "RESEARCH", route: "/secure-voting" },
    { name: "HireFlow", tag: "SHIPPED", route: "/hireflow" },
    { name: "AI Job Agent", tag: "ACTIVE", route: "/ai-job-agent" },
    { name: "Computer Vision", tag: "RESEARCH", route: "/computer-vision" },
    { name: "Product Building", tag: "ACTIVE", route: "/product-building" },
    { name: "AI Systems", tag: "ACTIVE", route: "/ai-systems" },
  ], []);

  const getTagClass = (tag) => {
    switch (tag) {
      case "ACTIVE":
        return "bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20";
      case "DONE":
        return "bg-zinc-500/10 text-[#71717a] border border-zinc-500/20";
      case "RESEARCH":
        return "bg-[#5ea8ff]/10 text-[#5ea8ff] border border-[#5ea8ff]/20";
      case "SHIPPED":
        return "bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/20";
      default:
        return "";
    }
  };

  const handleProjectClick = (project) => {
    if (project.route.startsWith("http")) {
      window.open(project.route, "_blank");
    } else {
      triggerTransition(project.route);
    }
  };

  return (
    <>
      <style>{`
        @keyframes bentoFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes blink-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .bento-panel {
          animation: bentoFadeIn 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          background: rgba(4, 2, 10, 0.7) !important;
          border: 1px solid rgba(0, 229, 255, 0.08) !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(0, 229, 255, 0.01);
          backdrop-filter: none;
          box-sizing: border-box;
          pointer-events: auto;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .bento-panel:hover {
          border-color: rgba(0, 229, 255, 0.4) !important;
          box-shadow: 0 4px 30px rgba(0, 229, 255, 0.12), inset 0 0 15px rgba(0, 229, 255, 0.03);
        }
        .corner-bracket {
          position: absolute;
          width: 5px;
          height: 5px;
          border-color: rgba(0, 229, 255, 0.5);
          border-style: solid;
          pointer-events: none;
          transition: border-color 0.3s ease;
        }
        .bento-panel:hover .corner-bracket {
          border-color: rgba(0, 229, 255, 1);
        }
        .bracket-tl { top: -1px; left: -1px; border-width: 1.5px 0 0 1.5px; }
        .bracket-tr { top: -1px; right: -1px; border-width: 1.5px 1.5px 0 0; }
        .bracket-bl { bottom: -1px; left: -1px; border-width: 0 0 1.5px 1.5px; }
        .bracket-br { bottom: -1px; right: -1px; border-width: 0 1.5px 1.5px 0; }
        
        .project-item {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 12px;
          color: #a1a1aa;
          border-left: 2px solid transparent;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .project-item:hover {
          color: #00E5FF;
          border-left-color: #00E5FF;
          padding-left: 8px;
          text-shadow: 0 0 8px rgba(0, 229, 255, 0.5);
        }
        .holo-scanner {
          position: relative;
          overflow: hidden;
        }
        .holo-scanner::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 229, 255, 0) 0%,
            rgba(0, 229, 255, 0.15) 50%,
            rgba(0, 229, 255, 0) 100%
          );
          background-size: 100% 20px;
          animation: scanline 5s linear infinite;
          pointer-events: none;
        }
        .hud-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #00FF41;
          box-shadow: 0 0 8px #00FF41;
          display: inline-block;
          animation: blink-slow 2s infinite;
        }
      `}</style>

      {/* PANEL 1 — TOP FULL WIDTH (headline bar) */}
      <div 
        className="bento-panel col-span-1 md:col-span-3 md:row-start-1 flex items-center justify-between px-6 py-3 md:py-0 font-mono text-[11px] text-[#00E5FF] tracking-[0.12em]"
        style={{ animationDelay: "0ms" }}
      >
        <PanelBrackets />
        <div className="flex items-center gap-2.5 flex-1 select-none pr-4">
          <span className="hud-dot" />
          <span className="text-[9px] text-[#00E5FF]/40 mr-1 select-none">[0x7F_SYSTEM]</span>
          <span>{typedText}</span>
          <span className="animate-pulse ml-0.5 text-[#5ea8ff]">_</span>
        </div>
        <button
          onClick={onRecruiterClick}
          className="flex items-center gap-2 border border-[#FF9F00]/50 bg-transparent hover:bg-[#FF9F00]/10 hover:border-[#FF9F00] hover:shadow-[0_0_15px_rgba(255,159,0,0.35)] text-white transition-all cursor-pointer font-mono font-bold px-4 py-1.5 text-[11px] rounded-full shrink-0"
        >
          <Shield size={11} className="text-[#FF9F00]" />
          RECRUITER MODE
        </button>
      </div>

      {/* PANEL 2 — LEFT TOP (Project Titles) */}
      <div 
        className="bento-panel col-span-1 md:col-start-1 md:row-start-2 p-5 flex flex-col gap-[14px] overflow-y-auto"
        style={{ animationDelay: "80ms" }}
      >
        <PanelBrackets />
        <span className="absolute top-2 right-3 font-mono text-[7px] text-[#00E5FF]/30 tracking-widest uppercase pointer-events-none">[ NET_MAP.SYS ]</span>
        <span className="font-mono text-[8px] text-[#71717a] tracking-[0.25em] uppercase select-none mb-1">COGNITIVE_DIRECTORY</span>
        {projects.map((project, idx) => (
          <div
            key={idx}
            onClick={() => handleProjectClick(project)}
            className="project-item flex items-center justify-between w-full text-left"
          >
            <span>→ {project.name}</span>
            <span className={`text-[7px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full ${getTagClass(project.tag)}`}>
              {project.tag}
            </span>
          </div>
        ))}
      </div>

      {/* PANEL 4 — RIGHT TOP (Identity card) */}
      <div 
        className="bento-panel col-span-1 md:col-start-3 md:row-start-2 p-4 font-mono flex flex-col justify-between"
        style={{ animationDelay: "160ms" }}
      >
        <PanelBrackets />
        <span className="absolute top-2 right-3 font-mono text-[7px] text-[#00E5FF]/30 tracking-widest uppercase pointer-events-none">[ IDENT_v2.0 ]</span>
        <div className="flex flex-col gap-2">
          <div className="holo-scanner rounded-lg overflow-hidden border border-white/5 bg-[#030108] mb-2 select-none relative">
            <img 
              src="/assets/Rishabh.png" 
              alt="Rishavendra Sharma" 
              className="w-full h-auto object-contain select-none max-h-[160px] mx-auto block"
            />
          </div>
          <div className="text-[10px] text-[#e4e4e7] leading-[1.8] select-text">
            <div><span className="text-[#00E5FF]">&gt;</span> Rishavendra Sharma</div>
            <div><span className="text-[#00E5FF]">&gt;</span> B.Tech CSE · 2026</div>
            <div><span className="text-[#00E5FF]">&gt;</span> Gujarat, India</div>
            <div><span className="text-[#00E5FF]">&gt;</span> Open to Software, frontend & AI developer role<span className="animate-pulse text-[#00E5FF]">_</span></div>
          </div>
        </div>
        
        {/* GH / LI Buttons */}
        <div className="flex gap-2 mt-4 z-10 pointer-events-auto">
          <a
            href="https://github.com/Rishabh02104"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-[#00E5FF]/10 hover:border-[#00E5FF] text-white text-[10px] transition-all cursor-pointer"
          >
            <GithubIcon size={11} className="text-[#00E5FF]" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/rishavendra-sharma-94b8ba286/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-[#00E5FF]/10 hover:border-[#00E5FF] text-white text-[10px] transition-all cursor-pointer"
          >
            <LinkedinIcon size={11} className="text-[#00E5FF]" />
            LinkedIn
          </a>
        </div>
      </div>

      {/* PANEL 5 — LEFT BOTTOM (Tech Stack) */}
      <div 
        className="bento-panel col-span-1 md:col-start-1 md:row-start-3 p-3.5 flex flex-col gap-2 justify-center"
        style={{ animationDelay: "240ms" }}
      >
        <PanelBrackets />
        <span className="absolute top-2 right-3 font-mono text-[7px] text-[#00E5FF]/30 tracking-widest uppercase pointer-events-none">[ CORE_STACK ]</span>
        <span className="font-mono text-[8px] text-[#71717a] tracking-[0.2em] uppercase select-none">STACK_REGISTRY</span>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1">
            {["Next.js", "TypeScript", "Python", "FastAPI"].map((tech, idx) => (
              <span 
                key={idx} 
                className="font-mono text-[8px] text-[#00E5FF] bg-[#00E5FF]/[0.08] border border-[#00E5FF]/20 rounded px-2 py-0.5 whitespace-nowrap select-none"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {["Supabase", "Three.js", "OpenCV", "Groq"].map((tech, idx) => (
              <span 
                key={idx} 
                className="font-mono text-[8px] text-[#00E5FF] bg-[#00E5FF]/[0.08] border border-[#00E5FF]/20 rounded px-2 py-0.5 whitespace-nowrap select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PANEL 7 — RIGHT BOTTOM (GitHub / Stats) */}
      <div 
        className="bento-panel col-span-1 md:col-start-3 md:row-start-3 p-3.5 flex flex-col justify-between gap-3"
        style={{ animationDelay: "320ms" }}
      >
        <PanelBrackets />
        <span className="absolute top-2 right-3 font-mono text-[7px] text-[#00E5FF]/30 tracking-widest uppercase pointer-events-none">[ STATS_LOBE ]</span>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[8px] text-[#71717a] tracking-[0.2em] uppercase select-none">TELEMETRY_STATISTICS</span>
          <div className="flex justify-start gap-8">
            <div className="flex flex-col select-none">
              <span className="font-sans text-[22px] font-bold text-[#e4e4e7] leading-none">9</span>
              <span className="font-mono text-[8px] text-[#71717a] mt-1">repos</span>
            </div>
            <div className="flex flex-col select-none">
              <span className="font-sans text-[22px] font-bold text-[#e4e4e7] leading-none">1</span>
              <span className="font-mono text-[8px] text-[#71717a] mt-1">shipped</span>
            </div>
          </div>
        </div>

        <a
          href="https://github.com/Rishabh02104"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-left text-[10px] text-[#00E5FF] hover:text-[#7ee7ff] border-b border-[#00E5FF]/30 hover:border-[#7ee7ff] pb-0.5 transition-all select-none font-mono"
        >
          github.com/Rishabh02104 →
        </a>
      </div>
    </>
  );
}
