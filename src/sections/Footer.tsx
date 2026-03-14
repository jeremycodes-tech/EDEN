import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Twitter, Facebook, MapPin, Mail, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const companyLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Team', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Press', href: '#' },
];

const serviceLinks = [
  { label: 'Architecture', href: '#services' },
  { label: 'Interior Design', href: '#services' },
  { label: 'Urban Planning', href: '#services' },
  { label: 'Project Management', href: '#services' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const border = borderRef.current;
    const logo = logoRef.current;
    const columns = columnsRef.current;
    const socials = socialsRef.current;
    const bottom = bottomRef.current;

    if (!footer || !border || !logo || !columns || !socials || !bottom) return;

    const columnLinks = columns.querySelectorAll('.footer-link');
    const socialIcons = socials.querySelectorAll('.social-icon');

    // Scroll-triggered entrance animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Border draw from center
    tl.fromTo(
      border,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'expo.out' }
    );

    // Logo fade in
    tl.fromTo(
      logo,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'smooth' },
      '-=0.4'
    );

    // Column links staggered fade
    tl.fromTo(
      columnLinks,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: 'smooth' },
      '-=0.2'
    );

    // Social icons pop in
    tl.fromTo(
      socialIcons,
      { scale: 0 },
      { scale: 1, duration: 0.3, stagger: 0.06, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    // Bottom bar fade in
    tl.fromTo(
      bottom,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'smooth' },
      '-=0.2'
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === footer) st.kill();
      });
    };
  }, []);

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-white pt-16 pb-8">
      {/* Animated Top Border */}
      <div
        ref={borderRef}
        className="absolute top-0 left-0 right-0 h-px gradient-border origin-center"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div ref={logoRef} className="lg:col-span-1">
            <span className="text-2xl font-semibold text-black mb-4 block">
              EDEN
            </span>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              Designing spaces that inspire & endure. We transform visions into timeless architecture.
            </p>
            {/* Social Icons */}
            <div ref={socialsRef} className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="social-icon w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-black hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div ref={columnsRef} className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Company Links */}
            <div>
              <h4 className="text-sm font-semibold text-black mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="footer-link text-neutral-500 text-sm hover:text-black hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="text-sm font-semibold text-black mb-4">Services</h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="footer-link text-neutral-500 text-sm hover:text-black hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-semibold text-black mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="footer-link flex items-start gap-2 text-neutral-500 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>123 Design Street, New York, NY 10001</span>
                </li>
                <li>
                  <a
                    href="mailto:hello@eden.com"
                    className="footer-link flex items-center gap-2 text-neutral-500 text-sm hover:text-black transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>hello@eden.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+15551234567"
                    className="footer-link flex items-center gap-2 text-neutral-500 text-sm hover:text-black transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>+1 (555) 123-4567</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          ref={bottomRef}
          className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-neutral-400 text-sm">
            © 2024 EDEN. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-neutral-400 text-sm hover:text-black transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-neutral-400 text-sm hover:text-black transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
