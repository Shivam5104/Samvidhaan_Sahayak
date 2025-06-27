
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookText, Gavel, Landmark, ShieldCheck } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { ConstitutionalInfo } from '@/lib/schema';

export function ResultDisplay({ summary, punishments, legalRecourse, caseStudies }: ConstitutionalInfo) {
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
            <BookText className="h-6 w-6" />
            Article Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          {formatText(summary)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-primary">
            <Gavel className="h-6 w-6" />
            Violation Punishments
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
         {formatText(punishments)}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-primary">
            <ShieldCheck className="h-6 w-6" />
            Legal Recourse Explanation
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
