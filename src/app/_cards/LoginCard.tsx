import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { LoginForm, LoginSchema } from '../_forms/LoginForm';

export const LoginCard = () => {
  const handSuccess = async ({ credentials }: { credentials: LoginSchema }) => {
    'use server';

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.signInWithPassword({
      email: `${credentials.id}@imprssn.com`,
      password: credentials.password,
    });

    if (user === null) {
      return;
    }

    revalidatePath('/');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>인상기록부 로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm onSuccess={handSuccess} />
      </CardContent>
    </Card>
  );
};
