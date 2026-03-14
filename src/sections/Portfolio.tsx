import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    title: 'New York Office',
    description: 'A bold corporate workspace blending raw concrete with warm wood tones to inspire creativity.',
    tag: 'Commercial · New York',
    image: '/portfolio-office.jpg',
    size: 'large',
  },
  {
    title: 'Commercial Restaurant',
    description: 'An intimate dining environment crafted around soft lighting and layered textures.',
    tag: 'Hospitality · Chicago',
    image: '/portfolio-restaurant.jpg',
    size: 'small',
  },
  {
    title: 'Hotel Rooms',
    description: 'Serene, minimalist suites that turn rest into a luxury experience.',
    tag: 'Hospitality · Dubai',
    image: '/portfolio-hotel.jpg',
    size: 'small',
  },
  {
    title: 'Private House',
    description: 'A stunning private residence where architecture meets nature through glass and steel.',
    tag: 'Residential · Los Angeles',
    image: '/portfolio-house.jpg',
    size: 'large',
  },
];

// Shared overlay components
function DesktopOverlay({ title }: { title: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
        <span className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-black">
          {title}
        </span>
      </div>
    </>
  );
}

function MobileCaption({ title, description, tag }: { title: string; description: string; tag: string }) {
  return (
    // Always visible on mobile, hidden on desktop
    <div
      className="absolute bottom-0 left-0 right-0 md:hidden"
      style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
        padding: '2.5rem 1.25rem 1.25rem',
      }}
    >
      {/* Tag pill */}
      <span
        className="inline-block text-[10px] font-semibold tracking-widest uppercase mb-2 px-2.5 py-1 rounded-full"
        style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.85)',
        }}
      >
        {tag}
      </span>

      {/* Title */}
      <h3 className="text-white font-bold text-lg leading-tight mb-1">{title}</h3>

      {/* Description */}
      <p className="text-white/70 text-xs leading-relaxed">{description}</p>
    </div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    const cta = ctaRef.current;

    if (!section || !header || !grid || !cta) return;

    const title = header.querySelector('h2');
    const desc = header.querySelector('p');
    const cards = grid.querySelectorAll('.portfolio-card');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(title, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });
    tl.fromTo(desc, { opacity: 0, filter: 'blur(8px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'smooth' }, '-=0.3');

    cards.forEach((card, index) => {
      const direction = index % 2 === 0 ? -80 : 80;
      const axis = index < 2 ? 'x' : 'y';
      tl.fromTo(card, { [axis]: direction, opacity: 0 }, { [axis]: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }, `-=${index === 0 ? 0.2 : 0.5}`);
    });

    tl.fromTo(cta, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }, '-=0.3');

    const scrollTl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
    cards.forEach((card, index) => {
      scrollTl.to(card, { y: index % 2 === 0 ? -40 : -60, ease: 'none' }, 0);
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => { if (st.vars.trigger === section) st.kill(); });
    };
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4">
            Our Portfolio of<br />Pioneering Design
          </h2>
          <p className="text-neutral-600 max-w-lg leading-relaxed">
            Explore our selected works that demonstrate our commitment to design excellence, innovation, and client satisfaction
          </p>
        </div>

        {/* Masonry Grid */}
        <div ref={gridRef} className="grid md:grid-cols-3 gap-6">

          {/* Left - Large */}
          <div className="portfolio-card md:row-span-2">
            <div className="group relative h-full min-h-[500px] md:min-h-full rounded-2xl overflow-hidden cursor-pointer card-lift">
              <img src={portfolioItems[0].image} alt={portfolioItems[0].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <DesktopOverlay title={portfolioItems[0].title} />
              <MobileCaption title={portfolioItems[0].title} description={portfolioItems[0].description} tag={portfolioItems[0].tag} />
            </div>
          </div>

          {/* Center - Two Small */}
          <div className="flex flex-col gap-6">
            <div className="portfolio-card">
              <div className="group relative h-60 rounded-2xl overflow-hidden cursor-pointer card-lift">
                <img src={portfolioItems[1].image} alt={portfolioItems[1].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <DesktopOverlay title={portfolioItems[1].title} />
                <MobileCaption title={portfolioItems[1].title} description={portfolioItems[1].description} tag={portfolioItems[1].tag} />
              </div>
            </div>
            <div className="portfolio-card">
              <div className="group relative h-60 rounded-2xl overflow-hidden cursor-pointer card-lift">
                <img src={portfolioItems[2].image} alt={portfolioItems[2].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <DesktopOverlay title={portfolioItems[2].title} />
                <MobileCaption title={portfolioItems[2].title} description={portfolioItems[2].description} tag={portfolioItems[2].tag} />
              </div>
            </div>
          </div>

          {/* Right - Large */}
          <div className="portfolio-card md:row-span-2">
            <div className="group relative h-full min-h-[500px] md:min-h-full rounded-2xl overflow-hidden cursor-pointer card-lift">
              <img src={portfolioItems[3].image} alt={portfolioItems[3].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <DesktopOverlay title={portfolioItems[3].title} />
              <MobileCaption title={portfolioItems[3].title} description={portfolioItems[3].description} tag={portfolioItems[3].tag} />
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button ref={ctaRef} className="btn-outline">See More Projects</button>
        </div>
      </div>
    </section>
  );
}
