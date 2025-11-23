import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-12 md:pt-32 pb-20 px-4 md:px-20">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <header className="mb-12 md:mb-20">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 tracking-tighter text-stone-100 leading-tight">
            Design <br/> <span className="text-stone-500">Engineer.</span>
          </h1>
          <div className="h-1 w-16 md:w-24 bg-white" role="presentation"></div>
        </header>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-6 md:space-y-8">
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest font-['JetBrains_Mono'] text-stone-400">Profile</h3>
            <p className="text-lg md:text-2xl leading-relaxed text-stone-100">
              I create digital experiences that blend aesthetic purity with technical precision. 
              Specializing in React development and interactive UI/UX, I build interfaces that feel alive.
            </p>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed">
              With a background in traditional graphic design and full-stack engineering, 
              my work bridges the gap between static visuals and fluid motion. 
              Currently available for freelance projects.
            </p>
          </div>

          <div className="space-y-10 md:space-y-12">
            <div>
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest mb-4 md:mb-6 font-['JetBrains_Mono'] text-stone-400">Services</h3>
              <ul className="space-y-3 md:space-y-4">
                {['UI/UX Design', 'Frontend Development', 'Motion Graphics', 'Brand Identity', 'Prototyping'].map((item) => (
                  <li key={item} className="text-base md:text-lg border-b border-stone-800 pb-2 flex justify-between items-center group cursor-pointer font-['JetBrains_Mono'] text-stone-200">
                    {item}
                    <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={18} aria-hidden="true"/>
                  </li>
                ))}
              </ul>
            </div>

            <div>
               <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest mb-4 md:mb-6 font-['JetBrains_Mono'] text-stone-400">Stack</h3>
               <div className="flex flex-wrap gap-2 md:gap-3 font-['JetBrains_Mono']">
                  {['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Node.js', 'Figma', 'WebGL'].map(tech => (
                      <span key={tech} className="bg-stone-800 px-3 py-1 text-sm font-medium rounded-full text-stone-300">
                          {tech}
                      </span>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;