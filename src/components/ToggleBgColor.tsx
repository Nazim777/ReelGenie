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


  return (
    <div className="relative inline-block text-left">
      {/* <button
        onClick={() => setOpen(!open)}
        className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium focus:outline-none`}
      >
        Mode: {mode.charAt(0).toUpperCase() + mode.slice(1)}
      </button> */}

      {open && (
        <div
          className={`absolute mt-2 w-36 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 text-gray-200 bg-gray-800`}
        >
          {modes.map((m) => (
            <div
              key={m.value}
              onClick={() => {
                setMode(m.value as any);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-2  ${
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
