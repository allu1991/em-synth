import React, { useEffect, useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function LogoEver({ tl, ...props }) {

    // Load the glTF model
    const logoEver = useGLTF('./logo-ever.glb')

    // Animate the logoEver using GSAP when the timeline (tl) is available
    useLayoutEffect(() => {
        if (tl) {
            tl.from(logoEver.materials.Default, {
                opacity: 0,
                duration: 1.5,
                delay: 0.3,
            }, "-=0.3" );

            tl.from(logoEver.materials.Default, {
                emissiveIntensity: 0,
                duration: 2.5,
                delay: 0.3,
                ease: "elastic.out(4, 0.5)",
            }, "-=1.5" );
        }
    }, [tl]);

    // Modify the material properties
    // Todo: Add these properties to the actual model in Blender
    useEffect(() => {
        logoEver.materials.Default.transparent = true;
        logoEver.materials.Default.emissiveIntensity = 2
    }, [])

    return (
        <primitive {...props} object={logoEver.scene} />
    )
}

useGLTF.preload('./logo-ever.glb')