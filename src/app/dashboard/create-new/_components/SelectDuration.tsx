'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@/types/types";
import { useColorMode } from "@/app/_context/ColorModeContext";

const SelectDuration = ({ onUserSelect }: SelectProps) => {
  const { mode } = useColorMode();

  // Tailwind classes based on mode
  const modeClasses = {
    default: {
      text: 'text-gray-800',
      bg: 'bg-white',
      border: 'border-gray-300',
      placeholder: 'text-gray-400',
    },
    dark: {
      text: 'text-gray-200',
      bg: 'bg-gray-800',
      border: 'border-gray-600',
      placeholder: 'text-gray-400',
    },
    green: {
      text: 'text-white',
      bg: 'bg-green-600',
      border: 'border-green-500',
      placeholder: 'text-green-200',
    },
    orange: {
      text: 'text-white',
      bg: 'bg-orange-500',
      border: 'border-orange-400',
      placeholder: 'text-orange-200',
    },
  };

  const classes = modeClasses[mode];

  return (
    <div className="mt-7">
      <h2 className={`font-bold text-2xl ${classes.text}`}>Duration</h2>
      <p className={`${mode==='green'?'text-white':'text-gray-600'}`}>Select the duration of your video</p>
      <Select
        onValueChange={(value) => {
          if (value !== 'Custom Prompt') onUserSelect('duration', value);
        }}
      >
        <SelectTrigger
          className={`w-full mt-2 p-6 text-lg ${classes.text} ${classes.bg} border ${classes.border}`}
        >
          <SelectValue placeholder="Select Duration" className={classes.placeholder} />
        </SelectTrigger>
        <SelectContent className={`${classes.bg} ${classes.text}`}>
          <SelectItem value="15 seconds">15 seconds</SelectItem>
          <SelectItem value="30 seconds">30 seconds</SelectItem>
          <SelectItem value="60 seconds">60 seconds</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDuration;
