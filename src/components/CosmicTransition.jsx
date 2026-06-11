"use client";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function CosmicTransition({
  triggerRef,
  onComplete,
}) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    // Expose the global trigger function through triggerRef
    triggerRef.current = (targetRoute) => {
      if (active) return;
      setActive(true);

      // Lock pointer events
      document.body.style.pointerEvents = "none";

      const canvas = canvasRef.current;
      if (!canvas) {
        // Fallback if canvas is not ready
        setTimeout(() => {
          navigate(targetRoute);
          document.body.style.pointerEvents = "auto";
          setActive(false);
          if (onComplete) onComplete();
        }, 1200);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);

      // Transition Particle class
      class CosmicParticle {
        constructor() {
          this.x = width / 2;
          this.y = height / 2;
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 8 + 4;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.size = Math.random() * 4 + 1.5;
          this.color = `rgba(${139 + Math.random() * 50}, ${92 + Math.random() * 40}, ${246}, `;
          this.alpha = 1;
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.alpha -= 0.012;
        }

        draw(c) {
          c.save();
          c.beginPath();
          c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          c.fillStyle = this.color + this.alpha + ")";
          c.shadowBlur = 12;
          c.shadowColor = "rgba(167, 139, 250, 0.8)";
          c.fill();
          c.restore();
        }
      }

      // Star streak class
      class StarStreak {
        constructor() {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 18 + 12;
          this.x = width / 2;
          this.y = height / 2;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.length = Math.random() * 40 + 20;
          this.alpha = 1;
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.length += 3.5;
          this.alpha -= 0.015;
        }

        draw(c) {
          c.save();
          c.beginPath();
          c.moveTo(this.x, this.y);
          c.lineTo(this.x - this.vx * (this.length / 50), this.y - this.vy * (this.length / 50));
          c.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
          c.lineWidth = 1.8;
          c.stroke();
          c.restore();
        }
      }

      const particles = [];
      const stars = [];

      // Populate initial particle explosion from center
      for (let i = 0; i < 300; i++) {
        particles.push(new CosmicParticle());
      }

      // Warp speed star streaks generator loop
      const starsInterval = setInterval(() => {
        for (let i = 0; i < 12; i++) {
          stars.push(new StarStreak());
        }
      }, 30);

      // Canvas animator
      let animId;
      const tick = () => {
        ctx.fillStyle = "rgba(4, 2, 10, 0.25)";
        ctx.fillRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.update();
          p.draw(ctx);
          if (p.alpha <= 0) particles.splice(i, 1);
        }

        for (let i = stars.length - 1; i >= 0; i--) {
          const s = stars[i];
          s.update();
          s.draw(ctx);
          if (s.alpha <= 0) stars.splice(i, 1);
        }

        animId = requestAnimationFrame(tick);
      };

      tick();

      // Trigger GSAP timeline for visual transition phases
      const tl = gsap.timeline({
        onComplete: () => {
          clearInterval(starsInterval);
          cancelAnimationFrame(animId);
          navigate(targetRoute);
          document.body.style.pointerEvents = "auto";
          setActive(false);
          if (onComplete) onComplete();
        },
      });

      // Part 1: Staggered zoom wash
      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Part 2: Brief white flash frame (opacity 1, duration 0.08s) at 1.0s mark
      tl.to(
        flashRef.current,
        {
          opacity: 1,
          duration: 0.08,
          ease: "none",
        },
        1.0
      ).to(flashRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: "none",
      });
    };
  }, [active, navigate, onComplete, triggerRef]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none opacity-0 flex items-center justify-center bg-[#080808]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        ref={flashRef}
        className="absolute inset-0 w-full h-full bg-white opacity-0 pointer-events-none"
      />
    </div>
  );
}
