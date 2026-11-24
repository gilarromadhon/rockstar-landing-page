import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";

const PARA_1 =
  "RockStar Academy has been a trusted partner for parents of more than 50,000 kids & teens in Indonesia, from 6 months to 18 years old. Providing opportunities for children in this 21st Century Environment to have sufficient physical activities in a safe environment and to experience a rounded and balanced growth.";

const PARA_2 =
  "With over 120 classes per week and more than 50 events and competitions to participate in throughout the year, RockStar Academy offers a full range of physical activities, from sports to performing arts, allowing our students to establish a healthy lifestyle from early age, explore their talents, reach their full potentials, and develop an essential qualities required to become Future Life Champions.";

const PARA_1_CHAR_COUNT = PARA_1.replace(/ /g, "").length;

// Splits a sentence into per-word spans (so line-wrapping stays natural)
// each containing per-character spans (so color can be revealed one
// letter at a time). Each character gets a stable global index into
// charRefs so re-renders overwrite rather than duplicate entries.
function RevealText({ text, startIndex, charRefs }) {
  let i = startIndex;
  const words = text.split(" ");
  const nodes = [];

  words.forEach((word, wi) => {
    nodes.push(
      <span className="rv-word" key={`w${wi}`}>
        {word.split("").map((ch, ci) => {
          const idx = i++;
          return (
            <span
              key={ci}
              ref={(el) => (charRefs.current[idx] = el)}
              className="rv-char"
            >
              {ch}
            </span>
          );
        })}
      </span>
    );
    // The space is a sibling text node, not nested inside the word's own
    // inline-block box — a space placed at the very end of an
    // inline-block gets silently collapsed/trimmed by the browser (it's
    // treated as trailing whitespace at the edge of that box's own line),
    // which is exactly what was eating the spacing between words.
    if (wi < words.length - 1) nodes.push(" ");
  });

  return nodes;
}

export default function Description() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const charRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        charRefs.current.filter(Boolean),
        { color: "rgba(91, 105, 102, 0.32)" },
        {
          color: "#16211F",
          ease: "none",
          stagger: 0.008,
          scrollTrigger: {
            // Bound to the text block itself (not the padded section,
            // which has extra empty space from min-height/flex-centering)
            // so the trigger range maps to exactly how far the reader
            // has to scroll through the actual paragraphs.
            trigger: contentRef.current,
            start: "top 85%",
            // Finishes while the last line is still comfortably on
            // screen, rather than lagging until it's about to scroll
            // out of view.
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="description">
      <div ref={contentRef} className="wrap description__inner">
        <p className="description__intro">Since 2011,</p>
        <p className="description__body">
          <RevealText text={PARA_1} startIndex={0} charRefs={charRefs} />
        </p>
        <p className="description__body">
          <RevealText
            text={PARA_2}
            startIndex={PARA_1_CHAR_COUNT}
            charRefs={charRefs}
          />
        </p>
      </div>
    </section>
  );
}
