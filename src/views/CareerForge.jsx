"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useCosmicTransition } from "../hooks/useCosmicTransition";
import InfoPanel from "../components/InfoPanel";

export function LaptopModel({ onLaptopClick, isOpen }) {
  const gltf = useGLTF("/assets/laptop.glb");
  const modelRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const screenLightRef = useRef(null);

  // Apply visibility specifications & standard violet metal material override
  const sceneClone = useMemo(() => {
    const clone = gltf.scene.clone();
    
    // Step 1 — Log mesh names to identify parts
    clone.traverse(c => {
      if (c.isMesh) {
        console.log('mesh:', c.name, 'scale:', c.scale, 'pos:', c.position);
      }
    });

    clone.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();
        
        // Step 3 — The two planes are likely the lid and base
        // Find mesh with name containing 'lid','top','screen': rotation.x = -1.8
        // Find mesh with name containing 'base','bottom','body': keep at rotation.x = 0
        if (name.includes("lid") || name.includes("top") || name.includes("screen") || name.includes("display")) {
          child.rotation.x = -1.8;
          
          // Step 5 — Screen glow mesh: emissive #5ea8ff, intensity 2.0
          if (name.includes("screen") || name.includes("display")) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x1a0a2e,
              emissive: new THREE.Color("#5ea8ff"),
              emissiveIntensity: 2.0,
              transparent: false,
              opacity: 1.0,
              depthWrite: true,
              side: THREE.FrontSide,
            });
          } else {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x4c1d95,
              metalness: 0.6,
              roughness: 0.3,
              emissive: new THREE.Color(0x2e1065),
              emissiveIntensity: 0.2,
              transparent: false,
              opacity: 1.0,
              depthWrite: true,
              side: THREE.FrontSide,
            });
          }
        } else if (name.includes("base") || name.includes("bottom") || name.includes("body")) {
          child.rotation.x = 0;
          child.material = new THREE.MeshStandardMaterial({
            color: 0x4c1d95,
            metalness: 0.6,
            roughness: 0.3,
            emissive: new THREE.Color(0x2e1065),
            emissiveIntensity: 0.2,
            transparent: false,
            opacity: 1.0,
            depthWrite: true,
            side: THREE.FrontSide,
          });
        } else {
          // Standard laptop body material
          child.material = new THREE.MeshStandardMaterial({
            color: 0x4c1d95,
            metalness: 0.6,
            roughness: 0.3,
            emissive: new THREE.Color(0x2e1065),
            emissiveIntensity: 0.2,
            transparent: false,
            opacity: 1.0,
            depthWrite: true,
            side: THREE.FrontSide,
          });
        }
      }
    });
    return clone;
  }, [gltf]);

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

  // Open lid animation when clicked
  useEffect(() => {
    if (!isOpen) return;

    // Traverse to locate lid or top screen group
    let lidNode = null;
    sceneClone.traverse((child) => {
      const name = child.name.toLowerCase();
      if (name.includes("lid") || name.includes("screen") || name.includes("top")) {
        lidNode = child;
      }
    });

    const targetNode = lidNode || sceneClone.children[0];

    if (targetNode) {
      gsap.to(targetNode.rotation, {
        x: -1.92, // -110 degrees for opening
        duration: 0.8,
        ease: "power2.out",
      });

      // Spike screen emission light intensity
      if (screenLightRef.current) {
        gsap.to(screenLightRef.current, {
          intensity: 10.0,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        });
      }
    }
  }, [isOpen, sceneClone]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      const time = state.clock.getElapsedTime();

      // Step 6 — Position: [0, -0.5, 0] with float Y oscillation
      modelRef.current.position.y = -0.5 + Math.sin(time * 1.5) * 0.08;

      // Slow Y rotation if NOT open/clicked
      if (!isOpen) {
        modelRef.current.rotation.y += 0.005;
      } else {
        // Lock face-forward when details are opened
        modelRef.current.rotation.y = THREE.MathUtils.lerp(
          modelRef.current.rotation.y,
          Math.PI,
          4 * delta
        );
      }

      // Step 4 — Scale: try [0.9, 0.9, 0.9]
      const baseScale = 0.9;
      const targetScale = hovered && !isOpen ? baseScale * 1.05 : baseScale;
      modelRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 6 * delta);
    }
  });

  return (
    <group
      ref={modelRef}
      position={[0, -0.5, 0]}
      scale={[0.9, 0.9, 0.9]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onLaptopClick();
      }}
    >
      {/* Step 2 — Fix orientation: rotation={[-0.1, Math.PI * 0.15, 0]} */}
      <group rotation={[-0.1, Math.PI * 0.15, 0]}>
        <primitive object={sceneClone} />
      </group>

      {/* Screen Glow source inside the laptop coordinates */}
      {isOpen && (
        <pointLight
          ref={screenLightRef}
          position={[0, 0.4, 0.2]}
          intensity={4.0}
          color="#7ee7ff"
          distance={3.0}
        />
      )}
    </group>
  );
}

export default function CareerForge({ isOpen, setIsOpen }) {
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

      {/* Slide-in details overlay */}
      <InfoPanel
        tag="AI PRODUCT · ACTIVE"
        title="CareerForge"
        description="AI-powered career platform helping students improve resumes, prepare for interviews, and navigate careers through intelligent tools."
        techStack={["Next.js", "TypeScript", "Supabase", "AI APIs", "Vercel"]}
        primaryLink={{
          text: "Visit CareerForge →",
          url: "https://careerforge-ai-red.vercel.app/",
        }}
        secondaryAction={{
          text: "View Architecture →",
          action: () => alert("Loading Architecture workflow: user -> LLM agent parsing context -> structured rating validator -> output feedback."),
        }}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

// Pre-preload model
useGLTF.preload("/assets/laptop.glb");
