import { Actions } from '@/components/layout/creator-layout/actions';
import { Logo } from '@/components/layout/creator-layout/nav-logo';

export const CreatorNavigation = () => {
  return (
    <nav className="fixed top-0 w-full h-14 z-[49] bg-secondary px-2 lg:px-4 flex justify-between items-center shadow shadow-black border-b  border-black">
      <Logo />
      <Actions />
    </nav>
  );
};
