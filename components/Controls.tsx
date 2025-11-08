
import React from 'react';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import NextIcon from './icons/NextIcon';
import PrevIcon from './icons/PrevIcon';
import ResetIcon from './icons/ResetIcon';

interface ControlsProps {
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
}

const ControlButton: React.FC<{ onClick: () => void; children: React.ReactNode; 'aria-label': string; className?: string; }> = ({ onClick, children, 'aria-label': ariaLabel, className = '' }) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className={`p-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800 ${className}`}
    >
        {children}
    </button>
);


const Controls: React.FC<ControlsProps> = ({ onPlayPause, onNext, onPrev, onReset, isPlaying, currentStep, totalSteps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="flex flex-col gap-4">
        <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-cyan-400 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
        </div>
        <div className="flex items-center justify-center gap-4">
            <ControlButton onClick={onReset} aria-label="Reset animation" className="text-gray-400 hover:text-white hover:bg-gray-700">
                <ResetIcon />
            </ControlButton>
            <ControlButton onClick={onPrev} aria-label="Previous step" className="text-gray-400 hover:text-white hover:bg-gray-700">
                <PrevIcon />
            </ControlButton>
            <ControlButton onClick={onPlayPause} aria-label={isPlaying ? 'Pause animation' : 'Play animation'} className="bg-cyan-500 text-gray-900 hover:bg-cyan-400 scale-110">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </ControlButton>
            <ControlButton onClick={onNext} aria-label="Next step" className="text-gray-400 hover:text-white hover:bg-gray-700">
                <NextIcon />
            </ControlButton>
        </div>
    </div>
  );
};

export default Controls;
