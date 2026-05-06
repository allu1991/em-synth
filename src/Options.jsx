import React, { useRef, useState, useEffect, useContext } from 'react'
import { EffectsContext } from './index.jsx'

export default function Options() {

    // References
    const asideRef = useRef(null);

    // State to track if the options menu is open
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Get the effect states and setters from the context
    const {
        isFreeCamera,
        setIsFreeCamera,
        isPerformanceMonitorOpen,
        setIsPerformanceMonitorOpen,
        isDebugMenuOpen,
        setIsDebugMenuOpen,
        noiseFilterEnabled,
        setNoiseFilterEnabled,
        chromaticAberrationEnabled,
        setChromaticAberrationEnabled,
        scanLinesEnabled,
        setScanLinesEnabled,
        animationComplete,
    } = useContext(EffectsContext);

    // Close the options menu when clicking outside of it
    useEffect(() => {
        if (!optionsOpen) return;
        const handleClickOutside = (e) => {
            if (asideRef.current && !asideRef.current.contains(e.target)) {
                setOptionsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [optionsOpen]);

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

    const toggleIsFreeCamera = () => {
        setIsFreeCamera(!isFreeCamera);
    }

    const togglePerformanceMonitor = () => {
        setIsPerformanceMonitorOpen(!isPerformanceMonitorOpen);
    }

    const toggleDebugMenu = () => {
        setIsDebugMenuOpen(!isDebugMenuOpen);
    }

    const toggleNoiseFilter = () => {
        setNoiseFilterEnabled(!noiseFilterEnabled);
    }

    const toggleChromaticAberration = () => {
        setChromaticAberrationEnabled(!chromaticAberrationEnabled);
    }

    const toggleScanLines = () => {
        setScanLinesEnabled(!scanLinesEnabled)
    }

    return (
        <aside className="options" ref={asideRef}>
            {animationComplete && (
                <button
                    className={`options__toggle-button ${optionsOpen ? 'active' : ''}`}
                    onClick={() => setOptionsOpen(!optionsOpen)}
                    title={optionsOpen ? 'Close options' : 'Open options'}
                >
                    <img src="./icons/icon-gear.svg" alt="" width="24" height="24" />
                </button>
            )}

            {optionsOpen && (
                <div className='options__modal'>
                    <div className="options__modal--borders">
                        <span className="border-purple"></span>
                        <span className="border-cyan"></span>
                    </div>

                    <div className="options__modal--inner">
                        <h2>Options</h2>

                        <label className="label-container" id="options-fullscreen">
                            <span className="input-label">Fullscreen</span>
                            <input
                                type="checkbox" 
                                checked={isFullscreen} 
                                onChange={toggleFullScreen}
                            />
                            <span className="checkmark"></span>
                        </label>

                        <label className="label-container" id="options-free-camera">
                            <span className="input-label">Free camera</span>
                            <input
                                type="checkbox"
                                checked={isFreeCamera}
                                onChange={toggleIsFreeCamera}
                            />
                            <span className="checkmark"></span>
                        </label>

                        <label className="label-container" id="options-performance-monitor">
                            <span className="input-label">Performance monitor</span>
                            <input
                                type="checkbox"
                                checked={isPerformanceMonitorOpen}
                                onChange={togglePerformanceMonitor}
                            />
                            <span className="checkmark"></span>
                        </label>

                        <label className="label-container" id="options-debug-menu">
                            <span className="input-label">Debug menu</span>
                            <input
                                type="checkbox"
                                checked={isDebugMenuOpen}
                                onChange={toggleDebugMenu}
                            />
                            <span className="checkmark"></span>
                        </label>

                        <label className="label-container" id="options-noise-filter">
                            <span className="input-label">Noise filter</span>
                            <input
                                type="checkbox"
                                checked={noiseFilterEnabled}
                                onChange={toggleNoiseFilter}
                            />
                            <span className="checkmark"></span>
                        </label>

                        <label className="label-container" id="options-chromatic-aberration">
                            <span className="input-label">Chromatic aberration</span>
                            <input
                                type="checkbox"
                                checked={chromaticAberrationEnabled}
                                onChange={toggleChromaticAberration}
                            />
                            <span className="checkmark"></span>
                        </label>

                        <label className="label-container" id="options-scan-lines">
                            <span className="input-label">Scan lines</span>
                            <input
                                type="checkbox"
                                checked={scanLinesEnabled}
                                onChange={toggleScanLines}
                            />
                            <span className="checkmark"></span>
                        </label>

                    </div>
                </div>
            )}
        </aside>
    );
}
