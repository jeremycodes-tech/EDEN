import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Arch Design',
    description: 'From initial concept development and schematic design',
    image: '/service-arch.jpg',
  },
  {
    number: '02',
    title: 'Interior Design',
    description: 'Creating cohesive interior spaces that reflect your style',
    image: '/service-interior.jpg',
  },
  {
    number: '03',
    title: 'Urban Planning',
    description: 'Designing the spaces between buildings & outdoors',
    image: '/service-urban.jpg',
  },
  {
    number: '04',
    title: 'Project Manage',
    description: 'Overseeing & control the entire construction process',
    image: '/service-project.jpg',
  },
  {
    number: '05',
    title: 'Luxury Residences',
    description: 'Crafting bespoke multi-story homes with premium finishes',
    image: '/service-luxury-1.jpg',
  },
  {
    number: '06',
    title: 'Signature Villas',
    description: 'Dramatic contemporary villas designed to make a statement',
    image: '/service-luxury-2.jpg',
  },
];

const DESKTOP_CARD_WIDTH = 320;
const GAP = 24;
const DESKTOP_CARDS_VISIBLE = 3;

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMobileRef = useRef(false);

  const getStepWidth = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return DESKTOP_CARD_WIDTH + GAP;
    if (isMobileRef.current) {
      return wrapper.offsetWidth + GAP;
    }
    return DESKTOP_CARD_WIDTH + GAP;
  }, []);

  const getMaxIndex = useCallback(() => {
    if (isMobileRef.current) return services.length - 1;
    return Math.max(0, services.length - DESKTOP_CARDS_VISIBLE);
  }, []);

  const moveTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, getMaxIndex()));
    currentIndexRef.current = clamped;
    setCurrentIndex(clamped);
    gsap.to(track, {
      x: -clamped * getStepWidth(),
      duration: 0.55,
      ease: 'expo.out',
    });
  }, [getMaxIndex, getStepWidth]);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const delay = isMobileRef.current ? 2000 : 3000;
    intervalRef.current = setInterval(() => {
      const next = currentIndexRef.current >= getMaxIndex() ? 0 : currentIndexRef.current + 1;
      moveTo(next);
    }, delay);
  }, [moveTo, getMaxIndex]);

  const handleNav = (dir: 'left' | 'right') => {
    const next = dir === 'left' ? currentIndexRef.current - 1 : currentIndexRef.current + 1;
    moveTo(next);
    startAutoPlay();
  };

  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    checkMobile();

    // Set card widths in JS so GSAP offset is always exact
    const applyCardWidths = () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;
      const cards = track.querySelectorAll<HTMLDivElement>('.service-card');
      const w = isMobileRef.current ? wrapper.offsetWidth : DESKTOP_CARD_WIDTH;
      cards.forEach(c => { c.style.width = `${w}px`; });
    };

    const onResize = () => {
      checkMobile();
      applyCardWidths();
      // Snap current index to new pixel position
      gsap.set(trackRef.current, { x: -currentIndexRef.current * getStepWidth() });
    };

    applyCardWidths();
    window.addEventListener('resize', onResize);

    const section = sectionRef.current;
    const title = titleRef.current;
    const track = trackRef.current;
    if (!section || !title || !track) return;

    const cards = track.querySelectorAll('.service-card');
    const navButtons = title.querySelectorAll('.nav-btn');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none none',
        onEnter: () => startAutoPlay(),
      },
    });

    tl.fromTo(title.querySelector('h2'), { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });
    tl.fromTo(navButtons, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }, '-=0.3');
    tl.fromTo(cards, { rotateY: -90, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'expo.out' }, '-=0.2');

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(st => { if (st.vars.trigger === section) st.kill(); });
    };
  }, [startAutoPlay, getStepWidth]);

  return (
    <section ref={sectionRef} id="services" className="relative py-24 lg:py-32 bg-[#1E2A22] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div ref={titleRef} className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Services we provide</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('left')}
              disabled={currentIndex === 0}
              className="nav-btn w-12 h-12 rounded-full border border-[#3A4E3F] text-[#9BB8A3] flex items-center justify-center hover:bg-white hover:text-[#1E2A22] hover:border-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleNav('right')}
              disabled={currentIndex >= getMaxIndex()}
              className="nav-btn w-12 h-12 rounded-full border border-[#3A4E3F] text-[#9BB8A3] flex items-center justify-center hover:bg-white hover:text-[#1E2A22] hover:border-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel wrapper — full width clip */}
        <div ref={wrapperRef} className="overflow-hidden w-full" style={{ perspective: '1000px' }}>
          <div
            ref={trackRef}
            className="flex"
            style={{ gap: `${GAP}px`, transformStyle: 'preserve-3d' }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card flex-shrink-0 group cursor-pointer"
                style={{
                  // Width is set dynamically in JS via applyCardWidths()
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div className="card-lift rounded-2xl overflow-hidden bg-[#2A3830] border border-[#3A4E3F] h-full">
                  <div className="img-zoom relative h-56 md:h-64 overflow-hidden border-b border-[#3A4E3F]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-white">{service.number}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <p className="text-[#9BB8A3] text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => { moveTo(index); startAutoPlay(); }}
              className="transition-all duration-300"
              style={{
                height: '6px',
                borderRadius: '99px',
                width: index === currentIndex ? '24px' : '6px',
                background: index === currentIndex ? '#9BB8A3' : 'rgba(155,184,163,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
