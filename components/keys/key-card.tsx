'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CopyButton } from './copy-button';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IKeyCardProps {
  value: string | null;
}
export const KeyCard = ({ value }: IKeyCardProps) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className={cn('flex items-center gap-x-10', value && 'items-start')}>
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ''}
              type={show ? 'text' : 'password'}
              disabled
              placeholder="Stream key"
            />
            <CopyButton value={value || ''} />
          </div>

          {value && (
            <Button onClick={() => setShow(!show)} size={'sm'} variant={'link'}>
              {show ? <EyeOff /> : <Eye />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
