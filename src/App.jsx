import Header from "./components/Header/Header";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import('./pages/Home'));
const SearchCountry = lazy(() => import('./pages/SearchCountry'));
const Country = lazy(() => import('./pages/Country'));

import Loader from './components/Loader/Loader';

export const App = () => {
  return <>
    <Header />
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country" element={<SearchCountry />} />
        <Route path="/country/:countryId" element={<Country />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Suspense>
  </>
};
