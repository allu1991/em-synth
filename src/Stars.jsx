import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const STAR_COUNT = 1500;
const STREAK_LENGTH = 0.3;

export default function Stars(props) {

    // Reference to the line segments object
    const linesRef = useRef();

    // Animate the stars by moving them along the z-axis repeatedly to create a continuous traversing effect
    useFrame((_, delta) => {
        if (linesRef.current) {
            const positions = linesRef.current.geometry.attributes.position;
            for (let i = 0; i < STAR_COUNT; i++) {
                let z = positions.getZ(i * 2);
                z += (0.2 + Math.random() * 0.01) * delta * 60;
                if (z > 20) {
                    z = -20;
                }
                positions.setZ(i * 2, z);
                positions.setZ(i * 2 + 1, z + STREAK_LENGTH);
            }
            positions.needsUpdate = true;
        }
    });

    // Generate random positions for the stars within a cube of size 40x40x40 centered at the origin.
    // Each star uses 2 vertices (start and end of streak) to form a line segment along z.
    const positions = React.useMemo(() => {
        const arr = new Float32Array(STAR_COUNT * 2 * 3);
        for (let i = 0; i < STAR_COUNT; i++) {
            const x = Math.random() * 40 - 20;
            const y = Math.random() * 40 - 20;
            const z = Math.random() * 40 - 20;
            arr[i * 6 + 0] = x;
            arr[i * 6 + 1] = y;
            arr[i * 6 + 2] = z;
            arr[i * 6 + 3] = x;
            arr[i * 6 + 4] = y;
            arr[i * 6 + 5] = z + STREAK_LENGTH;
        }
        return arr;
    }, []);

    return (
        <lineSegments ref={linesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial
                color={0xffffff}
                transparent
                opacity={0.8}
                depthWrite={false}
            />
        </lineSegments>
    );
}
