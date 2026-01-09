import { useRef, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, OrbitControls, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { EffectComposer, Bloom, Glitch, Noise } from '@react-three/postprocessing'
import { useStore } from '../store'
import AudioManager from './AudioManager'

/**
 * GeometricShape Component
 * Represents a complex 3D shape with a glass-like material.
 */
const GeometricShape = ({ analyzerRef }) => {
    const meshRef = useRef(null)
    const { speed, distortion, color, shape } = useStore()
    const matRef = useRef()

    // Rotate the object continuously AND respond to mouse movement
    useFrame((state, delta) => {
        if (meshRef.current) {
            // Basic continuous rotation multiplied by SPEED
            meshRef.current.rotation.x += delta * 0.1 * speed
            meshRef.current.rotation.y += delta * 0.15 * speed

            // Mouse interact
            meshRef.current.rotation.x += (state.pointer.y * delta * 0.5);
            meshRef.current.rotation.y += (state.pointer.x * delta * 0.5);

            // Audio Reactivity
            if (analyzerRef.current) {
                const freq = analyzerRef.current.getFrequency()
                const highFreq = analyzerRef.current.getHighFrequency()

                // Pulse Scale (Base scale 1 + beat)
                // Smoothly significantly roughly 0 -> 255. map to 1 -> 1.5
                const scale = 1 + (freq / 255) * 0.8 /* Boosted from 0.4 */
                meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.2) // Smooth transition

                // Glitch Distortion (Base distortion + highs)
                if (matRef.current) {
                    // Start with base distortion from store
                    const targetDistortion = distortion + (highFreq / 255) * 2.0
                    matRef.current.distortion = THREE.MathUtils.lerp(matRef.current.distortion, targetDistortion, 0.1)
                }
            }
        }
    })

    useLayoutEffect(() => {
        if (meshRef.current) {
            meshRef.current.scale.set(0, 0, 0);
            gsap.to(meshRef.current.scale, {
                x: 1, y: 1, z: 1,
                duration: 2,
                ease: "elastic.out(1, 0.3)",
                delay: 0.5
            });
        }
    }, [])

    return (
        <Float floatIntensity={2} speed={2} rotationIntensity={1}>
            <mesh ref={meshRef}>
                {shape === 'knot' && <torusKnotGeometry args={[1, 0.3, 128, 32]} />}
                {shape === 'sphere' && <sphereGeometry args={[1.5, 64, 64]} />}
                {shape === 'gem' && <icosahedronGeometry args={[1.8, 0]} />}
                {shape === 'twist' && <torusGeometry args={[1.2, 0.4, 32, 100]} />}
                <MeshTransmissionMaterial
                    ref={matRef}
                    backside
                    backsideThickness={1}
                    thickness={0.5} /* Reduced thickness for clearer shape */
                    chromaticAberration={0.2} /* Reduced CA to see color better */
                    anisotropy={0.5}
                    distortion={distortion}
                    distortionScale={0.5} /* Larger distortion waves */
                    temporalDistortion={0.5}
                    color={color}
                    resolution={1024}
                />
            </mesh>
        </Float>
    )
}

/**
 * HeroScene Component
 * Sets up the 3D environment including lighting and camera.
 */
const HeroScene = () => {
    const { bloomStrength, glitchActive, audioUrl, isMusicPlaying } = useStore()
    const analyzerRef = useRef()

    return (
        <div className="canvas-container">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]} // Handle high-DPI screens
            >
                <AudioManager
                    ref={analyzerRef}
                    url={audioUrl}
                    playing={isMusicPlaying}
                />

                {/* 
                    Restoring Environment with 'studio' preset.
                    'studio' provides soft, neutral lighting ideal for showcasing material properties
                    without distracting background reflections.
                */}
                <Environment preset="studio" />
                <color attach="background" args={['#000']} />

                {/*
           Lighting Setup
           - Ambient: Base level brightness
           - SpotLight: Main directional light source with shadows
        */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                <GeometricShape analyzerRef={analyzerRef} />

                <OrbitControls enableZoom={false} enablePan={false} />

                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0}
                        luminanceSmoothing={0.9}
                        intensity={bloomStrength}
                    />
                    <Glitch
                        active={glitchActive}
                        ratio={0.85}
                    />
                    <Noise opacity={0.02} />
                </EffectComposer>
            </Canvas>
        </div>
    )
}

export default HeroScene
