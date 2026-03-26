interface SectionTitleProps {
  label: string;
  description?: string;
}

export default function SectionTitle({ label, description }: SectionTitleProps) {
  return (
    <div className="mb-4">
      <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">
        {label}
      </h2>
      {description && (
        <p className="text-sm text-zinc-400 mt-0.5">{description}</p>
      )}
    </div>
  );
}
