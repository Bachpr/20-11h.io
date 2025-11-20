// ===== PARTICLE CANVAS 3D =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.vz = Math.random() * 2 + 1;
        this.color = `hsl(${Math.random() * 60 + 280}, 70%, 60%)`;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z -= this.vz;
        
        if (this.z <= 0) {
            this.z = 1000;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
        const scale = 1000 / (1000 + this.z);
        const x = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = 3 * scale;
        
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 1 - this.z / 1000;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== INTRO SCREEN =====
const startBtn = document.getElementById('startBtn');
const introScreen = document.getElementById('introScreen');

startBtn.addEventListener('click', function() {
    introScreen.classList.add('hide');
    setTimeout(() => {
        introScreen.style.display = 'none';
    }, 1000);
});

// Tạo hiệu ứng hoa rơi
function createFlower() {
    const flowersContainer = document.getElementById('flowersContainer');
    const flower = document.createElement('div');
    flower.className = 'flower';
    
    const flowers = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '💐'];
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    
    flower.style.left = Math.random() * 100 + '%';
    flower.style.animationDuration = (Math.random() * 3 + 4) + 's';
    flower.style.animationDelay = Math.random() * 2 + 's';
    
    flowersContainer.appendChild(flower);
    
    setTimeout(() => {
        flower.remove();
    }, 7000);
}

// Tạo hiệu ứng trái tim bay lên
function createHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '❤️';
    
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Tạo hoa liên tục
setInterval(createFlower, 300);

// Tạo trái tim liên tục
setInterval(createHeart, 500);

// Xử lý mở sách
const bookCover = document.getElementById('bookCover');
const bookContent = document.getElementById('bookContent');
const bgMusic = document.getElementById('bgMusic');

bookCover.addEventListener('click', function() {
    bookCover.style.display = 'none';
    bookContent.classList.add('show');
    
    // Phát nhạc nền (tùy chọn)
    // bgMusic.play().catch(e => console.log('Không thể phát nhạc tự động'));
    
    // Tạo hiệu ứng pháo hoa
    createFireworks();
});

// Hiệu ứng pháo hoa khi mở sách
function createFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'fixed';
            firework.style.width = '10px';
            firework.style.height = '10px';
            firework.style.borderRadius = '50%';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.left = '50%';
            firework.style.top = '50%';
            firework.style.pointerEvents = 'none';
            firework.style.zIndex = '1000';
            
            const angle = (Math.PI * 2 * i) / 50;
            const velocity = 5 + Math.random() * 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            document.body.appendChild(firework);
            
            let x = 0, y = 0;
            const animation = setInterval(() => {
                x += vx;
                y += vy;
                firework.style.transform = `translate(${x}px, ${y}px)`;
                firework.style.opacity = parseFloat(firework.style.opacity || 1) - 0.02;
                
                if (parseFloat(firework.style.opacity) <= 0) {
                    clearInterval(animation);
                    firework.remove();
                }
            }, 20);
        }, i * 10);
    }
}

// Hiệu ứng con trỏ chuột nâng cao
let mouseTrail = [];
document.addEventListener('mousemove', function(e) {
    // Tạo sparkle
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.width = '8px';
    sparkle.style.height = '8px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkle 1s ease-out';
    sparkle.style.boxShadow = '0 0 10px currentColor';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
    
    // Tạo trail effect
    mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
    if (mouseTrail.length > 20) mouseTrail.shift();
});

// Thêm CSS cho hiệu ứng sparkle
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== MAGIC BUTTON - Tạo hiệu ứng đặc biệt =====
const magicBtn = document.getElementById('magicBtn');
let magicCount = 0;

magicBtn.addEventListener('click', function() {
    magicCount++;
    
    // Tạo pháo hoa lớn
    createMegaFireworks();
    
    // Tạo hiệu ứng text bay lên
    createFloatingText();
    
    // Tạo hiệu ứng sóng năng lượng
    createEnergyWave();
    
    // Rung động trang
    document.body.style.animation = 'shake 0.5s';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
    
    // Thay đổi text button
    const messages = [
        '🎆 Tuyệt vời! 🎆',
        '✨ Thật tuyệt! ✨',
        '🌟 Tạo thêm! 🌟',
        '💫 Còn nữa! 💫',
        '🎉 Wow! 🎉'
    ];
    magicBtn.textContent = messages[magicCount % messages.length];
});

function createMegaFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff1493'];
    
    for (let burst = 0; burst < 5; burst++) {
        setTimeout(() => {
            const centerX = Math.random() * window.innerWidth;
            const centerY = Math.random() * window.innerHeight * 0.5;
            
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    const firework = document.createElement('div');
                    firework.style.position = 'fixed';
                    firework.style.width = '8px';
                    firework.style.height = '8px';
                    firework.style.borderRadius = '50%';
                    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    firework.style.left = centerX + 'px';
                    firework.style.top = centerY + 'px';
                    firework.style.pointerEvents = 'none';
                    firework.style.zIndex = '10000';
                    firework.style.boxShadow = '0 0 10px currentColor';
                    
                    const angle = (Math.PI * 2 * i) / 100;
                    const velocity = 3 + Math.random() * 7;
                    const vx = Math.cos(angle) * velocity;
                    const vy = Math.sin(angle) * velocity;
                    
                    document.body.appendChild(firework);
                    
                    let x = 0, y = 0, gravity = 0.1;
                    const animation = setInterval(() => {
                        x += vx;
                        y += vy;
                        vy += gravity;
                        firework.style.transform = `translate(${x}px, ${y}px)`;
                        firework.style.opacity = parseFloat(firework.style.opacity || 1) - 0.015;
                        
                        if (parseFloat(firework.style.opacity) <= 0) {
                            clearInterval(animation);
                            firework.remove();
                        }
                    }, 20);
                }, i * 2);
            }
        }, burst * 300);
    }
}

function createFloatingText() {
    const texts = ['❤️', '🌸', '🌟', '✨', '💐', '🎓', '📚', '💝'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const text = document.createElement('div');
            text.textContent = texts[Math.floor(Math.random() * texts.length)];
            text.style.position = 'fixed';
            text.style.left = Math.random() * window.innerWidth + 'px';
            text.style.bottom = '0px';
            text.style.fontSize = (30 + Math.random() * 30) + 'px';
            text.style.pointerEvents = 'none';
            text.style.zIndex = '10000';
            text.style.animation = 'floatUp 3s ease-out';
            
            document.body.appendChild(text);
            
            setTimeout(() => {
                text.remove();
            }, 3000);
        }, i * 100);
    }
}

function createEnergyWave() {
    const wave = document.createElement('div');
    wave.style.position = 'fixed';
    wave.style.top = '50%';
    wave.style.left = '50%';
    wave.style.transform = 'translate(-50%, -50%)';
    wave.style.width = '100px';
    wave.style.height = '100px';
    wave.style.border = '3px solid rgba(255, 255, 255, 0.8)';
    wave.style.borderRadius = '50%';
    wave.style.pointerEvents = 'none';
    wave.style.zIndex = '10000';
    
    document.body.appendChild(wave);
    
    let scale = 1;
    const expand = setInterval(() => {
        scale += 0.5;
        wave.style.transform = `translate(-50%, -50%) scale(${scale})`;
        wave.style.opacity = 1 - (scale / 20);
        
        if (scale >= 20) {
            clearInterval(expand);
            wave.remove();
        }
    }, 20);
}

// Thêm animation shake và floatUp
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(additionalStyles);
