
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { InsightCard as InsightCardType } from '@/lib/data';
import { Flame, Leaf, ThermometerSnowflake } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

interface InsightCardProps {
  insight: InsightCardType;
  onRate?: (rating: 'stoke' | 'got-it' | 'fuzzy') => void;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight, onRate }) => {
  const [revealed, setRevealed] = useState(insight.type !== 'qa');
  const [rating, setRating] = useState<'stoke' | 'got-it' | 'fuzzy' | null>(insight.rating || null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleReveal = () => {
    if (insight.type === 'qa' && !revealed) {
      setRevealed(true);
    } else {
      setDialogOpen(true);
    }
  };

  const handleRate = (newRating: 'stoke' | 'got-it' | 'fuzzy') => {
    setRating(newRating);
    if (onRate) {
      onRate(newRating);
    }
  };

  // Determine card background based on type
  const getCardBackground = () => {
    if (!revealed) return 'bg-stoke-sand hover:bg-stoke-sand/80';
    
    switch (insight.type) {
      case 'qa':
        return 'bg-gradient-to-br from-white to-stoke-sand/50';
      case 'full-insight':
        return 'bg-gradient-to-br from-white to-stoke-fog';
      case 'supplementary':
        return 'bg-gradient-to-br from-white to-stoke-moss/10';
      default:
        return 'bg-white';
    }
  };

  return (
    <>
      <Card 
        className={`stoke-card cursor-pointer hover:shadow-lg transition-shadow rounded-xl ${getCardBackground()}`} 
        onClick={handleReveal}
      >
        <CardContent className="p-4">
          {insight.type === 'qa' ? (
            <div>
              <h3 className="font-serif text-lg font-medium text-stoke-forest">{insight.question}</h3>
              
              {revealed && (
                <div className="mt-3 animate-fade-in">
                  <p className="text-stoke-forest">{insight.answer}</p>
                  {insight.quote && (
                    <blockquote className="pl-3 mt-3 border-l-2 border-stoke-moss text-stoke-forest/80 italic">
                      "{insight.quote}"
                    </blockquote>
                  )}
                </div>
              )}
            </div>
          ) : insight.type === 'full-insight' ? (
            <blockquote className="font-serif text-lg text-stoke-forest">
              "{insight.content}"
            </blockquote>
          ) : (
            // Supplementary insight
            <div>
              <div className="inline-block px-2 py-0.5 text-xs bg-stoke-moss/20 text-stoke-forest rounded-full mb-2">
                Supplementary
              </div>
              <h3 className="font-serif text-lg font-medium text-stoke-forest">{insight.question}</h3>
              {revealed && (
                <p className="mt-2 text-stoke-forest">{insight.answer}</p>
              )}
            </div>
          )}
        </CardContent>
        
        {revealed && (
          <CardFooter className="p-3 bg-gradient-to-r from-stoke-sand/30 to-stoke-fog/30 flex justify-between items-center rounded-b-xl">
            <div className="flex space-x-2">
              <button 
                className={`btn-stoke-rating ${rating === 'stoke' ? 'bg-stoke-bark text-white' : 'bg-white hover:bg-stoke-bark/20'}`}
                onClick={(e) => { e.stopPropagation(); handleRate('stoke'); }}
              >
                <Flame size={16} /> Stoke It
              </button>
              <button 
                className={`btn-stoke-rating ${rating === 'got-it' ? 'bg-stoke-moss text-white' : 'bg-white hover:bg-stoke-moss/20'}`}
                onClick={(e) => { e.stopPropagation(); handleRate('got-it'); }}
              >
                <Leaf size={16} /> Got It
              </button>
              <button 
                className={`btn-stoke-rating ${rating === 'fuzzy' ? 'bg-stoke-clay text-white' : 'bg-white hover:bg-stoke-clay/20'}`}
                onClick={(e) => { e.stopPropagation(); handleRate('fuzzy'); }}
              >
                <ThermometerSnowflake size={16} /> Still Fuzzy
              </button>
            </div>
          </CardFooter>
        )}
      </Card>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <h2 className="text-xl font-serif font-medium text-stoke-forest">
              {insight.type === 'qa' ? insight.question : 'Insight'}
            </h2>
          </DialogHeader>
          
          <div className="py-4">
            {insight.type === 'qa' ? (
              <>
                <p className="text-stoke-forest mb-3">{insight.answer}</p>
                {insight.quote && (
                  <blockquote className="pl-3 border-l-2 border-stoke-moss text-stoke-forest/80 italic">
                    "{insight.quote}"
                  </blockquote>
                )}
              </>
            ) : (
              <blockquote className="text-lg font-serif text-stoke-forest">
                "{insight.content}"
              </blockquote>
            )}
          </div>
          
          <div className="flex justify-center gap-2 pt-2">
            <button 
              className={`btn-stoke-rating ${rating === 'stoke' ? 'bg-stoke-bark text-white' : 'bg-white hover:bg-stoke-bark/20'}`}
              onClick={() => handleRate('stoke')}
            >
              <Flame size={16} /> Stoke It
            </button>
            <button 
              className={`btn-stoke-rating ${rating === 'got-it' ? 'bg-stoke-moss text-white' : 'bg-white hover:bg-stoke-moss/20'}`}
              onClick={() => handleRate('got-it')}
            >
              <Leaf size={16} /> Got It
            </button>
            <button 
              className={`btn-stoke-rating ${rating === 'fuzzy' ? 'bg-stoke-clay text-white' : 'bg-white hover:bg-stoke-clay/20'}`}
              onClick={() => handleRate('fuzzy')}
            >
              <ThermometerSnowflake size={16} /> Still Fuzzy
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InsightCard;
