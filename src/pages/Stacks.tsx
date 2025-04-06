
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { stacks, getInsightsByStack } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InsightCard from '@/components/insights/insight-card';

const Stacks: React.FC = () => {
  const [activeStack, setActiveStack] = useState(stacks[0]?.id || '');

  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-6">
      <header className="mb-6">
        <h1 className="text-3xl font-serif font-bold">Stacks</h1>
        <p className="text-muted-foreground">Thematic insight journeys</p>
      </header>

      <Tabs 
        value={activeStack} 
        onValueChange={setActiveStack}
        className="w-full"
      >
        <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap">
          {stacks.map(stack => (
            <TabsTrigger 
              key={stack.id} 
              value={stack.id}
              className="whitespace-nowrap"
            >
              {stack.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {stacks.map(stack => {
          const stackInsights = getInsightsByStack(stack.id);
          
          return (
            <TabsContent key={stack.id} value={stack.id} className="mt-0">
              <div className={`p-4 rounded-lg mb-4 ${stack.color} text-white`}>
                <h2 className="text-xl font-serif">{stack.title}</h2>
                <p className="opacity-90 text-sm">{stack.description}</p>
              </div>
              
              <ScrollArea className="h-[calc(100vh-260px)]">
                <div className="space-y-4">
                  {stackInsights.map(insight => (
                    <InsightCard
                      key={insight.id}
                      insight={insight}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Stacks;
