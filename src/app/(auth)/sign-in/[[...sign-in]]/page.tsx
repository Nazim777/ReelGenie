'use client';

import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 overflow-hidden">
      
      {/* Left side image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/login.jpg"
          width={400}
          height={400}
          alt="Illustration"
          className="rounded-xl shadow-2xl object-contain"
        />
      </motion.div>

      {/* Right side form */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-center"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-blur-lg border border-white/20 p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col justify-center items-center">
          <h2 className="text-white text-3xl font-bold mb-6 text-center drop-shadow-lg">
            Welcome to <span className="text-yellow-300">ReelGenie</span>
          </h2>
          <SignIn
          appearance={{
            layout: {
              socialButtonsVariant: "iconButton",
              logoImageUrl: "/logo.png",
            },
            variables: {
              colorBackground: "#2e1065", // Purple background for form
              colorPrimary: "#facc15", // Yellow buttons
              colorText: "#ffffff",
              colorInputBackground: "#3b0764",
              colorInputText: "#fff"
            },
            elements: {
              formButtonPrimary:
                "bg-secondary hover:bg-yellow-400 text-black font-semibold transition-all duration-300",
              formFieldInput:
                "bg-primary/20 border border-secondary/30 text-white placeholder-white/60 focus:ring-2 focus:ring-secondary",
              formFieldLabel: "text-white font-medium",
              card: "bg-primary/20 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/10",
              headerTitle: "text-secondary text-2xl font-bold",
              headerSubtitle: "text-white/70",
              footerActionText: "text-white/80",
              footerActionLink: "text-secondary hover:text-yellow-400 font-semibold",
            },
          }}
        />
        </div>
      </motion.div>
    </div>
  );
}
