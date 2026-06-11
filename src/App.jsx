"use client";

import React, { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { CosmicTransitionProvider } from "./hooks/useCosmicTransition";

// Shared Components
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import CosmicTransition from "./components/CosmicTransition";
import RecruiterMode from "./components/RecruiterMode";
import BrainModel from "./components/BrainModel";
import MatrixBackground from "./components/MatrixBackground";

// Page Overlays & Exported 3D Models
import MainScene from "./views/MainScene";
import CareerForge, { LaptopModel } from "./views/CareerForge";
import RoadDetection, { DroneModel } from "./views/RoadDetection";
import SecureVoting, { VaultModel } from "./views/SecureVoting";
import ComputerVision, { NeuralNetwork } from "./views/ComputerVision";
import ProductBuilding, { SystemArchitecture } from "./views/ProductBuilding";
import AISystems, { IntelligenceSpine } from "./views/AISystems";
import AIJobAgent, { AutonomousPipeline } from "./views/AIJobAgent";

// SYSTEM A — Star Field (3000 points):
function StarField({ count = 3000 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 25; // distribute evenly in sphere volume
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        opacity={0.35}
        transparent
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

// SYSTEM B — Neural Dust (800 points):
function NeuralDust({ count = 800 }) {
  const pointsRef = useRef(null);

  const { positions, velocities } = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const velArr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 8;
      posArr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      posArr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArr[i * 3 + 2] = r * Math.cos(phi);

      const speed = 0.0003;
      const vAngle = Math.random() * Math.PI * 2;
      const vPhi = Math.acos(2.0 * Math.random() - 1.0);
      velArr[i * 3] = speed * Math.sin(vPhi) * Math.cos(vAngle);
      velArr[i * 3 + 1] = speed * Math.sin(vPhi) * Math.sin(vAngle);
      velArr[i * 3 + 2] = speed * Math.cos(vPhi);
    }
    return { positions: posArr, velocities: velArr };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      const x = pos[i * 3];
      const y = pos[i * 3 + 1];
      const z = pos[i * 3 + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);

      if (dist > 8) {
        pos[i * 3] = -x * 0.98;
        pos[i * 3 + 1] = -y * 0.98;
        pos[i * 3 + 2] = -z * 0.98;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // LAYER 2: Neural Dust Parallax (deeper layer moving at half speed)
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.25;
    pointsRef.current.position.x += (targetX * 0.5 - pointsRef.current.position.x) * 0.02;
    pointsRef.current.position.y += (targetY * 0.5 - pointsRef.current.position.y) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#5ea8ff"
        opacity={0.12}
        transparent
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}



// SYSTEM D — Constellations (faint lines and stars):
function Constellations() {
  const groupRef = useRef();

  const { starPositions, linePositions } = useMemo(() => {
    const starsCount = 45;
    const stars = [];
    const lines = [];

    // Generate random stars in a spherical region in the background (dist 7 to 13)
    for (let i = 0; i < starsCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 7 + Math.random() * 6;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      stars.push(new THREE.Vector3(x, y, z));
    }

    // Connect close stars
    const maxDist = 4.0;
    const minDist = 1.2;
    for (let i = 0; i < starsCount; i++) {
      let connections = 0;
      for (let j = i + 1; j < starsCount; j++) {
        const d = stars[i].distanceTo(stars[j]);
        if (d > minDist && d < maxDist && connections < 2) {
          lines.push(stars[i].x, stars[i].y, stars[i].z);
          lines.push(stars[j].x, stars[j].y, stars[j].z);
          connections++;
        }
      }
    }

    const starArr = new Float32Array(starsCount * 3);
    stars.forEach((s, idx) => {
      starArr[idx * 3] = s.x;
      starArr[idx * 3 + 1] = s.y;
      starArr[idx * 3 + 2] = s.z;
    });

    return {
      starPositions: starArr,
      linePositions: new Float32Array(lines),
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.005) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#a78bfa"
          opacity={0.75}
          transparent
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>

      {linePositions.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#5ea8ff"
            opacity={0.15}
            transparent
            depthWrite={false}
          />
        </lineSegments>
      )}
    </group>
  );
}

// Component to monitor container width and force Three.js update aspect & size on every transition frame
function CanvasResizeMonitor() {
  const { camera, gl } = useThree();
  useFrame(() => {
    const canvasEl = gl.domElement;
    if (canvasEl && canvasEl.parentElement) {
      const rect = canvasEl.parentElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const currentSize = new THREE.Vector2();
      gl.getSize(currentSize);
      if (Math.abs(currentSize.x - width) > 0.1 || Math.abs(currentSize.y - height) > 0.1) {
        gl.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    }
  });
  return null;
}

// Shared Camera Controller (handles transitions and pulls Z back +1.5 when panel is open)
function SharedCameraController({ currentPath, panelOpen, isInspected }) {
  const { camera } = useThree();
  const basePosition = useRef({ x: 0, y: 0.5, z: 5.8 });

  useEffect(() => {
    let targetX = 0;
    let targetY = 0.5;
    let targetZ = 5.8;

    if (currentPath === "/") {
      targetX = 0;
      targetY = 0.5;
      targetZ = isInspected ? 4.5 : 5.8;
    } else if (currentPath === "/careerforge") {
      targetX = 0;
      targetY = 0.6;
      targetZ = panelOpen ? 4.0 : 2.5; // pull back +1.5 when panel is open
    } else if (currentPath === "/road-detection") {
      targetX = 0;
      targetY = 1.2;
      targetZ = panelOpen ? 4.7 : 3.2; // pull back +1.5 when panel is open
    } else if (currentPath === "/secure-voting") {
      targetX = 0;
      targetY = 0.5;
      targetZ = panelOpen ? 4.3 : 2.8; // pull back to make it visible completely
    } else if (currentPath === "/computer-vision") {
      targetX = 0;
      targetY = 0.5;
      targetZ = panelOpen ? 4.1 : 2.6; // pull back +1.5 when panel is open
    } else if (currentPath === "/product-building") {
      targetX = 0;
      targetY = 0;
      targetZ = panelOpen ? 8.5 : 7.0; // pull back to 7.0 baseline and 8.5 when open
    } else if (currentPath === "/ai-systems") {
      targetX = 0;
      targetY = 0;
      targetZ = panelOpen ? 7.5 : 6.0; // pull back +1.5 when panel is open
    } else if (currentPath === "/ai-job-agent") {
      targetX = 0;
      targetY = 0.5;
      targetZ = panelOpen ? 4.1 : 2.6; // pull back +1.5 when panel is open
    }

    basePosition.current = { x: targetX, y: targetY, z: targetZ };

    gsap.to(camera.position, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: 0.5, // Match CSS panel shift duration (0.5s)
      ease: "power2.out",
      onUpdate: () => {
        let lookAtY = 0;
        if (currentPath === "/") lookAtY = 0.5;
        else if (currentPath === "/road-detection") lookAtY = 1.2;
        else if (currentPath === "/careerforge") lookAtY = 0.6;
        else if (currentPath === "/secure-voting") lookAtY = 0.5;
        else if (currentPath === "/computer-vision") lookAtY = 0.5;
        else if (currentPath === "/ai-job-agent") lookAtY = 0.5;
        
        camera.lookAt(0, lookAtY, 0);
      },
    });
  }, [currentPath, panelOpen, isInspected, camera]);

  useFrame((state) => {
    if (currentPath === "/") {
      // LAYER 1: Mouse Parallax on Brain
      const targetX = state.pointer.x * 0.4;
      const targetY = state.pointer.y * 0.25;

      const destX = basePosition.current.x + targetX;
      const destY = basePosition.current.y + targetY;

      camera.position.x += (destX - camera.position.x) * 0.04;
      camera.position.y += (destY - camera.position.y) * 0.04;
      
      // Always lookAt brain center (0.5) smoothly
      camera.lookAt(0, 0.5, 0);
    }
  });

  return null;
}

function AppContent({ triggerRef, recruiterOpen, setRecruiterOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [panelOpen, setPanelOpen] = useState(false);
  const [isInspected, setIsInspected] = useState(false);

  // Synchronize route changes to default state
  useEffect(() => {
    setPanelOpen(false);
    if (currentPath !== "/") {
      setIsInspected(false);
    }
  }, [currentPath]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#080808] font-sans selection:bg-[#8b5cf6]/30 selection:text-white">
      {/* Custom Particle cursor */}
      <CustomCursor />

      {/* Persistent global Navigation Bar */}
      <Navbar onRecruiterClick={() => setRecruiterOpen(true)} />

      {/* Shared Canvas Container - always mounted */}
      <div className={`canvas-container absolute inset-y-0 left-0 z-0 h-full ${panelOpen ? "panel-open" : ""}`}>
        <Canvas
          camera={{ position: [0, 0.5, 5.8], fov: 45 }}
          style={{ cursor: "none" }}
        >
          <CanvasResizeMonitor />
          {/* Pure dark gray background */}
          <color attach="background" args={["#080808"]} />

          {/* Volumetric ambient fog layer */}
          <fog attach="fog" args={["#080808", 4.5, 12]} />

          {/* Ambient Lighting based on current page */}
          <ambientLight intensity={recruiterOpen ? 0.25 : (currentPath === "/road-detection" ? 0 : (currentPath === "/careerforge" ? 0.4 : 0.25))} />
          
          {(currentPath === "/" || recruiterOpen) && (
            <pointLight position={[0, 1, 2]} intensity={2.5} color="#ffffff" distance={8} />
          )}

          {/* CareerForge Lights */}
          {currentPath === "/careerforge" && (
            <>
              <pointLight position={[2, 3, 2]} color="#a78bfa" intensity={3} />
              <pointLight position={[-2, 1, 1]} color="#7ee7ff" intensity={2} />
            </>
          )}

          {/* Road Detection Lights */}
          {currentPath === "/road-detection" && (
            <>
              <pointLight position={[0, 5, 0]} color="#ffffff" intensity={8} />
              <pointLight position={[3, 3, 3]} color="#a78bfa" intensity={5} />
              <pointLight position={[-3, 3, -3]} color="#7ee7ff" intensity={4} />
              <ambientLight color="#ffffff" intensity={1.0} />
            </>
          )}

          {/* Secure Voting Lights */}
          {currentPath === "/secure-voting" && (
            <>
              <pointLight position={[2, 3, 2]} intensity={3.0} color="#a78bfa" />
              <pointLight position={[-2, 1, -1]} intensity={1.5} color="#7c3aed" />
              <pointLight position={[0, -1, -3]} intensity={0.8} color="#ffffff" />
            </>
          )}

          {/* Computer Vision Lights */}
          {currentPath === "/computer-vision" && (
            <>
              <pointLight position={[2, 2, 2]} intensity={2.5} color="#c084fc" distance={6} />
              <pointLight position={[-2, -2, -2]} intensity={0.5} color="#8b5cf6" distance={6} />
            </>
          )}

          {/* Product Building Lights */}
          {currentPath === "/product-building" && (
            <>
              <pointLight position={[2, 3, 2]} intensity={2.0} color="#5EA8FF" distance={7} />
              <pointLight position={[-2, -2, -2]} intensity={0.5} color="#8b5cf6" distance={7} />
            </>
          )}

          {/* AI Systems Lights */}
          {currentPath === "/ai-systems" && (
            <>
              <pointLight position={[2, 3, 2]} intensity={2.5} color="#9d5eff" distance={8} />
              <pointLight position={[-2, -2, -2]} intensity={0.6} color="#8b5cf6" distance={8} />
            </>
          )}

          {/* Static space starfield */}
          <StarField />

          {/* Drifting neural dust particles */}
          <NeuralDust />

          {/* Star constellations */}
          <Constellations />

          {/* Matrix Background rain */}
          <MatrixBackground />

          {/* Shared Camera Controller */}
          <SharedCameraController currentPath={currentPath} panelOpen={panelOpen} isInspected={isInspected} />

          {/* Render 3D Models conditionally based on active route */}
          <Suspense fallback={null}>
            {/* Brain Model visible on home page OR when recruiter mode is open */}
            {(currentPath === "/" || recruiterOpen) && (
              <BrainModel visible={true} isInspected={isInspected} setIsInspected={setIsInspected} recruiterOpen={recruiterOpen} />
            )}
            
            {currentPath === "/careerforge" && !recruiterOpen && (
              <LaptopModel isOpen={panelOpen} onLaptopClick={() => setPanelOpen(true)} />
            )}
            
            {currentPath === "/road-detection" && !recruiterOpen && (
              <DroneModel isOpen={panelOpen} onDroneClick={() => setPanelOpen(true)} />
            )}
            
            {currentPath === "/secure-voting" && !recruiterOpen && (
              <VaultModel isOpen={panelOpen} onVaultClick={() => setPanelOpen(true)} />
            )}

            {currentPath === "/computer-vision" && !recruiterOpen && (
              <NeuralNetwork onClick={() => setPanelOpen(true)} />
            )}

            {currentPath === "/product-building" && !recruiterOpen && (
              <SystemArchitecture onClick={() => setPanelOpen(true)} />
            )}

            {currentPath === "/ai-systems" && !recruiterOpen && (
              <IntelligenceSpine onClick={() => setPanelOpen(true)} />
            )}
            
            {currentPath === "/ai-job-agent" && !recruiterOpen && (
              <AutonomousPipeline onClick={() => setPanelOpen(true)} />
            )}
          </Suspense>

          {/* Post Processing Cinematic Bloom, Vignette, and Chromatic Aberration */}
          <EffectComposer>
            <Bloom intensity={1.2} threshold={0.3} luminanceSmoothing={0.9} />
            <Vignette darkness={0.6} offset={0.15} />
            <ChromaticAberration offset={new THREE.Vector2(0.0012, 0.0012)} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* HTML overlay layer */}
      <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
        <Routes>
          <Route path="/" element={<MainScene isInspected={isInspected} setIsInspected={setIsInspected} />} />
          <Route path="/careerforge" element={<CareerForge isOpen={panelOpen} setIsOpen={setPanelOpen} />} />
          <Route path="/road-detection" element={<RoadDetection isOpen={panelOpen} setIsOpen={setPanelOpen} />} />
          <Route path="/secure-voting" element={<SecureVoting isOpen={panelOpen} setIsOpen={setPanelOpen} />} />
          <Route path="/computer-vision" element={<ComputerVision isOpen={panelOpen} setIsOpen={setPanelOpen} />} />
          <Route path="/product-building" element={<ProductBuilding isOpen={panelOpen} setIsOpen={setPanelOpen} />} />
          <Route path="/ai-systems" element={<AISystems isOpen={panelOpen} setIsOpen={setPanelOpen} />} />
          <Route path="/ai-job-agent" element={<AIJobAgent isOpen={panelOpen} setIsOpen={setPanelOpen} />} />
          <Route path="*" element={<MainScene isInspected={isInspected} setIsInspected={setIsInspected} />} />
        </Routes>
      </div>

      {/* Fullscreen Cosmic Starry transitions */}
      <CosmicTransition triggerRef={triggerRef} />

      {/* Recruiter snapshot modal */}
      {recruiterOpen && (
        <RecruiterMode onClose={() => setRecruiterOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  const triggerRef = useRef(null);
  const [recruiterOpen, setRecruiterOpen] = useState(false);

  return (
    <Router>
      <CosmicTransitionProvider triggerRef={triggerRef}>
        <AppContent
          triggerRef={triggerRef}
          recruiterOpen={recruiterOpen}
          setRecruiterOpen={setRecruiterOpen}
        />
      </CosmicTransitionProvider>
    </Router>
  );
}
