import React, { useRef, useState, useEffect } from 'react'

export default function Settings() {

    const [isFullscreen, setIsFullscreen] = useState(false);

    // Function to toggle fullscreen mode
    const toggleFullScreen = () => {
        if (!isFullscreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
                document.documentElement.msRequestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    return (
        <div className="settings">
            <button onClick={toggleFullScreen} aria-label={isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}>
                <img src="./textures/icon-gear.svg" alt="" width="24" height="24" />
            </button>
        </div>
    );
}
