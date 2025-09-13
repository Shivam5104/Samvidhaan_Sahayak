'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookText, Gavel, Landmark, ShieldCheck, FileQuestion, Volume2, Loader2, StopCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { ConstitutionalInfo } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { textToSpeechAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const AudioPlayer: React.FC<{ text: string; sectionId: string }> = ({ text, sectionId }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [audioSrc, setAudioSrc] = React.useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handlePlay = () => {
    if (audioSrc) {
      setIsPlaying(true);
      audioRef.current?.play();
      return;
    }

    startTransition(async () => {
      const response = await textToSpeechAction(text);
      if (response.success && response.data?.media) {
        setAudioSrc(response.data.media);
        setIsPlaying(true);
      } else {
        toast({
          variant: 'destructive',
          title: 'Audio Error',
          description: response.error || 'Failed to generate audio.',
        });
      }
    });
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };
  
  React.useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.play().catch(e => console.error("Audio play failed", e));
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [audioSrc]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={isPlaying ? handleStop : handlePlay}
        disabled={isPending}
        className="h-7 w-7 text-muted-foreground"
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : isPlaying ? (
          <StopCircle />
        ) : (
          <Volume2 />
        )}
        <span className="sr-only">{isPlaying ? 'Stop' : 'Listen'}</span>
      </Button>
      {audioSrc && <audio ref={audioRef} className="hidden" />}
    </>
  );
};


export function ResultDisplay({ identifiedArticle, summary, punishments, legalRecourse, caseStudies }: ConstitutionalInfo) {
  const formatText = (text: string) => {
    return text.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };
    
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-primary">
            <FileQuestion className="h-6 w-6" />
            Identified: Article {identifiedArticle.articleNumber}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          {formatText(identifiedArticle.reasoning)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-primary">
              <BookText className="h-6 w-6" />
              Article Summary
            </div>
            <AudioPlayer text={summary} sectionId="summary" />
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          {formatText(summary)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-primary">
                <Gavel className="h-6 w-6" />
                Violation Punishments
            </div>
            <AudioPlayer text={punishments} sectionId="punishments" />
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
         {formatText(punishments)}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-primary">
                <ShieldCheck className="h-6 w-6" />
                Legal Recourse Explanation
            </div>
            <AudioPlayer text={legalRecourse} sectionId="legal-recourse" />
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          {formatText(legalRecourse)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-primary">
            <Landmark className="h-6 w-6" />
            Relevant Case Studies
          </CardTitle>
        </CardHeader>
        <CardContent>
          {caseStudies && caseStudies.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {caseStudies.map((study, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>
                    <div className="text-left flex-grow">
                      <p className="font-semibold text-card-foreground">{study.caseName}</p>
                      <p className="text-sm text-muted-foreground mt-1">Judgment Year: {study.judgmentYear}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {formatText(study.summary)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-muted-foreground">No specific case studies were found for your query.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const LoadingSkeleton = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-7 w-[200px]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-7 w-[200px]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-7 w-[250px]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-7 w-[220px]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[70%]" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-7 w-[240px]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  </div>
);
