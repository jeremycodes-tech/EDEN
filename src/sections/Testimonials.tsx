import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "EDEN transformed our vision into a stunning reality. Their attention to detail and innovative approach exceeded all expectations. The team's dedication to excellence is truly remarkable.",
    name: 'Sarah Mitchell',
    title: 'CEO, Mitchell Enterprises',
    image: '/testimonial-1.jpg',
  },
  {
    quote: "Working with EDEN was an incredible experience. They understood our needs perfectly and delivered beyond what we imagined. Our new office space has transformed how our team works.",
    name: 'James Chen',
    title: 'Director, Chen Holdings',
    image: '/testimonial-2.jpg',
  },
  {
    quote: "The team's expertise in architecture and design is unmatched. Our new space has transformed how we work and live. I couldn't recommend them more highly.",
    name: 'Emily Roberts',
    title: 'Founder, Roberts Design Co',
    image: '/testimonial-3.jpg',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteIconRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback((index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = carousel.querySelectorAll('.testimonial-card');
    const current = activeIndexRef.current;

    gsap.to(cards[current], {
      x: index > current ? -80 : 80,
      opacity: 0,
      duration: 0.4,
      ease: 'expo.out',
    });

    gsap.fromTo(
      cards[index],
      { x: index > current ? 80 : -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'expo.out', delay: 0.15 }
    );

    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  // Auto-advance every 2 seconds
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = (activeIndexRef.current + 1) % testimonials.length;
      goToSlide(next);
    }, 2000);
  }, [goToSlide]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const quoteIcon = quoteIconRef.current;
    const carousel = carouselRef.current;
    const dots = dotsRef.current;

    if (!section || !title || !quoteIcon || !carousel || !dots) return;

    const cards = carousel.querySelectorAll('.testimonial-card');
    const dotElements = dots.querySelectorAll('.dot');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none none',
        onEnter: () => startAutoPlay(),
      },
    });

    tl.fromTo(
      title,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'expo.out' }
    );

    tl.fromTo(
      quoteIcon,
      { scale: 0, rotate: -20 },
      { scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    tl.fromTo(
      cards[0],
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' },
      '-=0.3'
    );

    tl.fromTo(
      dotElements,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, stagger: 0.1 },
      '-=0.2'
    );

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, [startAutoPlay]);

  const handleDotClick = (index: number) => {
    goToSlide(index);
    startAutoPlay(); // reset the timer on manual click
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0D1B2A 0%, #162032 50%, #0a1520 100%)',
      }}
    >
      {/* Blurred background blobs for glassmorphism depth */}
      <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#C9A96E' }} />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: '#8B6914' }} />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-semibold text-white text-center mb-16"
        >
          What Our Clients Say
        </h2>

        {/* Quote Icon (decorative) */}
        <div
          ref={quoteIconRef}
          className="absolute top-28 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ color: 'rgba(255,255,255,0.04)' }}
        >
          <Quote className="w-48 h-48" strokeWidth={1} />
        </div>

        {/* Testimonial Carousel */}
        <div ref={carouselRef} className="relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card ${index === activeIndex ? 'block' : 'hidden'}`}
            >
              {/* Glassmorphism card */}
              <div
                className="rounded-3xl p-8 md:p-12 text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                {/* Quote mark accent */}
                <div className="flex justify-center mb-6">
                  <Quote className="w-8 h-8" style={{ color: '#C9A96E' }} strokeWidth={1.5} />
                </div>

                {/* Quote text */}
                <p className="text-lg md:text-xl leading-relaxed mb-10 font-light italic" style={{ color: 'rgba(255,255,255,0.88)' }}>
                  "{testimonial.quote}"
                </p>

                {/* Divider */}
                <div className="w-12 h-px mx-auto mb-8" style={{ background: 'rgba(201, 169, 110, 0.5)' }} />

                {/* Author */}
                <div className="flex flex-col items-center">
                  <div
                    className="avatar w-16 h-16 rounded-full overflow-hidden mb-4"
                    style={{
                      border: '2px solid rgba(155, 184, 163, 0.5)',
                      boxShadow: '0 0 0 4px rgba(255,255,255,0.06)',
                    }}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm" style={{ color: '#C9A96E' }}>
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div ref={dotsRef} className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="dot transition-all duration-300"
              style={{
                width: index === activeIndex ? '28px' : '10px',
                height: '10px',
                borderRadius: '99px',
                background: index === activeIndex
                  ? '#C9A96E'
                  : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
