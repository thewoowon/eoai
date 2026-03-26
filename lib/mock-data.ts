import type { Game, Experiment } from "@/types";

export const mockGame: Game = {
  id: "burger-please",
  title: "Burger Please",
  genre: "Arcade Idle",
  region: "Global",
  lifecycleStage: "확장기",
  metrics: {
    ctr: 0.9,
    cvr: 18.5,
    d1: 28,
    d7: 9,
    roasD7: 14,
    roasD30: 42,
  },
  benchmark: {
    ctr: 1.4,
    cvr: 20,
    d1: 35,
    d7: 12,
    roasD7: 18,
    roasD30: 50,
  },
};

export const experimentTemplates: Record<string, Experiment[]> = {
  lowCtr: [
    {
      id: "creative-hook-failure",
      title: "첫 3초 훅을 실패 유발 시나리오로 교체",
      targetArea: "creative",
      expectedImpact: "CTR +0.8~1.4pp",
      rationale:
        "현재 CTR이 벤치마크 대비 저조함. 실패-긴장감 유발 훅은 손실 회피 심리를 자극해 광고 정지율을 개선하는 경향이 있음.",
      effort: "Low",
      priority: "High",
      deltaMetrics: { ctr: 0.9, cvr: 0.5 },
    },
    {
      id: "creative-reward-preview",
      title: "첫 3초 내 즉각적인 보상 미리보기 추가",
      targetArea: "creative",
      expectedImpact: "CTR +0.5~0.9pp",
      rationale:
        "훅에서 즉각적인 만족감을 보여주면 CTA 노출 전 이탈률이 감소함.",
      effort: "Low",
      priority: "High",
      deltaMetrics: { ctr: 0.6, cvr: 0.3 },
    },
    {
      id: "creative-competitor-framing",
      title: "경쟁사 진행도 프레이밍 방식 적용",
      targetArea: "creative",
      expectedImpact: "CTR +0.3~0.7pp",
      rationale:
        "장르 내 상위 크리에이티브 벤치마킹 결과, 진행도 훅이 퍼즐 훅 대비 30% 높은 성과를 보임.",
      effort: "Medium",
      priority: "Medium",
      deltaMetrics: { ctr: 0.5 },
    },
  ],
  lowD1: [
    {
      id: "onboarding-ftue-friction",
      title: "튜토리얼 게이트 제거로 FTUE 마찰 감소",
      targetArea: "onboarding",
      expectedImpact: "D1 +4~7pp",
      rationale:
        "초기 세션 이탈 데이터 분석 결과 첫 보상 전에 이탈하는 경우가 많음. 필수 튜토리얼 단계 제거 시 세션 완료율이 증가함.",
      effort: "Medium",
      priority: "High",
      deltaMetrics: { d1: 5, d7: 2 },
    },
    {
      id: "onboarding-faster-reward",
      title: "60초 이내 첫 보상 경험 제공",
      targetArea: "onboarding",
      expectedImpact: "D1 +3~5pp",
      rationale:
        "첫 1분 내 보상을 경험한 유저는 장르 전체 기준 D1 리텐션이 2배 높게 나타남.",
      effort: "Low",
      priority: "High",
      deltaMetrics: { d1: 4, d7: 1.5 },
    },
    {
      id: "onboarding-simplified-loop",
      title: "첫 세션 태스크를 최대 3단계로 단순화",
      targetArea: "onboarding",
      expectedImpact: "D1 +2~4pp",
      rationale:
        "캐주얼 아이들 장르에서 초기 세션의 인지 부하 감소가 리텐션 개선과 상관관계를 보임.",
      effort: "Medium",
      priority: "Medium",
      deltaMetrics: { d1: 3, d7: 1 },
    },
  ],
  lowRoas: [
    {
      id: "monetization-value-surfacing",
      title: "첫 IAP 노출 전 가치 경험 선제 제공",
      targetArea: "monetization",
      expectedImpact: "ROAS D7 +2~4pp",
      rationale:
        "수익화 프롬프트 전 가치를 경험한 유저는 첫 구매 전환율이 40% 높게 나타남.",
      effort: "Medium",
      priority: "High",
      deltaMetrics: { roasD7: 3, roasD30: 6 },
    },
    {
      id: "monetization-starter-pack",
      title: "세션 3회 시점에 한정판 스타터 팩 트리거 추가",
      targetArea: "monetization",
      expectedImpact: "ROAS D7 +3~5pp",
      rationale:
        "높은 인게이지먼트 시점의 한정 제안은 긴박감을 조성하고 초기 투자 심리를 활용함.",
      effort: "Low",
      priority: "High",
      deltaMetrics: { roasD7: 4, roasD30: 8 },
    },
    {
      id: "monetization-ad-iap-balance",
      title: "광고/IAP 노출 타이밍 재조정",
      targetArea: "monetization",
      expectedImpact: "ROAS D30 +5~8pp",
      rationale:
        "현재 광고 빈도가 IAP 전환 의도를 잠식할 가능성이 있음. 1~3회 세션에서 전면 광고를 줄이면 장기 수익화가 개선됨.",
      effort: "High",
      priority: "Medium",
      deltaMetrics: { roasD7: 2, roasD30: 7 },
    },
  ],
};
