import React, { useMemo, useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

export default function StarSparkle({ tl, ...props }) {

    // Create refs for the two star sparkle meshes
    const starSparkleOneRef = useRef()
    const starSparkleTwoRef = useRef()
    const starParticle = useTexture('./textures/star-sparkle.png');

    // Create a material for the star sparkles using the loaded texture
    const material = useMemo(() => (
        new THREE.MeshBasicMaterial({
            map: starParticle,
            transparent: true,
            depthWrite: false,
            fog: false,
            blending: THREE.AdditiveBlending,
        })
    ), [starParticle])

    // Animate the star sparkles. Has two sparkles that scale up and rotate separately
    useLayoutEffect(() => {
        if (tl) {
            tl
                // Sparkle one
                .to(starSparkleOneRef.current.scale, {
                    x: 8.5,
                    y: 8.5,
                    z: 8.5,
                    delay: 1.0,
                    duration: 1.0,
                    ease: "power2.inOut",
                })
                .to(starSparkleOneRef.current.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 0.6,
                    ease: "power2.inOut",
                })
                .to(starSparkleOneRef.current.rotation, {
                    z: Math.PI * 1.2,
                    duration: 1.6,
                    ease: "power1.inOut",
                }, "-=2.4" )

                // Sparkle two
                .to(starSparkleTwoRef.current.scale, {
                    x: 5,
                    y: 5,
                    z: 5,
                    duration: 0.4,
                    ease: "power2.inOut",
                }, "-=1.6" )
                .to(starSparkleTwoRef.current.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 0.2,
                    ease: "power2.inOut",
                })
                .to(starSparkleTwoRef.current.rotation, {
                    z: Math.PI * 1.1,
                    duration: 2.0,
                    ease: "none",
                }, "-=2.0" );
        }
    }, [tl]);

    return (
        <>
            <mesh ref={starSparkleOneRef} {...props}>
                <planeGeometry args={[1, 1]} />
                <primitive object={material} attach="material" />
            </mesh>
            <mesh ref={starSparkleTwoRef} {...props}>
                <planeGeometry args={[1, 1]} />
                <primitive object={material} attach="material" />
            </mesh>
        </>
    )
}
