import type { CalvinCycleStep } from './types';

export const CALVIN_CYCLE_STEPS: CalvinCycleStep[] = [
  {
    step: 0,
    title: 'Initial State',
    description: "The cycle begins in the stroma of the chloroplast with 6 molecules of Ribulose-1,5-bisphosphate (RuBP), a 5-carbon compound, ready to accept carbon dioxide.",
    molecules: { rubp: true },
  },
  {
    step: 1,
    title: 'Carbon Fixation',
    description: "6 molecules of CO₂ enter the cycle. The enzyme RuBisCo attaches each CO₂ to a RuBP molecule, initiating the process of fixing atmospheric carbon into an organic form.",
    molecules: { rubp: true, co2: true },
  },
  {
    step: 2,
    title: 'Formation of Unstable Intermediate',
    description: "The combination of RuBP and CO₂ creates 6 highly unstable 6-carbon intermediates. These molecules are transient and immediately break down.",
    molecules: { unstableIntermediate: true },
  },
  {
    step: 3,
    title: 'Formation of GP',
    description: "Each unstable intermediate splits in half, yielding a total of 12 molecules of Glycerate-3-phosphate (GP), a 3-carbon compound.",
    molecules: { gp: true },
  },
  {
    step: 4,
    title: 'Reduction (Part 1: ATP)',
    description: "The first energy input stage begins. 12 ATP molecules are used to phosphorylate the 12 GP molecules, converting them into 12 molecules of 1,3-bisphosphoglycerate.",
    molecules: { gp: true, reduction_atp: true, bpg: true },
  },
  {
    step: 5,
    title: 'Reduction (Part 2: NADPH)',
    description: "The second energy input stage occurs. 12 NADPH molecules reduce the 12 molecules of 1,3-bisphosphoglycerate, which are then converted into 12 molecules of Triose Phosphate (TP).",
    molecules: { bpg: true, reduction_nadph: true, tp_total: true },
  },
  {
    step: 6,
    title: 'Product Synthesis',
    description: "Two of the 12 TP molecules exit the cycle.  These are the net product of the Calvin Cycle and are used by the cell to synthesize glucose.",
    molecules: { tp_total: true, tp_leaves: true },
  },
  {
    step: 7,
    title: 'Formation of Glucose',
    description: "The two exiting TP molecules (3-carbons each) combine to form one molecule of glucose (a 6-carbon hexose sugar molecule), which is a vital energy source for the plant (and the basis for all food chains on planet Earth!)",
    molecules: { tp_leaves: true, glucose: true },
  },
  {
    step: 8,
    title: 'Start of Regeneration',
    description: "The remaining 10 molecules of TP, which contain a total of 30 carbon atoms, remain within the cycle to be recycled back into the starting compound, RuBP.",
    molecules: { tp_regenerate: true, glucose: true },
  },
  {
    step: 9,
    title: 'Regeneration of RuBP (ATP)',
    description: "The final energy input stage. Through a series of complex reactions powered by 6 ATP molecules, the 10 TP molecules are rearranged to reform 6 molecules of RuBP.",
    molecules: { tp_regenerate: true, regeneration_atp: true, glucose: true },
  },
  {
    step: 10,
    title: 'Cycle Complete',
    description: "The 6 molecules of RuBP are now fully regenerated, completing the cycle. The stroma is primed to capture more CO₂, allowing the light-independent reactions to continue.",
    molecules: { rubp_regenerated: true, glucose: true },
  },
];