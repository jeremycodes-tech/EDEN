import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const phoneRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const headline = headlineRef.current;
    const desc = descRef.current;
    const cta = ctaRef.current;
    const phone = phoneRef.current;

    if (!section || !content || !headline || !desc || !cta || !phone) return;

    const words = headline.querySelectorAll('.word');

    // Scroll-triggered entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    // Background gradient reveal
    tl.fromTo(
      content,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'smooth' }
    );

    // Headline word-by-word rise
    tl.fromTo(
      words,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'expo.out' },
      '-=0.3'
    );

    // Description fade in
    tl.fromTo(
      desc,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'smooth' },
      '-=0.3'
    );

    // CTA button bounce in
    tl.fromTo(
      cta,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
      '-=0.2'
    );

    // Phone link fade in
    tl.fromTo(
      phone,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'smooth' },
      '-=0.2'
    );

    // Animated gradient background on scroll
    gsap.to(section, {
      backgroundPosition: '100% 50%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        backgroundSize: '200% 200%',
      }}
    >
      <div ref={contentRef} className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl md:text-5xl font-semibold text-white mb-6"
        >
          <span className="word inline-block">Ready</span>{' '}
          <span className="word inline-block">to</span>{' '}
          <span className="word inline-block">Build</span>{' '}
          <span className="word inline-block">Your</span>{' '}
          <span className="word inline-block">Dream?</span>
        </h2>

        {/* Description */}
        <p
          ref={descRef}
          className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Let's discuss how we can bring your vision to life. Schedule a consultation with our expert team today.
        </p>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          className="bg-white text-black px-10 py-4 rounded-full font-medium text-base hover:bg-neutral-100 transition-all duration-250 hover:-translate-y-1 hover:shadow-xl mb-6"
        >
          Get in Touch
        </button>

        {/* Phone Link */}
        <a
          ref={phoneRef}
          href="tel:+15551234567"
          className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
        >
          <Phone className="w-4 h-4" />
          <span className="text-sm">Or call us: +1 (555) 123-4567</span>
        </a>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 border border-white/5 rounded-full hidden lg:block" />
      <div className="absolute bottom-10 right-10 w-60 h-60 border border-white/5 rounded-full hidden lg:block" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full hidden lg:block" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white/10 rounded-full hidden lg:block" />
    </section>
  );
}
