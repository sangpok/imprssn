'use server';

import { createClient } from '@/lib/supabase/server';
import { LoginSchema } from './LoginForm';

export const requestLogin = async (values: LoginSchema) => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email: `${values.id}@imprssn.com`,
    password: values.password,
  });

  if (error) {
    return { status: 'error', data: null, error: error.message };
  }

  return { status: 'success', data: user!, error: null };
};
