import React from 'react';
import PlayIcon from './icons/PlayIcon.js';
import PauseIcon from './icons/PauseIcon.js';
import NextIcon from './icons/NextIcon.js';
import PrevIcon from './icons/PrevIcon.js';
import ResetIcon from './icons/ResetIcon.js';

const ControlButton = ({ onClick, children, 'aria-label': ariaLabel, className = '' }) => (
    React.createElement("button", {
        onClick: onClick,
        "aria-label": ariaLabel,
        className: `p-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800 ${className}`
    },
        children
    )
);

const Controls = ({ onPlayPause, onNext, onPrev, onReset, isPlaying, currentStep, totalSteps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    React.createElement("div", { className: "flex flex-col gap-4" },
        React.createElement("div", { className: "w-full bg-gray-700 rounded-full h-2.5" },
            React.createElement("div", { className: "bg-cyan-400 h-2.5 rounded-full", style: { width: `${progress}%`, transition: 'width 0.5s ease-in-out' } })
        ),
        React.createElement("div", { className: "flex items-center justify-center gap-4" },
            React.createElement(ControlButton, { onClick: onReset, "aria-label": "Reset animation", className: "text-gray-400 hover:text-white hover:bg-gray-700" },
                React.createElement(ResetIcon)
            ),
            React.createElement(ControlButton, { onClick: onPrev, "aria-label": "Previous step", className: "text-gray-400 hover:text-white hover:bg-gray-700" },
                React.createElement(PrevIcon)
            ),
            React.createElement(ControlButton, { onClick: onPlayPause, "aria-label": isPlaying ? 'Pause animation' : 'Play animation', className: "bg-cyan-500 text-gray-900 hover:bg-cyan-400 scale-110" },
                isPlaying ? React.createElement(PauseIcon) : React.createElement(PlayIcon)
            ),
            React.createElement(ControlButton, { onClick: onNext, "aria-label": "Next step", className: "text-gray-400 hover:text-white hover:bg-gray-700" },
                React.createElement(NextIcon)
            )
        )
    )
  );
};

export default Controls;