import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useState, useRef, useLayoutEffect, useContext } from 'react'
import { EffectsContext } from './index.jsx'

export default function Camera({ tl }) {

    const cameraRef = useRef()
    const { isFreeCamera } = useContext(EffectsContext)

    const [cameraAnimDone, setCameraAnimDone] = useState(false);

    // Animate the camera using GSAP timeline
    // useLayoutEffect(() => {
    //     if (tl) {
    //         tl.fromTo(cameraRef.current.rotation, {
    //             x: 0.3,
    //             // y: 0.2,
    //         }, {
    //             x: 0.0,
    //             y: 0.0,
    //             z: 0.0,
    //             duration: 4,
    //             ease: "power4.out",
    //         }).eventCallback("onComplete", () => setCameraAnimDone(true));
    //     }
    // }, [ tl ]);

    return <>

        {/* {!cameraAnimDone ? (
            <PerspectiveCamera
                ref={cameraRef}
                makeDefault
                fov={45}
                near={0.1}
                far={200}
                rotation={[0, 0, 0]}
                position={[0, 0, 7]}
            />
        ) : (
            <OrbitControls
                enablePan={ true }
                enableZoom={ true }
                enableDamping
                dampingFactor={ 0.05 }
                rotateSpeed={ 0.7 }
                minPolarAngle={ Math.PI / 2.5 }
                maxPolarAngle={ Math.PI / 1.8 }
                minAzimuthAngle={ -Math.PI / 7.5 }
                maxAzimuthAngle={ Math.PI / 7.5 }
            />
        )} */}

        <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            fov={45}
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