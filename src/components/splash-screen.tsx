import { BookOpen } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground">
      <div className="animate-book-open">
        <BookOpen className="h-40 w-40 text-primary" />
      </div>
      <h1 className="mt-8 animate-text-fade-in text-3xl font-bold tracking-tight text-primary text-center px-4">
        Namaste, Welcome to the Samvidhaan Sahayak
      </h1>
    </div>
  );
}
