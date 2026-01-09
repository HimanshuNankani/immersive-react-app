import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'

const AudioManager = forwardRef(({ url, playing }, ref) => {
    const { camera } = useThree()
    const sound = useRef()
    const analyzer = useRef()
    const listener = useRef()

    useEffect(() => {
        // Create listener
        listener.current = new THREE.AudioListener()
        camera.add(listener.current)

        // Create sound
        sound.current = new THREE.Audio(listener.current)

        // Create analyzer
        analyzer.current = new THREE.AudioAnalyser(sound.current, 128)

        return () => {
            if (listener.current) camera.remove(listener.current)
            if (sound.current && sound.current.isPlaying) sound.current.stop()
        }
    }, [camera])

    // Handle URL changes
    useEffect(() => {
        if (!sound.current || !url) return

        const loader = new THREE.AudioLoader()
        if (sound.current.isPlaying) sound.current.stop()

        loader.load(url, (buffer) => {
            sound.current.setBuffer(buffer)
            sound.current.setLoop(true)
            sound.current.setVolume(0.5)
            if (playing) sound.current.play()
        })
    }, [url])

    // Handle Play/Pause
    useEffect(() => {
        if (!sound.current || !sound.current.buffer) return

        if (playing && !sound.current.isPlaying) {
            sound.current.play()
        } else if (!playing && sound.current.isPlaying) {
            sound.current.pause()
        }
    }, [playing])

    // Expose analyzer to parent
    useImperativeHandle(ref, () => ({
        getFrequency: () => {
            if (analyzer.current) return analyzer.current.getAverageFrequency()
            return 0
        },
        getHighFrequency: () => {
            // Rough approximation of high frequencies (glitch trigger)
            if (analyzer.current) {
                const data = analyzer.current.getFrequencyData()
                // Take the average of the upper half of the spectrum
                let sum = 0
                const half = Math.floor(data.length / 2)
                for (let i = half; i < data.length; i++) sum += data[i]
                return sum / (data.length - half)
            }
            return 0
        }
    }))

    return null
})

export default AudioManager
