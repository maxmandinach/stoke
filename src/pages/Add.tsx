
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Link, Podcast, Video, BookOpen, BookText, FileText } from 'lucide-react';

const Add: React.FC = () => {
  return (
    <div className="container max-w-md mx-auto px-4 pb-20 pt-6">
      <header className="mb-6">
        <h1 className="text-3xl font-serif font-bold">Add</h1>
        <p className="text-muted-foreground">Bring in new content & insights</p>
      </header>
      
      <Tabs defaultValue="link" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="link">Link</TabsTrigger>
          <TabsTrigger value="insight">Insight</TabsTrigger>
          <TabsTrigger value="spark">Spark</TabsTrigger>
          <TabsTrigger value="source">Source</TabsTrigger>
        </TabsList>
        
        <TabsContent value="link" className="mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="link">Paste URL</Label>
              <div className="flex mt-1.5">
                <Input id="link" placeholder="https://..." />
                <Button className="ml-2">Add</Button>
              </div>
            </div>
            
            <div className="border border-border rounded-lg p-3">
              <p className="text-sm text-muted-foreground mb-3">
                Supported content types:
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center p-3 bg-stoke-sand rounded-lg">
                  <Podcast className="h-5 w-5 mb-1" />
                  <span className="text-xs">Podcasts</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-stoke-sand rounded-lg">
                  <BookOpen className="h-5 w-5 mb-1" />
                  <span className="text-xs">Articles</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-stoke-sand rounded-lg">
                  <Video className="h-5 w-5 mb-1" />
                  <span className="text-xs">Videos</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="insight" className="mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="insightType">Insight Type</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                <div className="border border-border hover:border-primary rounded-lg p-3 cursor-pointer transition-colors flex items-center gap-2">
                  <BookText size={18} />
                  <span>Full Insight</span>
                </div>
                <div className="border border-border hover:border-primary rounded-lg p-3 cursor-pointer transition-colors flex items-center gap-2">
                  <FileText size={18} />
                  <span>Q&A Format</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" placeholder="Write your insight..." className="mt-1.5" rows={5} />
            </div>
            
            <div>
              <Label htmlFor="source">Source</Label>
              <Input id="source" placeholder="Where is this from?" className="mt-1.5" />
            </div>
            
            <div className="pt-2">
              <Button className="w-full">Save Insight</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="spark" className="mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="spark">Reflection or Question</Label>
              <Textarea id="spark" placeholder="What's on your mind?" className="mt-1.5" rows={5} />
            </div>
            
            <div>
              <Label htmlFor="tags">Related Topics</Label>
              <Input id="tags" placeholder="Leadership, Creativity, etc" className="mt-1.5" />
            </div>
            
            <div className="pt-2">
              <Button className="w-full">Save Spark</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="source" className="mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="sourceType">Source Type</Label>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                <div className="border border-border hover:border-primary rounded-lg p-2 cursor-pointer transition-colors flex flex-col items-center gap-1">
                  <Podcast size={18} />
                  <span className="text-xs">Podcast</span>
                </div>
                <div className="border border-border hover:border-primary rounded-lg p-2 cursor-pointer transition-colors flex flex-col items-center gap-1">
                  <BookOpen size={18} />
                  <span className="text-xs">Article</span>
                </div>
                <div className="border border-border hover:border-primary rounded-lg p-2 cursor-pointer transition-colors flex flex-col items-center gap-1">
                  <Video size={18} />
                  <span className="text-xs">Video</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Title of content" className="mt-1.5" />
            </div>
            
            <div>
              <Label htmlFor="creator">Creator</Label>
              <Input id="creator" placeholder="Author, host, or publisher" className="mt-1.5" />
            </div>
            
            <div>
              <Label htmlFor="summary">Brief Summary</Label>
              <Textarea id="summary" placeholder="What's it about?" className="mt-1.5" rows={3} />
            </div>
            
            <div className="pt-2">
              <Button className="w-full">Create Source</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Add;
