const steps = ["문제 발견", "실험 설계", "실행", "데이터 수집", "개선", "반복"];

function FlowRow({
  highlighted,
  highlightLabel,
}: {
  highlighted: string;
  highlightLabel: string;
}) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {steps.map((step, i) => {
        const isHighlighted = step === "실험 설계";
        return (
          <div key={step} className="flex items-center gap-1">
            {isHighlighted ? (
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                  highlighted === "human"
                    ? "bg-zinc-100 text-zinc-600 border-zinc-300"
                    : "bg-blue-600 text-white border-blue-600"
                }`}
              >
                {highlightLabel}
              </span>
            ) : (
              <span className="text-xs text-zinc-500 px-2 py-1">{step}</span>
            )}
            {i < steps.length - 1 && (
              <span className="text-zinc-300 text-xs">→</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ProcessFlow() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4">
      <div className="grid grid-cols-[60px_1fr] gap-4 items-center">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          AS-IS
        </span>
        <FlowRow highlighted="human" highlightLabel="실험 설계 (사람)" />
      </div>
      <div className="border-t border-zinc-100" />
      <div className="grid grid-cols-[60px_1fr] gap-4 items-center">
        <span className="text-xs font-medium text-blue-500 uppercase tracking-wider">
          TO-BE
        </span>
        <FlowRow highlighted="ai" highlightLabel="실험 설계 (AI)" />
      </div>
    </div>
  );
}
