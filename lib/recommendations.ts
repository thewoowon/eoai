import type { Game, Experiment } from "@/types";
import { experimentTemplates } from "./mock-data";
import { getDiagnosisKeys } from "./diagnosis";

export function getRecommendations(game: Game): Experiment[] {
  const { lowCtr, lowD1, lowRoas } = getDiagnosisKeys(game);

  const result: Experiment[] = [];

  if (lowCtr) {
    result.push(experimentTemplates.lowCtr[0]);
  }
  if (lowD1) {
    result.push(experimentTemplates.lowD1[0]);
  }
  if (lowRoas) {
    result.push(experimentTemplates.lowRoas[0]);
  }

  // 3개 미만이면 차순위 항목으로 채움
  if (result.length < 3 && lowCtr) {
    const extra = experimentTemplates.lowCtr[1];
    if (!result.find((e) => e.id === extra.id)) result.push(extra);
  }
  if (result.length < 3 && lowD1) {
    const extra = experimentTemplates.lowD1[1];
    if (!result.find((e) => e.id === extra.id)) result.push(extra);
  }
  if (result.length < 3 && lowRoas) {
    const extra = experimentTemplates.lowRoas[1];
    if (!result.find((e) => e.id === extra.id)) result.push(extra);
  }

  return result.slice(0, 3);
}

export const recommendationLogic = {
  inputMetrics: ["CTR", "D1 Retention", "ROAS D7"],
  decisionRules: [
    "CTR < 벤치마크의 80% → 크리에이티브 문제로 진단",
    "D1 < 벤치마크의 85% → FTUE / 온보딩 이슈로 진단",
    "ROAS D7 < 벤치마크의 85% (CTR 정상 시) → 수익화 갭으로 진단",
    "복수 이슈 존재 시 → 비즈니스 긴급도 순으로 정렬 (획득 → 리텐션 → 수익화)",
  ],
  whyChosen:
    "추천은 진단된 이슈별로 매핑된 구조화된 실험 템플릿 라이브러리에서 선택됩니다. 이슈 카테고리별 최우선순위 실험이 먼저 노출되며, 실행 가능하고 중복 없는 제안을 보장합니다.",
};
