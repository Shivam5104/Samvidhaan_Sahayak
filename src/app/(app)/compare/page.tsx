'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { compareArticlesAction } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { GitCompareArrows, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const comparisonFormSchema = z.object({
  articleOne: z.string().min(1, { message: 'Article number is required.' }),
  articleTwo: z.string().min(1, { message: 'Article number is required.' }),
});

type ComparisonFormSchema = z.infer<typeof comparisonFormSchema>;

const ResultDisplay = ({ comparison }: { comparison: string }) => {
  const formatText = (text: string) => {
    // Split by headings (e.g., **1. Core Subject Matter:**)
    const sections = text.split(/(\*\*.*?\*\*)/).filter(Boolean);
    
    let formattedElements = [];
    for (let i = 0; i < sections.length; i += 2) {
      const heading = sections[i];
      const content = sections[i + 1] || "";
      
      if (heading && content) {
        formattedElements.push(
          <div key={i} className="mb-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">{heading.replace(/\*\*/g, '')}</h3>
            {content.trim().split('\n').filter(p => p.trim() !== '').map((paragraph, pIndex) => (
              <p key={pIndex} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        );
      } else if(heading) { // Handle case where there might not be content after a heading.
         formattedElements.push(
            <p key={i} className="mb-4 last:mb-0">
                {heading}
            </p>
         );
      }
    }
    return formattedElements;
  };

  return (
    <Card className="animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-primary">
          <GitCompareArrows className="h-6 w-6" />
          Comparison Result
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground leading-relaxed">
        {formatText(comparison)}
      </CardContent>
    </Card>
  )
};

const LoadingSkeleton = () => (
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
        <Skeleton className="h-4 w-full mt-4" />
        <Skeleton className="h-4 w-[90%]" />
      </CardContent>
    </Card>
);

export default function ComparePage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ComparisonFormSchema>({
    resolver: zodResolver(comparisonFormSchema),
    defaultValues: {
      articleOne: '',
      articleTwo: '',
    },
  });

  function onSubmit(values: ComparisonFormSchema) {
    setResult(null);
    startTransition(async () => {
      const response = await compareArticlesAction(values);
      if (response.success && response.data) {
        setResult(response.data.comparison);
      } else {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: response.error || 'Failed to get comparison. Please try again.',
        });
      }
    });
  }

  return (
    <main className="container mx-auto p-4 py-8 md:p-12">
      <header className="mb-10 text-center">
        <div className="inline-flex items-center gap-4 mb-2">
          <GitCompareArrows className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            Article Comparison Tool
          </h1>
        </div>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Enter two article numbers from the Indian Constitution to generate a detailed comparison.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Select Articles</CardTitle>
              <CardDescription>
                Provide the two articles you want to compare.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <FormField
                      control={form.control}
                      name="articleOne"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Article 1</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 14" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="articleTwo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Article 2</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 21" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" disabled={isPending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent">
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isPending ? 'Comparing...' : 'Compare Articles'}
                  </Button>
                </form>
              </Form>
            </CcardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 mt-8 lg:mt-0">
          {isPending && <LoadingSkeleton />}
          {result && !isPending && <ResultDisplay comparison={result} />}
        </div>
      </div>
    </main>
  );
}
