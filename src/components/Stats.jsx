import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";

const STATS = [
  { value: 18, suffix: "", label: "Programs" },
  { value: 100, suffix: "+", label: "Classes" },
  { value: 50, suffix: "+", label: "Events & Competitions" },
  { value: 24, suffix: "", label: "Locations & Counting" },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const rowRefs = useRef([]);
  const numberRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const counter = { val: 0 };
        const target = STATS[i].value;

        gsap.fromTo(
          row,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
            },
            onStart: () => {
              gsap.to(counter, {
                val: target,
                duration: 1.1,
                delay: i * 0.08,
                ease: "power1.out",
                onUpdate: () => {
                  if (numberRefs.current[i]) {
                    numberRefs.current[i].textContent = Math.round(counter.val);
                  }
                },
              });
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="stats">
      <div className="wrap stats__inner">
        <h2 ref={headingRef} className="stats__heading">
          <span className="accent-teal">Asia&rsquo;s Largest</span>
          <br />
          Physical Education
          <br />
          Center for <span className="accent-orange">Kids &amp; Teens</span>
        </h2>

        <div className="stats__rows">
          {STATS.map((s, i) => (
            <div
              className="stats__row"
              key={s.label}
              ref={(el) => (rowRefs.current[i] = el)}
            >
              <span className="stats__number">
                <span ref={(el) => (numberRefs.current[i] = el)}>0</span>
                {s.suffix}
              </span>
              <span className="stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
