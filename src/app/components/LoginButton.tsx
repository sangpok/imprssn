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
import { LoginForm, LoginSchema } from '../_forms/LoginForm';

export const LoginButton = ({
  triggerRender,
  imprssnBookTitle,
  onSuccess,
}: {
  triggerRender: ReactNode;
  imprssnBookTitle?: string;
  onSuccess: ({ credentials, user }: { credentials: LoginSchema; user: User }) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerRender}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>
            해당 계정으로 {imprssnBookTitle || '인상기록부'}에 참여하게 됩니다.
          </DialogDescription>
        </DialogHeader>

        <LoginForm onSuccess={onSuccess} imprssnBookTitle={imprssnBookTitle} />
      </DialogContent>
    </Dialog>
  );
};
