import type { Experiment, Metrics, SimulationResult } from "@/types";
import { experimentTemplates } from "./mock-data";

function applyDeltas(base: Metrics, deltas: Partial<Metrics>): Metrics {
  return {
    ctr: +(base.ctr + (deltas.ctr ?? 0)).toFixed(2),
    cvr: +(base.cvr + (deltas.cvr ?? 0)).toFixed(1),
    d1: +(base.d1 + (deltas.d1 ?? 0)).toFixed(0),
    d7: +(base.d7 + (deltas.d7 ?? 0)).toFixed(1),
    roasD7: +(base.roasD7 + (deltas.roasD7 ?? 0)).toFixed(0),
    roasD30: +(base.roasD30 + (deltas.roasD30 ?? 0)).toFixed(0),
  };
}

function generateNarrative(
  experiment: Experiment,
  before: Metrics,
  after: Metrics
): string {
  const deltas = experiment.deltaMetrics;
  const improved: string[] = [];
  const unchanged: string[] = [];

  if (deltas.ctr) improved.push(`CTR이 ${before.ctr}%에서 ${after.ctr}%로 개선`);
  else unchanged.push("CTR");

  if (deltas.d1) improved.push(`D1 리텐션이 ${before.d1}%에서 ${after.d1}%로 개선`);
  else unchanged.push("D1 리텐션");

  if (deltas.roasD7) improved.push(`ROAS D7이 ${before.roasD7}%에서 ${after.roasD7}%로 개선`);
  else unchanged.push("ROAS D7");

  const narrativeByArea: Record<string, string> = {
    creative: `크리에이티브 훅 조정으로 유의미한 CTR 상승이 확인되었습니다. ${improved.join(", ")}. 다만 ${unchanged.join(", ")}은 여전히 벤치마크 미달 — 다음 권장 액션은 FTUE 최적화를 통한 리텐션 개선입니다.`,
    onboarding: `FTUE 단순화로 초기 리텐션이 개선되었습니다. ${improved.join(", ")}. ${unchanged.join(", ")}은 큰 변화가 없었습니다 — 다음 사이클에서는 획득 또는 수익화 지표 개선을 고려하세요.`,
    monetization: `수익화 조정으로 매출 효율이 향상되었습니다. ${improved.join(", ")}. ${unchanged.join(", ")}은 변화가 없었습니다 — 추가 성과를 위해서는 상위 퍼널 지표 개선이 필요합니다.`,
  };

  return (
    narrativeByArea[experiment.targetArea] ??
    `${improved.join(", ")}. ${unchanged.join(", ")}은 유의미한 변화 없음. 나머지 취약 영역에 대한 반복 실험을 권장합니다.`
  );
}

function getNextStepExperiments(experiment: Experiment): Experiment[] {
  const nextByArea: Record<string, Experiment[]> = {
    creative: [experimentTemplates.lowD1[0], experimentTemplates.lowCtr[1]],
    onboarding: [experimentTemplates.lowCtr[0], experimentTemplates.lowRoas[0]],
    monetization: [experimentTemplates.lowD1[0], experimentTemplates.lowRoas[1]],
  };
  return nextByArea[experiment.targetArea] ?? [experimentTemplates.lowCtr[0], experimentTemplates.lowD1[0]];
}

export function runSimulation(
  experiment: Experiment,
  currentMetrics: Metrics
): SimulationResult {
  const after = applyDeltas(currentMetrics, experiment.deltaMetrics);
  const narrative = generateNarrative(experiment, currentMetrics, after);
  const nextSteps = getNextStepExperiments(experiment);

  return {
    experiment,
    before: currentMetrics,
    after,
    narrative,
    nextSteps,
  };
}
