import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-100 pt-24 md:pt-32 pb-20 px-4 md:px-20 selection:bg-white selection:text-black">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20"
      >
        
        {/* Contact Info */}
        <div className="flex-1 space-y-8 md:space-y-12">
            <div>
                <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 md:mb-6">Let's talk.</h1>
                <p className="text-stone-400 text-lg md:text-xl">
                    Have a project in mind? I'm always interested in new challenges and collaborations.
                </p>
            </div>

            <div className="space-y-6 md:space-y-8">
                <div>
                    <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Email</h3>
                    <a href="mailto:maryamahmt@gmail.com" className="text-xl md:text-2xl hover:text-stone-300 transition-colors break-words">maryamahmt@gmail.com</a>
                </div>
                <div>
                    <h3 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Socials</h3>
                    <nav aria-label="Social media links" className="flex flex-col space-y-2">
                        <a href="#" className="text-lg md:text-xl hover:underline underline-offset-4 w-fit">Instagram</a>
                        <a href="#" className="text-lg md:text-xl hover:underline underline-offset-4 w-fit">Twitter / X</a>
                        <a href="#" className="text-lg md:text-xl hover:underline underline-offset-4 w-fit">LinkedIn</a>
                    </nav>
                </div>
            </div>
        </div>

        {/* Form */}
        <div className="flex-1">
            <form 
                className="space-y-6 md:space-y-8" 
                action="mailto:maryamahmt@gmail.com" 
                method="post" 
                enctype="text/plain"
                aria-label="Contact form"
            >
                <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-stone-500">Name</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name"
                        aria-required="true"
                        className="w-full bg-transparent border-b border-stone-800 py-3 md:py-4 text-lg md:text-xl focus:outline-none focus:border-white transition-colors placeholder-stone-700"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-stone-500">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        aria-required="true"
                        className="w-full bg-transparent border-b border-stone-800 py-3 md:py-4 text-lg md:text-xl focus:outline-none focus:border-white transition-colors placeholder-stone-700"
                        placeholder="john@example.com"
                    />
                </div>
                 <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-stone-500">Message</label>
                    <textarea 
                        id="message"
                        name="message"
                        aria-required="true"
                        rows={4}
                        className="w-full bg-transparent border-b border-stone-800 py-3 md:py-4 text-lg md:text-xl focus:outline-none focus:border-white transition-colors resize-none placeholder-stone-700"
                        placeholder="Let's have a chat..."
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full md:w-auto group flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-stone-200 transition-colors mt-4 md:mt-8 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0a0a0a] focus:outline-none"
                    aria-label="Send message"
                >
                    Send Message
                    <Send size={18} aria-hidden="true" className="group-hover:translate-x-1 transition-transform"/>
                </button>
            </form>
        </div>

      </motion.div>
    </div>
  );
};

export default Contact;