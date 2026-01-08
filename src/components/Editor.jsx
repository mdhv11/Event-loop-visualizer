import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme

const CodeEditor = ({ code, setCode }) => {
    return (
        <div className="editor-container">
            <h3>Code Editor</h3>
            <div className="editor-wrapper">
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 14,
                        backgroundColor: '#1e1e1e',
                        color: '#f8f8f2',
                        minHeight: '300px',
                    }}
                />
            </div>
        </div>
    );
};

export default CodeEditor;
