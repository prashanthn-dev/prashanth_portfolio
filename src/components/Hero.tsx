import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  const visualRef = useRef<HTMLDivElement>(null);
  const resumeRef = useMagnetic<HTMLAnchorElement>(0.25);
  const workRef = useRef<HTMLAnchorElement>(null);
  const talkRef = useRef<HTMLAnchorElement>(null);

  const RESUME_URL = '/prashanth.pdf';

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    document.querySelector(id)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      const x =
        (e.clientX - rect.left - rect.width / 2) / rect.width;

      const y =
        (e.clientY - rect.top - rect.height / 2) / rect.height;

      el.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    };

    const handleLeave = () => {
      el.style.transform =
        'perspective(1200px) rotateY(0deg) rotateX(0deg)';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const step = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-28 lg:pt-0"
    >
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col justify-center px-6 lg:px-12">

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Left: Typography */}
          <div className="lg:col-span-7 relative z-10 min-w-0">

            <div
              style={step(0.2)}
              className="mb-8 flex items-center gap-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>

              <span className="label">
                Full-stack Developer
              </span>
            </div>

            <h1 className="font-display font-bold leading-[0.85] tracking-tightest">
              <span
  style={step(0.35)}
  className="block text-[clamp(3.5rem,5.5vw,6.5rem)] leading-none text-paper-50"
>
  PRASHANTH
</span>
            </h1>

            <p
              style={step(0.7)}
              className="mt-8 max-w-xl font-display text-lg font-medium leading-tight tracking-tight text-paper-200 sm:text-xl lg:text-2xl"
            >
              BUILDING MODERN DIGITAL EXPERIENCES WITH CODE.
            </p>

            <p
              style={step(0.85)}
              className="mt-6 max-w-md text-sm leading-relaxed text-paper-400 sm:text-base"
            >
              BCA graduate and Full-stack Developer focused on
              building responsive web applications and practical
              digital solutions.
            </p>

            <div
              style={step(1)}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                ref={workRef}
                href="#work"
                onClick={scrollTo('#work')}
                className="group inline-flex items-center gap-2 rounded-full bg-accent-400 px-7 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-950 transition-colors duration-300 hover:bg-accent-300"
              >
                View My Work

                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                  ↘
                </span>
              </a>

              <a
                ref={talkRef}
                href="#contact"
                onClick={scrollTo('#contact')}
                className="group inline-flex items-center gap-2 rounded-full border border-ink-600 px-7 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-paper-100 transition-colors duration-300 hover:border-accent-400 hover:text-accent-400"
              >
                Let's Talk

                <span className="text-accent-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>

            <div
              style={step(1.15)}
              className="mt-12 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-accent-400" />

              <span className="label-accent">
                Open to Software Development Opportunities
              </span>
            </div>
          </div>

          {/* Right: Abstract browser mockup */}
         <div className="lg:col-span-5 relative z-0" style={step(0.6)}>
            <div
              ref={visualRef}
              className="relative mx-auto w-full max-w-md transition-transform duration-200 ease-out preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >

              {/* Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-accent-400/5 blur-2xl" />

              {/* Browser frame */}
              <div className="relative overflow-hidden rounded-2xl border border-ink-600 bg-ink-900 shadow-2xl">

                {/* Top bar */}
                <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-800 px-4 py-3">

                  <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />

                  <div className="ml-3 flex-1 rounded-md bg-ink-700 px-3 py-1">
                    <span className="font-mono text-[10px] text-paper-400">
                      prashanthn.vercel.app
                    </span>
                  </div>
                </div>

                {/* Content area */}
                <div className="space-y-3 p-4">

                  {/* Code lines */}
                  <div className="space-y-1.5">

                    <div className="flex gap-2">
                      <span className="font-mono text-[10px] text-accent-400">
                        const
                      </span>

                      <span className="font-mono text-[10px] text-paper-200">
                        dev
                      </span>

                      <span className="font-mono text-[10px] text-paper-400">
                        =
                      </span>

                      <span className="font-mono text-[10px] text-accent-300">
                        'Prashanth'
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="font-mono text-[10px] text-paper-400">
                        role:
                      </span>

                      <span className="font-mono text-[10px] text-paper-200">
                        'Full-stack Developer'
                      </span>

                      <span className="font-mono text-[10px] text-ink-500">
                        //
                      </span>
                    </div>
                  </div>

                  {/* UI Card mock */}
                  <div className="rounded-lg border border-ink-700 bg-ink-800 p-3">

                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-paper-400">
                        Dashboard
                      </span>

                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse-slow" />

                        <span className="font-mono text-[9px] text-accent-400">
                          LIVE
                        </span>
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">

                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="rounded-md bg-ink-700 p-2"
                        >
                          <div className="mb-1 h-1 w-8 rounded-full bg-ink-600" />

                          <div className="font-mono text-sm font-bold text-paper-100">
                            {['3+', '5+', '7.2'][i]}
                          </div>

                          <div className="font-mono text-[8px] text-paper-400">
                            {['modules', 'apis', 'cgpa'][i]}
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">

                    {['React', 'Node', 'PHP', 'MongoDB', 'SQL'].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-ink-600 bg-ink-800 px-2 py-1 font-mono text-[9px] text-paper-300"
                        >
                          {tech}
                        </span>
                      )
                    )}

                  </div>

                  {/* Mini cursor */}
                  <div className="flex items-center gap-1 pt-1">

                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      className="text-accent-400"
                    >
                      <path
                        d="M1 1L1 7L3 5L5 9L6.5 8L4.5 4L7 4Z"
                        fill="currentColor"
                      />
                    </svg>

                    <span className="font-mono text-[9px] text-paper-400">
                      cursor
                    </span>

                    <span className="h-3 w-px animate-pulse bg-accent-400" />
                  </div>

                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 animate-float rounded-xl border border-ink-600 bg-ink-900 px-4 py-3 shadow-xl">

                <div className="flex items-center gap-2">

                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-400/10 font-mono text-xs font-bold text-accent-400">
                    P
                  </span>

                  <div>
                    <div className="font-mono text-[10px] font-medium text-paper-100">
                      Building
                    </div>

                    <div className="font-mono text-[9px] text-paper-400">
                      web apps
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating status */}
              <div
                className="absolute -right-2 top-8 animate-float rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 shadow-xl"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse" />

                  <span className="font-mono text-[9px] uppercase tracking-wider text-paper-300">
                    Online
                  </span>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={step(1.3)}
          className="mt-16 flex items-center gap-2 lg:mt-12"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-400">
            Scroll
          </span>

          <div className="relative h-8 w-px overflow-hidden bg-ink-700">
            <div className="absolute top-0 h-3 w-full animate-[float_2s_ease-in-out_infinite] bg-accent-400" />
          </div>
        </div>

      </div>
    </section>
  );
}                    