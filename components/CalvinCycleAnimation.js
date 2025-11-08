import React from 'react';
import { CALVIN_CYCLE_STEPS } from '../constants.js';

const Molecule = ({ cx, cy, label, count, isActive, highlight = false }) => (
  React.createElement("g", { className: `transition-all duration-700 ease-in-out ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}` },
    React.createElement("circle", { cx: cx, cy: cy, r: "40", className: `stroke-2 ${highlight ? 'fill-green-500/20 stroke-green-400' : 'fill-cyan-500/10 stroke-cyan-400'}` }),
    React.createElement("text", { x: cx, y: cy, textAnchor: "middle", dy: ".3em", className: "fill-white font-bold text-lg" }, label),
    React.createElement("text", { x: cx, y: parseInt(cy) + 22, textAnchor: "middle", className: "fill-gray-300 text-sm" }, `(${count}x)`)
  )
);

const EnergyPacket = ({ x, y, label, toLabel, isActive, reverse = false }) => (
  React.createElement("g", { className: `transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`, transform: `translate(${x}, ${y})` },
    React.createElement("path", { d: reverse ? "M 0 20 C 20 20, 20 0, 40 0" : "M 0 0 C 20 0, 20 20, 40 20", stroke: "url(#energyGradient)", strokeWidth: "2", fill: "none" }),
    React.createElement("text", { x: reverse ? "-10" : "-10", y: reverse ? "25" : "-5", textAnchor: "end", className: "fill-yellow-300 text-xs font-semibold" }, label),
    React.createElement("text", { x: reverse ? "50" : "50", y: reverse ? "-5" : "25", textAnchor: "start", className: "fill-gray-400 text-xs" }, toLabel),
    React.createElement("path", { d: reverse ? "M 35 -5 L 40 0 L 45 -5" : "M 35 25 L 40 20 L 45 25", stroke: "url(#energyGradient)", strokeWidth: "2", fill: "none" })
  )
);


