import React, { useState, useEffect, useCallback } from 'react';
import CalvinCycleAnimation from './components/CalvinCycleAnimation.js';
import Explanation from './components/Explanation.js';
import Controls from './components/Controls.js';
import { CALVIN_CYCLE_STEPS } from './constants.js';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalSteps = CALVIN_CYCLE_STEPS.length;

  const handleNext = useCallback(() => {
    setCurrentStep((prevStep) => (prevStep + 1) % totalSteps);
  }, [totalSteps]);

  const handlePrev = () => {
    setCurrentStep((prevStep) => (prevStep - 1 + totalSteps) % totalSteps);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 3000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, handleNext]);

  return React.createElement("div", { className: "min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8" },
    React.createElement("header", { className: "w-full max-w-7xl text-center mb-6" },
      React.createElement("h1", { className: "text-4xl md:text-5xl font-bold text-cyan-400 tracking-tight" }, "The Calvin Cycle"),
      React.createElement("p", { className: "text-lg md:text-xl text-gray-300 mt-2" }, "An Interactive Journey Through Light-Independent Reactions")
    ),
    React.createElement("main", { className: "w-full max-w-7xl flex-grow flex flex-col lg:flex-row gap-8" },
      React.createElement("div", { className: "lg:w-3/5 flex flex-col bg-gray-800/50 rounded-2xl shadow-2xl p-4 sm:p-6 ring-1 ring-white/10" },
        React.createElement(CalvinCycleAnimation, { currentStep: currentStep })
      ),
      React.createElement("div", { className: "lg:w-2/5 flex flex-col gap-6" },
        React.createElement("div", { className: "bg-gray-800/50 rounded-2xl shadow-2xl p-6 ring-1 ring-white/10 flex-grow" },
          React.createElement(Explanation, { currentStep: currentStep })
        ),
        React.createElement("div", { className: "bg-gray-800/50 rounded-2xl shadow-2xl p-4 ring-1 ring-white/10" },
          React.createElement(Controls, {
            onNext: handleNext,
            onPrev: handlePrev,
            onReset: handleReset,
            onPlayPause: handlePlayPause,
            isPlaying: isPlaying,
            currentStep: currentStep,
            totalSteps: totalSteps
          })
        )
      )
    ),
    React.createElement("footer", { className: "w-full max-w-7xl text-center mt-12 text-gray-500 text-sm" },
      React.createElement("p", null, "Built with React and Tailwind CSS.")
    )
  );
};

export default App;
