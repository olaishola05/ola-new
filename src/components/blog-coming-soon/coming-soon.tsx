'use client';

import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { AlertCircle, Clock, Construction, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import * as actions from "@/actions";

export default function BlogUnderConstruction() {
  const [state, formAction] = useFormState(actions.subscribeToNewsletter, {
    subscribed: false,
  });
  const [progress, setProgress] = useState(65);
  const [dots, setDots] = useState('.');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(dots => dots.length >= 3 ? '.' : dots + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  function handleSubmit(formData: FormData) {
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Construction className="h-6 w-6" />
              Blog Under Construction
            </CardTitle>
            <Badge variant="outline" className="bg-white text-blue-500 border-0 px-3 py-1">
              Coming Soon
            </Badge>
          </div>
          <CardDescription className="text-gray-100 mt-2">
            We&apos;re working hard to bring you amazing content{dots}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              The blog is currently under development. We&apos;re working diligently to create
              valuable content for you.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <p>Expected launch: Summer 2025</p>
            </div>

            {!state?.subscribed ? (
              <div className="mt-6">
                <h3 className="font-medium mb-2">Get notified when we launch:</h3>
                <form
                  action={handleSubmit}
                  className="space-y-2"
                >
                  <div className="flex gap-2">
                    <input
                      name="email"
                      type="email"
                      placeholder="Your email"
                      required
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Button type="submit" disabled={isPending} className='bg-cta text-ctaText hover:bg-transparent hover:text-cta transition-all duration-300 ease-in-out'>
                      {isPending ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                  </div>

                  {state?.error && (
                    <p className="text-sm text-red-500 mt-1">{state?.error}</p>
                  )}
                </form>
              </div>
            ) : (
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <AlertTitle>Thank you!</AlertTitle>
                <AlertDescription>
                  {state.message || "We'll notify you when our blog launches."}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <p className="text-sm text-gray-500">Thank you for your patience</p>
          <Link href='/' className="flex items-center gap-1">
            Back to Home
            <ChevronRight className="h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}