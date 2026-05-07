import React, { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

export default function StarsSphere(props) {

    // Define the number of particles and the radius of the sphere
    const particleCount = 1000
    const radius = 150

    // Create a geometry for the star particles,
    // randomly distributing them on the surface of a sphere.
    // Each particle has a random size
    const geometry = useMemo(() => {
        const positions = new Float32Array(particleCount * 3)
        const sizes = new Float32Array(particleCount)

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(Math.random() * 2 - 1)

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            positions[i * 3 + 2] = radius * Math.cos(phi)

            // Random size between 1 and 5
            sizes[i] = Math.random() * 5 + 1
        }

        const generatedGeometry = new THREE.BufferGeometry()
        generatedGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        generatedGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

        return generatedGeometry
    }, [])

    const starMap = useTexture('./textures/star-particle.png');

    // Create a custom shader material for the star particles,
    // using the loaded texture and applying a blueish tint
    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: { map: { value: starMap } },
            vertexShader: `
                attribute float size;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D map;
                void main() {
                    vec4 tex = texture2D(map, gl_PointCoord);
                    if (tex.a < 0.01) discard;
                    gl_FragColor = vec4(tex.rgb * vec3(0.6, 0.6, 1.0), tex.a);
                }
            `,
            transparent: true,
            depthWrite: false,
            fog: false,
        })
    }, [starMap])

    const pointsRef = useRef()

    // Clean up the geometry and material when the component unmounts to prevent memory leaks
    useEffect(() => {
        return () => {
            geometry.dispose()
            material.dispose()
        }
    }, [geometry, material])

    return (
        <points ref={pointsRef} geometry={geometry} material={material} {...props} />
    )
}
