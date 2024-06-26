import { getUserDetails } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { LoginCard } from './_cards/LoginCard';
import { CreateAccountSchema } from './_forms/CreateAccountForm';
import { CreateImprssnBookButton } from './components/CreateImprssnBookButton';
import { JoinedImprssnBook } from './components/JoinedImprssnBook';
import { SignUpButton } from './components/SignUpButton';
import { SignOutButton } from './[imprssnBookId]/_components/SignOutButton';

export const revalidate = 60 * 60 * 24 * 7; // 7일

export default async function Home() {
  const user = await getUserDetails();

  const hasAuth = user !== null;
  const hasNoAuth = user === null;

  const handleSuccess = async ({ credentials }: { credentials: CreateAccountSchema }) => {
    'use server';

    const supabase = createClient();

    await supabase.auth.signInWithPassword({
      email: `${credentials.id}@imprssn.com`,
      password: credentials.password,
    });

    revalidatePath('/');
  };

  return (
    <main className="min-w-full min-h-dvh flex items-center justify-center">
      {hasNoAuth && (
        <section className="w-1/2 min-w-[350px]">
          <LoginCard />
          <SignUpButton
            triggerRender={
              <Button className="mt-4 w-full" variant="outline">
                간단하게 회원가입 하기
              </Button>
            }
            onSuccess={handleSuccess}
          />
        </section>
      )}

      {hasAuth && (
        <section className="w-1/2 min-w-[350px]">
          <JoinedImprssnBook userId={user.id} />
          <CreateImprssnBookButton userId={user.id} />
          <SignOutButton />
        </section>
      )}
    </main>
  );
}
