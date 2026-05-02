'use client';
import { useEffect, useState } from 'react';

// import profilePhoto from "@/assets/your-photo.jpg";

export default function AboutMe() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const fadeUp = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`;

  return (
    <section className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-6 py-16 md:py-20 text-white font-sans">
      {/* ── Header ── */}
      <div className={`text-center mb-10 md:mb-14 ${fadeUp('delay-[100ms]')}`}>
        <h1 className="font-black uppercase tracking-widest text-4xl sm:text-5xl md:text-6xl leading-none">
          About Me
        </h1>
        <p className="mt-3 text-xs sm:text-sm tracking-[0.2em] uppercase text-white/50 font-light">
          Brief introduction about myself
        </p>
      </div>

      {/* ── Main content ── */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[340px_1fr] gap-10 md:gap-14 items-start">
        {/* Photo */}
        <div
          className={`mx-auto md:mx-0 w-64 sm:w-72 md:w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 bg-white/5 flex items-center justify-center flex-shrink-0 ${fadeUp('delay-[200ms]')}`}
        >
          {/* Replace with your image:
              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" /> */}
          <svg
            className="w-28 h-28 text-white/20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-6">
          {/* Bio */}
          <p
            className={`text-base sm:text-lg leading-relaxed text-white/80 font-light ${fadeUp('delay-[300ms]')}`}
          >
            Management Informatics student that currently focusing on web
            development. My focus is to build an efficient software that is
            function well and had a pleasing UI UX. I used modern tech stack
            such as Next.js, TypeScript and PHP Laravel.
          </p>

          {/* Divider */}
          <div
            className={`w-full h-px bg-white/20 ${fadeUp('delay-[350ms]')}`}
          />

          {/* Education */}
          <div className={`flex flex-col gap-3 ${fadeUp('delay-[400ms]')}`}>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-white flex-shrink-0" />
              <h2 className="font-bold uppercase tracking-[0.18em] text-base sm:text-lg">
                Education
              </h2>
            </div>
            <ul className="pl-5 flex flex-col gap-2">
              <li className="list-disc text-sm sm:text-base text-white/80 font-light leading-relaxed marker:text-white">
                SMA NEGERI 2 MEDAN (2022–2025)
              </li>
              <li className="list-disc text-sm sm:text-base text-white/80 font-light leading-relaxed marker:text-white">
                Politeknik Negeri Medan (Since 2025)
              </li>
            </ul>
            <div className="pl-2 flex flex-col gap-1">
              <p className="text-sm text-white/50 font-light">
                Last GPA : 3.80
              </p>
              <p className="text-sm text-white/50 font-light">
                Achievement : – 2nd Place in Management Informatics Web Design
                competition
              </p>
            </div>
          </div>

          {/* Career */}
          <div className={`flex flex-col gap-3 ${fadeUp('delay-[500ms]')}`}>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-white flex-shrink-0" />
              <h2 className="font-bold uppercase tracking-[0.18em] text-base sm:text-lg">
                Career
              </h2>
            </div>
            <ul className="pl-5 flex flex-col gap-2">
              <li className="list-disc text-sm sm:text-base text-white/80 font-light leading-relaxed marker:text-white">
                English tutor for Sainsin (Since July 2025)
              </li>
              <li className="list-disc text-sm sm:text-base text-white/80 font-light leading-relaxed marker:text-white">
                No IT Career yet
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
