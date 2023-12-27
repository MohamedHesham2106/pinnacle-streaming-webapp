import { Container } from '@/components/layout/creator-layout/container';
import { CreatorNavigation } from '@/components/layout/creator-layout';
import { Sidebar } from '@/components/layout/creator-layout/sidebar';
import { getSelfByUsername } from '@/services/auth.service';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface ICreatorLayoutProps extends PropsWithChildren {
  params: {
    username: string;
  };
}
export default async function CreatorLayout({ params, children }: ICreatorLayoutProps) {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    redirect('/');
  }

  return (
    <>
      <CreatorNavigation />
      <div className="flex h-full pt-14">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
}
