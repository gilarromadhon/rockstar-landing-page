import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";
import PillButton from "./PillButton";

const INSTRUCTOR_IMG =
  "https://cghpdqioexwedswxjqvs.supabase.co/storage/v1/object/public/images/rockstar/instructor.png";

export default function Instructors() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { filter: "grayscale(1) contrast(1.02)" },
        {
          filter: "grayscale(0) contrast(1)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="instructors">
      <div className="wrap instructors__inner">
        <div className="instructors__head">
          <h2>
            Highly Qualified
            <br />
            Instructors &amp; Coaches
          </h2>
          <div className="instructors__copy">
            <p>
              Learn from the highly competent &amp; certified instructors
              from Indonesia and all around the world.
            </p>
            <PillButton label="Meet the experts" />
          </div>
        </div>

        <div className="instructor-photo">
          <img
            ref={imgRef}
            src={INSTRUCTOR_IMG}
            alt="Rockstar Academy instructor"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
