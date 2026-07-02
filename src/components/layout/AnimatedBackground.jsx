import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function Premium3DBackground() {
  const canvasRef = useRef(null);
  
  // Mouse track state vectors for interactive radial glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physical dampener setup
  const springConfig = { stiffness: 60, damping: 22, mass: 0.6 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset calculated to position the glowing element directly under cursor center
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle Array generation matrix
    const particleCount = 65;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.4, // Tiny stars vs floating elements variation
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.4 - 0.1, // Moving upwards consistently
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Handle vector path update updates
        p.y += p.speedY;
        p.x += p.speedX;
        
        // Twinkle pulse computation
        p.alpha += p.pulseSpeed;
        if (p.alpha > 1 || p.alpha < 0.2) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        // Infinite loop threshold loop bounds tracking logic
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10 || p.x > canvas.width + 10) {
          p.speedX = -p.speedX;
        }

        // Render nodes context map output
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${Math.max(0, Math.min(1, p.alpha))})`; // Cyan stars accent
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = "rgb(34, 211, 238)";
        ctx.fill();
      }
      
      ctx.shadowBlur = 0; // Reset canvas glow properties context
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-[#030712]">
      {/* 🌌 Aurora Wave Effect Layer */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen blur-[140px]">
        {/* Deep Cyan Mesh Node */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 h-[70vw] w-[70vw] rounded-full bg-gradient-to-br from-cyan-500/40 via-blue-600/20 to-transparent"
        />
        
        {/* Royal Blue / Indigo Mesh Node */}
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 30, -60, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 h-[75vw] w-[75vw] rounded-full bg-gradient-to-tl from-indigo-500/30 via-purple-600/10 to-transparent"
        />
      </div>

      {/* 💫 Mouse Interactive Glow Component Fluid Block */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        className="absolute h-[500px] w-[500px] rounded-full bg-radial from-cyan-500/8 via-blue-500/2 to-transparent blur-[80px] will-change-transform"
      />

      {/* ✨ Stars and Particles Canvas Surface Element */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />

      {/* 🔥 Premium Dark Glassmorphism Matte Vignette Overlay Grid */}
      <div className="absolute inset-0 bg-radial-vignette from-transparent via-slate-950/40 to-slate-950" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/10 via-transparent to-slate-950/80" />
    </div>
  );
}

export default Premium3DBackground;