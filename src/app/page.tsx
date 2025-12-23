'use client'
import React, { useState, useEffect } from 'react';
import Hero from './_components/Hero';
import HowItWorks from './_components/HowItWorks';
import Features from './_components/Features';
import Footer from './_components/Footer';
import AuthButton from './_components/AuthButton';
import { Menu, X, Rocket, Users, PlayCircle, Star } from 'lucide-react';
import { useUser } from "@clerk/nextjs";
 import { useRouter } from "next/navigation";
const Landing: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };
  
    const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);
  
  return (
    <div className="min-h-screen selection:bg-purple-500/30 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform">G</div>
            <span className="text-xl font-black tracking-tight uppercase hidden sm:block">REELGENIE</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </button>
            <AuthButton />
          </div>

          <button className="md:hidden p-2 glass rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/5 p-8 flex flex-col gap-8 md:hidden animate-in slide-in-from-top duration-300">
            <button onClick={() => scrollToSection('how-it-works')} className="text-xl font-bold text-left">How It Works</button>
            <button onClick={() => scrollToSection('features')} className="text-xl font-bold text-left">Features</button>
            <div className="pt-4 border-t border-white/10">
              <AuthButton fullWidth />
            </div>
          </div>
        )}
      </nav>

      <main>
        <Hero onGetStarted={() => scrollToSection('how-it-works')} />
        
        {/* Interactive Stats Bar */}
        <section className="py-12 border-y border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="flex justify-center mb-2"><Users className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" /></div>
                <div className="text-2xl font-bold">50k+</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Creators</div>
              </div>
              <div className="text-center group">
                <div className="flex justify-center mb-2"><PlayCircle className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" /></div>
                <div className="text-2xl font-bold">1.2M</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Reels Created</div>
              </div>
              <div className="text-center group">
                <div className="flex justify-center mb-2"><Star className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" /></div>
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Rating</div>
              </div>
              <div className="text-center group">
                <div className="flex justify-center mb-2"><Rocket className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" /></div>
                <div className="text-2xl font-bold">200%</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Avg Growth</div>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />
        <Features />
        
        {/* Call to Action Section - Simplified and Interactive */}
        <section className="py-32 container mx-auto px-6">
          <div className="relative glass p-12 md:p-24 rounded-[4rem] overflow-hidden text-center group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 -z-10 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-700"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full group-hover:bg-purple-500/20 transition-all"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500/10 blur-[120px] rounded-full group-hover:bg-pink-500/20 transition-all"></div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">Ready to command <br/><span className="gradient-text">the spotlight?</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-12 text-lg leading-relaxed">
              Stop spending hours editing. Let the ReelGenie handle the heavy lifting while you focus on the vision.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="px-12 py-5 bg-white text-black font-black rounded-2xl text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-white/20 active:scale-95"
               >
                 Start Creating Now
               </button>
               <button className="px-12 py-5 glass border border-white/10 text-white font-bold rounded-2xl text-lg hover:bg-white/5 transition-all">
                 Contact Sales
               </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;

