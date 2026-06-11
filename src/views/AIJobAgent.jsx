"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useCosmicTransition } from "../hooks/useCosmicTransition";
import InfoPanel from "../components/InfoPanel";

export function AutonomousPipeline({ onClick }) {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const pulseRefs = useRef([]);
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

  const nodes = [
    { name: "Scraper Engine", tech: "Playwright / BS4", pos: [1.4, 0.4, 0] },
    { name: "LLM Evaluator", tech: "LangChain / OpenAI", pos: [-0.7, -0.3, 1.21] },
    { name: "Auto-Submitter", tech: "Browser Actions", pos: [-0.7, 0.3, -1.21] },
  ];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate and oscillate the entire pipeline group
    if (groupRef.current) {
      groupRef.current.position.y = 0.5 + Math.sin(time * 1.5) * 0.1;
      groupRef.current.rotation.y = time * 0.25;
    }

    // Pulse the core agent sphere
    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(time * 4.0) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
      coreRef.current.rotation.x += 0.005;
      coreRef.current.rotation.y += 0.01;
    }

    // Update travelling pulse positions
    pulseRefs.current.forEach((pulse, idx) => {
      if (pulse) {
        const start = new THREE.Vector3(0, 0, 0);
        const end = new THREE.Vector3(...nodes[idx].pos);
        const cycle = 1.6; // duration of a cycle
        const progress = ((time + idx * 0.53) % cycle) / cycle;
        pulse.position.lerpVectors(start, end, progress);
      }
    });
  });

  return (
    <group
      ref={groupRef}
      scale={[0.75, 0.75, 0.75]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      {/* Central Agent Core */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.42]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.2}
        />
        <pointLight
          color="#10b981"
          intensity={2.5}
          distance={4.0}
          position={[0, 0, 0]}
        />
      </mesh>

      {/* Orbiting Satellite Nodes */}
      {nodes.map((node, idx) => {
        const linePoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...node.pos)];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);

        return (
          <group key={idx} position={node.pos}>
            {/* Satellite Node Geometry */}
            <mesh>
              <octahedronGeometry args={[0.16]} />
              <meshStandardMaterial
                color="#047857"
                emissive="#10b981"
                emissiveIntensity={0.6}
                metalness={0.9}
                roughness={0.1}
                transparent
                opacity={0.9}
              />
            </mesh>

            {/* Glowing boundary line */}
            <lineSegments>
              <edgesGeometry args={[new THREE.OctahedronGeometry(0.16)]} />
              <lineBasicMaterial color="#34d399" linewidth={1} />
            </lineSegments>

            {/* Label HTML */}
            <Html position={[0, 0.4, 0]} center distanceFactor={6}>
              <div className="font-mono text-[10px] text-[#34d399] whitespace-nowrap bg-black/85 px-2.5 py-1 rounded border border-[#10b981]/30 pointer-events-none select-none flex flex-col items-center gap-0.5 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                <span className="font-bold text-white">{node.name}</span>
                <span className="text-[8px] text-[#a7f3d0] block">{node.tech}</span>
              </div>
            </Html>
          </group>
        );
      })}

      {/* Connecting Network Lines & Traveling Data Pulses */}
      {nodes.map((node, idx) => {
        const linePoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...node.pos)];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);

        return (
          <group key={`conn-${idx}`}>
            <line geometry={lineGeo}>
              <lineBasicMaterial color="#059669" opacity={0.4} transparent />
            </line>

            {/* Dynamic Traveling Data Pulse */}
            <mesh ref={(el) => (pulseRefs.current[idx] = el)}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshStandardMaterial
                color="#34d399"
                emissive="#34d399"
                emissiveIntensity={2.0}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function AIJobAgent({ isOpen, setIsOpen }) {
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
        tag="AGENTIC AI · AUTOMATION"
        title="AI Job Agent"
        description="Autonomous, agentic job search and application pipeline scraping listings, scoring matches with LLM orchestrators, and auto-submitting forms via browser automation."
        techStack={["FastAPI", "LangChain", "Supabase", "Next.js", "Python", "Playwright"]}
        results={[
          "Scraping: Playwright / BS4",
          "Orchestration: LangChain",
          "Database: Supabase Storage",
          "Frontend: Next.js Dashboard",
        ]}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        primaryLink={{
          text: "View on GitHub →",
          url: "https://github.com/Rishabh02104/AI_Job_Agent",
        }}
      />
    </div>
  );
}
