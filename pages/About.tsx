import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cat } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 md:pt-32 pb-20 px-4 md:px-20 selection:bg-white selection:text-black">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20"
      >
        <header className="flex-1">
          <div className="flex items-center gap-6">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 md:mb-6 text-stone-100 leading-tight">
              About Me.
            </h1>
          </div>
        </header>

        <div className="flex-1 flex flex-col gap-10 md:gap-12">
          <div className="space-y-6 md:space-y-8">
            <p className="text-stone-400 text-lg md:text-xl">
              I am a Software Engineering student exploring the intersection of code and creativity.
            </p>
            <p className="text-stone-400 text-lg md:text-xl">
              I'm currently learning about various programming domains, but my main interest lies in design and functionality. I enjoy building things that look good and work even better.
            </p>
          </div>

          <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-4">Stack</h3>
              <div className="flex flex-wrap gap-2 md:gap-3 font-['JetBrains_Mono']">
                {['Procreate', 'Git', 'GitHub', 'Figma', 'Framer', 'React', 'TypeScript', 'Tailwind'].map(tech => (
                    <span key={tech} className="bg-stone-800 px-3 py-1 text-sm font-medium rounded-full text-stone-300">
                        {tech}
                    </span>
                ))}
              </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;