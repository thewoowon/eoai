"use client";

import { useRouter } from "next/navigation";
import type { Experiment } from "@/types";

interface RecommendationCardProps {
  experiment: Experiment;
  rank: number;
}

const areaColor: Record<string, string> = {
  creative: "bg-violet-50 text-violet-700 border-violet-200",
  onboarding: "bg-blue-50 text-blue-700 border-blue-200",
  monetization: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const areaLabel: Record<string, string> = {
  creative: "크리에이티브",
  onboarding: "온보딩",
  monetization: "수익화",
};

const priorityColor: Record<string, string> = {
  High: "bg-red-50 text-red-700 border-red-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-zinc-50 text-zinc-600 border-zinc-200",
};

const priorityLabel: Record<string, string> = {
  High: "높음",
  Medium: "보통",
  Low: "낮음",
};

const effortLabel: Record<string, string> = {
  Low: "낮음",
  Medium: "보통",
  High: "높음",
};

export default function RecommendationCard({
  experiment,
  rank,
}: RecommendationCardProps) {
  const router = useRouter();

  const handleRunSimulation = () => {
    router.push(`/simulate?experiment=${experiment.id}`);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 flex flex-col gap-4 hover:border-zinc-300 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="text-xs font-semibold text-zinc-400 mt-0.5 w-4">
            {rank}
          </span>
          <h3 className="text-sm font-semibold text-zinc-900 leading-snug">
            {experiment.title}
          </h3>
        </div>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full border whitespace-nowrap ${
            areaColor[experiment.targetArea] ?? "bg-zinc-50 text-zinc-600 border-zinc-200"
          }`}
        >
          {areaLabel[experiment.targetArea] ?? experiment.targetArea}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-zinc-400 mb-0.5">예상 효과</p>
          <p className="font-semibold text-zinc-900">{experiment.expectedImpact}</p>
        </div>
        <div>
          <p className="text-zinc-400 mb-0.5">난이도</p>
          <p className="font-semibold text-zinc-900">{effortLabel[experiment.effort] ?? experiment.effort}</p>
        </div>
      </div>

      <p className="text-xs text-zinc-500 leading-relaxed">{experiment.rationale}</p>

      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
            priorityColor[experiment.priority]
          }`}
        >
          우선순위: {priorityLabel[experiment.priority] ?? experiment.priority}
        </span>
        <button
          onClick={handleRunSimulation}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer"
        >
          시뮬레이션 실행 →
        </button>
      </div>
    </div>
  );
}
