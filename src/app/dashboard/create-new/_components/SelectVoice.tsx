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

const SelectVoice = ({ onUserSelect }: SelectProps) => {
  const { mode } = useColorMode();

  const modeClasses = {
    default: 'text-gray-800 bg-white border-gray-300 placeholder-gray-400',
    dark: 'text-gray-200 bg-gray-800 border-gray-600 placeholder-gray-400',
    green: 'text-white bg-green-600 border-green-500 placeholder-green-200',
    orange: 'text-white bg-orange-500 border-orange-400 placeholder-orange-200',
  };
  const classes = modeClasses[mode];

  return (
    <div className="mt-7">
      <h2 className={`font-bold text-2xl ${mode === 'dark'? 'text-gray-200':`${mode==='default'?'text-gray-800':'text-white'}`}`}>Voice</h2>
      <p className={`${mode==='green'?'text-white':'text-gray-600'}`}>Select a voice for your video</p>
      <Select onValueChange={(value) => onUserSelect("voiceId", value)}>
        <SelectTrigger className={`w-full mt-2 p-6 text-lg ${classes}`}>
          <SelectValue placeholder="Select Voice" />
        </SelectTrigger>
        <SelectContent className={`${classes}`}>
          <SelectItem value="21m00Tcm4TlvDq8ikWAM">Rachel</SelectItem>
          <SelectItem value="EXAVITQu4vr4xnSDxMaL">Sarah</SelectItem>
          <SelectItem value="AZnzlk1XvdvUeBnXmlld">Domi</SelectItem>
          <SelectItem value="29vD33N1CtxCmqQRPOHJ">Drew</SelectItem>
          <SelectItem value="pNInz6obpgDQGcFmaJgB">Adam</SelectItem>
          <SelectItem value="CwhRBWXzGAHq8TQ4Fs17">Roger</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectVoice;
