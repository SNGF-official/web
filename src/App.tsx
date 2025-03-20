import './App.css';

import { lazy, Suspense } from 'react';
import { Loader } from '@/components/loading/loading.tsx';

const LandingPage = lazy(() =>
  import('@/page/landing/Landing').then((module) => ({
    default: module.Landing,
  }))
);

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <LandingPage />
    </Suspense>
  );
}
