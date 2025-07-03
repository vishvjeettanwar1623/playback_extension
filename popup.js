document.addEventListener('DOMContentLoaded', function() {
    const currentSpeedElement = document.getElementById('currentSpeed');
    let activeButton = null;
    
    // Function to set speed and update UI
    function setSpeed(speed) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'setSpeed',
                    speed: speed
                }, function(response) {
                    if (chrome.runtime.lastError) {
                        console.log('Error:', chrome.runtime.lastError);
                        return;
                    }
                    if (response && response.success) {
                        currentSpeedElement.textContent = speed + 'x';
                        
                        // Update active button
                        if (activeButton) {
                            activeButton.classList.remove('active');
                        }
                        const newActiveButton = document.getElementById(`speed${speed}x`.replace('.', '_'));
                        if (newActiveButton) {
                            newActiveButton.classList.add('active');
                            activeButton = newActiveButton;
                        }
                    }
                });
            }
        });
    }

    // Add click handlers for all buttons
    document.getElementById('speed1x').addEventListener('click', () => setSpeed(1));
    document.getElementById('speed1_5x').addEventListener('click', () => setSpeed(1.5));
    document.getElementById('speed2x').addEventListener('click', () => setSpeed(2));
    document.getElementById('speed2_5x').addEventListener('click', () => setSpeed(2.5));
    document.getElementById('speed3x').addEventListener('click', () => setSpeed(3));
    document.getElementById('speed3_5x').addEventListener('click', () => setSpeed(3.5));
    document.getElementById('speed4x').addEventListener('click', () => setSpeed(4));
}); 