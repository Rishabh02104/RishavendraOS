"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { X, Mail, ExternalLink, FileText, CheckCircle } from "lucide-react";

export default function RecruiterMode({ onClose }: { onClose?: () => void }) {
  const { setView } = useApp();

  return (
    <div
      className="fixed inset-0 z-40 h-full w-full flex items-center justify-center p-4 md:p-8 overflow-y-auto animate-in fade-in duration-300"
      style={{ background: "rgba(8, 8, 8, 0.85)", backdropFilter: "blur(12px)" }}
    >
      <div className="relative w-full max-w-5xl h-auto max-h-[90vh] glass-panel rounded-3xl p-6 md:p-10 flex flex-col space-y-8 overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose || (() => setView("main"))}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white font-mono">Rishavendra Sharma</h1>
            <h2 className="text-lg font-mono text-accent mt-1">AI Developer & Full Stack Builder</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Email Contact Badge */}
            <a
              href="mailto:rishavendrasharma9353@gmail.com"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer text-xs font-mono shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
              title="Email"
            >
              <Mail size={15} className="text-accent" />
              <span>rishavendrasharma9353@gmail.com</span>
            </a>

            {/* GitHub Badge */}
            <a
              href="https://github.com/Rishabh02104"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer text-xs font-mono shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
              title="GitHub"
            >
              {/* Inline GitHub SVG */}
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>GitHub</span>
            </a>

            {/* LinkedIn Badge */}
            <a
              href="https://www.linkedin.com/in/rishavendra-sharma-94b8ba286/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer text-xs font-mono shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
              title="LinkedIn"
            >
              {/* Inline LinkedIn SVG */}
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Core Snapshot */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-mono text-accent uppercase tracking-widest">Profile Snapshot</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Computer Science and Engineering student developer focused on translating complex problems into robust, practical software products.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono text-accent uppercase tracking-widest">Resume Actions</h3>
              <div className="flex flex-col gap-2">
                <a
                  href="/assets/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all cursor-pointer font-sans"
                >
                  <FileText size={16} className="text-accent" /> View Resume
                </a>
                <a
                  href="/assets/resume.pdf"
                  download="Rishavendra_Sharma_Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-accent text-black font-bold text-sm hover:bg-accent-secondary transition-all cursor-pointer font-sans"
                >
                  <FileText size={16} /> Download Resume
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Evidence-Based Skills */}
          <div className="space-y-6">
            <h3 className="text-xs font-mono text-accent uppercase tracking-widest">Evidence of Skills</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="block text-sm font-bold text-white">AI & Machine Learning</span>
                <p className="text-xs text-text-secondary leading-relaxed flex items-start gap-1.5">
                  <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                  CareerForge parser backend (JSON schemas, semantic validation, OpenAI integration).
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="block text-sm font-bold text-white">Computer Vision</span>
                <p className="text-xs text-text-secondary leading-relaxed flex items-start gap-1.5">
                  <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                  Road Dimension estimation algorithms using custom CNNs, pixel conversion, and OpenCV.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="block text-sm font-bold text-white">Full Stack Engineering</span>
                <p className="text-xs text-text-secondary leading-relaxed flex items-start gap-1.5">
                  <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                  Next.js, TypeScript, Tailwind CSS, REST APIs, and Supabase database modeling.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="block text-sm font-bold text-white">Cryptographic Security</span>
                <p className="text-xs text-text-secondary leading-relaxed flex items-start gap-1.5">
                  <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                  Visual Cryptography pixel share-splitting algorithms and ballot secrecy protocols (Secure Voting concept).
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="block text-sm font-bold text-white">Agentic AI & Automation</span>
                <p className="text-xs text-text-secondary leading-relaxed flex items-start gap-1.5">
                  <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                  Autonomous job-hunting pipelines utilizing LLM orchestrators, structured data schema verification, and scraper automation (AI Job Agent).
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Flagship Projects */}
          <div className="space-y-6">
            <h3 className="text-xs font-mono text-accent uppercase tracking-widest">Flagship Projects</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">CareerForge</span>
                  <a
                    href="https://careerforge-ai-red.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-secondary"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="text-xs text-text-secondary">
                  ATS Optimizer, resume scanner, and dynamic interview coach.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Road Detection</span>
                  <a
                    href="https://github.com/Rishabh02104/drone-binary-terrain-mapping"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-secondary"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="text-xs text-text-secondary">
                  Binary terrain classification and estimation of road dimension metrics.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Secure Voting</span>
                  <a
                    href="https://secure-voting-iota.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-secondary"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="text-xs text-text-secondary">
                  Visual cryptography voting system concept splitting ballot information into secure shares.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">AI Job Agent</span>
                  <a
                    href="https://github.com/Rishabh02104/AI_Job_Agent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-secondary"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="text-xs text-text-secondary">
                  Autonomous, agentic job search and application pipeline scraping listings, scoring matches, and auto-submitting forms.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
