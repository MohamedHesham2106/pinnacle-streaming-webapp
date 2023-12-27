import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Hint label="Exit" align="center" side="bottom">
        <Button size="iconSm" variant="primary" className="text-white rounded-full" asChild>
          <Link href="/">
            <LogOut className="h-4 w-4" />
          </Link>
        </Button>
      </Hint>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
