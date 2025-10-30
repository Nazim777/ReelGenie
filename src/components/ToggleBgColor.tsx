'use client';
import { useColorMode } from '@/app/_context/ColorModeContext';
import { useState } from 'react';

export default function ColorModeDropdown() {
  const { mode, setMode } = useColorMode();
  const [open, setOpen] = useState(false);

  const modes = [
    { label: 'Default', value: 'default' },
    { label: 'Dark', value: 'dark' },
    { label: 'Green', value: 'green' },
    { label: 'Orange', value: 'orange' },
  ];

  // Define colors for dropdown based on mode
  const modeBg = {
    default: 'bg-white text-gray-700',
    dark: 'bg-gray-800 text-gray-200',
    green: 'bg-green-700 text-white',
    orange: 'bg-orange-500 text-white',
  };

  const hoverBg = {
    default: 'hover:bg-gray-100',
    dark: 'hover:bg-gray-700',
    green: 'hover:bg-green-600',
    orange: 'hover:bg-orange-400',
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium focus:outline-none ${modeBg[mode]}`}
      >
        Mode: {mode.charAt(0).toUpperCase() + mode.slice(1)}
      </button>

      {open && (
        <div
          className={`absolute mt-2 w-36 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${modeBg[mode]}`}
        >
          {modes.map((m) => (
            <div
              key={m.value}
              onClick={() => {
                setMode(m.value as any);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 ${hoverBg[mode]} ${
                mode === m.value ? 'font-bold' : ''
              }`}
            >
              {m.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
