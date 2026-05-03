import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

export default function StarsSphere(props) {

    // Define the number of particles and the radius of the sphere
    const particleCount = 1000
    const radius = 150

    // Create a geometry for the star particles, randomly distributing them on the surface of a sphere
    const geometry = useMemo(() => {
        const positions = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(Math.random() * 2 - 1)

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            positions[i * 3 + 2] = radius * Math.cos(phi)
        }

        const generatedGeometry = new THREE.BufferGeometry()
        generatedGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        const sizes = new Float32Array(particleCount)
        for (let i = 0; i < particleCount; i++) {
            sizes[i] = Math.random() * 2 + 0.5
        }
        generatedGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

        return generatedGeometry
    }, [])

    const starMap = useTexture('./textures/star-particle.png');

    const material = useMemo(() => {
        return new THREE.PointsMaterial({
            color: 0xffffff,
            size: 1.5,
            sizeAttenuation: true,
            transparent: true,
            map: starMap,
            depthWrite: false,
            fog: false,
        })
    }, [starMap])

    const pointsRef = useRef()

    // Clean up the geometry and material when the component unmounts to prevent memory leaks
    useMemo(() => {
        return () => {
            geometry.dispose()
            material.dispose()
        }
    }, [geometry, material])

    return (
        <points ref={pointsRef} geometry={geometry} material={material} {...props} />
    )
}
