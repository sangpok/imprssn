import { addUserToImprssnBook } from '@/actions/actions';
import { CreateAccountSchema } from '@/app/_forms/CreateAccountForm';
import { LoginButton } from '@/app/components/LoginButton';
import { SignUpButton } from '@/app/components/SignUpButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Prisma } from '@prisma/client';
import { User } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { isJoinedUser, loginWithSignInImprssnBook } from './NoAuthDialog.action';

type ImprssnBookWithUsers = Prisma.ImprssnBookGetPayload<{
  include: { users: true };
}>;

type SignUpSuccessProp = {
  credentials: CreateAccountSchema;
  user: User;
};

export async function NoAuthDialog({ id, title, users }: ImprssnBookWithUsers) {
  const handleSignUpSuccess = async ({ credentials, user }: SignUpSuccessProp) => {
    'use server';

    const { status } = await loginWithSignInImprssnBook({
      credentials,
      imprssnBookId: id,
      userId: user.id,
    });

    if (status === 'error') {
      return;
    }

    revalidatePath(`/${id}`);
  };

  const handleLoginSuccess = async ({ user }: { user: User }) => {
    'use server';

    /** 이게.. 무슨... */
    // const isJoined = users.some(({ id }) => id === user.id);
    const isJoined = isJoinedUser({ users, user });

    if (!isJoined) {
      const { error } = await addUserToImprssnBook({ userId: user.id, imprssnBookId: id });

      if (error) {
        return;
      }
    }

    revalidatePath(`/${id}`);
  };

  return (
    <Dialog defaultOpen={true} open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title} 인상기록부</DialogTitle>
          <DialogDescription>아래의 방법으로 참여해보세요.</DialogDescription>
        </DialogHeader>

        <SignUpButton
          triggerRender={<Button variant="default">간단하게 회원가입하고 참여할래요</Button>}
          imprssnBookTitle={title}
          onSuccess={handleSignUpSuccess}
        />

        <LoginButton
          triggerRender={<Button variant="outline">이미 있는 계정으로 참여할래요</Button>}
          imprssnBookTitle={title}
          onSuccess={handleLoginSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
