"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { useCosmicTransition } from "../hooks/useCosmicTransition";
import InfoPanel from "../components/InfoPanel";

export function VaultModel({ onVaultClick, isOpen }) {
  const groupRef = useRef(null);
  const outerRingRef = useRef(null);
  const innerRingRef = useRef(null);
  const coreRef = useRef(null);
  const octahedraRefs = useRef([]);
  const [hovered, setHovered] = useState(false);

  // 8 floating octahedra speed and angles
  const octahedra = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      // Fixed speed between 0.008 and 0.015
      const speed = 0.008 + (i % 3) * 0.002 + Math.random() * 0.001;
      return { angle, speed };
    });
  }, []);

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
    const t = state.clock.getElapsedTime();

    // 1. Rotate outer ring on Y-axis at 0.004 rad/frame
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y += 0.004;
    }

    // 2. Rotate second ring perpendicular Y-axis at -0.003 rad/frame
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y -= 0.003;
    }

    // 3. Core sphere pulsing scale: Math.sin(t) * 0.05 + 1.0
    if (coreRef.current) {
      const pulse = Math.sin(t * 2.5) * 0.05 + 1.0;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // 4. Orbit 8 octahedra at radius=1.0 at 0.008-0.015 rad/frame
    octahedra.forEach((oct, i) => {
      const ref = octahedraRefs.current[i];
      if (ref) {
        oct.angle += oct.speed;
        const radius = 1.0;
        ref.position.x = Math.cos(oct.angle) * radius;
        ref.position.z = Math.sin(oct.angle) * radius;
        ref.position.y = Math.sin(t * 2.0 + i) * 0.08; // subtle floating oscillation
        ref.rotation.x += 0.01;
        ref.rotation.y += 0.015;
      }
    });

    // Slow rotate overall vault group
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0.5, 0]}
      scale={[0.5, 0.5, 0.5]} // Scale entire vault group by 0.5
      onClick={(e) => {
        e.stopPropagation();
        onVaultClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.4, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#5EA8FF"
          emissive="#5EA8FF"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Second perpendicular ring */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.4, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#5EA8FF"
          emissive="#5EA8FF"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Core Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#a7f3d0"
          emissive="#a7f3d0"
          emissiveIntensity={1.2}
          metalness={0.3}
          roughness={0.4}
        />
        <pointLight
          color="#a7f3d0"
          intensity={3.0}
          distance={3.0}
          position={[0, 0, 0]}
        />
      </mesh>

      {/* 8 Floating Octahedra Orbiting the Vault */}
      {octahedra.map((oct, i) => (
        <mesh
          key={i}
          ref={(el) => (octahedraRefs.current[i] = el)}
        >
          <octahedronGeometry args={[0.07]} />
          <meshStandardMaterial
            color="#7EE7FF"
            emissive="#7EE7FF"
            emissiveIntensity={1.0}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function SecureVoting({ isOpen, setIsOpen }) {
  const triggerTransition = useCosmicTransition();

  return (
    <div className="relative flex-1 w-full h-screen overflow-hidden bg-transparent text-white">


      {/* Back navigation */}
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
        tag="SECURITY · ACADEMIC"
        title="Secure Voting"
        description="Visual cryptography-based voting system concept. Vote information split into shares, reconstructed for verification. Research and educational project."
        techStack={["Visual Cryptography", "Security Auditing", "Ballot Secrecy"]}
        results={[
          "Secrecy: Random noise",
          "Verification: Physical",
          "Decryption: No keys",
          "Auditing: Decentralized",
        ]}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        primaryLink={{
          text: "Visit Secure Voting →",
          url: "https://secure-voting-iota.vercel.app/",
        }}
      />
    </div>
  );
}
