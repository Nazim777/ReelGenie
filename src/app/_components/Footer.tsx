
import React from 'react';
import { Youtube, Twitter, Instagram, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-white/5 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-black text-white">G</div>
              <span className="text-xl font-black tracking-tight">REELGENIE</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Empowering creators worldwide with the magic of AI-driven video generation.
            </p>
            <div className="flex gap-4">
              <Twitter className="w-5 h-5 text-gray-600 hover:text-white transition-colors cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-600 hover:text-white transition-colors cursor-pointer" />
              <Youtube className="w-5 h-5 text-gray-600 hover:text-white transition-colors cursor-pointer" />
              <Github className="w-5 h-5 text-gray-600 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-white transition-colors cursor-pointer">AI Generator</li>
              <li className="hover:text-white transition-colors cursor-pointer">Styles Gallery</li>
              <li className="hover:text-white transition-colors cursor-pointer">Showcase</li>
              <li className="hover:text-white transition-colors cursor-pointer">Pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-white transition-colors cursor-pointer">Documentation</li>
              <li className="hover:text-white transition-colors cursor-pointer">Tutorials</li>
              <li className="hover:text-white transition-colors cursor-pointer">API Keys Guide</li>
              <li className="hover:text-white transition-colors cursor-pointer">Creator Blog</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Stay Updated</h4>
            <p className="text-sm text-gray-500 mb-4">Subscribe to our newsletter for free prompts.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="email@example.com"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 w-full"
              />
              <button className="bg-white text-black px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap">Join Now</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-[10px] text-gray-600">© 2025 ReelGenie AI</p>
          <div className="flex gap-6 text-[10px] text-gray-600 font-bold uppercase tracking-wider">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
