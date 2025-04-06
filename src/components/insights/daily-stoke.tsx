
import React, { useState } from 'react';
import { getTodaysStoke, InsightCard } from '@/lib/data';
import { CardStack, CardStackHeading, CardStackContainer } from '@/components/ui/card-stack';
import InsightCardComponent from '@/components/insights/insight-card';
import { Button } from '@/components/ui/button';
import { Check, MoreHorizontal } from 'lucide-react';

const DailyStoke: React.FC = () => {
  const [insights, setInsights] = useState<InsightCard[]>(getTodaysStoke());
  const [completed, setCompleted] = useState<boolean>(false);
  const [showExtra, setShowExtra] = useState<boolean>(false);
  
  const handleRating = (id: string, rating: 'stoke' | 'got-it' | 'fuzzy') => {
    setInsights(prev => prev.map(insight => 
      insight.id === id ? { ...insight, rating } : insight
    ));
    
    // Check if all insights have been rated
    const allRated = insights.every(insight => 
      insight.id === id ? true : insight.rating !== null
    );
    
    if (allRated) {
      setCompleted(true);
    }
  };
  
  return (
    <CardStack className="mb-8">
      <CardStackHeading>Today's Stoke</CardStackHeading>
      
      <CardStackContainer>
        {insights.map((insight) => (
          <InsightCardComponent 
            key={insight.id}
            insight={insight}
            onRate={(rating) => handleRating(insight.id, rating)}
          />
        ))}
      </CardStackContainer>
      
      {completed && !showExtra && (
        <div className="flex flex-col items-center py-4 animate-fade-in">
          <div className="h-12 w-12 rounded-full bg-stoke-moss/20 flex items-center justify-center mb-3">
            <Check className="h-6 w-6 text-stoke-moss" />
          </div>
          <p className="text-lg font-serif text-center mb-4">
            Great reflection! You've completed today's stoke.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setShowExtra(true)}
            className="flex items-center gap-2"
          >
            <MoreHorizontal size={16} /> Get Extra Stoke
          </Button>
        </div>
      )}
      
      {showExtra && (
        <div className="mt-6 animate-slide-up">
          <CardStackHeading>Extra Stoke</CardStackHeading>
          <CardStackContainer>
            {/* In a real app, these would be additional curated insights */}
            <InsightCardComponent 
              insight={{
                id: 'extra-1',
                type: 'qa',
                question: 'How does spacing out learning over time improve retention?',
                answer: 'Spaced repetition leverages the psychological spacing effect, where information is better retained when reviewed at increasing intervals, allowing the brain to strengthen neural connections each time.',
                quote: 'Studies show that spaced learning can improve long-term retention by 200% compared to cramming, as it forces the brain to retrieve information repeatedly from long-term memory.',
                sourceId: 'source-2',
                stackIds: ['stack-2'],
              }}
              onRate={() => {}}
            />
          </CardStackContainer>
        </div>
      )}
    </CardStack>
  );
};

export default DailyStoke;
