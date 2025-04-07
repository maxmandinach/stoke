
import React, { useState } from 'react';
import { getTodaysStoke, InsightCard } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Check, MoreHorizontal, Flame, ArrowRight, Leaf, ThermometerSnowflake } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

const DailyStoke: React.FC = () => {
  const [insights] = useState<InsightCard[]>(getTodaysStoke());
  const [currentIndex, setCurrentIndex] = useState<number>(-1); // -1 means no card selected yet
  const [currentSessionType, setCurrentSessionType] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);
  const [showExtra, setShowExtra] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<InsightCard | null>(null);
  const [revealAnswer, setRevealAnswer] = useState<boolean>(false);
  const [completedPills, setCompletedPills] = useState<string[]>([]);
  
  // Define insight tiles based on the mockup
  const insightTiles = [
    { 
      id: 'recent-content',
      text: "From your most recent content...",
      insight: insights[0],
      index: 0,
      multiCard: true,
      cardCount: 3
    },
    { 
      id: 'starred',
      text: "Something you starred last week...",
      insight: insights[1],
      index: 1,
      multiCard: false
    },
    { 
      id: 'fuzzy',
      text: "Still fuzzy on this one...",
      insight: insights[2],
      index: 2,
      multiCard: false
    },
    { 
      id: 'summary',
      text: "A summary from Santi Ruiz on storytelling",
      insight: insights[3],
      index: 3,
      multiCard: false,
      isSummary: true
    }
  ];
  
  const handleSelectInsight = (tile, forceReveal = false) => {
    setSelectedInsight(tile.insight);
    setCurrentIndex(tile.index);
    setCurrentSessionType(tile.id);
    setDialogOpen(true);
    setRevealAnswer(forceReveal || tile.isSummary || tile.insight.type !== 'qa');
  };
  
  const handleRevealAnswer = () => {
    setRevealAnswer(true);
  };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
    setRevealAnswer(false);
    
    // Add completed pill to list if it's not a multi-card session or if it's the end of one
    if (!insightTiles.find(t => t.id === currentSessionType)?.multiCard || 
        currentIndex === insightTiles.find(t => t.id === currentSessionType)?.index + (insightTiles.find(t => t.id === currentSessionType)?.cardCount || 0) - 1) {
      if (currentSessionType && !completedPills.includes(currentSessionType)) {
        setCompletedPills([...completedPills, currentSessionType]);
      }
    }
  };
  
  const handleRating = (rating: 'stoke' | 'got-it' | 'fuzzy') => {
    if (selectedInsight) {
      // Update the rating in our local state
      const updatedInsight = { ...selectedInsight, rating };
      setSelectedInsight(updatedInsight);
      
      // Check if we need to move to the next card in a multi-card session
      const currentTile = insightTiles.find(t => t.id === currentSessionType);
      if (currentTile?.multiCard) {
        const nextIndex = currentIndex + 1;
        const maxIndex = currentTile.index + (currentTile.cardCount || 1) - 1;
        
        if (nextIndex <= maxIndex) {
          // Move to next card in sequence
          setTimeout(() => {
            setDialogOpen(false);
            setRevealAnswer(false);
            const nextInsight = insights[nextIndex];
            setTimeout(() => {
              setSelectedInsight(nextInsight);
              setCurrentIndex(nextIndex);
              setDialogOpen(true);
            }, 300);
          }, 500);
        } else {
          // End of multi-card session
          setDialogOpen(false);
          setRevealAnswer(false);
          
          // Mark this pill as complete
          if (currentSessionType && !completedPills.includes(currentSessionType)) {
            setCompletedPills([...completedPills, currentSessionType]);
          }
        }
      } else {
        // Single card session - just close
        setDialogOpen(false);
        setRevealAnswer(false);
        
        // Mark this pill as complete
        if (currentSessionType && !completedPills.includes(currentSessionType)) {
          setCompletedPills([...completedPills, currentSessionType]);
        }
      }
    }
    
    // Check if all pills are completed
    if (completedPills.length + 1 >= insightTiles.length) {
      setCompleted(true);
    }
  };
  
  // Calculate progress percentage based on completed pills
  const progressPercentage = completedPills.length > 0 
    ? (completedPills.length / insightTiles.length) * 100
    : 0;

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
            You're all caught up for today!
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
              onClick={() => handleSelectInsight(tile)}
              className={`w-full text-left p-4 rounded-xl border border-stoke-forest/20 
                          ${completedPills.includes(tile.id) ? 'bg-stoke-fog/50 text-stoke-forest/60' : 'bg-white hover:bg-stoke-sand/50'} 
                          transition-colors flex justify-between items-center
                          ${completedPills.includes(tile.id) ? 'opacity-70' : 'opacity-100'}`}
              disabled={completedPills.includes(tile.id)}
            >
              <span className="font-medium text-stoke-forest">
                {completedPills.includes(tile.id) ? (
                  <span className="flex items-center gap-2">
                    <Check size={16} className="text-stoke-moss" />
                    {tile.text}
                  </span>
                ) : (
                  tile.text
                )}
              </span>
              {!completedPills.includes(tile.id) && (
                <ArrowRight className="h-4 w-4 text-stoke-bark" />
              )}
            </button>
          ))}
        </div>
      )}
      
      {showExtra && (
        <div className="mt-6 animate-slide-up">
          <h3 className="text-lg font-serif mb-3">Extra Stoke</h3>
          <button 
            onClick={() => handleSelectInsight({
              id: 'extra',
              text: "One more insight about creativity...",
              insight: insights[0],
              index: 0,
              multiCard: false
            }, true)}
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
                  {selectedInsight.type === 'qa' ? selectedInsight.question : (
                    selectedInsight.type === 'supplementary' ? 'Supplementary Insight' : 'Insight'
                  )}
                </h2>
              </DialogHeader>
              
              <div className="py-4">
                {selectedInsight.type === 'qa' ? (
                  <>
                    {revealAnswer ? (
                      <div className="animate-fade-in">
                        <p className="text-foreground mb-3">{selectedInsight.answer}</p>
                        {selectedInsight.quote && (
                          <blockquote className="pl-3 border-l-2 border-stoke-moss text-muted-foreground italic">
                            "{selectedInsight.quote}"
                          </blockquote>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-6">
                        <p className="text-muted-foreground mb-4">Tap to reveal the answer</p>
                        <Button onClick={handleRevealAnswer}>
                          Reveal Answer
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <blockquote className="text-lg font-serif">
                    "{selectedInsight.content || selectedInsight.answer}"
                  </blockquote>
                )}
              </div>
              
              {/* Don't show rating buttons for summary cards */}
              {(!insightTiles.find(t => t.id === currentSessionType)?.isSummary && revealAnswer) && (
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
                    <Leaf size={16} /> Got It
                  </button>
                  <button 
                    className={`btn-stoke-rating ${selectedInsight.rating === 'fuzzy' ? 'bg-stoke-clay text-white' : 'bg-muted hover:bg-stoke-clay/20'}`}
                    onClick={() => handleRating('fuzzy')}
                  >
                    <ThermometerSnowflake size={16} /> Still Fuzzy
                  </button>
                </div>
              )}

              {/* For summary cards, just show a close button */}
              {insightTiles.find(t => t.id === currentSessionType)?.isSummary && (
                <div className="flex justify-center pt-4">
                  <Button onClick={() => {
                    setDialogOpen(false);
                    if (currentSessionType && !completedPills.includes(currentSessionType)) {
                      setCompletedPills([...completedPills, currentSessionType]);
                    }
                  }}>
                    Close
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DailyStoke;
