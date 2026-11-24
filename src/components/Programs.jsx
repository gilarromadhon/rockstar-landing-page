import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";

const PROGRAMS = [
  {
    name: "Gymnastic",
    desc: "Flexibility, strength and balance taught through floor, bar and vault fundamentals.",
    img: "gymnastic-rsa",
  },
  {
    name: "Futsal",
    desc: "Fast-paced small-sided football that sharpens ball control and teamwork.",
    img: "futsal-rsa",
  },
  {
    name: "Tennis",
    desc: "Footwork, swing mechanics and match-play for every age and level.",
    img: "tennis-rsa",
  },
  {
    name: "Pickleball",
    desc: "The fastest-growing racquet sport, built for coordination and quick reflexes.",
    img: "pickleball-rsa",
  },
  {
    name: "Basketball",
    desc: "Dribbling, shooting and team play led by certified youth coaches.",
    img: "basketball-rsa",
  },
  {
    name: "Taekwondo",
    desc: "Discipline, focus and self-defense through a structured belt curriculum.",
    img: "taekwondo-rsa",
  },
  {
    name: "Swimming",
    desc: "Water confidence and stroke technique in a safe, supervised pool.",
    img: "swimming-rsa",
  },
  {
    name: "Dance",
    desc: "Rhythm, performance and stage confidence across multiple dance styles.",
    img: "dance-rsa",
  },
];

export default function Programs() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headingRef = useRef(null);
  const leadRef = useRef(null);

  useLayoutEffect(() => {
    // The horizontal pin-scroll hijack (turning vertical scroll into a
    // horizontal card swipe) only runs on wider screens. On touch/mobile
    // it's gated off in favor of the plain swipeable row defined in CSS
    // (.programs__viewport gets overflow-x: auto under 720px) — pinning
    // the page for a calculated scroll distance while a human is trying
    // to swipe a touchscreen is exactly the kind of thing that feels
    // stuck/broken on mobile.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 721px)", () => {
      const track = trackRef.current;
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      const tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + distance,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.scrollTrigger?.kill();
    });

    const ctx = gsap.context(() => {
      // Title + lead fade/slide up once as they scroll into view. Scoped
      // to the head block itself (not the pinned section) and set to
      // play only once (no reverse) to keep it isolated from the
      // horizontal-scroll pin trigger on the section below.
      gsap.fromTo(
        [headingRef.current, leadRef.current],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section id="programs" ref={sectionRef} className="programs">
      <div className="programs__head wrap">
        <h2 ref={headingRef}>Our Programs</h2>
        <p ref={leadRef} className="programs__lead">
          Learning at Rockstar Academy is facilitated by professional &amp;
          qualified instructors — Indonesians and expatriates — supported by
          an international curriculum and a state-of-the-art tracking
          system, conducted in a safe, high-standard environment.
        </p>
      </div>

      <div className="programs__viewport">
        <div ref={trackRef} className="programs__track">
          {PROGRAMS.map((p) => (
            <article className="program-card" key={p.name}>
              <img
                src={`https://picsum.photos/seed/${p.img}/480/640`}
                alt={`${p.name} class at Rockstar Academy`}
              />
              <div className="program-card__label">{p.name}</div>
              <div className="program-card__desc">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
