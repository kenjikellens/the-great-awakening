/**
 * Hero Background Canvas Animation.
 * Interactive neural constellation: mouse-reactive nodes with organic
 * pulsing, gravitational attraction, and glowing connections.
 */
(function() {
    let canvas, ctx, particles, animationId, mouse, width, height;
    const PARTICLE_COUNT = 70;
    const CONNECTION_DISTANCE = 180;
    const MOUSE_RADIUS = 250;
    const BASE_SPEED = 0.25;

    /** Tracks the current mouse/touch position over the hero canvas. */
    mouse = { x: -1000, y: -1000, active: false };

    /**
     * Represents a single node in the neural constellation.
     * Each particle has position, velocity, radius, phase, and a glow intensity.
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
            this.glowIntensity = 0;
        }

        /** Updates position, applies boundary bouncing, and calculates organic pulse. */
        update(w, h, time) {
            // Organic pulse: each node breathes independently
            this.phase += this.pulseSpeed;
            this.radius = this.baseRadius + Math.sin(this.phase) * 0.8;

            // Mouse gravitational attraction
            if (mouse.active) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_RADIUS && dist > 1) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.015;
                    this.vx += (dx / dist) * force;
                    this.vy += (dy / dist) * force;
                    this.glowIntensity = Math.min(1, this.glowIntensity + 0.05);
                } else {
                    this.glowIntensity *= 0.97;
                }
            } else {
                this.glowIntensity *= 0.97;
            }

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
        canvas.style.pointerEvents = 'auto';
        resize();

        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }

        // Mouse/touch event listeners for interactivity
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseleave', onMouseLeave);
        canvas.addEventListener('touchmove', onTouchMove, { passive: true });
        canvas.addEventListener('touchend', onMouseLeave);
        window.addEventListener('resize', resize);
        animate(0);
    }

    /** Handles mouse movement over the canvas. */
    function onMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    }

    /** Handles touch movement over the canvas. */
    function onTouchMove(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.active = true;
    }

    /** Deactivates mouse tracking when cursor leaves the canvas. */
    function onMouseLeave() {
        mouse.active = false;
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
    function animate(time) {
        ctx.clearRect(0, 0, width, height);

        // Read theme color from CSS variable
        const particleColorRaw = getComputedStyle(document.documentElement)
            .getPropertyValue('--hero-particle-color').trim() || '197, 160, 89';

        // Update all particles
        particles.forEach(p => p.update(width, height, time));

        // Draw connections first (behind nodes)
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONNECTION_DISTANCE) {
                    const proximity = 1 - (distance / CONNECTION_DISTANCE);
                    const avgGlow = (particles[i].glowIntensity + particles[j].glowIntensity) / 2;

                    // Base opacity + glow boost when mouse is near
                    const baseOpacity = proximity * 0.15;
                    const glowBoost = avgGlow * proximity * 0.35;
                    const finalOpacity = baseOpacity + glowBoost;

                    // Line width thickens near mouse
                    const lineWidth = 0.5 + avgGlow * 1.5;

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${particleColorRaw}, ${finalOpacity})`;
                    ctx.lineWidth = lineWidth;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes on top
        particles.forEach(p => {
            // Outer glow ring (visible when mouse is near)
            if (p.glowIntensity > 0.05) {
                const glowRadius = p.radius + 8 * p.glowIntensity;
                const gradient = ctx.createRadialGradient(
                    p.x, p.y, p.radius * 0.5,
                    p.x, p.y, glowRadius
                );
                gradient.addColorStop(0, `rgba(${particleColorRaw}, ${0.3 * p.glowIntensity})`);
                gradient.addColorStop(1, `rgba(${particleColorRaw}, 0)`);
                ctx.beginPath();
                ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            // Core node
            const nodeOpacity = 0.4 + p.glowIntensity * 0.5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleColorRaw}, ${nodeOpacity})`;
            ctx.fill();
        });

        // Draw mouse cursor glow when active
        if (mouse.active) {
            const cursorGlow = ctx.createRadialGradient(
                mouse.x, mouse.y, 0,
                mouse.x, mouse.y, MOUSE_RADIUS * 0.4
            );
            cursorGlow.addColorStop(0, `rgba(${particleColorRaw}, 0.06)`);
            cursorGlow.addColorStop(1, `rgba(${particleColorRaw}, 0)`);
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = cursorGlow;
            ctx.fill();
        }

        animationId = requestAnimationFrame(animate);
    }

    /** Stops the animation loop and cleans up event listeners. */
    function stop() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        if (canvas) {
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('mouseleave', onMouseLeave);
            canvas.removeEventListener('touchmove', onTouchMove);
            canvas.removeEventListener('touchend', onMouseLeave);
        }
        window.removeEventListener('resize', resize);
    }

    window.initHeroCanvas = init;
    window.stopHeroCanvas = stop;
})();
