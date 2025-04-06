
import React from 'react';
import DailyStoke from '@/components/insights/daily-stoke';
import { CardStack, CardStackHeading, CardStackContainer } from '@/components/ui/card-stack';
import InsightCard from '@/components/insights/insight-card';
import { insights, sources } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index: React.FC = () => {
  const fuzzyInsights = insights.filter(insight => insight.rating === 'fuzzy');
  
  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-6">
      <header className="mb-6">
        <h1 className="text-3xl font-serif font-bold">Stoke</h1>
        <p className="text-muted-foreground">Reconnect with what matters</p>
      </header>
      
      <ScrollArea className="h-[calc(100vh-180px)]">
        <DailyStoke />
        
        {fuzzyInsights.length > 0 && (
          <CardStack className="mb-8">
            <CardStackHeading>Continue Learning</CardStackHeading>
            <CardStackContainer>
              {fuzzyInsights.map(insight => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </CardStackContainer>
          </CardStack>
        )}
        
        <CardStack className="mb-8">
          <CardStackHeading>From Your Content</CardStackHeading>
          {sources.map(source => (
            <div key={source.id} className="mb-4">
              <h3 className="text-md font-medium mb-2">{source.title}</h3>
              <div className="bg-stoke-sand rounded-xl p-3 text-sm">
                <p className="line-clamp-2">{source.summary}</p>
              </div>
            </div>
          ))}
        </CardStack>
        
        <CardStack className="mb-8">
          <CardStackHeading>Explore by Topic</CardStackHeading>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-stoke-forest text-white p-4">
              <h3 className="font-serif text-lg">Creativity</h3>
              <p className="text-sm opacity-80">12 insights</p>
            </div>
            <div className="rounded-xl bg-stoke-bark text-white p-4">
              <h3 className="font-serif text-lg">Mindfulness</h3>
              <p className="text-sm opacity-80">8 insights</p>
            </div>
            <div className="rounded-xl bg-stoke-moss text-white p-4">
              <h3 className="font-serif text-lg">Leadership</h3>
              <p className="text-sm opacity-80">5 insights</p>
            </div>
            <div className="rounded-xl bg-stoke-clay text-white p-4">
              <h3 className="font-serif text-lg">Productivity</h3>
              <p className="text-sm opacity-80">3 insights</p>
            </div>
          </div>
        </CardStack>
      </ScrollArea>
    </div>
  );
};

export default Index;
