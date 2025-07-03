// Store the current speed
let currentSpeed = 1;

// Function to set video playback speed
function setPlaybackSpeed(speed) {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        try {
            video.playbackRate = speed;
            video.defaultPlaybackRate = speed;
            currentSpeed = speed;
            console.log(`Speed set to ${speed}x successfully`);
        } catch (error) {
            console.error('Error setting speed:', error);
        }
    });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'setSpeed') {
        setPlaybackSpeed(request.speed);
        sendResponse({ success: true });
    }
    return true;
});

// Function to check and maintain speed
function checkSpeed() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video.playbackRate !== currentSpeed) {
            try {
                video.playbackRate = currentSpeed;
                video.defaultPlaybackRate = currentSpeed;
            } catch (error) {
                console.error('Error maintaining speed:', error);
            }
        }
    });
}

// Check speed every second
setInterval(checkSpeed, 1000);

// Add keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.altKey) {
        let speed = 1;
        switch(event.key) {
            case '1':
                speed = 1;
                break;
            case '2':
                speed = 2;
                break;
            case '3':
                speed = 3;
                break;
            case '4':
                speed = 4;
                break;
            case '5':
                speed = 1.5;
                break;
            case '6':
                speed = 2.5;
                break;
            case '7':
                speed = 3.5;
                break;
            default:
                return;
        }
        setPlaybackSpeed(speed);
    }
});

// Initial setup
setPlaybackSpeed(1);

// Notify that the content script is loaded
chrome.runtime.sendMessage({ action: 'contentScriptLoaded' }); 