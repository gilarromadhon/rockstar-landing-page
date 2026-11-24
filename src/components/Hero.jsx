import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";

const HERO_IMG =
  "https://cghpdqioexwedswxjqvs.supabase.co/storage/v1/object/public/images/rockstar/hero.jpg";

export default function Hero() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Starts fully hidden below the fold so it never collides with the
      // headline before the user scrolls.
      gsap.set(imageRef.current, { yPercent: 115, opacity: 0, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=90%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
        },
      });

      // 1. The headline fades out fully in the first ~55% of the scroll
      //    range (duration 0.55 of 1), so it is completely gone before the
      //    image finishes rising into its final, overlapping position
      //    (duration 1) — this avoids the two ever visibly colliding.
      tl.to(textRef.current, { opacity: 0, yPercent: -10, ease: "none", duration: 0.55 }, 0)
        .to(imageRef.current, { yPercent: -46, opacity: 1, scale: 1.04, ease: "none", duration: 1 }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="hero">
      <div className="hero__inner wrap">
        <div ref={textRef} className="hero__text">
          <h1>
            Welcome to the <span className="accent-orange">biggest one</span> stop
            physical education Academy
            <br />
            for kids &amp; teens in{" "}
            <span className="accent-teal">Asia</span>!
          </h1>
        </div>

        <div ref={imageRef} className="hero__image">
          <img src={HERO_IMG} alt="Kids practicing sports at Rockstar Academy" />
        </div>
      </div>
    </section>
  );
}
