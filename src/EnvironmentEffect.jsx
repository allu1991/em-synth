import { Environment } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'
import { Suspense, useRef, useEffect, useState, useLayoutEffect, useMemo } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing'
import { KernelSize, Resolution } from 'postprocessing'

export default function EnvironmentEffect({ tl }) {

    const bgRef = useRef()
    const envRef = useRef()

    // Leva controls for the environment background rotation
    const { rotationX_bg, rotationY_bg, rotationZ_bg } = useControls('Background', {
        rotationX_bg: { value: 0.0, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationY_bg: { value: 0.54, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationZ_bg: { value: 1.6, min: -Math.PI, max: Math.PI, step: 0.01 },
    })

    const { rotationX_env, rotationY_env, rotationZ_env } = useControls('Environment', {
        rotationX_env: { value: -0.8, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationY_env: { value: 0.08, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationZ_env: { value: -1.4, min: -Math.PI, max: Math.PI, step: 0.01 },
        // rotationX_env: { value: 0.26, min: -Math.PI, max: Math.PI, step: 0.01 },
        // rotationY_env: { value: 0.08, min: -Math.PI, max: Math.PI, step: 0.01 },
        // rotationZ_env: { value: -0.2, min: -Math.PI, max: Math.PI, step: 0.01 },
        // Old values
        // rotationX_env: { value: -2.7, min: -Math.PI, max: Math.PI, step: 0.01 },
        // rotationY_env: { value: 0.0, min: -Math.PI, max: Math.PI, step: 0.01 },
        // rotationZ_env: { value: 0.0, min: -Math.PI, max: Math.PI, step: 0.01 },
    })

    // useLayoutEffect(() => {
    //     if (tl) {
    //         console.log(bgRef.current);

    //         tl.from(bgRef.current.rotation, {
    //             x: 2.40,
    //             y: -0.25,
    //             z: -1.4,
    //             duration: 5,
    //             ease: "power2.inOut",
    //         })
    //     }
    // }, [tl]);

    // useFrame(() => {
        // Rotate the background and environment slowly over time
        // rotationY_env += 10 * 10.01
    // })

    return <>

        <fog attach="fog" args={['#000314', 5, 25]} />

        {/* LDR equirectangular texture */}
        <Environment
            ref={bgRef}
            background={ true }
            backgroundIntensity={0.8}
            backgroundRotation={[rotationX_bg, rotationY_bg, rotationZ_bg]}
            files={ [ './textures/space-nebula.jpg' ]}
            environmentIntensity={ 3 }
        />

        {/* Animatable version of the environment background, using a large sphere with a texture instead of the Environment component, since the Environment component doesn't allow for animating the background rotation */}
        {/* <mesh ref={bgRef} rotation={[ 2.60, 0.25, -1.6 ]}>
            <sphereGeometry args={[200, 64, 64]} />
            <meshBasicMaterial
                map={useLoader(THREE.TextureLoader, './textures/space-nebula.jpg')}
                side={THREE.BackSide}
                fog={false}
            />
        </mesh> */}

        <Environment
            ref={envRef}
            background={ false }
            environmentRotation={[rotationX_env, rotationY_env, rotationZ_env]}
            files={ [ './textures/qwantani_moonrise_4k.jpg' ]}
            environmentIntensity={ 4 }
        />

        <EffectComposer>
            {/* <Noise
                opacity={ 0.2 }
                premultiply={ false }
            /> */}

            {/* Two bloom layers to create a stronger bloom effect,
            since the default bloom is quite subtle */}
            <Bloom
                intensity={ 1.0 }
                blurPass={ undefined }
                kernelSize={ KernelSize.LARGE }
                luminanceThreshold={ 0.8 }
                luminanceSmoothing={ 0.025 }
                mipmapBlur={ false }
                resolutionX={ Resolution.AUTO_SIZE }
                resolutionY={ Resolution.AUTO_SIZE }
            />
            <Bloom
                intensity={ 3.0 }
                blurPass={ undefined }
                kernelSize={ KernelSize.LARGE }
                luminanceThreshold={ 0.75 }
                luminanceSmoothing={ 3.5 }
                mipmapBlur={ true }
                resolutionX={ Resolution.AUTO_SIZE }
                resolutionY={ Resolution.AUTO_SIZE }
            />

            {/* <ChromaticAberration
                blendFunction={ 1 }
                offset={ [ 0.00125, 0.00125 ] }
            /> */}
        </EffectComposer>

        {/* <directionalLight
            shadow-normalBias={ 0.04}
            castShadow position={ [ 1, 2, 3 ] }
            intensity={ 4.5 }
        />
        <ambientLight intensity={ 1.5 } /> */}
    </>
}