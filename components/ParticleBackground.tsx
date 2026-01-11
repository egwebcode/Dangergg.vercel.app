
import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; size: number; speed: number; alpha: number; decay: number }[] = [];

    const createParticle = (initial = false) => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 10,
      size: Math.random() * 2,
      speed: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      decay: Math.random() * 0.005 + 0.002
    });

    // Init particles
    for (let i = 0; i < 70; i++) {
      particles.push(createParticle(true));
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, index) => {
        p.y -= p.speed;
        p.alpha -= p.decay;

        if (p.y < -10 || p.alpha <= 0) {
          particles[index] = createParticle();
        }

        ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
      />
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,#050505_120%)]" />
    </>
  );
};
