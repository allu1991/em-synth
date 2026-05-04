import './style.scss'
import ReactDOM from 'react-dom/client'
import { Suspense, StrictMode, useState, createContext } from 'react'
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

    // Bundle all context values into a single object to pass to the provider
    const contextValues = {
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
    };

    return (
        <EffectsContext.Provider value={contextValues}>
            <StrictMode>
                <Leva hidden={!isDebugMenuOpen} />
                <Canvas>
                    { isPerformanceMonitorOpen && <Perf position="top-left" /> }

                    {/* Implement lazy loading by wrapping the Model component with Suspense */}
                    {/* A react component that will wait for the Model component to load */}
                    <Suspense>
                        <App />
                    </Suspense>
                </Canvas>
                <Options />
                <PanIndicator />
            </StrictMode>
        </EffectsContext.Provider>
    )
}

root.render(<Root />)