'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SplashScreen } from '@/components/splash-screen';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/timeline');
    }, 3500); // Duration of the splash screen

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}
