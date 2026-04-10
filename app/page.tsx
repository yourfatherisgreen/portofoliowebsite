import Background from '@app/ui/background/background';
import Navbar from '@app/ui/background/nav/navbar';
import ShiftingText from './ui/background/shifting/shiftingtext';

export default function Page() {
  return (
    <main className="relative w-full ml-0">
      <section className="relative min-h-screen w-full">
        <Background />
        <Navbar />
        <div className="relative z-20 container ml-5 px-6 pt-32 md:pt-48 pb-20 ">
          <div className="relative max-w-4xl">
            <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-slate-400 uppercase mb-6 block animate-fade-in">
              Creative Developer
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white leading-[0.9] tracking-tighter mb-8">
              Hi, I'm Muhammad Azmi
            </h1>

            <p className="text-2xl md:text-4xl font-medium text-slate-300 mb-8">
              I'm a{' '}
              <span className="font-bold ">
                <ShiftingText />
              </span>
            </p>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
              Crafting high-performance digital experiences through the lens of
              architectural precision and chromatic brutalism.
            </p>
            <div className="flex flex-wrap gap-4 mt-12">
              <button className="px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-slate-200 transition-all duration-300 shadow-xl shadow-white/5 ">
                Download Resume
              </button>
              <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300">
                Contact Me
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 z-10 hidden md:block">
          <div className="w-px h-50 bg-gradient-to-t from-indigo-500 to-transparent opacity-50" />
        </div>
      </section>
      <section className="relative z-10 min-h-screen ml-0">
        <Background />
        <div className=" flex justify-center">
          <h1 className="text-6xl text-white">About me</h1>
        </div>
      </section>
    </main>
  );
}
