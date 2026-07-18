import { Suspense } from 'react';

import Background from '@app/components/Background';
import Navbar from '@app/components/Navbar';
import ShiftingText from '@app/components/ShiftingText';
import AboutMe from '@app/components/AboutMe';
import TextType from './components/TextType';
import Skills from './components/Skills';
import Projects from '@app/components/Projects';
import Contact from '@app/components/Contact';
import GitHubStats, {
  GitHubStatsSkeleton,
} from '@app/components/GitHubStats';
export default function Page() {
  return (
    <main className="relative w-full ml-0">
      <section id="herosec" className="relative min-h-screen w-full ">
        <Background />
        <Navbar />
        <div className="relative z-20 container px-6 pt-28 md:pt-40 pb-20 mx-auto">
          <div className="grid min-h-[calc(100vh-11rem)] items-center gap-12 lg:grid-cols-[minmax(0,0.94fr)_minmax(390px,0.76fr)]">
            <div className="relative max-w-3xl">
            <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-[#00C9A7] uppercase mb-6 block animate-fade-in">
             IT Student | Web Development Enthusiast
            </span>
            <TextType
              text={['Hi, Im Muhammad Azmi']}
              as="h1"
              className="font-display origin-left scale-x-[0.98] text-3xl md:text-5xl lg:text-8xl font-black text-white leading-[0.93] tracking-[0] mb-3 md:mb-4"
              typingSpeed={60}
              pauseDuration={1000000}
              showCursor={true}
              cursorCharacter="_"
              deletingSpeed={50}
              variableSpeed={{ min: 60, max: 120 }}
              cursorBlinkDuration={0.5}
              
            />
            <p className="text-2xl md:text-4xl font-medium text-slate-300 mb-6">
              I&apos;m a{' '}
              <span className="font-bold">
                <ShiftingText />
              </span>
            </p>

          
            <div className="flex flex-wrap gap-4 mt-12">
              <a href="#projects">
                <button className="px-8 py-4 bg-[#00C9A7] text-black font-bold text-sm  tracking-widest hover:bg-[#24e4c2] transition-all duration-300 shadow-xl shadow-[#00C9A7]/10 rounded-2xl ">
                 View Projects
                </button>
              </a>
              <a href="#contacts">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-xl
                 border border-[#00C9A7]/30 text-white font-bold text-sm  tracking-widest hover:bg-[#00C9A7]/10 transition-all duration-300 rounded-2xl ">
                  Get In Touch
                </button>
              </a>
            </div>
          </div>


          </div>
        </div>

        <div className="absolute bottom-10 right-10 z-10 hidden md:block">
          <div className="w-px h-50 bg-gradient-to-t from-[#00C9A7] to-transparent opacity-40" />
        </div>
      </section>
      <section id="about" className="relative z-10 min-h-screen ml-0">
        <AboutMe />
      </section>
      <section id="skills" className="relative z-10 min-h-screen ml-0">
        <Skills />
      </section>
      <section id="projects" className="relative z-10 min-h-screen ml-0">
        <Projects />
      </section>
      <section id="contact" className="relative z-10 min-h-screen ml-0">
        <Contact />
      </section>
      <Suspense fallback={<GitHubStatsSkeleton />}>
        <GitHubStats />
      </Suspense>
    </main>
  );
}
