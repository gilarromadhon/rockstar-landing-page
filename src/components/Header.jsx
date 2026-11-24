import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";

const LOGO_URL =
  "https://cghpdqioexwedswxjqvs.supabase.co/storage/v1/object/public/images/rockstar/logo.png";

const NAV_LINKS = [
  { label: "Home", href: "#hero", active: true },
  { label: "Programs", href: "#programs" },
  { label: "Events & Competitions", href: "#events" },
  { label: "Schedule & Locations", href: "#find-us" },
  { label: "Blog", href: "#footer" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const linksRef = useRef([]);
  const actionsRef = useRef(null);

  // Hide the trial + menu buttons while scrolling down, bring them back
  // as soon as the user scrolls up (or is back near the very top).
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (open) return;
          const y = self.scroll();
          if (y < 60) {
            gsap.to(actionsRef.current, { autoAlpha: 1, y: 0, duration: 0.3, overwrite: "auto" });
          } else if (self.direction === 1) {
            gsap.to(actionsRef.current, { autoAlpha: 0, y: -14, duration: 0.3, overwrite: "auto" });
          } else {
            gsap.to(actionsRef.current, { autoAlpha: 1, y: 0, duration: 0.3, overwrite: "auto" });
          }
        },
      });
    });
    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    if (!panelRef.current) return;
    const links = linksRef.current.filter(Boolean);

    if (open) {
      document.body.style.overflow = "hidden";
      window.__lenis?.stop();
      gsap.to(actionsRef.current, { autoAlpha: 1, y: 0, duration: 0.2, overwrite: "auto" });
      const tl = gsap.timeline();
      tl.set(panelRef.current, { display: "flex" })
        .fromTo(
          panelRef.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.6, ease: "power3.out" }
        )
        .fromTo(
          links,
          { x: 24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" },
          "-=0.3"
        );
    } else {
      document.body.style.overflow = "";
      window.__lenis?.start();
      gsap.to(panelRef.current, {
        xPercent: 100,
        duration: 0.45,
        ease: "power2.in",
        onComplete: () => gsap.set(panelRef.current, { display: "none" }),
      });
    }
  }, [open]);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) window.__lenis?.scrollTo(el, { offset: -20 });
  };

  return (
    <header className="site-header">
      <div className="site-header__bar wrap">
        <a href="#hero" className="logo" onClick={(e) => { e.preventDefault(); go("#hero"); }}>
          <img className="logo__img" src={LOGO_URL} alt="Rockstar Academy" />
        </a>

        <div className="site-header__actions" ref={actionsRef}>
          <button className="btn-trial">
            Get a free trial
          </button>
          <button
            className={`burger ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav ref={panelRef} className="menu-panel" aria-hidden={!open}>
        <ul className="menu-panel__links">
          {NAV_LINKS.map((link, i) => (
            <li key={link.label}>
              <a
                ref={(el) => (linksRef.current[i] = el)}
                href={link.href}
                className={link.active ? "is-active" : ""}
                onClick={(e) => { e.preventDefault(); go(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="menu-panel__foot">
          <div className="menu-panel__meta">
            <a href="#footer" onClick={(e) => { e.preventDefault(); go("#footer"); }}>Franchising Opportunity</a>
            <a href="#footer" onClick={(e) => { e.preventDefault(); go("#footer"); }}>Contact Us</a>
          </div>
          <div className="menu-panel__social">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M15.12 8.5H13V7c0-.69.46-.85.78-.85h1.3V3.6L13.03 3.6C10.6 3.6 10 5.43 10 6.86V8.5H8.5v3h1.5v9h3v-9h1.9l.22-3Z" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M16.5 3c.3 2.1 1.6 3.5 3.5 3.7v2.5c-1.2 0-2.4-.4-3.5-1.1v6.1c0 3.1-2.3 5.3-5.1 5.3-2.8 0-5-2.2-5-5.1s2.3-5.1 5-5.1c.3 0 .6 0 .9.1v2.6a2.6 2.6 0 0 0-.9-.2c-1.4 0-2.5 1.1-2.5 2.6s1.1 2.6 2.5 2.6c1.5 0 2.7-1.1 2.7-2.9V3h2.4Z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="16" height="16">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="3.6" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M10 15.5V8.5L16 12l-6 3.5Z" />
                <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
