/**
 * Hero Background Canvas Animation.
 * Autonomous neural constellation: nodes drift organically with multi-layered 3D depth,
 * fluid wave field dynamics, interactive pointer repulsion, and touch click ripple waves.
 */
(function() {
    let canvas, ctx, particles, animationId, width, height;
    let ripples = [];
    let sparks = [];
    let time = 0;

    const PARTICLE_COUNT = 75;
    const CONNECTION_DISTANCE = 170;
    const BASE_SPEED = 0.22;

    const mouse = {
        x: null,
        y: null,
        targetX: null,
        targetY: null,
        active: false
    };

    /**
     * Represents a single node in the multi-layered neural constellation.
     * Each particle exists at a specific depth layer (z-axis), drifting with fluid wind
     * forces, responding to pointer repulsion, and animating with a rhythmic breath pulse.
     */
    class Particle {
        /**
         * Creates a Particle instance.
         * @param {number} w - The canvas width boundary.
         * @param {number} h - The canvas height boundary.
         */
        constructor(w, h) {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            
            // Depth coefficient (0.5 = far background, 2.0 = close foreground)
            this.z = Math.random() * 1.5 + 0.5;
            
            // Scaled base velocity according to depth layer
            const speedScale = 1 / this.z;
            this.vx = (Math.random() - 0.5) * BASE_SPEED * speedScale;
            this.vy = (Math.random() - 0.5) * BASE_SPEED * speedScale;
            
            // Base radius scaled by depth layer
            this.baseRadius = (Math.random() * 1.5 + 0.8) * this.z;
            this.radius = this.baseRadius;
            
            // Organic pulsation phase
            this.phase = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.005 + Math.random() * 0.01;
        }

        /**
         * Updates position, applies soft mouse repulsion, processes flow field drift,
         * limits maximum speeds, and wraps the coordinates at screen borders.
         * @param {number} w - The canvas width boundary.
         * @param {number} h - The canvas height boundary.
         */
        update(w, h) {
            // Rhythmic node breathing/pulsation
            this.phase += this.pulseSpeed;
            this.radius = this.baseRadius + Math.sin(this.phase) * (this.baseRadius * 0.3);

            // 1. Organic Flow Field Drift (Wind/Swirl)
            const flowAngle = Math.sin(this.x * 0.002 + time * 0.01) * Math.cos(this.y * 0.002 + time * 0.01) * Math.PI * 2;
            const flowStrength = 0.015 * (1 / this.z);
            this.vx += Math.cos(flowAngle) * flowStrength;
            this.vy += Math.sin(flowAngle) * flowStrength;

            // 2. Cursor Repulsion Force (if mouse is active)
            if (mouse.active && mouse.x !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const repulsionRadius = 140 * this.z; // foreground particles have larger repulsion zones
                
                if (dist < repulsionRadius && dist > 0) {
                    // Force scales higher as distance decreases (push away)
                    const force = (repulsionRadius - dist) / repulsionRadius * 0.25 * (this.z / 1.5);
                    this.vx += (dx / dist) * force;
                    this.vy += (dy / dist) * force;
                }
            }

            // 3. Ripple Expansion Wave Repulsion
            ripples.forEach(r => {
                const dx = this.x - r.x;
                const dy = this.y - r.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const waveDist = Math.abs(dist - r.currentRadius);
                
                // If particle sits in the active wavefront buffer (30px width)
                if (waveDist < 30 && dist > 0) {
                    const force = (1 - waveDist / 30) * r.strength * 1.5 * (1 / this.z);
                    this.vx += (dx / dist) * force;
                    this.vy += (dy / dist) * force;
                }
            });

            // 4. Speed Limits to prevent runaway acceleration
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            const maxSpeed = BASE_SPEED * 3.5 * (this.z / 1.0);
            if (speed > maxSpeed) {
                this.vx = (this.vx / speed) * maxSpeed;
                this.vy = (this.vy / speed) * maxSpeed;
            }

            // Apply displacement
            this.x += this.vx;
            this.y += this.vy;

            // 5. Wrap coordinates with a fade-out border margin
            const margin = 40;
            if (this.x < -margin) this.x = w + margin;
            if (this.x > w + margin) this.x = -margin;
            if (this.y < -margin) this.y = h + margin;
            if (this.y > h + margin) this.y = -margin;
        }

        /**
         * Calculates the draw coordinates including the smooth parallax displacement.
         * @param {number} w - The canvas width boundary.
         * @param {number} h - The canvas height boundary.
         * @returns {{x: number, y: number}} The offset coordinates for rendering.
         */
        getDrawCoords(w, h) {
            // If mouse has a tracking state, calculate shift proportional to depth coordinate
            const offsetX = mouse.x !== null ? (mouse.x - w / 2) * 0.035 * (this.z - 0.5) : 0;
            const offsetY = mouse.y !== null ? (mouse.y - h / 2) * 0.035 * (this.z - 0.5) : 0;
            return {
                x: this.x + offsetX,
                y: this.y + offsetY
            };
        }
    }

    /**
     * Represents an expanding energy wave generated by clicking/tapping.
     * Propagates outward, pushing nearby constellation nodes away.
     */
    class Ripple {
        /**
         * Creates a Ripple instance.
         * @param {number} x - The horizontal origin of the ripple.
         * @param {number} y - The vertical origin of the ripple.
         * @param {number} w - The canvas width.
         * @param {number} h - The canvas height.
         */
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.currentRadius = 0;
            this.maxRadius = Math.max(w, h) * 0.4;
            this.speed = 4.5;
            this.strength = 3.5;
            this.opacity = 0.5;
        }

        /**
         * Updates the ripple's propagation state, expanding the radius and decaying strength.
         * @returns {boolean} True if the ripple has finished propagating, false otherwise.
         */
        update() {
            this.currentRadius += this.speed;
            this.opacity = (1 - (this.currentRadius / this.maxRadius)) * 0.5;
            this.strength = (1 - (this.currentRadius / this.maxRadius)) * 3.5;
            return this.currentRadius >= this.maxRadius;
        }

        /**
         * Renders the expanding ripple wave onto the canvas context.
         * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
         * @param {string} color - The base RGB values of the particle theme.
         */
        draw(ctx, color) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${color}, ${this.opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }

    /**
     * Represents a temporary glowing particle emitted during user click events.
     * Moves rapidly with air resistance/friction and fades out quickly.
     */
    class Spark {
        /**
         * Creates a Spark instance.
         * @param {number} x - The starting horizontal position.
         * @param {number} y - The starting vertical position.
         * @param {string} color - The RGB color string to use.
         */
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2.5 + 1.5;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.radius = Math.random() * 1.5 + 0.5;
            this.alpha = 1.0;
            this.decay = 0.015 + Math.random() * 0.015;
        }

        /**
         * Updates the spark's position, applying drag and reducing alpha.
         * @returns {boolean} True if the spark has fully faded, false otherwise.
         */
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.96;
            this.vy *= 0.96;
            this.alpha -= this.decay;
            return this.alpha <= 0;
        }

        /**
         * Renders the spark onto the canvas.
         * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
         */
        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.fill();
        }
    }

    /**
     * Handles pointer movement on the canvas.
     * Updates target coordinates for interactive node responses and parallax.
     * @param {PointerEvent} e - The pointer move event.
     */
    function handlePointerMove(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.active = true;
    }

    /**
     * Handles pointer leaving the canvas boundary.
     * Deactivates cursor interaction and triggers smooth centering reset.
     */
    function handlePointerLeave() {
        mouse.active = false;
        mouse.targetX = null;
        mouse.targetY = null;
    }

    /**
     * Handles click/pointerdown actions on the canvas.
     * Instantiates an expanding force ripple and a burst of glowing spark particles.
     * @param {PointerEvent} e - The pointer down event.
     */
    function handlePointerDown(e) {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Add a force ripple
        ripples.push(new Ripple(clickX, clickY, canvas.width, canvas.height));
        
        // Spawn sparks
        const particleColorRaw = getComputedStyle(document.documentElement)
            .getPropertyValue('--hero-particle-color').trim() || '197, 160, 89';
        for (let i = 0; i < 15; i++) {
            sparks.push(new Spark(clickX, clickY, particleColorRaw));
        }
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

    /** Initializes the canvas, creates particles, and starts the animation loop. */
    function init() {
        canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        ctx = canvas.getContext('2d');
        resize();

        ripples = [];
        sparks = [];
        time = 0;
        mouse.x = null;
        mouse.y = null;
        mouse.targetX = null;
        mouse.targetY = null;
        mouse.active = false;

        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }

        window.addEventListener('resize', resize);
        canvas.addEventListener('pointermove', handlePointerMove);
        canvas.addEventListener('pointerleave', handlePointerLeave);
        canvas.addEventListener('pointerdown', handlePointerDown);
        
        animate();
    }

    /** Core animation loop: updates particles, draws nodes, connections, and interactive ripples. */
    function animate() {
        ctx.clearRect(0, 0, width, height);
        time++;

        // Read theme color from CSS variable
        const particleColorRaw = getComputedStyle(document.documentElement)
            .getPropertyValue('--hero-particle-color').trim() || '197, 160, 89';

        // Update interpolated mouse position for smooth transitions/parallax
        if (mouse.active && mouse.targetX !== null && mouse.targetY !== null) {
            if (mouse.x === null) {
                mouse.x = mouse.targetX;
                mouse.y = mouse.targetY;
            } else {
                mouse.x += (mouse.targetX - mouse.x) * 0.08;
                mouse.y += (mouse.targetY - mouse.y) * 0.08;
            }
        } else {
            if (mouse.x !== null) {
                mouse.x += (width / 2 - mouse.x) * 0.05;
                mouse.y += (height / 2 - mouse.y) * 0.05;
                if (Math.abs(mouse.x - width / 2) < 1 && Math.abs(mouse.y - height / 2) < 1) {
                    mouse.x = null;
                    mouse.y = null;
                }
            }
        }

        // Update active ripples and sparks
        ripples = ripples.filter(r => !r.update());
        sparks = sparks.filter(s => !s.update());

        // Update particles
        particles.forEach(p => p.update(width, height));

        // Draw ripples first (background layer)
        ripples.forEach(r => r.draw(ctx, particleColorRaw));

        // Draw connections between particles (midground layer)
        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            const c1 = p1.getDrawCoords(width, height);

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                
                // Only connect particles in similar depth planes to preserve the 3D parallax effect
                if (Math.abs(p1.z - p2.z) > 0.45) continue;

                const dx = p1.x - p2.x; // relative to raw coordinates to avoid parallax double-offsets
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                const avgZ = (p1.z + p2.z) / 2;
                const maxDist = CONNECTION_DISTANCE * (avgZ / 1.2);

                if (distance < maxDist) {
                    const c2 = p2.getDrawCoords(width, height);
                    const proximity = 1 - (distance / maxDist);
                    const finalOpacity = proximity * 0.16 * (avgZ / 1.5);

                    // Connection line
                    ctx.beginPath();
                    ctx.moveTo(c1.x, c1.y);
                    ctx.lineTo(c2.x, c2.y);
                    ctx.strokeStyle = `rgba(${particleColorRaw}, ${finalOpacity})`;
                    ctx.lineWidth = 0.5 * avgZ;
                    ctx.stroke();

                    // Traveling signal pulse (packet)
                    const pT = (time * 0.003 + (p1.phase + p2.phase)) % 1.0;
                    const pulseX = c1.x + (c2.x - c1.x) * pT;
                    const pulseY = c1.y + (c2.y - c1.y) * pT;
                    ctx.beginPath();
                    ctx.arc(pulseX, pulseY, 1.2 * avgZ, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${particleColorRaw}, ${proximity * 0.65})`;
                    ctx.fill();
                }
            }

            // Draw connection line from cursor to particle (if active and close)
            if (mouse.active && mouse.x !== null) {
                const dx = c1.x - mouse.x;
                const dy = c1.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxCursorDist = CONNECTION_DISTANCE * (p1.z / 1.2);

                if (dist < maxCursorDist) {
                    const proximity = 1 - (dist / maxCursorDist);
                    ctx.beginPath();
                    ctx.moveTo(c1.x, c1.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(${particleColorRaw}, ${proximity * 0.22 * (p1.z / 1.5)})`;
                    ctx.lineWidth = 0.6 * p1.z;
                    ctx.stroke();

                    // Traveling pulse from particle to cursor
                    const pT = (time * 0.005 + p1.phase) % 1.0;
                    const pulseX = c1.x + (mouse.x - c1.x) * pT;
                    const pulseY = c1.y + (mouse.y - c1.y) * pT;
                    ctx.beginPath();
                    ctx.arc(pulseX, pulseY, 1.3 * p1.z, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${particleColorRaw}, ${proximity * 0.8})`;
                    ctx.fill();
                }
            }
        }

        // Draw sparks
        sparks.forEach(s => s.draw(ctx));

        // Draw nodes (foreground layer)
        particles.forEach(p => {
            const coords = p.getDrawCoords(width, height);
            const nodeOpacity = 0.35 * (p.z / 1.5);
            
            // Subtle outer glow halo (scaled by depth)
            ctx.beginPath();
            ctx.arc(coords.x, coords.y, p.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleColorRaw}, ${nodeOpacity * 0.35})`;
            ctx.fill();

            // Core solid node
            ctx.beginPath();
            ctx.arc(coords.x, coords.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleColorRaw}, ${nodeOpacity * 1.5})`;
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
        if (canvas) {
            canvas.removeEventListener('pointermove', handlePointerMove);
            canvas.removeEventListener('pointerleave', handlePointerLeave);
            canvas.removeEventListener('pointerdown', handlePointerDown);
        }
    }

    window.initHeroCanvas = init;
    window.stopHeroCanvas = stop;
})();
