'use client';

import { useCreatorSidebar } from '@/hooks/use-creator-sidebar';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export const Wrapper = ({ children }: PropsWithChildren) => {
  const { collapsed } = useCreatorSidebar((state) => state);
  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50',
        collapsed && 'lg:w-[70px]'
      )}
    >
      {children}
    </aside>
  );
};
