import { useStore } from '../store'

const Overlay = () => {
    const { speed, distortion, color, shape, setSpeed, setDistortion, setColor, setShape } = useStore()

    return (
        <div className="overlay">
            <div className="glass-panel control-panel">
                <h1>Fidget Controller</h1>

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
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {['knot', 'sphere', 'gem'].map(s => (
                            <button
                                key={s}
                                onClick={() => setShape(s)}
                                style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    fontSize: '0.8rem',
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
                    <label>Color Tint</label>
                    <div className="color-picker">
                        {['#a5b4fc', '#fca5a5', '#86efac', '#fde047', '#d8b4fe'].map((c) => (
                            <button
                                key={c}
                                style={{
                                    backgroundColor: c,
                                    border: color === c ? '2px solid white' : 'none',
                                    width: '30px',
                                    minWidth: '30px', /* Force circle */
                                    height: '30px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                    padding: 0 /* Override global button padding */
                                }}
                                onClick={() => setColor(c)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', textAlign: 'right' }}>
                <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>INTERACTIVE DEMO</p>
            </div>

            <style>{`
                .control-panel {
                    position: absolute;
                    top: 2rem;
                    left: 2rem;
                    width: 300px;
                    padding: 2rem;
                }
                .control-group {
                    margin-bottom: 1.5rem;
                }
                .control-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.8);
                }
                input[type=range] {
                    width: 100%;
                    cursor: pointer;
                }
                .color-picker {
                    display: flex;
                    gap: 10px;
                }
            `}</style>
        </div>
    )
}

export default Overlay
