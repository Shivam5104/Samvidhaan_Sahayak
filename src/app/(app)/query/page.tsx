'use client';

import { QueryForm } from '@/components/query-form';
import { Scale } from 'lucide-react';

export default function QueryPage() {
  return (
    <main className="container mx-auto p-4 py-8 md:p-12">
      <header className="mb-10 text-center">
        <div className="inline-flex items-center gap-4 mb-2">
          <Scale className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            Samvidhaan Sahayak
          </h1>
        </div>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Your AI-powered guide to the Indian Constitution. Describe your situation below to get started.
        </p>
      </header>
      <QueryForm />
    </main>
  );
}
