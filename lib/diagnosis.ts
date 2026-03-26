import type { Game, Diagnosis, MetricKey, StatusLevel } from "@/types";

export function getMetricStatus(
  key: MetricKey,
  value: number,
  benchmark: number
): StatusLevel {
  const ratio = value / benchmark;
  if (ratio >= 0.9) return "good";
  if (ratio >= 0.7) return "warning";
  return "critical";
}

export function diagnose(game: Game): Diagnosis {
  const { metrics, benchmark } = game;

  const ctrLow = metrics.ctr < benchmark.ctr * 0.8;
  const d1Low = metrics.d1 < benchmark.d1 * 0.85;
  const roasLow = metrics.roasD7 < benchmark.roasD7 * 0.85;

  const issues: { label: string; severity: number }[] = [];

  if (ctrLow) {
    issues.push({ label: "CTR 저조 (크리에이티브 문제)", severity: 3 });
  }
  if (d1Low) {
    issues.push({ label: "D1 리텐션 약세 (온보딩 마찰)", severity: 2 });
  }
  if (roasLow && !ctrLow) {
    issues.push({ label: "ROAS 부진 (수익화 효율 저하)", severity: 2 });
  } else if (roasLow) {
    issues.push({ label: "ROAS 부진 (수익화 효율 저하)", severity: 1 });
  }

  issues.sort((a, b) => b.severity - a.severity);

  const primaryIssue = issues[0]?.label ?? "주요 이슈 없음";
  const secondaryIssue = issues[1]?.label ?? "2차 이슈 없음";

  const confidence: Diagnosis["confidence"] =
    issues.length >= 2 ? "High" : issues.length === 1 ? "Medium" : "Low";

  const reasons: string[] = [];
  if (ctrLow) {
    reasons.push(
      `크리에이티브 훅이 벤치마크 대비 저조함 (CTR ${metrics.ctr}% vs 기준 ${benchmark.ctr}%)`
    );
  }
  if (d1Low) {
    reasons.push(
      `초기 세션 이탈 패턴이 FTUE 마찰을 시사함 (D1 ${metrics.d1}% vs 기준 ${benchmark.d1}%)`
    );
  }
  if (roasLow) {
    reasons.push(
      `수익화 효율이 목표치 미달 (ROAS D7 ${metrics.roasD7}% vs 기준 ${benchmark.roasD7}%)`
    );
  }

  const reasonSummary =
    reasons.length > 0
      ? reasons.join(". ") + "."
      : "모든 지표가 벤치마크 허용 범위 내에 있습니다.";

  return { primaryIssue, secondaryIssue, confidence, reasonSummary };
}

export function getDiagnosisKeys(game: Game): {
  lowCtr: boolean;
  lowD1: boolean;
  lowRoas: boolean;
} {
  const { metrics, benchmark } = game;
  return {
    lowCtr: metrics.ctr < benchmark.ctr * 0.8,
    lowD1: metrics.d1 < benchmark.d1 * 0.85,
    lowRoas: metrics.roasD7 < benchmark.roasD7 * 0.85,
  };
}
