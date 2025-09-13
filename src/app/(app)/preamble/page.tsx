'use client';

import { useState, useTransition } from 'react';
import { explainPreambleKeywordAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ScrollText, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const preambleText = `WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:
JUSTICE, social, economic and political;
LIBERTY of thought, expression, belief, faith and worship;
EQUALITY of status and of opportunity; and to promote among them all
FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;
IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.`;

const keywords = [
  'SOVEREIGN',
  'SOCIALIST',
  'SECULAR',
  'DEMOCRATIC',
  'REPUBLIC',
  'JUSTICE',
  'LIBERTY',
  'EQUALITY',
  'FRATERNITY',
];

const PreambleDisplay = ({ onKeywordClick }: { onKeywordClick: (keyword: string) => void }) => {
  const parts = preambleText.split(/(\b(?:SOVEREIGN|SOCIALIST|SECULAR|DEMOCRATIC|REPUBLIC|JUSTICE|LIBERTY|EQUALITY|FRATERNITY)\b)/g);

  return (
    <p className="text-xl md:text-2xl leading-relaxed whitespace-pre-line font-serif text-center">
      {parts.map((part, index) =>
        keywords.includes(part) ? (
          <span
            key={index}
            onClick={() => onKeywordClick(part)}
            className="font-bold text-primary underline decoration-dotted decoration-primary/50 cursor-pointer hover:text-accent transition-colors"
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </p>
  );
};

const ExplanationResult = ({ explanation, keyword }: { explanation: string, keyword: string }) => (
    <Card className="animate-in fade-in-50 duration-500 mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-accent">
          <Sparkles className="h-6 w-6" />
          Explanation for: {keyword}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground leading-relaxed space-y-4">
        {explanation.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </CardContent>
    </Card>
);

const ExplanationSkeleton = () => (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-7 w-[250px]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[85%]" />
      </CardContent>
    </Card>
);


export default function PreamblePage() {
    const [isPending, startTransition] = useTransition();
    const [explanation, setExplanation] = useState<string | null>(null);
    const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
    const { toast } = useToast();

    const handleKeywordClick = (keyword: string) => {
        setExplanation(null);
        setSelectedKeyword(keyword);
        startTransition(async () => {
          const response = await explainPreambleKeywordAction(keyword);
          if (response.success && response.data) {
            setExplanation(response.data.explanation);
          } else {
            toast({
              variant: 'destructive',
              title: 'An error occurred',
              description: response.error || 'Failed to get explanation. Please try again.',
            });
            setSelectedKeyword(null);
          }
        });
    }

  return (
    <main className="container mx-auto p-4 py-8 md:p-12">
      <header className="mb-10 text-center">
        <div className="inline-flex items-center gap-4 mb-2">
          <ScrollText className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            Preamble Explorer
          </h1>
        </div>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Click on the highlighted keywords in the Preamble to discover their meaning and significance.
        </p>
      </header>

      <Card>
        <CardContent className="p-6 md:p-10">
          <PreambleDisplay onKeywordClick={handleKeywordClick} />
        </CardContent>
      </Card>
      
      {isPending && <ExplanationSkeleton />}
      {explanation && selectedKeyword && !isPending && <ExplanationResult explanation={explanation} keyword={selectedKeyword} />}
      
    </main>
  );
}
