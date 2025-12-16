// app/components/ProgressBar.tsx
interface ProgressBarProps {
  skill: string;
  percentage: number;
}

export default function ProgressBar({ skill, percentage }: ProgressBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium text-gray-400">{skill}</span>
        <span className="text-gray-400 text-sm">{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gray-700 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}