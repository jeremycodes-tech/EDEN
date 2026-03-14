import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 25, suffix: '+', label: 'Years of Excellence in Architecture & Design' },
  { value: 500, suffix: '+', label: 'Projects Successfully Completed' },
  { value: 98, suffix: '%', label: 'Our Client Retention Rate' },
  { value: 15, suffix: '+', label: 'Countries with Our Projects' },
];

const partners = [
  { name: 'CNBC', logo: 'CNBC' },
  { name: 'officend', logo: 'officend' },
  { name: 'ARCONIC', logo: 'ARCONIC' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    const partnersEl = partnersRef.current;
    const statsEl = statsRef.current;

    if (!section || !title || !desc || !partnersEl || !statsEl) return;

    const partnerLogos = partnersEl.querySelectorAll('.partner-logo');
    const statItems = statsEl.querySelectorAll('.stat-item');

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    // Title slide from left
    tl.fromTo(
      title,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'expo.out' }
    );

    // Description fade in
    tl.fromTo(
      desc,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'smooth' },
      '-=0.3'
    );

    // Partner logos scale in
    tl.fromTo(
      partnerLogos,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    // Stats items with number counter animation
    statItems.forEach((item, index) => {
      const numberEl = item.querySelector('.stat-number');
      const labelEl = item.querySelector('.stat-label');
      const suffixEl = item.querySelector('.stat-suffix');
      const value = stats[index].value;

      // Slide up
      tl.fromTo(
        item,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'expo.out' },
        `-=${index === 0 ? 0.2 : 0.4}`
      );

      // Number count up
      const counter = { val: 0 };
      tl.to(
        counter,
        {
          val: value,
          duration: 0.5,
          ease: 'expo.out',
          onUpdate: () => {
            if (numberEl) {
              numberEl.textContent = Math.round(counter.val).toString();
            }
          },
        },
        '-=0.4'
      );

      // Suffix fade in
      if (suffixEl) {
        tl.fromTo(
          suffixEl,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'smooth' },
          '-=0.3'
        );
      }

      // Label fade in
      if (labelEl) {
        tl.fromTo(
          labelEl,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'smooth' },
          '-=0.2'
        );
      }
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
      id="about"
      className="relative py-24 lg:py-32 bg-[#F0EDE6]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Company Info */}
          <div>
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl font-semibold text-black mb-6"
            >
              About Company
            </h2>
            <p
              ref={descRef}
              className="text-neutral-600 text-lg leading-relaxed mb-10"
            >
              At EDEN, we believe that architecture is more than just buildings; it's about creating environments that enhance human experience. Our team of passionate architects and designers work tirelessly to transform your vision into reality, creating spaces that inspire, comfort, and endure for generations.
            </p>

            {/* Partner Logos */}
            <div ref={partnersRef} className="flex items-center gap-8">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="partner-logo text-neutral-400 hover:text-black transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span className="text-lg font-semibold tracking-wide">
                    {partner.logo}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item p-6 rounded-2xl hover:bg-white/60 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="stat-number text-4xl md:text-5xl font-semibold text-black">
                    0
                  </span>
                  <span className="stat-suffix text-4xl md:text-5xl font-semibold text-black opacity-0">
                    {stat.suffix}
                  </span>
                </div>
                <p className="stat-label text-sm text-neutral-500 leading-relaxed opacity-0">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative diagonal line */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="100"
          x2="100"
          y2="0"
          stroke="currentColor"
          strokeWidth="0.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </section>
  );
}
