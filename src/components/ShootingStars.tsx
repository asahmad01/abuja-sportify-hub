import React, { useEffect, useRef } from 'react';

const ShootingStars = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Star properties
        class Star {
            x: number;
            y: number;
            length: number;
            speed: number;
            angle: number;
            opacity: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.length = Math.random() * 80 + 10;
                this.speed = Math.random() * 10 + 2;
                this.angle = Math.PI / 4; // Diagonal top-left to bottom-right
                this.opacity = Math.random();
                this.color = '255, 255, 255';
            }

            update() {
                this.x += this.speed * Math.cos(this.angle);
                this.y += this.speed * Math.sin(this.angle);

                // Reset when out of bounds
                if (this.x > canvas!.width + this.length || this.y > canvas!.height + this.length) {
                    this.x = Math.random() * canvas!.width - canvas!.width; // Start from left/top outside
                    this.y = Math.random() * canvas!.height - canvas!.height;

                    // Randomly trigger shooting from top-left area more often
                    if (Math.random() > 0.5) {
                        this.x = Math.random() * canvas!.width;
                        this.y = -100;
                    } else {
                        this.x = -100;
                        this.y = Math.random() * canvas!.height;
                    }
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                const tailX = this.x - this.length * Math.cos(this.angle);
                const tailY = this.y - this.length * Math.sin(this.angle);

                const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
                gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
                gradient.addColorStop(1, `rgba(${this.color}, 0)`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.5;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();
            }
        }

        const stars: Star[] = [];
        const starCount = 20; // Number of shooting stars

        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.update();
                star.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
        />
    );
};

export default ShootingStars;
