import React, { useRef } from 'react'
import { Html } from '@react-three/drei'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { GSDevTools } from "gsap/GSDevTools";
gsap.registerPlugin(useGSAP, DrawSVGPlugin, GSDevTools);

export default function LogoSlogan({ tl, ...props }) {

    // References
    const container = useRef();
    const the_svg = useRef();

    // Custom styles for the SVG element.
    // Opacity is set to 0 initially, and will be set to 1 when the SVG is loaded and the animation starts.
    const svgStyles = {
        opacity: 0,
        width: 500,
        height: 'auto',
        pointerEvents: 'none',
        userSelect: 'none',
    }
    
    const the_slogan_svg_init = () => {

        // Set the SVG opacity to 1 when the animation starts
        the_svg.current.style.opacity = 1;
        
        // Get the SVG document inside the object and select the paths to animate
        const the_svg_document = the_svg.current.getSVGDocument();

        if (the_svg_document) {
            const svg_masks = the_svg_document.querySelectorAll('#slogan-masks mask path');

            // Animate the SVG paths with a "hand-drawn" effect,
            // by hiding the mask paths letter by letter with DrawSVGPlugin
            tl
                // .set(svg_masks, { autoAlpha: 0 }, "-=2.00")
                .from(svg_masks[0], { drawSVG: 0, duration: 0.25, ease: "none" }, "-=0.00")
                .from(svg_masks[1], { drawSVG: 0, duration: 0.20, ease: "none" }, "-=0.00")
                .from(svg_masks[2], { drawSVG: 0, duration: 0.75, ease: "none" }, "-=0.00")
                .from(svg_masks[3], { drawSVG: 0, duration: 0.15, ease: "none" }, "-=0.05")
                .from(svg_masks[4], { drawSVG: 0, duration: 0.55, ease: "none" }, "-=0.00")
                .from(svg_masks[5], { drawSVG: 0, duration: 0.45, ease: "none" }, "-=0.00")
                .from(svg_masks[6], { drawSVG: 0, duration: 0.70, ease: "power1.out" }, "-=0.00")

            // Instantiate GSDevTools with default settings
            // GSDevTools.create();
        }
    }

    return (
        <Html
            {...props}
            rotation={ [ 0, 0, -0.03 ] }
            transform
            distanceFactor={ 3 }
            ref={ container }
        >
            <div className='logo-slogan'>
                {/* Render as object instead of img, so that the SVG can be manipulated */}
                <object
                    ref={ the_svg }
                    onLoad={() => the_slogan_svg_init()}
                    id="logo-slogan-svg"
                    data="./logo-slogan.svg"
                    type="image/svg+xml"
                    alt="Best sites ever made"
                    style={ svgStyles }
                >
                </object>
            </div>
        </Html>
    )
}
