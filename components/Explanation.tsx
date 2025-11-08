
import React from 'react';
import { CALVIN_CYCLE_STEPS } from '../constants';

interface ExplanationProps {
  currentStep: number;
}

const Explanation: React.FC<ExplanationProps> = ({ currentStep }) => {
  const stepData = CALVIN_CYCLE_STEPS[currentStep];

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-cyan-400 mb-3">
        Step {stepData.step + 1}: {stepData.title}
      </h2>
      <div className="text-gray-300 text-base leading-relaxed overflow-y-auto">
         <p>{stepData.description}</p>
      </div>
    </div>
  );
};

export default Explanation;
