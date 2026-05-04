'use client';
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseR: number;
  hue: number;
  vx: number;
  vy: number;
  angle: number;
  wobbleSpeed: number;
}

export default function Background() {
  // 1. Tambahkan tipe HTMLCanvasElement di sini
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Guard clause untuk context

    let animationFrameId: number;
    let particles: Particle[] = []; // 2. Tambahkan tipe array Particle

    const numParticles = 20;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const initWidth = canvas.width > 0 ? canvas.width : 1200;
    const initHeight = canvas.height > 0 ? canvas.height : 800;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * initWidth,
        y: Math.random() * initHeight,
        baseR: Math.random() * 250 + 150,
        hue: Math.random() * 360,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        angle: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    // 3. Tambahkan tipe MouseEvent
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'screen';

      particles.forEach((p) => {
        p.angle += p.wobbleSpeed;
        p.x += p.vx + Math.cos(p.angle) * 0.8;
        p.y += p.vy + Math.sin(p.angle) * 0.8;
        p.hue += 0.2;

        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance === 0) distance = 0.1;

        const repelRadius = 350;
        if (distance < repelRadius) {
          const force = (repelRadius - distance) / repelRadius;
          const pushStrength = force * 15;
          p.x += (dx / distance) * pushStrength;
          p.y += (dy / distance) * pushStrength;
        }

        const dynamicR = p.baseR + Math.sin(p.angle) * 30;
        const bounceMargin = 150;

        if (p.x < -bounceMargin) {
          p.x = -bounceMargin;
          p.vx = Math.abs(p.vx);
        } else if (p.x > canvas.width + bounceMargin) {
          p.x = canvas.width + bounceMargin;
          p.vx = -Math.abs(p.vx);
        }

        if (p.y < -bounceMargin) {
          p.y = -bounceMargin;
          p.vy = Math.abs(p.vy);
        } else if (p.y > canvas.height + bounceMargin) {
          p.y = canvas.height + bounceMargin;
          p.vy = -Math.abs(p.vy);
        }

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          dynamicR,
        );
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 60%, 0.12)`);
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dynamicR, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950 overflow-hidden">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
