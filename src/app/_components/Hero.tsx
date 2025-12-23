
import React from 'react';
import { Sparkles, Zap, ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full"></div>
      <div className="absolute top-40 -right-20 w-[400px] h-[400px] bg-orange-600/10 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-white/10 mb-10 group cursor-pointer hover:border-white/20 transition-all">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-gray-300">Genie v3.1 is live: Faster & Smarter</span>
          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
          Ideas Into <br />
          <span className="gradient-text">Viral Reels</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          The ultimate AI video engine. Upload scripts or images and let ReelGenie build cinematic masterpieces ready for TikTok and Shorts.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-3 text-lg"
          >
            <Sparkles className="w-6 h-6" />
            Start Generating
          </button>
          <button className="w-full sm:w-auto px-10 py-5 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 border border-white/10 text-lg">
            <Play className="w-5 h-5 fill-white" />
            Watch Demo
          </button>
        </div>

        {/* Interactive Video Preview Mockup */}
        <div className="mt-24 max-w-5xl mx-auto relative group perspective-1000">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          
          <div className="relative glass rounded-[2.5rem] p-3 border border-white/10 shadow-2xl overflow-hidden transform group-hover:rotate-x-1 transition-transform duration-700">
             <div className="relative aspect-video rounded-2xl overflow-hidden">
                <div className="relative w-full h-full overflow-hidden group">
  <Image
    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200&h=675"
    alt="ReelGenie Dashboard Preview"
    fill
    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
    sizes="(max-width: 768px) 100vw, 1200px"
  />
</div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all border border-white/20 group/play">
                    <div className="w-0 h-0 border-t-[18px] border-t-transparent border-l-[30px] border-l-white border-b-[18px] border-b-transparent ml-2 group-hover/play:scale-110 transition-transform"></div>
                  </div>
                </div>

                {/* Floating UI Elements for Interactivity */}
                <div className="absolute bottom-8 left-8 p-4 glass rounded-2xl border border-white/10 animate-float hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-400 font-bold uppercase">Processing</div>
                      <div className="text-sm font-black">AI Style Render</div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .rotate-x-1 { transform: rotateX(2deg); }
      `}} />
    </section>
  );
};

export default Hero;
