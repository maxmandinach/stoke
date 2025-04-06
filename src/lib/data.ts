
export type CardType = 'qa' | 'full-insight' | 'supplementary';

export type InsightCard = {
  id: string;
  type: CardType;
  question?: string;
  answer?: string;
  quote?: string;
  content?: string;
  supplementary?: boolean;
  sourceId: string;
  stackIds: string[];
  rating?: 'stoke' | 'got-it' | 'fuzzy' | null;
};

export type ContentSource = {
  id: string;
  title: string;
  creator: string;
  type: 'podcast' | 'article' | 'video';
  image?: string;
  date: string;
  summary: string;
  takeaways: string[];
  stackIds: string[];
};

export type Stack = {
  id: string;
  title: string;
  description: string;
  color: string;
};

// Mock Stacks
export const stacks: Stack[] = [
  {
    id: 'stack-1',
    title: 'Creativity',
    description: 'Insights about creative processes and innovation',
    color: 'bg-stoke-moss',
  },
  {
    id: 'stack-2',
    title: 'Mindfulness',
    description: 'Reflections on presence and awareness',
    color: 'bg-stoke-forest',
  },
  {
    id: 'stack-3',
    title: 'Leadership',
    description: 'Thoughts on effective leadership',
    color: 'bg-stoke-bark',
  },
];

// Mock Content Sources
export const sources: ContentSource[] = [
  {
    id: 'source-1',
    title: 'The Power of Constraints in Creative Work',
    creator: 'Design Matters with Debbie Millman',
    type: 'podcast',
    date: '2025-03-15',
    summary: 'A discussion on how limitations can spark creativity and lead to innovative solutions.',
    takeaways: [
      'Constraints force us to think differently',
      'Creative boundaries remove decision fatigue',
      'Working within limits often produces better results than complete freedom'
    ],
    stackIds: ['stack-1'],
  },
  {
    id: 'source-2',
    title: 'The Science of Mindful Attention',
    creator: 'Ten Percent Happier',
    type: 'podcast',
    date: '2025-03-10',
    summary: 'An exploration of how mindfulness practices affect our attention and focus.',
    takeaways: [
      'Regular mindfulness practice physically changes the brain',
      'Even 5-minute sessions can improve attention',
      'Mindfulness combats the default mode of mind-wandering'
    ],
    stackIds: ['stack-2'],
  },
  {
    id: 'source-3',
    title: 'Leading Through Uncertainty',
    creator: 'Harvard Business Review',
    type: 'article',
    date: '2025-03-01',
    summary: 'Strategies for leaders navigating complex, ambiguous situations in the modern workplace.',
    takeaways: [
      'Effective leaders communicate clearly about what is known and unknown',
      'Decision frameworks help teams navigate uncertainty',
      'Psychological safety is crucial during unpredictable times'
    ],
    stackIds: ['stack-3'],
  },
];

// Mock Insights
export const insights: InsightCard[] = [
  {
    id: 'insight-1',
    type: 'qa',
    question: 'How do constraints enhance creativity?',
    answer: 'Constraints enhance creativity by forcing our brains to find novel pathways and solutions within defined boundaries, leading to more innovative and focused outcomes.',
    quote: 'When faced with constraints, the creative mind actually works harder to find unique solutions that wouldn\'t emerge in conditions of complete freedom.',
    sourceId: 'source-1',
    stackIds: ['stack-1'],
  },
  {
    id: 'insight-2',
    type: 'full-insight',
    content: 'The most creative people I know don't start with a blank canvas—they start with a specific problem to solve or a constraint to work within. That's what gives their work purpose and direction.',
    sourceId: 'source-1',
    stackIds: ['stack-1'],
  },
  {
    id: 'insight-3',
    type: 'qa',
    question: 'What happens in the brain during mindfulness practice?',
    answer: 'During mindfulness practice, the prefrontal cortex strengthens while the amygdala (fear center) shows decreased activity, resulting in improved executive function and emotional regulation.',
    quote: 'The neuroimaging studies clearly show that regular meditators have physically different brains, with more gray matter in regions associated with attention and sensory processing.',
    sourceId: 'source-2',
    stackIds: ['stack-2'],
  },
  {
    id: 'insight-4',
    type: 'qa',
    question: 'How should leaders communicate during uncertain times?',
    answer: 'Leaders should balance transparency about unknowns with confident clarity about the values and principles guiding decisions, creating psychological safety while maintaining direction.',
    quote: 'The most trusted leaders in our study didn\'t pretend to have all the answers. Instead, they clearly distinguished between what was known, what was unknown, and the principles they would use to navigate forward.',
    sourceId: 'source-3',
    stackIds: ['stack-3'],
  },
  {
    id: 'insight-5',
    type: 'supplementary',
    question: 'What is psychological safety?',
    answer: 'Psychological safety is a shared belief that the team is safe for interpersonal risk-taking. It allows people to speak up, share ideas, and admit mistakes without fear of punishment or embarrassment.',
    supplementary: true,
    sourceId: 'source-3',
    stackIds: ['stack-3'],
  },
  {
    id: 'insight-6',
    type: 'full-insight',
    content: 'Even five minutes of focused attention practice each day can start to rewire your neural pathways. Consistency matters more than duration when building mindfulness habits.',
    sourceId: 'source-2',
    stackIds: ['stack-2'],
  },
  {
    id: 'insight-7',
    type: 'qa',
    question: 'What is decision fatigue?',
    answer: 'Decision fatigue is the deteriorating quality of decisions after a long session of decision making. Having a framework of constraints reduces the mental load of constant decision-making.',
    quote: 'When we eliminate some options through constraints, we preserve our cognitive resources for the decisions that truly matter within those boundaries.',
    supplementary: true,
    sourceId: 'source-1',
    stackIds: ['stack-1'],
  },
];

// Today's stoke selection (4 curated cards)
export const getTodaysStoke = (): InsightCard[] => {
  // In a real app, this would use an algorithm to select insights
  // For now, we'll just return a fixed set
  return [insights[0], insights[3], insights[5], insights[1]];
};

// Get insights by source
export const getInsightsBySource = (sourceId: string): InsightCard[] => {
  return insights.filter(insight => insight.sourceId === sourceId);
};

// Get insights by stack
export const getInsightsByStack = (stackId: string): InsightCard[] => {
  return insights.filter(insight => insight.stackIds.includes(stackId));
};

// Get a source by ID
export const getSourceById = (sourceId: string): ContentSource | undefined => {
  return sources.find(source => source.id === sourceId);
};

// Get a stack by ID
export const getStackById = (stackId: string): Stack | undefined => {
  return stacks.find(stack => stack.id === stackId);
};
