"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, ExternalLink, Cpu } from "lucide-react";

export default function InfoPanel({
  tag,
  title,
  description,
  techStack = [],
  results = [],
  accuracyNote,
  primaryLink,
  secondaryAction,
  isOpen,
  onClose,
}) {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={isOpen ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
      className="fixed top-0 right-0 h-full z-40 flex flex-col bg-black/60 backdrop-blur-xl border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.85)] select-none text-white info-panel-width pointer-events-auto"
      style={{
        width: "38vw",
        maxWidth: "38vw",
        overflow: "hidden",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      {/* Header bar */}
      <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-5 shrink-0">
        <div className="space-y-1">
          <span className="text-[9px] font-mono font-bold tracking-widest text-accent uppercase bg-accent/10 border border-accent/30 px-2.5 py-0.5 rounded-full">
            {tag}
          </span>
          <h2 
            className="font-sans text-gradient pt-2 leading-none"
            style={{
              fontSize: "clamp(18px, 2.5vw, 28px)",
              whiteSpace: "normal",
              fontWeight: "900",
            }}
          >
            {title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer shrink-0"
        >
          <X size={16} />
        </button>
      </div>

      {/* Main Content Body (scrollable inside the hidden container) */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-6 panel-text-wrap min-h-0">
        {/* Project Description */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">
            Overview
          </h3>
          <p className="text-xs font-sans text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tech Stack Pills */}
        {techStack.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-sans text-text-secondary hover:border-white/25 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Project Results */}
        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">
              Key Metrics & Parameters
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {results.map((result) => (
                <div
                  key={result}
                  className="p-2.5 rounded-lg bg-surface-2 border border-white/5 text-[11px] font-mono text-center text-white/90"
                >
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accuracy Alert Note */}
        {accuracyNote && (
          <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 text-[11px] font-sans text-text-secondary leading-relaxed flex items-start gap-2.5">
            <Cpu size={14} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">Development status</span>
              {accuracyNote}
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA Buttons */}
      <div className="border-t border-white/10 pt-4 mt-5 space-y-2.5 shrink-0">
        {primaryLink && (
          <a
            href={primaryLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-accent text-black font-bold text-xs hover:bg-accent-secondary hover:shadow-[0_0_20px_rgba(94,168,255,0.35)] transition-all cursor-pointer font-sans"
          >
            {primaryLink.text}
            <ExternalLink size={12} />
          </a>
        )}

        {secondaryAction && (
          <button
            onClick={secondaryAction.action}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs transition-all cursor-pointer font-sans"
          >
            {secondaryAction.text}
          </button>
        )}
      </div>
    </motion.div>
  );
}
