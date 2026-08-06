'use client';

import { useRef, useActionState, useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { LuLoader, LuShare2 } from 'react-icons/lu';
import { FiCheckCircle } from 'react-icons/fi';
import { Reveal } from '../Contact';
import { FormState, submitContactForm } from './action';
import Link from 'next/link';
import Image from 'next/image';
import { SiGithub, SiInstagram, SiTiktok } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FaArrowRightLong } from 'react-icons/fa6';


/* ─── Floating Input Component ─── */
function FloatingInput({
  id,
  name,
  label,
  type = 'text',
  delay = 0,
  disabled = false,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  delay?: number;
  disabled?: boolean;
}) {
  return (
    <Reveal delay={delay} className="relative">
      <div className="relative group">
        <input
          id={id}
          name={name}
          type={type}
          className="contact-input peer"
          placeholder=" "
          autoComplete="off"
          disabled={disabled}
          required
        />
        <label htmlFor={id} className="contact-label">
          {label}
        </label>
      </div>
    </Reveal>
  );
}

/* ─── Floating Textarea Component ─── */
function FloatingTextarea({
  id,
  name,
  label,
  delay = 0,
  disabled = false,
}: {
  id: string;
  name: string;
  label: string;
  delay?: number;
  disabled?: boolean;
}) {
  return (
    <Reveal delay={delay} className="relative">
      <div className="relative group">
        <textarea
          id={id}
          name={name}
          rows={5}
          className="contact-textarea peer"
          placeholder=" "
          disabled={disabled}
          required
        />
        <label htmlFor={id} className="contact-label">
          {label}
        </label>
      </div>
    </Reveal>
  );
}

/* ─── Contact Form Component ─── */
export default function ContactForm() {
  const [currentState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(submitContactForm, {});

  const formRef = useRef<HTMLFormElement>(null);

  // Reset form on successful submission
  useEffect(() => {
    if (currentState?.success) {
      formRef.current?.reset();
    }
  }, [currentState]);

  return (
    <>
      {/* Form header */}
      <div className="flex items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-3">
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

        <Link
          href="/contactcard"
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#00C9A7] rounded-xl hover:bg-[#24e4c2] transition-all duration-300 shadow-lg shadow-[#00C9A7]/10"
        >
          <LuShare2 size={14} />
          <span id = "all-socials">ALL SOCIALS</span>
        </Link>
      </div>

      {/* Form fields — single form wrapping all inputs */}
      <form
        ref={formRef}
        action={formAction}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FloatingInput
            id="contact-name"
            name="name"
            label="Your Name"
            delay={300}
            disabled={isPending}
          />
          <FloatingInput
            id="contact-email"
            name="email"
            label="Your Email"
            type="email"
            delay={400}
            disabled={isPending}
          />
        </div>

        <FloatingTextarea
          id="contact-message"
          name="message"
          label="Your Message"
          delay={500}
          disabled={isPending}
        />

        {/* Send button */}
        <Reveal delay={600}>
          <button
            type="submit"
            className="contact-send-btn group"
            disabled={isPending}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isPending ? (
                <>
                  <LuLoader
                    size={16}
                    className="animate-spin"
                  />
                  <span>Sending...</span>
                </>
              ) : currentState?.success ? (
                <>
                  <FiCheckCircle size={16} />
                  <span>Message Sent!</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <IoSend
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                </>
              )}
            </span>
          </button>
        </Reveal>

        {/* Status messages */}
        {currentState?.success && currentState.message && (
          <p className="text-sm text-emerald-400 text-center mt-2 animate-in fade-in duration-300">
            {currentState.message}
          </p>
        )}
        {currentState?.error && (
          <p className="text-sm text-red-400 text-center mt-2 animate-in fade-in duration-300">
            {currentState.error}
          </p>
        )}
      </form>
    </>
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
    url: 'https://www.instagram.com/azmi_nst_?igsh=a3V2N3RyaWtqNTNy',
    color: '#E4405F',
    username: '@azmi_nst_',
  },
  {
    name: 'TikTok',
    icon: <SiTiktok size={20} />,
    url: 'https://www.tiktok.com/@avgeek.idn?_r=1&_t=ZS-97CtS8imm6X',
    color: '#cdd0d1',
    username: '@avgeek.idn',
  },
];

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
            backgroundColor: isHovered
              ? `${social.color}15`
              : 'rgba(255,255,255,0.03)',
            borderColor: isHovered
              ? `${social.color}30`
              : 'rgba(255,255,255,0.06)',
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
        <FaArrowRightLong className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-all duration-300 group-hover:translate-x-0.5 ml-auto flex-shrink-0" />
      </a>
    </Reveal>
  );
}

/* ─── Contact Profile Card Component ─── */
export function ContactProfileCard() {
  return (
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
              src="/fotoabout.webp"
              alt="Muhammad Azmi Rahman Nasution"
              width={144}
              height={144}
              className="object-cover object-center w-full h-full"
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
          <div className="w-2 h-2 rounded-full bg-[#53f5ed]" />
          <span className="text-sm font-semibold text-[#00d2c7] uppercase tracking-wider">
            Student | Open for Collaboration
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-3 text-white/40">
          <HiOutlineLocationMarker
            size={16}
            className="text-[#00d2c7]/60"
          />
          <span className="text-sm font-medium">Medan, Indonesia</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2 text-white/40">
          <MdOutlineEmail size={16} className="text-[#00d2c7]/60" />
          <span className="text-sm font-medium">
            muhamadazmi1211@gmail.com
          </span>
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
      `}</style>
    </div>
  );
}
