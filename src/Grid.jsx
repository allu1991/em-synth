import React, { useRef, useEffect, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useLoader, useFrame } from '@react-three/fiber'

export default function Grid({ tl, ...props }) {

    const meshRef = useRef()

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
                meshRef.current.position.z = -22.5
            }
        }
    })

    return (
        <group {...props}>
            <mesh
                ref={meshRef}
                position={[0, -2.5, -22.5]}
                rotation={[-Math.PI / 2, 0, 0]}
                geometry={new THREE.PlaneGeometry(50, 50, 1, 1)}
            >
                <meshBasicMaterial
                    attach="material"
                    color={0x343eff}
                    transparent={true}
                    opacity={0.5}
                    map={useLoader(THREE.TextureLoader, '/textures/bg-grid.png')}
                    map-wrapS={THREE.RepeatWrapping}
                    map-wrapT={THREE.RepeatWrapping}
                    map-repeat={[60, 60]}
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('/grid-bg.glb')