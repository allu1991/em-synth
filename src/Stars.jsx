import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, Points, useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'

export default function Stars(props) {

    const pointsRef = useRef();

    // const starMap = useLoader(THREE.TextureLoader, './textures/star-particle.png');
    const starMap = useTexture('./textures/star-particle.png');

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

    // useEffect(() => {
    //     console.log(pointsRef.current)
    // }, [pointsRef])

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
                // map={new THREE.TextureLoader().load(window.location.pathname + './star-particle.png')}
                map={starMap}
                // alphaTest={0.5}
                depthWrite={false}
            />
        </points>
    );
}
