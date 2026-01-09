import { create } from 'zustand'

export const useStore = create((set) => ({
  color: '#a5b4fc',
  speed: 1,
  distortion: 0.5,
  shape: 'knot', // 'knot', 'sphere', 'gem'
  bloomStrength: 0,
  glitchActive: false,
  isMusicPlaying: false,
  audioUrl: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r147/examples/sounds/376737_Skullbeatz___Bad_Cat_Maste.mp3', // Official Three.js Example Audio
  audioName: 'Skullbeatz - Bad Cat Maste',
  setColor: (color) => set({ color }),
  setSpeed: (speed) => set({ speed }),
  setDistortion: (distortion) => set({ distortion }),
  setShape: (shape) => set({ shape }),
  setBloomStrength: (bloomStrength) => set({ bloomStrength }),
  setGlitchActive: (glitchActive) => set({ glitchActive }),
  setIsMusicPlaying: (isMusicPlaying) => set({ isMusicPlaying }),
  setAudioUrl: (audioUrl) => set({ audioUrl }),
  setAudioName: (audioName) => set({ audioName }),
}))
