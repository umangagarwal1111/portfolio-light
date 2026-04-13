import { useState } from 'react';
import { WorkflowStage } from './components/WorkflowStage';
import {
  Lightbulb,
  Gamepad2,
  Sparkles,
  Eye,
  RefreshCw,
  Pencil,
  Zap,
  Image,
  User,
  FastForward,
  Code,
  Wrench,
  Box,
  Database,
  BarChart,
  ShieldCheck,
  Users,
  Rocket,
} from 'lucide-react';
import { Badge } from './components/ui/badge';

interface Stage {
  title: string;
  description: string;
  examples?: string[];
  score: number;
  phase: 'ideation' | 'design' | 'development' | 'live';
  icon: any;
}

const workflowStages: Stage[] = [
  {
    title: 'Ideation',
    description: 'For what purpose are we building this game?',
    examples: [
      'Define target audience (kids, teens, adults)',
      'Identify core game objective (entertainment, education, skill-building)',
      'Set business goals (engagement, monetization, brand awareness)',
    ],
    score: 0,
    phase: 'ideation',
    icon: Lightbulb,
  },
  {
    title: 'Game Selection',
    description: 'Which game our new game idea is going to be based on',
    examples: [
      'Puzzle games (Tetris, 2048, Match-3)',
      'Arcade games (Pac-Man, Space Invaders)',
      'Strategy games (Tower Defense, Chess)',
      'Casual games (Flappy Bird, Candy Crush)',
    ],
    score: 1,
    phase: 'ideation',
    icon: Gamepad2,
  },
  {
    title: 'Prompt Generation',
    description: 'Share game ideas and gameplay with GPT to get a structured prompt generated',
    examples: [
      'Describe game mechanics and rules clearly',
      'Include visual style preferences (retro, minimalist, colorful)',
      'Specify technical requirements (mobile-first, keyboard controls)',
      'Mention inspirations and reference games',
    ],
    score: 2,
    phase: 'ideation',
    icon: Sparkles,
  },
  {
    title: 'Use Figma Make',
    description: 'Start with the generated prompt in Figma Make and view results',
    examples: [
      'Paste the GPT-generated prompt',
      'Review initial game implementation',
      'Test basic functionality and interactions',
    ],
    score: 3,
    phase: 'design',
    icon: Eye,
  },
  {
    title: 'Re-iterate with GPT',
    description: 'Review initial results and revisit GPT to generate a better prompt with feedback',
    examples: [
      'Identify what works and what doesn\'t',
      'Request specific improvements (smoother animations, better scoring)',
      'Add missing features or mechanics',
    ],
    score: 4,
    phase: 'design',
    icon: RefreshCw,
  },
  {
    title: 'Re-try in Figma',
    description: 'Use updated prompt to make changes',
    examples: [
      'Apply the improved prompt',
      'Compare with previous version',
      'Validate that feedback was addressed',
    ],
    score: 5,
    phase: 'design',
    icon: Pencil,
  },
  {
    title: 'Improve',
    description: 'With change-specific prompts, update the game little by little',
    examples: [
      '"Make the jump animation smoother"',
      '"Add a power-up system with 3 types"',
      '"Increase difficulty progressively with levels"',
      '"Add sound effects for key actions"',
    ],
    score: 6,
    phase: 'design',
    icon: Zap,
  },
  {
    title: 'Asset Building',
    description: 'Use different mediums to get assets and inspiration for your game',
    examples: [
      'Generate custom graphics with AI tools',
      'Source icons from icon libraries',
      'Create color palettes that match your theme',
      'Find or create sound effects and music',
    ],
    score: 6.5,
    phase: 'design',
    icon: Image,
  },
  {
    title: 'Add Character to Game',
    description: 'Use self-generated characters, inspiration for theme, snapshot of landscapes',
    examples: [
      'Design protagonist and enemies',
      'Create themed backgrounds (space, forest, city)',
      'Add personality through animations',
      'Implement character abilities and traits',
    ],
    score: 7,
    phase: 'development',
    icon: User,
  },
  {
    title: 'Iterate Fast & Critically',
    description: 'Use your judgment and feedback to improve gameplay based on your user type',
    examples: [
      'For kids: Simplify controls, add visual cues, bright colors',
      'For casual gamers: Quick sessions, clear progression, satisfying rewards',
      'For hardcore gamers: Challenging mechanics, leaderboards, skill ceiling',
      'A/B test different difficulty curves',
    ],
    score: 7.5,
    phase: 'development',
    icon: FastForward,
  },
  {
    title: 'Share Code File',
    description: 'Figma Make helps you share a code file with dev team',
    examples: [
      'Export clean, documented code',
      'Share via repository or direct download',
      'Include README with setup instructions',
    ],
    score: 8,
    phase: 'development',
    icon: Code,
  },
  {
    title: 'Dev - Code Review',
    description: 'Code review and code improvements (Cleanup/security/analytics)',
    examples: [
      'Refactor for performance and maintainability',
      'Add error handling and edge case management',
      'Implement security best practices',
      'Set up logging and monitoring',
    ],
    score: 8.3,
    phase: 'development',
    icon: Wrench,
  },
  {
    title: 'Framework Architecture',
    description: 'Integrate with app, handle device compatibility, etc.',
    examples: [
      'Ensure responsive design (mobile, tablet, desktop)',
      'Handle different screen sizes and orientations',
      'Optimize for various browsers',
      'Add progressive web app capabilities',
    ],
    score: 8.6,
    phase: 'development',
    icon: Box,
  },
  {
    title: 'Backend Integration',
    description: 'Connect to backend systems (Reward API, Anti-Cheat logic, etc.)',
    examples: [
      'Implement user authentication',
      'Connect reward/points API',
      'Add anti-cheat validation',
      'Set up save/load game state',
      'Implement leaderboard syncing',
    ],
    score: 9,
    phase: 'development',
    icon: Database,
  },
  {
    title: 'Analytics',
    description: 'Track user behavior to help improve game progressively',
    examples: [
      'Track session length and frequency',
      'Monitor completion rates per level',
      'Identify drop-off points',
      'Measure engagement with features',
      'A/B test variations',
    ],
    score: 9.2,
    phase: 'live',
    icon: BarChart,
  },
  {
    title: 'Design/Tech Review',
    description: 'Game crash/score/failures - This helps figure out edge cases naturally',
    examples: [
      'Test on various devices and browsers',
      'Identify and fix crashes',
      'Validate scoring logic accuracy',
      'Review failure states and messaging',
      'Performance profiling',
    ],
    score: 9.4,
    phase: 'live',
    icon: ShieldCheck,
  },
  {
    title: 'Internal Release',
    description: 'Soft launch for handful of users/beta, measure completion rate and improve',
    examples: [
      'Release to internal team first',
      'Beta test with 50-100 users',
      'Gather qualitative feedback',
      'Measure KPIs (retention, completion, engagement)',
      'Make data-driven improvements',
    ],
    score: 9.7,
    phase: 'live',
    icon: Users,
  },
  {
    title: 'Release',
    description: 'Roll out to full set of users (Monitor)',
    examples: [
      'Deploy to production',
      'Monitor server load and performance',
      'Track user acquisition and retention',
      'Respond to user feedback',
      'Plan future updates and features',
    ],
    score: 10,
    phase: 'live',
    icon: Rocket,
  },
];

