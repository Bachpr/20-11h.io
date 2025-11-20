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

// Hiệu ứng con trỏ chuột
document.addEventListener('mousemove', function(e) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.width = '5px';
    sparkle.style.height = '5px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.backgroundColor = '#fff';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkle 1s ease-out';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

// Thêm CSS cho hiệu ứng sparkle
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Hiệu ứng chữ xuất hiện từng dòng
window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.message p');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.transition = 'opacity 1s ease';
            el.style.opacity = '1';
        }, index * 500);
    });
});
