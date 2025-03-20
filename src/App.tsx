import './App.css'

import { Suspense } from "react";
import {Loader} from "@/components/loading/loading.tsx";

// const ProductList = lazy(() => import("./components/ProductList"));

export default function App() {
    return (
        <Suspense fallback={<Loader/>}>
            {/**<ProductList />*/}
            okokokokoko
        </Suspense>
    );
}
