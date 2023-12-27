import { Actions } from '@/components/layout/main-layout/actions';
import { Logo } from '@/components/layout/main-layout/nav-logo';
import { Search } from '@/components/layout/main-layout/search';

export const MainNavigation = () => {
  return (
    <nav className="fixed top-0 w-full h-14 z-[49] bg-secondary px-2 lg:px-4 flex justify-between items-center shadow shadow-black border-b border-black">
      <Logo />
      <Search />
      <Actions />
    </nav>
  );
};
