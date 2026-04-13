import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';

interface WorkflowStageProps {
  title: string;
  description: string;
  examples?: string[];
  score: number;
  phase: 'ideation' | 'design' | 'development' | 'live';
  icon: LucideIcon;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const phaseColors = {
  ideation: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    icon: 'text-purple-600',
    accent: 'bg-purple-600',
  },
  design: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    icon: 'text-blue-600',
    accent: 'bg-blue-600',
  },
  development: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    icon: 'text-orange-600',
    accent: 'bg-orange-600',
  },
  live: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    icon: 'text-green-600',
    accent: 'bg-green-600',
  },
};

export function WorkflowStage({
  title,
  description,
  examples,
  score,
  phase,
  icon: Icon,
  index,
  isExpanded,
  onToggle,
}: WorkflowStageProps) {
  const colors = phaseColors[phase];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Timeline dot and line */}
        <div className="flex flex-col items-center shrink-0">
          <motion.div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${colors.accent} flex items-center justify-center relative z-10`}
            whileHover={{ scale: 1.1 }}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.div>
          {index < 17 && (
            <div className="w-0.5 h-full min-h-[60px] sm:min-h-[80px] bg-gray-200 mt-2" />
          )}
        </div>

        {/* Content card */}
        <Card
          className={`flex-1 p-3 sm:p-4 border-2 ${colors.border} ${colors.bg} cursor-pointer hover:shadow-lg transition-shadow mb-4 sm:mb-6`}
          onClick={onToggle}
        >
          <div className="flex items-start justify-between mb-1 sm:mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <span className={`text-xs sm:text-sm font-mono ${colors.text} shrink-0`}>
                  {score.toFixed(1)}
                </span>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-none">{description}</p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className={`${colors.icon} ml-2 shrink-0`}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </div>

          {isExpanded && examples && examples.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200"
            >
              <p className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Examples:
              </p>
              <ul className="space-y-1">
                {examples.map((example, i) => (
                  <li key={i} className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                    <span className={`${colors.text} mt-0.5 shrink-0`}>•</span>
                    <span className="leading-relaxed">{example}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </Card>
      </div>
    </motion.div>
  );
}