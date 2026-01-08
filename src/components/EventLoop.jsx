import React from 'react';
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
/* eslint-enable no-unused-vars */

const EventLoop = ({ active }) => {
    return (
        <div className="event-loop-container">
            <div className="event-loop-label">Event Loop</div>
            <motion.svg
                viewBox="0 0 100 100"
                className="event-loop-icon"
                animate={{ rotate: active ? 360 : 0 }}
                transition={active ? { duration: 0.5, repeat: Infinity, ease: "linear" } : { duration: 0 }}
            >
                <path
                    d="M 50 10 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <path
                    d="M 90 50 L 80 40 L 90 60 L 100 40 Z"
                    fill="#6366f1"
                />

                <path
                    d="M 50 90 A 40 40 0 0 1 10 50"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <path
                    d="M 10 50 L 20 60 L 10 40 L 0 60 Z"
                    fill="#10b981"
                />
            </motion.svg>
        </div>
    );
};

export default EventLoop;
