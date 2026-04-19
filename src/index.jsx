import './style.css'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import App from './App.jsx'
import Settings from './Settings.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

// https://stackblitz.com/edit/gsap-react-basic-f48716-utkxi9?file=src%2Fcomponents%2FBox.js,src%2FApp.js
// https://gsap.com/community/forums/topic/9002-read-this-first-how-to-create-a-codepen-demo/

root.render(
    <StrictMode>

        <Leva collapsed />

        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 0, 0, 7 ]
            } }
        >
            <App />
        </Canvas>

        <Settings />
    </StrictMode>
)