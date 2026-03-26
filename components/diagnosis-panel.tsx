import type { Diagnosis } from "@/types";

interface DiagnosisPanelProps {
  diagnosis: Diagnosis;
}

const confidenceColor: Record<Diagnosis["confidence"], string> = {
  High: "text-blue-600 bg-blue-50 border-blue-200",
  Medium: "text-amber-600 bg-amber-50 border-amber-200",
  Low: "text-zinc-600 bg-zinc-50 border-zinc-200",
};

const confidenceLabel: Record<Diagnosis["confidence"], string> = {
  High: "높음",
  Medium: "보통",
  Low: "낮음",
};

export default function DiagnosisPanel({ diagnosis }: DiagnosisPanelProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
            AI 진단
          </p>
          <h3 className="text-lg font-semibold text-zinc-900">
            {diagnosis.primaryIssue}
          </h3>
          <p className="text-sm text-zinc-500 mt-0.5">
            2차 이슈: {diagnosis.secondaryIssue}
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${
            confidenceColor[diagnosis.confidence]
          }`}
        >
          신뢰도: {confidenceLabel[diagnosis.confidence]}
        </span>
      </div>
      <div className="rounded-lg bg-zinc-50 border border-zinc-100 px-4 py-3">
        <p className="text-sm text-zinc-600 leading-relaxed">
          {diagnosis.reasonSummary}
        </p>
      </div>
    </div>
  );
}
