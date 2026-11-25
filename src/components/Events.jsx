import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";
import PillButton from "./PillButton";

const STRIPS = 10;

const EVENTS = [
  { title: "Elite Championships", tag: "Term competition", img: "elite-rsa", copy: "Term competitions for every program, age and level — built to promote growth and track the development of Rockstar Academy Elite Class students." },
  { title: "Cheerleading Recital", tag: "Annual showcase", img: "cheer-rsa", copy: "The most electrifying event of the year, showcasing skill, teamwork and energy from students across all cheerleading levels." },
  { title: "RockOlympics", tag: "Inter-branch games", img: "olympics-rsa", copy: "Branches compete head-to-head across multiple sports in a day-long festival of school spirit and sportsmanship." },
  { title: "Gymnastics Testing", tag: "Skill assessment", img: "gymtest-rsa", copy: "Structured evaluations that chart each gymnast's progress through our leveled skills curriculum." },
  { title: "Taekwondo Testing", tag: "Belt promotion", img: "taekwondotest-rsa", copy: "Formal belt-promotion testing that rewards discipline, technique and consistent practice." },
  { title: "RAD Ballet Testing", tag: "Royal Academy of Dance", img: "ballettest-rsa", copy: "Internationally recognised ballet examinations assessed against the Royal Academy of Dance syllabus." },
  { title: "CSTD Contemporary Dance Testing", tag: "Certified exam", img: "contemp-rsa", copy: "Contemporary technique exams certified by the Commonwealth Society of Teachers of Dancing." },
  { title: "Dance Recital", tag: "Season finale", img: "dancerecital-rsa", copy: "A full-production showcase where every dance class takes the stage for family and friends." },
  { title: "Ballet & Contemporary Recital", tag: "Studio showcase", img: "balletrecital-rsa", copy: "Our youngest and most advanced dancers share the stage in one celebratory evening." },
  { title: "Broadway Recital", tag: "Musical theatre", img: "broadway-rsa", copy: "Song, dance and storytelling combine as students perform scenes from beloved Broadway classics." },
];

// Split into two halves: column 2 shows the first half (so it reads as
// "appearing first" while scrolling), column 3 (offset lower) the rest.
const MID = Math.ceil(EVENTS.length / 2);
const COL_B = EVENTS.slice(0, MID);
const COL_C = EVENTS.slice(MID);

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-card__media">
        <img
          src={`https://picsum.photos/seed/${event.img}/640/480`}
          alt={event.title}
        />
        <div className="event-card__overlay">
          <PillButton label="Perform like a pro" />
        </div>
      </div>
      <p className="event-card__tag">{event.tag}</p>
      <h3>{event.title}</h3>
    </div>
  );
}

export default function Events() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const stripFillRefs = useRef([]);

  useLayoutEffect(() => {
    // Pin the left panel only on wider screens. Below 900px the grid
    // collapses to a single stacked column (see CSS), so the panel sits
    // directly above the cards in normal flow — pinning it there would
    // cover the first cards as the page scrolls, which is exactly the
    // kind of thing that looks broken on mobile.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=96",
        end: "bottom bottom",
        pin: panelRef.current,
        pinSpacing: false,
      });
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // Each of the 10 strips fills proportionally as scroll progress
          // passes through its 1/10th slice of the section.
          stripFillRefs.current.forEach((fill, i) => {
            if (!fill) return;
            const slice = 1 / STRIPS;
            const fraction = gsap.utils.clamp(
              0,
              1,
              (self.progress - i * slice) / slice
            );
            gsap.set(fill, { scaleX: fraction });
          });
        },
      });
    }, sectionRef);
    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section id="events" ref={sectionRef} className="events">
      <div className="wrap events__grid">
        <div className="events__panel" ref={panelRef}>
          <h2>Events &amp; Competitions</h2>
          <p className="events__panel-copy">
            Rockstar Academy offers more than 20 events and competitions
            throughout the year for students of all ages and levels, to
            challenge them in becoming life champions.
          </p>

          <div className="events__progress">
            {Array.from({ length: STRIPS }).map((_, i) => (
              <div className="events__strip" key={i}>
                <div
                  ref={(el) => (stripFillRefs.current[i] = el)}
                  className="events__strip-fill"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="events__col events__col--b">
          {COL_B.map((e) => (
            <EventCard key={e.title} event={e} />
          ))}
        </div>

        <div className="events__col events__col--c">
          {COL_C.map((e) => (
            <EventCard key={e.title} event={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
