import React from 'react';

const Console = ({ logs }) => {
    return (
        <div className="console-container">
            <h3>Console</h3>
            <div className="console-output">
                {logs.map((log, index) => (
                    <div key={index} className="console-line">
                        &gt; {log}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Console;
