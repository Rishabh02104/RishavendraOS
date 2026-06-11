"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import { useCosmicTransition } from "../hooks/useCosmicTransition";
import InfoPanel from "../components/InfoPanel";

export function SystemArchitecture({ onClick }) {
  const groupRef = useRef(null);
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

  const layers = [
    { name: "User Interface", y: 1.8, tech: "Next.js / TS" },
    { name: "AI Layer", y: 0.9, tech: "OpenAI / LLMs" },
    { name: "Logic Layer", y: 0.0, tech: "Node / Python" },
    { name: "Data Layer", y: -0.9, tech: "Postgres / Redis" },
    { name: "Infrastructure", y: -1.8, tech: "Docker / AWS" },
  ];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Centered at x=0, fixed at y=0, no floating animation
    if (groupRef.current) {
      groupRef.current.position.x = 0;
      groupRef.current.position.y = 0;
      groupRef.current.rotation.y = time * 0.15;
    }

    // Update position of the traveling pulses on the 4 segments
    pulseRefs.current.forEach((pulse, idx) => {
      if (pulse) {
        const topY = layers[idx].y - 0.125;      // bottom of upper box
        const bottomY = layers[idx + 1].y + 0.125; // top of lower box
        const speed = 1.5; // duration of one pulse cycle
        const progress = ((time + idx * 0.35) % speed) / speed;
        pulse.position.y = topY + (bottomY - topY) * progress;
      }
    });
  });

  return (
    <group
      ref={groupRef}
      scale={[0.85, 0.85, 0.85]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      {/* 5 Stacked Layer Boxes */}
      {layers.map((layer, i) => (
        <group key={i} position={[0, layer.y, 0]}>
          {/* Main box geometry */}
          <mesh>
            <boxGeometry args={[2.0, 0.25, 0.4]} />
            <meshStandardMaterial
              color="#1a0a2e"
              emissive="#5EA8FF"
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Border glow effect using EdgesGeometry */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(2.0, 0.25, 0.4)]} />
            <lineBasicMaterial color="#5EA8FF" linewidth={1} />
          </lineSegments>

          {/* Layer labels (Html from Drei) on the right of the box */}
          <Html position={[1.2, 0, 0]} center>
            <div className="font-mono text-[11px] text-[#a78bfa] whitespace-nowrap bg-black/80 px-2.5 py-1 rounded border border-white/10 pointer-events-none select-none flex flex-col items-start gap-0.5">
              <span>{layer.name}</span>
              {layer.tech && (
                <span className="text-[9px] text-[#5ea8ff] block">
                  {layer.tech}
                </span>
              )}
            </div>
          </Html>
        </group>
      ))}

      {/* Connect layers with vertical line geometry (4 segments) */}
      {Array.from({ length: 4 }).map((_, i) => {
        const topY = layers[i].y - 0.125;
        const bottomY = layers[i + 1].y + 0.125;
        const points = [new THREE.Vector3(0, topY, 0), new THREE.Vector3(0, bottomY, 0)];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <group key={i}>
            <line geometry={lineGeometry}>
              <lineBasicMaterial color="#7EE7FF" opacity={0.4} transparent />
            </line>

            {/* Pulse traveling downward */}
            <mesh ref={(el) => (pulseRefs.current[i] = el)}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial
                color="#7EE7FF"
                emissive="#7EE7FF"
                emissiveIntensity={1.5}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function ProductBuilding({ isOpen, setIsOpen }) {
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
        tag="PRODUCT · EXECUTION"
        title="Product Building"
        description="Transforming abstract ideas into highly responsive and functional digital products. Prioritizing strict system scopes, layout feedback, scalability, and optimal user experiences."
        techStack={["System Architecture", "Scalability", "Ecosystem Mapping", "Feedback Loops"]}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
