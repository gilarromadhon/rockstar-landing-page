import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";

const CITIES = ["Jakarta", "Bandung", "Surabaya", "Bogor", "Tangerang", "Bekasi", "Depok"];

export default function FindUs() {
  const sectionRef = useRef(null);
  const cityRefs = useRef([]);

  useLayoutEffect(() => {
    // Pin + focus-cycling only on wider screens. Pinning a full-viewport
    // section on mobile is exactly the kind of thing that goes wrong
    // when the browser's address bar resizes the viewport mid-scroll
    // (the pin-spacer height can end up stale) — which is what was
    // letting the Instructors heading right after this section peek out
    // from under it. On mobile the cities just render as a normal static
    // list instead (see the CSS fallback for .find-us__city).
    const mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      const ctx = gsap.context(() => {
        const items = cityRefs.current.filter(Boolean);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${CITIES.length * 50}%`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const idx = Math.min(
              CITIES.length - 1,
              Math.floor(self.progress * CITIES.length)
            );
            items.forEach((el, i) => {
              const isFocus = i === idx;
              el.classList.toggle("is-focus", isFocus);
              gsap.to(el, {
                opacity: isFocus ? 1 : 0.22,
                scale: isFocus ? 1 : 0.94,
                duration: 0.35,
                overwrite: "auto",
              });
            });
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const goToCity = () => {
    const el = document.querySelector("#footer");
    if (el) window.__lenis?.scrollTo(el, { offset: -20 });
  };

  return (
    <section ref={sectionRef} className="find-us">
      <div className="wrap find-us__inner">
        <p className="eyebrow find-us__eyebrow">Find Us</p>
        <ul className="find-us__list">
          {CITIES.map((city, i) => (
            <li key={city}>
              <button
                type="button"
                ref={(el) => (cityRefs.current[i] = el)}
                className="find-us__city"
                onClick={goToCity}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
