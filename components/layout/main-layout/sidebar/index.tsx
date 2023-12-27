import { getRecommended } from '@/services/recommended.service';
import {
  Recommended,
  RecommendedSkeleton
} from '@/components/layout/main-layout/sidebar/recommended';
import {
  SidebarToggle,
  ToggleSkeleton
} from '@/components/layout/main-layout/sidebar/sidebar-toggle';
import { Wrapper } from '@/components/layout/main-layout/sidebar/wrapper';
import { getFollowedUsers } from '@/services/follow.service';
import { Following, FollowingSkeleton } from '@/components/layout/main-layout/sidebar/following';

export const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();
  return (
    <Wrapper>
      <SidebarToggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};
export const SidebarSkeleton = () => {
  // Fix Flickering for sidebar
  return (
    <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background lg:w-60">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
