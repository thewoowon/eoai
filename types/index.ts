export interface Metrics {
  ctr: number;
  cvr: number;
  d1: number;
  d7: number;
  roasD7: number;
  roasD30: number;
}

export type MetricKey = keyof Metrics;

export type StatusLevel = "good" | "warning" | "critical";

export type TargetArea = "creative" | "onboarding" | "monetization";

export type EffortLevel = "Low" | "Medium" | "High";

export type PriorityLevel = "High" | "Medium" | "Low";

export interface Experiment {
  id: string;
  title: string;
  targetArea: TargetArea;
  expectedImpact: string;
  rationale: string;
  effort: EffortLevel;
  priority: PriorityLevel;
  deltaMetrics: Partial<Metrics>;
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  region: string;
  lifecycleStage: string;
  metrics: Metrics;
  benchmark: Metrics;
}

export interface Diagnosis {
  primaryIssue: string;
  secondaryIssue: string;
  confidence: "High" | "Medium" | "Low";
  reasonSummary: string;
}

export interface SimulationResult {
  experiment: Experiment;
  before: Metrics;
  after: Metrics;
  narrative: string;
  nextSteps: Experiment[];
}
