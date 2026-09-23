import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);
  const resumeRef = useMagnetic<HTMLAnchorElement>(0.25);

  const RESUME_URL = '/prashanth.pdf';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth 3D Hover Effect using Framer Motion Springs
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Staggered Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    },
  };

  // Letter reveal for the main name
  const name = "PRASHANTH";
  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: 'spring', stiffness: 200, damping: 20 }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-28 lg:pt-0">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col justify-center px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left: Typography */}
          <motion.div 
            className="lg:col-span-7 relative z-10 min-w-0"
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-8 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              <span className="label">Full-stack Developer</span>
            </motion.div>

            <h1 className="font-display font-bold leading-[0.85] tracking-tightest flex overflow-hidden text-[clamp(3.5rem,5.5vw,6.5rem)] text-paper-50">
              {name.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
                  {char}
                </motion.span>
              ))}
            </h1>

            <motion.p variants={itemVariants} className="mt-8 max-w-xl font-display text-lg font-medium leading-tight tracking-tight text-paper-200 sm:text-xl lg:text-2xl">
              BUILDING MODERN DIGITAL EXPERIENCES WITH CODE.
            </motion.p>

            <motion.p variants={itemVariants} className="mt-6 max-w-md text-sm leading-relaxed text-paper-400 sm:text-base">
              BCA graduate and Full-stack Developer focused on building responsive web applications and practical digital solutions.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
              <div className="relative group inline-block">
                <div className="absolute -inset-1 rounded-full bg-red-600 opacity-40 blur-lg transition-opacity duration-300 group-hover:opacity-80" />
                <a
                  ref={resumeRef}
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Prashanth_Resume.pdf"
                  className="relative inline-flex items-center justify-center gap-3 rounded-full bg-red-600 px-10 py-5 font-mono text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
                >
                  Resume
                  <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
                </a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex items-center gap-3">
              <span className="h-px w-8 bg-accent-400" />
              <span className="label-accent">Open to Software Development Opportunities</span>
            </motion.div>
          </motion.div>

          {/* Right: Abstract browser mockup */}
          <motion.div 
            className="lg:col-span-5 relative z-0 hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', delay: 0.8, stiffness: 100 }}
          >
            <motion.div
              ref={visualRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative mx-auto w-full max-w-md cursor-crosshair"
            >
              <div className="absolute -inset-4 rounded-3xl bg-accent-400/5 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-ink-600 bg-ink-900 shadow-2xl" style={{ transform: 'translateZ(30px)' }}>
                {/* Top bar */}
                <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-800 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
                  <div className="ml-3 flex-1 rounded-md bg-ink-700 px-3 py-1">
                    <span className="font-mono text-[10px] text-paper-400">prashanthn.vercel.app</span>
                  </div>
                </div>

                {/* Content area */}
                <div className="space-y-3 p-4">
                  {/* Code lines */}
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <span className="font-mono text-[10px] text-accent-400">const</span>
                      <span className="font-mono text-[10px] text-paper-200">dev</span>
                      <span className="font-mono text-[10px] text-paper-400">=</span>
                      <span className="font-mono text-[10px] text-accent-300">'Prashanth'</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-mono text-[10px] text-paper-400">role:</span>
                      <span className="font-mono text-[10px] text-paper-200">'Full-stack Developer'</span>
                      <span className="font-mono text-[10px] text-ink-500">//</span>
                    </div>
                  </div>

                  {/* UI Card mock */}
                  <div className="rounded-lg border border-ink-700 bg-ink-800 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-paper-400">Dashboard</span>
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse-slow" />
                        <span className="font-mono text-[9px] text-accent-400">LIVE</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="rounded-md bg-ink-700 p-2">
                          <div className="mb-1 h-1 w-8 rounded-full bg-ink-600" />
                          <div className="font-mono text-sm font-bold text-paper-100">{['3+', '5+', '7.2'][i]}</div>
                          <div className="font-mono text-[8px] text-paper-400">{['modules', 'apis', 'cgpa'][i]}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech tags - Infinite Loop */}
                  <div className="relative flex overflow-hidden w-full">
                    {/* Gradient masks for smooth fading on edges */}
                    <div className="absolute left-0 top-0 z-10 h-full w-4 bg-gradient-to-r from-ink-900 to-transparent" />
                    <div className="absolute right-0 top-0 z-10 h-full w-4 bg-gradient-to-l from-ink-900 to-transparent" />
                    
                    <motion.div 
                      className="flex gap-1.5 min-w-max"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{ 
                        repeat: Infinity, 
                        ease: "linear", 
                        duration: 8 
                      }}
                    >
                      {[
                        'React', 'Node', 'PHP', 'MongoDB', 'SQL', 
                        'React', 'Node', 'PHP', 'MongoDB', 'SQL'
                      ].map((tech, index) => (
                        <span 
                          key={index} 
                          className="rounded-md border border-ink-600 bg-ink-800 px-2 py-1 font-mono text-[9px] text-paper-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div 
                style={{ transform: 'translateZ(60px)' }}
                className="absolute -bottom-4 -left-4 animate-float rounded-xl border border-ink-600 bg-ink-900 px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-400/10 font-mono text-xs font-bold text-accent-400">P</span>
                  <div>
                    <div className="font-mono text-[10px] font-medium text-paper-100">Building</div>
                    <div className="font-mono text-[9px] text-paper-400">web apps</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                style={{ transform: 'translateZ(80px)' }}
                className="absolute -right-2 top-8 rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-paper-300">Online</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}