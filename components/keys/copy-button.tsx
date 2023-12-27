'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { CheckCheck, Copy } from 'lucide-react';
import { Hint } from '../hint';

interface ICopyButtonProps {
  value?: string;
}
export const CopyButton = ({ value }: ICopyButtonProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const onCopy = () => {
    if (!value) return;
    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };
  const Icon = isCopied ? CheckCheck : Copy;
  return (
    <Hint label="Copy" side="bottom" asChild>
      <Button onClick={onCopy} disabled={!value || isCopied} variant={'ghost'} size={'sm'}>
        <Icon className="w-4 h-4" />
      </Button>
    </Hint>
  );
};
