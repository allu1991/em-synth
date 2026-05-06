import React, { useRef, useEffect, useLayoutEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useLoader, useFrame } from '@react-three/fiber'

export default function Grid({ tl, ...props }) {

    // Reference to the grid mesh to manipulate its properties for animation
    const meshRef = useRef()

    // Create the plane geometry once and reuse it to optimize performance
    const planeGeometry = useMemo(() => new THREE.PlaneGeometry(50, 50, 1, 1), [])

    // Load the grid texture and set it to repeat to create a seamless pattern
    const gridTexture = useLoader(THREE.TextureLoader, '/textures/bg-grid.png')

    // The GSAP animation
    useLayoutEffect(() => {
        if (tl) {
            tl
                .from(meshRef.current.scale, {
                    y: 0,
                    duration: 3.0,
                    ease: "power2.inOut",
                })
                .from(meshRef.current.material, {
                    opacity: 0,
                    duration: 3.2,
                    ease: "power2.inOut"
                }, "<")
        }
    }, [tl]);

    // Animate the grid by moving it along the z-axis repeatedly to create a continuous traversing effect
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.position.z += delta * 4
            if (meshRef.current.position.z > 0) {
                meshRef.current.position.z = -21.5
            }
        }
    })

    return (
        <group {...props}>
            <mesh
                ref={meshRef}
                position={[0, -2.5, -21.5]}
                rotation={[-Math.PI / 2, 0, 0]}
                geometry={planeGeometry}
            >
                <meshBasicMaterial
                    attach="material"
                    color={0x343eff}
                    transparent={true}
                    opacity={0.5}
                    depthWrite={false}
                    map={gridTexture}
                    map-wrapS={THREE.RepeatWrapping}
                    map-wrapT={THREE.RepeatWrapping}
                    map-repeat={[60, 60]}
                />
            </mesh>
        </group>
    )
}
