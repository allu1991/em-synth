import React, { useRef, useState, useEffect, useContext } from 'react'
import { EffectsContext } from './index.jsx'

export default function PanIndicator() {

    // Get the effect states and setters from the context
    const { animationComplete } = useContext(EffectsContext);

    // State for controlling the visibility of the pan indicator
    const [visibilityClass, setVisibilityClass] = useState('hidden');

    // When the animation is complete, show the pan indicator after a short delay
    useEffect(() => {
        if (animationComplete) {
            const timer = setTimeout(() => {
                setVisibilityClass('');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [animationComplete]);

    // Hide the pan indicator when the user pans the screen
    useEffect(() => {

        // Only add the event listener after the animation is complete
        if (!animationComplete) return;

        const handlePan = () => {
            console.log('User panned the screen, hiding pan indicator');
            setVisibilityClass('hidden');
            window.removeEventListener('pointerdown', handlePan);
        }

        window.addEventListener('pointerdown', handlePan);
    }, [animationComplete]);

    return (
        <>
            { animationComplete && (
                <aside className={`pan-indicator ${visibilityClass}`}>
                    <img src='./icons/icon-pan.svg' alt="Pan the camera with mouse" />
                </aside>
            )}
        </>
    );
}
