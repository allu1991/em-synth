import './style.scss'
import ReactDOM from 'react-dom/client'
import { StrictMode, useState, createContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { Leva } from 'leva'
import App from './App.jsx'
import Options from './Options.jsx'
import PanIndicator from './PanIndicator.jsx'

// Create a context to share effect states and setters across components
export const EffectsContext = createContext();
const root = ReactDOM.createRoot(document.querySelector('#root'))

function Root() {

    // Effect states and setters in the root component to be passed down via context
    const [isFreeCamera, setIsFreeCamera] = useState(false);
    const [isDebugMenuOpen, setIsDebugMenuOpen] = useState(false);
    const [isPerformanceMonitorOpen, setIsPerformanceMonitorOpen] = useState(false);
    const [noiseFilterEnabled, setNoiseFilterEnabled] = useState(true);
    const [chromaticAberrationEnabled, setChromaticAberrationEnabled] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    return (
        <EffectsContext.Provider value={{
            isFreeCamera,
            setIsFreeCamera,
            isDebugMenuOpen,
            setIsDebugMenuOpen,
            isPerformanceMonitorOpen,
            setIsPerformanceMonitorOpen,
            noiseFilterEnabled,
            setNoiseFilterEnabled,
            chromaticAberrationEnabled,
            setChromaticAberrationEnabled,
            animationComplete,
            setAnimationComplete
        }}>
            <StrictMode>
                <Leva hidden={!isDebugMenuOpen} />
                <Canvas
                    shadows
                    camera={ {
                        fov: 45,
                        near: 0.1,
                        far: 200,
                        position: [ 0, 0, 7 ]
                    } }
                >
                    {isPerformanceMonitorOpen && (
                        <Perf position="top-left" />
                    )}
                    <App />
                </Canvas>
                <Options />
                <PanIndicator />
            </StrictMode>
        </EffectsContext.Provider>
    )
}

root.render(<Root />)