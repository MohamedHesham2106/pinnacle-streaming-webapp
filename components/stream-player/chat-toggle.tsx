'use client';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { useChatSidebar } from '@/hooks/use-chat-sidebar';

export const ChatToggle = () => {
  const { collapsed, onCollapse, onExpand } = useChatSidebar((state) => state);

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };
  const label = collapsed ? 'Expand chat' : 'Collapse chat';
  return (
    <Hint label={label} side="left" asChild>
      <Button
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
        onClick={onToggle}
        aria-label={label}
        aria-pressed={collapsed}
      >
        <Icon className="w-4 h-4" />
      </Button>
    </Hint>
  );
};
