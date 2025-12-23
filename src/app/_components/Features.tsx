
import React from 'react';
import { Zap, Camera, Music, Monitor, Globe, Shield } from 'lucide-react';

const FEATURE_LIST = [
  {
    title: "Instant Rendering",
    description: "Our distributed GPU cloud renders 1080p reels in seconds, not minutes.",
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    gradient: "from-yellow-500/10 to-transparent"
  },
  {
    title: "Cinematic Quality",
    description: "Harness the power of Veo 3.1 for Hollywood-level lighting and textures.",
    icon: <Camera className="w-5 h-5 text-blue-400" />,
    gradient: "from-blue-500/10 to-transparent"
  },
  {
    title: "AI Audio Sync",
    description: "Automatically match music beats and voiceovers to your visual flow.",
    icon: <Music className="w-5 h-5 text-purple-400" />,
    gradient: "from-purple-500/10 to-transparent"
  },
  {
    title: "Cross-Platform",
    description: "Optimized aspect ratios for TikTok, Instagram Reels, and YouTube Shorts.",
    icon: <Monitor className="w-5 h-5 text-green-400" />,
    gradient: "from-green-500/10 to-transparent"
  },
  {
    title: "Global Styles",
    description: "20+ pre-built aesthetics from Cyberpunk to Minimalist clean looks.",
    icon: <Globe className="w-5 h-5 text-orange-400" />,
    gradient: "from-orange-500/10 to-transparent"
  },
  {
    title: "Safe & Secure",
    description: "Enterprise-grade encryption for your private uploads and data.",
    icon: <Shield className="w-5 h-5 text-red-400" />,
    gradient: "from-red-500/10 to-transparent"
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
             <div className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-4">Core Technology</div>
             <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Supercharge Your <br /> Creative Workflow</h2>
             <p className="text-gray-400 text-lg">Everything you need to build a viral channel in one place.</p>
          </div>
          <button className="group flex items-center gap-2 text-sm font-bold text-white hover:text-purple-400 transition-colors bg-white/5 px-6 py-3 rounded-xl border border-white/10">
            Explore All Features
            <Zap className="w-4 h-4 group-hover:animate-pulse" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURE_LIST.map((f, i) => (
            <div key={i} className="group relative glass p-10 rounded-[2.5rem] hover:bg-white/[0.05] transition-all duration-500 border border-white/5 hover:border-white/20 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{f.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors">{f.description}</p>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity">
                <div className="w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
