import { create } from 'zustand'

export const useStore = create((set) => ({
  color: '#a5b4fc',
  speed: 1,
  distortion: 0.5,
  shape: 'knot', // 'knot', 'sphere', 'gem'
  setColor: (color) => set({ color }),
  setSpeed: (speed) => set({ speed }),
  setDistortion: (distortion) => set({ distortion }),
  setShape: (shape) => set({ shape }),
}))
