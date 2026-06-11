"use client";

import React, { useState, useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useCosmicTransition } from "../hooks/useCosmicTransition";
import InfoPanel from "../components/InfoPanel";

class ThreeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Drone Model loading failed, falling back to procedural model:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function DroneLoadingPlaceholder() {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 2;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0.8, 0]}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.4} />
    </mesh>
  );
}

function ProceduralDrone({ onDroneClick, isOpen }) {
  const groupRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const rotorRefs = [useRef(), useRef(), useRef(), useRef()];

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

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Propeller/Rotor spin animation
    rotorRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.rotation.y += 0.3;
      }
    });

    if (groupRef.current) {
      // Hover animation and slight positional drift
      if (!isOpen) {
        groupRef.current.position.y = 1.2 + Math.sin(time * 0.8) * 0.08;
        groupRef.current.position.x = Math.sin(time * 0.8) * 0.05;
        groupRef.current.position.z = Math.cos(time * 0.8) * 0.05;
        groupRef.current.rotation.y += 0.004;
      } else {
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 1.5, 4 * delta);
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 4 * delta);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 4 * delta);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 4 * delta);
      }
    }
  });

  const scaleVal = hovered && !isOpen ? 1.05 : 1.0;

  return (
    <group
      ref={groupRef}
      scale={[scaleVal, scaleVal, scaleVal]}
      position={[0, 1.2, 0]}
      rotation={[0, Math.PI * 0.2, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onDroneClick();
      }}
    >
      {/* Central body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.08, 0.3]} />
        <meshStandardMaterial color="#7c3aed" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Camera/Sensor under body */}
      <mesh position={[0, -0.07, 0.08]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.1} emissive="#7ee7ff" emissiveIntensity={0.5} />
      </mesh>

      {/* Drone Arms */}
      <mesh position={[-0.2, 0.02, 0.2]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.25, 0.02, 0.03]} />
        <meshStandardMaterial color="#4c1d95" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.2, 0.02, 0.2]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[0.25, 0.02, 0.03]} />
        <meshStandardMaterial color="#4c1d95" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.2, 0.02, -0.2]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[0.25, 0.02, 0.03]} />
        <meshStandardMaterial color="#4c1d95" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.2, 0.02, -0.2]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.25, 0.02, 0.03]} />
        <meshStandardMaterial color="#4c1d95" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Rotors */}
      <group position={[-0.28, 0.05, 0.28]}>
        <mesh ref={rotorRefs[0]}>
          <boxGeometry args={[0.22, 0.005, 0.02]} />
          <meshStandardMaterial color="#a78bfa" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.04]} />
          <meshStandardMaterial color="#1f2937" metalness={0.9} />
        </mesh>
      </group>

      <group position={[0.28, 0.05, 0.28]}>
        <mesh ref={rotorRefs[1]}>
          <boxGeometry args={[0.22, 0.005, 0.02]} />
          <meshStandardMaterial color="#a78bfa" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.04]} />
          <meshStandardMaterial color="#1f2937" metalness={0.9} />
        </mesh>
      </group>

      <group position={[-0.28, 0.05, -0.28]}>
        <mesh ref={rotorRefs[2]}>
          <boxGeometry args={[0.22, 0.005, 0.02]} />
          <meshStandardMaterial color="#a78bfa" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.04]} />
          <meshStandardMaterial color="#1f2937" metalness={0.9} />
        </mesh>
      </group>

      <group position={[0.28, 0.05, -0.28]}>
        <mesh ref={rotorRefs[3]}>
          <boxGeometry args={[0.22, 0.005, 0.02]} />
          <meshStandardMaterial color="#a78bfa" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.04]} />
          <meshStandardMaterial color="#1f2937" metalness={0.9} />
        </mesh>
      </group>

      {/* Scanner beam projecting downward */}
      <group position={[0, -0.3, 0]} rotation={[0, -Math.PI * 0.2, 0]}>
        <mesh>
          <coneGeometry args={[0.15, 1.0, 16]} />
          <meshBasicMaterial
            color="#7c3aed"
            transparent
            opacity={0.06}
          />
        </mesh>
      </group>
    </group>
  );
}