export default function App() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
                Game Design Workflow
              </h1>
              <p className="text-xs sm:text-base text-gray-600">
                From Ideation to Live: A Complete Guide (0 → 10 with AI)
              </p>
            </div>
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5">
                Ideation
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                Design
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5">
                Dev
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
                Live
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Phase Headers */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Workflow Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              <div className="p-2 sm:p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">0-3</div>
                <div className="text-[10px] sm:text-xs text-purple-700 mt-0.5 sm:mt-1">Ideation</div>
              </div>
              <div className="p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">3-7</div>
                <div className="text-[10px] sm:text-xs text-blue-700 mt-0.5 sm:mt-1">Design</div>
              </div>
              <div className="p-2 sm:p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-xl sm:text-2xl font-bold text-orange-600">7-9</div>
                <div className="text-[10px] sm:text-xs text-orange-700 mt-0.5 sm:mt-1">Development</div>
              </div>
              <div className="p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-xl sm:text-2xl font-bold text-green-600">9-10</div>
                <div className="text-[10px] sm:text-xs text-green-700 mt-0.5 sm:mt-1">Live</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {workflowStages.map((stage, index) => (
            <WorkflowStage
              key={index}
              {...stage}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Key Takeaways</h3>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5 shrink-0">•</span>
              <span>Start with clear purpose and audience definition</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5 shrink-0">•</span>
              <span>Iterate quickly with AI-assisted prompting and Figma Make</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-0.5 shrink-0">•</span>
              <span>Collaborate with dev team for production-ready code</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5 shrink-0">•</span>
              <span>Test internally before full release and use analytics to improve</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}