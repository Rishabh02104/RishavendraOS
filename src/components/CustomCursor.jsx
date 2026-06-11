"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailsRef = useRef([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide system cursor on mount
    document.body.style.cursor = "none";

    // Track mouse with exactly 0 delay (no React state updates)
    const move = (e) => {
      const { clientX, clientY } = e;
      
      // Update primary cursor position instantly
      cursor.style.transform = `translate(${clientX - 6}px, ${clientY - 6}px)`;

      // Update trailing ghost orbs directly in DOM with standard stagger
      trailsRef.current.forEach((trailEl, idx) => {
        if (trailEl) {
          const size = 8 * ((4 - idx) / 4);
          const halfSize = size / 2;
          trailEl.style.transform = `translate(${clientX - halfSize}px, ${clientY - halfSize}px)`;
        }
      });
    };

    // Hover state observer
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive-3d");

      if (isInteractive) {
        cursor.classList.add("cursor-hover");
      } else {
        cursor.classList.remove("cursor-hover");
      }
    };

    const handle3dHoverStart = () => {
      cursor.classList.add("cursor-hover");
    };

    const handle3dHoverEnd = () => {
      cursor.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("3d-hover-start", handle3dHoverStart);
    window.addEventListener("3d-hover-end", handle3dHoverEnd);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("3d-hover-start", handle3dHoverStart);
      window.removeEventListener("3d-hover-end", handle3dHoverEnd);
    };
  }, []);

  return (
    <>
      {/* Primary Cursor Orb */}
      <div
        ref={cursorRef}
        id="custom-cursor-main"
        className="fixed pointer-events-none rounded-full bg-[#5ea8ff] shadow-[0_0_12px_rgba(94,168,255,0.85)]"
        style={{
          width: "12px",
          height: "12px",
          zIndex: 99999,
          willChange: "transform",
          left: 0,
          top: 0,
          transform: "translate(-6px, -6px)",
          transition: "none", // Critical: no transition on main orb
          pointerEvents: "none",
        }}
      />

      {/* Trailing ghost orbs (Max 30ms transition delay) */}
      {Array.from({ length: 4 }).map((_, idx) => {
        const size = 8 * ((4 - idx) / 4);
        const opacity = 0.35 * ((4 - idx) / 4);
        // Stagger delay: max delay is 30ms (0.03s) at idx=3
        const delaySec = 0.0075 * (idx + 1); 
        return (
          <div
            key={idx}
            ref={(el) => (trailsRef.current[idx] = el)}
            className="fixed pointer-events-none rounded-full bg-[#5ea8ff]/20"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              zIndex: 99998,
              willChange: "transform",
              left: 0,
              top: 0,
              opacity: opacity,
              transform: `translate(-${size / 2}px, -${size / 2}px)`,
              transition: `transform ${delaySec}s cubic-bezier(0.1, 0.8, 0.2, 1.0)`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
}
