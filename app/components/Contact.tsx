'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  SiGithub,
  SiInstagram,
  SiTiktok,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdOutlineEmail } from 'react-icons/md';

/* ─── Intersection Observer hook for scroll-driven reveals ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─── Reveal wrapper component ─── */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      {children}
    </div>
  );
}

/* ─── Social Media Data ─── */
const SOCIALS = [
  {
    name: 'GitHub',
    icon: <SiGithub size={20} />,
    url: 'https://github.com/yourfatherisgreen',
    color: '#FFFFFF',
    username: '@yourfatherisgreen',
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin size={20} />,
    url: 'https://www.linkedin.com/in/muhammad-azmi-rahman-nasution-0b2b72364',
    color: '#0A66C2',
    username: 'Muhammad Azmi',
  },
  {
    name: 'Instagram',
    icon: <SiInstagram size={20} />,
    url: 'https://instagram.com/azmee.rn',
    color: '#E4405F',
    username: '@azmee.rn',
  },
  {
    name: 'TikTok',
    icon: <SiTiktok size={20} />,
    url: 'https://tiktok.com/@azmee.rn',
    color: '#00F2EA',
    username: '@azmee.rn',
  },
];

/* ─── Floating Input Component ─── */
function FloatingInput({
  id,
  label,
  type = 'text',
  delay = 0,
}: {
  id: string;
  label: string;
  type?: string;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <Reveal delay={delay} className="relative">
      <div className="relative group">
        <input
          id={id}
          type={type}
          className="contact-input peer"
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          placeholder=" "
          autoComplete="off"
        />
        <label
          htmlFor={id}
          className={`contact-label ${focused || hasValue ? 'contact-label-active' : ''}`}
        >
          {label}
        </label>
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#6C63FF] to-[#00C9A7] transition-all duration-500 ease-out"
          style={{ width: focused ? '100%' : '0%' }}
        />
      </div>
    </Reveal>
  );
}

/* ─── Floating Textarea Component ─── */
function FloatingTextarea({
  id,
  label,
  delay = 0,
}: {
  id: string;
  label: string;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <Reveal delay={delay} className="relative">
      <div className="relative group">
        <textarea
          id={id}
          rows={5}
          className="contact-textarea peer"
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          placeholder=" "
        />
        <label
          htmlFor={id}
          className={`contact-label ${focused || hasValue ? 'contact-label-active' : ''}`}
        >
          {label}
        </label>
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#6C63FF] to-[#00C9A7] transition-all duration-500 ease-out rounded-b-xl"
          style={{ width: focused ? '100%' : '0%' }}
        />
      </div>
    </Reveal>
  );
}

/* ─── Social Link Component ─── */
function SocialLink({
  social,
  index,
}: {
  social: (typeof SOCIALS)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Reveal delay={300 + index * 100}>
      <a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="social-link-item group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="social-icon-wrap transition-all duration-300"
          style={{
            color: isHovered ? social.color : 'rgba(255,255,255,0.5)',
            backgroundColor: isHovered ? `${social.color}15` : 'rgba(255,255,255,0.03)',
            borderColor: isHovered ? `${social.color}30` : 'rgba(255,255,255,0.06)',
            boxShadow: isHovered ? `0 0 20px ${social.color}15` : 'none',
          }}
        >
          {social.icon}
        </div>
        <div className="social-info">
          <span className="text-xs font-semibold text-white/80 group-hover:text-white transition-colors duration-300">
            {social.name}
          </span>
          <span className="text-[10px] text-white/30 group-hover:text-white/50 transition-colors duration-300">
            {social.username}
          </span>
        </div>
        <svg
          className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-all duration-300 group-hover:translate-x-0.5 ml-auto flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </Reveal>
  );
}

