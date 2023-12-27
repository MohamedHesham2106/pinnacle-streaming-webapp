import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
});
export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-primary/90 rounded-full p-1">
        <Image src="/logo.svg" alt="Logo" height={80} width={80} />
      </div>
      <div className={cn(font.className, 'flex flex-col items-center')}>
        <p className="text-xl font-semibold">Pinnacle</p>
        <p className="text-sm text-muted-foreground">Ready, set, stream!</p>
      </div>
    </div>
  );
};
