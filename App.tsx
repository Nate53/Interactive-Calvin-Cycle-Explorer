
import React, { useState, useEffect, useCallback } from 'react';
import CalvinCycleAnimation from './components/CalvinCycleAnimation';
import Explanation from './components/Explanation';
import Controls from './components/Controls';
import { CALVIN_CYCLE_STEPS } from './constants';

const App: React.FC = () => {
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
    // Fix: Use ReturnType<typeof setInterval> for the interval ID type to ensure browser compatibility.
    let interval: ReturnType<typeof setInterval> | null = null;
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-7xl text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 tracking-tight">
          The Calvin Cycle
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-2">
          An Interactive Journey Through Light-Independent Reactions
        </p>
      </header>

      <main className="w-full max-w-7xl flex-grow flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/5 flex flex-col bg-gray-800/50 rounded-2xl shadow-2xl p-4 sm:p-6 ring-1 ring-white/10">
           <CalvinCycleAnimation currentStep={currentStep} />
        </div>
        <div className="lg:w-2/5 flex flex-col gap-6">
            <div className="bg-gray-800/50 rounded-2xl shadow-2xl p-6 ring-1 ring-white/10 flex-grow">
                 <Explanation currentStep={currentStep} />
            </div>
             <div className="bg-gray-800/50 rounded-2xl shadow-2xl p-4 ring-1 ring-white/10">
                <Controls
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onReset={handleReset}
                    onPlayPause={handlePlayPause}
                    isPlaying={isPlaying}
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                />
            </div>
        </div>
      </main>

      <footer className="w-full max-w-7xl text-center mt-12 text-gray-500 text-sm">
        <p>Built with React and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
