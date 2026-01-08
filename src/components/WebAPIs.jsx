import React from 'react';
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
/* eslint-enable no-unused-vars */

const WebAPIs = ({ items }) => {
    return (
        <div className="visualizer-box">
            <h3>Web APIs</h3>
            <div className="webapi-container-inner">
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="webapi-item"
                        >
                            {item.name} ({item.timeLeft}ms)
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default WebAPIs;
