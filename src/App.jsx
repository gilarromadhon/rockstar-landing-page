import { useLayoutEffect, useState } from "react";
import { useSmoothScroll, ScrollTrigger } from "./lib/smoothScroll";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Description from "./components/Description";
import Programs from "./components/Programs";
import Events from "./components/Events";
import StatsSection from "./components/Stats";
import FindUs from "./components/FindUs";
import Instructors from "./components/Instructors";
import Footer from "./components/Footer";
import BrandTail from "./components/BrandTail";

export default function App() {
  useSmoothScroll();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    // Keep the page from scrolling under the loader, and make sure
    // ScrollTrigger re-measures everything once it's gone (section heights
    // can differ while images were still loading behind the overlay).
    document.body.style.overflow = loading ? "hidden" : "";
    if (!loading) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [loading]);

  useLayoutEffect(() => {
    // Refresh ScrollTrigger once fonts/images have settled so pinned
    // sections measure correctly.
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Header />
      <main>
        <Hero />
        <Description />
        <Programs />
        <Events />
        <StatsSection />
        <FindUs />
        <Instructors />
      </main>
      <Footer />
      <BrandTail />
    </>
  );
}
