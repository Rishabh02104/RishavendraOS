"use client";

import React, { useState, useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, useGLTF, Html } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import BrainModel from "../components/BrainModel";

// Preload brain model at the top level
useGLTF.preload("/assets/brain_hologram.glb");

// Loading indicator shown inside the WebGL canvas context
function LoadingScreen() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center pointer-events-none select-none">
        {/* Pulsing wireframe circle and elegant synchronizing message */}
        <div className="w-10 h-10 rounded-full border border-dashed border-[#5ea8ff]/50 animate-spin mb-4" />
        <span className="text-[9px] font-mono tracking-[0.25em] text-[#5ea8ff] uppercase animate-pulse">
          CONNECTING SYNAPSE MATRIX
        </span>
      </div>
    </Html>
  );
}



// Camera LERP controller managed via GSAP Tweens
function CameraController({ isInspected }) {
  const { camera } = useThree();

  useEffect(() => {
    // Zoom in on inspect: pos moves to z=4.5, y=0.3. Default is z=5.8, y=0.5
    const targetZ = isInspected ? 4.5 : 5.8;
    const targetY = isInspected ? 0.3 : 0.5;

    gsap.to(camera.position, {
      x: 0,
      y: targetY,
      z: targetZ,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
    });
  }, [isInspected, camera]);

  return null;
}

export default function MainScene({ isInspected, setIsInspected }) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("explore-hint-seen");
    if (!seen) {
      setShowHint(true);
      const timer = setTimeout(() => {
        localStorage.setItem("explore-hint-seen", "true");
        setShowHint(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="relative flex-1 w-full h-screen overflow-hidden bg-transparent text-white pointer-events-none">
      {/* Top Center Title Overlay (Always visible on home page) */}
      <div 
        className="animate-fade-in"
        style={{
          position: "absolute",
          top: "72px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <h1 
          style={{
            fontSize: "clamp(16px, 2.5vw, 24px)",
            letterSpacing: "0.25em",
            color: "#ffffff",
            textShadow: "0 2px 4px rgba(0,0,0,0.8)",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: "bold",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          RISHAVENDRA SHARMA
        </h1>
        <p 
          style={{
            fontSize: "clamp(10px, 1.2vw, 13px)",
            letterSpacing: "0.3em",
            color: "#FFF200",
            textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(255,242,0,0.25)",
            marginTop: "10px",
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 0,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            fontWeight: "bold",
          }}
        >
          AI Developer & Full Stack Developer
        </p>
      </div>


      {/* Subtle click hint (fades out after 3s on first load only) */}
      {showHint && !isInspected && (
        <>
          <style>{`
            @keyframes fadeOutHint {
              0% { opacity: 1; }
              70% { opacity: 1; }
              100% { opacity: 0; }
            }
            .explore-hint {
              animation: fadeOutHint 3s forwards;
            }
          `}</style>
          <div 
            className="explore-hint"
            style={{
              position: "absolute",
              bottom: "48px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(167,139,250,0.4)",
              pointerEvents: "none",
              zIndex: 10,
              fontFamily: "monospace",
              textAlign: "center",
            }}
          >
            CLICK TO EXPLORE
          </div>
        </>
      )}
    </main>
  );
}
