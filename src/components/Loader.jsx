import { useEffect, useState } from "react";

const SLIDES = [
  "https://cghpdqioexwedswxjqvs.supabase.co/storage/v1/object/public/images/rockstar/futsal.jpeg",
  "https://cghpdqioexwedswxjqvs.supabase.co/storage/v1/object/public/images/rockstar/dance.jpeg",
  "https://cghpdqioexwedswxjqvs.supabase.co/storage/v1/object/public/images/rockstar/basketball.jpeg",
  "https://cghpdqioexwedswxjqvs.supabase.co/storage/v1/object/public/images/rockstar/gymnastic.jpeg",
  "https://cghpdqioexwedswxjqvs.supabase.co/storage/v1/object/public/images/rockstar/swimming.jpeg",
];

const STEP_MS = 320;

export default function Loader({ onDone }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let step = 0;

    // Advance through the 5 photos exactly once (no wrap-around back to
    // the first one) then immediately start the exit — never repeats.
    const id = setInterval(() => {
      step += 1;
      if (step >= SLIDES.length) {
        clearInterval(id);
        setLeaving(true);
        setTimeout(() => onDone?.(), 450);
        return;
      }
      setIndex(step);
    }, STEP_MS);

    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className={`loader ${leaving ? "is-leaving" : ""}`}>
      <div className="loader__stage">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`loader__img ${i === index ? "is-active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
