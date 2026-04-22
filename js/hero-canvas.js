/**
 * Hero Background Canvas Animation.
 * Autonomous neural constellation: nodes drift organically with
 * independent pulsing and glowing connections. No cursor interaction.
 */
(function() {
    let canvas, ctx, particles, animationId, width, height;
    const PARTICLE_COUNT = 70;
    const CONNECTION_DISTANCE = 180;
    const BASE_SPEED = 0.25;

    /**
     * Represents a single node in the neural constellation.
     * Each particle has position, velocity, radius, and a breathing phase.
     */
    class Particle {
        constructor(w, h) {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * BASE_SPEED;
            this.vy = (Math.random() - 0.5) * BASE_SPEED;
            this.baseRadius = Math.random() * 2.5 + 1;
            this.radius = this.baseRadius;
            this.phase = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.01 + Math.random() * 0.02;
        }

        /** Updates position, applies boundary bouncing, and calculates organic pulse. */
        update(w, h) {
            // Organic pulse: each node breathes independently
            this.phase += this.pulseSpeed;
            this.radius = this.baseRadius + Math.sin(this.phase) * 0.8;

            // Damping to prevent runaway speeds
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > BASE_SPEED * 3) {
                this.vx *= 0.98;
                this.vy *= 0.98;
            }

            this.x += this.vx;
            this.y += this.vy;

            // Soft boundary bounce
            if (this.x < 0) { this.x = 0; this.vx *= -0.8; }
            if (this.x > w) { this.x = w; this.vx *= -0.8; }
            if (this.y < 0) { this.y = 0; this.vy *= -0.8; }
            if (this.y > h) { this.y = h; this.vy *= -0.8; }
        }
    }

    /** Initializes the canvas, creates particles, and starts the animation loop. */
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

    /** Resizes the canvas to match its parent container dimensions. */
    function resize() {
        if (!canvas) return;
        const parent = canvas.parentElement;
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
    }

    /** Core animation loop: updates particles, draws nodes and connections each frame. */
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Read theme color from CSS variable
        const particleColorRaw = getComputedStyle(document.documentElement)
            .getPropertyValue('--hero-particle-color').trim() || '197, 160, 89';

        // Update all particles
        particles.forEach(p => p.update(width, height));

        // Draw connections first (behind nodes)
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONNECTION_DISTANCE) {
                    const proximity = 1 - (distance / CONNECTION_DISTANCE);

                    // Subtle static opacity based on proximity alone
                    const finalOpacity = proximity * 0.15;

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${particleColorRaw}, ${finalOpacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes on top
        particles.forEach(p => {
            // Core node with steady opacity
            const nodeOpacity = 0.4;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleColorRaw}, ${nodeOpacity})`;
            ctx.fill();
        });

        animationId = requestAnimationFrame(animate);
    }

    /** Stops the animation loop and cleans up event listeners. */
    function stop() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        window.removeEventListener('resize', resize);
    }

    window.initHeroCanvas = init;
    window.stopHeroCanvas = stop;
})();
