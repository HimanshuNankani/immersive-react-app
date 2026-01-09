import { useRef, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, OrbitControls, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { EffectComposer, Bloom, Glitch, Noise } from '@react-three/postprocessing'
import { useStore } from '../store'

/**
 * GeometricShape Component
 * Represents a complex 3D shape with a glass-like material.
 */
const GeometricShape = () => {
    const meshRef = useRef(null)
    const { speed, distortion, color, shape } = useStore()

    // Rotate the object continuously AND respond to mouse movement
    useFrame((state, delta) => {
        if (meshRef.current) {
            // Basic continuous rotation multiplied by SPEED
            meshRef.current.rotation.x += delta * 0.1 * speed
            meshRef.current.rotation.y += delta * 0.15 * speed

            // Mouse interact
            meshRef.current.rotation.x += (state.pointer.y * delta * 0.5);
            meshRef.current.rotation.y += (state.pointer.x * delta * 0.5);
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
                <MeshTransmissionMaterial
                    backside
                    backsideThickness={1}
                    thickness={6.0} /* Very thick glass */
                    chromaticAberration={3.0} /* Aggressive prism separation */
                    anisotropy={1.0}
                    distortion={distortion}
                    distortionScale={1.0} /* Tighter distortion pattern */
                    temporalDistortion={0.5} /* Faster distortion movement */
                    color={color}
                    resolution={1024} /* Sharper refraction */
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
    const { bloomStrength, glitchActive } = useStore()

    return (
        <div className="canvas-container">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]} // Handle high-DPI screens
            >
                {/*
                   Environment: Provides realistic reflection data (IBL).
                   'warehouse' offers high contrast for better glass refraction.
                */}
                <Environment preset="warehouse" />

                {/*
           Lighting Setup
           - Ambient: Base level brightness
           - SpotLight: Main directional light source with shadows
        */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                <GeometricShape />

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
