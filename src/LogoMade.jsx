import React, { useEffect, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'

export default function LogoMade({ tl, ...props }) {

    // Load the glTF model
    const { nodes, materials } = useGLTF('./logo-made.glb')

    // Animate the logoEver using GSAP when the timeline (tl) is available
    useLayoutEffect(() => {
        if (tl) {

            // Create an array of the materials to animate
            const theMaterials = [
                materials['Metal-front'],
                materials['Metal-edges'],
                materials['Metal-sides']
            ]

            tl.from(theMaterials, {
                opacity: 0,
                duration: 0.5,
            });

            tl.fromTo(theMaterials, {
                emissiveIntensity: 2.5,
            }, {
                emissiveIntensity: 0,
                duration: 2.2,
                ease: "sine.out",
            }, "-=0.5" );
        }
    }, [tl]);

    // Modify the material properties
    // Todo: Add these properties to the actual model in Blender
    useEffect(() => {
        materials['Metal-front'].transparent = true
        materials['Metal-edges'].transparent = true
        materials['Metal-sides'].transparent = true
        materials['Metal-front'].roughness = 0.10
        materials['Metal-edges'].roughness = 0.10
        materials['Metal-sides'].roughness = 0.10
        materials['Metal-front'].emissive = new THREE.Color(0xffffff)
        materials['Metal-edges'].emissive = new THREE.Color(0xffffff)
        materials['Metal-sides'].emissive = new THREE.Color(0xffffff)
    }, [])

    return (
        <group {...props} dispose={null}>
            <group rotation={[Math.PI / 2, 0, 0]}>
                <mesh
                    geometry={nodes['model-madeobj_1'].geometry}
                    material={materials['Metal-sides']}
                >
                </mesh>
                <mesh
                    geometry={nodes['model-madeobj_2'].geometry}
                    material={materials['Metal-front']}
                >
                </mesh>
                <mesh
                    geometry={nodes['model-madeobj_3'].geometry}
                    material={materials['Metal-edges']}
                >
                </mesh>
            </group>
        </group>
    )
}

useGLTF.preload('./logo-made.glb')
