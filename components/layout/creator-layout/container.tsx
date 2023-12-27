'use client';

import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import { useCreatorSidebar } from '@/hooks/use-creator-sidebar';

export const Container = ({ children }: PropsWithChildren) => {
  const matches = useMediaQuery('(max-width:1024px)');
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div className={cn('flex-1', collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60')}>{children}</div>
  );
};
