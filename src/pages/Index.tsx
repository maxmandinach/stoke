
import React from 'react';
import DailyStoke from '@/components/insights/daily-stoke';
import { CardStack, CardStackHeading, CardStackContainer } from '@/components/ui/card-stack';
import InsightCard from '@/components/insights/insight-card';
import { insights, sources } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell } from 'lucide-react';

const Index: React.FC = () => {
  const fuzzyInsights = insights.filter(insight => insight.rating === 'fuzzy');
  
  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-stoke-forest">Stoke</h1>
        <button className="p-2 rounded-full hover:bg-stoke-sand/50">
          <Bell className="text-stoke-forest h-6 w-6" />
        </button>
      </header>
      
      <ScrollArea className="h-[calc(100vh-180px)]">
        <DailyStoke />
        
        {fuzzyInsights.length > 0 && (
          <CardStack className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <CardStackHeading>Continue Learning</CardStackHeading>
              <a href="#" className="text-sm text-stoke-bark hover:text-stoke-bark/80">See all</a>
            </div>
            <CardStackContainer>
              {fuzzyInsights.map(insight => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </CardStackContainer>
          </CardStack>
        )}
        
        <CardStack className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <CardStackHeading>From Your Content</CardStackHeading>
            <a href="#" className="text-sm text-stoke-bark hover:text-stoke-bark/80">See all</a>
          </div>
          {sources.map(source => (
            <div key={source.id} className="mb-4 p-4 rounded-xl border border-stoke-forest/10 bg-white hover:bg-stoke-sand/30 transition-colors cursor-pointer">
              <h3 className="text-md font-medium text-stoke-forest mb-1">{source.title}</h3>
              <p className="text-sm text-stoke-forest/80 line-clamp-2">{source.summary}</p>
            </div>
          ))}
        </CardStack>
        
        <CardStack className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <CardStackHeading>Explore by Topic</CardStackHeading>
            <a href="#" className="text-sm text-stoke-bark hover:text-stoke-bark/80">See all</a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gradient-to-br from-stoke-forest to-stoke-forest/90 text-white p-4 cursor-pointer hover:shadow-md transition-shadow">
              <h3 className="font-serif text-lg">Creativity</h3>
              <p className="text-sm opacity-80">12 insights</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-stoke-bark to-stoke-bark/90 text-white p-4 cursor-pointer hover:shadow-md transition-shadow">
              <h3 className="font-serif text-lg">Mindfulness</h3>
              <p className="text-sm opacity-80">8 insights</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-stoke-moss to-stoke-moss/90 text-white p-4 cursor-pointer hover:shadow-md transition-shadow">
              <h3 className="font-serif text-lg">Leadership</h3>
              <p className="text-sm opacity-80">5 insights</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-stoke-clay to-stoke-clay/90 text-white p-4 cursor-pointer hover:shadow-md transition-shadow">
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
