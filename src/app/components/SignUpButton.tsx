import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { User } from '@supabase/supabase-js';
import { ReactNode } from 'react';
import { CreateAccountForm, CreateAccountSchema } from '../_forms/CreateAccountForm';

export const SignUpButton = ({
  triggerRender,
  imprssnBookTitle,
  onSuccess,
}: {
  triggerRender: ReactNode;
  imprssnBookTitle?: string;
  onSuccess: ({ credentials, user }: { credentials: CreateAccountSchema; user: User }) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerRender}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>간단 회원가입</DialogTitle>
          <DialogDescription>
            {imprssnBookTitle || '인상기록부'}에서 사용할 계정 정보를 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <CreateAccountForm bookName={imprssnBookTitle || '인상기록부'} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
};
