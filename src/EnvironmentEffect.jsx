import { Environment } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef, useContext } from 'react'
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing'
import { KernelSize, Resolution } from 'postprocessing'
import { EffectsContext } from './index.jsx'

export default function EnvironmentEffect({ tl }) {

    // Get the effect states from the context
    const {
        noiseFilterEnabled,
        chromaticAberrationEnabled,
    } = useContext(EffectsContext);

    // Create refs for the environment and background to allow for future manipulations if needed
    const bgRef = useRef()
    const envRef = useRef()

    // Leva controls for the background rotation
    const { rotationX_bg, rotationY_bg, rotationZ_bg } = useControls('Background', {
        rotationX_bg: { value: 0.0, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationY_bg: { value: 0.54, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationZ_bg: { value: 1.6, min: -Math.PI, max: Math.PI, step: 0.01 },
    })

    // Leva controls for the environment map rotation
    const { rotationX_env, rotationY_env, rotationZ_env } = useControls('Environment', {
        rotationX_env: { value: -0.8, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationY_env: { value: 0.08, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationZ_env: { value: -1.4, min: -Math.PI, max: Math.PI, step: 0.01 },
    })

    return <>

        {/* Add fog to the scene for depth and atmosphere. The color and density can be adjusted as needed */}
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

        <Environment
            ref={envRef}
            background={ false }
            environmentRotation={[rotationX_env, rotationY_env, rotationZ_env]}
            files={ [ './textures/qwantani_moonrise_4k.jpg' ]}
            environmentIntensity={ 4 }
        />

        <EffectComposer>
            { noiseFilterEnabled && (
                <Noise
                    opacity={ 0.2 }
                    premultiply={ false }
                />
            )}

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

            { chromaticAberrationEnabled && (
                <ChromaticAberration
                    blendFunction={ 1 }
                    offset={ [ 0.00125, 0.00125 ] }
                />
            )}
        </EffectComposer>
    </>
}