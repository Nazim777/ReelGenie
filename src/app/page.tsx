"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Particles from "@tsparticles/react";
// import { loadFull } from "tsparticles";

// Example videos
const showcaseVideos = [
  "https://res.cloudinary.com/dpr4fr2ky/video/upload/v1761631785/remotion_videos/d0fqgrtwf1haorvhcta6.mp4",
  "https://res.cloudinary.com/dpr4fr2ky/video/upload/v1761623484/remotion_videos/xcphz8w3k0bh7yj3mmp5.mp4",
  "https://res.cloudinary.com/dpr4fr2ky/video/upload/v1761622776/remotion_videos/imfdumt8l6d2kbhtmapr.mp4",
  "https://res.cloudinary.com/dpr4fr2ky/video/upload/v1761635828/remotion_videos/mweb4atvkjs3enk6ucnf.mp4",
];

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  const handleGetStarted = () => {
    if (user) router.push("/dashboard");
    else router.push("/sign-in");
  };

  const scrollY = useMotionValue(0);
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 100]);

  // const particlesInit = async (main: any) => {
  //   await loadFull(main);
  // };

  return (
    <div
      className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-x-hidden"
      onScroll={(e) => scrollY.set(e.currentTarget.scrollTop)}
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        // init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: 0 },
          particles: {
            number: {
              value: 50,
              density: {
                enable: true
              },
            },
            color: { value: ["#FFDD00", "#FF00FF", "#00FFFF"] },
            shape: { type: "circle" },
            opacity: { value: 0.3 },
            size: { value: { min: 2, max: 6 } },
            move: {
              enable: true,
              speed: 0.6,
              direction: "none",
              outModes: "bounce", // was 'outMode'
            },
            links: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.2,
              width: 1,
            },
          },
        }}
      />

      {/* Floating Shapes */}
      <motion.div
        style={{ y: y1 }}
        className="absolute w-48 h-48 rounded-full bg-yellow-400 opacity-20 top-20 left-10 blur-3xl animate-pulse"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute w-72 h-72 rounded-full bg-purple-500 opacity-15 top-1/3 right-10 blur-2xl animate-pulse"
      />

      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center justify-center h-screen text-center px-4 relative z-10"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
          ReelGenie
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl drop-shadow">
          Turn your ideas into stunning AI-generated short videos instantly
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-yellow-400 text-black font-bold px-10 py-5 rounded-2xl text-lg hover:scale-110 transition-transform shadow-xl"
        >
          Get Started
        </button>
      </motion.section>

      {/* Steps Section */}
      <motion.section className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {[
            {
              step: 1,
              title: "Upload Script/Images",
              desc: "Provide text or images for your video.",
            },
            {
              step: 2,
              title: "Select Style",
              desc: "Choose animation and visual style.",
            },
            {
              step: 3,
              title: "Generate Video",
              desc: "AI creates your video instantly.",
            },
            {
              step: 4,
              title: "Download & Share",
              desc: "Save it or post on social media.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-800 rounded-xl p-6 text-center shadow-2xl hover:scale-105 transition-transform hover:shadow-yellow-400/50"
              initial={{ opacity: 0, y: 60, rotate: -5 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: 0,
                transition: { delay: idx * 0.3, duration: 0.8 },
              }}
              viewport={{ once: true }}
            >
              <div className="text-yellow-400 font-bold text-3xl mb-4 animate-bounce">
                Step {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Showcase Videos */}
      <motion.section className="py-24 px-6 bg-gray-900 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-10">Example Videos</h2>
        <p className="text-center text-gray-400 mb-12">
          See what you can create with ReelGenie
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {showcaseVideos.map((video, idx) => (
            <motion.div
              key={idx}
              className="rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-transform relative"
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: { delay: idx * 0.2 },
              }}
              viewport={{ once: true }}
            >
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black/60 text-white text-center p-2 font-medium">
                Example {idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-20 text-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
          Start Creating Today
        </h2>
        <button
          onClick={handleGetStarted}
          className="bg-yellow-400 text-black font-bold px-10 py-5 rounded-2xl text-lg hover:scale-110 transition-transform shadow-xl"
        >
          Get Started
        </button>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-800 py-10 mt-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center text-gray-400 space-y-2">
          <p>
            &copy; {new Date().getFullYear()} ReelGenie. All rights reserved.
          </p>
          <p>AI Video Generator | Create Shorts, Reels & Promos Instantly</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-yellow-400 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Features
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
