import { createClient } from '@/lib/supabase/server';
import { LoginCard } from './_cards/LoginCard';
import { CreateImprssnBookButton } from './components/CreateImprssnBookButton';
import { JoinedImprssnBook } from './components/JoinedImprssnBook';
import { SignUpButton } from './components/SignUpButton';
import { revalidatePath } from 'next/cache';
import { Button } from '@/components/ui/button';
import { CreateAccountSchema } from './_forms/CreateAccountForm';

export const revalidate = 60 * 60; // 1시간;

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
        </section>
      )}
    </main>
  );
}
