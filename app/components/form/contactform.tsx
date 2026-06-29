'use client';

import { useState, useRef, useActionState, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { LuLoader } from 'react-icons/lu';
import { FiCheckCircle } from 'react-icons/fi';
import { Reveal } from '../Contact';
import { FormState, submitContactForm } from './action';

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
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <Reveal delay={delay} className="relative">
      <div className="relative group">
        <input
          id={id}
          name={name}
          type={type}
          className="contact-input peer"
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          placeholder=" "
          autoComplete="off"
          disabled={disabled}
          required
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
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <Reveal delay={delay} className="relative">
      <div className="relative group">
        <textarea
          id={id}
          name={name}
          rows={5}
          className="contact-textarea peer"
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          placeholder=" "
          disabled={disabled}
          required
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
