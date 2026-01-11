
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    // @ts-ignore
    if (window.lucide) {
        // @ts-ignore
        window.lucide.createIcons();
    }

    // 2. Initialize Canvas Particles
    initParticles();
});

const initParticles = () => {
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // "Embers" style particles (rising up)
    const particles: any[] = [];
    const particleCount = 40;

    class Particle {
        x: number;
        y: number;
        size: number;
        speedY: number;
        opacity: number;
        fadeSpeed: number;

        constructor() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 20; // Start below screen
            this.size = Math.random() * 2 + 0.5;
            this.speedY = Math.random() * 1 + 0.2;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.fadeSpeed = Math.random() * 0.002 + 0.001;
        }

        update() {
            this.y -= this.speedY;
            this.opacity -= this.fadeSpeed;

            // Reset if out of screen or invisible
            if (this.y < -10 || this.opacity <= 0) {
                this.y = height + 10;
                this.x = Math.random() * width;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
        }

        draw() {
            if (!ctx) return;
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`; // Gold color
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
        // Randomize initial Y positions to fill screen
        particles[i].y = Math.random() * height;
    }

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    };

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });
};
