import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Loader } from '@/components/loading';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SeedPage } from '@/page/product-list/ShopSeed.tsx';
import { PlantPage } from '@/page/product-list/ShopPlant.tsx';

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

const ReadFilePage = lazy(() =>
  import('./page/file/ReadFilePage.tsx').then((module) => ({
    default: module.ReadFilePage,
  }))
);


// eslint-disable-next-line react-refresh/only-export-components
function ShopRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ShopPage />} />
      <Route path="/all" element={<ShopPage />} />
      <Route path="/seeds" element={<SeedPage />} />
      <Route path="/plants" element={<PlantPage />} />
      <Route path="/viewfile/:fileId" element={<ReadFilePage />} />
    </Routes>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function BlogRoutes() {
  return (
    <Routes>
      <Route path="/viewfile/:fileId" element={<ReadFilePage />} />
    </Routes>
  );
}
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/*" element={<ShopRoutes />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/*" element={<BlogRoutes />} />
        </Routes>
      </Suspense>
    </Router>
  </StrictMode>
);
