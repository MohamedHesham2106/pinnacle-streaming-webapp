'use client';

import { useIsClient } from 'usehooks-ts';
import { useSidebar } from '@/hooks/use-sidebar';

import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import { ToggleSkeleton } from '@/components/layout/main-layout/sidebar/sidebar-toggle';
import { RecommendedSkeleton } from '@/components/layout/main-layout/sidebar/recommended';
import { FollowingSkeleton } from '@/components/layout/main-layout/sidebar/following';

export const Wrapper = ({ children }: PropsWithChildren) => {
  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  if (!isClient)
    // Server Side Rendering Skeleton
    //! Different from Suspense (handle RSC)
    return (
      <aside className="fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
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
