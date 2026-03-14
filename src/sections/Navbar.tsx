import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#testimonials' },
  { label: 'Contacts', href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    const links = linksRef.current;
    const cta = ctaRef.current;

    if (!nav || !logo) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      logo,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.6, ease: 'expo.out' }
    );

    if (links) {
      const linkElements = links.querySelectorAll('a');
      tl.fromTo(
        linkElements,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)' },
        '-=0.3'
      );
    }

    if (cta) {
      tl.fromTo(
        cta,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
        '-=0.2'
      );
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMenu = () => {
    const menu = mobileMenuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;

    menuOpenRef.current = true;
    setMenuOpen(true);

    // Make visible first
    gsap.set(menu, { display: 'flex' });
    gsap.set(overlay, { display: 'block' });

    const items = menu.querySelectorAll('.mobile-nav-item');

    const tl = gsap.timeline();

    // Overlay fade in
    tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });

    // Menu panel slide up + blur in
    tl.fromTo(
      menu,
      { y: 40, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'expo.out' },
      '-=0.2'
    );

    // Links stagger in
    tl.fromTo(
      items,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: 'expo.out' },
      '-=0.2'
    );
  };

  const closeMenu = () => {
    const menu = mobileMenuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;

    menuOpenRef.current = false;
    setMenuOpen(false);

    const tl = gsap.timeline();

    tl.to(menu, { y: 20, opacity: 0, scale: 0.96, duration: 0.3, ease: 'expo.in' });
    tl.to(overlay, { opacity: 0, duration: 0.25, ease: 'power2.in' }, '-=0.15');
    tl.call(() => {
      gsap.set(menu, { display: 'none' });
      gsap.set(overlay, { display: 'none' });
    });
  };

  const toggleMenu = () => {
    if (menuOpenRef.current) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const scrollToSection = (href: string) => {
    closeMenu();
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  return (
    <>
      {/* ─── DESKTOP NAVBAR ─────────────────────────────────────── */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b hidden md:block ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg py-4 border-neutral-200/50'
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div ref={logoRef} className="flex items-center">
              <span className={`text-5xl font-bold tracking-tighter transition-transform duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
                EDEN
              </span>
            </div>

            {/* Desktop Links */}
            <div ref={linksRef} className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="text-xl font-semibold text-neutral-800 hover:text-black link-underline transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <button
              ref={ctaRef}
              onClick={() => scrollToSection('#contact')}
              className={`text-xl font-bold px-10 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                isScrolled
                  ? 'bg-black text-white hover:bg-neutral-800'
                  : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      {/* ─── MOBILE ISLAND NAVBAR ───────────────────────────────── */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center md:hidden px-4">
        <div
          style={{
            background: isScrolled
              ? 'linear-gradient(135deg, rgba(167,243,208,0.75) 0%, rgba(255,182,213,0.75) 100%)'
              : 'linear-gradient(135deg, rgba(167,243,208,0.55) 0%, rgba(255,182,213,0.55) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.55)',
            boxShadow: '0 8px 32px rgba(167,243,208,0.2), 0 2px 8px rgba(255,182,213,0.2)',
          }}
          className="flex items-center justify-between w-full max-w-sm rounded-2xl px-5 py-3 transition-all duration-300"
        >
          {/* Mobile Logo */}
          <span className="text-2xl font-bold tracking-tighter text-black">
            EDEN
          </span>

          {/* Hamburger / X Button */}
          <button
            onClick={toggleMenu}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/5 transition-colors duration-200 focus:outline-none"
            aria-label="Toggle menu"
          >
            {/* Hamburger SVG — 3 bars that morph to X */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              className="overflow-visible"
            >
              {/* Top bar */}
              <line
                className="burger-top"
                x1="2" y1="6" x2="20" y2="6"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  transformOrigin: '11px 11px',
                  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.2s',
                  transform: menuOpen
                    ? 'translateY(5px) rotate(45deg)'
                    : 'none',
                }}
              />
              {/* Middle bar */}
              <line
                className="burger-mid"
                x1="2" y1="11" x2="20" y2="11"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  transformOrigin: '11px 11px',
                  transition: 'opacity 0.2s ease',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              {/* Bottom bar */}
              <line
                className="burger-bot"
                x1="2" y1="16" x2="20" y2="16"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  transformOrigin: '11px 11px',
                  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.2s',
                  transform: menuOpen
                    ? 'translateY(-5px) rotate(-45deg)'
                    : 'none',
                }}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ─── MOBILE BACKDROP OVERLAY ────────────────────────────── */}
      <div
        ref={overlayRef}
        onClick={closeMenu}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
        style={{ display: 'none' }}
      />

      {/* ─── MOBILE DROPDOWN MENU ───────────────────────────────── */}
      <div
        ref={mobileMenuRef}
        className="fixed top-20 left-4 right-4 z-50 rounded-3xl overflow-hidden md:hidden flex-col"
        style={{
          display: 'none',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.08)',
        }}
      >
        {/* Nav links */}
        <div className="flex flex-col py-6 px-6 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              className="mobile-nav-item flex items-center justify-between py-4 text-lg font-semibold text-neutral-800 hover:text-black border-b border-neutral-100 last:border-0 transition-colors duration-150 active:scale-[0.98]"
            >
              <span>{link.label}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-30">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>

        {/* CTA inside menu */}
        <div className="mobile-nav-item px-6 pb-6">
          <button
            onClick={() => scrollToSection('#contact')}
            className="w-full bg-black text-white py-4 rounded-2xl text-base font-bold hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200"
          >
            Contact Us
          </button>
        </div>
      </div>
    </>
  );
}
