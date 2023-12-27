import { Wrapper } from '@/components/layout/creator-layout/sidebar/wrapper';
import { Toggle } from '@/components/layout/creator-layout/sidebar/toggle';
import { Navigation } from '@/components/layout/creator-layout/sidebar/navigation';

export const Sidebar = () => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
};
