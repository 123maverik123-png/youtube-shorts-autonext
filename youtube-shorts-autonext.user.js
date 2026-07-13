// ==UserScript==
// @name         YouTube Shorts Auto Next
// @namespace    https://github.com/yourusername/youtube-shorts-autonext
// @version      1.0.0
// @description  Automatically skip to the next YouTube Shorts video when the current one ends
// @author       Your Name
// @match        *://www.youtube.com/shorts/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    let alreadySwitched = false;

    function goToNext() {
        const video = document.querySelector('video');
        if (!video) return;

        const currentTime = video.currentTime;
        const duration = video.duration;
        
        if (duration > 0 && currentTime >= duration - 0.3 && !alreadySwitched) {
            alreadySwitched = true;

            // Method 1: Click on the next button
            const fillElement = document.querySelector('.ytSpecTouchFeedbackShapeFill');
            if (fillElement) {
                let btn = fillElement.closest('button');
                if (!btn) btn = fillElement.closest('a');
                if (btn) {
                    btn.click();
                } else {
                    fillElement.click();
                }
            }

            // Method 2: Simulate ArrowDown key
            const event = new KeyboardEvent('keydown', {
                key: 'ArrowDown',
                code: 'ArrowDown',
                keyCode: 40,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(event);

            // Method 3: Click on Next button by aria-label
            const nextBtn = document.querySelector('[aria-label="Next"]');
            if (nextBtn) {
                nextBtn.click();
            }

            // Unlock after 1.5 seconds
            setTimeout(() => {
                alreadySwitched = false;
            }, 1500);
        }
    }

    // Check every 300ms
    const intervalId = setInterval(goToNext, 300);
    console.log('🚀 YouTube Shorts Auto Next started!');

    // Stop script when leaving the page
    window.addEventListener('beforeunload', function() {
        clearInterval(intervalId);
    });

    // Manual switch with F9 key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F9') {
            console.log('🔄 Manual switch triggered');
            alreadySwitched = false;
            goToNext();
        }
    });

})();
