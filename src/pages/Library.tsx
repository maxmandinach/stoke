
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sources, getInsightsBySource } from '@/lib/data';
import { Calendar, BookOpen, Podcast, Video } from 'lucide-react';

const Library: React.FC = () => {
  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-6">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold">Library</h1>
          <p className="text-muted-foreground">Your content collection</p>
        </div>
      </header>
      
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="space-y-4">
          {sources.map(source => {
            const insights = getInsightsBySource(source.id);
            
            const SourceIcon = source.type === 'podcast' 
              ? Podcast 
              : source.type === 'article' 
                ? BookOpen 
                : Video;
                
            return (
              <div key={source.id} className="stoke-card">
                <div className="flex items-start p-4">
                  <div className="h-10 w-10 rounded-lg bg-stoke-forest/10 flex items-center justify-center mr-4">
                    <SourceIcon className="text-stoke-forest" size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium leading-tight">{source.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{source.creator}</p>
                    
                    <div className="flex items-center mt-2 gap-3">
                      <span className="text-xs flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(source.date).toLocaleDateString('en-US', {
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      
                      <span className="text-xs bg-stoke-sand px-2 py-0.5 rounded-full">
                        {insights.length} insights
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {source.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Library;
