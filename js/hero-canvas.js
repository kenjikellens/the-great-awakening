/**
 * Hero Background Canvas Animation.
 * Implements a subtle particle network (nodes and lines).
 */
(function() {
    let canvas, ctx, particles, animationId;
    const PARTICLE_COUNT = 40;
    const CONNECTION_DISTANCE = 150;
    const PARTICLE_SPEED = 0.4;
    
    class Particle {
        constructor(w, h) {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * PARTICLE_SPEED;
            this.vy = (Math.random() - 0.5) * PARTICLE_SPEED;
            this.radius = Math.random() * 2 + 1;
        }

        update(w, h) {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(197, 160, 89, 0.4)'; // Gold accent
            ctx.fill();
        }
    }

    function init() {
        canvas = document.getElementById('hero-canvas');
        if (!canvas) return;
        
        ctx = canvas.getContext('2d');
        resize();
        
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }
        
        window.addEventListener('resize', resize);
        animate();
    }

    function resize() {
        if (!canvas) return;
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONNECTION_DISTANCE) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = 1 - (distance / CONNECTION_DISTANCE);
                    ctx.strokeStyle = `rgba(197, 160, 89, ${opacity * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update(canvas.width, canvas.height);
            p.draw(ctx);
        });
        
        drawLines();
        animationId = requestAnimationFrame(animate);
    }

    function stop() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        window.removeEventListener('resize', resize);
    }

    window.initHeroCanvas = init;
    window.stopHeroCanvas = stop;
})();
