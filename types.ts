
export interface CalvinCycleStep {
  step: number;
  title: string;
  description: string;
  molecules: {
    rubp?: boolean;
    co2?: boolean;
    unstableIntermediate?: boolean;
    gp?: boolean;
    bpg?: boolean; // 1,3-bisphosphoglycerate
    tp_total?: boolean;
    tp_leaves?: boolean;
    tp_regenerate?: boolean;
    glucose?: boolean;
    rubp_regenerated?: boolean;

    // Energy flags for more precise animation
    reduction_atp?: boolean;
    reduction_nadph?: boolean;
    regeneration_atp?: boolean;
  };
}
