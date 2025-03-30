import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Loader } from '@/components/loading';

const LandingPage = lazy(() =>
  import('./page/landing/Landing.tsx').then((module) => ({
    default: module.Landing,
  }))
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <LandingPage />
    </Suspense>
  </StrictMode>
);
