
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getConstitutionalInfo } from '@/app/actions';
import { formSchema, type FormSchema, type ConstitutionalInfo } from '@/lib/schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResultDisplay, LoadingSkeleton } from '@/components/result-display';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function QueryForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ConstitutionalInfo | null>(null);
  const { toast } = useToast();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: undefined,
      phone: '',
      profession: '',
      userExperience: '',
    },
  });

  function onSubmit(values: FormSchema) {
    setResult(null);
    startTransition(async () => {
      const response = await getConstitutionalInfo(values);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: response.error || 'Failed to get information. Please try again.',
        });
      }
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Details & Query</CardTitle>
            <CardDescription>
              Provide your details and describe your situation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Rohan Sharma" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 35" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="userExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe your situation</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the incident of discrimination or rights violation you faced."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent">
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isPending ? 'Analyzing...' : 'Get Legal Insights'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-3 mt-8 lg:mt-0">
        {isPending && <LoadingSkeleton />}
        {result && !isPending && <ResultDisplay {...result} />}
      </div>
    </div>
  );
}
