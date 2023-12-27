import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import Image from 'next/image';
const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
});
export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition ">
        <div className="bg-primary rounded-full  p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
          <Image src="/logo.svg" alt="Pinnacle" height={32} width={32} />
        </div>
        <div className={cn(font.className, 'hidden lg:block')}>
          <p className="text-lg font-semibold">Pinnacle</p>
          <p className="text-xs text-muted-foreground">Creator dashboard</p>
        </div>
      </div>
    </Link>
  );
};
