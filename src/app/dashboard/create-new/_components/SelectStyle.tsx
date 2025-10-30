'use client';
import Image from "next/image";
import { useState } from "react";
import { SelectProps } from "@/types/types";
import { useColorMode } from "@/app/_context/ColorModeContext";

const SelectStyle = ({ onUserSelect }: SelectProps) => {
  const { mode } = useColorMode();
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  const styleOptions = [
    { name: 'Realistic', image: '/realistic.png' },
    { name: 'Cartoon', image: '/cartoon.jpg' },
    { name: 'Comic', image: '/cosmic.jpg' },
    { name: 'WaterColor', image: '/watercolor.jpg' },
    { name: 'GTA', image: '/gta.jpg' },
  ];

  const modeClasses = {
    default: 'text-gray-800',
    dark: 'text-gray-200',
    green: 'text-white',
    orange: 'text-white',
  };

  return (
    <div className="mt-7">
      <h2 className={`font-bold text-2xl ${modeClasses[mode]}`}>Style</h2>
      <p className={`${mode==='green'?'text-white':'text-gray-600'}`}>Select your video style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((item, idx) => (
          <div
            key={idx}
            className={`relative hover:scale-105 transition-all cursor-pointer 
            ${selectedOption === item.name ? 'border-4 border-primary rounded-xl' : ''}`}
            onClick={() => {
              setSelectedOption(item.name);
              onUserSelect('imageStyle', item.name);
            }}
          >
            <Image
              src={item.image}
              height={150}
              width={350}
              alt={item.name}
              className="h-48 rounded-lg object-cover"
            />
            <h2 className="absolute p-1 bg-black/50 bottom-0 w-full text-white text-center rounded-b-lg">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
