# Immerse React App

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# Digital Toy Walkthrough

You now have a fully interactive 3D playground!

## What Changed
- **New Control Panel**: Located on the left, giving you full control over the scene.
- **State Management**: Using `zustand` for high-performance UI-to-3D communication.
- **Visual Polish**:
    - **High-End Distortion**: We used a "Warehouse" environment map to create realistic glass refraction effects.
    - **Clean UI**: Custom CSS ensures the color picker buttons are perfect circles.

## How to Use
1.  **Speed**: Drag the slider to speed up the rotation (up to 5x!).
2.  **Distortion**: Change how much the glass warps the background lights.
3.  **Color**: Click the color dots to instantly retint the glass object.
4.  **Shape**: Toggle between different geometries (Knot, Sphere, Gem).

---

# 3D & Animation Concepts

## 1. `useFrame(state, delta)`

In a game or 3D app, the screen refreshes ~60 times a second. We hook into this loop to create motion.

*   `state`: The "God Object" of your scene. It knows everything:
    *   `state.clock`: How long the app has been running.
    *   `state.camera`: The camera looking at the scene.
    *   `state.pointer`: The exact X/Y coordinates of your mouse (-1 to +1).
        *   *We used this to make the object tilt when you move your mouse!*
*   `delta`: Time (in seconds) since the **last frame**.
    *   *Why it matters:* Computers are different speeds. A fast PC draws 120 frames/sec; a slow laptop draws 30 frames/sec.
    *   If you rotate by `0.1` every frame, the fast PC spins 4x faster!
    *   If you rotate by `0.1 * delta`, your object spins at the **same speed** on every computer in the world.

## 2. GSAP (GreenSock Animation Platform)

The industry standard for "Timeline" animations.

*   **React** is good for state (`isOpen = true`).
*   **Three.js** is good for rendering (draw a cube).
*   **GSAP** is the director. It says: "Move this cube from X:0 to X:10 over exactly 2 seconds, and make it bounce at the end."
*   *We used it for the "Entrance" animation: scaling the knot from 0 to 1 with an elastic wobble.*

## 3. `<Float>` (from @react-three/drei)

A helper component that makes things... float!
Instead of doing complicated math (`Math.sin(time) * amplitude`) to make an object bob up and down, we just wrap it:
```jsx
<Float speed={2} rotationIntensity={1} floatIntensity={2}>
   <mesh />
</Float>
```
It handles the gentle hovering animation for us automatically.

## 4. `<OrbitControls>`

The standard "Camera Controller."
It lets the user:
*   **Rotate**: Click and drag to spin around the center.
*   **Zoom**: Scroll wheel to get closer.
*   **Pan**: Right-click drag to move side-to-side.
*   *We disabled Zoom and Pan (`enableZoom={false}`) so the user stays focused on the object, but they can still spin around it.*
