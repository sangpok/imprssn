'use client';

import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

export const ToastHandler = ({ error }: { error?: string }) => {
  const { toast } = useToast();

  useEffect(() => {
    console.log(error);

    if (typeof window === undefined) {
      return;
    }

    if (error) {
      if (error === 'no_book_id') {
        toast({
          title: '접속 오류',
          description: '존재하지 않는 인상기록부입니다.',
          variant: 'destructive',
        });
      }
    }
  }, [error]);

  return <></>;
};
