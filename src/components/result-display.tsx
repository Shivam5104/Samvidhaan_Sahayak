
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookText, Gavel, ShieldCheck } from 'lucide-react';

type AiResult = {
  summary: string;
  punishments: string;
  legalRecourse: string;
};

export function ResultDisplay({ summary, punishments, legalRecourse }: AiResult) {
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
  </div>
);
