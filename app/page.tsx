import Background from '@app/components/Background';
import Navbar from '@app/components/Navbar';
import ShiftingText from '@app/components/ShiftingText';
import AboutMe from '@app/components/AboutMe';
import TextType from './components/TextType';
import Skills from './components/Skills';
import Projects from '@app/components/Projects';
import Contact from '@app/components/Contact';
export default function Page() {
  return (
    <main className="relative w-full ml-0">
      <section id="herosec" className="relative min-h-screen w-full ">
        <Background />
        <Navbar />
        <div className="relative z-20 container ml-5 px-6 pt-32 md:pt-48 pb-20 ">
          <div className="relative max-w-4xl">
            <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-slate-400 uppercase mb-6 block animate-fade-in">
              Creative Developer
            </span>
            <TextType
              text={['Hi, Im Muhammad Azmi']}
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white leading-[0.9] tracking-tighter mb-8"
              typingSpeed={60}
              pauseDuration={1000000}
              showCursor={true}
              cursorCharacter="_"
              deletingSpeed={50}
              variableSpeed={{ min: 60, max: 120 }}
              cursorBlinkDuration={0.5}
            />
            <p className="text-2xl md:text-4xl font-medium text-slate-300 mb-8">
              I'm a{' '}
              <span className="font-bold ">
                <ShiftingText />
              </span>
            </p>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
              Highly passionate in IT fields especially Web Development, This
              portofolio website made to elevate my personal branding and track
              my progress
            </p>
            <div className="flex flex-wrap gap-4 mt-12">
              <a href="#projects">
                <button className="px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-slate-200 transition-all duration-300 shadow-xl shadow-white/5 ">
                  See My Works
                </button>
              </a>
              <a href="#contacts">
                <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300">
                  Get In Touch
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 z-10 hidden md:block">
          <div className="w-px h-50 bg-gradient-to-t from-indigo-500 to-transparent opacity-50" />
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
    </main>
  );
}
