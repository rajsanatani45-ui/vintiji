// ========================================
// Rose Day - Premium Romantic Website
// JavaScript Controller
// ========================================

// Global function for button onclick
function handleUnlock() {
    const passwordInput = document.getElementById('password-input');
    const passwordScreen = document.getElementById('password-screen');
    const rosedayScreen = document.getElementById('roseday-screen');
    const errorMsg = document.getElementById('error-msg');

    const CORRECT_PASSWORD = 'Vintiday1';
    const enteredPassword = passwordInput.value;

    if (enteredPassword === CORRECT_PASSWORD) {
        // Success - transition to Rose Day screen
        passwordScreen.classList.remove('active');
        rosedayScreen.classList.add('active');

        // Clear any error
        errorMsg.textContent = '';

        // Add entrance animation
        rosedayScreen.style.animation = 'fadeIn 1s ease-out';

        // Auto-play music after a short delay
        setTimeout(() => {
            const audioPlayer = document.getElementById('audio-player');
            const playIcon = document.getElementById('play-icon');
            const musicDisk = document.getElementById('music-disk');

            audioPlayer.play().then(() => {
                playIcon.textContent = '⏸';
                musicDisk.classList.add('playing');
            }).catch((error) => {
                console.log('Auto-play was prevented. Click play to start music.');
            });
        }, 1000);

    } else {
        // Wrong password
        errorMsg.textContent = '💔 Incorrect password. Try again with love!';
        passwordInput.value = '';
        passwordInput.focus();

        // Shake animation
        errorMsg.style.animation = 'none';
        setTimeout(() => {
            errorMsg.style.animation = 'shake 0.5s ease';
        }, 10);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const passwordScreen = document.getElementById('password-screen');
    const rosedayScreen = document.getElementById('roseday-screen');
    const passwordInput = document.getElementById('password-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const errorMsg = document.getElementById('error-msg');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const audioPlayer = document.getElementById('audio-player');
    const musicDisk = document.getElementById('music-disk');

    // Enter key support for password input
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUnlock();
        }
    });

    // Clear error on input
    passwordInput.addEventListener('input', () => {
        errorMsg.textContent = '';
    });

    // ========================================
    // Music Player Controls
    // ========================================
    let isPlaying = false;

    function playMusic() {
        audioPlayer.play().then(() => {
            isPlaying = true;
            playIcon.textContent = '⏸';
            musicDisk.classList.add('playing');
        }).catch((error) => {
            console.log('Auto-play was prevented. Click play to start music.');
        });
    }

    function pauseMusic() {
        audioPlayer.pause();
        isPlaying = false;
        playIcon.textContent = '▶';
        musicDisk.classList.remove('playing');
    }

    function toggleMusic() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    playPauseBtn.addEventListener('click', toggleMusic);

    // Handle audio ended
    audioPlayer.addEventListener('ended', () => {
        // Since it's on loop, this shouldn't trigger, but just in case
        playIcon.textContent = '▶';
        musicDisk.classList.remove('playing');
        isPlaying = false;
    });

    // ========================================
    // Additional Animations
    // ========================================

    // Add CSS fadeIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Create sparkle effects on click
    document.addEventListener('click', (e) => {
        if (rosedayScreen.classList.contains('active')) {
            createSparkle(e.clientX, e.clientY);
        }
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 24px;
            pointer-events: none;
            z-index: 1000;
            animation: sparkleAnim 1s ease-out forwards;
        `;
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    // Add sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleAnim {
            0% {
                opacity: 1;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1.5) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg) translateY(-50px);
            }
        }
    `;
    document.head.appendChild(sparkleStyle);

    // ========================================
    // Hearts floating on main screen
    // ========================================
    function createFloatingHeart() {
        if (!rosedayScreen.classList.contains('active')) return;

        const heart = document.createElement('div');
        const hearts = ['❤️', '💕', '💖', '💗', '💓', '💞'];
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

        const startX = Math.random() * window.innerWidth;

        heart.style.cssText = `
            position: fixed;
            left: ${startX}px;
            bottom: -50px;
            font-size: ${20 + Math.random() * 30}px;
            pointer-events: none;
            z-index: 5;
            animation: floatUp ${5 + Math.random() * 5}s linear forwards;
            opacity: ${0.5 + Math.random() * 0.5};
        `;

        rosedayScreen.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    // Add floating hearts animation
    const heartStyle = document.createElement('style');
    heartStyle.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: var(--initial-opacity, 0.7);
            }
            100% {
                transform: translateY(-120vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(heartStyle);

    // Create hearts periodically
    setInterval(createFloatingHeart, 2000);

    // ========================================
    // Interactive Rose Cards
    // ========================================
    const roseCards = document.querySelectorAll('.rose-card');
    roseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-20px) scale(1.1)';
            card.style.boxShadow = '0 25px 50px rgba(255, 77, 109, 0.4)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // Focus password input on load
    passwordInput.focus();
});
