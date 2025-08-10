/* script.js */
function toggleTheme() {
    document.body.classList.toggle('dark');
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

const typed = new Typed('.typing', {
    strings: [
        'Passionate about crafting web experiences.',
        'Skilled in modern web technologies.',
        'Loves turning ideas into reality.'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particleCount = window.innerWidth <= 480 ? 50 : window.innerWidth <= 768 ? 75 : 100;

const particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (window.innerWidth <= 480 ? 2 : 3) + 1;
        this.speedX = Math.random() * (window.innerWidth <= 480 ? 1 : 2) - (window.innerWidth <= 480 ? 0.5 : 1);
        this.speedY = Math.random() * (window.innerWidth <= 480 ? 1 : 2) - (window.innerWidth <= 480 ? 0.5 : 1);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    if (window.innerWidth > 480) connectParticles();
    requestAnimationFrame(animateParticles);
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0;
    initParticles();
});