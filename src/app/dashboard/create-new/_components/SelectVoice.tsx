import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@/types/types";

const SelectVoice = ({ onUserSelect }: SelectProps) => {
  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Voice</h2>
      <p className="text-gray-500">Select a voice for your video</p>
      <Select
        onValueChange={(value) => {
          onUserSelect("voiceId", value);
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Select Voice" />
        </SelectTrigger>
        <SelectContent>
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
