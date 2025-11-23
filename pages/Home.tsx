import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { PORTFOLIO_IMAGES } from '../constants';
import { GridPattern } from '../components/GridPattern';
import About from './About';
import Contact from './Contact';

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isDesktop, setIsDesktop] = useState(false);

  // Check screen size to enable/disable complex parallax
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Create smooth spring physics for the scroll values
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  // Split images into 4 columns
  const chunkSize = Math.ceil(PORTFOLIO_IMAGES.length / 4);
  const column1 = PORTFOLIO_IMAGES.slice(0, chunkSize);
  const column2 = PORTFOLIO_IMAGES.slice(chunkSize, chunkSize * 2);
  const column3 = PORTFOLIO_IMAGES.slice(chunkSize * 2, chunkSize * 3);
  const column4 = PORTFOLIO_IMAGES.slice(chunkSize * 3);

  // Define Multi-directional Parallax Transforms with reduced drift for more control
  // Y = Vertical Speed (Negative moves up), X = Horizontal Drift
  
  // Col 1: Moves up fast, slight controlled drift
  const y1 = useTransform(smoothScrollY, [0, 2000], [0, isDesktop ? -600 : 0]);
  const x1 = useTransform(smoothScrollY, [0, 2000], [0, isDesktop ? -50 : 0]);

  // Col 2: Moves up slow, slight controlled drift
  const y2 = useTransform(smoothScrollY, [0, 2000], [0, isDesktop ? -300 : 0]);
  const x2 = useTransform(smoothScrollY, [0, 2000], [0, isDesktop ? 30 : 0]);

  // Col 3: Moves up medium, slight controlled drift
  const y3 = useTransform(smoothScrollY, [0, 2000], [0, isDesktop ? -450 : 0]);
  const x3 = useTransform(smoothScrollY, [0, 2000], [0, isDesktop ? -20 : 0]);

  // Col 4: Moves up faster, slight controlled drift
  const y4 = useTransform(smoothScrollY, [0, 2000], [0, isDesktop ? -700 : 0]);
  const x4 = useTransform(smoothScrollY, [0, 2000], [0, isDesktop ? 60 : 0]);

  // Helper to get deterministic "scattered" styling based on index
  const getImageStyles = (index: number) => {
     // Use fixed small widths to look like photos/cards rather than full columns
     const widths = ['w-48', 'w-64', 'w-56', 'w-72', 'w-40', 'w-60'];
     const width = widths[index % widths.length];

     // Vary alignment within the column flex container to create "messy" look
     const alignments = ['self-start', 'self-center', 'self-end', 'ml-4', 'mr-6', 'self-start'];
     const alignment = alignments[index % alignments.length];

     // Add random top margins to break grid rhythm, but less aggressive than before
     const margins = ['mt-8', 'mt-24', 'mt-4', 'mt-32', 'mt-12', 'mt-16'];
     const margin = margins[index % margins.length];

     // Random aspect ratios
     const aspectRatios = ['aspect-[3/4]', 'aspect-[4/3]', 'aspect-[1/1]', 'aspect-[9/16]'];
     const aspect = aspectRatios[index % aspectRatios.length];

     return { width, alignment, margin, aspect };
  };

  const renderMedia = (src: string, index: number, colOffset: number) => {
    const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
    const projectIndex = index + colOffset + 1;
    const styles = getImageStyles(index + colOffset);

    return (
        <div 
            key={`work-${colOffset}-${index}`} 
            className={`${styles.width} ${styles.alignment} ${styles.margin} relative group transition-all duration-500 flex-shrink-0`}
        >
            <div className={`overflow-hidden bg-stone-800 shadow-lg transition-transform duration-500 ease-out group-hover:scale-[1.05] group-hover:shadow-2xl ${styles.aspect}`}>
                {isVideo ? (
                    <video
                        src={src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label={`Preview video for project ${projectIndex}`}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 block"
                    />
                ) : (
                    <img 
                        src={src} 
                        alt={`Portfolio work ${projectIndex}`} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 block"
                        loading="lazy"
                    />
                )}
            </div>
            {/* Small floating label */}
            <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap`}>
                <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest bg-stone-100 text-stone-900 px-3 py-1 rounded-full">
                    Project {projectIndex.toString().padStart(2, '0')}
                </span>
            </div>
        </div>
    );
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      
      {/* Central Fixed Text Overlay - High Z-index for Blend Mode Effect */}
      <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none mix-blend-difference" aria-hidden="true">
        <div className="text-center w-full px-4">
            <h1 className="text-white text-[12vw] md:text-[9vw] font-semibold leading-[0.85] tracking-tighter flex flex-col items-center opacity-90">
              <span>Maryam</span>
              <span>Ahmad</span>
            </h1>
            <div className="flex justify-center items-center w-full max-w-[90vw] md:max-w-[60vw] mx-auto mt-6">
            </div>
        </div>
      </div>

      {/* Irregular Parallax Grid Container */}
      <section id="home" aria-label="Selected Works" className="relative w-full max-w-[1920px] mx-auto px-4 md:px-12 pt-40 md:pt-[20vh] pb-40 z-10 pointer-events-none md:pointer-events-auto min-h-[150vh]">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          className="absolute inset-0 h-full w-full fill-stone-500/30 stroke-stone-500/30 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] -z-10 opacity-50"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          
          {/* Column 1 */}
          <motion.div style={{ y: y1, x: x1 }} className="flex flex-col w-full">
            {column1.map((src, i) => renderMedia(src, i, 0))}
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: y2, x: x2 }} className="flex flex-col w-full pt-32">
            {column2.map((src, i) => renderMedia(src, i, chunkSize))}
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: y3, x: x3 }} className="flex flex-col w-full pt-12">
             {column3.map((src, i) => renderMedia(src, i, chunkSize * 2))}
          </motion.div>

          {/* Column 4 */}
           <motion.div style={{ y: y4, x: x4 }} className="flex flex-col w-full pt-64">
             {column4.map((src, i) => renderMedia(src, i, chunkSize * 3))}
          </motion.div>

        </div>
      </section>

      {/* Connected Sections: About then Contact */}
      <div className="relative z-30 bg-[#0a0a0a] -mt-0 md:-mt-32 pt-32 shadow-[0_-50px_100px_rgba(10,10,10,1)]">
         <div id="about">
            <About />
         </div>
         <div id="contact">
            <Contact />
         </div>
      </div>

    </div>
  );
};

export default Home;