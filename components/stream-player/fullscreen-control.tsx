'use client';
import { Maximize, Minimize } from 'lucide-react';
import { Hint } from '../hint';
interface IFullScreenControlProps {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}
export const FullScreenControl = ({ isFullScreen, toggleFullScreen }: IFullScreenControlProps) => {
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen';

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button
          onClick={toggleFullScreen}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg "
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
};
