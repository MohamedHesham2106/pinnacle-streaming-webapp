import { WifiOff } from 'lucide-react';
interface IOfflineVideoProps {
  username: string;
}

export const OfflineVideo = ({ username }: IOfflineVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center bg-background/50   drop-shadow-md">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <p className="text-muted-foreground">
        <span className="text-primary font-semibold">{username}</span> is offline
      </p>
    </div>
  );
};
