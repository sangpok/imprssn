'use client';

import { signOut } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';

export const SignOutButton = () => {
  const [pending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(() => {
      signOut();
    });
  };

  return (
    <Button className="w-full mt-4" variant="outline" onClick={handleClick} disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      로그아웃하기
    </Button>
  );
};
