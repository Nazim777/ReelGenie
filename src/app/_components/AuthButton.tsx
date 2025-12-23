import { useUser } from "@clerk/nextjs";
 import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { User, UserPlus, ArrowRight } from 'lucide-react';

interface AuthButtonProps {
  fullWidth?: boolean;
  large?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ fullWidth = false, large = false }) => {
  const [isHovered, setIsHovered] = useState(false);
const { user } = useUser();
  const router = useRouter();

  
  const handleGetStarted = () => {
    if (user) router.push("/dashboard");
    else router.push("/sign-in");
  };
  return (
    <div 
      className={`relative group ${fullWidth ? 'w-full' : 'inline-block'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500 ${isHovered ? 'animate-pulse' : ''}`}></div>
      
      <div className={`relative flex items-center bg-black rounded-xl overflow-hidden border border-white/10 transition-all duration-300 ${large ? 'h-16' : 'h-11'}`}>
        
        {/* Sign In Side */}
        <button 
          className={`flex items-center justify-center gap-2 px-6 font-bold text-gray-300 hover:text-white transition-all duration-300 border-r border-white/10 hover:bg-white/5
            ${large ? 'text-lg px-10' : 'text-sm'}
            ${isHovered ? 'w-0 px-0 opacity-0 overflow-hidden border-none' : 'w-auto opacity-100'}
          `}
        >
          <User className={large ? 'w-5 h-5' : 'w-4 h-4'} />
          <span>Sign In</span>
        </button>

        {/* Sign Up Side / Main CTA */}
        <button 
        onClick={handleGetStarted}
          className={`flex items-center justify-center gap-2 bg-white text-black font-black transition-all duration-500 h-full
            ${large ? 'text-lg px-10' : 'text-sm px-6'}
            ${isHovered ? 'flex-1 translate-x-0' : 'translate-x-0'}
            ${fullWidth ? 'flex-1' : ''}
          `}
        >
          {isHovered ? (
            <>
              <span>Join the Magic</span>
              <ArrowRight className={`${large ? 'w-5 h-5' : 'w-4 h-4'} animate-bounce-x`} />
            </>
          ) : (
            <>
              <UserPlus className={large ? 'w-5 h-5' : 'w-4 h-4'} />
              <span>Sign Up</span>
            </>
          )}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}} />
    </div>
  );
};

export default AuthButton;
