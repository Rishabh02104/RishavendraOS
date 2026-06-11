"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Html, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { HOLOGRAPHIC_VERTEX, HOLOGRAPHIC_FRAGMENT } from "../shaders/holographicShader";
import { useCosmicTransition } from "../hooks/useCosmicTransition";
import { useLocation } from "react-router-dom";

function BrainHotspot({
  position,
  radius,
  label,
  projectName,
  route,
  isInspected,
  recruiterOpen = false,
}) {
  const meshRef = useRef(null);
  const triggerTransition = useCosmicTransition();
  const [hovered, setHovered] = useState(false);

  // Handle pointer styles
  useEffect(() => {
    if (hovered && !recruiterOpen) {
      window.dispatchEvent(new CustomEvent("3d-hover-start"));
    } else {
      window.dispatchEvent(new CustomEvent("3d-hover-end"));
    }
    return () => {
      window.dispatchEvent(new CustomEvent("3d-hover-end"));
    };
  }, [hovered, recruiterOpen]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      // Clickable pulsing synapses: oscillates Y-scale slightly
      const pulse = Math.sin(time * 3.5 + position[0] * 5.0) * 0.15 + 1.0;
      const targetScale = (!recruiterOpen && (hovered || isInspected)) ? 1.4 : pulse;
      meshRef.current.scale.set(targetScale, targetScale, targetScale);
    }
  });

  return (
    <group position={position} renderOrder={hovered ? 999 : 0}>
      {/* Clickable and visible hotspot orb */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (!recruiterOpen) setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!recruiterOpen) triggerTransition(route);
        }}
      >
        <sphereGeometry args={[0.04, 32, 32]} />
        <meshPhysicalMaterial
          color="#00E5FF"
          emissive={hovered ? "#ffffff" : "#00E5FF"}
          emissiveIntensity={(!recruiterOpen && (hovered || isInspected)) ? 3.5 : 1.5}
          transparent
          opacity={recruiterOpen ? 0.0 : 0.95}
          depthTest={!hovered}
        />
      </mesh>

      {/* Ring indicator */}
      <mesh scale={[1.4, 1.4, 1.4]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={recruiterOpen ? 0.0 : (hovered ? 0.8 : 0.25)}
          wireframe
          depthTest={!hovered}
        />
      </mesh>

      {/* Raycast invisible boundary check mesh */}
      <mesh
        visible={false}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (!recruiterOpen) setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!recruiterOpen) triggerTransition(route);
        }}
      >
        <sphereGeometry args={[radius, 16, 16]} />
      </mesh>

      {/* Hover HTML Lobe Label */}
      <Billboard>
        <Html position={[0, 0.18, 0]} center>
          <div
            className={`flex flex-col items-center pointer-events-none select-none whitespace-nowrap transition-all duration-300 ${(!recruiterOpen && (hovered || isInspected)) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            style={{ 
              opacity: recruiterOpen ? 0 : undefined,
              background: "rgba(10, 10, 12, 0.75)",
              border: "1px solid rgba(0, 229, 255, 0.3)",
              padding: "6px 10px",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6), 0 0 10px rgba(0, 229, 255, 0.15)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#a1a1aa] uppercase leading-none">
              {label}
            </span>
            <span className="font-sans text-[11px] font-bold text-white mt-1.5 leading-none">
              {projectName}
            </span>
          </div>
        </Html>
      </Billboard>
    </group>
  );
}

export default function BrainModel({
  visible = true,
  isInspected,
  setIsInspected,
  recruiterOpen = false,
}) {
  const brainRef = useRef(null);
  const gltf = useGLTF("/assets/brain_hologram.glb");
  const location = useLocation();
  const currentPath = location.pathname;
  const isHome = currentPath === "/";
  const showHotspots = !isHome || isInspected;

  // Track hover state for slow brain pulse animation
  const hoverState = useRef({
    pointSize: 0.012,
    emissiveIntensity: 1.0,
    hoverScale: 1.0,
  });

  // Create custom shader material
  const holographicMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: HOLOGRAPHIC_VERTEX,
      fragmentShader: HOLOGRAPHIC_FRAGMENT,
      uniforms: {
        baseColor: { value: new THREE.Color("#ffffff") },
        wireColor: { value: new THREE.Color("#ffffff") },
        time: { value: 0 },
        opacityPulse: { value: 0 },
        emissiveIntensity: { value: 1.0 },
        pointSize: { value: 0.012 },
        uOpacity: { value: 1.0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Clone and traverse to apply custom holographic material on all child meshes
  const brainScene = useMemo(() => {
    const sceneClone = gltf.scene.clone();
    sceneClone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = holographicMaterial;
      }
    });
    return sceneClone;
  }, [gltf, holographicMaterial]);

  // Create depth mask material to block the matrix background from showing through the brain
  const depthMaskMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      colorWrite: false, // Don't write to color buffer (invisible)
      depthWrite: true,  // Write to depth buffer
    });
  }, []);

  // Clone and traverse to apply depth mask material for the depth pre-pass
  const brainSceneDepthMask = useMemo(() => {
    const sceneClone = gltf.scene.clone();
    sceneClone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = depthMaskMaterial;
      }
    });
    return sceneClone;
  }, [gltf, depthMaskMaterial]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Update Custom Hologram Shader Uniforms
    holographicMaterial.uniforms.time.value = time;
    holographicMaterial.uniforms.opacityPulse.value = Math.sin(time * Math.PI) * 0.15 + 0.85; //pulse 0.7 - 1.0

    // Calculate mouse distance to brain center (screen center) in pixels
    const mouseX = state.pointer.x * window.innerWidth / 2;
    const mouseY = state.pointer.y * window.innerHeight / 2;
    const dist = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    const isHovered = dist < 200;

    // Target values
    const targetSize = isHovered ? 0.016 : 0.012;
    const targetEmissive = isHovered ? 1.4 : 1.0;
    const targetHoverScale = isHovered ? 1.15 : 1.0;

    // Lerp values based on hover state (0.3s ease on hover: speed ~0.08, 0.5s ease on leave: speed ~0.04)
    const lerpSpeed = isHovered ? 0.08 : 0.04;

    hoverState.current.pointSize += (targetSize - hoverState.current.pointSize) * lerpSpeed;
    hoverState.current.emissiveIntensity += (targetEmissive - hoverState.current.emissiveIntensity) * lerpSpeed;
    hoverState.current.hoverScale += (targetHoverScale - hoverState.current.hoverScale) * lerpSpeed;

    // Update uniforms
    holographicMaterial.uniforms.pointSize.value = hoverState.current.pointSize;
    holographicMaterial.uniforms.emissiveIntensity.value = hoverState.current.emissiveIntensity;

    // Lerp brain opacity (0.3 in recruiter mode, otherwise 1.0)
    const targetOpacity = recruiterOpen ? 0.3 : 1.0;
    holographicMaterial.uniforms.uOpacity.value += (targetOpacity - holographicMaterial.uniforms.uOpacity.value) * 0.1;

    // 2. Y-Axis Idle Rotation (0.002 rad/frame, stop in recruiter mode) and position/scale transition
    if (brainRef.current) {
      if (!recruiterOpen) {
        brainRef.current.rotation.y += 0.002;
      }
      
      const targetPos = isHome 
        ? new THREE.Vector3(0, isInspected ? 0.15 : 0, 0) 
        : new THREE.Vector3(0, 0.2, -3.0);
      
      // Scale: 0.7 in recruiter mode
      const baseScale = recruiterOpen ? 0.7 : (isHome ? 1.0 : 0.8);
      const currentHoverScale = recruiterOpen ? 1.0 : hoverState.current.hoverScale;
      const targetScale = new THREE.Vector3(
        baseScale * currentHoverScale,
        baseScale * currentHoverScale,
        baseScale * currentHoverScale
      );
      
      brainRef.current.position.lerp(targetPos, 0.1);
      brainRef.current.scale.lerp(targetScale, 0.1);
    }
  });

  return (
    <group visible={visible}>
      {/* Clickable Brain Model Primitive */}
      <group
        ref={brainRef}
        onPointerDown={(e) => {
          e.stopPropagation();
          if (isHome && !isInspected && !recruiterOpen) {
            setIsInspected(true);
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (isHome && !isInspected && !recruiterOpen) {
            setIsInspected(true);
          }
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (!recruiterOpen) {
            document.dispatchEvent(new Event('3d-hover-start'));
          }
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          if (!recruiterOpen) {
            document.dispatchEvent(new Event('3d-hover-end'));
          }
        }}
      >
        {/* Invisible hit-test target for easy clicking/tapping on the point cloud */}
        {!isInspected && (
          <mesh>
            <sphereGeometry args={[1.1, 16, 16]} />
            <meshBasicMaterial transparent={true} opacity={0} depthWrite={false} />
          </mesh>
        )}

        {/* Opaque depth mask rendered first to block the matrix background */}
        <primitive object={brainSceneDepthMask} scale={[2.0, 2.0, 2.0]} />

        {/* We apply scale={[2,2,2]} here to scale only the brain primitive mesh,
            allowing the sibling hotspots to use exact unscaled coordinates */}
        <primitive object={brainScene} scale={[2.0, 2.0, 2.0]} />

        {/* Hotspots mapped relative to the brain scale geometry */}
        {showHotspots && (
          <>
            {/* FRONTAL LOBE (CareerForge) */}
            <BrainHotspot
              position={[0.0, 0.5, 1.1]}
              radius={0.35}
              label="FRONTAL LOBE"
              projectName="CareerForge"
              route="/careerforge"
              isInspected={isInspected}
              recruiterOpen={recruiterOpen}
            />
            {/* PARIETAL LOBE (Road Detection) */}
            <BrainHotspot
              position={[0.3, 0.9, 0.2]}
              radius={0.35}
              label="PARIETAL LOBE"
              projectName="Road Detection"
              route="/road-detection"
              isInspected={isInspected}
              recruiterOpen={recruiterOpen}
            />
            {/* OCCIPITAL LOBE (Secure Voting) */}
            <BrainHotspot
              position={[0.0, 0.2, -1.0]}
              radius={0.3}
              label="OCCIPITAL LOBE"
              projectName="Secure Voting"
              route="/secure-voting"
              isInspected={isInspected}
              recruiterOpen={recruiterOpen}
            />
            {/* TEMPORAL LOBE (Computer Vision) */}
            <BrainHotspot
              position={[1.1, -0.1, 0.3]}
              radius={0.3}
              label="TEMPORAL LOBE"
              projectName="Computer Vision"
              route="/computer-vision"
              isInspected={isInspected}
              recruiterOpen={recruiterOpen}
            />
            {/* CEREBELLUM (Product Building) */}
            <BrainHotspot
              position={[0.0, -0.55, -0.5]}
              radius={0.3}
              label="CEREBELLUM"
              projectName="Product Building"
              route="/product-building"
              isInspected={isInspected}
              recruiterOpen={recruiterOpen}
            />
            {/* SPINAL CORD (AI Systems) */}
            <BrainHotspot
              position={[0.0, -0.85, -0.2]}
              radius={0.25}
              label="SPINAL CORD"
              projectName="AI Systems"
              route="/ai-systems"
              isInspected={isInspected}
              recruiterOpen={recruiterOpen}
            />
            {/* PREFRONTAL CORTEX (AI Job Agent) */}
            <BrainHotspot
              position={[-0.85, 0.35, 0.5]}
              radius={0.3}
              label="PREFRONTAL CORTEX"
              projectName="AI Job Agent"
              route="/ai-job-agent"
              isInspected={isInspected}
              recruiterOpen={recruiterOpen}
            />
          </>
        )}
      </group>
    </group>
  );
}

// Pre-preload model
useGLTF.preload("/assets/brain_hologram.glb");
