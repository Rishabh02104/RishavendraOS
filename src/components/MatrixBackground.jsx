import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function MatrixBackground() {
  const { viewport, camera } = useThree();
  const textureRef = useRef();

  // Create offscreen 2D canvas for drawing the "HIRE ME" matrix rain
  const [canvas, ctx] = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    return [canvas, ctx];
  }, []);

  // Characters to rain down: "HIRE ME "
  const text = "HIRE ME ";
  const chars = text.split("");
  const fontSize = 16;
  const columns = Math.ceil(canvas.width / fontSize);

  // Initialize drops pre-populated across the canvas height to avoid delay on load
  const drops = useMemo(() => {
    const arr = [];
    const maxVisibleDrops = Math.ceil(canvas.height / fontSize);
    for (let i = 0; i < columns; i++) {
      arr[i] = Math.random() * maxVisibleDrops - Math.random() * 50;
    }
    return arr;
  }, [columns, canvas.height]);

  // Bright cyan and orange colors
  const colors = ["#00E5FF", "#5ea8ff", "#FF9F00", "#ff6b00", "#ffb03a"];

  let lastTime = 0;
  const fps = 12; // Slow matrix rain speed
  const interval = 1000 / fps;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const timestamp = time * 1000;

    const elapsed = timestamp - lastTime;
    if (elapsed < interval) return;
    lastTime = timestamp - (elapsed % interval);

    // Draw the trail effect with dark gray background
    ctx.fillStyle = "rgba(8, 8, 8, 0.15)"; // #080808
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `bold ${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      // Pick character based on vertical index
      const charIndex = Math.floor(Math.abs(drops[i])) % chars.length;
      const char = chars[charIndex];

      const color = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillStyle = color;

      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      // Move drop down
      drops[i]++;

      // Reset when going off screen
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
        drops[i] = 0;
      }
    }

    // Signal Three.js that the texture has updated
    if (textureRef.current) {
      textureRef.current.needsUpdate = true;
    }
  });

  // Calculate the required viewport size at z = -8 to cover the screen
  const vp = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, -8));

  return (
    <mesh position={[0, 0.5, -8]} renderOrder={1}>
      <planeGeometry args={[vp.width * 1.5, vp.height * 1.5]} />
      <meshBasicMaterial depthWrite={false} toneMapped={false} fog={false} transparent opacity={0.12}>
        <canvasTexture ref={textureRef} attach="map" image={canvas} minFilter={THREE.LinearFilter} />
      </meshBasicMaterial>
    </mesh>
  );
}
