import { PerspectiveCamera, OrbitControls, PresentationControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense, useRef, useEffect, useState, useLayoutEffect, useMemo } from 'react'
import Camera from './Camera.jsx'
import EnvironmentEffect from './EnvironmentEffect.jsx'
import Grid from './Grid.jsx'
import Stars from './Stars.jsx'
import StarsSphere from './StarsSphere.jsx'
import StarSparkle from './StarSparkle.jsx'
import Triangle from './Triangle.jsx'
import LogoEver from './LogoEver.jsx'
import LogoMade from './LogoMade.jsx'
import LogoSlogan from './LogoSlogan.jsx'

import { gsap } from 'gsap';

export default function App() {

    // Use state for GSAP timelines
    const [gridAnim, setGridAnim] = useState(null);
    const [starParticleAnim, setStarParticleAnim] = useState(null);
    const [triangleAnim, setTriangleAnim] = useState(null);
    const [logoEverAnim, setLogoEverAnim] = useState(null);
    const [logoMadeAnim, setLogoMadeAnim] = useState(null);
    const [logoSloganAnim, setLogoSloganAnim] = useState(null);
    const [triangleFlashAnim, setTriangleFlashAnim] = useState(null);

    // Stage 1: create all child timelines
    useLayoutEffect(() => {
        setStarParticleAnim(gsap.timeline());
        setGridAnim(gsap.timeline());
        setTriangleAnim(gsap.timeline());
        setLogoEverAnim(gsap.timeline());
        setLogoMadeAnim(gsap.timeline());
        setLogoSloganAnim(gsap.timeline());
        setTriangleFlashAnim(gsap.timeline());
    }, []);

    // Stage 2: Create master timeline and add child timelines in sequence with overlaps
    useLayoutEffect(() => {
        if (starParticleAnim && gridAnim && triangleAnim && logoEverAnim && logoMadeAnim && logoSloganAnim && triangleFlashAnim) {

            // Create master timeline and add child timelines in sequence with overlaps
            gsap.timeline({
                onComplete: () => console.log('Animation complete!'),
            })
                .add(starParticleAnim, "+=0.0")
                .add(gridAnim, "-=0.0")
                .add(triangleAnim, "-=3.8")
                .add(logoEverAnim, "-=0.4")
                .add(logoMadeAnim, "-=1.3")
                .add(logoSloganAnim, "-=0.7")
                .add(triangleFlashAnim, "+=2.35");
        }
    }, [starParticleAnim, gridAnim, triangleAnim, logoEverAnim, logoMadeAnim, logoSloganAnim, triangleFlashAnim]);

    // useLayoutEffect(() => {
    //     if (starParticleAnim && triangleAnim && logoEverAnim && logoMadeAnim && logoSloganAnim && triangleFlashAnim) {
    //         // Create master timeline and add child timelines in sequence with overlaps
    //         const master = gsap.timeline({
    //             onComplete: () => console.log('Animation complete!'),
    //         })
    //         // Set the master timeline to state so it can be passed down to child components
    //         setTheTimeline(master);
    //     }
    // }, [starParticleAnim, triangleAnim, logoEverAnim, logoMadeAnim, logoSloganAnim, triangleFlashAnim]);

    // useEffect(() => {
    //     return () => {
    //         tl.kill()
    //     }
    // }, [tl])

    return <>
        {/*
            https://codesandbox.io/p/sandbox/react-three-fiber-particles-ii-moio2?file=%2Fsrc%2Findex.js%3A145%2C67
            https://medium.com/@mattdesl/filmic-effects-for-webgl-9dab4bc899dc
        */}

        {/* <Perf position="top-left" /> */}

        <Camera />
        <EnvironmentEffect />

        {/* Implement lazy loading by wrapping the Model component with Suspense */}
        {/* A react component that will wait for the Model component to load */}
        <Suspense>
            <Grid tl={gridAnim} />
            <Stars />
            <StarsSphere />
            <StarSparkle scale={ 0 } position={ [ 0.0, -0.4, -100 ] } tl={starParticleAnim} />
            <Triangle scale={ 1.1 } position={ [ 0.0, -0.4, -0.2 ] } tl={triangleAnim} tlTwo={triangleFlashAnim} />
            <LogoEver scale={ 1 } position={ [ 0, 0.5, -0.1 ] } tl={logoEverAnim} />
            <LogoMade scale={ 1 } position={ [ 0, -0.4, 0.1 ] } tl={logoMadeAnim} />
            <LogoSlogan scale={ 1 } position={ [ 0.4, -1.1, 0.2 ] } tl={logoSloganAnim} />
        </Suspense>
    </>
}