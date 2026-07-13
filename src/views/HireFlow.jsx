"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useCosmicTransition } from "../hooks/useCosmicTransition";
import InfoPanel from "../components/InfoPanel";

export function RecruitingFunnel({ onClick }) {
  const groupRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      window.dispatchEvent(new CustomEvent("3d-hover-start"));
    } else {
      window.dispatchEvent(new CustomEvent("3d-hover-end"));
    }
    return () => {
      window.dispatchEvent(new CustomEvent("3d-hover-end"));
    };
  }, [hovered]);

  const rings = [
    { radius: 0.6, y: 0.5, color: "#a78bfa", label: "Sourcing & Parsing" },
    { radius: 0.45, y: 0.0, color: "#7ee7ff", label: "AI Match Scoring" },
    { radius: 0.3, y: -0.5, color: "#4ade80", label: "Shortlisted Candidates" }
  ];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = 0.4 + Math.sin(time * 1.2) * 0.08;
      groupRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={[0.9, 0.9, 0.9]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      {/* Funnel Rings */}
      {rings.map((ring, idx) => (
        <group key={idx} position={[0, ring.y, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[ring.radius, 0.03, 16, 100]} />
            <meshStandardMaterial
              color={ring.color}
              emissive={ring.color}
              emissiveIntensity={1.5}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          <pointLight color={ring.color} intensity={1.5} distance={2.5} />
          
          <Html position={[ring.radius + 0.3, 0, 0]} center distanceFactor={6}>
            <div className="font-mono text-[9px] text-[#e4e4e7] whitespace-nowrap bg-black/80 px-2 py-0.5 rounded border border-white/10 pointer-events-none select-none">
              {ring.label}
            </div>
          </Html>
        </group>
      ))}

      {/* Central Core Ray */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 1.4, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

export default function HireFlow({ isOpen, setIsOpen }) {
  const triggerTransition = useCosmicTransition();

  return (
    <div className="relative flex-1 w-full h-screen overflow-hidden bg-transparent text-white">
      {/* Back button */}
      <div className="absolute top-8 left-8 z-10 pointer-events-auto">
        <button
          onClick={() => triggerTransition("/")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-xs font-bold transition-all cursor-pointer shadow-lg"
        >
          ← BACK TO BRAIN
        </button>
      </div>

      {/* Info panel */}
      <InfoPanel
        tag="RECRUITER AI · SHIPPED"
        title="HireFlow"
        description="AI-powered candidate screening and scoring CRM built for the Gappy AI Hackathon using Lemma SDK, bypassing Auth blocks in Guest Mode with client-side fallback tables."
        techStack={["Next.js", "Lemma SDK", "TypeScript", "OpenAI API", "Supabase"]}
        results={[
          "Screening Matcher: OpenAI Scoring Engine",
          "Interception: Guest Mode local-memory fallback",
          "DB Integration: Lemma Tables SDK",
          "Workflows: Scheduled daily digests & triggers",
        ]}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        primaryLink={{
          text: "View GitHub Repo →",
          url: "https://github.com/Rishabh02104/HireFlow",
        }}
      />
    </div>
  );
}
