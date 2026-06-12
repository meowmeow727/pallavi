const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const container = document.querySelector('.container');

// Track if the "No" button has been clicked
let noClickAttempts = 0;

// Handle "Yes" button click
yesBtn.addEventListener('click', () => {
    message.innerHTML = "Yay! I love you too! 💖✨<br><span style='font-size: 1.8rem; font-family: Poppins;'>You made my heart so happy, Pallavi! 🥰</span>";
    message.style.display = 'block';
    noBtn.style.display = 'none';
    yesBtn.classList.add('celebrate');
    
    // Create hearts animation
    createHearts();
    createFireworks();
});

// Handle "No" button hover - move it away
noBtn.addEventListener('mouseenter', () => {
    moveButton();
    noClickAttempts++;
    
    // Make "Yes" button bigger after several attempts
    if (noClickAttempts > 3) {
        const isMobile = window.innerWidth <= 768;
        const currentSize = parseFloat(getComputedStyle(yesBtn).fontSize);
        const growthFactor = isMobile ? 0.15 : 0.2;
        const paddingGrowth = isMobile ? 2 : 5;
        
        yesBtn.style.fontSize = `${currentSize + growthFactor}rem`;
        yesBtn.style.padding = `${14 + noClickAttempts}px ${38 + noClickAttempts * paddingGrowth}px`;
    }
});

// Also handle click event for mobile devices
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
    noClickAttempts++;
});

// Add touch event for better mobile support
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
    noClickAttempts++;
});

// Move the "No" button to a random position
function moveButton() {
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate available space with better mobile handling
    const isMobile = window.innerWidth <= 768;
    const padding = isMobile ? 20 : 40;
    
    const maxX = containerRect.width - btnRect.width - padding;
    const maxY = isMobile ? 120 : 150; // Smaller movement range on mobile
    
    // Generate random position
    const randomX = (Math.random() * maxX) - (maxX / 2);
    const randomY = (Math.random() * maxY) - (maxY / 2);
    
    // Apply the new position
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Create floating hearts animation
function createHearts() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💞', '💘'];
    const isMobile = window.innerWidth <= 768;
    const heartCount = isMobile ? 20 : 30; // Fewer hearts on mobile for performance
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.position = 'fixed';
            heart.style.fontSize = isMobile ? `${Math.random() * 30 + 20}px` : `${Math.random() * 40 + 25}px`;
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = '100%';
            heart.style.opacity = '1';
            heart.style.transition = 'all 4s ease-out';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.filter = 'drop-shadow(0 0 10px rgba(255, 107, 157, 0.6))';
            
            document.body.appendChild(heart);
            
            // Animate heart floating up
            setTimeout(() => {
                heart.style.top = '-15%';
                heart.style.opacity = '0';
                const movement = isMobile ? 200 : 300;
                heart.style.transform = `translateX(${(Math.random() - 0.5) * movement}px) rotate(${Math.random() * 720}deg) scale(1.5)`;
            }, 10);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 80);
    }
}

// Create fireworks effect
function createFireworks() {
    const isMobile = window.innerWidth <= 768;
    const fireworkCount = isMobile ? 8 : 15; // Fewer fireworks on mobile
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'fixed';
            firework.style.left = `${Math.random() * 100}%`;
            firework.style.top = `${Math.random() * 60 + 20}%`;
            firework.style.pointerEvents = 'none';
            firework.style.zIndex = '999';
            
            const particleCount = isMobile ? 8 : 12;
            for (let j = 0; j < particleCount; j++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = isMobile ? '6px' : '8px';
                particle.style.height = isMobile ? '6px' : '8px';
                particle.style.borderRadius = '50%';
                particle.style.background = `hsl(${Math.random() * 60 + 320}, 100%, 70%)`;
                particle.style.boxShadow = `0 0 10px hsl(${Math.random() * 60 + 320}, 100%, 70%)`;
                
                const angle = (j / particleCount) * Math.PI * 2;
                const velocity = isMobile ? 60 + Math.random() * 60 : 100 + Math.random() * 100;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;
                
                particle.style.transition = 'all 1.5s ease-out';
                firework.appendChild(particle);
                
                setTimeout(() => {
                    particle.style.transform = `translate(${tx}px, ${ty}px)`;
                    particle.style.opacity = '0';
                }, 10);
            }
            
            document.body.appendChild(firework);
            
            setTimeout(() => {
                firework.remove();
            }, 2000);
        }, i * 200);
    }
}

// Initialize button position
noBtn.style.position = 'absolute';
noBtn.style.left = '0px';
noBtn.style.top = '0px';
