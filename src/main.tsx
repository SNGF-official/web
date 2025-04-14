import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Loader } from '@/components/loading';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const LandingPage = lazy(() =>
  import('./page/landing/Landing.tsx').then((module) => ({
    default: module.Landing,
  }))
);
const ShopPage = lazy(() =>
  import('./page/product-list/ShopPage.tsx').then((module) => ({
    default: module.ShopPage,
  }))
);
const BlogPage = lazy(() =>
  import('./page/blog/BlogPage.tsx').then((module) => ({
    default: module.BlogPage,
  }))
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </Suspense>
    </Router>
  </StrictMode>
);
