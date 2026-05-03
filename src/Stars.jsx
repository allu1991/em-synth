import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, Points, useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'

export default function Stars(props) {

    // Reference to the points object
    const pointsRef = useRef();
    const starMap = useTexture('./textures/star-particle.png');

    // Animate the stars by moving them along the z-axis repeatedly to create a continuous traversing effect
    useFrame((_, delta) => {
        if (pointsRef.current) {
            const positions = pointsRef.current.geometry.attributes.position;
            for (let i = 0; i < positions.count; i++) {
                let z = positions.getZ(i);
                z += (0.2 + Math.random() * 0.01) * delta * 60;
                if (z > 20) {
                    z = -20;
                }
                positions.setZ(i, z);
            }
            positions.needsUpdate = true;
        }
    });

    // Generate random positions for the stars within a cube of size 40x40x40 centered at the origin
    const positions = React.useMemo(() => {
        const arr = new Float32Array(1500 * 3);
        for (let i = 0; i < 1500; i++) {
            arr[i * 3 + 0] = Math.random() * 40 - 20;
            arr[i * 3 + 1] = Math.random() * 40 - 20;
            arr[i * 3 + 2] = Math.random() * 40 - 20;
        }
        return arr;
    }, []);

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color={0xffffff}
                size={0.04}
                sizeAttenuation
                transparent
                map={starMap}
                depthWrite={false}
            />
        </points>
    );
}
