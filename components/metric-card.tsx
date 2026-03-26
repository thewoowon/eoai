import type { StatusLevel } from "@/types";

interface MetricCardProps {
  label: string;
  value: string;
  status: StatusLevel;
  benchmark?: string;
}

const statusConfig: Record<StatusLevel, { badge: string; dot: string; label: string }> = {
  good: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    label: "양호",
  },
  warning: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    label: "주의",
  },
  critical: {
    badge: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
    label: "위험",
  },
};

export default function MetricCard({
  label,
  value,
  status,
  benchmark,
}: MetricCardProps) {
  const config = statusConfig[status];
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
          {label}
        </span>
        <span
          className={`flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full border ${config.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      </div>
      <div className="text-2xl font-semibold text-zinc-900">{value}</div>
      {benchmark && (
        <div className="text-xs text-zinc-400">벤치마크: {benchmark}</div>
      )}
    </div>
  );
}
