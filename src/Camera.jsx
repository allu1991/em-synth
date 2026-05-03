import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useRef, useContext, useMemo } from 'react'
import { EffectsContext } from './index.jsx'

export default function Camera({ tl }) {

    // Create a ref for the camera and get the free camera state from the context
    const cameraRef = useRef()
    const { isFreeCamera } = useContext(EffectsContext)

    // Set the field of view based on the screen (mobile/desktop) for responsiveness
    const fov = useMemo(() => {
        return window.matchMedia('(max-width: 768px)').matches ? 60 : 45;
    }, []);

    return <>
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            fov={fov}
            near={0.1}
            far={200}
            rotation={[0, 0, 0]}
            position={[0, 0, 7]}
        />
        
        <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={ 0.05 }
            rotateSpeed={ 0.7 }
            enablePan={ isFreeCamera }
            enableZoom={ isFreeCamera }
            minPolarAngle={ isFreeCamera ? 0 : Math.PI / 2.5 }
            maxPolarAngle={ isFreeCamera ? Math.PI : Math.PI / 1.8 }
            minAzimuthAngle={ isFreeCamera ? -Math.PI : -Math.PI / 7.5 }
            maxAzimuthAngle={ isFreeCamera ? Math.PI : Math.PI / 7.5 }
        />
    </>
}