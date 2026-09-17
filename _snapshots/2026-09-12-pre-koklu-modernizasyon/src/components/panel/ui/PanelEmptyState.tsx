type Props = {
  message: string;
  className?: string;
};

export function PanelEmptyState({ message, className = "mt-4" }: Props) {
  return (
    <div
      className={`rounded-lg border border-dashed border-pt-border bg-pt-bg px-6 py-10 text-center ${className}`.trim()}
      role="status"
    >
      <p className="text-sm text-pt-slate-500">{message}</p>
    </div>
  );
}
