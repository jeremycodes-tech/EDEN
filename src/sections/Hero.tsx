import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaPocketRef = useRef<HTMLDivElement>(null);
  const mobileCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const ctaPocket = ctaPocketRef.current;
    const mobileCta = mobileCtaRef.current;

    if (!section || !container || !imageWrapper || !headline || !subhead) return;

    const words = headline.querySelectorAll('.word');

    // Entrance animation timeline
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      container,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }
    );

    tl.fromTo(
      words,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out' },
      '-=0.8'
    );

    tl.fromTo(
      subhead,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'smooth' },
      '-=0.5'
    );

    if (ctaPocket) {
      tl.fromTo(
        ctaPocket,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'expo.out' },
        '-=0.7'
      );
    }

    if (mobileCta) {
      tl.fromTo(
        mobileCta,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.4'
      );
    }

    // Subtle Parallax (Desktop Only)
    if (window.innerWidth >= 768) {
      gsap.to(imageWrapper, {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st: any) => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white pt-[110px] pb-12 md:pt-[128px] md:pb-20 overflow-hidden"
    >
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={containerRef}
          className="relative w-full h-[75vh] min-h-[600px] lg:min-h-[750px] bg-neutral-100 rounded-[32px] md:rounded-[50px] lg:rounded-[70px] overflow-hidden md:shadow-2xl"
        >
          {/* Background Image Wrapper */}
          <div ref={imageWrapperRef} className="absolute inset-0 md:-top-10 md:-bottom-10">
            <img
              src="/hero-house.jpg"
              alt="Modern Architecture"
              className="w-full h-full object-cover"
            />
            {/* Darker Overlays for Text Legibility */}
            <div className="absolute inset-0 bg-black/40 md:bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 md:from-black/40 md:via-transparent md:to-transparent" />
          </div>

          {/* Unified Text Content Area */}
          <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10 md:p-16 lg:p-24 z-10">
            <div className="max-w-5xl">
              <h1
                ref={headlineRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.0] tracking-tighter mb-4 md:mb-8"
                style={{ perspective: '1000px' }}
              >
                <span className="word inline-block">Designing</span>{' '}
                <span className="word inline-block">Spaces</span>
                <br />
                <span className="word inline-block">That</span>{' '}
                <span className="word inline-block">Inspire</span>{' '}
                <span className="word inline-block">&</span>{' '}
                <span className="word inline-block">Endure</span>
              </h1>

              <p
                ref={subheadRef}
                className="text-base sm:text-lg lg:text-2xl text-white/85 max-w-sm leading-relaxed font-normal drop-shadow-md"
              >
                We transform visions into timeless architecture, blending innovative design with functional excellence
              </p>

              {/* Mobile CTA */}
              <div ref={mobileCtaRef} className="md:hidden mt-8">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 bg-white/95 text-black px-7 py-3 rounded-full text-sm font-semibold shadow-lg active:scale-[0.97] transition-transform"
                >
                  Schedule a Consultation
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Notched Pocket (md and up only) */}
          <div
            ref={ctaPocketRef}
            className="hidden md:flex absolute bottom-0 left-0 bg-white pt-5 pr-5 md:pt-8 md:pr-8 lg:pt-10 lg:pr-10 rounded-tr-[30px] md:rounded-tr-[40px] lg:rounded-tr-[50px] items-end justify-start z-20"
          >
            <div className="absolute -top-[40px] md:-top-[50px] lg:-top-[60px] left-0 w-[40px] md:w-[50px] lg:w-[60px] h-[40px] md:h-[50px] lg:h-[60px]">
              <svg viewBox="0 0 60 60" className="w-full h-full fill-white">
                <path d="M60 60V0C60 33.1371 33.1371 60 0 60H60Z" />
              </svg>
            </div>
            <div className="absolute bottom-0 -right-[40px] md:-right-[50px] lg:-right-[60px] w-[40px] md:w-[50px] lg:w-[60px] h-[40px] md:h-[50px] lg:h-[60px]">
              <svg viewBox="0 0 60 60" className="w-full h-full fill-white">
                <path d="M0 60H60C26.8629 60 0 33.1371 0 0V60Z" />
              </svg>
            </div>
            <div className="pb-4 pl-4 sm:pb-5 sm:pl-5 md:pb-6 md:pl-6">
              <button
                onClick={scrollToContact}
                className="bg-black text-white px-10 py-5 md:px-14 md:py-6 rounded-full text-lg font-bold hover:bg-neutral-800 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:-translate-y-1"
              >
                Schedule a Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
