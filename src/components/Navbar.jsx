"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Navbar({
  onRecruiterClick,
}) {
  const location = useLocation();

  return (
    <nav 
      className="flex items-center justify-between select-none pointer-events-auto border-none"
      style={{
        height: "54px",
        padding: "0 24px",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        background: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
      }}
    >
      {/* Brand Logo */}
      <Link
        to="/"
        className="font-mono transition-colors duration-300"
        style={{
          fontSize: "14px",
          letterSpacing: "0.2em",
          padding: 0,
          margin: 0,
          color: "#ffffff",
          fontWeight: 500,
        }}
      >
        RISHAVENDRA OS
      </Link>

      {/* Recruiter button trigger */}
      <button
        onClick={onRecruiterClick}
        className="flex items-center gap-2 border border-[#FF9F00]/50 bg-transparent hover:bg-[#FF9F00]/10 hover:border-[#FF9F00] hover:shadow-[0_0_15px_rgba(255,159,0,0.35)] text-white transition-all cursor-pointer font-mono font-bold"
        style={{
          padding: "8px 16px",
          fontSize: "12.5px",
          borderRadius: "20px",
        }}
      >
        <Shield size={13} className="text-[#FF9F00]" style={{ filter: "drop-shadow(0 0 3px rgba(255,159,0,0.5))" }} />
        RECRUITER MODE
      </button>
    </nav>
  );
}
