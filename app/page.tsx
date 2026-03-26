import { mockGame } from "@/lib/mock-data";
import { diagnose, getMetricStatus } from "@/lib/diagnosis";
import { getRecommendations, recommendationLogic } from "@/lib/recommendations";
import Header from "@/components/header";
import ProcessFlow from "@/components/process-flow";
import MetricCard from "@/components/metric-card";
import DiagnosisPanel from "@/components/diagnosis-panel";
import RecommendationCard from "@/components/recommendation-card";
import SectionTitle from "@/components/section-title";

export default function DashboardPage() {
  const game = mockGame;
  const diagnosis = diagnose(game);
  const recommendations = getRecommendations(game);

  const metricDefs = [
    { key: "ctr" as const, label: "CTR", unit: "%" },
    { key: "cvr" as const, label: "CVR", unit: "%" },
    { key: "d1" as const, label: "D1 Retention", unit: "%" },
    { key: "d7" as const, label: "D7 Retention", unit: "%" },
    { key: "roasD7" as const, label: "ROAS D7", unit: "%" },
    { key: "roasD30" as const, label: "ROAS D30", unit: "%" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* 게임 컨텍스트 */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-semibold text-zinc-900">{game.title}</span>
          <span className="text-xs text-zinc-400">·</span>
          <span className="text-xs text-zinc-500">{game.genre}</span>
          <span className="text-xs text-zinc-400">·</span>
          <span className="text-xs text-zinc-500">{game.region}</span>
          <span className="text-xs text-zinc-400">·</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
            {game.lifecycleStage}
          </span>
        </div>

        {/* AS-IS vs TO-BE */}
        <section>
          <SectionTitle label="제품 개념" />
          <ProcessFlow />
        </section>

        {/* 진단 */}
        <section>
          <SectionTitle
            label="문제 진단"
            description="현재 KPI와 벤치마크 비교 기반의 규칙 기반 분석"
          />
          <DiagnosisPanel diagnosis={diagnosis} />
        </section>

        {/* KPI 현황 */}
        <section>
          <SectionTitle
            label="현재 KPI 현황"
            description={`${game.genre} 글로벌 벤치마크 기준`}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {metricDefs.map(({ key, label, unit }) => {
              const value = game.metrics[key];
              const benchmark = game.benchmark[key];
              const status = getMetricStatus(key, value, benchmark);
              return (
                <MetricCard
                  key={key}
                  label={label}
                  value={`${value}${unit}`}
                  status={status}
                  benchmark={`${benchmark}${unit}`}
                />
              );
            })}
          </div>
        </section>

        {/* 추천 실험 */}
        <section>
          <SectionTitle
            label="추천 실험"
            description="예상 비즈니스 임팩트 순으로 정렬된 상위 3개 실험"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((exp, i) => (
              <RecommendationCard key={exp.id} experiment={exp} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* 추천 로직 */}
        <section>
          <SectionTitle label="추천 로직" />
          <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  입력 지표
                </p>
                <ul className="space-y-1">
                  {recommendationLogic.inputMetrics.map((m) => (
                    <li key={m} className="text-zinc-600 text-xs">
                      · {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  판단 규칙
                </p>
                <ul className="space-y-1">
                  {recommendationLogic.decisionRules.map((r) => (
                    <li key={r} className="text-zinc-600 text-xs">
                      · {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-zinc-100 pt-4">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                이 추천을 선택한 이유
              </p>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {recommendationLogic.whyChosen}
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
