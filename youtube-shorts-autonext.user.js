// ==UserScript==
// @name         YouTube Shorts Voice Control
// @namespace    https://github.com/123maverik123-png/youtube-shorts-autonext
// @version      3.0.0
// @description  Voice control for YouTube Shorts: next, back, pause, like, home
// @author       123maverik123-png
// @match        *://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    console.log('🎬 YouTube Shorts Voice Control v3.0.0');

    // ============================================================
    // 1. ПЕРЕМЕННЫЕ
    // ============================================================
    let recognition = null;
    let isRunning = false;
    let isProcessing = false;
    let alreadySwitched = false;
    let lastCommandTime = 0;
    let restartTimer = null;
    let isRestarting = false;
    let lastUrl = '';

    // ============================================================
    // 2. ПОИСК КНОПОК
    // ============================================================
    function findNextButton() {
        let btn = document.querySelector('button[aria-label="Следующее видео"]');
        if (btn) return btn;

        const container = document.getElementById('navigation-button-down');
        if (container) {
            const innerBtn = container.querySelector('button');
            if (innerBtn) return innerBtn;
            const fill = container.querySelector('.ytSpecTouchFeedbackShapeFill');
            if (fill) {
                const parent = fill.closest('button');
                if (parent) return parent;
            }
        }
        return null;
    }

    function findPrevButton() {
        let btn = document.querySelector('button[aria-label="Предыдущее видео"]');
        if (btn) return btn;

        const container = document.getElementById('navigation-button-up');
        if (container) {
            const innerBtn = container.querySelector('button');
            if (innerBtn) return innerBtn;
            const fill = container.querySelector('.ytSpecTouchFeedbackShapeFill');
            if (fill) {
                const parent = fill.closest('button');
                if (parent) return parent;
            }
        }
        return null;
    }

    function findLikeButton() {
        let btn = document.querySelector('button[aria-label*="Нравится"]') ||
                  document.querySelector('button[aria-label*="Like"]') ||
                  document.querySelector('button[aria-label*="поставить отметку"]');
        if (btn) return btn;

        const likeIcons = document.querySelectorAll('yt-icon');
        for (let icon of likeIcons) {
            const html = icon.innerHTML || '';
            if (html.includes('thumb_up') || html.includes('like')) {
                const parent = icon.closest('button');
                if (parent) return parent;
            }
        }

        const likeBtn = document.querySelector('#like-button button') ||
                        document.querySelector('ytd-segmented-like-dislike-button-renderer #like-button button');
        if (likeBtn) return likeBtn;

        return null;
    }

    function findHomeButton() {
        let btn = document.querySelector('a[aria-label="Главная"]') ||
                  document.querySelector('a[aria-label="Home"]') ||
                  document.querySelector('a[title="Главная"]') ||
                  document.querySelector('a[title="Home"]');
        if (btn) return btn;

        const logo = document.querySelector('#logo-icon') ||
                     document.querySelector('#ytd-logo') ||
                     document.querySelector('ytd-topbar-logo-renderer a');
        if (logo) return logo;

        const homeLink = document.querySelector('#guide-item-0 a') ||
                         document.querySelector('a[href="/"]');
        if (homeLink) return homeLink;

        return null;
    }

    // ============================================================
    // 3. ДЕЙСТВИЯ
    // ============================================================
    function goNext() {
        console.log('⏩ NEXT');
        const btn = findNextButton();
        if (btn) {
            btn.click();
            console.log('✅ Клик');
            return;
        }
        document.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            code: 'ArrowDown',
            keyCode: 40,
            bubbles: true
        }));
        console.log('⬇️ Стрелка вниз');
    }

    function goBack() {
        console.log('⏪ BACK');
        const btn = findPrevButton();
        if (btn) {
            btn.click();
            console.log('✅ Клик');
            return;
        }
        document.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'ArrowUp',
            code: 'ArrowUp',
            keyCode: 38,
            bubbles: true
        }));
        console.log('⬆️ Стрелка вверх');
    }

    function doPause() {
        const video = document.querySelector('video');
        if (!video) return;
        if (video.paused) {
            video.play();
            console.log('▶️ Play');
        } else {
            video.pause();
            console.log('⏸️ Pause');
        }
    }

    function doLike() {
        console.log('❤️ LIKE');
        const btn = findLikeButton();
        if (btn) {
            const isPressed = btn.getAttribute('aria-pressed') === 'true';
            if (isPressed) {
                console.log('⚠️ Уже лайкнут');
                return;
            }
            btn.click();
            console.log('✅ Лайк поставлен! ❤️');
        } else {
            console.log('❌ Кнопка лайка не найдена');
        }
    }

    function goHome() {
        console.log('🏠 HOME');
        const btn = findHomeButton();
        if (btn) {
            btn.click();
            console.log('✅ Переход на главную');
            return;
        }
        window.location.href = 'https://www.youtube.com/';
        console.log('🌐 Переход по URL');
    }

    // ============================================================
    // 4. АВТОПЕРЕКЛЮЧЕНИЕ
    // ============================================================
    function startAutoSwitch() {
        if (window._autoSwitchInterval) {
            clearInterval(window._autoSwitchInterval);
        }
        window._autoSwitchInterval = setInterval(() => {
            if (!window.location.href.includes('/shorts/')) return;
            const video = document.querySelector('video');
            if (!video) return;
            if (video.duration > 0 &&
                video.currentTime >= video.duration - 0.3 &&
                !alreadySwitched) {
                alreadySwitched = true;
                console.log('⏰ Auto');
                goNext();
                setTimeout(() => { alreadySwitched = false; }, 1500);
            }
        }, 300);
    }

    // ============================================================
    // 5. ГОЛОСОВОЕ РАСПОЗНАВАНИЕ
    // ============================================================
    function startVoice() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.log('❌ Speech Recognition not supported');
            return;
        }

        if (isRunning) {
            console.log('⏳ Already running');
            return;
        }

        console.log('🎤 Starting voice...');

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
                console.log('✅ Microphone OK');
                startRecognition();
            })
            .catch(err => {
                console.error('❌ Microphone error:', err.message);
            });
    }

    function startRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (restartTimer) {
            clearTimeout(restartTimer);
            restartTimer = null;
        }

        if (recognition) {
            try { recognition.abort(); } catch(e) {}
            recognition = null;
        }

        recognition = new SpeechRecognition();
        recognition.lang = 'ru-RU';
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = function() {
            isRunning = true;
            console.log('🎤 LISTENING... Say: дальше, назад, пауза, лайк, главная');
        };

        recognition.onresult = function(event) {
            const text = event.results[0][0].transcript.trim().toLowerCase();
            console.log(`🎤 "${text}"`);

            const now = Date.now();
            if (now - lastCommandTime < 1000) {
                console.log('⏳ Cooldown');
                return;
            }

            if (isProcessing) {
                console.log('⏳ Processing');
                return;
            }

            let cmd = null;
            if (text === 'дальше' || text === 'next' || text === 'следующий') cmd = 'next';
            if (text === 'назад' || text === 'back' || text === 'предыдущий') cmd = 'back';
            if (text === 'пауза' || text === 'pause' || text === 'стоп') cmd = 'pause';
            if (text === 'лайк' || text === 'like' || text === 'нравится') cmd = 'like';
            if (text === 'главная' || text === 'home' || text === 'на главную') cmd = 'home';

            if (!cmd) {
                console.log('⏳ Неизвестная команда');
                return;
            }

            isProcessing = true;
            lastCommandTime = now;
            console.log(`✅ КОМАНДА: ${cmd}`);

            if (cmd === 'next') {
                alreadySwitched = false;
                goNext();
                alreadySwitched = true;
            } else if (cmd === 'back') {
                alreadySwitched = false;
                goBack();
                alreadySwitched = true;
            } else if (cmd === 'pause') {
                doPause();
            } else if (cmd === 'like') {
                doLike();
            } else if (cmd === 'home') {
                stopVoice();
                goHome();
            }

            setTimeout(() => {
                isProcessing = false;
                alreadySwitched = false;
            }, 1500);
        };

        recognition.onerror = function(event) {
            console.warn('⚠️ Error:', event.error);
            if (event.error === 'not-allowed') {
                isRunning = false;
                recognition = null;
            }
        };

        recognition.onend = function() {
            console.log('🎤 Session ended');
            isRunning = false;

            if (window.location.href.includes('/shorts/') && !isRestarting) {
                isRestarting = true;
                restartTimer = setTimeout(() => {
                    isRestarting = false;
                    if (!isRunning) {
                        console.log('🔄 Restart');
                        startRecognition();
                    }
                }, 800);
            }
        };

        recognition.start();
        console.log('🎤 STARTED!');
    }

    function stopVoice() {
        isRunning = false;
        isRestarting = false;
        if (restartTimer) {
            clearTimeout(restartTimer);
            restartTimer = null;
        }
        if (recognition) {
            try { recognition.abort(); } catch(e) {}
            recognition = null;
        }
        console.log('🔇 OFF');
    }

    // ============================================================
    // 6. ОБРАБОТКА SPA-НАВИГАЦИИ
    // ============================================================
    function checkShortsPage() {
        const isShorts = window.location.href.includes('/shorts/');

        if (isShorts) {
            if (!isRunning && !isRestarting) {
                console.log('🔄 Restarting voice on Shorts...');
                setTimeout(startVoice, 1000);
            }
            if (!window._autoSwitchInterval) {
                startAutoSwitch();
            }
        } else {
            if (isRunning) {
                stopVoice();
            }
            if (window._autoSwitchInterval) {
                clearInterval(window._autoSwitchInterval);
                window._autoSwitchInterval = null;
            }
        }
    }

    // ============================================================
    // 7. ГОРЯЧИЕ КЛАВИШИ
    // ============================================================
    document.addEventListener('keydown', function(e) {
        const tag = (e.target.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            goNext();
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            goBack();
        }
        if (e.key === ' ' || e.key === 'Space') {
            e.preventDefault();
            doPause();
        }
        if (e.key === 'l' || e.key === 'L') {
            e.preventDefault();
            doLike();
        }
        if (e.key === 'h' || e.key === 'H') {
            e.preventDefault();
            goHome();
        }
        if (e.key === 'v' || e.key === 'V') {
            if (isRunning) {
                stopVoice();
            } else {
                startVoice();
            }
        }
    });

    // ============================================================
    // 8. ПЕРЕХВАТ SPA-НАВИГАЦИИ YOUTUBE
    // ============================================================
    window.addEventListener('yt-navigate-finish', function() {
        setTimeout(checkShortsPage, 500);
    });

    document.addEventListener('yt-navigate-finish', function() {
        setTimeout(checkShortsPage, 500);
    });

    lastUrl = window.location.href;
    setInterval(() => {
        if (window.location.href !== lastUrl) {
            lastUrl = window.location.href;
            setTimeout(checkShortsPage, 500);
        }
    }, 1000);

    // ============================================================
    // 9. ЗАПУСК
    // ============================================================
    console.log('🚀 INIT');
    startAutoSwitch();
    setTimeout(checkShortsPage, 2000);

    console.log('⌨️ V = voice ON/OFF | L = like | H = home');
    console.log('🎤 Say: "дальше", "назад", "пауза", "лайк", "главная"');

})();
