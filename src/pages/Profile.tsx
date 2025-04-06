
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell, Flame, Download, Trash2, Moon } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-6">
      <header className="mb-6">
        <h1 className="text-3xl font-serif font-bold">Profile</h1>
        <p className="text-muted-foreground">Your preferences</p>
      </header>
      
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-serif font-medium mb-4">Daily Stoke</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="daily-cards" className="text-base font-medium">Cards per day</Label>
                  <p className="text-sm text-muted-foreground">How many insights to show</p>
                </div>
                <div className="w-32">
                  <Slider defaultValue={[4]} min={2} max={8} step={1} />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>2</span>
                    <span>5</span>
                    <span>8</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reminderTime" className="text-base font-medium">Reminder time</Label>
                  <p className="text-sm text-muted-foreground">When to notify you</p>
                </div>
                <select className="bg-background border border-input rounded-md text-sm px-3 py-1.5">
                  <option value="morning">Morning (8am)</option>
                  <option value="afternoon">Afternoon (2pm)</option>
                  <option value="evening">Evening (7pm)</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekends" className="text-base font-medium">Weekend cards</Label>
                  <p className="text-sm text-muted-foreground">Send stokes on weekends</p>
                </div>
                <Switch id="weekends" />
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-serif font-medium mb-4">Notifications</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-stoke-forest/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-stoke-forest" />
                  </div>
                  <div>
                    <h3 className="font-medium">Daily reminder</h3>
                    <p className="text-sm text-muted-foreground">Nudge to check your stoke</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-stoke-forest/10 flex items-center justify-center">
                    <Flame className="h-5 w-5 text-stoke-forest" />
                  </div>
                  <div>
                    <h3 className="font-medium">Insight highlights</h3>
                    <p className="text-sm text-muted-foreground">Weekly digest of top insights</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-serif font-medium mb-4">Appearance</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-stoke-forest/10 flex items-center justify-center">
                    <Moon className="h-5 w-5 text-stoke-forest" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dark mode</h3>
                    <p className="text-sm text-muted-foreground">Use dark theme</p>
                  </div>
                </div>
                <Switch />
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-serif font-medium mb-4">Data</h2>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full flex items-center gap-2 justify-center">
                <Download className="h-4 w-4" />
                Export your data
              </Button>
              
              <Button variant="outline" className="w-full flex items-center gap-2 justify-center text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                Reset all data
              </Button>
            </div>
          </section>
          
          <div className="py-4 text-center">
            <p className="text-sm text-muted-foreground">Stoke v1.0.0</p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Profile;
