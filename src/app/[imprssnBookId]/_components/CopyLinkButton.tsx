'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { CopyIcon } from 'lucide-react';

type CopyLinkButtonProp = {
  imprssnBookId: string;
};

export const CopyLinkButton = ({ imprssnBookId }: CopyLinkButtonProp) => {
  const { toast } = useToast();

  const copyLink =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000/${imprssnBookId}`
      : `https://imprssn.vercel.app/${imprssnBookId}`;

  const handleClick = () => {
    window.navigator.clipboard.writeText(copyLink).then(() => {
      toast({
        title: '✔ 복사 완료',
        description: '복사한 URL를 공유하여 인상기록부에 초대해보세요!',
      });
    });
  };

  return (
    <div className="w-full flex flex-row gap-4 items-center justify-center">
      <Input className="max-w-[25rem] flex-1" defaultValue={copyLink} readOnly />
      <Button variant="outline" size="icon" onClick={handleClick}>
        <CopyIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
