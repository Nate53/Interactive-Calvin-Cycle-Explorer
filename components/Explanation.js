import React from 'react';
import { CALVIN_CYCLE_STEPS } from '../constants.js';

const Explanation = ({ currentStep }) => {
  const stepData = CALVIN_CYCLE_STEPS[currentStep];

  return (
    React.createElement("div", { className: "flex flex-col h-full" },
      React.createElement("h2", { className: "text-2xl font-bold text-cyan-400 mb-3" },
        `Step ${stepData.step + 1}: ${stepData.title}`
      ),
      React.createElement("div", { className: "text-gray-300 text-base leading-relaxed overflow-y-auto" },
        React.createElement("p", null, stepData.description)
      )
    )
  );
};

export default Explanation;