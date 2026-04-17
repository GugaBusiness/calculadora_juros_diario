import { cn } from '../../utils/cn';

export function SummaryCard({ title, value, icon, highlight }) {
  return (
    <div className={cn(
      "p-4 rounded-xl border flex flex-col gap-2",
      highlight ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-200"
    )}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</span>
      </div>
      <span className={cn(
        "text-lg md:text-xl font-bold",
        highlight ? "text-emerald-700" : "text-slate-800"
      )}>
        {value}
      </span>
    </div>
  );
}
