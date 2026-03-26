import Link from "next/link";
import { mockGame, experimentTemplates } from "@/lib/mock-data";
import { runSimulation } from "@/lib/simulation";
import Header from "@/components/header";
import SectionTitle from "@/components/section-title";
import ComparisonCard from "@/components/comparison-card";
import RecommendationCard from "@/components/recommendation-card";

const allExperiments = Object.values(experimentTemplates).flat();

export default async function SimulatePage(props: PageProps<"/simulate">) {
  const { experiment: experimentId } = await props.searchParams;
  const id = typeof experimentId === "string" ? experimentId : null;

  const experiment = id ? allExperiments.find((e) => e.id === id) : null;

  if (!experiment) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-20 text-center">
          <p className="text-zinc-400 text-sm mb-4">
            선택된 실험이 없습니다. 대시보드로 돌아가{" "}
            <span className="font-medium text-zinc-600">시뮬레이션 실행</span>{" "}
            버튼을 눌러주세요.
          </p>
          <Link
            href="/"
            className="inline-block text-sm font-semibold px-4 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
          >
            ← 대시보드로 돌아가기
          </Link>
        </main>
      </div>
    );
  }

  const result = runSimulation(experiment, mockGame.metrics);

  const metricDefs = [
    { key: "ctr" as const, label: "CTR", unit: "%" },
    { key: "cvr" as const, label: "CVR", unit: "%" },
    { key: "d1" as const, label: "D1 Retention", unit: "%" },
    { key: "d7" as const, label: "D7 Retention", unit: "%" },
    { key: "roasD7" as const, label: "ROAS D7", unit: "%" },
    { key: "roasD30" as const, label: "ROAS D30", unit: "%" },
  ];

  const areaLabel: Record<string, string> = {
    creative: "크리에이티브",
    onboarding: "온보딩 / FTUE",
    monetization: "수익화",
  };

  const effortLabel: Record<string, string> = {
    Low: "낮음",
    Medium: "보통",
    High: "높음",
  };

  const priorityLabel: Record<string, string> = {
    High: "높음",
    Medium: "보통",
    Low: "낮음",
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* 선택된 실험 요약 */}
        <section>
          <SectionTitle label="선택한 실험" />
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 mb-1">
                  {experiment.title}
                </h2>
                <p className="text-sm text-zinc-500">
                  타겟 영역: {areaLabel[experiment.targetArea] ?? experiment.targetArea}
                </p>
              </div>
              <div className="flex gap-3 text-xs flex-wrap">
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                  예상 효과: {experiment.expectedImpact}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200 font-medium">
                  난이도: {effortLabel[experiment.effort] ?? experiment.effort}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-medium">
                  우선순위: {priorityLabel[experiment.priority] ?? experiment.priority}
                </span>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-zinc-50 border border-zinc-100 px-4 py-3">
              <p className="text-xs text-zinc-500 leading-relaxed">
                {experiment.rationale}
              </p>
            </div>
          </div>
        </section>

        {/* Before vs After */}
        <section>
          <SectionTitle
            label="KPI 변화 비교"
            description="실험 유형에 따른 결정론적 시뮬레이션 결과"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {metricDefs.map(({ key, label, unit }) => {
              const before = result.before[key];
              const after = result.after[key];
              const delta = after - before;
              const improved = delta > 0;
              return (
                <ComparisonCard
                  key={key}
                  label={label}
                  before={`${before}${unit}`}
                  after={`${after}${unit}`}
                  delta={`${improved ? "+" : ""}${delta.toFixed(key === "d1" || key === "roasD7" || key === "roasD30" ? 0 : 1)}${unit}`}
                  improved={improved}
                />
              );
            })}
          </div>
        </section>

        {/* 시뮬레이션 결과 내러티브 */}
        <section>
          <SectionTitle label="시뮬레이션 결과" />
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <p className="text-sm text-zinc-700 leading-relaxed">{result.narrative}</p>
          </div>
        </section>

        {/* 다음 루프 추천 */}
        <section>
          <SectionTitle
            label="다음 루프 추천"
            description="이 실험 이후 테스트할 후속 실험 (클로즈드 루프)"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.nextSteps.map((exp, i) => (
              <RecommendationCard key={exp.id} experiment={exp} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* CTA 버튼 */}
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/"
            className="text-sm font-semibold px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            ← 대시보드로 돌아가기
          </Link>
          <Link
            href="/prompt"
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
          >
            바이브 코딩 프롬프트 보기 →
          </Link>
        </div>

      </main>
    </div>
  );
}
