"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useCosmicTransition } from "../hooks/useCosmicTransition";
import InfoPanel from "../components/InfoPanel";

// Procedural Neural Network Layers (CNN Visualization)
export function NeuralNetwork({ onClick }) {
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

  const layers = [
    { name: "Input", desc: "1920x1080x3 Image", pos: [-3, 0, 0] },
    { name: "Conv", desc: "3x3 kernels, stride 1", pos: [-1.5, 0, 0] },
    { name: "Pool", desc: "Max pool 2x2, stride 2", pos: [0, 0, 0] },
    { name: "Dense", desc: "1024-d feature vector", pos: [1.5, 0, 0] },
    { name: "Output", desc: "Softmax probability", pos: [3, 0, 0] },
  ];

  const planeGeo = useMemo(() => new THREE.PlaneGeometry(0.8, 1.2), []);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(-1.5, 0.1, 0),
      new THREE.Vector3(0, -0.1, 0),
      new THREE.Vector3(1.5, 0.1, 0),
      new THREE.Vector3(3, 0, 0)
    ]);
  }, []);

  const tubeShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          float progress = mod(uTime, 1.5) / 1.5;
          float dist = abs(vUv.x - progress);
          float pulse = smoothstep(0.15, 0.0, dist);
          vec3 color = vec3(0.494, 0.906, 1.0); // #7ee7ff
          gl_FragColor = vec4(color * (0.2 + pulse * 2.5), 0.15 + pulse * 0.7);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Entire group slow float: y oscillates ±0.15 around 0.5 midpoint, 5s loop
      groupRef.current.position.y = 0.5 + Math.sin(time * (2.0 * Math.PI / 5.0)) * 0.15;
      // Entire group slow Y rotation: 0.002 rad/frame
      groupRef.current.rotation.y += 0.002;
    }
    if (tubeShaderMaterial) {
      tubeShaderMaterial.uniforms.uTime.value = time;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={[0.45, 0.45, 0.45]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      {/* Connecting animated tube */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.02, 8, false]} />
        <primitive object={tubeShaderMaterial} attach="material" />
      </mesh>

      {/* Layer Cards */}
      {layers.map((layer, index) => (
        <group key={index} position={layer.pos}>
          {/* Card Plane */}
          <mesh>
            <primitive object={planeGeo} attach="geometry" />
            <meshStandardMaterial
              color="#1a0a2e"
              emissive="#5ea8ff"
              emissiveIntensity={0.3}
              transparent={true}
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Border Edges */}
          <lineSegments>
            <edgesGeometry args={[planeGeo]} />
            <lineBasicMaterial color="#5ea8ff" transparent opacity={0.8} />
          </lineSegments>

          {/* HTML Label above */}
          <Html position={[0, 0.8, 0]} center distanceFactor={6}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              textAlign: "center",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              userSelect: "none"
            }}>
              <div style={{ fontSize: "10px", color: "#a78bfa", fontWeight: "bold" }}>{layer.name}</div>
              <div style={{ fontSize: "9px", color: "#71717a", marginTop: "2px" }}>{layer.desc}</div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

export default function ComputerVision({ isOpen, setIsOpen }) {
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
        tag="COMPUTER VISION · EXPERTISE"
        title="Computer Vision"
        description="Convolutional Neural Networks (CNNs), OpenCV feature extractions, image classifications, segmentation masks, and aerial binary terrain analysis."
        techStack={["CNNs", "OpenCV", "TensorFlow", "Image Processing", "Python"]}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
