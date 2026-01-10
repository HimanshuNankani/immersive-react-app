import { useState } from 'react'
import { useStore } from '../store'

const Overlay = () => {
    const [expanded, setExpanded] = useState(true)

    const {
        speed, distortion, color, shape, bloomStrength, glitchActive, isMusicPlaying, audioName,
        setSpeed, setDistortion, setColor, setShape, setBloomStrength, setGlitchActive, setIsMusicPlaying, setAudioUrl, setAudioName
    } = useStore()

    return (
        <div className="overlay">
            {/* Toggle Button (Visible when collapsed) */}
            <button
                className="toggle-btn pop-in"
                onClick={() => setExpanded(!expanded)}
                style={{
                    display: expanded ? 'none' : 'block'
                }}
            >
                🎛️ Controls
            </button>

            {/* Main Panel */}
            <div className={`glass-panel control-panel ${expanded ? 'visible' : 'hidden'}`}>
                <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Fidget</h1>
                    <button
                        onClick={() => setExpanded(false)}
                        style={{ padding: '0.4rem', fontSize: '1rem', background: 'transparent', border: 'none', opacity: 0.7 }}
                    >
                        ✕
                    </button>
                </div>

                <div className="scroll-content">
                    <div className="control-group">
                        <label>Speed: {speed.toFixed(1)}x</label>
                        <input
                            type="range"
                            min="0"
                            max="5"
                            step="0.1"
                            value={speed}
                            onChange={(e) => setSpeed(parseFloat(e.target.value))}
                        />
                    </div>

                    <div className="control-group">
                        <label>Distortion: {distortion.toFixed(2)}</label>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.05"
                            value={distortion}
                            onChange={(e) => setDistortion(parseFloat(e.target.value))}
                        />
                    </div>

                    <div className="control-group">
                        <label>Shape</label>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {['knot', 'sphere', 'gem', 'twist'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setShape(s)}
                                    style={{
                                        flex: '1 1 40%',
                                        padding: '0.6rem',
                                        fontSize: '0.75rem',
                                        background: shape === s ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '8px'
                                    }}
                                >
                                    {s.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="control-group">
                        <label>Music</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button
                                onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    background: isMusicPlaying ? 'rgba(100, 255, 100, 0.2)' : 'rgba(255,255,255,0.1)',
                                    border: isMusicPlaying ? '1px solid rgba(100, 255, 100, 0.4)' : '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    color: isMusicPlaying ? '#dcfce7' : 'white'
                                }}
                            >
                                {isMusicPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                            </button>

                            <div style={{
                                padding: '0.6rem',
                                background: 'rgba(0,0,0,0.3)',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                textAlign: 'center',
                                opacity: 0.9,
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                🎵 {audioName}
                            </div>

                            <label
                                className="upload-btn"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px dashed rgba(255,255,255,0.3)',
                                    borderRadius: '8px',
                                    padding: '0.8rem',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    fontSize: '0.8rem',
                                    color: 'rgba(255,255,255,0.8)',
                                    display: 'block'
                                }}
                            >
                                <span>📂</span> UPLOAD TRACK
                                <input
                                    type="file"
                                    accept="audio/*"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        const file = e.target.files[0]
                                        if (file) {
                                            const url = URL.createObjectURL(file)
                                            setAudioUrl(url)
                                            setAudioName(file.name)
                                            setIsMusicPlaying(true)
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="control-group">
                        <label>VFX</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Bloom: {bloomStrength}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    step="0.1"
                                    value={bloomStrength}
                                    style={{ width: '60%' }}
                                    onChange={(e) => setBloomStrength(parseFloat(e.target.value))}
                                />
                            </div>
                            <button
                                onClick={() => setGlitchActive(!glitchActive)}
                                style={{
                                    width: '100%',
                                    padding: '0.6rem',
                                    fontSize: '0.8rem',
                                    background: glitchActive ? 'rgba(255, 50, 50, 0.2)' : 'rgba(255,255,255,0.1)',
                                    border: glitchActive ? '1px solid rgba(255, 50, 50, 0.5)' : '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '8px',
                                    color: glitchActive ? '#fee2e2' : 'white'
                                }}
                            >
                                {glitchActive ? 'GLITCH ON' : 'GLITCH OFF'}
                            </button>
                        </div>
                    </div>

                    <div className="control-group">
                        <label>Color</label>
                        <div className="color-picker">
                            {['#a5b4fc', '#fca5a5', '#86efac', '#fde047', '#d8b4fe'].map((c) => (
                                <button
                                    key={c}
                                    style={{
                                        backgroundColor: c,
                                        border: color === c ? '2px solid white' : 'none',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        padding: 0
                                    }}
                                    onClick={() => setColor(c)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', textAlign: 'right', pointerEvents: 'none' }}>
                <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Developed by Himanshu Nankani</p>
            </div>

            <style>{`
                /* Toggle Button Defaults (Desktop) */
                .toggle-btn {
                    position: fixed;
                    top: 2rem;
                    left: 2rem;
                    z-index: 200; /* Increased z-index to ensure visibility */
                    padding: 0.8rem 1.2rem;
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 30px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    transition: all 0.3s ease;
                }

                .control-panel {
                    position: fixed;
                    top: 2rem;
                    left: 2rem;
                    width: clamp(280px, 25vw, 400px);
                    max-height: calc(100vh - 4rem);
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
                    z-index: 100;
                    padding: 0 !important;
                    overflow: hidden;
                }

                .control-panel.hidden {
                    transform: translateX(-120%);
                    opacity: 0;
                    pointer-events: none;
                }

                .scroll-content {
                    padding: 1.5rem;
                    overflow-y: auto;
                    height: 100%;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255,255,255,0.2) transparent;
                }
                
                .scroll-content::-webkit-scrollbar {
                    width: 6px;
                }
                .scroll-content::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scroll-content::-webkit-scrollbar-thumb {
                    background-color: rgba(255,255,255,0.2);
                    border-radius: 3px;
                }

                .control-group { margin-bottom: 2rem; }
                .control-group label {
                    display: block;
                    margin-bottom: 0.8rem;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: rgba(255,255,255,0.6);
                }

                /* Mobile Optimization */
                @media (max-width: 768px) {
                    /* Panel acts as bottom sheet */
                    .control-panel {
                        top: auto !important;
                        bottom: 0px !important;
                        left: 0;
                        width: 100vw;
                        max-height: 60vh; /* Reduced height on mobile */
                        border-radius: 20px 20px 0 0;
                        border-bottom: none;
                        transform: translateY(0);
                    }
                    .control-panel.hidden {
                        transform: translateY(110%);
                    }

                    /* Reposition Toggle Button to Bottom Right */
                    .toggle-btn {
                        top: auto;
                        bottom: max(2rem, env(safe-area-inset-bottom) + 20px);
                        left: 2rem;
                        right: auto;
                        padding: 0.6rem 1rem; /* Smaller padding */
                        font-size: 0.9rem;
                    }
                }
                
                .color-picker { display: flex; gap: 12px; flex-wrap: wrap; }
                input[type=range] { width: 100%; cursor: pointer; }

                /* Range Inputs */
                input[type=range] {
                    -webkit-appearance: none;
                    background: transparent;
                }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    margin-top: -6px;
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
                }
                input[type=range]::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 4px;
                    cursor: pointer;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 2px;
                }
                
                @keyframes popIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .pop-in { animation: popIn 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67); }
            `}</style>
        </div>
    )
}

export default Overlay
