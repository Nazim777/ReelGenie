'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SelectProps } from "@/types/types";
import { useColorMode } from "@/app/_context/ColorModeContext";

const SelectTopic = ({ onUserSelect }: SelectProps) => {
  const { mode } = useColorMode();
  const options = ['Custom Prompt', 'Random AI', 'Scary Story', 'Historical Facts', 'Bed Time Story', 'Motivational', 'Fun Facts'];
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  const modeClasses = {
    default: 'text-gray-800 bg-white border-gray-300 placeholder-gray-400',
    dark: 'text-gray-200 bg-gray-800 border-gray-600 placeholder-gray-400',
    green: 'text-white bg-green-600 border-green-500 placeholder-green-200',
    orange: 'text-white bg-orange-500 border-orange-400 placeholder-orange-200',
  };

  const classes = modeClasses[mode];

  return (
    <div className="mt-7">
      <h2 className={`font-bold text-2xl ${mode === 'dark'? 'text-gray-200':`${mode==='default'?'text-gray-800':'text-white'}`}`}>Content</h2>
      <p className={`${mode==='green'?'text-white':'text-gray-600'}`}>What is the topic of your video?</p>

      <Select onValueChange={(value) => {
        setSelectedOption(value);
        if (value !== 'Custom Prompt') onUserSelect('topic', value);
      }}>
        <SelectTrigger className={`w-full mt-2 p-6 text-lg ${classes}`}>
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent className={`${classes}`}>
          {options.map((item, idx) => (
            <SelectItem key={idx} value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOption === 'Custom Prompt' && (
        <Textarea
          onChange={(e) => onUserSelect('topic', e.target.value)}
          className={`mt-3 ${classes}`}
          placeholder="Write prompt on which you want to generate video"
        />
      )}
    </div>
  );
};

export default SelectTopic;