const CalvinCycleAnimation = ({ currentStep }) => {
  const stepData = CALVIN_CYCLE_STEPS[currentStep].molecules;

  return (
    React.createElement("div", { className: "w-full h-full aspect-[5/4.5] relative flex items-center justify-center" },
      React.createElement("svg", { viewBox: "0 0 500 450", className: "w-full h-full" },
        React.createElement("defs", null,
          React.createElement("linearGradient", { id: "energyGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
            React.createElement("stop", { offset: "0%", stopColor: "#facc15" }),
            React.createElement("stop", { offset: "100%", stopColor: "#fde047" })
          ),
          React.createElement("marker", { id: "arrow", viewBox: "0 0 10 10", refX: "5", refY: "5", markerWidth: "6", markerHeight: "6", orient: "auto-start-reverse" },
            React.createElement("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "#38bdf8" })
          )
        ),
        React.createElement("circle", { cx: "250", cy: "225", r: "150", fill: "none", stroke: "#38bdf8", strokeWidth: "2", strokeDasharray: "8 8", className: "opacity-30" }),
        React.createElement("text", { x: "250", y: "45", textAnchor: "middle", className: "fill-gray-400 text-xs uppercase tracking-widest" }, "Carbon Fixation"),
        React.createElement("text", { x: "440", y: "225", textAnchor: "middle", className: "fill-gray-400 text-xs uppercase tracking-widest", transform: "rotate(90, 440, 225)" }, "Reduction"),
        React.createElement("text", { x: "250", y: "415", textAnchor: "middle", className: "fill-gray-400 text-xs uppercase tracking-widest" }, "Product Synthesis"),
        React.createElement("text", { x: "60", y: "225", textAnchor: "middle", className: "fill-gray-400 text-xs uppercase tracking-widest", transform: "rotate(-90, 60, 225)" }, "Regeneration"),
        React.createElement("g", { opacity: currentStep >= 1 && currentStep <= 2 ? 1 : 0.3, className: "transition-opacity duration-500" },
          React.createElement("rect", { x: "200", y: "105", width: "100", height: "30", rx: "5", className: "fill-indigo-500/30 stroke-indigo-400" }),
          React.createElement("text", { x: "250", y: "125", textAnchor: "middle", dy: "-2", className: "fill-white font-bold text-sm" }, "RuBisCo")
        ),
        React.createElement(Molecule, { cx: "250", cy: "75", label: "RuBP", count: 6, isActive: !!stepData.rubp || !!stepData.rubp_regenerated }),
        React.createElement(Molecule, { cx: "100", cy: "75", label: "CO₂", count: 6, isActive: !!stepData.co2 }),
        React.createElement("g", { className: `transition-all duration-700 ease-in-out ${stepData.unstableIntermediate ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}` },
          React.createElement("circle", { cx: "250", cy: "145", r: "40", className: "fill-red-500/20 stroke-red-400 animate-pulse", strokeWidth: "2", strokeDasharray: "4 4" }),
          React.createElement("text", { x: "250", y: "145", textAnchor: "middle", dy: ".3em", className: "fill-white font-bold text-sm" }, "6C Intermediate"),
          React.createElement("text", { x: "250", y: 145 + 22, textAnchor: "middle", className: "fill-gray-300 text-sm" }, "(6x unstable)")
        ),
        React.createElement(Molecule, { cx: "400", cy: "225", label: "GP", count: 12, isActive: !!stepData.gp }),
        React.createElement(Molecule, { cx: "353", cy: "331", label: "1,3-BPG", count: 12, isActive: !!stepData.bpg }),
        React.createElement(Molecule, { cx: "250", cy: "375", label: "TP", count: 12, isActive: !!stepData.tp_total }),
        React.createElement("g", { className: `transition-opacity duration-700 ${stepData.tp_regenerate ? 'opacity-100' : 'opacity-0'}` },
          React.createElement(Molecule, { cx: "100", cy: "225", label: "TP", count: 10, isActive: true })
        ),
        React.createElement(Molecule, { cx: "250", cy: "415", label: "Glucose", count: 1, isActive: !!stepData.glucose, highlight: true }),
        React.createElement("path", { d: "M 135 75 L 210 75", stroke: "#38bdf8", strokeWidth: "2", fill: "none", markerEnd: "url(#arrow)", opacity: stepData.co2 ? 1 : 0, className: "transition-opacity duration-500" }),
        React.createElement("path", { d: "M 285 170 A 100 100 0 0 1 370 210", stroke: "#38bdf8", strokeWidth: "2", fill: "none", markerEnd: "url(#arrow)", opacity: stepData.gp ? 1 : 0, className: "transition-opacity duration-500" }),
        React.createElement("path", { d: "M 395 265 A 100 100 0 0 1 365 300", stroke: "#38bdf8", strokeWidth: "2", fill: "none", markerEnd: "url(#arrow)", opacity: stepData.bpg ? 1 : 0, className: "transition-opacity duration-500" }),
        React.createElement("path", { d: "M 320 355 Q 280 375, 280 375", stroke: "#38bdf8", strokeWidth: "2", fill: "none", markerEnd: "url(#arrow)", opacity: stepData.tp_total && !stepData.bpg ? 1 : 0, className: "transition-opacity duration-500" }),
        React.createElement("path", { d: "M 210 375 A 150 150 0 0 1 100 265", stroke: "#38bdf8", strokeWidth: "2", fill: "none", markerEnd: "url(#arrow)", opacity: stepData.tp_regenerate ? 1 : 0, className: "transition-opacity duration-500" }),
        React.createElement("path", { d: "M 100 185 A 150 150 0 0 1 210 75", stroke: "#38bdf8", strokeWidth: "2", fill: "none", markerEnd: "url(#arrow)", opacity: stepData.rubp_regenerated ? 1 : 0, className: "transition-opacity duration-500" }),
        React.createElement("path", { d: "M 250 375 L 250 415", stroke: "#6ee7b7", strokeWidth: "3", fill: "none", markerEnd: "url(#arrow)", opacity: stepData.tp_leaves ? 1 : 0, className: "transition-opacity duration-500" }),
        React.createElement(EnergyPacket, { x: "350", y: "270", label: "12 ATP", toLabel: "12 ADP", isActive: !!stepData.reduction_atp }),
        React.createElement(EnergyPacket, { x: "300", y: "300", label: "12 NADPH", toLabel: "12 NADP⁺", isActive: !!stepData.reduction_nadph }),
        React.createElement(EnergyPacket, { x: "120", y: "100", label: "6 ATP", toLabel: "6 ADP", isActive: !!stepData.regeneration_atp, reverse: true })
      )
    )
  );
};

export default CalvinCycleAnimation;