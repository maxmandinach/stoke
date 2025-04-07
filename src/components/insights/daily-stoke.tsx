
import React, { useState } from 'react';
import { getTodaysStoke, InsightCard } from '@/lib/data';
import { CardStack, CardStackHeading, CardStackContainer } from '@/components/ui/card-stack';
import InsightCardComponent from '@/components/insights/insight-card';
import { Button } from '@/components/ui/button';
import { Check, MoreHorizontal, Flame, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

const DailyStoke: React.FC = () => {
  const [insights] = useState<InsightCard[]>(getTodaysStoke());
  const [currentIndex, setCurrentIndex] = useState<number>(-1); // -1 means no card selected yet
  const [completed, setCompleted] = useState<boolean>(false);
  const [showExtra, setShowExtra] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<InsightCard | null>(null);
  
  const handleSelectInsight = (insight: InsightCard, index: number) => {
    setSelectedInsight(insight);
    setCurrentIndex(index);
    setDialogOpen(true);
  };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
    
    // Check if this was the last insight
    if (currentIndex === insights.length - 1 && !completed) {
      setCompleted(true);
    }
  };
  
  const handleRating = (rating: 'stoke' | 'got-it' | 'fuzzy') => {
    if (selectedInsight) {
      // Update the rating in our local state
      const updatedInsight = { ...selectedInsight, rating };
      setSelectedInsight(updatedInsight);
    }
  };
  
  // Calculate progress percentage
  const progressPercentage = currentIndex >= 0 
    ? Math.min(((currentIndex + 1) / insights.length) * 100, 100) 
    : 0;

  // Define insight tiles based on the mockup
  const insightTiles = [
    { 
      text: "From your most recent content...",
      insight: insights[0],
      index: 0
    },
    { 
      text: "Something you starred last week...",
      insight: insights[1],
      index: 1
    },
    { 
      text: "Still fuzzy on this one...",
      insight: insights[2],
      index: 2
    },
    { 
      text: "A summary from Santi Ruiz on storytelling",
      insight: insights[3],
      index: 3
    }
  ];
  
  return (
    <div className="rounded-2xl border border-stoke-forest/20 bg-gradient-to-br from-stoke-sand to-stoke-fog p-5 mb-8">
      <div className="flex items-center gap-3 mb-2">
        <Flame className="text-stoke-bark h-6 w-6" />
        <h2 className="text-xl font-serif font-medium text-stoke-forest">Today's Stoke</h2>
      </div>
      
      <p className="text-stoke-moss mb-5">Insights to spark your learning</p>
      
      {completed ? (
        <div className="flex flex-col items-center py-4 animate-fade-in">
          <div className="h-12 w-12 rounded-full bg-stoke-moss/20 flex items-center justify-center mb-3">
            <Check className="h-6 w-6 text-stoke-moss" />
          </div>
          <p className="text-lg font-serif text-center mb-4">
            Great reflection! You've completed today's stoke.
          </p>
          {!showExtra && (
            <Button 
              variant="outline" 
              onClick={() => setShowExtra(true)}
              className="flex items-center gap-2 border-stoke-moss text-stoke-moss hover:bg-stoke-moss/10"
            >
              <MoreHorizontal size={16} /> Get Extra Stoke
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {progressPercentage > 0 && (
            <div className="mb-1">
              <Progress value={progressPercentage} className="h-2 bg-stoke-sand" />
            </div>
          )}
          
          {insightTiles.map((tile, idx) => (
            <button 
              key={idx}
              onClick={() => handleSelectInsight(tile.insight, tile.index)}
              className="w-full text-left p-4 rounded-xl border border-stoke-forest/20 bg-white hover:bg-stoke-sand/50 transition-colors flex justify-between items-center"
            >
              <span className="font-medium text-stoke-forest">{tile.text}</span>
              <ArrowRight className="h-4 w-4 text-stoke-bark" />
            </button>
          ))}
        </div>
      )}
      
      {showExtra && (
        <div className="mt-6 animate-slide-up">
          <h3 className="text-lg font-serif mb-3">Extra Stoke</h3>
          <button 
            onClick={() => handleSelectInsight(insights[0], 0)}
            className="w-full text-left p-4 rounded-xl border border-stoke-forest/20 bg-white hover:bg-stoke-sand/50 transition-colors flex justify-between items-center"
          >
            <span className="font-medium text-stoke-forest">One more insight about creativity...</span>
            <ArrowRight className="h-4 w-4 text-stoke-bark" />
          </button>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) handleDialogClose();
      }}>
        <DialogContent className="max-w-lg">
          {selectedInsight && (
            <>
              <DialogHeader>
                <h2 className="text-xl font-serif font-medium">
                  {selectedInsight.type === 'qa' ? selectedInsight.question : 'Insight'}
                </h2>
              </DialogHeader>
              
              <div className="py-4">
                {selectedInsight.type === 'qa' ? (
                  <>
                    <p className="text-foreground mb-3">{selectedInsight.answer}</p>
                    {selectedInsight.quote && (
                      <blockquote className="pl-3 border-l-2 border-stoke-moss text-muted-foreground italic">
                        "{selectedInsight.quote}"
                      </blockquote>
                    )}
                  </>
                ) : (
                  <blockquote className="text-lg font-serif">
                    "{selectedInsight.content}"
                  </blockquote>
                )}
              </div>
              
              <div className="flex justify-center gap-2 pt-2">
                <button 
                  className={`btn-stoke-rating ${selectedInsight.rating === 'stoke' ? 'bg-stoke-bark text-white' : 'bg-muted hover:bg-stoke-bark/20'}`}
                  onClick={() => handleRating('stoke')}
                >
                  <Flame size={16} /> Stoke It
                </button>
                <button 
                  className={`btn-stoke-rating ${selectedInsight.rating === 'got-it' ? 'bg-stoke-moss text-white' : 'bg-muted hover:bg-stoke-moss/20'}`}
                  onClick={() => handleRating('got-it')}
                >
                  <Check size={16} /> Got It
                </button>
                <button 
                  className={`btn-stoke-rating ${selectedInsight.rating === 'fuzzy' ? 'bg-stoke-clay text-white' : 'bg-muted hover:bg-stoke-clay/20'}`}
                  onClick={() => handleRating('fuzzy')}
                >
                  <MoreHorizontal size={16} /> Still Fuzzy
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DailyStoke;