/* ─── Main Contact Component ─── */
export default function Contact() {
  const [cardVisible, setCardVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isFormHovered, setIsFormHovered] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const updateRect = useCallback(() => {
    if (formRef.current) {
      rectRef.current = formRef.current.getBoundingClientRect();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setCardVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isFormHovered) {
      updateRect();
      window.addEventListener('resize', updateRect);
      window.addEventListener('scroll', updateRect, true);
    }
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [isFormHovered, updateRect]);

  const handleFormMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    setMousePos({
      x: e.clientX - rectRef.current.left,
      y: e.clientY - rectRef.current.top,
    });
  };

  return (
    <section
      id="contacts"
      className="relative z-10 w-full min-h-screen text-white font-sans overflow-hidden"
    >
      {/* ── Ambient corner glows ── */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #00C9A7 0%, transparent 70%)',
        }}
      />

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #6C63FF 1px, transparent 1px), linear-gradient(to bottom, #6C63FF 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem',
        }}
      />

      {/* ── Content ── */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* ── Header ── */}
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00C9A7]/70">
              Get In Touch
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
              Let&apos;s Connect
            </h2>
            <p className="mt-4 text-base text-white/40 max-w-lg mx-auto leading-relaxed">
              Have a project in mind or just want to say hello? Feel free to reach out.
            </p>
          </div>
        </Reveal>

        {/* ── Two-Column Layout ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">
          {/* ══════════ LEFT — Mobile-style Profile Card ══════════ */}
          <Reveal delay={100} className="w-full lg:w-[440px] flex-shrink-0">
            <div className="contact-profile-card">
              {/* Phone frame notch */}
              <div className="flex justify-center pt-4 pb-5">
                <div className="w-28 h-1 rounded-full bg-white/10" />
              </div>

              {/* Profile picture */}
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#6C63FF]/40 to-[#00C9A7]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-white/10 bg-white/5">
                    <Image
                      src="/fotoabout.jpg"
                      alt="Muhammad Azmi Rahman Nasution"
                      width={144}
                      height={144}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0d0d0d]">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
                  </div>
                </div>
              </div>

              {/* Name & details */}
              <div className="text-center px-8 mb-6">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Muhammad Azmi
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-[#6C63FF]" />
                  <span className="text-sm font-semibold text-[#6C63FF] uppercase tracking-wider">
                    Software Engineer
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3 text-white/40">
                  <HiOutlineLocationMarker size={16} className="text-[#00C9A7]/60" />
                  <span className="text-sm font-medium">Medan, Indonesia</span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-2 text-white/40">
                  <MdOutlineEmail size={16} className="text-[#00C9A7]/60" />
                  <span className="text-sm font-medium">azmirn05@gmail.com</span>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-8 mb-5">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              {/* Social Links */}
              <div className="px-5 pb-8 space-y-2.5">
                <span className="block px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/25 mb-4">
                  Social Media
                </span>
                {SOCIALS.map((social, index) => (
                  <SocialLink key={social.name} social={social} index={index} />
                ))}
              </div>

              {/* Bottom home indicator bar */}
              <div className="flex justify-center pb-3 pt-2">
                <div className="w-32 h-1 rounded-full bg-white/10" />
              </div>
            </div>
          </Reveal>

          {/* ══════════ RIGHT — Send Message Form ══════════ */}
          <Reveal delay={200} className="flex-1 w-full">
            <div
              ref={formRef}
              className="contact-form-card"
              onMouseMove={handleFormMouseMove}
              onMouseEnter={() => {
                updateRect();
                setIsFormHovered(true);
              }}
              onMouseLeave={() => setIsFormHovered(false)}
            >
              {/* Spotlight glow */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
                style={{
                  opacity: isFormHovered ? 1 : 0,
                  background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, rgba(108, 99, 255, 0.06), transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                {/* Form header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 flex items-center justify-center">
                    <MdOutlineEmail className="w-5 h-5 text-[#00C9A7]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00C9A7]/70">
                      Contact Form
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Send Me a Message
                    </h3>
                  </div>
                </div>

                {/* Form fields */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FloatingInput id="contact-name" label="Your Name" delay={300} />
                    <FloatingInput
                      id="contact-email"
                      label="Your Email"
                      type="email"
                      delay={400}
                    />
                  </div>

                  <FloatingTextarea id="contact-message" label="Your Message" delay={500} />

                  {/* Send button */}
                  <Reveal delay={600}>
                    <button
                      type="submit"
                      className="contact-send-btn group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span>Send Message</span>
                        <IoSend
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </button>
                  </Reveal>
                </form>

                {/* Footer note */}
                <Reveal delay={700}>
                  <p className="mt-6 text-[11px] text-white/25 text-center">
                    I&apos;ll get back to you within 24 hours. No spam, I promise ✨
                  </p>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Scoped Styles ── */}
      <style jsx>{`
        /* ── Profile card (mobile-style) ── */
        .contact-profile-card {
          background: rgba(13, 13, 13, 0.8);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 2rem;
          overflow: hidden;
          position: relative;
        }

        .contact-profile-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 2rem;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(108, 99, 255, 0.15),
            transparent 40%,
            transparent 60%,
            rgba(0, 201, 167, 0.15)
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* ── Social link items ── */
        :global(.social-link-item) {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          transition: all 300ms ease;
          text-decoration: none;
        }

        :global(.social-link-item:hover) {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.08);
          transform: translateX(4px);
        }

        :global(.social-icon-wrap) {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
          flex-shrink: 0;
        }

        :global(.social-info) {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        /* ── Form card ── */
        .contact-form-card {
          position: relative;
          background: rgba(13, 13, 13, 0.6);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1.5rem;
          padding: 2rem;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .contact-form-card {
            padding: 2.5rem;
          }
        }

        .contact-form-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(108, 99, 255, 0.1),
            transparent 50%,
            rgba(0, 201, 167, 0.1)
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* ── Input styles ── */
        :global(.contact-input) {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 18px 16px 8px;
          font-size: 14px;
          color: #ffffff;
          outline: none;
          transition: all 300ms ease;
          font-family: inherit;
        }

        :global(.contact-input:focus) {
          border-color: rgba(108, 99, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.08);
        }

        :global(.contact-textarea) {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 18px 16px 8px;
          font-size: 14px;
          color: #ffffff;
          outline: none;
          transition: all 300ms ease;
          resize: none;
          font-family: inherit;
        }

        :global(.contact-textarea:focus) {
          border-color: rgba(108, 99, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.08);
        }

        /* ── Floating label ── */
        :global(.contact-label) {
          position: absolute;
          top: 50%;
          left: 16px;
          transform: translateY(-50%);
          font-size: 14px;
          color: rgba(255, 255, 255, 0.3);
          pointer-events: none;
          transition: all 250ms ease;
        }

        :global(.contact-textarea ~ .contact-label) {
          top: 18px;
          transform: none;
        }

        :global(.contact-label-active),
        :global(.contact-input:focus ~ .contact-label),
        :global(.contact-input:not(:placeholder-shown) ~ .contact-label),
        :global(.contact-textarea:focus ~ .contact-label),
        :global(.contact-textarea:not(:placeholder-shown) ~ .contact-label) {
          top: 6px;
          transform: none;
          font-size: 10px;
          color: rgba(0, 201, 167, 0.7);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 600;
        }

        /* ── Send button ── */
        :global(.contact-send-btn) {
          position: relative;
          width: 100%;
          padding: 16px 32px;
          border-radius: 14px;
          border: none;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #000000;
          background: linear-gradient(135deg, #00C9A7, #6C63FF);
          cursor: pointer;
          overflow: hidden;
          transition: all 400ms ease;
        }

        :global(.contact-send-btn::before) {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #6C63FF, #00C9A7);
          opacity: 0;
          transition: opacity 400ms ease;
        }

        :global(.contact-send-btn:hover::before) {
          opacity: 1;
        }

        :global(.contact-send-btn:hover) {
          transform: translateY(-2px);
          box-shadow:
            0 8px 32px rgba(108, 99, 255, 0.3),
            0 4px 16px rgba(0, 201, 167, 0.2);
        }

        :global(.contact-send-btn:active) {
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
