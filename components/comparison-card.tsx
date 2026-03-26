interface ComparisonCardProps {
  label: string;
  before: string;
  after: string;
  delta: string;
  improved: boolean;
}

export default function ComparisonCard({
  label,
  before,
  after,
  delta,
  improved,
}: ComparisonCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          {label}
        </p>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
            improved
              ? "bg-emerald-50 text-emerald-700"
              : "bg-zinc-50 text-zinc-500"
          }`}
        >
          {delta}
        </span>
      </div>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <p className="text-xs text-zinc-400 mb-0.5">이전</p>
          <p className="text-lg font-semibold text-zinc-400">{before}</p>
        </div>
        <div className="text-zinc-300 text-sm mb-1">→</div>
        <div className="flex-1">
          <p className="text-xs text-zinc-400 mb-0.5">이후</p>
          <p className="text-lg font-semibold text-zinc-900">{after}</p>
        </div>
      </div>
    </div>
  );
}
