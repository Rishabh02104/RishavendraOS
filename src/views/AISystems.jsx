"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { useCosmicTransition } from "../hooks/useCosmicTransition";
import InfoPanel from "../components/InfoPanel";

// Double Helix Spinal Data Stream (LLM Token flow rising upward)
// Constrained to fit within the viewport (height y = [-2.0, 2.0], centered at Y=0)
// Width: 0.8 units total (radius = 0.38)
// 150 particles max, small squares (PlaneGeometry 0.04 x 0.04)
function SpinalDataStream() {
  const pointsRef = useRef(null);
  const lineGeometryRef = useRef(null);
  const count = 200; // 200 per strand = 400 total

  // Generate static initial position buffer
  const positions = useMemo(() => {
    return new Float32Array(count * 2 * 3); // 400 points total
  }, []);

  // Generate lines geometry for the 12 rungs
  const linePositions = useMemo(() => {
    return new Float32Array(12 * 2 * 3); // 12 lines (24 points total)
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array;

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 8; // 4 full rotations
      const radius = 0.4;
      const y = (i / count) * 4 - 2; // spans -2 to +2

      // Strand A
      const xA = Math.cos(t + time * 0.3) * radius;
      const zA = Math.sin(t + time * 0.3) * radius;
      posArray[i * 3] = xA;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = zA;

      // Strand B (opposite phase)
      const xB = Math.cos(t + time * 0.3 + Math.PI) * radius;
      const zB = Math.sin(t + time * 0.3 + Math.PI) * radius;
      posArray[(count + i) * 3] = xB;
      posArray[(count + i) * 3 + 1] = y;
      posArray[(count + i) * 3 + 2] = zB;
    }
    posAttr.needsUpdate = true;

    // Connect strands with 12 evenly-spaced rungs
    if (lineGeometryRef.current) {
      const lineArray = lineGeometryRef.current.attributes.position.array;
      for (let r = 0; r < 12; r++) {
        const i = Math.floor((r / 11) * (count - 1));
        const t = (i / count) * Math.PI * 8;
        const radius = 0.4;
        const y = (i / count) * 4 - 2;

        const xA = Math.cos(t + time * 0.3) * radius;
        const zA = Math.sin(t + time * 0.3) * radius;

        const xB = Math.cos(t + time * 0.3 + Math.PI) * radius;
        const zB = Math.sin(t + time * 0.3 + Math.PI) * radius;

        // Start point (Strand A)
        lineArray[r * 6] = xA;
        lineArray[r * 6 + 1] = y;
        lineArray[r * 6 + 2] = zA;

        // End point (Strand B)
        lineArray[r * 6 + 3] = xB;
        lineArray[r * 6 + 4] = y;
        lineArray[r * 6 + 5] = zB;
      }
      lineGeometryRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 400 Helix Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#8b5cf6"
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>

      {/* 12 evenly spaced rungs */}
      <lineSegments>
        <bufferGeometry ref={lineGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#5ea8ff"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// Spine stream container
export function IntelligenceSpine({ onClick }) {
  const groupRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Handle custom hover pointer states
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

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation on Y
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      {/* Spinal code token data streams (No cylinder/diamond mesh placeholders) */}
      <SpinalDataStream />
    </group>
  );
}

export default function AISystems({ isOpen, setIsOpen }) {
  const triggerTransition = useCosmicTransition();

  // Auto-open overlay panel on mount
  useEffect(() => {
    setIsOpen(true);
  }, [setIsOpen]);

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
        tag="AI · INTELLIGENCE"
        title="AI Systems"
        description="Large Language Models (LLMs), AI mock interview chat agent loops, dynamic JSON response validations, prompt architectures, and structured automation frameworks."
        techStack={["LLMs", "AI Agents", "Automation", "OpenAI", "Groq"]}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
