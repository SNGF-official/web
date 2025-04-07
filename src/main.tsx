import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Loader } from '@/components/loading';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ShopPage } from '@/page/product-list';

const LandingPage = lazy(() =>
  import('./page/landing/Landing.tsx').then((module) => ({
    default: module.Landing,
  }))
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </Suspense>
    </Router>
  </StrictMode>
);
