import { MainNavigation } from '@/components/layout/main-layout';
import { Sidebar, SidebarSkeleton } from '@/components/layout/main-layout/sidebar';
import { Container } from '@/components/layout/main-layout/container';
import { PropsWithChildren, Suspense } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <MainNavigation />
      <div className="flex h-full pt-14">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default MainLayout;
