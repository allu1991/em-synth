import './style.scss'
import ReactDOM from 'react-dom/client'
import { Suspense, StrictMode, useState, createContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useProgress } from '@react-three/drei'
import { Leva } from 'leva'
import Loading from './Loading.jsx'
import App from './App.jsx'
import Options from './Options.jsx'
import PanIndicator from './PanIndicator.jsx'

// Create a context to share effect states and setters across components
export const EffectsContext = createContext();
const root = ReactDOM.createRoot(document.querySelector('#root'))

// A component to display the loading screen while assets are being loaded
function LoadingScreen() {
    const { active } = useProgress();
    return active ? <Loading /> : null;
}

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
                    <Suspense fallback={null}>
                        <App />
                    </Suspense>
                </Canvas>
                <LoadingScreen />
                <Options />
                <PanIndicator />
            </StrictMode>
        </EffectsContext.Provider>
    )
}

root.render(<Root />)