import React from 'react';
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
/* eslint-enable no-unused-vars */

const CallStack = ({ stack }) => {
    return (
        <div className="visualizer-box">
            <h3>Call Stack</h3>
            <div className="stack-container-inner">
                <AnimatePresence>
                    {stack.slice().reverse().map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="stack-frame"
                        >
                            {item.name}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CallStack;
