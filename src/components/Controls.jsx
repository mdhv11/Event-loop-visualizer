import React from 'react';

const Controls = ({ isRunning, onRun, onReset, onPause, stepIndex, totalSteps }) => {
    return (
        <div className="controls-container">
            <div className="status-display">
                Step: {stepIndex} / {totalSteps}
            </div>
            <div className="buttons-group">
                {!isRunning ? (
                    <button className="control-btn run-btn" onClick={onRun}>
                        {stepIndex > 0 && stepIndex < totalSteps ? 'Resume' : 'Run'}
                    </button>
                ) : (
                    <button className="control-btn pause-btn" onClick={onPause}>
                        Pause
                    </button>
                )}

                <button className="control-btn reset-btn" onClick={onReset}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Controls;
