'use client';
import { Volume1, Volume2, VolumeX } from 'lucide-react';
import { Hint } from '@/components/hint';
import { Slider } from '@/components/ui/slider';

interface IVolumeControlProps {
  toggleVolume: () => void;
  onChangeVolume: (volume: number) => void;
  volume: number;
}

export const VolumeControl = ({ onChangeVolume, toggleVolume, volume }: IVolumeControlProps) => {
  const isMuted = volume === 0;
  const isAboveHalf = volume > 0.5;
  let Icon = Volume1;
  if (isMuted) Icon = VolumeX;
  else if (isAboveHalf) Icon = Volume2;
  const label = isMuted ? 'Unmute' : 'Mute';
  const handleChange = (value: number[]) => {
    onChangeVolume(value[0]);
  };
  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button onClick={toggleVolume} className="text-white hover:bg-white/10 p-1.5 rounded-lg">
          <Icon className="h-6 w-6" />
        </button>
      </Hint>
      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={handleChange}
        value={[volume]}
        max={100}
        step={1}
      />
    </div>
  );
};