function DroneModelGLTF({ onDroneClick, isOpen }) {
  const gltf = useGLTF("/assets/drone.glb");
  const modelRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Apply visibility specifications & standard violet metal material override
  const sceneClone = useMemo(() => {
    const clone = gltf.scene.clone();
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x7c3aed),
          emissive: new THREE.Color(0x4c1d95),
          emissiveIntensity: 0.8,
          metalness: 0.7,
          roughness: 0.2,
        });
        child.material.transparent = false;
        child.material.opacity = 1.0;
        child.material.depthWrite = true;
        child.material.side = THREE.DoubleSide;
        child.visible = true;
        child.frustumCulled = false;
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

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Rotate propellers
    sceneClone.traverse((child) => {
      const name = child.name.toLowerCase();
      if (
        name.includes("rotor") ||
        name.includes("prop") ||
        name.includes("blade") ||
        name.includes("wing")
      ) {
        child.rotation.y += 0.3;
      }
    });

    if (modelRef.current) {
      // Hover animation and slow Y spin
      if (!isOpen) {
        modelRef.current.position.y = 1.2 + Math.sin(time * 0.8) * 0.08;
        modelRef.current.position.x = Math.sin(time * 0.8) * 0.05;
        modelRef.current.position.z = Math.cos(time * 0.8) * 0.05;
        modelRef.current.rotation.y += 0.004;
      } else {
        modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, 1.5, 4 * delta);
        modelRef.current.position.x = THREE.MathUtils.lerp(modelRef.current.position.x, 0, 4 * delta);
        modelRef.current.position.z = THREE.MathUtils.lerp(modelRef.current.position.z, 0, 4 * delta);
        modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, 0, 4 * delta);
      }
    }
  });

  const scaleHover = hovered && !isOpen ? 1.05 : 1.0;

  return (
    <group
      ref={modelRef}
      position={[0, 1.2, 0]}
      rotation={[0, Math.PI * 0.2, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onDroneClick();
      }}
    >
      {/* 1. Scaled drone wrapper (applies orientation and scale) */}
      <group scale={[1.5 * scaleHover, 2.625 * scaleHover, 1.5 * scaleHover]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <primitive object={sceneClone} />
      </group>

      {/* 2. Scanner beam (sibling of primitive, unscaled but floats/rotates with group) */}
      <group position={[0, -0.3, 0]}>
        <mesh>
          <coneGeometry args={[0.15, 1.0, 16]} />
          <meshBasicMaterial
            color="#7c3aed"
            transparent
            opacity={0.06}
          />
        </mesh>
      </group>
    </group>
  );
}

export function DroneModel({ onDroneClick, isOpen }) {
  return (
    <ThreeErrorBoundary fallback={<ProceduralDrone onDroneClick={onDroneClick} isOpen={isOpen} />}>
      <Suspense fallback={<DroneLoadingPlaceholder />}>
        <DroneModelGLTF onDroneClick={onDroneClick} isOpen={isOpen} />
      </Suspense>
    </ThreeErrorBoundary>
  );
}

export default function RoadDetection({ isOpen, setIsOpen }) {
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
        tag="COMPUTER VISION · RESEARCH"
        title="Road Detection"
        description="CNN-based aerial imagery analysis estimating road length, width, and area using drone footage and geometric projection. Dataset: 86 aerial images."
        techStack={["Python", "OpenCV", "TensorFlow", "Geometric Projection"]}
        results={[
          "Length: Pixel conversion",
          "Width: Contour checks",
          "Area: Overlay masks",
          "Images: 86 aerials",
        ]}
        accuracyNote="Road measurements succeeded with high reliability. Mesh 3D terrain reconstruction remains experimental."
        primaryLink={{
          text: "View on GitHub →",
          url: "https://github.com/Rishabh02104/drone-binary-terrain-mapping",
        }}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

// Preload drone model
useGLTF.preload("/assets/drone.glb");
