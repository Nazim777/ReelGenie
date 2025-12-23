
import React from 'react';
import { Upload, Palette, Wand2, Download, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Upload Script",
    description: "Provide text or images for your video. Our AI analyzes your content to build the perfect scene.",
    icon: <Upload className="w-7 h-7" />,
    color: "from-blue-600 to-blue-400 shadow-blue-500/20"
  },
  {
    id: 2,
    title: "Select Style",
    description: "Choose animation and visual style. From cinematic realism to vibrant neon anime aesthetics.",
    icon: <Palette className="w-7 h-7" />,
    color: "from-purple-600 to-purple-400 shadow-purple-500/20"
  },
  {
    id: 3,
    title: "Generate Video",
    description: "AI creates your video instantly. Advanced rendering engines bring your ideas to life.",
    icon: <Wand2 className="w-7 h-7" />,
    color: "from-pink-600 to-pink-400 shadow-pink-500/20"
  },
  {
    id: 4,
    title: "Download",
    description: "Save it or post on social media. High-quality exports ready for TikTok, Reels, and Shorts.",
    icon: <Download className="w-7 h-7" />,
    color: "from-orange-600 to-orange-400 shadow-orange-500/20"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">The Path to <span className="text-purple-500">Viral Content</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Create professional short-form content in minutes without any technical skills or expensive gear.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step) => (
            <div key={step.id} className="relative group">
              <div className="glass p-10 rounded-[3rem] border border-white/5 hover:border-white/20 transition-all duration-500 h-full flex flex-col group-hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  <div className="text-white">{step.icon}</div>
                </div>
                
                <div className="text-xs font-black text-white/20 mb-3 uppercase tracking-[0.2em]">Step 0{step.id}</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                  {step.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-bold text-gray-500 group-hover:text-white transition-colors cursor-pointer">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              
              {step.id < 4 && (
                <div className="hidden lg:block absolute top-[4.5rem] -right-5 w-10 h-0.5 bg-white/5 z-0">
                  <div className="w-full h-full bg-gradient-to-r from-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
